const twilio = require('twilio');

// In-memory rate limiting store (resets when function cold starts)
// For production, consider using Redis or a database
const rateLimitStore = new Map();

// Rate limit configuration
const RATE_LIMIT = {
  maxRequests: 3,           // Maximum requests
  windowMs: 60 * 60 * 1000  // Time window: 1 hour (in milliseconds)
};

// Clean up old entries periodically
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT.windowMs) {
      rateLimitStore.delete(key);
    }
  }
}

// Check if IP/identifier is rate limited
function isRateLimited(identifier) {
  cleanupOldEntries();
  
  const now = Date.now();
  const userData = rateLimitStore.get(identifier);
  
  if (!userData) {
    // First request from this identifier
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequest: now
    });
    return false;
  }
  
  // Check if the time window has passed
  if (now - userData.firstRequest > RATE_LIMIT.windowMs) {
    // Reset the counter
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequest: now
    });
    return false;
  }
  
  // Increment counter
  userData.count++;
  rateLimitStore.set(identifier, userData);
  
  // Check if limit exceeded
  return userData.count > RATE_LIMIT.maxRequests;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get client IP address for rate limiting
    const clientIP = event.headers['client-ip'] || 
                     event.headers['x-forwarded-for']?.split(',')[0] || 
                     event.headers['x-real-ip'] ||
                     'unknown';
    
    // Parse the request body
    const data = JSON.parse(event.body);
    const { name, phone, email, location, makeModel, serviceDetails } = data;

    // Basic input validation
    if (!name || !phone || !email || !location || !makeModel || !serviceDetails) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Create a composite identifier using IP and email
    const identifier = `${clientIP}_${email}`;
    
    // Check rate limit
    if (isRateLimited(identifier)) {
      console.log(`Rate limit exceeded for: ${identifier}`);
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          message: `You can only submit ${RATE_LIMIT.maxRequests} quote requests per hour.`
        })
      };
    }

    // Initialize Twilio client with credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const businessPhoneNumber = process.env.BUSINESS_PHONE_NUMBER;

    // Validate environment variables
    if (!accountSid || !authToken || !twilioPhoneNumber || !businessPhoneNumber) {
      console.error('Missing Twilio configuration');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const client = twilio(accountSid, authToken);

    // Create SMS message (Twilio has a 1600 character limit)
    const messageBody = ` NEW QUOTE REQUEST

Name: ${name}
Phone: ${phone}
Email: ${email}
Location: ${location}
Vehicle: ${makeModel}

Service Details:
${serviceDetails.substring(0, 500)}

Reply to customer at: ${phone}`;

    // Send SMS
    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: businessPhoneNumber
    });

    console.log(`SMS sent successfully: ${message.sid} from IP: ${clientIP}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Quote request sent successfully',
        messageSid: message.sid 
      })
    };

  } catch (error) {
    console.error('Error sending SMS:', error);
    
    // Handle Twilio-specific errors
    if (error.code === 21608) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Invalid phone number format',
          details: 'Please check the phone number configuration'
        })
      };
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send quote request',
        details: error.message 
      })
    };
  }
};