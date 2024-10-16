import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage or a state management solution
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;
  };

  const handleQuantityChange = (item, change) => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + change) }
        : cartItem
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    // Implement checkout logic, e.g., navigate to the checkout page
    navigate('/checkout');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pt-48 font-['Lato',sans-serif]">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-8 text-center font-['Playfair_Display',serif]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div className="lg:w-2/3" {...fadeInUp}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center py-6 border-b last:border-b-0"
                        {...fadeInUp}
                        layout
                      >
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-gray-600 mb-2">₹{item.price.toLocaleString()}</p>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none bg-gray-100 rounded-full p-1"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-3 w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none bg-gray-100 rounded-full p-1"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-800 mb-2">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-red-500 hover:text-red-700 focus:outline-none bg-red-100 rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button className="text-pink-500 hover:text-pink-700 focus:outline-none bg-pink-100 rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110">
                              <Heart size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center">
                  <ArrowLeft size={20} className="mr-2" />
                  Continue Shopping
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="lg:w-1/3" {...fadeInUp}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden sticky top-20">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Playfair_Display',serif]">
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center transition duration-300 ease-in-out"
                  >
                    <ShoppingBag className="mr-2" size={20} />
                    Proceed to Checkout
                  </button>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Secure Checkout. 100% Authentic Products.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;