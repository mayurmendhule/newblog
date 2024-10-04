import React from 'react';
import { Link } from 'react-router-dom';
import ReIamge from '../assets/register_image.jpg';

const Register = () => {
  return (
    <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <form className="max-w-lg max-md:mx-auto w-full p-6">
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Register</h3>
            <p className="text-gray-800 text-sm mt-6">
              Create an account and join our amazing community today.
            </p>
          </div>

          {/* Username Field */}
          <div>
            <label className="text-gray-800 text-[15px] mb-2 block">Username</label>
            <div className="relative flex items-center">
              <input
                name="username"
                type="text"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                name="confirm-password"
                type="password"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>

          {/* Already have an account */}
          <p className="text-gray-800 text-sm !mt-8 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
              Sign in here
            </Link>
          </p>
        </form>

        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img
            src={ReIamge}
            className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
