import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
  iconBgColor?: string;
  textColor?: string;
}

//========== Stat Card Component ===========
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  bgColor = "bg-orange-50",
}) => {
  return (
    <div className={`${bgColor} min-h-40 rounded-lg p-6 border border-gray-100 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={`text-xl font-normal text-gray-500`}>{value}</p>
        </div>
        {icon && <div className={` p-3 rounded-lg`}>{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
