"use client";
import React from "react";
import type { ProjectCardProps } from "@/Type/AdminDashboard/UserManagement";

//========== Project Card Component ==========
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  //========== Get Status Color ==========
  const getStatusBgColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700",
      orange: "bg-orange-100 text-orange-700",
      green: "bg-green-100 text-green-700",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0 py-4">
      {/*========== Project Info ==========*/}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {project.name}
          </h4>
          <p className="text-xs text-gray-500">Updated {project.updated}</p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-medium ${getStatusBgColor(
            project.statusColor
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/*========== Progress Bar ==========*/}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-xs text-gray-600">{project.progress}% complete</p>
    </div>
  );
};

export default ProjectCard;
