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

  const transitionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const images = [
    "/Images/caro1.png",
    "/Images/caro2.png",
    "/Images/caro3.png",
    "/Images/caro4.png",
    "/Images/caro5.png",
    "/Images/caro6.png",
    "/Images/caro7.png",
    "/Images/caro8.png",
    "/Images/caro9.png",
    "/Images/caro10.png",
    "/Images/caro11.png",
    "/Images/caro12.png",
    "/Images/caro13.png",
    "/Images/caro14.png",
    "/Images/caro15.png",
  ];

  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (swiper) {
        swiper.slideNext();
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [swiper]);

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

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-br from-[#f6e9d7] to-[#efeeec] min-h-screen py-20 px-2 sm:px-4 lg:px-6 pt-44 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#8b4513] mb-4 font-['Playfair_Display',serif]">
              Diwali Home Fest
            </h1>
            <p className="text-xl text-[#6c4a3d] max-w-2xl mx-auto font-['Open_Sans',sans-serif]">
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
              <div className="relative w-full h-[500px]">
                <AnimatePresence>
                  {products.map((product, index) => (
                    activeProduct === index && (
                      <motion.img
                        key={index}
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-2xl"
                        {...transitionProps}
                        transition={{ duration: 0.5 }}
                      />
                    )
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
  
            <motion.div  
              className="w-full md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-[#8b4513] mb-6 flex items-center font-['Playfair_Display',serif]">
                <Star className="mr-2" size={32} color="#FFC107" /> Featured Products
              </h2>
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 p-6 w-full md:w-[80%] rounded-lg cursor-pointer transition-all font-['Open_Sans',sans-serif] ${
                    activeProduct === index ? 'bg-[#f0d088] shadow-lg' : 'bg-white shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveProduct(index)}
                >
                  <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2 font-['Playfair_Display',serif]">{product.name}</h3>
                  <p className="text-[#6c6c6c]">{product.description}</p>
                </motion.div>
              ))}
              <div className="mt-8 flex justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1e5b5e] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#16464a] transition duration-300 flex items-center font-['Montserrat',sans-serif]"
                  >
                    <ShoppingBag className="mr-4" size={24} /> Shop Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-24">
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover={true}
              className="bg-gradient-to-r from-[#f0d088] to-[#e5d3ba] py-8 rounded-lg shadow-xl"
            >
              {marqueeItems.map((item, index) => (
                <div key={index} className="mx-8 flex items-center">
                  {item.type === 'image' ? (
                    <img src={item.content} alt={item.alt} className="h-24 w-24 object-cover rounded-full border-4 border-white shadow-md" />
                  ) : (
                    <h3 className="text-2xl font-bold text-[#8b4513] font-['Playfair_Display',serif]">{item.content}</h3>
                  )}
                </div>
              ))}
            </Marquee>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-24">
  
          <h2 className="text-3xl font-bold text-[#8b4513] mb-8 text-center font-['Playfair_Display',serif]">Exclusive Diwali Bundles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#FFD6E3] flex flex-col">
                <img src="/Images/Bundle1.png" alt="Diwali Bundle 1" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2 font-['Playfair_Display',serif]">Delightful Diwali Bundle</h3>
                <p className="text-[#6c6c6c] mb-4 flex-grow font-['Open_Sans',sans-serif]">Includes an assortment of lanterns, candles, and decorative items to create a warm and inviting ambiance.</p>
                <div className="mt-auto">
                <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#1e5b5e] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#16464a] transition duration-300 font-['Montserrat',sans-serif]"
  >
    <Link to="/products">
      <div className="flex items-center">
        <Gift className="mr-2 inline-block" size={20} />
        Buy Now
      </div>
    </Link>
  </motion.button>
  
                </div>
              </div>
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#FFD6E3] flex flex-col">
                <img src="/Images/Bundle2.png" alt="Diwali Bundle 2" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2 font-['Playfair_Display',serif]">Festive Feast Bundle</h3>
                <p className="text-[#6c6c6c] mb-4 flex-grow font-['Open_Sans',sans-serif]">Treat your loved ones to a selection of traditional sweets, savories, and delicacies.</p>
                <div className="mt-auto">
                <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#1e5b5e] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#16464a] transition duration-300 font-['Montserrat',sans-serif]"
  >
    <Link to="/products">
      <div className="flex items-center">
        <Gift className="mr-2 inline-block" size={20} />
        Buy Now
      </div>
    </Link>
  </motion.button>
  
                </div>
              </div>
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#FFD6E3] flex flex-col">
                <img src="/Images/Bundle3.png" alt="Diwali Bundle 3" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2 font-['Playfair_Display',serif]">Prosperity Package</h3>
                <p className="text-[#6c6c6c] mb-4 flex-grow font-['Open_Sans',sans-serif]">Elevate your celebrations with a curated selection of premium products and festive essentials.</p>
                <div className="mt-auto">
                <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-[#1e5b5e] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#16464a] transition duration-300 font-['Montserrat',sans-serif]"
  >
    <Link to="/products">
      <div className="flex items-center">
        <Gift className="mr-2 inline-block" size={20} />
        Buy Now
      </div>
    </Link>
  </motion.button>
  
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-24">
            <h2 className="text-3xl font-bold text-[#8b4513] mb-8 text-center font-['Playfair_Display',serif]">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#e5d3ba] flex items-center">
                <Truck className="mr-4 text-[#1e5b5e]" size={48} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-['Playfair_Display',serif]">Fast and Reliable Shipping</h3>
                  <p className="text-[#6c6c6c] font-['Open_Sans',sans-serif]">Get your festive essentials delivered right to your doorstep, in time for your celebrations.</p>
                </div>
              </div>
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#d4b5bf] flex items-center">
                <Star className="mr-4 text-[#1e5b5e]" size={48} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-['Playfair_Display',serif]">Handpicked Products</h3>
                  <p className="text-[#6c6c6c] font-['Open_Sans',sans-serif]">We curate the finest selection of products to ensure the highest quality and craftsmanship.</p>
                </div>
              </div>
              <div className="bg-white p-6 w-full md:w-[90%] rounded-lg shadow-md shadow-[#c9a89a] flex items-center">
                <Smile className="mr-4 text-[#1e5b5e]" size={48} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-['Playfair_Display',serif]">Exceptional Customer Service</h3>
                  <p className="text-[#6c6c6c] font-['Open_Sans',sans-serif]">Our dedicated team is always ready to assist you and ensure your utmost satisfaction.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-24">
            <h2 className="text-3xl font-bold text-[#8b4513] mb-8 text-center font-['Playfair_Display',serif]">Featured Products Gallery</h2>
            <Swiper
              onSwiper={setSwiper}
              slidesPerView={4}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-4 w-full md:w-[90%] rounded-lg shadow-md">
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full h-72 object-cover rounded-lg mb-4" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatedSection>
  
        <AnimatedSection>
          <motion.div className="mt-24">
            <h2 className="text-3xl font-bold text-[#8b4513] mb-12 text-center font-['Playfair_Display',serif]">Discover Our Diwali Specials</h2>
            {alternatingContent.map((content, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-24`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <motion.div
                  className="w-full md:w-1/2 mb-8 md:mb-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >

<img src={content.image} alt={content.title} className="w-full h-[400px] object-cover rounded-lg shadow-2xl" />
              </motion.div>
              <motion.div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + 0.2 * index }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-[#8b4513] mb-4 font-['Playfair_Display',serif]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {content.title}
                </motion.h3>
                <motion.p 
                  className="text-[#6c4a3d] text-lg leading-relaxed mb-6 font-['Open_Sans',sans-serif]"
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
        <motion.div className="mt-24">
          <h2 className="text-3xl font-bold text-[#8b4513] mb-12 text-center font-['Playfair_Display',serif]">What Our Customers Say</h2>
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
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#f0d088] shadow-md mb-4"
                />
                <p className="text-[#4a4a4a] text-lg italic mb-4 text-center font-['Open_Sans',sans-serif]">"{testimonials[currentTestimonial].text}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-[#1e5b5e] text-center font-['Playfair_Display',serif]">{testimonials[currentTestimonial].name}</p>
                  <p className="text-[#6c4a3d] text-sm text-center font-['Open_Sans',sans-serif]">{testimonials[currentTestimonial].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none transition-colors duration-300 ${
                    currentTestimonial === index ? 'bg-[#8b4513]' : 'bg-[#e5d3ba]'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection>
        <motion.div className="mt-24">
          <h2 className="text-3xl font-bold text-[#8b4513] mb-12 text-center font-['Playfair_Display',serif]">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#f0d088] rounded-full p-4 mb-4">
                <Package className="h-10 w-10 text-[#b8860b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8b4513] mb-2 font-['Playfair_Display',serif]">Free delivery across India</h3>
              <p className="text-[#6c4a3d] font-['Open_Sans',sans-serif]">Enjoy free delivery on orders over ₹999 within India and $59 internationally. We guarantee fast delivery.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#f0d088] rounded-full p-4 mb-4">
                <RefreshCw className="h-10 w-10 text-[#b8860b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8b4513] mb-2 font-['Playfair_Display',serif]">Easy replacement</h3>

              <p className="text-[#6c4a3d] font-['Open_Sans',sans-serif]">If you receive a damaged product, we'll gladly take it back! Enjoy a hassle-free shopping experience.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#f0d088] rounded-full p-4 mb-4">
                <ShieldCheck className="h-10 w-10 text-[#b8860b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8b4513] mb-2 font-['Playfair_Display',serif]">100% Authentic</h3>
              <p className="text-[#6c4a3d] font-['Open_Sans',sans-serif]">Shop with peace of mind knowing that all our products are 100% authentic.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#f0d088] rounded-full p-4 mb-4">
                <CreditCard className="h-10 w-10 text-[#b8860b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8b4513] mb-2 font-['Playfair_Display',serif]">Secure payments</h3>
              <p className="text-[#6c4a3d] font-['Open_Sans',sans-serif]">Our website offers a 100% secure payment gateway, ensuring a completely safe shopping experience for you.</p>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  </div>
);
};

export default Hero;