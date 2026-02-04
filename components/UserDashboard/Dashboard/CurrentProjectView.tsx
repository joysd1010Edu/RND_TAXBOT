"use client";
import React from "react";
import { MdArrowForward } from "react-icons/md";

//========== Current Project View Component ===========
const CurrentProjectView = () => {
  return (
    <div className="space-y-4">
      {/*========= Project Info =========*/}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-base font-medium text-gray-900">
              AI-Powered Analytics Platform Development
            </h4>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
              Draft
            </span>
          </div>
        </div>
      </div>

      {/*========= Completion Progress =========*/}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Completion Progress</span>
          <span className="text-sm font-semibold text-gray-900">65%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "65%" }}
          ></div>
        </div>
      </div>

      {/*========= Project Details Grid =========*/}
      <div className="grid grid-cols-4 gap-4 pt-2">
        <div>
          <p className="text-xs text-gray-500 mb-1">Last Updated</p>
          <p className="text-sm font-medium text-gray-900">Q3 2025</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Current Quarter</p>
          <p className="text-sm font-medium text-gray-900">Q3</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Budget</p>
          <p className="text-sm font-medium text-gray-900">$450K</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Staff</p>
          <p className="text-sm font-medium text-gray-900">3 members</p>
        </div>
      </div>

      {/*========= Sections Requiring Update =========*/}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-900 mb-3">
          Sections Requiring Update:
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white border border-blue-300 text-blue-700 text-xs font-medium rounded-full">
            Core Activities Q4
          </span>
          <span className="px-3 py-1 bg-white border border-blue-300 text-blue-700 text-xs font-medium rounded-full">
            Budget Updates
          </span>
          <span className="px-3 py-1 bg-white border border-blue-300 text-blue-700 text-xs font-medium rounded-full">
            Staff Changes
          </span>
        </div>
      </div>

      {/*========= Action Buttons =========*/}
      <div className="flex gap-3 pt-2">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-2">
          <span>Continue Questions</span>
          <MdArrowForward size={16} />
        </button>
        <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-semibold text-sm transition-colors">
          View Summary
        </button>
      </div>
    </div>
  );
};

export default CurrentProjectView;
