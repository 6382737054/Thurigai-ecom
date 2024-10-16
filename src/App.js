import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';
import ProductsSection from './Pages/Products';
import AboutUsSection from './Pages/AboutUs';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import WhatsAppButton from './Components/WhatsappButton'; // You'll need to create this component

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
              </>
            } />
            <Route path="/products" element={<ProductsSection />} />
            <Route path="/about-us" element={<AboutUsSection />} />
            <Route path="/cart" element={<CartPage/>}/>
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <Footer className="mt-auto" />
        <WhatsAppButton /> {/* Add the WhatsApp button here */}
      </div>
    </Router>
  );
}

export default App;