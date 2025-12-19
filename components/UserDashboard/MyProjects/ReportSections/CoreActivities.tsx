"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { HiLightningBolt, HiLightBulb } from "react-icons/hi";
import { FiDownload, FiTarget } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { CoreActivitiesProps } from "@/Type/UserDashboard/ComplianceReport";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { FaArrowTrendUp, FaRegFileLines } from "react-icons/fa6";

//========== Core R&D Activities Component ===========
const CoreActivities: React.FC<CoreActivitiesProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={index > 0 ? "pt-8 border-t border-gray-200" : ""}
        >
          {/*========= Activity Header =========*/}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Core R&D Activity {activity.activityNumber} of{" "}
                {activity.totalActivities}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {activity.title}
              </h3>
              <div className="flex flex-wrap  items-center gap-3 text-base">
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium ">
                  {activity.status}
                </span>
                <span className="text-gray-600">
                  Duration: {activity.duration}
                </span>
                <span className="text-gray-600">Budget: {activity.budget}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
              <p className="text-4xl font-bold text-green-600">
                {activity.complianceScore}%
              </p>
            </div>
          </div>

          {/*========= Activity Description =========*/}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Activity Description
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/*========= Research Objectives =========*/}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTarget className="text-blue-500" size={28} />

              <h4 className="text-lg font-normal text-gray-900">
                Research Objectives
              </h4>
            </div>
            <div className="space-y-3">
              {activity.researchObjectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                >
                  <IoMdCheckmarkCircleOutline
                    className="text-blue-600 shrink-0 mt-0.5"
                    size={20}
                  />
                  <p className="text-gray-700">{obj.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/*========= Technical Challenges =========*/}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CiWarning className="text-orange-600" size={28} />

              <h4 className="text-lg font-normal text-gray-900">
                Technical Challenges & Uncertainties
              </h4>
            </div>
            <div className="border-l-4 ml-1 border-orange-500 bg-orange-50 p-4 space-y-2">
              {activity.technicalChallenges.map((challenge, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="font-semibold text-orange-700 shrink-0">
                    {idx + 1}.
                  </span>
                  <p className="text-gray-700">{challenge.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/*========= Systematic Research Approach =========*/}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <IoBookOutline className="text-purple-600" size={24} />

              <h4 className="text-lg font-normal text-gray-900">
                Systematic Research Approach
              </h4>
            </div>
            <div className="space-y-3">
              {activity.researchApproach.map((approach, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg"
                >
                  <HiLightningBolt
                    className="text-purple-600 shrink-0 mt-0.5"
                    size={20}
                  />
                  <p className="text-gray-700">{approach.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/*========= Novel Innovations =========*/}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <HiLightBulb className="text-green-600" size={18} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                Novel Innovations & Contributions
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.innovations.map((innovation, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <HiLightBulb
                    className="text-green-600 shrink-0 mt-0.5"
                    size={20}
                  />
                  <p className="text-gray-700">{innovation.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/*========= Measurable Outcomes =========*/}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FaArrowTrendUp className="text-blue-600" size={28} />

              <h4 className="text-lg font-semibold text-gray-900">
                Measurable Outcomes & Results
              </h4>
            </div>
            <div className="space-y-3">
              {activity.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <IoMdCheckmarkCircleOutline
                    className="text-green-600 shrink-0 mt-0.5"
                    size={20}
                  />
                  <p className="text-gray-700">{outcome.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/*========= R&D Compliance Analysis =========*/}
          <div className="mb-6 border-l-4 border-green-500 bg-gray-50 p-5">
            <h4 className="text-lg font-normal text-gray-900 mb-3">
              R&D Compliance Analysis
            </h4>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Findings:</p>
                <p className="text-gray-700">{activity.complianceFindings}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Recommendations:
                </p>
                <p className="text-gray-700">
                  {activity.complianceRecommendations}
                </p>
              </div>
            </div>
          </div>

          {/*========= Supporting Documentation =========*/}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaRegFileLines className="text-gray-600" size={24} />
              <h4 className="text-lg font-normal text-gray-900">
                Supporting Documentation & Evidence
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {activity.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FaRegFileLines className="text-blue-600" size={16} />
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FiDownload size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoreActivities;
