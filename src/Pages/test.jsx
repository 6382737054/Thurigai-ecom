import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, Search, ChevronLeft, ChevronRight, Filter, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const personalizedGifts = [
  { id: 1, name: "Personalized Ceramic Cup", price: 599, rating: 4.5, reviews: 128, image: "/Images/Gifts/Gift3.png", description: "Custom-designed ceramic cup with your choice of name or message." },
  { id: 2, name: "Custom Badge", price: 299, rating: 4.2, reviews: 85, image: "/Images/Gifts/Gift10.png", description: "Unique badge designed to your specifications." },
  { id: 3, name: "Engraved Wooden Hanger", price: 499, rating: 4.7, reviews: 92, image: "/Images/Gifts/Gift8.png", description: "Elegant wooden hanger with custom engraving." },
  { id: 4, name: "Personalized Key Chain", price: 399, rating: 4.3, reviews: 110, image: "/Images/Gifts/Gift5.png", description: "Durable key chain with your chosen design or text." },
  { id: 5, name: "Laser Engraved Acrylic Photo Frame", price: 799, rating: 4.6, reviews: 75, image: "/Images/Gifts/Gift11.png", description: "Modern acrylic frame with your photo laser-engraved." },
  { id: 6, name: "Custom Metal Bottle", price: 699, rating: 4.4, reviews: 88, image: "/Images/Gifts/Gift9.png", description: "High-quality metal bottle with personalized engraving." },
];

export const occasionGifts = [
  { id: 7, name: "Birthday Gift Set", price: 1299, rating: 4.8, reviews: 150, image: "/Images/Gifts/Gift1.png", description: "Complete gift set perfect for birthday celebrations.", occasion: "Birthday" },
  { id: 8, name: "Wedding Favor Pack", price: 1599, rating: 4.7, reviews: 120, image: "/Images/Gifts/Gift4.png", description: "Elegant favors for wedding guests.", occasion: "Marriage" },
  { id: 9, name: "House Party Goodie Bag", price: 899, rating: 4.5, reviews: 95, image: "/Images/Gifts/Gift7.png", description: "Fun-filled goodie bag for house party guests.", occasion: "House party" },
  { id: 10, name: "Religious Ceremony Gift Box", price: 1099, rating: 4.6, reviews: 110, image: "/Images/Gifts/Gift6.png", description: "Thoughtful gift box for religious occasions.", occasion: "Religious function" },
  { id: 11, name: "Baby Shower Gift Basket", price: 1499, rating: 4.9, reviews: 135, image: "Images/Gifts/Gift2.png", description: "Adorable gift basket for expecting parents.", occasion: "Baby shower" },
];

const allGifts = [...personalizedGifts, ...occasionGifts];

const GiftCard = ({ gift, onAddToCart, onToggleWishlist, onViewProduct }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-64">
        <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
          <button
            className="bg-white text-gray-800 rounded-full p-2 m-2 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => onToggleWishlist(gift.id)}
          >
            <Heart className={`h-5 w-5 ${gift.isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-[#1A2E44] mb-1 line-clamp-1">{gift.name}</h3>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(gift.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-[#4A6FA5]">({gift.reviews})</span>
          </div>
          <p className="text-[#4A6FA5] mb-2 line-clamp-2">{gift.description}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-bold text-[#1A2E44]">₹{gift.price.toFixed(2)}</span>
          <button
            className="bg-[#E07A5F] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
            onClick={() => onAddToCart(gift)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </button>
          <button
            className="bg-gray-200 text-[#1A2E44] py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            onClick={() => onViewProduct(gift.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Product
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const GiftingPage = () => {
  const [gifts, setGifts] = useState(allGifts);
  const [filteredGifts, setFilteredGifts] = useState(allGifts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const giftsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    let result = [...gifts];

    if (selectedCategory !== 'All') {
      result = result.filter(gift => gift.occasion === selectedCategory || (!gift.occasion && selectedCategory === 'Personalized'));
    }

    if (searchTerm) {
      result = result.filter(gift => 
        gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'topRated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredGifts(result);
    setCurrentPage(1);
  }, [gifts, selectedCategory, sortBy, searchTerm]);

  const handleAddToCart = (gift) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === gift.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...gift, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Dispatch a custom event to update the cart count in real-time
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Navigate to the cart page
    navigate('/cart');
  };

  const handleToggleWishlist = (giftId) => {
    setGifts(gifts.map(gift => 
      gift.id === giftId ? { ...gift, isWishlisted: !gift.isWishlisted } : gift
    ));
  };

  const handleViewProduct = (giftId) => {
    navigate(`/product/${giftId}`);
  };

  const indexOfLastGift = currentPage * giftsPerPage;
  const indexOfFirstGift = indexOfLastGift - giftsPerPage;
  const currentGifts = filteredGifts.slice(indexOfFirstGift, indexOfLastGift);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-48">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-[#1A2E44] mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Exquisite Gifting Collection
        </motion.h2>
        
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                className="bg-[#E07A5F] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gifts..."
                  className="bg-gray-100 border-none text-[#1A2E44] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-[#4A6FA5] absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="bg-gray-100 border-none text-[#1A2E44] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <motion.div 
              className="mt-4 flex flex-wrap gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['All', 'Personalized', 'Birthday', 'Marriage', 'House party', 'Religious function', 'Baby shower'].map(category => (
                <button
                  key={category}
                  className={`py-1 px-4 rounded-full text-sm ${
                    selectedCategory === category ? 'bg-[#E07A5F] text-white' : 'bg-gray-200 text-[#1A2E44]'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {currentGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GiftCard 
                  gift={gift} 
                  onAddToCart={handleAddToCart} 
                  onToggleWishlist={handleToggleWishlist}
                  onViewProduct={handleViewProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGifts.length === 0 && (
          <motion.p
            className="text-center text-xl text-[#4A6FA5] mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No gifts found. Try adjusting your search or filters.
          </motion.p>
        )}
{filteredGifts.length > 0 && (
          <p className="text-center text-[#4A6FA5] mt-4">
            Showing {currentGifts.length} of {filteredGifts.length} gifts
          </p>
        )}

        {filteredGifts.length > giftsPerPage && (
          <motion.div
            className="mt-12 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className="mx-2 p-2 rounded-full bg-[#E07A5F] text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-[#C86D54] transition-colors duration-300"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {[...Array(Math.ceil(filteredGifts.length / giftsPerPage))]
              .slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, Math.ceil(filteredGifts.length / giftsPerPage)))
              .map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                return (
                  <button
                    key={pageNumber}
                    className={`mx-1 w-10 h-10 rounded-full ${currentPage === pageNumber ? 'bg-[#E07A5F] text-white' : 'bg-white text-[#E07A5F] hover:bg-[#FDF2F0]'} transition-colors duration-300`}
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      setSelectedCategory('All');
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            <button
              className="mx-2 p-2 rounded-full bg-[#E07A5F] text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-[#C86D54] transition-colors duration-300"
              onClick={() => paginate(currentPage < Math.ceil(filteredGifts.length / giftsPerPage) ? currentPage + 1 : currentPage)}
              disabled={currentPage === Math.ceil(filteredGifts.length / giftsPerPage)}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftingPage;