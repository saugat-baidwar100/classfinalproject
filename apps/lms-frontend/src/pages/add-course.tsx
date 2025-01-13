import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SiteFooter from '../components/footer';
import logo from '../assets/images/logo.png';

// Types and Interfaces
interface Course {
  name: string;
  status: 'draft' | 'published';
  students: string;
  price: string;
}

// Initial Data
const initialCourses: Course[] = [
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'published',
    students: '120',
    price: 'Rs. 4000',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  {
    name: 'Frontend web development',
    status: 'draft',
    students: '120',
    price: 'Free',
  },
  // Add more courses as needed
];

const AddCourse: React.FC = () => {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeButton, setActiveButton] = useState('courses');

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins flex flex-col">
      {/* Navbar */}
      <Navbar logoSrc={logo} />

      {/* Main Layout */}
      <div className="container mx-auto flex flex-col lg:flex-row mt-24 mb-6 max-w-full px-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 lg:mb-0 lg:mr-6">
          <nav className="space-y-6">
            <button
              className="flex items-center gap-4 px-4 py-3 text-[20px] rounded-lg hover:bg-gray-50"
              onClick={() => setActiveButton('courses')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={
                  activeButton === 'courses'
                    ? 'text-[#3EBD98]'
                    : 'text-black'
                }
              >
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
              <span
                className={
                  activeButton === 'courses'
                    ? 'text-[#3EBD98]'
                    : 'text-black'
                }
              >
                Courses
              </span>
            </button>
            <button
              className="flex items-center gap-4 px-4 py-3 text-[20px]  rounded-lg hover:bg-gray-50"
              onClick={() => setActiveButton('profile')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={
                  activeButton === 'profile'
                    ? 'text-[#3EBD98]'
                    : 'text-black'
                }
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span
                className={
                  activeButton === 'profile'
                    ? 'text-[#3EBD98]'
                    : 'text-black'
                }
              >
                Profile
              </span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="max-w-full">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
              <h1 className="text-[36px] text-black font-semibold">All Courses</h1>
              <button className="bg-[#3EBD98] hover:bg-[#289675] text-white px-6 py-3 rounded-lg transition-colors">
                Add Course
              </button>
            </div>

            {/* Description */}
            <p className="text-black mb-6">
              Create an engaging course, include real-life examples, and provide
              activities that help students understand the contents.
            </p>

            {/* Search Section */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg pr-28 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px] bg-[#3EBD98] hover:bg-[#289675] text-white px-5 py-2 rounded-lg text-sm transition-colors">
                Search
              </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-[16px]  py-4 px-6 font-bold text-black">
                      Course name
                    </th>
                    <th className="text-left text-[16px]  py-4 px-6 font-bold text-black">
                      Status
                    </th>
                    <th className="text-left text-[16px]  py-4 px-6 font-bold text-black">
                      Enrolled students
                    </th>
                    <th className="text-left text-[16px]  py-4 px-6 font-bold text-black">
                      Price
                    </th>
                    <th className="text-left text-[16px]  py-4 px-6 font-bold text-black">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr
                      key={index}
                      className="border-b text-[16px] border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-black">{course.name}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-xs ${
                            course.status === 'published'
                              ? 'bg-emerald-100 text-black'
                              : 'bg-yellow-100 text-black'
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-black">{course.students}</td>
                      <td className="py-4 px-6 text-black">{course.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-4">
                          <button
                            title="Edit"
                            className="p-2 rounded-full bg-emerald-100 text-[#3EBD98] hover:bg-[289675] transition-colors"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            title="Delete"
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <SiteFooter logoSrc={logo} />
    </div>
  );
};

export default AddCourse;
