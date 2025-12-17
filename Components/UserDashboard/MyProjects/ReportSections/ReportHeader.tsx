"use client";
import React from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { PiMedalThin } from "react-icons/pi";

interface ReportHeaderProps {
  projectTitle: string;
  companyName: string;
  complianceScore: number;
  reportDate: string;
  projectPeriod: string;
  investigator: string;
  industry: string;
  totalBudget: number;
  teamSize: number;
  status: string;
}

//========== Report Header Component ===========
const ReportHeader: React.FC<ReportHeaderProps> = ({
  projectTitle,
  companyName,
  complianceScore,
  reportDate,
  projectPeriod,
  investigator,
  industry,
  totalBudget,
  teamSize,
  status,
}) => {
  return (
    <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 p-4 lg:p-8 sm:p-12 text-center space-y-6">
      {/*========= Document Icon =========*/}
      <div className="flex justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24  flex items-center justify-center">
          <FaRegFileLines className="text-blue-600 text-4xl sm:text-5xl" />
        </div>
      </div>

      {/*========= Report Title =========*/}
      <div className="space-y-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Research & Development Tax Credit
        </h1>
        <h2 className="text-base sm:text-lg font-medium text-gray-700">
          Compliance Report
        </h2>
      </div>

      {/*========= Project Title =========*/}
      <div className="space-y-1">
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          {projectTitle}
        </p>
        <p className="text-sm text-gray-500">{companyName}</p>
      </div>

      {/*========= Compliance Score Badge =========*/}
      <div className="flex  justify-center py-4">
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl px-8 sm:px-12 pt-3 inline-block">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <PiMedalThin size={50} className="text-green-600 text-2xl" />
            <div className="text-5xl flex flex-col md:items-start sm:text-6xl font-bold text-green-600">
              <span className="text-base md:text-xl font-medium text-gray-700">
                Overall Compliance Score
              </span>
              {complianceScore}%
            </div>{" "}
          </div>
        </div>
      </div>

      {/*========= Report Metadata =========*/}
      <div className="space-y-1 text-sm text-gray-600 pt-4">
        <p>Report Generated: {reportDate}</p>
        <p>Project Period: {projectPeriod}</p>
      </div>

      {/*========= Project Information Section =========*/}
      <div className="border-t-2 border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-left">
          Project Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/*========= Left Column =========*/}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Project Name</p>
              <p className="text-base font-medium text-gray-900">
                {projectTitle}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Industry Sector</p>
              <p className="text-base text-gray-900">{industry}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Total R&D Budget</p>
              <p className="text-base text-gray-900">
                ${totalBudget.toLocaleString()}
              </p>
            </div>
          </div>

          {/*========= Right Column =========*/}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Principal Investigator
              </p>
              <p className="text-base text-gray-900">{investigator}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Project Status</p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                {status.toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">R&D Team Size</p>
              <p className="text-base text-gray-900">{teamSize} Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
