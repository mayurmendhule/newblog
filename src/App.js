import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar'
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import BlogForm from './pages/BlogForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if token exists
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
        <Routes>    
          <Route path="/" element={<Homepage />} /> 
          <Route path="/login" element={<Login  onLogin={handleLogin}/>} /> 
          <Route path="/blogform" element={<BlogForm />} /> 
          <Route path="/register" element={<Register />} />  
          <Route path="/contactus" element={<ContactUs />} />  
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
