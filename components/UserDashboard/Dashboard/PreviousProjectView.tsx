"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineCalendarToday,
  MdOutlineFactory,
  MdRemoveRedEye,
  MdAccessTime,
} from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

interface ApiProject {
  id: number;
  title: string;
  project_year: number | string;
  status: string;
  industry?: string;
  interview_complete?: boolean;
  updated_at?: string;
  created_at?: string;
}

interface PreviousProjectViewProps {
  project: ApiProject | null;
}

const statusStyles: Record<string, string> = {
  pending: "bg-blue-100 text-blue-700",
  under_review: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  draft: "bg-yellow-100 text-yellow-700",
};

const formatStatusLabel = (status: string) =>
  status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

//========== Previous Project View Component ===========
const PreviousProjectView: React.FC<PreviousProjectViewProps> = ({
  project,
}) => {
  const router = useRouter();

  if (!project) return null;

  const normalizedStatus = project.status.toLowerCase();
  const style = statusStyles[normalizedStatus] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="space-y-4">
      {/*========= Title & Status =========*/}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {project.title || "Untitled Project"}
          </h4>
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${style}`}
        >
          {formatStatusLabel(project.status)}
        </span>
      </div>

      {/*========= Details Grid =========*/}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {project.project_year !== undefined && (
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday
              className="text-gray-400 shrink-0"
              size={16}
            />
            <div>
              <p className="text-xs text-gray-400">Financial Year</p>
              <p className="text-sm font-medium text-gray-800">
                {project.project_year}
              </p>
            </div>
          </div>
        )}
        {project.industry && (
          <div className="flex items-center gap-2">
            <MdOutlineFactory className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm font-medium text-gray-800">
                {project.industry}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FiCheckCircle
            className={
              project.interview_complete
                ? "text-green-500 shrink-0"
                : "text-gray-400 shrink-0"
            }
            size={16}
          />
          <div>
            <p className="text-xs text-gray-400">Interview Complete</p>
            <p className="text-sm font-medium text-gray-800">
              {project.interview_complete ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {project.updated_at && (
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Updated</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(project.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/*========= Footer =========*/}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Updated:{" "}
          {project.updated_at
            ? new Date(project.updated_at).toLocaleDateString()
            : "N/A"}
        </p>
        <button
          onClick={() => router.push(`/user/MyProjects/${project.id}`)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <MdRemoveRedEye size={16} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default PreviousProjectView;
