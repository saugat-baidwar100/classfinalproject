import React, { useState } from 'react';
import { CourseCard } from './course-card';
import { Button } from './button';
import { Course } from './types/course';
import popularCoursesImage from "../assets/images/popular-courses.png";

const courses: Course[] = [
  {
    id: "1",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: "2",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: "3",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 299,
    currentPrice: "Free",
    imageUrl: popularCoursesImage,
  },
];

type FilterType = "all" | "paid" | "free";

export const PopularCourses: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCourses = courses.filter((course) => {
    if (filter === "paid") return course.currentPrice !== "Free";
    if (filter === "free") return course.currentPrice === "Free";
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-center md:text-left">
          Our Popular Courses
        </h2>
        <div className="flex flex-wrap md:flex-nowrap gap-3 items-center justify-center md:justify-start">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All courses
          </Button>
          <Button
            variant={filter === "paid" ? "default" : "outline"}
            onClick={() => setFilter("paid")}
          >
            Paid courses
          </Button>
          <Button
            variant={filter === "free" ? "default" : "outline"}
            onClick={() => setFilter("free")}
          >
            Free courses
          </Button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8 items-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-custom-teal" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300" />
      </div>
    </section>
  );
};

export default PopularCourses;
