import { CategoryStats } from '../components/types/category';

interface StatsCardProps {
  stat: CategoryStats;
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-70 h-35 rounded-xl p-6 text-center flex flex-col justify-center items-center">
      <div className="text-[#3ebd98] text-[32px] font-semibold font-poppins mb-2">{stat.value}</div>
      <div className="text-black text-[16px] font-semibold font-poppins">{stat.label}</div>
    </div>
  );
}

export default StatsCard;