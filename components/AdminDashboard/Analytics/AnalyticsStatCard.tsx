"use client";
import React from "react";
import type { AnalyticsStatCardProps } from "@/Type/AdminDashboard/Analytics";

//========== Analytics Stat Card Component ==========
const AnalyticsStatCard: React.FC<AnalyticsStatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  subtextType,
  bgColor,
  iconColor,
}) => {
  //========== Get Subtext Color ==========
  const getSubtextColor = () => {
    switch (subtextType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-100`}
    >
      {/*========== Icon and Label ==========*/}
      <div className="flex items-start gap-3 mb-3">
        <div className={iconColor}>{icon}</div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>

      {/*========== Value ==========*/}
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>

      {/*========== Subtext ==========*/}
      <p className={`text-sm font-medium ${getSubtextColor()}`}>{subtext}</p>
    </div>
  );
};

export default AnalyticsStatCard;
