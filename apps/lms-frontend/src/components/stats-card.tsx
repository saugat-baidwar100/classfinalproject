import React from 'react';
import { CategoryStats } from '../components/types/category';

interface StatsCardProps {
  stat: CategoryStats;
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-full sm:max-w-[300px] h-[120px] sm:h-[150px] rounded-xl flex flex-col justify-center items-center p-3 sm:p-4">
      <div className="text-[#3ebd98] text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold font-poppins mb-2 sm:mb-3 text-center">
        {stat.value}
      </div>
      <div className="text-black text-xs sm:text-sm md:text-base lg:text-[16px] font-semibold font-poppins text-center">
        {stat.label}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Center the StatsCard with responsive layout */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full sm:w-auto">
          <StatsCard stat={{ value: "123", label: "Example Label" }} />
        </div>
      </div>
    </div>
  );
}
