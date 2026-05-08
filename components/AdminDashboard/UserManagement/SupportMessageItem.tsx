"use client";
import React from "react";
import type { SupportMessageItemProps } from "@/Type/AdminDashboard/UserManagement";

//========== Support Message Item Component ==========
const SupportMessageItem: React.FC<SupportMessageItemProps> = ({ message }) => {
  //========== Get Status Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "open":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      {/*========== Message Info ==========*/}
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 mb-1">
          {message.subject}
        </h4>
        <p className="text-xs text-gray-500">{message.date}</p>
      </div>

      {/*========== Status Badge ==========*/}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
          message.status
        )}`}
      >
        {message.status}
      </span>
    </div>
  );
};

export default SupportMessageItem;
