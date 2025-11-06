import { useState } from 'react';
import { Car, Truck, Caravan, Ship, Phone, Mail, CheckCircle, Star, ArrowRight, MapPin, Clock, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';


function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const detailingImages = [
    {
      image: "/boat1.png",
      title: "Professional Boat Detailing"
    },
    {
      image: "/boat2.png",
      title: "Premium Boat Care"
    },
    {
      image: "/boat3.png",
      title: "Expert Marine Detailing"
    },
    {
      image: "/boat4.png",
      title: "Luxury Boat Restoration"
    },
    {
      image: "/car1.png",
      title: "Ford Raptor detail"
    },
    {
      image: "/car2.png",
      title: "Tesla transformation"
    },
    {
      image: "/car3.png",
      title: "Paint Protection & Gloss Enhancement"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % detailingImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + detailingImages.length) % detailingImages.length);
  };

  const [formData, setFormData] = useState({
    name: '',
    makeModel: '',
    location: '',
    serviceDetails: '',
    phone: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call Netlify Function to send SMS via Twilio
      const response = await fetch('/.netlify/functions/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send quote request');
      }

      console.log('Quote request sent successfully:', result);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          makeModel: '',
          location: '',
          serviceDetails: '',
          phone: '',
          email: ''
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your request. Please try calling us directly at (302) 943-0217.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e2e]/95 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white md:gap-6 lg:gap-8 lg:justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <img src="/image-removebg-preview.png" alt="Startt Detailing" className="h-20 w-auto md:h-24" />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  const formSection = document.querySelector('#quote');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#43c4f4] to-[#74dbff] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] text-[#05122b] shadow-lg shadow-[#2ca9e7]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2ca9e7]/40"
              >
                Get A Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <a
              href="tel:9132001495"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 transition-all duration-300 hover:border-[#74dbff]/60 hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              <span className="border-b border-white/60 pb-0.5 text-[#74dbff] transition-colors duration-300 group-hover:text-white">
                302 943-0217
              </span>
            </a>
            <span className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.45em] text-white/70 backdrop-blur md:w-auto md:text-xs">
              Luxury Detailing | Delaware
            </span>
            <div className="flex items-center gap-4 text-white">
              <a
                href="https://www.instagram.com/starttdetailing/profilecard/?igsh=MXBwbTBtYWx4ZzE5ag%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:border-[#74dbff]/60 hover:bg-[#74dbff]/10 hover:text-[#74dbff]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576313614895&mibextid=wwXIfr&rdid=S7cFM2R1NUcjYdo0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GWUZUAU9m%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:border-[#74dbff]/60 hover:bg-[#74dbff]/10 hover:text-[#74dbff]"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen bg-cover bg-center text-white overflow-hidden" style={{
        backgroundImage: 'linear-gradient(rgba(10, 14, 46, 0.90), rgba(10, 14, 46, 0.90)), url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600)'
      }}>
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-base font-semibold tracking-wide">5.0 · 30+ Reviews</span>
              </div>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-gray-400 mb-6 font-light tracking-wide uppercase">
                Professional Commericial and Residential Detailing Services in Sussex County
              </p>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
                Get a Fast, Free Detailing Quote
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                Your Trusted Partner for Professional Detailing – We Detail Anything and Everything. Boats, Cars, Aviation, RVs, Motorsports and More. We are mobile and come to you. Explore Affordable Solutions, Protect Your Investment, and Request a No-Obligation Quote in Just Minutes.
              </p>

              {/* Testimonial */}

            </div>

            {/* Right Column - Detailing Slideshow */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Detailing Image */}
                <div className="relative h-96 md:h-[600px]">
                  <img
                    src={detailingImages[currentSlide].image}
                    alt={detailingImages[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-2xl tracking-wide">
                      {detailingImages[currentSlide].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-[#0a0e2e] p-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-10 border border-gray-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-[#0a0e2e] p-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-10 border border-gray-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {detailingImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-white shadow-lg' : 'w-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                  </button>
                ))}
              </div>


            </div>
          </div>
        </div>
      </header>

      {/* Behind the Scenes */}
      <section className="relative overflow-hidden bg-[#050a1f] py-24 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(76,200,255,0.25),transparent_55%)]"></div>
        <div className="container relative mx-auto flex flex-col gap-12 px-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#74dbff]">
              On The Job
            </span>
            <h2 className="mt-6 text-4xl font-bold md:text-5xl">Check out some of our work!</h2>
            <p className="mt-4 text-base text-gray-300 md:text-lg">
              Premium detailing, proven results.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-200 sm:text-base">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <CheckCircle className="mb-3 h-6 w-6 text-[#74dbff]" />
                <p className="font-semibold text-white">Signature Startt Finish</p>
                <p className="mt-1 text-gray-300">We clean, shine, and protect your investment.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <Clock className="mb-3 h-6 w-6 text-[#74dbff]" />
                <p className="font-semibold text-white">Meticulous Process</p>
                <p className="mt-1 text-gray-300">Document each step so clients see the care behind the service.</p>
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-6 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur lg:col-span-2">
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  className="h-full w-full object-contain bg-black"
                  controls
                  playsInline
                  poster="/boat2.png"
                >
                  <source src="/media/behind-the-scenes.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className="px-6 py-6">
                <p className="text-sm uppercase tracking-[0.35em] text-[#74dbff]">Feature Reel</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Luxury Yacht Detail</h3>
                <p className="mt-1 text-sm text-gray-300">
                  Shot on-site with Startt Detailing—let prospects watch the finish take shape while we walk through the service highlights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Collage */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Header with Stats */}
          <div className="text-center mb-16">
            <div className="flex flex-col items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
                <CheckCircle className="h-4 w-4 text-green-500" />
                5-Star Rated on Google
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e2e] mb-4">Loved by Our Customers</h2>
            <p className="text-xl text-gray-600 mb-6">See what people are saying about our detailing services</p>
            
            {/* Social Proof Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700 font-medium">50+ happy clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">100+ vehicles and boats detailed in 2025</span>
              </div>
            </div>
          </div>

          {/* Featured Review Spotlight */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-[#0a0e2e] to-[#1a1e4e] rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-yellow-400 text-[#0a0e2e] px-3 py-1 rounded-full text-sm font-bold">⭐ Featured Review</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified Client
                  </span>
                </div>
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl leading-relaxed mb-6 font-light">
                  "I am truly impressed by Startt detailing and its owner Joey Startt. He presents himself and his business with <span className="font-semibold italic text-yellow-300">true pride and professionalism</span>. Used his services to fully detail our 2019 Bennington Pontoon boat!"
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      RG
                    </div>
                    <div>
                      <div className="font-bold text-lg">Russell Gofus</div>
                      <div className="text-gray-300 text-sm">Boat Owner</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-sm text-gray-300">Service</div>
                    <div className="font-semibold">2019 Bennington Pontoon – Full Detail</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Review 1 - Hannah Hastings */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Joey detailed my car and did a great job! He definitely had his work cut out for him! From the normal wear and tear to the husky hair in the back…after his detail it <span className="font-semibold text-[#0a0e2e]">looks brand new!</span>"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Car className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Hannah Hastings</div>
                    <div className="text-xs text-gray-500">Sussex County, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Car Interior Deep Clean</div>
              </div>
            </div>

            {/* Review 2 - Heather Jester */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Joey was very informative and always communicated in a timely manner. His work was <span className="font-semibold text-[#0a0e2e]">amazing</span> and my husband loved his clean boat!!!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Heather Jester</div>
                    <div className="text-xs text-gray-500">Lewes, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Boat Full Detail</div>
              </div>
            </div>

            {/* Review 3 - Nicole DiGiacomo */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Startt Detailing detailed my car and did an <span className="font-semibold text-[#0a0e2e]">amazing job</span>. Very impressed and I would highly recommend them!!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-pink-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Car className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Nicole DiGiacomo</div>
                    <div className="text-xs text-gray-500">Kent County, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Car Exterior & Interior Detail</div>
              </div>
            </div>

            {/* Review 4 - Craig Conner */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Had Joey detail my 21 ft Robalo, and he did an <span className="font-semibold text-[#0a0e2e]">excellent job</span>. I would certainly recommend him and use him again. Came right on time and did a great job."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Craig Conner</div>
                    <div className="text-xs text-gray-500">Bethany Beach, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">21 ft Robalo – Full Detail</div>
              </div>
            </div>

            {/* Review 5 - Robert Riley */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "These guys are <span className="font-semibold text-[#0a0e2e]">amazing!</span> Hardworking, reliable, with a unique knowledge of various marine cleaning regimes and correct top notch products."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Robert Riley</div>
                    <div className="text-xs text-gray-500">Ocean View, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Marine Detailing Services</div>
              </div>
            </div>

            {/* Review 6 - Kamran Givpoor */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Joey has been taking care of my Beneteau on a weekly basis, and his work is <span className="font-semibold text-[#0a0e2e]">consistently good</span>. He's dependable, detail-oriented, and corrects things that require correction without hesitation."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Kamran Givpoor</div>
                    <div className="text-xs text-gray-500">Fenwick Island, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Beneteau – Weekly Maintenance</div>
              </div>
            </div>

            {/* Review 7 - Patrick Bilbrough */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Startt Detailing does weekly washes on my Jersey Cape Sweet Caroline and they do an <span className="font-semibold text-[#0a0e2e]">excellent job</span>. Highly recommend!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-red-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Patrick Bilbrough</div>
                    <div className="text-xs text-gray-500">Dewey Beach, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Jersey Cape – Weekly Washes</div>
              </div>
            </div>

            {/* Review 8 - Tori Reed */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Startt Detailing detailed my car before I sold it. They did a <span className="font-semibold text-[#0a0e2e]">great job</span>, I was very impressed!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Car className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Tori Reed</div>
                    <div className="text-xs text-gray-500">Millsboro, DE</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">Pre-Sale Car Detail</div>
              </div>
            </div>

            {/* Review 9 - Drew Mayhall */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#0a0e2e]/20 hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                  Google Review
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed text-base">
                "Had this company come out to detail my 28ft Regulator. Let&apos;s just say I have not paid attention to the polish and wax like I should have. These guys showed up on time and did an <span className="font-semibold text-[#0a0e2e]">amazing job</span>. The boat looks new again. They were very professional, easy to work with, and charged me exactly what I was quoted. I will definitely be using this young man from now on."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0e2e] text-sm">Drew Mayhall</div>
                    <div className="text-xs text-gray-500">Sussex County, Delaware</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium">28ft Regulator – Full Polish &amp; Wax</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Headline & Subheadline */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e2e] mb-4">Premium Mobile Detailing Services</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 text-lg text-gray-600 mb-3">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Licensed</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Insured</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Trusted</span>
              </span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precision detailing tailored to your lifestyle — on land, in the air, or on the sea
            </p>
          </div>

          {/* Trust Banner Card */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-[#0a0e2e] to-[#1a1e4e] rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Startt Detailing</h3>
                    <p className="text-lg text-gray-200 leading-relaxed mb-6">
                      Fully licensed and insured professionals providing mobile detailing. Our team brings showroom-level shine right to your location.
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-yellow-400 font-semibold">Rated 5.0 by Local Clients</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Licensed & Insured</div>
                          <div className="text-sm text-gray-300">Full liability coverage</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Professional Grade Equipment</div>
                          <div className="text-sm text-gray-300">Premium products & tools</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Satisfaction Guaranteed</div>
                          <div className="text-sm text-gray-300">100% quality promise</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Grid - 2x2 */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Auto Detailing */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0a0e2e] transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-full mb-6 flex items-center justify-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Car className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-3 text-blue-500/80">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                        <Truck className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                        <Caravan className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a0e2e] mb-3">Auto Detailing</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Premium interior and exterior automotive detailing, protect your investment with a wax, sealant, or coating. We make your vehicle look like the day you bought it!
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Clean</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Shine</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Protect</span>
                    </li>
                  </ul>
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-2 bg-[#0a0e2e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#151a42] transition-all duration-300 shadow-md hover:shadow-xl group"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Boat Detailing */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0a0e2e] transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Ship className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a0e2e] mb-3">Boat Detailing</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Based out of Sussex County Delaware, we offer premium marine detailing.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Weekly & Bi-Weekly Maintenance Plans</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Wax, sealant, or ceramic packages</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Boat restoration</span>
                    </li>
                  </ul>
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-2 bg-[#0a0e2e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#151a42] transition-all duration-300 shadow-md hover:shadow-xl group"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Custom Projects */}
              <div className="bg-gradient-to-br from-[#0a0e2e] to-[#1b1f4a] text-white rounded-2xl border-2 border-[#1e245a] transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Car className="w-8 h-8 text-[#74dbff]" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">We Detail Anything</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Boat, car, RV, fleet, aircraft, or something one-of-a-kind—we offer premium detailing plans for every vehicle. Tell us what you have and how you use it; we&apos;ll take it from there.
                  </p>
                  <ul className="space-y-3 mb-6 text-white/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#74dbff] flex-shrink-0 mt-0.5" />
                      <span>Send photos or a quick description of your project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#74dbff] flex-shrink-0 mt-0.5" />
                      <span>We schedule a walkthrough or virtual consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#74dbff] flex-shrink-0 mt-0.5" />
                      <span>Receive a tailored quote and care plan within 24 hours</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-2 bg-[#74dbff] text-[#07102f] px-6 py-3 rounded-lg font-semibold hover:bg-[#8ae2ff] transition-all duration-300 shadow-md hover:shadow-xl group"
                    >
                      <span>Request a Custom Quote</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="mailto:starttdetailing@gmail.com"
                      className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Message Our Team</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Plans Banner */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-8 md:p-10 border-2 border-gray-200 relative overflow-hidden group hover:border-[#0a0e2e] transition-all duration-300">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0a0e2e]/5 rounded-full -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[#0a0e2e] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    ⚡ Premium Service
                  </div>
                  <h3 className="text-3xl font-bold text-[#0a0e2e] mb-4">
                    Weekly & Bi-Weekly Maintenance Plans
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Keep your car, boat, or RV spotless year-round with flexible mobile service. Perfect for marina owners and vehicle enthusiasts who demand excellence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-2 bg-[#0a0e2e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#151a42] transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <span>Get Maintenance Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-2 bg-white text-[#0a0e2e] border-2 border-[#0a0e2e] px-6 py-3 rounded-lg font-semibold hover:bg-[#0a0e2e] hover:text-white transition-all duration-300"
                    >
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0e2e] mb-1">Consistent Care</div>
                        <div className="text-gray-600 text-sm">Regular maintenance keeps your investment pristine</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0e2e] mb-1">Flexible Scheduling</div>
                        <div className="text-gray-600 text-sm">We work around your schedule</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0a0e2e] mb-1">Priority Service</div>
                        <div className="text-gray-600 text-sm">Maintenance clients get priority booking</div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-3xl bg-white/95 text-[#0a0e2e] shadow-2xl">
                <div className="pointer-events-none absolute -top-28 -right-20 h-56 w-56 rounded-full bg-[#74dbff]/25 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0a0e2e]/10 blur-3xl"></div>
                <div className="relative z-10 p-8 lg:p-12 space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="First & Last Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="makeModel" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Make & Model *</label>
                      <input
                        type="text"
                        id="makeModel"
                        name="makeModel"
                        value={formData.makeModel}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="e.g. 2023 BMW X5 or 28' Pursuit"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Location *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="City, marina, or neighborhood"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="(302) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="hidden md:flex items-center justify-center rounded-2xl border border-dashed border-[#74dbff]/50 bg-[#74dbff]/10 px-4 py-3 text-center text-sm font-medium text-[#0a0e2e]/70">
                      Prefer updates by text or email? Let us know in the notes.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="serviceDetails" className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Desired Service *</label>
                    <textarea
                      id="serviceDetails"
                      name="serviceDetails"
                      value={formData.serviceDetails}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-base shadow-sm transition-all focus:border-[#0a0e2e] focus:ring-2 focus:ring-[#74dbff]/60 focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Include service goals, condition, timelines, or anything special we should prepare for."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-[#74dbff] py-4 text-lg font-semibold uppercase tracking-[0.3em] text-[#03102f] shadow-lg shadow-[#74dbff]/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8ae2ff] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#1a1d2e]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-400">
                Everything you need to know about our premium detailing services
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>What areas do you service?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>We provide mobile detailing services throughout Delaware, including Sussex county, Rehoboth Beach, Lewes, Bethany Beach, Dewey Beach, Ocean View, Fenwick Island, and Millsboro. Our mobile service means we come directly to your location, whether that's your home, work, or marina.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 2 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>How long does a typical detailing service take?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p className="mb-3">The time varies depending on the service and vehicle size:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-white font-semibold mt-1">•</span>
                        <span><strong>Basic car wash & detail:</strong> 2-3 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white font-semibold mt-1">•</span>
                        <span><strong>Full interior/exterior car detail:</strong> 4-6 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white font-semibold mt-1">•</span>
                        <span><strong>Boat detailing:</strong> 4-8 hours (depending on size)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white font-semibold mt-1">•</span>
                        <span><strong>RV detailing:</strong> 6-10 hours</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ 3 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>Do I need to provide water or electricity?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>No! We bring everything we need, including our own water supply and power generators. Our mobile setup is completely self-contained, so you don't need to provide anything. Just give us access to your vehicle and we'll take care of the rest.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 4 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>What products do you use?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>We use only professional-grade, pH-balanced products that are safe for all surfaces and the environment. For boats, we use marine-specific products designed to protect against saltwater and UV damage. All our products are carefully selected to deliver exceptional results while protecting your vehicle's finish.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 5 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>How much does detailing cost?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>Pricing varies based on the vehicle type, size, condition, and services requested. We provide custom quotes for every job to ensure you get exactly what you need at a fair price. Request a free quote above, and we'll get back to you within 24 hours with a detailed estimate.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 6 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>Do you offer maintenance packages?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>Yes! We offer weekly and bi-weekly maintenance plans for cars, boats, and RVs. These packages are perfect for keeping your vehicle in pristine condition year-round and include priority scheduling. Maintenance clients receive special pricing and guaranteed time slots. Contact us to learn more about our maintenance programs.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 7 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>Are you insured?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>Yes, Startt Detailing is fully licensed and insured with general liability coverage. Your vehicle is protected throughout the entire detailing process. We take pride in our professionalism and maintain all necessary insurance and licensing to give you complete peace of mind.</p>
                  </div>
                </details>
              </div>

              {/* FAQ 8 */}
              <div className="bg-[#252837] rounded-xl overflow-hidden hover:bg-[#2a2f45] transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-white list-none">
                    <span>What if I'm not satisfied with the service?</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <p>We stand behind our work with a 100% satisfaction guarantee. If you're not completely happy with any aspect of our service, let us know and we'll make it right. Your satisfaction is our top priority, and we won't consider the job complete until you're thrilled with the results.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-gray-400 mb-4">Have additional questions?</p>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors"
              >
                <span>Contact our team</span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
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
                    <div className="font-semibold">Sussex County, Delaware</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-300">
                  <Clock className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">Hours</div>
                    <div className="font-semibold">Mon-Sunday: 24/7</div>
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
