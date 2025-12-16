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
  iconBgColor = "bg-orange-100",
  textColor = "text-orange-600",
}) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-100`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        </div>
        {icon && <div className={`${iconBgColor} p-3 rounded-lg`}>{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
