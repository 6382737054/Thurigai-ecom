import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Hero from './Pages/Hero';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Hero/>
        <Routes>
      
      
        </Routes>
     
      </div>
    </Router>
  );
}

export default App;