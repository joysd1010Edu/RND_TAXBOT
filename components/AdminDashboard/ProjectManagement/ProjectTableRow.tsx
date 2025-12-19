"use client";
import React from "react";
import {
  HiOutlineEye,
  HiOutlineEnvelope,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import type { ProjectTableRowProps } from "@/Type/AdminDashboard/ProjectManagement";

//========== Project Table Row Component ==========
const ProjectTableRow: React.FC<ProjectTableRowProps> = ({
  project,
  onView,
  onEmail,
  onDownload,
}) => {
  //========== Get Compliance Color ==========
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return "text-green-600";
    if (compliance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  //========== Get Status Badge Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in progress":
        return "bg-yellow-100 text-yellow-700";
      case "needs clarification":
        return "bg-orange-100 text-orange-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/*========== Project Name ==========*/}
      <td className="p-4">
        <p className="text-sm font-medium text-gray-900">{project.name}</p>
      </td>

      {/*========== User ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{project.userName}</p>
      </td>

      {/*========== Industry ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{project.industry}</p>
      </td>

      {/*========== Progress ==========*/}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-20">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-700 whitespace-nowrap">
            {project.progress}%
          </span>
        </div>
      </td>

      {/*========== Compliance ==========*/}
      <td className="p-4">
        <span
          className={`text-sm font-semibold ${getComplianceColor(
            project.compliance
          )}`}
        >
          {project.compliance}%
        </span>
      </td>

      {/*========== Status ==========*/}
      <td className="p-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </td>

      {/*========== Last Updated ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700 whitespace-nowrap">
          {project.lastUpdated}
        </p>
      </td>

      {/*========== Actions ==========*/}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(project.id)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Project"
          >
            <HiOutlineEye size={20} className="text-blue-600" />
          </button>
          <button
            onClick={() => onEmail(project)}
            className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
            title="Send Email"
          >
            <HiOutlineEnvelope size={20} className="text-orange-600" />
          </button>
          <button
            onClick={() => onDownload(project)}
            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Download Report"
          >
            <HiOutlineArrowDownTray size={20} className="text-green-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectTableRow;
