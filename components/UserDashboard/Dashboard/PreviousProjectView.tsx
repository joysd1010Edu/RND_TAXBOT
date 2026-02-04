"use client";
import React from "react";
import { MdCalendarToday } from "react-icons/md";

//========== Previous Project View Component ===========
const PreviousProjectView = () => {
  return (
    <div className="space-y-4">
      {/*========= Project Info =========*/}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-base font-medium text-gray-900">
              Advanced Manufacturing Process Innovation
            </h4>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Completed
            </span>
          </div>
          <p className="text-sm text-gray-600">Financial Year: 2024</p>
        </div>
      </div>

      {/*========= Project Footer =========*/}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MdCalendarToday size={16} />
          <span>Updated: 12/15/2024</span>
        </div>
        <button className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium text-sm transition-colors">
          View Only
        </button>
      </div>
    </div>
  );
};

export default PreviousProjectView;
