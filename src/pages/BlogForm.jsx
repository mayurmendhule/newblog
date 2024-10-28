import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    headline: '',
    description: '',
    author: '',
    publishDate: '',
    image: null,
    category: '', 
  });

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('headline', formData.headline);
    data.append('description', formData.description);
    data.append('author', formData.author);
    data.append('publishDate', formData.publishDate);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/blogs/create', {
        method: 'POST',
        body: data,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
  
      const result = await response.json();
      console.log(result); // Log success response
  
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Blog Created',
        text: 'Your blog has been created successfully!',
        confirmButtonText: 'OK'
      });
  
      // Clear form fields
      setFormData({
        headline: '',
        description: '',
        author: '',
        publishDate: '',
        category: '',
        image: null
      });

      // Clear the file input value
      fileInputRef.current.value = null;

    } catch (error) {
      console.error('Error:', error); // Handle errors
  
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue creating your blog. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-bold flex-1">
            Create New Blog
          </h3>
        </div>
        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Headline</label>
            <input
              type="text"
              name="headline"
              placeholder="Enter headline"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              value={formData.headline}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write description"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              value={formData.publishDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              onChange={handleChange}
              ref={fileInputRef} // Attach the ref here
            />
          </div>

          <div className="relative inline-flex">
            <svg
              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select
              name="category"
              className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="News">News</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
