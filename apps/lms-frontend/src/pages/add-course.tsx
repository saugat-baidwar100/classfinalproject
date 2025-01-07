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
];

const AddCourse: React.FC = () => {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins flex flex-col">
      <Navbar logoSrc={logo} />

      <main className="flex-grow py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-semibold">All Courses</h1>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors w-full sm:w-auto">
                Add Course
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8">
              Create an engaging course, include real-life examples, and provide
              activities that help students understand the contents.
            </p>

            {/* Search Section */}
            <div className="relative w-full mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 border border-gray-200 rounded-md pr-24 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                Search
              </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto -mx-6 md:-mx-8">
              <div className="inline-block min-w-full px-6 md:px-8">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-medium text-gray-600">
                        Course name
                      </th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">
                        Enrolled students
                      </th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">
                        Price
                      </th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 whitespace-nowrap">{course.name}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs ${
                              course.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">{course.students}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{course.price}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex gap-3">
                            <button
                              title="Edit"
                              className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
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
          </div>
        </div>
      </main>

      <SiteFooter logoSrc={logo} />
    </div>
  );
};

export default AddCourse;