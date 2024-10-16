import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { id: 1, src: '/Images/Products/product1.png', alt: 'Product 1' },
  { id: 2, src: '/Images/Products/product2.png', alt: 'Product 2' },
  { id: 3, src: '/Images/Products/product3.png', alt: 'Product 3' },
  { id: 4, src: '/Images/Products/product4.png', alt: 'Product 4' },
  { id: 5, src: '/Images/Products/product5.png', alt: 'Product 5' },
  { id: 6, src: '/Images/Products/product6.png', alt: 'Product 6' },
  { id: 7, src: '/Images/Products/product7.png', alt: 'Product 7' },
  { id: 8, src: '/Images/Products/product8.png', alt: 'Product 8' },
  { id: 9, src: '/Images/Products/product9.png', alt: 'Product 9' },
  { id: 10, src: '/Images/Products/product10.png', alt: 'Product 10' },
  { id: 11, src: '/Images/Products/product11.png', alt: 'Product 11' },
  { id: 12, src: '/Images/Products/product12.png', alt: 'Product 12' },


];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#f3f2f1] py-16 px-4 sm:px-6 lg:px-8 pt-44">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#34495e] mb-12 font-['Playfair_Display',serif]">
          Our Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <p className="text-white text-center mt-4 text-lg">{selectedImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;