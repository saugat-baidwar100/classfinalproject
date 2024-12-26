import { CategoryStats } from '../components/types/category';

interface StatsCardProps {
  stat: CategoryStats;
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-full max-w-[250px] sm:max-w-[300px] h-auto rounded-xl p-3 sm:p-4 text-center flex flex-col justify-center items-center">
      <div className="text-[#3ebd98] text-xl sm:text-2xl md:text-[32px] font-semibold font-poppins mb-1 sm:mb-2">
        {stat.value}
      </div>
      <div className="text-black text-xs sm:text-sm md:text-base font-semibold font-poppins">
        {stat.label}
      </div>
    </div>
  );
}

export default StatsCard;

