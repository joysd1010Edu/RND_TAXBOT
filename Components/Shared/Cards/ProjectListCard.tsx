"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MdEdit,
  MdRemoveRedEye,
  MdRefresh,
  MdCalendarToday,
  MdTrendingUp,
} from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { Project } from "@/Type/UserDashboard/MyProject";

interface ProjectCardProps {
  project: Project;
}

//========== Project Card Component ===========
const ProjectListCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const handleViewProject = () => {
    router.push(`/user/MyProjects/${project.id}`);
  };

  const handleEditProject = () => {
    router.push(`/user/MyProjects/${project.id}/edit`);
  };

  const handleRenewProject = () => {
    // Handle renew logic
    console.log("Renew project:", project.id);
  };

  //========== Status Badge Styling ===========
  const getStatusStyles = () => {
    switch (project.status) {
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending-review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = () => {
    switch (project.status) {
      case "draft":
        return "Draft";
      case "completed":
        return "Completed";
      case "pending-review":
        return "Pending Review";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-xl w-full border border-gray-200 p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      {/*========= Card Header =========*/}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
          <FaFileAlt className="text-blue-500 text-xl" />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
        >
          {getStatusLabel()}
        </span>
      </div>

      {/*========= Project Title =========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2 min-h-14">
        {project.title}
      </h3>

      {/*========= Project Info =========*/}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MdCalendarToday className="text-gray-400" />
          <span>{project.fiscalYear}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MdTrendingUp className="text-gray-400" />
          <span>{project.progress}% Complete</span>
        </div>
      </div>

      {/*========= Progress Bar =========*/}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/*========= Last Updated =========*/}
      <p className="text-xs text-gray-500 mb-4">
        Last updated: {project.lastUpdated}
      </p>

      {/*========= Action Buttons =========*/}
      <div className="flex gap-2 mt-auto">
        {project.canEdit ? (
          <button
            onClick={handleEditProject}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MdEdit size={18} />
            <span>Edit Project</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleViewProject}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <MdRemoveRedEye size={18} />
              <span>View Only</span>
            </button>
            {project.canRenew && (
              <button
                onClick={handleRenewProject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MdRefresh size={18} />
                <span>Renew</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectListCard;
