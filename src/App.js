import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar'
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>    
          <Route path="/" element={<Homepage />} /> 
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
