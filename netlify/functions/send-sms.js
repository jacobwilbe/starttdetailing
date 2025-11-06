// Netlify Function to send SMS via Twilio
const twilio = require('twilio');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { name, phone, email, location, makeModel, serviceDetails } = data;

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

    // Create SMS message
    const messageBody = `NEW QUOTE REQUEST 

Name: ${name}
Phone: ${phone}
Email: ${email}
Location: ${location}
Vehicle: ${makeModel}

Service Details:
${serviceDetails}

Reply to customer at: ${phone}`;

    // Send SMS
    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: businessPhoneNumber
    });

    console.log('SMS sent successfully:', message.sid);

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
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send quote request',
        details: error.message 
      })
    };
  }
};