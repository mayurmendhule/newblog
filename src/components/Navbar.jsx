import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex border-b py-4 items-center justify-between px-4 sm:px-8 bg-white py-4">
      <div className="flex items-center w-full gap-5" id="navmain">
        {/* Logo */}
        <Link to="/">
          {/* <img src={} alt="logo" className="w-36" /> */}
        </Link>

        {/* Menu Section */}
        <div
          id="collapseMenu"
          className={`lg:flex items-center lg:gap-5 ${isMenuOpen ? 'block' : 'hidden'} max-lg:fixed max-lg:w-2/4 max-lg:bg-white max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:p-6 max-lg:z-50 max-lg:shadow-lg`}
        >
          {/* Mobile Close Button */}
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          <ul className="lg:flex max-lg:space-y-6 lg:gap-5 max-lg:w-full max-lg:overflow-auto">
            {/* <li className="mb-6 hidden max-lg:block">
              <Link to="/">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li> */}
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/" className="lg:hover:text-blue-600 text-gray-500 block font-semibold text-sm">Home</Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/blogform" className="lg:hover:text-blue-600 text-gray-500 block font-semibold text-sm">Write a Blog</Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/admin" className="lg:hover:text-blue-600 text-gray-500 block font-semibold text-sm">Admin Dashboard</Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/contactus" className="lg:hover:text-blue-600 text-gray-500 block font-semibold text-sm">Contact Us</Link>
            </li>
          </ul>
        </div>

         {/* Left Side - Toggle Button */}
  <div className="lg:hidden">
    <button id="toggleOpen" onClick={toggleMenu}>
      <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  </div>

        {/* Right Side - Search Bar, Login/Register */}
  <div className="flex items-center gap-4 ml-auto">
    {/* Search Bar */}
    <div className="flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded focus-within:outline focus-within:outline-blue-600">
      <input
        type="text"
        placeholder="Search something..."
        className="w-full text-sm bg-transparent rounded outline-none pr-2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192.904 192.904"
        width="16px"
        className="cursor-pointer fill-gray-400"
      >
        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
      </svg>
    </div>

    {/* Conditionally render user profile and buttons */}
    {isLoggedIn ? (
      <div className="relative inline-block">
        <img
          src="https://readymadeui.com/team-4.webp"
          className="w-14 h-14 rounded-full border-2 border-blue-600 p-0.5"
          alt="User Profile"
        />
        <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute top-1 right-0"></span>
      </div>
    ) : (
      <>
        <Link to="/login" className="px-5 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-green-600">
          Login
        </Link>

        <Link to="/register" className="px-5 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-green-600">
          Register
        </Link>
      </>
    )}
  </div>
      </div>
    </header>
  );
}

export default Navbar;







































// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="bg-blue-500 p-4">
//       <ul className="flex justify-between text-white">
//         <li>
//           <Link to="/" className="hover:text-gray-300">Home</Link>
//         </li>
//         <li>
//           <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/login" className="hover:text-gray-300">Login</Link>
//         </li>
//         <li>
//           <Link to="/register" className="hover:text-gray-300">Register</Link>
//         </li>

//         <li>
//           <Link to="/contactus" className="hover:text-gray-300">Contact Us</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


