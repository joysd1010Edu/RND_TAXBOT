"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { MdArrowBack, MdSearch, MdFilterList } from "react-icons/md";
import {
  Project,
  FilterState,
  ProjectStatus,
} from "@/Type/UserDashboard/MyProject";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import ProjectListCard from "@/components/Shared/Cards/ProjectListCard";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { toastManager } from "@/components/ui/toast";

//========== Status Derivation ===========
const deriveProgress = (status: string): number => {
  if (status === "completed" || status === "approved") return 100;
  if (status === "under_review" || status === "submitted") return 100;
  return 0;
};

const mapApiStatus = (status: string): ProjectStatus => {
  if (status === "completed" || status === "approved") return "completed";
  if (status === "under_review") return "under_review";
  if (status === "submitted") return "pending-review";
  if (status === "draft") return "draft";
  return "pending-review";
};

//========== Load localStorage Drafts ===========
const loadLocalDrafts = (): Project[] => {
  const drafts: Project[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("project_")) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed: ProjectFormData = JSON.parse(raw);
      if (parsed.status !== "draft") continue;
      drafts.push({
        id: parsed.id || key.replace("project_", ""),
        title: parsed.projectTitle || "Untitled Draft",
        fiscalYear: parsed.financialYear ? `FY ${parsed.financialYear}` : "N/A",
        progress: 0,
        status: "draft",
        lastUpdated: parsed.updatedAt
          ? new Date(parsed.updatedAt).toLocaleDateString()
          : "N/A",
        canEdit: true,
        canRenew: false,
      });
    } catch {
      // skip malformed entries
    }
  }
  return drafts;
};

//========== My Projects Component ===========
const MyProject: React.FC = () => {
  const axios = useAxios();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
  });

  //========== Load Data ===========
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("tax_project/userlist/");
      const apiData: Record<string, string>[] = response.data?.data ?? [];
      const apiProjects: Project[] = apiData.map((p) => ({
        id: String(p.id),
        title: p.project_title,
        fiscalYear: p.financial_year ? `FY ${p.financial_year}` : "N/A",
        progress: deriveProgress(p.status),
        status: mapApiStatus(p.status),
        lastUpdated: p.updated_at
          ? new Date(p.updated_at).toLocaleDateString()
          : "N/A",
        canEdit: false,
        canRenew: p.status === "completed" || p.status === "approved",
      }));

      const localDrafts = loadLocalDrafts();
      // Exclude any local draft whose id already appears in the API list
      const apiIds = new Set(apiProjects.map((p) => p.id));
      const filteredDrafts = localDrafts.filter((d) => !apiIds.has(d.id));

      setAllProjects([...filteredDrafts, ...apiProjects]);
    } catch {
      // If API fails, still show local drafts
      setAllProjects(loadLocalDrafts());
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  //========== Delete Project ===========
  const handleDelete = useCallback(
    async (project: Project) => {
      if (project.canEdit) {
        // Local draft — remove from localStorage only
        localStorage.removeItem(`project_${project.id}`);
        setAllProjects((prev) => prev.filter((p) => p.id !== project.id));
      } else {
        try {
          await axios.delete(`tax_project/userlist/${project.id}/`);
          setAllProjects((prev) => prev.filter((p) => p.id !== project.id));
          toastManager.add({
            title: "Project Deleted",
            description: "The project has been deleted successfully.",
            type: "success",
          });
        } catch {
          toastManager.add({
            title: "Delete Failed",
            description: "Failed to delete the project. Please try again.",
            type: "error",
          });
        }
      }
    },
    [axios],
  );

  //========== Filter and Search Logic ===========
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = (project?.title ?? "")
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || project.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [allProjects, filters]);

  //========== Handle Search Input ===========
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  //========== Handle Status Filter ===========
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      status: e.target.value as ProjectStatus | "all",
    }));
  };

  return (
    <div className="space-y-6 lg:px-12">
      {/*========= Back to Dashboard Link =========*/}
      <Link
        href="/user/UserDashboard"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <MdArrowBack size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </Link>

      {/*========= Page Header =========*/}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          All R&D Projects
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          View and manage all current and previous R&D projects
        </p>
      </div>

      {/*========= Search and Filter Section =========*/}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/*========= Search Input =========*/}
          <div className="flex-1 relative">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/*========= Status Filter =========*/}
          <div className="relative sm:w-64">
            <MdFilterList
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
            <select
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="pending-review">Pending Review</option>
              <option value="under_review">Sent for Review</option>
            </select>
          </div>
        </div>
      </div>

      {/*========= Projects Grid =========*/}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-start">
          {filteredProjects.map((project) => (
            <ProjectListCard
              key={project.id}
              project={project}
              onDelete={() => handleDelete(project)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdSearch size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProject;
