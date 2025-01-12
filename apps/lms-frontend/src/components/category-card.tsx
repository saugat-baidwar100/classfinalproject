import { Category } from '../components/types/category';
import { Code2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 border-2 shadow-md hover:shadow-lg hover:border-[#31b991] transition-all flex flex-col items-center justify-between gap-3 sm:gap-4 h-full">
      {/* Icon Wrapper */}
      <div className="bg-[#31b991] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
        <Code2 className="text-white w-5 h-5 md:w-6 md:h-6" />
      </div>

      {/* Title */}
      <h3 className="text-sm md:text-base lg:text-[16px] font-semibold font-poppins text-black text-center transition-colors hover:text-[#31b991]">
        {category.title}
      </h3>

      {/* Courses Count */}
      <p className="text-xs md:text-sm lg:text-[14px] font-poppins text-black text-center">
        {category.courses} Courses
      </p>
    </div>
  );
}

export default CategoryCard;
