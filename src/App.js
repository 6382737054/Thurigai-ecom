import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';
import ProductsSection from './Pages/Products';
import AboutUsSection from './Pages/AboutUs';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';


import ProductDescription from './Pages/ProductDescription';
import Gallery from './Pages/Gallery';
import UserColumns from './Pages/UserColumns';
import GiftingPage from './Pages/GiftPage';
import GiftDescription from './Pages/GiftDescription';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer);
  }, []);

  return (
   
      <Router>
        <div className="App flex flex-col min-h-screen relative">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/products" element={<ProductsSection />} />
              <Route path="/product/:id" element={<ProductDescription />} />
              <Route path="/about-us" element={<AboutUsSection />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/user-columns" element={<UserColumns />} />
              <Route path="/gifting" element={<GiftingPage />} />
              <Route path="/gift/:id" element={<GiftDescription />} />
            </Routes>
          </main>
          <Footer className="mt-auto" />
 
        </div>
      </Router>
  
  );
}

export default App;