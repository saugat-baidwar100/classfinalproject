import { StatsCard } from './stats-card';
import { CategoryCard } from './category-card';
import { CategoryStats, Category } from '../components/types/category';

export function TopCategories() {
  const stats: CategoryStats[] = [
    { value: '2K+', label: 'Active Students' },
    { value: '10+', label: 'Total Courses' },
    { value: '5+', label: 'Instructor' },
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
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 mb-20">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* Categories Section */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold font-poppins text-black mb-4">
          Top Categories
        </h2>
        <p className="text-[#777575] font-poppins font-[18px]">
          Explore our Popular Categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
