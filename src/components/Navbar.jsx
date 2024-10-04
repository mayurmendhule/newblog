import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
