"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  HiOutlineArrowLeft,
  HiOutlineBuildingOffice2,
  HiOutlineInformationCircle,
  HiOutlineEye,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { set, useForm } from "react-hook-form";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { toastManager } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPanel,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

type ProjectResponse = {
  id: string | number;
  status?: string;
  title?: string;
  project_year?: string | number;
  project_type?: string;
  industry?: string;
  budget?: string | number;
  start_date?: string;
  finish_date?: string;
  input_method?: string;
  report?: ReportData | null;
  [key: string]: unknown;
};

type FormValues = Record<string, string>;

type ReportData = {
  id: number;
  report_text: string;
  report_pdf: string;
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
};

type ChatMessage = {
  id?: number | string;
  role?: string;
  content?: string;
  created_at?: string;
};

const narrativeFields = [
  { key: "core_activity", label: "Core R&D Activity" },
  { key: "hypothesis", label: "Scientific Hypothesis" },
  { key: "experiments", label: "Experiments Conducted" },
  { key: "evaluation", label: "Evaluation Results" },
  { key: "conclusions", label: "Conclusions" },
  { key: "new_knowledge", label: "New Knowledge" },
  { key: "unknown_in_advance", label: "Unknown In Advance" },
  { key: "evidence_kept", label: "Evidence Kept" },
  { key: "supporting_activities", label: "Supporting Activities" },
] as const;

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  DRAFT: "In Progress",
  PENDING: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Action Needed",
};

const DRAFT_CACHE_PREFIX = "project-details-draft";
const DRAFT_DEBOUNCE_MS = 500;

const emptyFormValues = (): FormValues => {
  const values: FormValues = {
    title: "",
    project_year: "",
    project_type: "",
    industry: "",
    budget: "",
    start_date: "",
    finish_date: "",
    input_method: "",
    core_activity: "",
    hypothesis: "",
    experiments: "",
    evaluation: "",
    conclusions: "",
    new_knowledge: "",
    unknown_in_advance: "",
    evidence_kept: "",
    supporting_activities: "",
  };

  return values;
};

const getDraftCacheKey = (projectId: string): string =>
  `${DRAFT_CACHE_PREFIX}:${projectId}`;

const normalizeFormValues = (values: Record<string, unknown>): FormValues => {
  const template = emptyFormValues();
  const normalized: FormValues = { ...template };

  Object.keys(template).forEach((key) => {
    if (key in values) {
      normalized[key] = toText(values[key]);
    }
  });

  return normalized;
};

const readCachedDraft = (projectId: string): FormValues | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(getDraftCacheKey(projectId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as
      | { values?: Record<string, unknown> }
      | Record<string, unknown>;

    if (parsed && typeof parsed === "object") {
      if (
        "values" in parsed &&
        parsed.values &&
        typeof parsed.values === "object"
      ) {
        return normalizeFormValues(parsed.values as Record<string, unknown>);
      }

      return normalizeFormValues(parsed);
    }

    return null;
  } catch {
    return null;
  }
};

const mergeFormValues = (base: FormValues, draft: FormValues): FormValues => {
  const merged: FormValues = { ...base };
  Object.keys(base).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(draft, key)) {
      merged[key] = draft[key];
    }
  });

  return merged;
};

const toText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const toDateInput = (value: unknown): string => {
  const text = toText(value).trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime())
    ? text
    : parsed.toISOString().slice(0, 10);
};

const mapProjectToForm = (project: ProjectResponse): FormValues => {
  const values = emptyFormValues();
  values.title = toText(project.title);
  values.project_year = toText(project.project_year);
  values.project_type = toText(project.project_type);
  values.industry = toText(project.industry);
  values.budget = toText(project.budget);
  values.start_date = toDateInput(project.start_date);
  values.finish_date = toDateInput(project.finish_date);
  values.input_method = toText(project.input_method);
  values.core_activity = toText(project.core_activity);
  values.hypothesis = toText(project.hypothesis);
  values.experiments = toText(project.experiments);
  values.evaluation = toText(project.evaluation);
  values.conclusions = toText(project.conclusions);
  values.new_knowledge = toText(project.new_knowledge);
  values.unknown_in_advance = toText(project.unknown_in_advance);
  values.evidence_kept = toText(project.evidence_kept);
  values.supporting_activities = toText(project.supporting_activities);

  return values;
};

const getInterviewCompleteFromChat = (messages: ChatMessage[]): boolean => {
  if (!Array.isArray(messages) || messages.length === 0) return false;

  const lastMessage = messages[messages.length - 1];
  return Boolean(
    typeof lastMessage?.content === "string" &&
    lastMessage.content.includes("INTERVIEW_COMPLETE"),
  );
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="mb-1 flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value}/25</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-indigo-500 transition-all"
        style={{ width: `${(value / 25) * 100}%` }}
      />
    </div>
  </div>
);

const ProjectDetails = ({ projectId }: { projectId: string }) => {
  const [navigatorKey, setNavigatorKey] = useState(false);
  const axios = useAxios();
  const router = useRouter();
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: emptyFormValues(),
  });

  const status = (project?.status ?? "DRAFT").toUpperCase();
  const canEdit = status === "DRAFT" || status === "REJECTED";
  const isApproved = status === "APPROVED";

  useEffect(() => {
    setShowFullReport(false);
  }, [reportData?.id]);

  const getReportPreview = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const previewWords = words.slice(0, 100);
    const previewText = previewWords.join(" ");
    return {
      previewText,
      hasMore: words.length > previewWords.length,
    };
  };

  const fetchProject = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/tax_project/projects/${projectId}/`);
      const rawProject: ProjectResponse | undefined =
        response.data?.data ?? response.data?.result ?? response.data;

      if (
        rawProject &&
        rawProject.conclusions !== null &&
        rawProject.evidence_kept !== null &&
        rawProject.experiments !== null &&
        rawProject.core_activity !== null &&
        rawProject.hypothesis !== null &&
        rawProject.new_knowledge !== null &&
        rawProject.supporting_activities !== null &&
        rawProject.unknown_in_advance !== null &&
        rawProject.evaluation !== null
      ) {
        setNavigatorKey(true);
      }
      if (!rawProject || typeof rawProject !== "object") {
        throw new Error("Project not found");
      }

      setProject(rawProject);
      setReportData((rawProject.report as ReportData | null) ?? null);
      const serverValues = mapProjectToForm(rawProject);
      const cachedDraft = readCachedDraft(projectId);
      const nextValues = cachedDraft
        ? mergeFormValues(serverValues, cachedDraft)
        : serverValues;

      reset(nextValues);

      if (cachedDraft) {
        toastManager.add({
          type: "info",
          title: "Draft Restored",
          description: "Recovered your unsaved changes from local draft.",
        });
      }

      await fetchInterviewStatus();
    } catch {
      setProject(null);
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to load project details.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [axios, projectId, reset]);

  const fetchInterviewStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `/tax_project/projects/${projectId}/chat/`,
      );
      const chatPayload =
        response.data?.data ?? response.data?.result ?? response.data;
      const chatMessages = Array.isArray(chatPayload)
        ? (chatPayload as ChatMessage[])
        : [];

      setIsComplete(getInterviewCompleteFromChat(chatMessages));
    } catch {
      setIsComplete(false);
    }
  }, [axios, projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    if (!isComplete) return;

    let isActive = true;

    const loadPdfPreview = async () => {
      setPdfLoading(true);
      try {
        // Get token from localStorage or sessionStorage
        const token =
          typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken") ||
              window.sessionStorage.getItem("accessToken")
            : null;

        if (!token) {
          console.error("No authentication token found");
          toastManager.add({
            type: "error",
            title: "Error",
            description: "Authentication token not found.",
          });
          setPdfBlobUrl(null);
          setPdfLoading(false);
          return;
        }

        // Use native fetch with proper headers
        const response = await fetch(
          `https://api.rdtaxbot.com.au/api/tax_project/projects/${projectId}/preview-pdf/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("PDF Fetch (Native) - Response received:", response);

        if (!isActive) return;

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();

        // Diagnostic logging
        console.log("PDF Fetch (Native) - Diagnostics:");
        console.log("  Blob Size:", blob.size, "bytes");
        console.log("  Blob Type:", blob.type);
        console.log("  Response Status:", response.status);
        console.log("  Response Headers:", {
          contentType: response.headers.get("content-type"),
          contentLength: response.headers.get("content-length"),
        });

        // Convert blob to base64 data URL for reliable rendering
        const reader = new FileReader();
        reader.onload = () => {
          if (!isActive) return;
          const dataUrl = reader.result as string;
          console.log("  Base64 Data URL created, length:", dataUrl.length);
          setPdfBlobUrl((previousUrl) => {
            if (previousUrl && previousUrl.startsWith("blob:")) {
              URL.revokeObjectURL(previousUrl);
            }
            return dataUrl;
          });
        };
        reader.onerror = () => {
          console.error("FileReader error:", reader.error);
          if (isActive) {
            setPdfBlobUrl(null);
          }
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Failed to fetch PDF preview:", error);
        if (isActive) {
          setPdfBlobUrl(null);
          toastManager.add({
            type: "error",
            title: "PDF Load Error",
            description:
              error instanceof Error ? error.message : "Failed to load PDF.",
          });
        }
      } finally {
        if (isActive) {
          setPdfLoading(false);
        }
      }
    };

    loadPdfPreview();

    return () => {
      isActive = false;
    };
  }, [axios, isComplete, projectId]);

  useEffect(() => {
    return () => {
      if (pdfBlobUrl && pdfBlobUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  useEffect(() => {
    if (!canEdit) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const subscription = watch((values) => {
      if (typeof window === "undefined") return;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const payload = {
          values: normalizeFormValues(
            (values ?? {}) as Record<string, unknown>,
          ),
          updatedAt: Date.now(),
        };

        window.localStorage.setItem(
          getDraftCacheKey(projectId),
          JSON.stringify(payload),
        );
      }, DRAFT_DEBOUNCE_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [canEdit, projectId, watch]);

  const handleSave = async (values: FormValues) => {
    if (!canEdit) {
      toastManager.add({
        type: "info",
        title: "Read only",
        description:
          "This project can no longer be edited in its current status.",
      });
      return;
    }

    setIsSaving(true);
    try {
      await axios.patch(`/tax_project/projects/${projectId}/`, values);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(getDraftCacheKey(projectId));
      }
      toastManager.add({
        type: "success",
        title: "Project Updated",
        description: "Your changes were saved successfully.",
      });
      await fetchProject();
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to update project.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewPDF = async () => {
    if (!pdfBlobUrl) {
      toastManager.add({
        type: "info",
        title: "PDF loading",
        description:
          "The PDF is still being prepared. Please try again in a moment.",
      });
      return;
    }
    console.log("Opening PDF preview with blob URL:", pdfBlobUrl); // Debug log

    // Open modal viewer — blob is prefetched when interview is complete
    setPreviewOpen(true);
  };

  const handleDownloadPDF = async () => {
    if (!pdfBlobUrl) {
      toastManager.add({
        type: "info",
        title: "PDF loading",
        description:
          "The PDF is still being prepared. Please try again in a moment.",
      });
      return;
    }

    const link = document.createElement("a");
    link.href = pdfBlobUrl;
    link.download = `project-${projectId}-preview.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitProject = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `/tax_project/projects/${projectId}/submit/`,
        { confirm: true },
      );

      const responseData =
        response.data?.data ?? response.data?.result ?? response.data;
      const isCompleteFlag = responseData?.is_complete ?? false;
      setIsComplete(isCompleteFlag);
      setIsSubmitted(true);

      toastManager.add({
        type: "success",
        title: "Project Submitted",
        description: "Your project has been submitted for review.",
      });

      await fetchProject();
    } catch (error) {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to submit project.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-500">Project not found.</p>
        <Link href="/user/MyProjects" className="text-blue-600 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-0 py-8 md:px-10 lg:px-18">
      <Link
        href="/user/MyProjects"
        className="inline-flex items-center gap-2 text-lg text-gray-600 transition-colors hover:text-gray-900"
      >
        <HiOutlineArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-linear-to-r from-slate-50 to-white p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[status] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {statusLabels[status] ?? status}
                </span>
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  Project #{project.id}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {project.title ?? "Untitled Project"}
              </h1>
              <p className="text-base leading-7 text-gray-600 md:text-lg">
                Review and edit project details below. Changes are saved
                automatically for DRAFT and REJECTED projects.
              </p>
            </div>

            <div>
              {!isApproved && navigatorKey ? (
                <button
                  onClick={() =>
                    router.push(`/user/MyProjects/${projectId}/interview`)
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-blue-500 cursor-pointer px-4 py-2 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  navigate to AI interview
                </button>
              ) : !isApproved ? (
                <div className="rounded-xl border border-blue-100 bg-red-500/80  px-4 py-3 text-sm text-white lg:max-w-md">
                  <div className="flex items-start gap-3">
                    <HiOutlineInformationCircle
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                    <p>
                      Fill the project evidence and activities sections to
                      proceed for AI interview.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {isApproved && reportData && (
          <section className="border-b border-gray-200 bg-white p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Project Report
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Generated:{" "}
                    {new Date(reportData.generated_at).toLocaleString()}
                  </p>
                </div>
                <a
                  href={`${reportData.report_pdf.startsWith("http") ? "" : "https://api.rdtaxbot.com.au"}${reportData.report_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  <HiOutlineArrowDownTray size={16} />
                  Download PDF
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
                  <p className="text-sm font-medium text-gray-500">Score</p>
                  <p className="mt-2 text-5xl font-bold text-gray-900">
                    {reportData.score}
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
                    {reportData.score_grade}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="text-sm font-semibold text-emerald-800">
                    Strengths
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-emerald-700">
                    {reportData.strengths.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                  <h3 className="text-sm font-semibold text-rose-800">
                    Red Flags
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-rose-700">
                    {reportData.red_flags.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <h3 className="text-sm font-semibold text-blue-800">
                    Recommendations
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-blue-700">
                    {reportData.recommendations.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Report Details
                </h3>
                {(() => {
                  const { previewText, hasMore } = getReportPreview(
                    reportData.report_text,
                  );
                  const displayedText = showFullReport
                    ? reportData.report_text
                    : previewText;

                  return (
                    <>
                      <div
                        className={`prose prose-sm mt-3 max-w-none overflow-hidden text-gray-700 transition-all duration-500 ease-in-out ${
                          showFullReport
                            ? "max-h-1250 opacity-100"
                            : "max-h-64 opacity-95"
                        }`}
                      >
                        <ReactMarkdown>{displayedText}</ReactMarkdown>
                      </div>
                      {hasMore && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowFullReport((previous) => !previous)
                          }
                          className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {showFullReport ? "Show less" : "See more"}
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-8 p-6 md:p-8"
        >
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <HiOutlineBuildingOffice2 className="text-gray-500" size={20} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Project Overview
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="title"
                  className="text-base font-medium text-gray-700"
                >
                  Project Title
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="project_year"
                  className="text-base font-medium text-gray-700"
                >
                  Project Year
                </Label>
                <Input
                  id="project_year"
                  {...register("project_year")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="project_type"
                  className="text-base font-medium text-gray-700"
                >
                  Project Type
                </Label>
                <Input
                  id="project_type"
                  {...register("project_type")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                  placeholder="e.g., NEW, CONTINUATION"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="industry"
                  className="text-base font-medium text-gray-700"
                >
                  Industry
                </Label>
                <Input
                  id="industry"
                  {...register("industry")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="budget"
                  className="text-base font-medium text-gray-700"
                >
                  Budget
                </Label>
                <Input
                  id="budget"
                  {...register("budget")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                  placeholder="e.g., $150,000"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="start_date"
                  className="text-base font-medium text-gray-700"
                >
                  Start Date
                </Label>
                <Input
                  id="start_date"
                  {...register("start_date")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="finish_date"
                  className="text-base font-medium text-gray-700"
                >
                  Finish Date
                </Label>
                <Input
                  id="finish_date"
                  {...register("finish_date")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="input_method"
                  className="text-base font-medium text-gray-700"
                >
                  Input Method
                </Label>
                <Input
                  id="input_method"
                  {...register("input_method")}
                  disabled={!canEdit}
                  className="h-12 text-base"
                  placeholder="e.g., MANUAL, IMPORTED"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <HiOutlineInformationCircle className="text-gray-500" size={20} />
              <h2 className="text-2xl font-semibold text-gray-900">
                R&D Evidence & Activities
              </h2>
            </div>
            <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-2">
              {narrativeFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label
                    htmlFor={field.key}
                    className="text-base font-medium text-gray-700"
                  >
                    {field.label}
                  </Label>
                  <textarea
                    id={field.key}
                    rows={4}
                    {...register(field.key)}
                    disabled={!canEdit}
                    className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              ))}
            </div>
          </section>

          {(isSubmitted || status === "PENDING") && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
              <p className="text-sm font-semibold">Project submitted</p>
              <p className="mt-1 text-sm text-emerald-800">
                Your project has been submitted for review and the submit button
                is now hidden.
              </p>
            </section>
          )}

          {/* PDF Preview & Download - Hide for approved projects */}
          {isComplete && !isApproved && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Project PDF
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={handlePreviewPDF}
                  disabled={pdfLoading}
                  className="h-11 bg-blue-600 px-5 text-base text-white hover:bg-blue-700"
                >
                  <HiOutlineEye className="mr-2" size={18} />
                  {pdfLoading ? "Loading PDF..." : "Preview PDF"}
                </Button>
                <Button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={pdfLoading}
                  className="h-11 bg-emerald-600 px-5 text-base text-white hover:bg-emerald-700"
                >
                  <HiOutlineArrowDownTray className="mr-2" size={18} />
                  {pdfLoading ? "Downloading..." : "Download PDF"}
                </Button>
              </div>
            </section>
          )}

          {/* Modal PDF Viewer */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="sm:max-h-[90vh] sm:max-w-[70vw]">
              <DialogHeader>
                <DialogTitle>Project PDF Preview</DialogTitle>
              </DialogHeader>
              <DialogPanel>
                <div className="min-h-[50vh]">
                  {pdfLoading && (
                    <div className="flex h-60 items-center justify-center">
                      <Spinner className="h-6 w-6 text-gray-500" />
                    </div>
                  )}

                  {!pdfLoading && pdfBlobUrl && (
                    <div className="h-[70vh] w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <embed
                        src={pdfBlobUrl}
                        width="100%"
                        height="100%"
                        className="border-none"
                      />
                    </div>
                  )}

                  {!pdfLoading && !pdfBlobUrl && (
                    <p className="text-sm text-gray-500">PDF not available.</p>
                  )}
                </div>
              </DialogPanel>
              <DialogFooter>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={!pdfBlobUrl}
                    className="h-10 bg-emerald-600 px-4 text-sm text-white hover:bg-emerald-700"
                  >
                    <HiOutlineArrowDownTray className="mr-2" size={16} />
                    Download
                  </Button>
                  <DialogClose>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-4 text-sm"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Submit Project Button - Hide after successful submission or approval */}
          {isComplete &&
            !isSubmitted &&
            status !== "PENDING" &&
            !isApproved && (
              <section className="space-y-4">
                <Button
                  type="button"
                  onClick={handleSubmitProject}
                  disabled={isSubmitting}
                  className="h-11 bg-purple-600 px-6 text-base text-white hover:bg-purple-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Project for Review"}
                </Button>
              </section>
            )}

          {/* Go to Chat Button - Show once interview is complete, except approved */}
          {isComplete && !isApproved && (
            <section className="space-y-4">
              <Button
                type="button"
                onClick={() =>
                  router.push(`/user/MyProjects/${projectId}/interview`)
                }
                className="h-11 bg-indigo-600 px-6 text-base text-white hover:bg-indigo-700"
              >
                Go to AI Chat Interview
              </Button>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              {canEdit
                ? "You can edit and save this project now."
                : "This project is locked in its current workflow state."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fetchProject()}
                className="h-11 px-5 text-base"
              >
                Refresh
              </Button>
              <Button
                type="submit"
                disabled={!canEdit || isSaving}
                className="h-11 bg-emerald-600 px-5 text-base text-white hover:bg-emerald-700 disabled:bg-gray-300"
              >
                {isSaving
                  ? "Saving..."
                  : canEdit
                    ? "Save Changes"
                    : "Read Only"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;
