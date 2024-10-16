import React, { useState } from 'react';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = ['Home', 'Products', 'About Us', 'Gifting', 'Why Us'];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search our store"
                className="w-full py-2 pl-10 pr-4 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brown-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <Link to="/" className="flex items-center justify-center">
              <img 
                src="/Images/Logo.png"
                alt="Kuuraii Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>
          <div className="md:flex items-center justify-end w-1/3 hidden">
            <button className="text-brown-500 hover:text-brown-700 hover:underline">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="text-brown-500 hover:text-brown-700 ml-4 hover:underline">
              <UserIcon className="w-6 h-6" />
            </button>
            <Link 
        to="/cart" 
        className="text-brown-500 hover:text-brown-700 relative ml-4 hover:underline"
      >
        <ShoppingBagIcon className="w-6 h-6" />
      </Link>
          </div>
          <button className="md:hidden text-brown-500 hover:text-brown-700" onClick={toggleMenu}>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block bg-[#f7a76a] w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center py-4 space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item}
                to={item === 'Products' ? '/products' : item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm hover:text-brown-900 hover:underline ${
                  isActive(
                    item === 'Products' ? '/products' : item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`
                  )
                    ? 'text-brown-900 font-bold'
                    : 'text-brown-700'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#e8d7c3] shadow-md">
          {menuItems.map((item) => (
            <Link 
              key={item}
              to={item === 'Products' ? '/products' : item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`block px-4 py-2 text-sm hover:text-brown-900 hover:underline ${
                isActive(
                  item === 'Products' ? '/products' : item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`
                )
                  ? 'text-brown-900 font-bold'
                  : 'text-brown-700'
              }`}
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <div className="px-4 py-2 flex items-center">
            <button className="text-brown-500 hover:text-brown-700 hover:underline">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="text-brown-500 hover:text-brown-700 ml-4 hover:underline">
              <UserIcon className="w-6 h-6" />
            </button>
            <Link 
        to="/cart" 
        className="text-brown-500 hover:text-brown-700 relative ml-4 hover:underline"
      >
        <ShoppingBagIcon className="w-6 h-6" />
      </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;