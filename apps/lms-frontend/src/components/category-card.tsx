import { Category } from '../components/types/category';
import { Code2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 border-2 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] gap-3 sm:gap-4">
      {/* Icon Wrapper */}
      <div className="bg-[#31b991] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
        <Code2 className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </div>
      
      {/* Title */}
      <h3 className="text-xs sm:text-sm md:text-base lg:text-[16px] font-semibold font-poppins text-black text-center">
        {category.title}
      </h3>
      
      {/* Courses Count */}
      <p className="text-black font-poppins text-[10px] sm:text-xs md:text-sm lg:text-[14px] text-center">
        {category.courses} Courses
      </p>
    </div>
  );
}

export default CategoryCard;

