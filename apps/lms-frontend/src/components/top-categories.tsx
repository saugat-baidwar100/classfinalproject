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
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Categories Section */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-poppins text-black mb-2 sm:mb-4">
          Top Categories
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#777575] font-poppins">
          Explore our Popular Categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
