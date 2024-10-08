import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar'
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import BlogForm from './pages/BlogForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>    
          <Route path="/" element={<Homepage />} /> 
          <Route path="/login" element={<Login />} /> 
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
