import React, { useState } from 'react';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    headline: '',
    description: '',
    author: '',
    publishDate: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submit logic
    console.log(formData);
  };

  return (
    <div className="container mx-auto mt-8 p-4"> {/* Ensure container for page layout */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"> {/* Regular form box */}
        <div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-bold flex-1">Create New Blog</h3>
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
            <label className="text-gray-800 text-sm mb-2 block">Description</label>
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
            <label className="text-gray-800 text-sm mb-2 block">Author Name</label>
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
            <label className="text-gray-800 text-sm mb-2 block">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              value={formData.publishDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Upload Image</label>
            <input
              type="file"
              name="image"
              className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
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
