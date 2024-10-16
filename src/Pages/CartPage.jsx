import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([
    { id: 1, name: "Ornate Diya Set", category: "Decor", price: 599, rating: 4.5, reviews: 120, image: "/Images/product1.png", description: "Beautifully crafted diya set for festive illumination." },
    { id: 2, name: "Rangoli Stencil Kit", category: "Art", price: 299, rating: 4.2, reviews: 85, image: "/Images/product1.png", description: "Create stunning rangoli designs with ease." },
    { id: 3, name: "Festive Kurta - Men", category: "Clothing", price: 1499, rating: 4.7, reviews: 200, image: "/Images/product1.png", description: "Elegant kurta for men, perfect for Diwali celebrations." },
    { id: 4, name: "Lakshmi-Ganesh Idol", category: "Religious", price: 2999, rating: 4.9, reviews: 300, image: "/Images/product1.png", description: "Auspicious Lakshmi-Ganesh idol for prosperity." },
  ]);
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

  const handleAddToCart = (product) => {
    // Add the product to the cart
    addToCart(product);
    // Update the cart items state
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  };

  const addToCart = (product) => {
    // Update the cart state (e.g., using a context or Redux)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If the product already exists in the cart, update the quantity
      cartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If the product is new, add it to the cart with a quantity of 1
      cartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
<motion.div className="mt-16 mb-24" {...fadeInUp}>
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-['Playfair_Display',serif]">
    You might also like
  </h2>
  <div className="grid grid-cols-4 gap-6">
    {recommendedProducts.map((product, index) => (
      <motion.div
        key={product.id}
        className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-3">₹{product.price.toLocaleString()}</p>
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default CartPage;