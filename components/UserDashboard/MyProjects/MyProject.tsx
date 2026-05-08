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
import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const projectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  project_year: z.string().min(1, { message: "Project year is required" }),
  project_type: z.enum(["NEW", "CONTINUING"], {
    message: "Select a project type",
  }),
  industry: z.string().optional(),
  budget: z.string().optional(),
  start_date: z.string().optional(),
  finish_date: z.string().optional(),
  input_method: z.enum(["FILE", "MANUAL"], {
    message: "Select an input method",
  }),
});

type ProjectFormDataSchema = z.infer<typeof projectSchema>;

//========== Status Derivation ===========
const deriveProgress = (status: string): number => {
  const s = status.toUpperCase();
  if (s === "APPROVED") return 100;
  if (s === "PENDING") return 80;
  if (s === "REJECTED") return 50;
  return 0;
};

const mapApiStatus = (status: string): ProjectStatus => {
  const s = status.toUpperCase();
  if (s === "APPROVED") return "APPROVED";
  if (s === "PENDING") return "PENDING";
  if (s === "REJECTED") return "REJECTED";
  return "DRAFT";
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
      if (parsed.status?.toLowerCase() !== "draft") continue;
      drafts.push({
        id: parsed.id || key.replace("project_", ""),
        title: parsed.projectTitle || "Untitled Draft",
        fiscalYear: parsed.financialYear ? `FY ${parsed.financialYear}` : "N/A",
        progress: 0,
        status: "DRAFT",
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
  const router = useRouter();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
  });
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormDataSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project_type: "NEW",
      input_method: "MANUAL",
    },
  });

  const onProjectSubmit = async (data: ProjectFormDataSchema) => {
    try {
      setIsSubmitting(true);
      const payload = { ...data, name: data.title };
      console.log("Submitting project with payload:", payload);
      const res = await axios.post("/tax_project/projects/", payload);

      const newProjectId = res.data?.id;
      if (newProjectId) {
        toastManager.add({
          title: "Success",
          description: "Project created successfully",
          type: "success",
        });
        setIsModalOpen(false);
        reset();
        router.push(`/user/MyProjects/${newProjectId}`);
      } else {
        throw new Error("No ID returned from API");
      }
    } catch (error) {
      console.error("Project creation failed", error);
      toastManager.add({
        title: "Error",
        description: "Failed to create project",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  //========== Load Data ===========
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/tax_project/projects/");
      // Some APIs wrap it in data.data or similar, or just a direct array. Handling both:
      const apiData: any[] = Array.isArray(response.data)
        ? response.data
        : (response.data?.data ?? []);
      const apiProjects: Project[] = apiData.map((p) => ({
        id: String(p.id),
        title: p.title || p.project_title || "Untitled Project",
        fiscalYear:
          p.project_year || p.financial_year
            ? `FY ${p.project_year || p.financial_year}`
            : "N/A",
        progress: deriveProgress(p.status || ""),
        status: mapApiStatus(p.status || ""),
        lastUpdated: p.updated_at
          ? new Date(p.updated_at).toLocaleDateString()
          : "N/A",
        canEdit: p.status === "DRAFT" || p.status === "REJECTED",
        canRenew: p.status === "APPROVED",
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
  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    // Attempt local storage delete first if it might be an unsaved draft
    const localKey = `project_${deleteTarget.id}`;
    if (localStorage.getItem(localKey)) {
      localStorage.removeItem(localKey);
    }

    try {
      // Only hit the API if it's not a purely local ID (usually UUID or numbers)
      await axios.delete(`/tax_project/projects/${deleteTarget.id}/`);
      setAllProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toastManager.add({
        title: "Project Deleted",
        description: "The project has been deleted successfully.",
        type: "success",
      });
    } catch {
      // If API fails it might just be because it was a purely local draft that had no backend record yet
      if (localStorage.getItem(localKey) === null) {
        setAllProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        toastManager.add({
          title: "Draft Deleted",
          description: "The local draft has been removed.",
          type: "success",
        });
      } else {
        toastManager.add({
          title: "Delete Failed",
          description: "Failed to delete the project. Please try again.",
          type: "error",
        });
      }
    }
    setDeleteTarget(null);
  }, [deleteTarget, axios]);

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
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/*========= Search Input =========*/}
          <div className="relative flex-1 w-full">
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
          <div className="relative w-full sm:w-48 shrink-0">
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
              <option value="DRAFT">In Progress (Draft)</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Under Review (Pending)</option>
              <option value="REJECTED">Action Needed (Rejected)</option>
            </select>
          </div>

          {/*========= Create Project Modal =========*/}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger
              render={
                <Button className="bg-indigo-600  hover:bg-indigo-700 text-white w-full sm:w-auto shrink-0 h-11.5" />
              }
            >
              <FaPlus size={16} />
              <span className="ml-2  text-lg">Create Project</span>
            </DialogTrigger>
            <DialogPopup className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onProjectSubmit)}>
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-lg">
                      Project Title *
                    </Label>
                    <Input
                      id="title"
                      {...register("title")}
                      className={`text-lg h-12 ${errors.title ? "border-red-500" : ""}`}
                      placeholder="e.g. AI Workflow Optimization"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="project_year" className="text-lg">
                        Financial Year *
                      </Label>
                      <Input
                        id="project_year"
                        {...register("project_year")}
                        className={`text-lg h-12 ${errors.project_year ? "border-red-500" : ""}`}
                        placeholder="e.g. FY 2024-25"
                      />
                      {errors.project_year && (
                        <p className="text-red-500 text-sm">
                          {errors.project_year.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project_type" className="text-lg">
                        Project Type *
                      </Label>
                      <select
                        id="project_type"
                        {...register("project_type")}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg"
                      >
                        <option value="NEW">New Project</option>
                        <option value="CONTINUING">Continuing Project</option>
                      </select>
                      {errors.project_type && (
                        <p className="text-red-500 text-sm">
                          {errors.project_type.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="start_date" className="text-lg">
                        Start Date
                      </Label>
                      <Input
                        id="start_date"
                        type="date"
                        {...register("start_date")}
                        className="text-lg h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finish_date" className="text-lg">
                        Finish Date
                      </Label>
                      <Input
                        id="finish_date"
                        type="date"
                        {...register("finish_date")}
                        className="text-lg h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-lg">
                        Industry
                      </Label>
                      <Input
                        id="industry"
                        {...register("industry")}
                        className="text-lg h-12"
                        placeholder="e.g. Software Development"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-lg">
                        Budget
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        {...register("budget")}
                        className="text-lg h-12"
                        placeholder="e.g. 50000"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label className="text-lg">Input Method *</Label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="MANUAL"
                          {...register("input_method")}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <span className="text-lg font-medium">
                          Manual Entry
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="FILE"
                          {...register("input_method")}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <span className="text-lg font-medium">File Upload</span>
                      </label>
                    </div>
                    {errors.input_method && (
                      <p className="text-red-500 text-sm">
                        {errors.input_method.message}
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter className="px-6 pb-6 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="text-lg h-12 px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg h-12 px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogPopup>
          </Dialog>
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
              onDelete={() => setDeleteTarget(project)}
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

      {/*========= Delete Confirmation Dialog =========*/}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose>
              <Button variant="outline">Cancel</Button>
            </AlertDialogClose>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
};

export default MyProject;
