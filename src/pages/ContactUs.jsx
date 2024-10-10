import React from 'react';
import Contactus  from '../assets/contactus.jpg';


const ContactUs = () => {
  return (
    <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        
        {/* Form Section */}
        <form className="max-w-lg max-md:mx-auto w-full p-6 bg-white rounded-lg shadow-md">
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Get In Touch</h3>
            <p className="text-gray-800 text-sm mt-6">
              Have a specific inquiry or looking to explore new opportunities? Our experienced team is ready to engage with you.
            </p>
          </div>

          <div className="mb-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Subject</label>
            <input
              type="text"
              placeholder="Enter the subject"
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 text-[15px] mb-2 block">Message</label>
            <textarea
              placeholder="Write your message"
              rows="4"
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
              required
            ></textarea>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-green-600 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Image Section */}
        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img
            src= {Contactus}
            className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
            alt="Contact Us"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
