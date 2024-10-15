import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const mockProducts = [
  { id: 1, name: "Ornate Diya Set", category: "Decor", price: 599, rating: 4.5, reviews: 120, image: "/Images/product1.png", description: "Beautifully crafted diya set for festive illumination." },
  { id: 2, name: "Rangoli Stencil Kit", category: "Art", price: 299, rating: 4.2, reviews: 85, image: "/Images/product1.png", description: "Create stunning rangoli designs with ease." },
  { id: 3, name: "Festive Kurta - Men", category: "Clothing", price: 1499, rating: 4.7, reviews: 200, image: "/Images/product1.png", description: "Elegant kurta for men, perfect for Diwali celebrations." },
  { id: 4, name: "Lakshmi-Ganesh Idol", category: "Religious", price: 2999, rating: 4.9, reviews: 300, image: "/Images/product1.png", description: "Auspicious Lakshmi-Ganesh idol for prosperity." },
  { id: 5, name: "Diwali Sweets Box", category: "Food", price: 799, rating: 4.4, reviews: 150, image: "/Images/product1.png", description: "Assorted traditional sweets for gifting." },
  { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
  { id: 7, name: "Diwali Greeting Cards Set", category: "Stationery", price: 199, rating: 4.1, reviews: 80, image: "/Images/product1.png", description: "Beautifully designed cards for Diwali wishes." },
  { id: 8, name: "Traditional Oil Lamp", category: "Decor", price: 499, rating: 4.6, reviews: 95, image: "/Images/product1.png", description: "Authentic brass oil lamp for traditional touch." },
  { id: 9, name: "Fireworks Safety Kit", category: "Safety", price: 699, rating: 4.8, reviews: 220, image: "/Images/product1.png", description: "Essential safety gear for enjoying fireworks responsibly." },
  { id: 10, name: "Diwali Recipe Book", category: "Books", price: 349, rating: 4.5, reviews: 130, image: "/Images/product1.png", description: "Collection of traditional Diwali recipes and sweets." },
  { id: 11, name: "Festive Home Decor Set", category: "Decor", price: 1299, rating: 4.7, reviews: 180, image: "/Images/product1.png", description: "Complete set to decorate your home for Diwali." },
  { id: 12, name: "Designer Diyas (Set of 6)", category: "Decor", price: 449, rating: 4.4, reviews: 140, image: "/Images/product1.png", description: "Artistically crafted diyas to elevate your decor." },
  { id: 13, name: "Diwali Gift Hamper", category: "Gifts", price: 1599, rating: 4.8, reviews: 250, image: "/Images/product1.png", description: "Luxurious gift hamper with assorted Diwali goodies." },
];

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-60">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
          <button
            className="bg-white text-gray-800 rounded-full p-2 m-2 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart className={`h-5 w-5 ${product.isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>
          <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      // In a real application, you would fetch data from an API here
      const data = mockProducts;
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products]; // Create a new array to avoid mutating the original

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, selectedCategory, sortBy, searchTerm]);

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Implement add to cart logic
  };

  const handleToggleWishlist = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
    ));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen pt-44">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Our Diwali Collection
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
                className="bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-gray-100 border-none text-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="bg-gray-100 border-none text-gray-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {categories.map(category => (
                <button
                  key={category}
                  className={`py-1 px-4 rounded-full text-sm ${
                    selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                  onToggleWishlist={handleToggleWishlist}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.p
            className="text-center text-xl text-gray-600 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No products found. Try adjusting your search or filters.
          </motion.p>
        )}

        {filteredProducts.length > 0 && (
          <p className="text-center text-gray-600 mt-4">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </p>
        )}

        {filteredProducts.length > productsPerPage && (
          <motion.div
            className="mt-12 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className="mx-2 p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors duration-300"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {[...Array(Math.ceil(filteredProducts.length / productsPerPage))]
              .slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, Math.ceil(filteredProducts.length / productsPerPage)))
              .map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                return (
                  <button
                    key={pageNumber}
                    className={`mx-1 w-10 h-10 rounded-full ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'} transition-colors duration-300`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            <button
              className="mx-2 p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors duration-300"
              onClick={() => paginate(currentPage < Math.ceil(filteredProducts.length / productsPerPage) ? currentPage + 1 : currentPage)}
              disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;