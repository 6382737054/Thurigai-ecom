import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';
import Footer from './Components/Footer'; // Import the Footer component

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Hero />
          <Routes>
            {/* Add your routes here */}
          </Routes>
        </main>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </Router>
  );
}

export default App;