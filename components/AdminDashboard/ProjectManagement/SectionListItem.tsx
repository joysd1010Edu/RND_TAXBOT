"use client";
import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import type { SectionListItemProps } from "@/Type/AdminDashboard/ProjectManagement";

//========== Section List Item Component ==========
const SectionListItem: React.FC<SectionListItemProps> = ({
  section,
  isSelected,
  onClick,
}) => {
  //========== Get Compliance Color ==========
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return "text-green-600";
    if (compliance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  //========== Get Status Icon ==========
  const getStatusIcon = () => {
    switch (section.status) {
      case "approved":
        return <HiOutlineCheckCircle size={20} className="text-green-600" />;
      case "needs clarification":
      case "rejected":
        return (
          <HiOutlineExclamationTriangle size={20} className="text-orange-600" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
      }`}
    >
      {/*========== Title and Icon ==========*/}
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 flex-1">
          {section.title}
        </h4>
        {getStatusIcon()}
      </div>

      {/*========== Compliance ==========*/}
      <p
        className={`text-sm font-medium ${getComplianceColor(
          section.compliance
        )}`}
      >
        {section.compliance}% compliance
      </p>
    </div>
  );
};

export default SectionListItem;
