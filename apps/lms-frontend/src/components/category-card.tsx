import { Category } from '../components/types/category';
import { Code2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border-2 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] gap-4">
      {/* Icon Wrapper */}
      <div className="bg-[#31b991] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
        <Code2 className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      
      {/* Title */}
      <h3 className="text-[14px] sm:text-[16px] font-semibold font-poppins text-black text-center">
        {category.title}
      </h3>
      
      {/* Courses Count */}
      <p className="text-black font-poppins text-[12px] sm:text-[14px] text-center">
        {category.courses} Courses
      </p>
    </div>
  );
}

export default CategoryCard;

