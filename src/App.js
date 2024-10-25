import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import BlogForm from './pages/BlogForm';
import Dashboard from './pages/Dashboard';
import { showErrorAlert } from './service/alertService'; // Import alert service
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state to avoid flicker
  const [userRole, setUserRole] = useState(null); // Store user role
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token) {
      setIsLoggedIn(true); // Set logged in if token exists
      setUserRole(role); // Set the role from localStorage
    }
    setLoading(false); // Once checked, stop the loading
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserRole(localStorage.getItem('userRole')); // Fetch role after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('userRole'); // Clear role on logout
  };

  // Protected Route for BlogForm
  const ProtectedRoute = ({ children }) => {
    if (loading) return null; // Wait until loading is finished
    if (!isLoggedIn) {
      showErrorAlert('Access Denied', 'Please log in to write a blog');
      return <Navigate to="/login" />; // Redirect to login page if not logged in
    }
    return children; // Render the component if logged in
  };

   // Protected Route for Admin
   const AdminRoute = ({ children }) => {
    if (loading) return null; // Wait until loading is finished
    if (!isLoggedIn || userRole !== 'admin') {
      showErrorAlert('Access Denied', 'Only admins can access the dashboard');
      return <Navigate to="/" />; // Redirect to homepage if not admin
    }
    return children; // Render the component if logged in as admin
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/blogform" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} /> {/* Protected Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} /> {/* Admin-Only Route */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
