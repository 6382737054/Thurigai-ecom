import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Award, Users, Heart, MessageCircle, Mail,Gift } from 'lucide-react';

const Hero = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const products = [
    { name: "Golden Bowl", image: "/Images/Hero1.png", description: "Elegant ceremonial bowl crafted by skilled artisans. Perfect for festive gatherings and special occasions." },
    { name: "Diwali Lanterns", image: "/Images/Hero2.png", description: "Illuminate your home with these enchanting lanterns. Each piece is a work of art that casts a warm, inviting glow." },
    { name: "Festive Treats", image:"/Images/Hero3.png" , description: "Indulge in a selection of traditional delicacies, handmade with the finest ingredients to tantalize your taste buds." },
  ];

  const transitionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-gradient-to-br from-[#ffff] to-[#FBCFE8] min-h-screen py-20 px-4 sm:px-6 lg:px-8 pt-44">
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...transitionProps}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#8b4513] mb-4">
            Diwali Home Fest
          </h1>
          <p className="text-xl text-[#6c4a3d] max-w-2xl mx-auto">
            Celebrate with handcrafted essentials that bring the magic of India's festivities into your home.
          </p>
        </motion.div>
 
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
            <h2 className="text-3xl font-bold text-[#8b4513] mb-6 flex items-center">
              <Star className="mr-2" size={32} color="#FFC107" /> Featured Products
            </h2>
            {products.map((product, index) => (
              <motion.div
                key={index}
                className={`mb-4 p-6 rounded-lg cursor-pointer transition-all ${
                  activeProduct === index ? 'bg-[#f0d088] shadow-lg' : 'bg-white'
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveProduct(index)}
              >
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2">{product.name}</h3>
                <p className="text-[#6c6c6c]">{product.description}</p>
              </motion.div>
            ))}
            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1e5b5e] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#16464a] transition duration-300 flex items-center"
              >
                <ShoppingBag className="mr-4" size={24} /> Shop Now
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#8b4513] mb-8 text-center">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Award className="mr-4 text-[#1e5b5e]" size={48} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Award-Winning Craftsmanship</h3>
                <p className="text-[#6c6c6c]">Our artisans are renowned for their exceptional skills and attention to detail.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Users className="mr-4 text-[#1e5b5e]" size={48} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Empowering Communities</h3>
                <p className="text-[#6c6c6c]">By supporting local artisans, we help preserve traditional crafts and provide sustainable livelihoods.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Heart className="mr-4 text-[#1e5b5e]" size={48} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Elevating Celebrations</h3>
                <p className="text-[#6c6c6c]">Our curated collection brings joy, beauty, and meaning to your festive moments.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#8b4513] mb-4 flex items-center justify-center">
            <Gift className="mr-2" size={32} color="#8b4513" /> Special Diwali Offer
          </h2>
          <p className="text-2xl text-[#6c4a3d]">Up to 50% off on all home & living products</p>
          <motion.div
            className="inline-block mt-8 bg-white text-[#16464a] py-3 px-8 rounded-full font-semibold shadow-lg" 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Grab the Deal
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-[#8b4513] mb-8 text-center">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-[#6c6c6c] mb-4">"The Diwali lanterns from this store are simply stunning! They added such a warm and inviting ambiance to our home during the festival."</p>
              <div className="flex items-center">
                <img src="/Images/avatar1.png" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Priya Patel</p>
                  <p className="text-[#6c6c6c] text-sm">Satisfied Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-[#6c6c6c] mb-4">"I gifted the festive treats to my family, and they absolutely loved them! The quality and taste were exceptional."</p>
              <div className="flex items-center">
                <img src="/Images/avatar2.png" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Rahul Sharma</p>
                  <p className="text-[#6c6c6c] text-sm">Happy Customer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 bg-[#1e5b5e] text-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8">Stay updated with our latest collections, exclusive offers, and festive inspiration.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow mb-4 sm:mb-0 sm:mr-4 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#16464a]"
              />
              <button
                type="submit"
                className="bg-white text-[#1e5b5e] py-3 px-8 rounded-full font-semibold hover:bg-[#f0d088] transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;