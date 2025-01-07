import React, { useState } from 'react';

const AddCourse: React.FC = () => {
  const [courseName, setCourseName] = useState('');
  const [status, setStatus] = useState('draft');
  const [price, setPrice] = useState('free');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ courseName, status, price });
  };

  return (
    <div className="min-h-screen bg-custom-black text-custom-white font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-big-size font-bold mb-2 sm:mb-0">All Courses</h1>
          <button
            className="bg-custom-teal text-custom-white px-4 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-custom-dark-teal transition"
          >
            Add Course
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-md px-4 py-2 text-custom-black rounded-md focus:ring-2 focus:ring-custom-teal"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-teal text-custom-white px-4 py-1 rounded-md hover:bg-custom-dark-teal transition"
          >
            Search
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium mb-2" htmlFor="courseName">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 text-custom-black rounded-md focus:ring-2 focus:ring-custom-teal"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 text-custom-black rounded-md focus:ring-2 focus:ring-custom-teal"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium mb-2" htmlFor="price">
              Price
            </label>
            <select
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 text-custom-black rounded-md focus:ring-2 focus:ring-custom-teal"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-custom-teal text-custom-white px-4 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-custom-dark-teal transition"
          >
            Submit
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto bg-custom-white text-custom-black rounded-lg shadow-lg">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-custom-teal text-custom-white">
                <th className="px-4 py-2 text-sm sm:text-base">Course Name</th>
                <th className="px-4 py-2 text-sm sm:text-base">Status</th>
                <th className="px-4 py-2 text-sm sm:text-base">Enrolled Students</th>
                <th className="px-4 py-2 text-sm sm:text-base">Price</th>
                <th className="px-4 py-2 text-sm sm:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2 text-sm sm:text-base">
                    Frontend Web Development
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">Draft</td>
                  <td className="px-4 py-2 text-sm sm:text-base">120</td>
                  <td className="px-4 py-2 text-sm sm:text-base">Free</td>
                  <td className="px-4 py-2 text-sm sm:text-base flex items-center space-x-2">
                    <button
                      className="bg-custom-teal text-custom-white px-2 py-1 rounded hover:bg-custom-dark-teal transition"
                      aria-label="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-custom-white px-2 py-1 rounded hover:bg-red-700 transition"
                      aria-label="Delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
