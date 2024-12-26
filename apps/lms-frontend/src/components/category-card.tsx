import { Category } from '../components/types/category';
import { Code2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border-2 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px] gap-4">
      {/* Icon Wrapper */}
      <div className="bg-[#31b991] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center">
        <Code2 className="text-white w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      
      {/* Title */}
      <h3 className="text-[16px] sm:text-[18px] font-semibold font-poppins text-black text-center">
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
