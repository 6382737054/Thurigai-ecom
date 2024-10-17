import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';
import ProductsSection from './Pages/Products';
import AboutUsSection from './Pages/AboutUs';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import WhatsAppButton from './Components/WhatsappButton';
import PhoneButton from './Components/PhoneButton';
import ProductDescription from './Pages/ProductDescription';
import Gallery from './Pages/Gallery';
import UserColumns from './Pages/UserColumns'; // Import the new UserColumns component
import GiftingPage from './Pages/GiftPage';

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
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/user-columns" element={<UserColumns />} /> {/* New route for UserColumns */}
            <Route path="/gifting" element={<GiftingPage/>}/>

          </Routes>
        </main>
        <Footer className="mt-auto" />
        {isLoaded && (
          <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4 z-50">
            <PhoneButton phoneNumber="9043705101" />
            <WhatsAppButton />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;