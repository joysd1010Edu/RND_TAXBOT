"use client";

import React from "react";
import { FaAward } from "react-icons/fa";
import { ConclusionProps } from "@/Type/UserDashboard/ComplianceReport";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";
//========== Conclusion Component ===========
const Conclusion: React.FC<ConclusionProps> = ({
  overallScore,
  projectTitle,
  summaryText,
  keyFindings,
  recommendations,
  complianceStatement,
  reportDetails,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-lg font-semibold text-gray-900">
        Conclusion & Final Assessment
      </h2>

      {/*========= Overall Score Box =========*/}
      <div className="border-2 border-green-500 bg-linear-to-r from-[#F0FDF4] to-[#EFF6FF] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
            <FaAward className="text-green-600" size={28} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-green-800 font-medium mb-1">
              Exceptional R&D Qualification
            </p>
            <p className="text-3xl font-bold text-green-700 mb-3">
              {overallScore}% Overall Compliance
            </p>
            <p className="text-sm text-gray-700">
              The <strong>{projectTitle}</strong> {summaryText}
            </p>
          </div>
        </div>
      </div>

      {/*========= Key Findings =========*/}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Summary of Key Findings
        </h3>
        <div className="space-y-4">
          {keyFindings.map((finding) => (
            <div
              key={finding.id}
              className="border-l-4 border-green-500 bg-green-50 p-4"
            >
              <div className="flex items-start gap-3">
                <GiCheckMark
                  className="text-green-600 mt-0.5 shrink-0"
                  size={20}
                />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {finding.title}
                  </h4>
                  <p className="text-sm text-gray-700">{finding.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*========= Recommendations =========*/}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Recommendations for Tax Credit Claim
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex items-start gap-2">
              <IoMdCheckmarkCircleOutline
                className="text-blue-600 mt-0.5 shrink-0"
                size={16}
              />
              <div>
                <span className="font-semibold text-gray-900">
                  {rec.title}:
                </span>{" "}
                <span className="text-sm text-gray-700">{rec.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*========= Compliance Statement =========*/}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-5">
        <p className="text-sm text-gray-600 mb-4">
          {" "}
          <span className="font-semibold text-base text-gray-700">
            Compliance Officer Statement:
          </span>{" "}
          {complianceStatement}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div>
            <p className="text-gray-600 text-base">
              Report Prepared By: <span className="font-semibold text-gray-700">{reportDetails.auditor}</span>
            </p>
            <p className="text-gray-600 text-base">Date: <span className="font-semibold text-gray-700">{reportDetails.auditDate}</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-900 text-base">
              Report ID: {reportDetails.reportId}
            </p>
            <p className="font-normal text-gray-700">
              Status: {reportDetails.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
