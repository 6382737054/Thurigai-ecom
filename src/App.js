import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';
import ProductsSection from './Pages/Products';
import AboutUsSection from './Pages/AboutUs';
import Footer from './Components/Footer';

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
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
}

export default App;