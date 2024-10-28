// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogImage from '../assets/login_image.jpg';
import {showErrorAlert, showSuccessAlert} from '../service/alertService'


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      else{
        showSuccessAlert("login sucessful")
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage
      localStorage.setItem('userRole', data.user.role); // Save the user's role (e.g., admin or user)
      setLoading(false);
      onLogin(); // Notify parent (App.js) about successful login
      navigate('/');
    } catch (error) {
     showErrorAlert(error.message);
     console.log(error.message)
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <form className="max-w-lg max-md:mx-auto w-full p-6" onSubmit={handleLogin}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
            <p className="text-gray-800 text-sm mt-6">
              "Your Hassle-Free Login: Dive into Our Blog for Seamless Exploration."
            </p>
          </div>

          <div>
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Email</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
              placeholder="Enter email"
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Password</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
              placeholder="Enter password"
            />
          </div>

          {/* {error && <p className="text-red-500">{error}</p>} Display error message */}

          <div class="mt-4 text-right">
              <Link to="/forgotpassword" class="text-blue-600 text-sm font-semibold hover:underline">Forgot your password?</Link>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-green-600 focus:outline-none"
              disabled={loading} // Disable the button during loading
            >
              {loading ? 'Logging in...' : 'Log in'} {/* Show loading text */}
            </button>
          </div>
          <p className="text-gray-800 text-sm !mt-8 text-center">
            Don't have an account?
            <Link to="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
              Register here
            </Link>
          </p>
        </form>

        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img
            src={LogImage}
            className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;


