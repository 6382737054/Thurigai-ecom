import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowLeft, Plus, Minus, X } from 'lucide-react';
import { mockProducts } from './Products'; // Adjust the import path as needed

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const fetchedProduct = mockProducts.find(p => p.id === parseInt(id));
    setProduct(fetchedProduct || null);

    if (fetchedProduct) {
      const related = mockProducts
        .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600">Product not found.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
  
    if (existingItem) {
      cartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      cartItems = [...cartItems, { ...product, quantity }];
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000); // Hide snackbar after 3 seconds
  };

  const handleToggleWishlist = () => {
    setProduct(prevProduct => ({
      ...prevProduct,
      isWishlisted: !prevProduct.isWishlisted
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          <ArrowLeft className="mr-2" /> Back to Products
        </button>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 p-4">
              <img className="w-full h-96 object-contain rounded-lg" src={product.image} alt={product.name} />
            </div>
            <div className="p-8 md:w-1/2">
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.h2>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-600">Category: {product.category}</span>
              </div>
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-700 rounded-full p-2"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-4 text-xl font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 text-gray-700 rounded-full p-2"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  className="bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-lg font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${product.isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full h-48 object-cover" src={relatedProduct.image} alt={relatedProduct.name} />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{relatedProduct.name}</h4>
                    <p className="text-gray-600 mb-2">{relatedProduct.description.slice(0, 50)}...</p>
                    <button
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Integrated Snackbar */}
      <AnimatePresence>
        {snackbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
          >
            <span>{`${product.name} added to cart`}</span>
            <button onClick={() => setSnackbarVisible(false)} className="ml-2">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDescription;