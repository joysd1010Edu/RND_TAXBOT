"use client";

import React from "react";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { ProjectMilestonesProps } from "@/Type/UserDashboard/ComplianceReport";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

//========== Project Milestones Component ===========
const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({
  milestones,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Project Milestones & Timeline
      </h2>

      {/*========= Timeline =========*/}
      <div className="relative">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative flex gap-6 pb-8">
            {/*========= Timeline Line =========*/}
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full z-10"></div>
              {index < milestones.length && (
                <div className="w-0.5 h-full bg-blue-600 absolute top-2.5"></div>
              )}
            </div>

            {/*========= Milestone Card =========*/}
            <div className="flex-1 border border-gray-200 rounded-lg p-5 bg-white">
              {/*========= Header =========*/}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {milestone.phase}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt size={14} />
                    <span>{milestone.startDate}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Completed
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-lg font-bold text-gray-900">
                    {milestone.budget}
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    {milestone.complianceScore}% Compliance
                  </p>
                </div>
              </div>

              {/*========= Key Deliverables =========*/}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Key Deliverables
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-6">
                  {milestone.deliverables.map((deliverable, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-3 py-2 rounded"
                    >
                      <IoMdCheckmarkCircleOutline
                        className="text-green-600 shrink-0"
                        size={20}
                      />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMilestones;
