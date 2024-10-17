import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, Star, Gift, Truck, Smile, ChevronLeft, ChevronRight, Package, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const marqueeItems = [
    { type: 'image', content: '/Images/marq1.png', alt: 'Diwali Lamp' },
    { type: 'text', content: 'Exclusive Diwali Offers' },
    { type: 'image', content: '/Images/marq2.png', alt: 'Rangoli Design' },
    { type: 'text', content: 'Handcrafted with Love' },
    { type: 'image', content: '/Images/marq3.png', alt: 'Festive Sweets' },
    { type: 'text', content: 'Authentic Indian Flavors' },
    { type: 'image', content: '/Images/marq4.png', alt: 'Diwali Decorations' },
    { type: 'text', content: 'Transform Your Space' },
  ];
  
  const products = [
    { name: "Golden Bowl", image: "/Images/Hero1.png", description: "Elegant ceremonial bowl crafted by skilled artisans. Perfect for festive gatherings and special occasions." },
    { name: "Diwali Lanterns", image: "/Images/Hero2.png", description: "Illuminate your home with these enchanting lanterns. Each piece is a work of art that casts a warm, inviting glow." },
    { name: "Festive Treats", image: "/Images/Hero3.png", description: "Indulge in a selection of traditional delicacies, handmade with the finest ingredients to tantalize your taste buds." },
  ];

  const images = [
    "/Images/caro1.png", "/Images/caro2.png", "/Images/caro3.png", "/Images/caro4.png",
    "/Images/caro5.png", "/Images/caro6.png", "/Images/caro7.png", "/Images/caro8.png",
    "/Images/caro9.png", "/Images/caro10.png", "/Images/caro11.png", "/Images/caro12.png",
    "/Images/caro13.png", "/Images/caro14.png", "/Images/caro15.png",
  ];

  const alternatingContent = [
    {
      image: "/Images/alt1.png",
      title: "Exquisite Diwali Decor",
      description: "Transform your home into a festive wonderland with our carefully curated collection of Diwali decorations. From intricate rangoli designs to sparkling string lights, we have everything you need to create a magical atmosphere that captures the essence of this joyous occasion."
    },
    {
      image: "/Images/alt2.png",
      title: "Artisanal Diya Collection",
      description: "Illuminate your space with our handcrafted diyas, each telling a unique story of tradition and craftsmanship. These beautiful oil lamps are not just decorative pieces but also symbols of hope, prosperity, and the triumph of light over darkness."
    },
    {
      image: "/Images/alt3.png",
      title: "Gourmet Festive Treats",
      description: "Indulge in the flavors of Diwali with our premium selection of sweets and savories. From traditional favorites like kaju katli and gulab jamun to modern fusion delicacies, our gourmet treats are perfect for gifting or savoring with your loved ones during the festivities."
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "The Diwali decor I ordered was absolutely stunning. It transformed our home and made our celebration extra special!",
      image: "/Images/Person.png"
    },
    {
      name: "Rahul Mehta",
      location: "Delhi",
      text: "Fast delivery and excellent quality products. The artisanal diyas were a hit at our family gathering. Will definitely order again!",
      image: "/Images/Person.png"
    },
    {
      name: "Anita Kapoor",
      location: "Bangalore",
      text: "The festive treats bundle was a delight! Authentic taste and beautiful packaging. It was the perfect gift for my relatives.",
      image: "/Images/Person.png"
    }
  ];

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (swiper) {
        swiper.slideNext();
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [swiper]);

  return (
    <div className="bg-[#F5E6D3] min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-40 font-['Poppins',sans-serif] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1930] mb-4 font-['Playfair_Display',serif]">
              Diwali Home Fest
            </h1>
            <p className="text-lg sm:text-xl text-[#344866] max-w-2xl mx-auto font-['Poppins',sans-serif]">
              Celebrate with handcrafted essentials that bring the magic of India's festivities into your home.
            </p>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center">
            <motion.div  
              className="w-full md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square">
                <AnimatePresence>
                  {products.map((product, index) => (
                    activeProduct === index && (
                      <motion.img
                        key={index}
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
  
            <motion.div
              className="w-full md:w-1/2 md:pl-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-6 flex items-center font-['Playfair_Display',serif]">
                <Star className="mr-2" size={24} color="#FFD700" /> Featured Products
              </h2>
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 p-4 sm:p-6 rounded-lg cursor-pointer transition-all font-['Poppins',sans-serif] ${
                    activeProduct === index ? 'bg-[#FFE66D] shadow-lg' : 'bg-white shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveProduct(index)}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0A1930] mb-2 font-['Playfair_Display',serif]">{product.name}</h3>
                  <p className="text-sm sm:text-base text-[#344866]">{product.description}</p>
                </motion.div>
              ))}
              <div className="mt-8 flex justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#E07A5F] text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-semibold hover:bg-[#C86D54] transition duration-300 flex items-center font-['Poppins',sans-serif]"
                  >
                    <ShoppingBag className="mr-2" size={20} /> Shop Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover={true}
              className="bg-gradient-to-r from-[#FFE66D] to-[#FFD700] py-6 sm:py-8 rounded-lg shadow-xl"
            >
              {marqueeItems.map((item, index) => (
                <div key={index} className="mx-4 sm:mx-8 flex items-center">
                  {item.type === 'image' ? (
                    <img src={item.content} alt={item.alt} className="h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-white shadow-md" />
                  ) : (
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A1930] font-['Playfair_Display',serif]">{item.content}</h3>
                  )}
                </div>
              ))}
            </Marquee>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-8 text-center font-['Playfair_Display',serif]">Exclusive Diwali Bundles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3].map((bundle) => (
                <div key={bundle} className="bg-white p-6 rounded-lg shadow-md shadow-[#FFD6E3] flex flex-col">
                  <img src={`/Images/Bundle${bundle}.png`} alt={`Diwali Bundle ${bundle}`} className="w-full aspect-square object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold text-[#0A1930] mb-2 font-['Playfair_Display',serif]">
                    {bundle === 1 ? "Delightful Diwali Bundle" : bundle === 2 ? "Festive Feast Bundle" : "Prosperity Package"}
                  </h3>
                  <p className="text-sm sm:text-base text-[#344866] mb-4 flex-grow font-['Poppins',sans-serif]">
                    {bundle === 1 ? "Includes an assortment of lanterns, candles, and decorative items to create a warm and inviting ambiance." :
                     bundle === 2 ? "Treat your loved ones to a selection of traditional sweets, savories, and delicacies." :
                     "Elevate your celebrations with a curated selection of premium products and festive essentials."}
                  </p>
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#E07A5F] text-white py-2 px-4 rounded-full font-semibold hover:bg-[#C86D54] transition duration-300 font-['Poppins',sans-serif] w-full sm:w-auto"
                    >
                      <Link to="/products">
                        <div className="flex items-center justify-center">
                          <Gift className="mr-2" size={20} />
                          Buy Now
                        </div>
                      </Link>
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-8 text-center font-['Playfair_Display',serif]">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                { icon: Truck, title: "Fast and Reliable Shipping", description: "Get your festive essentials delivered right to your doorstep, in time for your celebrations." },

                { icon: Star, title: "Handpicked Products", description: "We curate the finest selection of products to ensure the highest quality and craftsmanship." },
                { icon: Smile, title: "Exceptional Customer Service", description: "Our dedicated team is always ready to assist you and ensure your utmost satisfaction." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md shadow-[#FFE66D] flex items-center">
                  <item.icon className="mr-4 text-[#E07A5F]" size={36} />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 font-['Playfair_Display',serif] text-[#0A1930]">{item.title}</h3>
                    <p className="text-sm sm:text-base text-[#344866] font-['Poppins',sans-serif]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-8 text-center font-['Playfair_Display',serif]">Featured Products Gallery</h2>
            <Swiper
              onSwiper={setSwiper}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
              className="w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-12 text-center font-['Playfair_Display',serif]">Discover Our Diwali Specials</h2>
            {alternatingContent.map((content, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center mb-12 sm:mb-16 lg:mb-24`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <motion.div
                  className="w-full lg:w-1/2 mb-6 lg:mb-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={content.image} alt={content.title} className="w-full h-auto object-cover rounded-lg shadow-2xl" />
                </motion.div>
                <motion.div
                  className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + 0.2 * index }}
                >
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-[#0A1930] mb-4 font-['Playfair_Display',serif]"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {content.title}
                  </motion.h3>
                  <motion.p 
                    className="text-base sm:text-lg text-[#344866] leading-relaxed mb-6 font-['Poppins',sans-serif]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {content.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-12 text-center font-['Playfair_Display',serif]">What Our Customers Say</h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center max-w-2xl mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#FFE66D] shadow-md mb-4"
                  />
                  <p className="text-base sm:text-lg text-[#344866] italic mb-4 text-center font-['Poppins',sans-serif]">"{testimonials[currentTestimonial].text}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-[#0A1930] text-center font-['Playfair_Display',serif]">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-[#344866] text-center font-['Poppins',sans-serif]">{testimonials[currentTestimonial].location}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 focus:outline-none transition-colors duration-300 ${
                      currentTestimonial === index ? 'bg-[#E07A5F]' : 'bg-[#FFE66D]'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1930] mb-12 text-center font-['Playfair_Display',serif]">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { icon: Package, title: "Free delivery across India", description: "Enjoy free delivery on orders over ₹999 within India and $59 internationally. We guarantee fast delivery." },
                { icon: RefreshCw, title: "Easy replacement", description: "If you receive a damaged product, we'll gladly take it back! Enjoy a hassle-free shopping experience." },
                { icon: ShieldCheck, title: "100% Authentic", description: "Shop with peace of mind knowing that all our products are 100% authentic." },
                { icon: CreditCard, title: "Secure payments", description: "Our website offers a 100% secure payment gateway, ensuring a completely safe shopping experience for you." }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-[#FFE66D] rounded-full p-4 mb-4">
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-[#E07A5F]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0A1930] mb-2 font-['Playfair_Display',serif]">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-[#344866] font-['Poppins',sans-serif]">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Hero;