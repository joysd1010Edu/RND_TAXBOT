"use client";

import React from "react";
import { IoCodeOutline } from "react-icons/io5";
import { TechnologyStackProps } from "@/Type/UserDashboard/ComplianceReport";
import { GoDatabase } from "react-icons/go";

//========== Technology Stack Component ===========
const TechnologyStack: React.FC<TechnologyStackProps> = ({
  categories,
  architectureDiagramNote,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
        Technology Stack & Innovation Details
      </h2>

      {/*========= Technology Categories =========*/}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border  border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors"
          >
            {/*========= Category Header =========*/}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <IoCodeOutline className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-semibold text-gray-700">
                      Technologies:{" "}
                    </span>
                    <span className="text-sm text-gray-600">
                      {category.technologies}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700">
                      Purpose:{" "}
                    </span>
                    <span className="text-sm text-gray-600">
                      {category.purpose}
                    </span>
                  </div>
                  <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-green-800">
                        Innovation:{" "}
                      </span>
                      {category.innovation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        ))}
      </div>

      {/*========= Architecture Diagram Note =========*/}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <GoDatabase className="text-gray-500" size={62} />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          System Architecture Diagram
        </h4>
        <p className="text-sm text-gray-600">{architectureDiagramNote}</p>
      </div>
    </div>
  );
};

export default TechnologyStack;
