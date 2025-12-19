"use client";

import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { IntellectualPropertyProps } from "@/Type/UserDashboard/ComplianceReport";

//========== Intellectual Property Component ===========
const IntellectualProperty: React.FC<IntellectualPropertyProps> = ({
  introduction,
  items,
  statistics,
}) => {
  const getTypeColor = (type: string) => {
    if (type === "Patent Application") return "bg-blue-100 text-blue-700";
    if (type === "Trade Secret") return "bg-purple-100 text-purple-700";
    if (type === "Open Source") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    if (status === "Filed") return "bg-yellow-100 text-yellow-700";
    if (status === "Protected") return "bg-green-100 text-green-700";
    if (status === "Published") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-lg font-semibold text-gray-900">
        Intellectual Property & Patents
      </h2>

      {/*========= Introduction =========*/}
      <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
        <p className="text-sm text-gray-700">{introduction}</p>
      </div>

      {/*========= IP Items =========*/}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/*========= Icon =========*/}
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-purple-600" size={24} />
              </div>

              {/*========= Content =========*/}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Reference: {item.reference}
                </p>
              </div>

              {/*========= Date =========*/}
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*========= Statistics =========*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        {statistics.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntellectualProperty;
