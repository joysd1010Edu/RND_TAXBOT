"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowPath,
  HiOutlineCalendar,
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentArrowDown,
  HiOutlineStar,
} from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { toastManager } from "@/components/ui/toast";

//========== Types ==========
interface PdfGeneration {
  id: number;
  pdf_file: string;
  is_approved: boolean;
  generated_at: string;
  project: number;
}

interface ProjectDetail {
  id: number;
  pdf_generations: PdfGeneration[];
  status: string;
  project_title: string;
  brief_summary: string;
  financial_year: string;
  project_start_date: string;
  project_end_date: string;
  industry: string;
  staff_members: number;
  core_rnd_activity_q1: string;
  scientific_hypothesis_testing_q1: string;
  scientific_hypothesis_existed_q1: string;
  systematic_progression_q1: string;
  outcomes_q1: string;
  new_knowledge_q1: string;
  core_rnd_activity_q2: string;
  scientific_hypothesis_testing_q2: string;
  scientific_hypothesis_existed_q2: string;
  systematic_progression_q2: string;
  outcomes_q2: string;
  new_knowledge_q2: string;
  core_rnd_activity_q3: string;
  scientific_hypothesis_testing_q3: string;
  scientific_hypothesis_existed_q3: string;
  systematic_progression_q3: string;
  outcomes_q3: string;
  new_knowledge_q3: string;
  core_rnd_activity_q4: string;
  scientific_hypothesis_testing_q4: string;
  scientific_hypothesis_existed_q4: string;
  systematic_progression_q4: string;
  outcomes_q4: string;
  new_knowledge_q4: string;
  total_rnd_expenditure: string;
  staff_costs: string;
  contractor_costs: string;
  materials_costs: string;
  equipment_costs: string;
  other_costs: string;
  technical_documents: string | null;
  financial_documents: string | null;
  other_documents: string | null;
  created_at: string;
  updated_at: string;
}

//========== Status Badge Color ==========
const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

//========== Quarter Labels ==========
const quarterLabels = ["Q1", "Q2", "Q3", "Q4"] as const;
const quarterFields = [
  { key: "core_rnd_activity", label: "Core R&D Activity" },
  {
    key: "scientific_hypothesis_testing",
    label: "Scientific Hypothesis Testing",
  },
  {
    key: "scientific_hypothesis_existed",
    label: "Scientific Hypothesis Existed",
  },
  { key: "systematic_progression", label: "Systematic Progression" },
  { key: "outcomes", label: "Outcomes" },
  { key: "new_knowledge", label: "New Knowledge" },
] as const;

const ProjectDetails = ({ projectId }: { projectId: string }) => {
  const axios = useAxios();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRenewing, setIsRenewing] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [ratings, setRatings] = useState({
    q1_rating: 0,
    q2_rating: 0,
    q3_rating: 0,
    q4_rating: 0,
    others_rating: 0,
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  //========== Fetch PDF as Blob (only for approved PDFs) ==========
  const fetchPdfBlob = useCallback(
    async (pdfFileUrl: string) => {
      try {
        const pathname = new URL(pdfFileUrl).pathname;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PDF_DOWNLOAD_BASE_URL}${pathname}`,
          { responseType: "blob" },
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch {
        toastManager.add({
          type: "error",
          title: "Error",
          description: "Failed to load PDF.",
        });
      }
    },
    [axios],
  );

  //========== Cleanup blob URL on unmount ==========
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);

  //========== Fetch Project Data ==========
  const fetchProject = useCallback(async () => {
    try {
      const response = await axios.get(`tax_project/userlist/${projectId}/`);
      if (response.data?.success && response.data.data) {
        setProject(response.data.data);
        const gens: PdfGeneration[] = response.data.data.pdf_generations ?? [];
        // Only load PDF blob if there is an approved PDF
        const approvedPdf = [...gens].reverse().find((p) => p.is_approved);
        if (approvedPdf) {
          fetchPdfBlob(approvedPdf.pdf_file);
        }
      }
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to load project details.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [axios, projectId, fetchPdfBlob]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  //========== Renew Project ==========
  const handleRenew = async () => {
    setIsRenewing(true);
    try {
      await axios.post(`tax_project/userlist/${projectId}/renew/`);
      toastManager.add({
        type: "success",
        title: "Project Renewed",
        description: "Your project has been renewed successfully.",
      });
      await fetchProject();
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to renew project.",
      });
    } finally {
      setIsRenewing(false);
    }
  };

  //========== Submit Feedback ==========
  const handleSubmitFeedback = async (pdfId: number) => {
    if (Object.values(ratings).some((r) => r === 0)) {
      toastManager.add({
        type: "error",
        title: "Incomplete Ratings",
        description: "Please provide a rating (1-5) for all categories.",
      });
      return;
    }
    setIsSubmittingFeedback(true);
    try {
      await axios.post(`tax_project/userlist/${pdfId}/rate/`, ratings);
      toastManager.add({
        type: "success",
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      setFeedbackSubmitted(true);
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to submit feedback.",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  //========== Loading State ==========
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
        <Link href="/user/MyProjects" className="text-blue-600 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Show PDF section only if there's an approved PDF
  const approvedPdf =
    [...project.pdf_generations].reverse().find((p) => p.is_approved) ?? null;

  const badge = statusStyles[project.status] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-8 px-0 md:px-10 py-8 lg:px-18">
      {/*========== Back Button ==========*/}
      <Link
        href="/user/MyProjects"
        className="inline-flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900"
      >
        <HiOutlineArrowLeft size={16} />
        Back to Projects
      </Link>

      {/*========== Project Header ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {project.project_title}
            </h1>
            <p className="text-lg text-gray-600">
              Industry: {project.industry} • Financial Year:{" "}
              {project.financial_year}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${badge}`}
            >
              {project.status}
            </span>
            <button
              onClick={handleRenew}
              disabled={isRenewing}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-lg font-medium transition-colors"
            >
              <HiOutlineArrowPath size={18} />
              {isRenewing ? "Renewing..." : "Renew"}
            </button>
          </div>
        </div>
      </div>

      {/*========== PDF Section (shown only when an approved PDF exists) ==========*/}
      {approvedPdf && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                R&D Report
              </h2>
              <p className="text-lg text-gray-500">
                Generated on{" "}
                {new Date(approvedPdf.generated_at).toLocaleString()} •{" "}
                <span className="text-green-600 font-medium">Approved</span>
              </p>
            </div>
          </div>
          {/*========== Embedded PDF Viewer ==========*/}
          <div className="w-full h-175">
            {pdfBlobUrl ? (
              <iframe
                src={pdfBlobUrl}
                className="w-full h-full border-0"
                title="R&D Report PDF"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading PDF...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/*========== Overview Card ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Project Overview
        </h2>
        <p className="text-lg text-gray-700 mb-6">{project.brief_summary}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <HiOutlineCalendar size={24} className="text-blue-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Start Date</p>
              <p className="text-lg font-medium text-gray-900">
                {project.project_start_date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <HiOutlineCalendar size={24} className="text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">End Date</p>
              <p className="text-lg font-medium text-gray-900">
                {project.project_end_date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <HiOutlineBuildingOffice2
              size={24}
              className="text-purple-600 shrink-0"
            />
            <div>
              <p className="text-xs text-gray-500">Industry</p>
              <p className="text-lg font-medium text-gray-900">
                {project.industry}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <HiOutlineUsers size={24} className="text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Staff Members</p>
              <p className="text-lg font-medium text-gray-900">
                {project.staff_members}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*========== Quarterly Activities ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Quarterly R&D Activities
        </h2>
        <div className="space-y-6">
          {quarterLabels.map((q, qi) => {
            const suffix = `_q${qi + 1}` as const;
            return (
              <div
                key={q}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {q} — Quarter {qi + 1}
                  </h3>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quarterFields.map((field) => {
                    const value = (
                      project as unknown as Record<string, unknown>
                    )[`${field.key}${suffix}`] as string;
                    return (
                      <div key={field.key}>
                        <p className="text-base font-medium text-gray-500 mb-1">
                          {field.label}
                        </p>
                        <p className="text-lg text-gray-800">{value || "—"}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*========== Costs Breakdown ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Cost Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Total R&D Expenditure",
              value: project.total_rnd_expenditure,
              highlight: true,
            },
            { label: "Staff Costs", value: project.staff_costs },
            { label: "Contractor Costs", value: project.contractor_costs },
            { label: "Materials Costs", value: project.materials_costs },
            { label: "Equipment Costs", value: project.equipment_costs },
            { label: "Other Costs", value: project.other_costs },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-lg border ${
                item.highlight
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <HiOutlineCurrencyDollar
                  size={18}
                  className={item.highlight ? "text-blue-600" : "text-gray-500"}
                />
                <p className="text-base text-gray-500">{item.label}</p>
              </div>
              <p
                className={`text-lg font-semibold ${
                  item.highlight ? "text-blue-700" : "text-gray-900"
                }`}
              >
                $
                {Number(item.value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*========== Documents ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Documents</h2>
        {project.technical_documents ||
        project.financial_documents ||
        project.other_documents ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.technical_documents && (
              <a
                href={project.technical_documents}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HiOutlineDocumentArrowDown
                  size={24}
                  className="text-blue-600 shrink-0"
                />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Technical Documents
                  </p>
                  <p className="text-base text-blue-600">Download</p>
                </div>
              </a>
            )}
            {project.financial_documents && (
              <a
                href={project.financial_documents}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HiOutlineDocumentArrowDown
                  size={24}
                  className="text-green-600 shrink-0"
                />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Financial Documents
                  </p>
                  <p className="text-base text-green-600">Download</p>
                </div>
              </a>
            )}
            {project.other_documents && (
              <a
                href={project.other_documents}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HiOutlineDocumentArrowDown
                  size={24}
                  className="text-purple-600 shrink-0"
                />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Other Documents
                  </p>
                  <p className="text-base text-purple-600">Download</p>
                </div>
              </a>
            )}
          </div>
        ) : (
          <p className="text-lg text-gray-500">No documents uploaded.</p>
        )}
      </div>

      {/*========== Feedback Section (shown only when status is completed) ==========*/}
      {project.status.toLowerCase() === "completed" &&
        approvedPdf &&
        !feedbackSubmitted && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Rate Your R&D Report
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Please rate each section of your report from 1 to 5 stars.
            </p>
            <div className="space-y-5">
              {[
                { key: "q1_rating" as const, label: "Q1 Activities" },
                { key: "q2_rating" as const, label: "Q2 Activities" },
                { key: "q3_rating" as const, label: "Q3 Activities" },
                { key: "q4_rating" as const, label: "Q4 Activities" },
                { key: "others_rating" as const, label: "Other Aspects" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <p className="text-lg font-medium text-gray-700 w-40 shrink-0">
                    {item.label}
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRatings((prev) => ({ ...prev, [item.key]: star }))
                        }
                        className="p-1 transition-colors"
                      >
                        {star <= ratings[item.key] ? (
                          <HiStar size={28} className="text-yellow-400" />
                        ) : (
                          <HiOutlineStar
                            size={28}
                            className="text-gray-300 hover:text-yellow-300"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSubmitFeedback(approvedPdf.id)}
              disabled={isSubmittingFeedback}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-lg font-medium transition-colors"
            >
              {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        )}

      {project.status.toLowerCase() === "completed" && feedbackSubmitted && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
          <HiStar size={36} className="text-green-600 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-green-800">
            Thank you for your feedback!
          </h2>
          <p className="text-base text-green-600 mt-1">
            Your ratings have been submitted successfully.
          </p>
        </div>
      )}

      {/*========== Timestamps ==========*/}
      <div className="text-lg text-gray-400 flex gap-6">
        <p>Created: {new Date(project.created_at).toLocaleString()}</p>
        <p>Updated: {new Date(project.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
