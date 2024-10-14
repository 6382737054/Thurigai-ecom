import React, { useState } from 'react';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = ['Home', 'About Us', 'Products', 'Gifting', 'Why Us'];

  return (
    <header className="bg-wheat-light shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top bar */}
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">Your Logo</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, articles, faq..."
                  className="w-64 py-2 pl-4 pr-10 text-sm rounded-full border border-wheat-dark focus:outline-none focus:ring-1 focus:ring-wheat-dark focus:border-transparent bg-white"
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button className="text-gray-600 hover:text-gray-800">
                <HeartIcon className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <UserIcon className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <ShoppingBagIcon className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex justify-center space-x-8 py-4 border-t border-wheat-dark">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-700 hover:text-wheat-dark transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-wheat-light shadow-md">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search products, articles, faq..."
              className="w-full py-2 pl-4 pr-10 text-sm rounded-full border border-wheat-dark focus:outline-none focus:ring-1 focus:ring-wheat-dark focus:border-transparent bg-white"
            />
          </div>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-2 text-gray-700 hover:bg-wheat-dark hover:text-white"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <div className="flex justify-around py-4 border-t border-wheat-dark">
            <button className="text-gray-600 hover:text-gray-800">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <UserIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <ShoppingBagIcon className="w-6 h-6" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;