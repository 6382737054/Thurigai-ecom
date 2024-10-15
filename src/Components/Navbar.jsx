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
    <header className="bg-[#ffe5a2] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col">
          {/* Top bar */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Images/FooterLogo.png" 
                  alt="Your Logo" 
                  className="h-8 w-auto" // Reduced height
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3"> {/* Reduced space */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, articles, faq..."
                  className="w-56 py-1 pl-3 pr-8 text-xs rounded-full border border-wheat-dark focus:outline-none focus:ring-1 focus:ring-wheat-dark focus:border-transparent bg-white" // Reduced size and padding
                />
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /> {/* Reduced icon size */}
              </div>
              <button className="text-black hover:underline">
                <HeartIcon className="w-5 h-5" /> {/* Reduced icon size */}
              </button>
              <button className="text-black hover:underline">
                <UserIcon className="w-5 h-5" /> {/* Reduced icon size */}
              </button>
              <button className="text-black hover:underline">
                <ShoppingBagIcon className="w-5 h-5" /> {/* Reduced icon size */}
              </button>
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden text-black hover:underline focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* Reduced icon size */}
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex justify-center space-x-6 py-2 border-t border-wheat-dark"> {/* Reduced padding and space */}
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-black hover:underline transition-colors duration-300 text-sm" // Reduced font size
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
          <div className="px-3 py-2"> {/* Reduced padding */}
            <input
              type="text"
              placeholder="Search products, articles, faq..."
              className="w-full py-1 pl-3 pr-8 text-xs rounded-full border border-wheat-dark focus:outline-none focus:ring-1 focus:ring-wheat-dark focus:border-transparent bg-white" // Reduced size and padding
            />
          </div>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-3 py-2 text-black hover:underline text-sm" // Reduced padding and font size
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <div className="flex justify-around py-3 border-t border-wheat-dark"> {/* Reduced padding */}
            <button className="text-black hover:underline">
              <HeartIcon className="w-5 h-5" /> {/* Reduced icon size */}
            </button>
            <button className="text-black hover:underline">
              <UserIcon className="w-5 h-5" /> {/* Reduced icon size */}
            </button>
            <button className="text-black hover:underline">
              <ShoppingBagIcon className="w-5 h-5" /> {/* Reduced icon size */}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;