"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import ProjectTableRow from "./ProjectTableRow";
import type { Project as ProjectType } from "@/Type/AdminDashboard/ProjectManagement";
import { toastManager } from "@/components/ui/toast";
import SendEmailModal from "../UserManagement/SendEmailModal";

//========== Project Management Component ==========
const Project = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );

  const extractProjectList = (payload: unknown): ProjectType[] => {
    if (Array.isArray(payload)) {
      return payload as ProjectType[];
    }

    if (payload && typeof payload === "object") {
      const record = payload as {
        success?: boolean;
        data?: unknown;
        results?: unknown;
      };

      if (Array.isArray(record.data)) {
        return record.data as ProjectType[];
      }

      if (Array.isArray(record.results)) {
        return record.results as ProjectType[];
      }
    }

    return [];
  };

  //========== Fetch Projects ==========
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("accessToken") ||
            window.sessionStorage.getItem("accessToken")
          : null;

      const response = await fetch(
        "https://api.rdtaxbot.com.au/api/tax_project/admin/projects/",
        {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched projects:", data);
      setProjects(extractProjectList(data));
    } catch (error) {
      console.error("Failed to fetch admin projects:", error);
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to load projects. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  //========== Filter Projects ==========
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        (project.project_title ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (project.industry ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        project.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  //========== Handle Actions ==========
  const handleView = (projectId: string) => {
    router.push(`/Admin/projectManagement/${projectId}`);
  };

  const handleEmail = (project: ProjectType) => {
    setSelectedProject(project);
    setIsEmailModalOpen(true);
  };

  const handleSendEmailSubmit = async (data: {
    subject: string;
    body: string;
  }) => {
    if (!selectedProject) return;
    try {
      setIsSendingEmail(true);
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("accessToken") ||
            window.sessionStorage.getItem("accessToken")
          : null;

      const response = await fetch(
        `https://api.rdtaxbot.com.au/api/users/send-mail/${selectedProject.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            subject: data.subject,
            message: data.body,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      setIsEmailModalOpen(false);

      setTimeout(() => {
        toastManager.add({
          type: "success",
          title: "Email Sent",
          description: `Email sent successfully regarding ${selectedProject.project_title}`,
        });
      }, 100);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; detail?: string } };
      };
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Failed to send email. Please try again.";
      toastManager.add({
        type: "error",
        title: "Error",
        description: message,
      });
      throw err;
    } finally {
      setIsSendingEmail(false);
      setIsEmailModalOpen(false);
    }
  };

  const handleDownload = (project: ProjectType) => {
    if (project.status.toLowerCase() !== "completed") {
      toastManager.add({
        type: "error",
        title: "Project Not Completed",
        description: `Cannot download report for ${project.project_title}. Project is not completed.`,
      });
    } else {
      toastManager.add({
        type: "success",
        title: "Download Ready",
        description: `Report for ${project.project_title} is ready for download.`,
      });
    }
  };

  return (
    <div className="space-y-8 px-0 md:px-10 py-8 lg:px-18">
      {/*========== Back Button and Header ==========*/}
      <div>
        <Link
          href="/Admin/Dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Project Management
        </h1>
        <p className="text-gray-600">
          Review and manage all R&D projects with AI compliance analysis
        </p>
      </div>

      {/*========== Search and Filter ==========*/}
      <div className="flex flex-col sm:flex-row gap-4">
        {/*========== Search Input ==========*/}
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search projects by name, user, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/*========== Status Filter ==========*/}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/*========== Projects Table ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Project Title
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Industry
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Project Year
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <ProjectTableRow
                  key={project.id}
                  project={project}
                  onView={handleView}
                  onEmail={handleEmail}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/*========== Empty / Loading State ==========*/}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found</p>
          </div>
        ) : null}
      </div>

      {/*========== Send Email Modal ==========*/}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        recipientName={selectedProject?.project_title || "Project"}
        recipientEmail={String(selectedProject?.id ?? "")}
        onSend={handleSendEmailSubmit}
        isSending={isSendingEmail}
      />
    </div>
  );
};

export default Project;
