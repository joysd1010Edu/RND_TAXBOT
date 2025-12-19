"use client";
import React from "react";
import type { ActivityItemProps } from "@/Type/AdminDashboard/UserManagement";

//========== Activity Item Component ==========
const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      {/*========== Timeline Dot ==========*/}
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>

      {/*========== Content ==========*/}
      <div className="flex-1">
        <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
        <p className="text-xs text-gray-600">
          {activity.project} • {activity.timestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
