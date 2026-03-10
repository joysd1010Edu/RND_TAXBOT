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

//========== Dashboard Component ===========
const Dashboard = () => {
  const { setPageTitle } = usePageTitle();
  const router = useRouter();

  const axios = useAxios();
  const [dashboardData, setDashboardData] = useState({
    active_projects: 0,
    completed_projects: 0,
    pending_projects: 0,
  });
  const [projects, setProjects] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get("calculations/user_dashboard/");
      const project_response = await axios.get("/tax_project/userlist/");
      if (response.data.success && response.data.data) {
        setDashboardData(response.data.data);
      }
      if (project_response.data && project_response.data.data) {
        setProjects(project_response.data.data);
      }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Projects"
          value={dashboardData.active_projects.toString()}
          icon={<MdAccessTime size={28} className="text-orange-600" />}
          bgColor="bg-orange-50"
          iconBgColor="bg-orange-100"
          textColor="text-orange-600"
        />
        <StatCard
          title="Completed Claims"
          value={dashboardData.completed_projects.toString()}
          icon={<FiCheckCircle size={28} className="text-green-600" />}
          bgColor="bg-green-50"
          iconBgColor="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Pending Review"
          value={dashboardData.pending_projects.toString()}
          icon={<LuCircleAlert size={28} className="text-blue-600" />}
          bgColor="bg-blue-50"
          iconBgColor="bg-blue-100"
          textColor="text-blue-600"
        />
      </div>
      {/*========= Current Year R&D Project =========*/}
      <ProjectCard
        title="Current Year R&D Project (2025)"
        description=""
        isEmpty={projects.length === 0}
        emptyMessage="No R&D project has been created for 2025. Start a new project to begin your R&D tax incentive submission."
        actionButton={
          <button
            onClick={() => router.push("/user/CreateProject")}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 duration-500 cursor-pointer text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <span>Create New Project</span>
          </button>
        }
      >
        <CurrentProjectView />
      </ProjectCard>

      {/*========= Previous R&D Project =========*/}
      <ProjectCard
        title="Previous R&D Projects"
        description=""
        isEmpty={projects.length === 0}
        emptyMessage="You don't have any previous R&D project. Your older submissions will appear here once available."
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
        {projects.length > 0 && <PreviousProjectView projects={projects} />}
      </ProjectCard>
    </div>
  );
};

export default Dashboard;
