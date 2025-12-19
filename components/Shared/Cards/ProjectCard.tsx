import React from "react";
import { ProjectCardProps } from "@/Type/UserDashboard/Dashboard";


//========== Project Card Component ===========
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  isEmpty = false,
  emptyMessage,
  children,
  actionButton,
  headerAction,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      {/*========= Card Header =========*/}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {headerAction}
        </div>
      </div>

      {/*========= Card Body =========*/}
      <div className="p-6">
        {isEmpty ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm mb-4">{emptyMessage}</p>
            {actionButton}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
