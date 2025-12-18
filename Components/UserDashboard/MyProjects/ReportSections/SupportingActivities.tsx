"use client";

import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SupportingActivitiesProps } from "@/Type/UserDashboard/ComplianceReport";

//========== Supporting R&D Activities Component ===========
const SupportingActivities: React.FC<SupportingActivitiesProps> = ({
  introduction,
  activities,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
        Supporting R&D Activities
      </h2>

      {/*========= Introduction =========*/}
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
        <p className="text-gray-700 leading-relaxed">{introduction}</p>
      </div>

      {/*========= Supporting Activities List =========*/}
      <div className="space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border border-gray-200 rounded-lg p-5 bg-gray-50"
          >
            {/*========= Activity Header =========*/}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <IoMdCheckmarkCircleOutline
                    className="text-green-600"
                    size={24}
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-700">
                    {activity.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-gray-600">
                    Duration: {activity.duration}
                  </span>
                  <span className="text-gray-600">
                    Budget: {activity.budget}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-medium rounded text-xs">
                    {activity.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">
                  {activity.complianceScore}%
                </p>
              </div>
            </div>

            {/*========= Description =========*/}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/*========= Key Activities =========*/}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-3">
                Key Activities
              </h4>
              <div className="space-y-2">
                {activity.keyActivities.map((keyActivity, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <IoMdCheckmarkCircleOutline
                      className="text-green-600 shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-gray-700 text-sm">{keyActivity.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/*========= R&D Nexus =========*/}
            <div className="mb-4 border border-blue-200  bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 text-base">
                R&D Nexus
              </h4>
              <p className="text-gray-700 text-sm">{activity.rndNexus}</p>
            </div>

            {/*========= Compliance Finding =========*/}
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 text-base">
                Compliance Finding:
              </h4>
              <p className="text-gray-700 text-sm">
                {activity.complianceFinding}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportingActivities;
