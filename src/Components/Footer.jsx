import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook, link: 'https://facebook.com' },
    { Icon: Instagram, link: 'https://instagram.com' },
    { Icon: Twitter, link: 'https://twitter.com' },
    { Icon: Linkedin, link: 'https://linkedin.com' },
  ];

  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Our Team', 'Careers', 'Contact Us'],
    },
    {
      title: 'Products',
      links: ['Diwali Decor', 'Artisanal Diyas', 'Festive Treats', 'Gift Hampers'],
    },
    {
      title: 'Customer Service',
      links: ['FAQ', 'Shipping', 'Returns', 'Track Order'],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#1e5b5e] to-[#16464a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <motion.div 
            className="col-span-1 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Diwali Home Fest</h2>
            <p className="text-gray-300 mb-6">
              Celebrating the festival of lights with exquisite decor and delightful treats.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={section.title}
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            >
              <h3 className="text-xl font-semibold mb-4 pl-20">{section.title}</h3>
              <ul className="space-y-2 pl-20">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.hr 
          className="border-t border-white border-opacity-20 my-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-gray-300 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            &copy; {new Date().getFullYear()} Diwali Home Fest. All rights reserved.
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex space-x-4 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {socialIcons.map(({ Icon, link }) => (
              <a 
                key={link} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#f0d088] transition duration-300"
              >
                <Icon size={24} />
              </a>
            ))}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <span>contact@diwalihomefest.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>123 Festive Street, Celebration City</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;