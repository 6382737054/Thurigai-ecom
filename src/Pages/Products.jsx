import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, Search, X, ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react';

const mockProducts = [
    { id: 1, name: "Ornate Diya Set", category: "Decor", price: 599, rating: 4.5, reviews: 120, image: "/Images/product1.png", description: "Beautifully crafted diya set for festive illumination." },
    { id: 2, name: "Rangoli Stencil Kit", category: "Art", price: 299, rating: 4.2, reviews: 85, image: "/Images/product1.png", description: "Create stunning rangoli designs with ease." },
    { id: 3, name: "Festive Kurta - Men", category: "Clothing", price: 1499, rating: 4.7, reviews: 200, image: "/Images/product1.png", description: "Elegant kurta for men, perfect for Diwali celebrations." },
    { id: 4, name: "Lakshmi-Ganesh Idol", category: "Religious", price: 2999, rating: 4.9, reviews: 300, image: "/Images/product1.png", description: "Auspicious Lakshmi-Ganesh idol for prosperity." },
    { id: 5, name: "Diwali Sweets Box", category: "Food", price: 799, rating: 4.4, reviews: 150, image: "/Images/product1.png", description: "Assorted traditional sweets for gifting." },
    { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
    { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
    { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
    { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
    { id: 6, name: "Decorative String Lights", category: "Decor", price: 399, rating: 4.3, reviews: 110, image: "/Images/product1.png", description: "Sparkle up your home with these beautiful lights." },
  ];
  

const ProductCard = ({ product, onAddToCart, onToggleWishlist, viewMode }) => {
  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-md overflow-hidden relative ${
        viewMode === 'grid' ? 'flex flex-col' : 'flex items-center'
      }`}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative ${viewMode === 'grid' ? 'w-full h-64' : 'w-1/5 min-w-[120px] h-40'}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart className={`h-5 w-5 ${product.isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className={`p-4 flex flex-col justify-between ${viewMode === 'grid' ? '' : 'flex-1 flex flex-row'}`}>
        <div className={viewMode === 'grid' ? '' : 'flex-1 pr-4'}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>
          <p className={`text-gray-600 mb-2 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3'}`}>{product.description}</p>
        </div>
        <div className={`flex ${viewMode === 'grid' ? 'flex-col space-y-2' : 'flex-col justify-center items-end'}`}>
          <span className="text-xl font-bold text-gray-800 mb-2">₹{product.price.toFixed(2)}</span>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
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
    const [viewMode, setViewMode] = useState('grid');
    const productsPerPage = 6;
  
    useEffect(() => {
      const fetchProducts = async () => {
        const data = mockProducts;
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      };
  
      fetchProducts();
    }, []);
  
    useEffect(() => {
      let result = products;
  
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
        <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen pt-44"> {/* Increased pt-44 for more top padding */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-700 mb-12 text-center">Explore our collection</h2> {/* Updated text, increased font size, centered, and added more bottom margin */}
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <select 
                    className="bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="topRated">Top Rated</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-white border border-gray-300 text-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
    
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
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
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
        {filteredProducts.length === 0 && (
          <motion.p
            className="text-center text-xl text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No products found. Try adjusting your search or filters.
          </motion.p>
        )}

        {filteredProducts.length > productsPerPage && (
          <motion.div 
            className="mt-12 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className="mx-2 p-2 rounded-md bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-2 p-2 rounded-md bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
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