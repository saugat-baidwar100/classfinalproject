import { CategoryStats } from '../components/types/category';

interface StatsCardProps {
  stat: CategoryStats;
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-full max-w-[300px] sm:max-w-[350px] h-auto rounded-xl p-4 sm:p-6 text-center flex flex-col justify-center items-center">
      <div className="text-[#3ebd98] text-2xl sm:text-3xl font-semibold font-poppins mb-2">
        {stat.value}
      </div>
      <div className="text-black text-sm sm:text-base font-semibold font-poppins">
        {stat.label}
      </div>
    </div>
  );
}

export default StatsCard;
