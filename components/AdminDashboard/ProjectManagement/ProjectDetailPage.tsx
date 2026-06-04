"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineArrowPath,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { toastManager } from "@/components/ui/toast";
import { useAxios } from "@/Hooks/useAxiosInstance";

//========== Types ==========
interface ReportData {
  id: number;
  report_text: string;
  report_pdf: string; // e.g. "/media/uploads/projects/4/reports/report_4.pdf"
  score: number;
  score_grade: string;
  score_technical_uncertainty: number;
  score_systematic_progression: number;
  score_new_knowledge: number;
  score_evidence_documentation: number;
  red_flags: string[];
  strengths: string[];
  recommendations: string[];
  generated_at: string;
}

interface ProjectDetail {
  id: number;
  title: string;
  project_year: number;
  project_type: string;
  industry: string;
  budget: string;
  start_date: string;
  finish_date: string;
  status: string;
  core_activity: string;
  hypothesis: string;
  experiments: string;
  evaluation: string;
  conclusions: string;
  new_knowledge: string;
  unknown_in_advance: string;
  evidence_kept: string;
  supporting_activities: string;
  interview_complete: boolean;
  interview_summary?: string;
  extracted_baseline?: unknown;
  required_updates?: unknown;
  input_method?: string;
  is_editable?: boolean;
  report_visible_to_user?: boolean;
  reviewed_by_email?: string | null;
  reviewed_at?: string | null;
  review_note?: string | null;
  submitted_at?: string | null;
  resubmit_count?: number;
  created_at: string;
  updated_at: string;
  user_email?: string;
  user_name?: string;
  user_company?: string | null;
  user_abn?: string | null;
  document?: string | null;
  chat_messages?: Array<{
    id: number;
    role: string;
    content: string;
    created_at: string;
  }>;
  report?: Record<string, unknown> | null;
  [key: string]: unknown;
}

//========== Status Badge Styles ==========
const statusStyles: Record<
  string,
  { badge: string; dot: string; label: string }
> = {
  pending: {
    badge: "bg-amber-50 text-amber-700 border border-amber-300",
    dot: "bg-amber-500",
    label: "Pending",
  },
  Pending: {
    badge: "bg-amber-50 text-amber-700 border border-amber-300",
    dot: "bg-amber-500",
    label: "Pending",
  },
  under_review: {
    badge: "bg-violet-50 text-violet-700 border border-violet-300",
    dot: "bg-violet-500",
    label: "Under Review",
  },
  completed: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-300",
    dot: "bg-emerald-500",
    label: "Completed",
  },
  approved: {
    badge: "bg-green-50 text-green-700 border border-green-300",
    dot: "bg-green-500",
    label: "Approved",
  },
  rejected: {
    badge: "bg-rose-50 text-rose-700 border border-rose-300",
    dot: "bg-rose-500",
    label: "Rejected",
  },
};

const getStatusStyle = (status: string) => {
  // API may return uppercase ("PENDING", "UNDER_REVIEW", "REJECTED")
  const key = status?.toLowerCase();
  return (
    statusStyles[key] ??
    statusStyles[status] ?? {
      badge: "bg-gray-100 text-gray-600 border border-gray-300",
      dot: "bg-gray-400",
      label: status,
    }
  );
};

//========== Spinner ==========
const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

//========== Reject Modal ==========
const RejectModal = ({
  onConfirm,
  onCancel,
  isLoading,
}: {
  onConfirm: (note: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}) => {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-lg mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Reject Project
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Provide a reason. User will see this and can edit &amp; resubmit.
        </p>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none min-h-30"
          placeholder="e.g. The technical uncertainty section lacks specificity..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note)}
            disabled={isLoading || !note.trim()}
            className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <Spinner />}
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
};

//========== PDF Preview ==========
// Fetches PDF as a data URL so the preview renders reliably in the modal.
const BASE_URL = "https://api.rdtaxbot.com.au";

// const PdfPreview = ({ pdfPath }: { pdfPath: string }) => {
//   const [blobUrl, setBlobUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     let isActive = true;

//     const loadPdf = async () => {
//       setIsLoading(true);
//       setError(false);
//       setBlobUrl(null);

//       const token =
//         typeof window !== "undefined"
//           ? window.localStorage.getItem("accessToken") ||
//             window.sessionStorage.getItem("accessToken")
//           : null;

//       if (!token) {
//         if (isActive) {
//           setError(true);
//           setIsLoading(false);
//         }
//         return;
//       }

//       try {
//         const response = await fetch(BASE_URL + pdfPath, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/pdf",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//         }

//         const blob = await response.blob();
//         const reader = new FileReader();

//         reader.onload = () => {
//           if (!isActive) return;
//           setBlobUrl(typeof reader.result === "string" ? reader.result : null);
//         };

//         reader.onerror = () => {
//           if (!isActive) return;
//           console.error("Failed to read PDF blob:", reader.error);
//           setError(true);
//         };

//         reader.readAsDataURL(blob);
//       } catch (err) {
//         console.error("Failed to load PDF:", err);
//         if (isActive) {
//           setError(true);
//         }
//       } finally {
//         if (isActive) {
//           setIsLoading(false);
//         }
//       }
//     };

//     loadPdf();

//     return () => {
//       isActive = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pdfPath]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-150 bg-gray-50 rounded-lg border border-gray-200">
//         <div className="flex flex-col items-center gap-3 text-gray-500">
//           <Spinner />
//           <p className="text-sm">Loading PDF preview…</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !blobUrl) {
//     return (
//       <div className="flex items-center justify-center h-40 bg-rose-50 rounded-lg border border-rose-200">
//         <p className="text-sm text-rose-600">Failed to load PDF preview.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg border border-gray-200 overflow-hidden">
//       <iframe
//         src={blobUrl}
//         className="w-full"
//         style={{ height: "700px" }}
//         title="Report PDF Preview"
//       />
//     </div>
//   );
// };

//========== Score Bar ==========
const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value}/25</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-500 rounded-full transition-all"
        style={{ width: `${(value / 25) * 100}%` }}
      />
    </div>
  </div>
);

//========== Main Component ==========
const ProjectDetailPage = ({ projectId }: { projectId: string }) => {
  const axiosInstance = useAxios();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const extractProjectDetail = (payload: unknown): ProjectDetail | null => {
    if (!payload || typeof payload !== "object") return null;
    const record = payload as { data?: unknown; result?: unknown };
    if (record.data && typeof record.data === "object")
      return record.data as ProjectDetail;
    if (record.result && typeof record.result === "object")
      return record.result as ProjectDetail;
    return payload as ProjectDetail;
  };

  //========== Fetch Project ==========
  const fetchProject = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/tax_project/admin/projects/${projectId}/`,
      );
      const nextProject = extractProjectDetail(response.data);
      if (nextProject) {
        setProject(nextProject);
        // Hydrate reportData from persisted report field if present
        if (nextProject.report && typeof nextProject.report === "object") {
          setReportData(nextProject.report as unknown as ReportData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error);
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to load project details.",
      });
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  //========== Generate / Regenerate Report ==========
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post(
        `/tax_project/admin/projects/${projectId}/report/`,
        {},
      );
      // Response IS the ReportData directly
      setReportData(response.data as ReportData);
      toastManager.add({
        type: "success",
        title: "Report Generated",
        description: "AI report generated successfully.",
      });
      await fetchProject(); // refresh status → under_review
    } catch (error) {
      console.error("Failed to generate report:", error);
      toastManager.add({
        type: "error",
        title: "Generation Failed",
        description: "Could not generate report. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  //========== Approve ==========
  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await axiosInstance.post(
        `/tax_project/admin/projects/${projectId}/review/`,
        { action: "approve", review_note: "" },
      );
      toastManager.add({
        type: "success",
        title: "Project Approved",
        description: "Project approved successfully.",
      });
      await fetchProject();
    } catch (error) {
      console.error("Failed to approve:", error);
      toastManager.add({
        type: "error",
        title: "Approval Failed",
        description: "Could not approve project.",
      });
    } finally {
      setIsApproving(false);
    }
  };

  //========== Reject ==========
  const handleReject = async (reviewNote: string) => {
    setIsRejecting(true);
    try {
      await axiosInstance.post(
        `/tax_project/admin/projects/${projectId}/review/`,
        { action: "reject", review_note: reviewNote },
      );
      toastManager.add({
        type: "success",
        title: "Project Rejected",
        description: "Project rejected.",
      });
      setShowRejectModal(false);
      await fetchProject();
    } catch (error) {
      console.error("Failed to reject:", error);
      toastManager.add({
        type: "error",
        title: "Rejection Failed",
        description: "Could not reject project.",
      });
    } finally {
      setIsRejecting(false);
    }
  };

  //========== Loading ==========
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 text-lg">Project not found.</p>
        <Link
          href="/Admin/projectManagement"
          className="text-blue-600 hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const statusStyle = getStatusStyle(project.status);
  const normalizedStatus = project.status?.toLowerCase();

  // Status checks
  const isPending = normalizedStatus === "pending";
  const isRejectedStatus = normalizedStatus === "rejected";
  const isApprovedStatus = normalizedStatus === "approved";
  const isDraftStatus = normalizedStatus === "draft";

  // Button visibility based on status and report existence
  const showGenerateReport = isPending && !reportData;
  const showApproveReject =
    !!reportData &&
    (isPending || isDraftStatus) &&
    !isRejectedStatus &&
    !isApprovedStatus;
  const showNoActionButtons = isRejectedStatus || isApprovedStatus;

  return (
    <>
      {showRejectModal && (
        <RejectModal
          onConfirm={handleReject}
          onCancel={() => setShowRejectModal(false)}
          isLoading={isRejecting}
        />
      )}

      <div className="space-y-8 px-0 md:px-10 py-8 lg:px-18">
        {/*========== Back ==========*/}
        <Link
          href="/Admin/projectManagement"
          className="inline-flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Projects
        </Link>

        {/*========== Header ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600">
                Industry: {project.industry} • Year: {project.project_year}
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3">
              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusStyle.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>

              {/* Generate Report — pending without report */}
              {showGenerateReport && (
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {isGenerating ? (
                    <>
                      <Spinner />
                      Generating… (10–30s)
                    </>
                  ) : (
                    <>
                      <HiOutlineDocumentText size={16} />
                      Generate AI Report
                    </>
                  )}
                </button>
              )}

              {/* Approve + Reject — when report exists and not rejected/approved */}
              {showApproveReject && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isApproving ? (
                      <Spinner />
                    ) : (
                      <HiOutlineCheckCircle size={16} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    disabled={isRejecting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  >
                    <HiOutlineXCircle size={16} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*========== Report Section — visible after generation ==========*/}
        {reportData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  AI Generated Report
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Generated:{" "}
                  {new Date(reportData.generated_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Score pill */}
                <div
                  className={`flex flex-col items-center px-5 py-3 rounded-xl border ${
                    reportData.score >= 80
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : reportData.score >= 60
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  <span className="text-3xl font-bold">{reportData.score}</span>
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {reportData.score_grade}
                  </span>
                </div>
                {/* Download link — direct URL, no auth needed for media */}
                <a
                  href={`${BASE_URL}${reportData.report_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  <HiOutlineArrowDownTray size={16} />
                  Download PDF
                </a>
              </div>
            </div>

            {/* Score breakdown bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <ScoreBar
                label="Technical Uncertainty"
                value={reportData.score_technical_uncertainty}
              />
              <ScoreBar
                label="Systematic Progression"
                value={reportData.score_systematic_progression}
              />
              <ScoreBar
                label="New Knowledge"
                value={reportData.score_new_knowledge}
              />
              <ScoreBar
                label="Evidence & Documentation"
                value={reportData.score_evidence_documentation}
              />
            </div>

            {/* Strengths / Red Flags / Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-emerald-800 mb-3">
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {reportData.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-emerald-700 flex gap-2">
                      <span className="mt-0.5 shrink-0 text-emerald-500">
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-rose-800 mb-3">
                  Red Flags
                </h4>
                <ul className="space-y-2">
                  {reportData.red_flags.map((f, i) => (
                    <li key={i} className="text-sm text-rose-700 flex gap-2">
                      <span className="mt-0.5 shrink-0 text-rose-500">⚠</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-3">
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {reportData.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-blue-700 flex gap-2">
                      <span className="mt-0.5 shrink-0 text-blue-500">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/*========== Project Basic Info ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Project Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Project Type
              </p>
              <p className="text-lg text-gray-900">{project.project_type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Budget</p>
              <p className="text-lg text-gray-900">
                $
                {typeof project.budget === "string"
                  ? parseInt(project.budget).toLocaleString()
                  : project.budget}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Input Method
              </p>
              <p className="text-lg text-gray-900">{project.input_method}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Start Date
              </p>
              <p className="text-lg text-gray-900">
                {project.start_date
                  ? new Date(project.start_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Finish Date
              </p>
              <p className="text-lg text-gray-900">
                {project.finish_date
                  ? new Date(project.finish_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Submitted At
              </p>
              <p className="text-lg text-gray-900">
                {project.submitted_at
                  ? new Date(project.submitted_at).toLocaleDateString()
                  : "Not submitted"}
              </p>
            </div>
          </div>
        </div>

        {/*========== User Information ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            User Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
              <p className="text-lg text-gray-900">{project.user_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
              <p className="text-lg text-gray-900">{project.user_email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company</p>
              <p className="text-lg text-gray-900">{project.user_company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">ABN</p>
              <p className="text-lg text-gray-900">{project.user_abn}</p>
            </div>
          </div>
        </div>

        {/*========== R&D Content ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            R&D Content
          </h2>
          <div className="space-y-6">
            {[
              { label: "Core Activity", key: "core_activity" },
              { label: "Hypothesis", key: "hypothesis" },
              { label: "Experiments", key: "experiments" },
              { label: "Evaluation", key: "evaluation" },
              { label: "Conclusions", key: "conclusions" },
              { label: "New Knowledge", key: "new_knowledge" },
              { label: "Unknown in Advance", key: "unknown_in_advance" },
              { label: "Evidence Kept", key: "evidence_kept" },
              { label: "Supporting Activities", key: "supporting_activities" },
            ].map(({ label, key }) => (
              <div key={key}>
                <p className="text-base font-semibold text-gray-700 mb-2">
                  {label}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {project[key] as string}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/*========== Interview ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Interview
          </h2>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Interview Status
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                project.interview_complete
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.interview_complete ? "Completed" : "Incomplete"}
            </span>
          </div>
          {project.interview_summary && (
            <div>
              <p className="text-base font-semibold text-gray-700 mb-2">
                Interview Summary
              </p>
              <div className="rounded border border-gray-200 bg-gray-50 p-4 max-h-96 overflow-y-auto">
                <div className="text-gray-700">{project.interview_summary}</div>
              </div>
            </div>
          )}
        </div>

        {/*========== Chat Messages ==========*/}
        {project.chat_messages && project.chat_messages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Chat History
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {project.chat_messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded p-3 ${
                    msg.role === "user"
                      ? "bg-blue-50 text-blue-900"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <div className="font-semibold text-sm capitalize mb-1">
                    {msg.role}
                  </div>
                  <div className="text-sm text-gray-700">{msg.content}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*========== Review ==========*/}
        {(project.reviewed_by_email || project.review_note) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Review
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.reviewed_by_email && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Reviewed By
                  </p>
                  <p className="text-lg text-gray-900">
                    {project.reviewed_by_email}
                  </p>
                </div>
              )}
              {project.reviewed_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Reviewed At
                  </p>
                  <p className="text-lg text-gray-900">
                    {new Date(project.reviewed_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            {project.review_note && (
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-700 mb-2">
                  Review Note
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {project.review_note}
                </p>
              </div>
            )}
          </div>
        )}

        {/*========== Timestamps ==========*/}
        <div className="text-lg text-gray-400 flex gap-6">
          <p>Created: {new Date(project.created_at).toLocaleString()}</p>
          <p>Updated: {new Date(project.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
