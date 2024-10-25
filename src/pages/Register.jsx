import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReIamge from '../assets/register_image.jpg';
import {showErrorAlert, showSuccessAlert} from '../service/alertService';


const Register = () => {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Function to handle registration
  const handleRegister = () => {
    // Simple check for password confirmation
    if (password !== confirmPassword) {
      showErrorAlert('Passwords do not match');
      return;
    }

    // Reset any previous errors
    // setError('');
    setLoading(true); // Start loading


    // Fetch call to backend API
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err.error));
        }
        return response.json();
      })
      .then(data => {
        console.log('User registered successfully:', data);
        showSuccessAlert('User registered successfully');      
        navigate('/login');  // Redirect to login page after successful registration
      })
      .catch(error => {
        showErrorAlert(error.toString());
        setLoading(false); // Stop loading after error
      });
  };

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
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Username</label>
            <div className="relative flex items-center">
              <input
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Email</label>
            <div className="relative flex items-center">
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
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Password</label>
            <div className="relative flex items-center">
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
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="text-gray-800 text-[15px] mb-2 block font-bold">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Error Message */}
          {/* {error && (
            <div className="text-red-600 mt-4 text-sm">
              {error}
            </div>
          )} */}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading} // Disable button while loading
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-green-600 focus:outline-none"
            >
              {loading ? 'Registering...' : 'Register'}  {/* Button text change */}
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






// import React from 'react';
// import { Link } from 'react-router-dom';
// import ReIamge from '../assets/register_image.jpg';

// const Register = () => {
//   return (
//     <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
//       <div className="grid md:grid-cols-2 items-center gap-8 h-full">
//         <form className="max-w-lg max-md:mx-auto w-full p-6">
//           <div className="mb-12">
//             <h3 className="text-gray-800 text-4xl font-extrabold">Register</h3>
//             <p className="text-gray-800 text-sm mt-6">
//               Create an account and join our amazing community today.
//             </p>
//           </div>

//           {/* Username Field */}
//           <div>
//             <label className="text-gray-800 text-[15px] mb-2 block">Username</label>
//             <div className="relative flex items-center">
//               <input
//                 name="username"
//                 type="text"
//                 required
//                 className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
//                 placeholder="Enter username"
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="mt-4">
//             <label className="text-gray-800 text-[15px] mb-2 block">Email</label>
//             <div className="relative flex items-center">
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
//                 placeholder="Enter email"
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="mt-4">
//             <label className="text-gray-800 text-[15px] mb-2 block">Password</label>
//             <div className="relative flex items-center">
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
//                 placeholder="Enter password"
//               />
//             </div>
//           </div>

//           {/* Confirm Password Field */}
//           <div className="mt-4">
//             <label className="text-gray-800 text-[15px] mb-2 block">Confirm Password</label>
//             <div className="relative flex items-center">
//               <input
//                 name="confirm-password"
//                 type="password"
//                 required
//                 className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
//                 placeholder="Confirm password"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8">
//             <button
//               type="button"
//               className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-green-600 focus:outline-none"
//             >
//               Register
//             </button>
//           </div>

//           {/* Already have an account */}
//           <p className="text-gray-800 text-sm !mt-8 text-center">
//             Already have an account?
//             <Link to="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
//               Sign in here
//             </Link>
//           </p>
//         </form>

//         <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
//           <img
//             src={ReIamge}
//             className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
//             alt="Dining Experience"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
