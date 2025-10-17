import { useState } from 'react';
import { Car, Ship, Phone, Mail, CheckCircle, Star, ArrowRight, MapPin, Clock, Facebook, Instagram, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const beforeAfterImages = [
    {
      before: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800",
      after: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Luxury Car Detail"
    },
    {
      before: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=800",
      after: "https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Boat Detailing"
    },
    {
      before: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800",
      after: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "SUV Interior Detail"
    },
    {
      before: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800",
      after: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Classic Car Restoration"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'car',
    make: '',
    model: '',
    location: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send to Formspree (for email notifications)
      const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          make: formData.make,
          model: formData.model,
          location: formData.location,
          message: formData.message,
          _subject: `New Quote Request from ${formData.name}`,
          _replyto: formData.email
        })
      });

      if (formspreeResponse.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: 'car',
            make: '',
            model: '',
            location: '',
            message: ''
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your quote request. Please try again or call us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative min-h-screen bg-cover bg-center text-white overflow-hidden" style={{
        backgroundImage: 'linear-gradient(rgba(10, 14, 46, 0.85), rgba(10, 14, 46, 0.85)), url(https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600)'
      }}>
        <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/image-removebg-preview.png" alt="Startt Detailing" className="h-20 w-auto" />
          </div>
          <a
            href="#quote"
            className="bg-white text-[#0a0e2e] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Free Quote
          </a>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-medium">5.0 from 30+ reviews</span>
              </div>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
                Professional Detailing Services in Sussex County
              </p>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Get a Fast, Free Detailing Quote
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Your Trusted Partner for Professional Detailing – We Detail Anything and Everything. Cars, Boats, RVs, Motorcycles, and More. Explore Affordable Solutions, Protect Your Investment, and Request a No-Obligation Quote in Just Minutes.
              </p>

              {/* Testimonial */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xl font-bold">
                      MJ
                    </div>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-white mb-3 italic leading-relaxed">
                      "The team at Startt Detailing transformed my boat! It looks better than the day I bought it. They're incredibly thorough and professional."
                    </p>
                    <p className="text-sm text-gray-300 font-medium">– Michael J.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Before/After Slideshow */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Before Image - Top Half */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={beforeAfterImages[currentSlide].before}
                    alt="Before detailing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    BEFORE
                  </div>
                </div>
                
                {/* Divider */}
                <div className="relative h-1 bg-gradient-to-r from-red-500 via-gray-300 to-green-500"></div>
                
                {/* After Image - Bottom Half */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={beforeAfterImages[currentSlide].after}
                    alt="After detailing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    AFTER
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0a0e2e] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0a0e2e] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {beforeAfterImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                  </button>
                ))}
              </div>

              {/* Title */}
              <p className="text-center text-white text-lg font-semibold mt-3">
                {beforeAfterImages[currentSlide].title}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Customer Reviews Carousel */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-[#0a0e2e] mb-2">Loved by Our Customers</h2>
            <p className="text-gray-600">See what people are saying about our detailing services</p>
          </div>
        </div>

        <div className="relative">
          <div className="flex animate-scroll gap-6" style={{
            animation: 'scroll 40s linear infinite'
          }}>
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 shrink-0">
                {/* Review 1 - Hannah Hastings */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Joey detailed my car and did a great job! He definitely had his work cut out for him! From the normal wear and tear to the husky hair in the back…after his detail it looks brand new!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      HH
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Hannah Hastings</div>
                      <div className="text-sm text-gray-500">Car Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 2 - Russell Gofus */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "I am truly impressed by Startt detailing and its owner Joey Startt. He presents himself and his business with true pride and professionalism. Used his services to fully detail our 2019 Bennington Pontoon boat!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      RG
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Russell Gofus</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 3 - Heather Jester */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Joey was very informative and always communicated in a timely manner. His work was amazing and my husband loved his clean boat!!!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      HJ
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Heather Jester</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 4 - Nicole DiGiacomo */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Startt Detailing detailed my car and did an amazing job. Very impressed and I would highly recommend them!!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      ND
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Nicole DiGiacomo</div>
                      <div className="text-sm text-gray-500">Car Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 5 - Craig Conner */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Had Joey detail my 21 ft Robalo, and he did an excellent job. I would certainly recommend him and use him again. Came right on time and did a great job."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      CC
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Craig Conner</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 6 - Robert Riley */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "These guys are amazing! Hardworking, reliable, with a unique knowledge of various marine cleaning regimes and correct top notch products."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      RR
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Robert Riley</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 7 - Kamran Givpoor */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Joey has been taking care of my Beneteau on a weekly basis, and his work is consistently good. He's dependable, detail-oriented, and corrects things that require correction without hesitation."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      KG
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Kamran Givpoor</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 8 - Patrick Bilbrough */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Startt Detailing does weekly washes on my Jersey Cape Sweet Caroline and they do an excellent job. Highly recommend!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      PB
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Patrick Bilbrough</div>
                      <div className="text-sm text-gray-500">Boat Owner</div>
                    </div>
                  </div>
                </div>

                {/* Review 9 - Tori Reed */}
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 shrink-0">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Startt Detailing detailed my car before I sold it. They did a great job, I was very impressed!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e2e] flex items-center justify-center text-white font-bold mr-3">
                      TR
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a0e2e]">Tori Reed</div>
                      <div className="text-sm text-gray-500">Car Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a0e2e] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional detailing packages tailored to your vehicle's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Car Detailing */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-[#0a0e2e] p-8 text-white">
                <Car className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">Car Detailing</h3>
                <p className="text-gray-300">Complete interior and exterior care</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Premium hand wash & wax</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Deep interior cleaning & conditioning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Paint correction & ceramic coating</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Engine bay detailing</span>
                  </li>
                </ul>
                <a
                  href="#quote"
                  className="block w-full bg-[#0a0e2e] text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-[#151a42] transition-all duration-300"
                >
                  Request Car Detailing Quote
                </a>
              </div>
            </div>

            {/* Boat Detailing */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-[#0a0e2e] p-8 text-white">
                <Ship className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">Boat Detailing</h3>
                <p className="text-gray-300">Marine-grade care for your vessel</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Hull cleaning & waxing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Deck & upholstery restoration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Metal polishing & oxidation removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#0a0e2e] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Marine-grade protection treatments</span>
                  </li>
                </ul>
                <a
                  href="#quote"
                  className="block w-full bg-[#0a0e2e] text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-[#151a42] transition-all duration-300"
                >
                  Request Boat Detailing Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0a0e2e] mb-4">Trusted by 500+ Happy Customers</h2>
              <p className="text-gray-600">Join our growing community of satisfied vehicle and boat owners</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-[#0a0e2e] mb-2">500+</div>
                <div className="text-gray-600">Vehicles Detailed</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-[#0a0e2e] mb-2">5 Star</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-[#0a0e2e] mb-2">100%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-20 bg-[#0a0e2e] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Get Your Free Quote Today</h2>
              <p className="text-xl text-gray-300">
                Tell us about your vehicle and we'll provide a custom quote within 24 hours
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-500 text-white p-8 rounded-2xl text-center shadow-2xl">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
                <p className="text-lg">We'll contact you within 24 hours with your custom quote.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white text-[#0a0e2e] p-8 lg:p-12 rounded-2xl shadow-2xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-semibold mb-2">Service Type *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors bg-white"
                  >
                    <option value="car">Car Detailing</option>
                    <option value="boat">Boat Detailing</option>
                    <option value="both">Both Car & Boat</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="make" className="block text-sm font-semibold mb-2">Make *</label>
                    <input
                      type="text"
                      id="make"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors"
                      placeholder="e.g., Toyota, Yamaha"
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block text-sm font-semibold mb-2">Model *</label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors"
                      placeholder="e.g., Camry, 242 Limited"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-semibold mb-2">Location/Address *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors"
                    placeholder="City, State or Full Address"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0a0e2e] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your vehicle's condition, preferred service date, or any specific concerns..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-[#0a0e2e] px-8 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center group"
                >
                  Get My Free Quote
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e2e] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo and About */}
            <div className="md:col-span-1">
              <img src="/image-removebg-preview.png" alt="Startt Detailing" className="h-16 w-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium car and boat detailing services that restore, protect, and enhance your investment.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="tel:+13029430217"
                  className="flex items-start text-gray-300 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="font-semibold">(302) 943-0217</div>
                  </div>
                </a>
                <a
                  href="mailto:starttdetailing@gmail.com"
                  className="flex items-start text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="font-semibold">starttdetailing@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Location and Hours */}
            <div>
              <h3 className="text-lg font-bold mb-4">Visit Us</h3>
              <div className="space-y-3">
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div className="font-semibold">123 Marina Drive<br />Coastal City, CA 90210</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-300">
                  <Clock className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">Hours</div>
                    <div className="font-semibold">Mon-Fri: 8am - 6pm<br />Sat: 9am - 4pm<br />Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0a0e2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0a0e2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0a0e2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-6">
                <a
                  href="#quote"
                  className="inline-block bg-white text-[#0a0e2e] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2025 Startt Detailing. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
