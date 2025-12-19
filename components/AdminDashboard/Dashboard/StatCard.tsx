"use client";
import React from "react";
import type { StatCardProps } from "@/Type/AdminDashboard/Dashboard";

//========== Stat Card Component ==========
const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  change,
  changeType,
  bgColor,
  iconBgColor,
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      {/*========== Header with Icon and Change ==========*/}
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-lg`}>{icon}</div>
        <span
          className={`text-sm font-semibold ${
            changeType === "positive" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>

      {/*========== Value and Label ==========*/}
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
