//ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResetPage from '../assets/resetpassword.jpg'
import {showSuccessAlert, showErrorAlert} from '../service/alertService'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Token from the reset link
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    showErrorAlert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

    //   alert('Password reset successfully. You can now log in.');
    showSuccessAlert('Password reset successfully. You can now log in.');
      setLoading(false);
      navigate('/login');
    } catch (error) {
    //   setError(error.message);
    showErrorAlert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <form className="max-w-lg max-md:mx-auto w-full p-6" onSubmit={handleResetPassword}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Reset Password</h3>
            <p className="text-gray-800 text-sm mt-6">
              Please enter your new password below.
            </p>
          </div>

          <div>
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">New Password</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
              placeholder="Enter new password"
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
              placeholder="Confirm new password"
            />
          </div>

          {/* {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>} */}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-green-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>
        </form>
        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img
            src={ResetPage}
            className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
            alt="Login"
          />
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
