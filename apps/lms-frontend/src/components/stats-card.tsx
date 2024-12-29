import React from "react";

interface StatsCardProps {
  stat: {
    value: number | string;
    label: string;
  };
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-full max-w-[250px] sm:max-w-[300px] h-[150px] sm:h-[180px] rounded-xl flex flex-col justify-center items-center p-3 sm:p-4 mx-auto">
      <div className="text-[#3ebd98] text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3">
        {stat.value}
      </div>
      <div className="text-black text-sm sm:text-base md:text-lg font-medium text-center">
        {stat.label}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <StatsCard stat={{ value: "123", label: "Example Label" }} />
    </div>
  );
}
