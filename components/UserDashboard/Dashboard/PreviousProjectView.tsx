"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineCalendarToday,
  MdOutlineGroup,
  MdOutlineAttachMoney,
  MdOutlineFactory,
  MdRemoveRedEye,
} from "react-icons/md";

interface ApiProject {
  id: number;
  status: string;
  project_title: string;
  brief_summary: string;
  financial_year: string;
  project_start_date: string;
  project_end_date: string;
  industry: string;
  staff_members: number;
  total_rnd_expenditure: string;
  updated_at: string;
  created_at: string;
  [key: string]: unknown;
}

interface PreviousProjectViewProps {
  projects: ApiProject[];
}

const statusStyles: Record<string, string> = {
  Pending: "bg-blue-100 text-blue-700",
  pending: "bg-blue-100 text-blue-700",
  under_review: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  draft: "bg-yellow-100 text-yellow-700",
};

//========== Previous Project View Component ===========
const PreviousProjectView: React.FC<PreviousProjectViewProps> = ({
  projects,
}) => {
  const router = useRouter();

  if (projects.length === 0) return null;

  // Show the latest API project
  const latest = projects[projects.length - 1];
  const style = statusStyles[latest.status] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="space-y-4">
      {/*========= Title & Status =========*/}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {latest.project_title || "Untitled Project"}
          </h4>
          {latest.brief_summary && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {latest.brief_summary}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${style}`}
        >
          {latest.status}
        </span>
      </div>

      {/*========= Details Grid =========*/}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {latest.financial_year && (
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday
              className="text-gray-400 shrink-0"
              size={16}
            />
            <div>
              <p className="text-xs text-gray-400">Financial Year</p>
              <p className="text-sm font-medium text-gray-800">
                {latest.financial_year}
              </p>
            </div>
          </div>
        )}
        {latest.industry && (
          <div className="flex items-center gap-2">
            <MdOutlineFactory className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm font-medium text-gray-800">
                {latest.industry}
              </p>
            </div>
          </div>
        )}
        {latest.staff_members !== undefined && (
          <div className="flex items-center gap-2">
            <MdOutlineGroup className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Staff Members</p>
              <p className="text-sm font-medium text-gray-800">
                {latest.staff_members}
              </p>
            </div>
          </div>
        )}
        {latest.total_rnd_expenditure && (
          <div className="flex items-center gap-2">
            <MdOutlineAttachMoney
              className="text-gray-400 shrink-0"
              size={16}
            />
            <div>
              <p className="text-xs text-gray-400">Total R&D Spend</p>
              <p className="text-sm font-medium text-gray-800">
                ${latest.total_rnd_expenditure}
              </p>
            </div>
          </div>
        )}
      </div>

      {/*========= Footer =========*/}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Updated: {new Date(latest.updated_at).toLocaleDateString()}
        </p>
        <button
          onClick={() => router.push(`/user/MyProjects/${latest.id}`)}
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
