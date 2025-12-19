"use client";

import React from "react";
import { RiskAssessmentProps } from "@/Type/UserDashboard/ComplianceReport";

//========== Risk Assessment Component ===========
const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  introduction,
  risks,
  qualityMetrics,
}) => {
  const getProbabilityColor = (probability: string) => {
    if (probability === "Low") return "bg-green-100 text-green-700";
    if (probability === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getImpactColor = (impact: string) => {
    if (impact === "Low") return "bg-green-100 text-green-700";
    if (impact === "Medium") return "bg-yellow-100 text-yellow-700";
    if (impact === "High") return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const getStatusColor = (status: string) => {
    if (status === "Mitigated") return "bg-green-100 text-green-700";
    if (status === "Resolved") return "bg-blue-100 text-blue-700";
    if (status === "Controlled") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getMetricStatusColor = (status: string) => {
    if (status === "Exceeded") return "bg-green-100 text-green-700";
    if (status === "Met") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-lg font-semibold text-gray-900">
        Risk Assessment & Mitigation
      </h2>

      {/*========= Introduction =========*/}
      <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
        <p className="text-sm text-gray-700">{introduction}</p>
      </div>

      {/*========= Risk Table =========*/}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Risk Description
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                Probability
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                Impact
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Mitigation Strategy
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk) => (
              <tr key={risk.id} className="border-b border-gray-100">
                <td className="py-4 px-4 text-sm text-gray-900">
                  {risk.title}
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getProbabilityColor(
                      risk.probability
                    )}`}
                  >
                    {risk.probability}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getImpactColor(
                      risk.impact
                    )}`}
                  >
                    {risk.impact}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {risk.mitigation}
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                      risk.status
                    )}`}
                  >
                    {risk.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*========= Quality Assurance Metrics =========*/}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Quality Assurance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualityMetrics.map((metric) => (
            <div
              key={metric.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  {metric.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded text-xs font-medium ${getMetricStatusColor(
                    metric.status
                  )}`}
                >
                  {metric.status}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4 text-sm">
                <div className="flex flex-col items-center">
                    <p className="text-gray-500 mb-1">Target</p>
                  <p className="font-semibold text-gray-900">{metric.target}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 mb-1">Achieved</p>
                  <p className="font-semibold text-gray-900">
                    {metric.achieved}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
