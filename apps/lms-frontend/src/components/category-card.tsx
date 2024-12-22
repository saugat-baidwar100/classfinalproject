import { Category } from '../components/types/category'
import { Code2 } from 'lucide-react'

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border-2 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[250px] gap-4">
      <div className="bg-[#31b991] w-14 h-14 rounded-full flex items-center justify-center">
        <Code2 className="text-white w-7 h-7" />
      </div>
      <h3 className="text-small-size font-semibold font-poppins text-black text-center">{category.title}</h3>
      <p className="text-black font-poppins text-[14px] text-center">{category.courses} Courses</p>
    </div>
  )
}