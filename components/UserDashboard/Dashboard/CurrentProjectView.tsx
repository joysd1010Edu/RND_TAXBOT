"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineCalendarToday,
  MdOutlineFactory,
  MdArrowForward,
  MdAccessTime,
} from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

interface ApiProject {
  id: number;
  title: string;
  project_year: number | string;
  industry?: string;
  status: string;
  interview_complete?: boolean;
  updated_at?: string;
}

interface CurrentProjectViewProps {
  project: ApiProject | null;
}

const formatStatusLabel = (status: string) =>
  status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const getProgressPercentage = (project: ApiProject) => {
  const normalizedStatus = project.status.toUpperCase();
  if (normalizedStatus === "APPROVED") return 100;
  if (normalizedStatus === "REJECTED") return 25;
  if (normalizedStatus === "PENDING") return 50;
  if (project.interview_complete) return 80;
  return 60;
};

//========== Current Project View Component ===========
const CurrentProjectView: React.FC<CurrentProjectViewProps> = ({ project }) => {
  const router = useRouter();

  if (!project) return null;

  const progressPct = getProgressPercentage(project);

  return (
    <div className="space-y-5">
      {/*========= Title & Status =========*/}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {project.title || "Untitled Project"}
          </h4>
        </div>
        <span className="shrink-0 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          {formatStatusLabel(project.status)}
        </span>
      </div>

      {/*========= Progress Bar =========*/}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Project progress</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
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
              <p className="text-xs text-gray-400">Last Updated</p>
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
          Last saved:{" "}
          {project.updated_at
            ? new Date(project.updated_at).toLocaleString()
            : "N/A"}
        </p>
        <button
          onClick={() => router.push(`/user/MyProjects/${project.id}`)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          Continue editing
          <MdArrowForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default CurrentProjectView;
