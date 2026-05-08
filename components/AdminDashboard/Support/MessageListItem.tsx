"use client";
import React from "react";
import type { MessageListItemProps } from "@/Type/AdminDashboard/Support";

//========== Message List Item Component ==========
const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  isSelected,
  onClick,
}) => {
  //========== Get Priority Badge Color ==========
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //========== Get Status Badge Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-700";
      case "in-review":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
      }`}
    >
      {/*========== Header with Name and Priority ==========*/}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900">
          {message.userName}
        </h4>
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
            message.priority
          )}`}
        >
          {message.priority}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-2">{message.subject}</p>

      {/*========== Status and Time ==========*/}
      <div className="flex items-center justify-between">
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
            message.status
          )}`}
        >
          {message.status}
        </span>
        <span className="text-xs text-gray-500">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default MessageListItem;
