"use client";
import { useEffect, useState } from "react";
import { MdArrowForward, MdAccessTime } from "react-icons/md";
import StatCard from "@/components/Shared/Cards/StatCard";
import ProjectCard from "@/components/Shared/Cards/ProjectCard";
import Link from "next/link";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { FiCheckCircle } from "react-icons/fi";
import { LuCircleAlert } from "react-icons/lu";
import { useRouter } from "next/navigation";
import CurrentProjectView from "./CurrentProjectView";
import PreviousProjectView from "./PreviousProjectView";
import { useAxios } from "@/Hooks/useAxiosInstance";

interface DashboardProjectStats {
  total: number;
  draft: number;
  pending: number;
  approved: number;
  rejected: number;
  interview_complete: number;
}

interface DashboardStatsResponse {
  projects: DashboardProjectStats;
  support_tickets?: {
    open: number;
    ongoing: number;
    resolved: number;
  };
}

interface ApiProject {
  id: number;
  title: string;
  project_year: number | string;
  project_type?: string;
  industry?: string;
  status: string;
  input_method?: string;
  interview_complete?: boolean;
  resubmit_count?: number;
  is_editable?: boolean;
  report_visible_to_user?: boolean;
  submitted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

const getProjectTimestamp = (project: ApiProject) =>
  new Date(project.updated_at ?? project.created_at ?? 0).getTime();

const sortProjectsByUpdatedAtDesc = (projects: ApiProject[]) =>
  [...projects].sort(
    (firstProject, secondProject) =>
      getProjectTimestamp(secondProject) - getProjectTimestamp(firstProject),
  );

const normalizeProjects = (data: unknown): ApiProject[] => {
  const rawProjects = Array.isArray(data)
    ? data
    : ((data as { data?: unknown[] })?.data ?? []);

  return rawProjects
    .filter((project): project is Record<string, unknown> => Boolean(project))
    .map((project) => {
      const projectYear =
        (project.project_year as string | number | undefined) ??
        (project.financial_year as string | number | undefined) ??
        new Date().getFullYear();

      return {
        id: Number(project.id),
        title: String(
          project.title ?? project.project_title ?? "Untitled Project",
        ),
        project_year: projectYear,
        project_type: project.project_type as string | undefined,
        industry: project.industry as string | undefined,
        status: String(project.status ?? "DRAFT"),
        input_method: project.input_method as string | undefined,
        interview_complete: Boolean(project.interview_complete),
        resubmit_count: project.resubmit_count as number | undefined,
        is_editable: project.is_editable as boolean | undefined,
        report_visible_to_user: project.report_visible_to_user as
          | boolean
          | undefined,
        submitted_at:
          (project.submitted_at as string | null | undefined) ?? null,
        created_at: project.created_at as string | undefined,
        updated_at: project.updated_at as string | undefined,
      };
    });
};

//========== Dashboard Component ===========
const Dashboard = () => {
  const { setPageTitle } = usePageTitle();
  const router = useRouter();

  const axios = useAxios();
  const [dashboardData, setDashboardData] = useState<DashboardStatsResponse>({
    projects: {
      total: 0,
      draft: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      interview_complete: 0,
    },
  });
  const [projects, setProjects] = useState<ApiProject[]>([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get("/calculations/user_dashboard/");
      const project_response = await axios.get("/tax_project/projects/");
      if (response.data?.success && response.data?.data) {
        setDashboardData(response.data.data);
      }
      setProjects(normalizeProjects(project_response.data));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);

  const sortedProjects = sortProjectsByUpdatedAtDesc(projects);
  const currentProject =
    sortedProjects.find(
      (project) => project.status.toUpperCase() === "DRAFT",
    ) ??
    sortedProjects[0] ??
    null;
  const previousProject =
    sortedProjects.find(
      (project) =>
        project.id !== currentProject?.id &&
        project.status.toUpperCase() !== "DRAFT",
    ) ?? null;

  return (
    <div className="space-y-6 lg:px-10">
      {/*========= Welcome Section =========*/}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">
          Manage your R&D tax incentive claims and track your progress
        </p>
      </div>
      {/*========= Stats Cards =========*/}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={dashboardData.projects.total.toString()}
          icon={<MdAccessTime size={28} className="text-orange-600" />}
          bgColor="bg-orange-50"
          iconBgColor="bg-orange-100"
          textColor="text-orange-600"
        />
        <StatCard
          title="Draft Projects"
          value={dashboardData.projects.draft.toString()}
          icon={<LuCircleAlert size={28} className="text-green-600" />}
          bgColor="bg-green-50"
          iconBgColor="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Approved Projects"
          value={dashboardData.projects.approved.toString()}
          icon={<FiCheckCircle size={28} className="text-blue-600" />}
          bgColor="bg-blue-50"
          iconBgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatCard
          title="Interview Complete"
          value={dashboardData.projects.interview_complete.toString()}
          icon={<LuCircleAlert size={28} className="text-purple-600" />}
          bgColor="bg-purple-50"
          iconBgColor="bg-purple-100"
          textColor="text-purple-600"
        />
      </div>
      {/*========= Current Year R&D Project =========*/}
      <ProjectCard
        title={`Current Year R&D Project (${currentProject?.project_year ?? new Date().getFullYear()})`}
        description=""
        isEmpty={!currentProject}
        emptyMessage={`No R&D project has been created for ${new Date().getFullYear()}. Start a new project to begin your R&D tax incentive submission.`}
        actionButton={
          <button
            onClick={() => router.push("/user/MyProjects")}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 duration-500 cursor-pointer text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <span>Create New Project</span>
          </button>
        }
      >
        <CurrentProjectView project={currentProject} />
      </ProjectCard>

      {/*========= Previous R&D Project =========*/}
      <ProjectCard
        title="Previous R&D Projects"
        description=""
        isEmpty={!previousProject}
        emptyMessage="You don't have any previous R&D projects yet. Older submissions will appear here once available."
        headerAction={
          <Link
            href="/user/MyProjects"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
          >
            View All
            <MdArrowForward size={16} />
          </Link>
        }
      >
        {previousProject && <PreviousProjectView project={previousProject} />}
      </ProjectCard>
    </div>
  );
};

export default Dashboard;
