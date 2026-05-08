"use client";
import React from "react";
import {
  HiOutlineEye,
  HiOutlineEnvelope,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import type { ProjectTableRowProps } from "@/Type/AdminDashboard/ProjectManagement";

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

//========== Project Table Row Component ==========
const ProjectTableRow: React.FC<ProjectTableRowProps> = ({
  project,
  onView,
  onEmail,
  
}) => {
  const badge = statusStyles[project.status] ?? "bg-gray-100 text-gray-700";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/*========== Project Title ==========*/}
      <td className="p-4">
        <p className="text-sm font-medium text-gray-900">
          {project.project_title}
        </p>
      </td>

      {/*========== Industry ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{project.industry}</p>
      </td>

      {/*========== Financial Year ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{project.financial_year}</p>
      </td>

      {/*========== Staff ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{project.staff_members}</p>
      </td>

      {/*========== Total R&D Expenditure ==========*/}
      <td className="p-4">
        <p className="text-sm font-medium text-gray-700">
          ${Number(project.total_rnd_expenditure).toLocaleString()}
        </p>
      </td>

      {/*========== Status ==========*/}
      <td className="p-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${badge}`}
        >
          {project.status}
        </span>
      </td>

      {/*========== Last Updated ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700 whitespace-nowrap">
          {new Date(project.updated_at).toLocaleDateString()}
        </p>
      </td>

      {/*========== Actions ==========*/}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(String(project.id))}
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
        
        </div>
      </td>
    </tr>
  );
};

export default ProjectTableRow;
