interface StatsCardProps {
  stat: {
    value: number | string;
    label: string;
  };
}

export function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="bg-[#e8fbf5] w-full max-w-[250px] sm:max-w-[300px] h-[150px] sm:h-[150px] rounded-xl flex flex-col justify-center items-center p-3 sm:p-4">
      <div className="text-[#3ebd98] text-2xl sm:text-3xl md:text-[32px] font-semibold font-poppins mb-2 sm:mb-3">
        {stat.value}
      </div>
      <div className="text-black text-sm sm:text-base md:text-[16px] font-medium font-poppins text-center">
        {stat.label}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Add an empty div to take up the left space */}
      <div className="flex-1"></div>
      {/* Add the StatsCard in a vertically centered div */}
      <div className="flex items-center">
        <StatsCard stat={{ value: "123", label: "Example Label" }} />
      </div>
    </div>
  );
}
