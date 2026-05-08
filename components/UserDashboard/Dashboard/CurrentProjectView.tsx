"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineCalendarToday,
  MdOutlineGroup,
  MdOutlineAttachMoney,
  MdOutlineFactory,
  MdArrowForward,
  MdAdd,
} from "react-icons/md";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";

interface DraftProject extends ProjectFormData {
  id: string;
  updatedAt?: string;
}

//========== Load latest localStorage draft ===========
const getLatestDraft = (): DraftProject | null => {
  let latest: DraftProject | null = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("project_")) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed: DraftProject = JSON.parse(raw);
      if (parsed.status !== "draft") continue;
      if (
        !latest ||
        new Date(parsed.updatedAt ?? 0) > new Date(latest.updatedAt ?? 0)
      ) {
        latest = parsed;
      }
    } catch {
      // skip malformed entries
    }
  }
  return latest;
};

//========== Current Project View Component ===========
const CurrentProjectView: React.FC = () => {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftProject | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDraft(getLatestDraft());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!draft) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
        <p className="text-gray-500 text-sm">
          No draft project saved locally. Start a new project to begin your R&D
          tax incentive submission.
        </p>
        <button
          onClick={() => router.push("/user/CreateProject")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          <MdAdd size={18} />
          Create New Project
        </button>
      </div>
    );
  }

  const completedSteps = [
    draft.projectTitle,
    draft.briefSummary,
    draft.q1?.coreActivitiesDescription,
    draft.q2?.coreActivitiesDescription,
    draft.q3?.coreActivitiesDescription,
    draft.q4?.coreActivitiesDescription,
    draft.totalExpenditure,
  ].filter(Boolean).length;
  const progressPct = Math.round((completedSteps / 7) * 100);

  return (
    <div className="space-y-5">
      {/*========= Title & Status =========*/}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {draft.projectTitle || "Untitled Draft"}
          </h4>
          {draft.briefSummary && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {draft.briefSummary}
            </p>
          )}
        </div>
        <span className="shrink-0 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          Draft
        </span>
      </div>

      {/*========= Progress Bar =========*/}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Form completion</span>
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
        {draft.financialYear && (
          <div className="flex items-center gap-2">
            <MdOutlineCalendarToday
              className="text-gray-400 shrink-0"
              size={16}
            />
            <div>
              <p className="text-xs text-gray-400">Financial Year</p>
              <p className="text-sm font-medium text-gray-800">
                {draft.financialYear}
              </p>
            </div>
          </div>
        )}
        {draft.industry && (
          <div className="flex items-center gap-2">
            <MdOutlineFactory className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm font-medium text-gray-800">
                {draft.industry}
              </p>
            </div>
          </div>
        )}
        {draft.staffMembers && (
          <div className="flex items-center gap-2">
            <MdOutlineGroup className="text-gray-400 shrink-0" size={16} />
            <div>
              <p className="text-xs text-gray-400">Staff Members</p>
              <p className="text-sm font-medium text-gray-800">
                {draft.staffMembers}
              </p>
            </div>
          </div>
        )}
        {draft.totalExpenditure && (
          <div className="flex items-center gap-2">
            <MdOutlineAttachMoney
              className="text-gray-400 shrink-0"
              size={16}
            />
            <div>
              <p className="text-xs text-gray-400">Total Expenditure</p>
              <p className="text-sm font-medium text-gray-800">
                ${draft.totalExpenditure}
              </p>
            </div>
          </div>
        )}
      </div>

      {/*========= Footer =========*/}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Last saved:{" "}
          {draft.updatedAt ? new Date(draft.updatedAt).toLocaleString() : "N/A"}
        </p>
        <button
          onClick={() => router.push(`/user/CreateProject?id=${draft.id}`)}
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
