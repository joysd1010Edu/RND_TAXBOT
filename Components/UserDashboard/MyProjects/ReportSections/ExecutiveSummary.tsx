"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { ExecutiveSummaryProps } from "@/Type/UserDashboard/ComplianceReport";
import { HiOutlineBolt } from "react-icons/hi2";
import { PiTrendUpDuotone } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";

//========== Executive Summary Component ===========
const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  projectTitle,
  companyName,
  projectPeriod,
  complianceScore,
  summaryText,
  keyHighlights,
  businessMetrics,
  complianceText,
}) => {
  const color = [
    "from-[#00C950] to-[#00A63E]",
    "from-[#2B7FFF] to-[#155DFC]",
    "from-[#AD46FF] to-[#9810FA]",
  ];
  const icon = [
    <PiTrendUpDuotone size={36} />,
    <HiOutlineBolt size={36} />,
    <LuUsers size={36} />,
  ];
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Executive Summary
      </h2>

      {/*========= Summary Paragraph =========*/}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {summaryText}
      </p>

      {/*========= Compliance Description =========*/}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {complianceText}
      </p>

      {/*========= Key Highlights Box =========*/}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Key Highlights
        </h3>
        <div className="space-y-3">
          {keyHighlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <MdCheckCircle
                className="text-green-600 shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">{highlight.label}</span>{" "}
                {highlight.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*========= Additional Context =========*/}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        The R&D activities undertaken demonstrate clear technical uncertainty,
        systematic experimentation, and technological advancement beyond current
        industry standards. The project team employed rigorous scientific
        methodologies including hypothesis-driven testing, controlled
        experiments, iterative refinement, and comprehensive documentation of
        all research activities.
      </p>

      {/*========= Business Impact Section =========*/}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Business Impact & Innovation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {businessMetrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-linear-to-b ${color[index]} rounded-xl p-6 text-white`}
            >
              <div className="text-3xl mb-3">{icon[index]}</div>
              <div className="text-3xl sm:text-4xl mb-2">{metric.value}</div>
              <div className="text-sm font-medium opacity-90">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*========= Compliance Assessment =========*/}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Compliance Assessment
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          This project meets all requirements for R&D tax credit qualification
          including: (1) elimination of technical uncertainty through systematic
          experimentation, (2) advancement of technological capabilities beyond
          industry standards, (3) reliance on principles of computer science and
          engineering, and (4) comprehensive documentation of the research
          process and outcomes.
        </p>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
