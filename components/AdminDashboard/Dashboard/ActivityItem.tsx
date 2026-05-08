"use client";
import React from "react";
import type { ActivityItemProps } from "@/Type/AdminDashboard/Dashboard";

//========== Activity Item Component ==========
const ActivityItem: React.FC<ActivityItemProps> = ({
  user,
  action,
  project,
  timestamp,
}) => {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-b-0">
      {/*========== Timeline Dot ==========*/}
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
      </div>

      {/*========== Content ==========*/}
      <div className="flex-1 min-w-0">
        <p className="text-base text-gray-700">
          <span className="font-normal pr-2">{user}</span>
          <span className="text-gray-500 pr-2"> {action} </span>
          <span className="text-blue-600 font-medium">{project}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
