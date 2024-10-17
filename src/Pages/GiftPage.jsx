import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Filter, X, Eye } from 'lucide-react';

const giftCategories = ["All", "For Him", "For Her", "For Kids", "Home & Living", "Tech Gadgets"];

const giftItems = [
  { id: 1, name: "Premium Leather Wallet", price: 2999, category: "For Him", rating: 4.5, reviews: 128, image: "/api/placeholder/300/300" },
  { id: 2, name: "Smart Home Assistant", price: 4999, category: "Tech Gadgets", rating: 4.2, reviews: 256, image: "/api/placeholder/300/300" },
  { id: 3, name: "Luxury Perfume Set", price: 5999, category: "For Her", rating: 4.8, reviews: 89, image: "/api/placeholder/300/300" },
  { id: 4, name: "Interactive Learning Tablet", price: 3499, category: "For Kids", rating: 4.0, reviews: 75, image: "/api/placeholder/300/300" },
  { id: 5, name: "Artisanal Copper Cookware", price: 7999, category: "Home & Living", rating: 4.7, reviews: 62, image: "/api/placeholder/300/300" },
  { id: 6, name: "Noise-Cancelling Headphones", price: 12999, category: "Tech Gadgets", rating: 4.6, reviews: 301, image: "/api/placeholder/300/300" },
];

const GiftingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [filteredItems, setFilteredItems] = useState(giftItems);
  const [cart, setCart] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const filtered = giftItems.filter(item => 
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredItems(filtered);
  }, [selectedCategory, priceRange]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const viewProduct = (item) => {
    // Placeholder function for viewing product details
    console.log("Viewing product:", item.name);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#000080] p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Exquisite Gifts</h1>
        <p className="text-lg md:text-xl text-[#4169E1]">Find the perfect gift for your loved ones</p>
      </header>

      <div className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-lg z-50">
        <ShoppingCart className="text-[#000080]" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {cart.length}
        </span>
      </div>

      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="fixed bottom-4 right-4 bg-[#000080] text-white p-3 rounded-full shadow-lg z-50"
      >
        <Filter size={24} />
      </button>

      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40 p-4`}>
        <button onClick={() => setIsFilterOpen(false)} className="absolute top-2 right-2">
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category</h3>
          {giftCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left py-1 px-2 rounded ${selectedCategory === category ? 'bg-[#000080] text-white' : 'hover:bg-gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex justify-between mb-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="15000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-[#4169E1] mb-2">₹{item.price.toLocaleString('en-IN')}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={item.rating} />
                <span className="ml-2 text-sm text-gray-600">({item.reviews} reviews)</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 bg-[#FF8C00] text-white py-2 rounded-md hover:bg-[#FFA500] transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2" size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => viewProduct(item)}
                  className="flex-1 bg-[#FF8C00] text-white py-2 rounded-md hover:bg-[#FFA500] transition-colors flex items-center justify-center"
                >
                  <Eye className="mr-2" size={18} />
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftingPage;