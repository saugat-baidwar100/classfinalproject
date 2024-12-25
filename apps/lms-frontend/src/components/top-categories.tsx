import { StatsCard } from './stats-card';
import { CategoryCard } from './category-card';
import { CategoryStats, Category } from '../components/types/category';

export function TopCategories() {
  const stats: CategoryStats[] = [
    { value: '2K+', label: 'Active Students' },
    { value: '10+', label: 'Total Courses' },
    { value: '5+', label: 'Instructors' },
    { value: '100%', label: 'Satisfaction Rate' },
  ];

  const categories: Category[] = [
    { title: 'Backend Development', courses: 5 },
    { title: 'Frontend Development', courses: 5 },
    { title: 'Fullstack Development', courses: 5 },
    { title: 'App Development', courses: 5 },
    { title: 'UI/UX Design', courses: 5 },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Categories Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-black mb-4">
          Top Categories
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#777575] font-poppins">
          Explore our Popular Categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
