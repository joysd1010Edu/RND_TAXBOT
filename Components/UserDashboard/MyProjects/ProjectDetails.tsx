"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdCalendarToday,
  MdPerson,
  MdAttachMoney,
  MdFolder,
  MdDownload,
  MdCheckCircle,
  MdAccessTime,
  MdPending,
  MdEdit,
} from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { ProjectDetailsData } from "@/Type/UserDashboard/MyProject";
import { usePageTitle } from "@/Components/Providers/PageTitleProvider";

//========== Dummy Project Details Data ===========
const dummyProjectDetails: Record<string, ProjectDetailsData> = {
  "1": {
    id: "1",
    title: "AI-Powered Analytics Platform Development",
    fiscalYear: "FY 2025",
    progress: 65,
    status: "draft",
    lastUpdated: "Q3 2025",
    canEdit: true,
    canRenew: false,
    description:
      "Development of an advanced AI-powered analytics platform designed to process and analyze large-scale datasets in real-time. The platform utilizes machine learning algorithms to provide predictive insights and automated reporting capabilities.",
    createdDate: "January 15, 2025",
    submittedDate: "March 20, 2025",
    projectManager: "Sarah Johnson",
    department: "Research & Development",
    budget: 500000,
    spentAmount: 325000,
    teamMembers: [
      "Sarah Johnson",
      "Michael Chen",
      "Emily Davis",
      "Robert Smith",
    ],
    objectives: [
      "Develop scalable machine learning infrastructure",
      "Implement real-time data processing capabilities",
      "Create intuitive visualization dashboards",
      "Integrate with existing enterprise systems",
    ],
    milestones: [
      {
        id: "m1",
        title: "Requirements gathering and analysis",
        status: "completed",
        dueDate: "February 28, 2025",
      },
      {
        id: "m2",
        title: "Platform architecture design",
        status: "completed",
        dueDate: "March 31, 2025",
      },
      {
        id: "m3",
        title: "Core ML model development",
        status: "in-progress",
        dueDate: "June 30, 2025",
      },
      {
        id: "m4",
        title: "Dashboard and UI implementation",
        status: "pending",
        dueDate: "August 31, 2025",
      },
    ],
    documents: [
      {
        id: "d1",
        name: "Project Proposal.pdf",
        uploadedDate: "January 15, 2025",
        size: "2.4 MB",
      },
      {
        id: "d2",
        name: "Technical Specification.docx",
        uploadedDate: "February 10, 2025",
        size: "1.8 MB",
      },
      {
        id: "d3",
        name: "Budget Breakdown.xlsx",
        uploadedDate: "January 20, 2025",
        size: "856 KB",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Advanced Manufacturing Process Innovation",
    fiscalYear: "FY 2024",
    progress: 100,
    status: "completed",
    lastUpdated: "Q4 2024",
    canEdit: false,
    canRenew: true,
    description:
      "Research and implementation of innovative manufacturing processes using advanced robotics and automation technologies to improve production efficiency and reduce waste.",
    createdDate: "February 1, 2024",
    submittedDate: "March 15, 2024",
    completedDate: "December 20, 2024",
    projectManager: "James Wilson",
    department: "Manufacturing",
    budget: 750000,
    spentAmount: 720000,
    teamMembers: [
      "James Wilson",
      "Lisa Anderson",
      "David Brown",
      "Maria Garcia",
    ],
    objectives: [
      "Implement robotic automation systems",
      "Reduce manufacturing waste by 30%",
      "Improve production efficiency",
      "Train staff on new technologies",
    ],
    milestones: [
      {
        id: "m1",
        title: "Process analysis and optimization",
        status: "completed",
        dueDate: "April 30, 2024",
      },
      {
        id: "m2",
        title: "Robotics system installation",
        status: "completed",
        dueDate: "August 31, 2024",
      },
      {
        id: "m3",
        title: "Staff training program",
        status: "completed",
        dueDate: "October 31, 2024",
      },
      {
        id: "m4",
        title: "Full system deployment",
        status: "completed",
        dueDate: "December 15, 2024",
      },
    ],
    documents: [
      {
        id: "d1",
        name: "Final Report.pdf",
        uploadedDate: "December 20, 2024",
        size: "5.2 MB",
      },
      {
        id: "d2",
        name: "ROI Analysis.xlsx",
        uploadedDate: "December 18, 2024",
        size: "1.2 MB",
      },
    ],
  },
};

//========== Project Details Component ===========
const ProjectDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const projectId = params.id as string;

  const project = dummyProjectDetails[projectId];

  useEffect(() => {
    if (project) {
      setPageTitle("Project Details");
    }
  }, [project, setPageTitle]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/user/MyProjects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            <MdArrowBack size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  //========== Status Badge Styling ===========
  const getStatusStyles = () => {
    switch (project.status) {
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending-review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = () => {
    switch (project.status) {
      case "draft":
        return "Draft";
      case "completed":
        return "Completed";
      case "pending-review":
        return "Pending Review";
      default:
        return "Unknown";
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <MdCheckCircle className="text-green-500" size={24} />;
      case "in-progress":
        return <MdAccessTime className="text-blue-500" size={24} />;
      case "pending":
        return <MdPending className="text-gray-400" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 lg:px-12">
      {/*========= Back Button =========*/}
      <Link
        href="/user/MyProjects"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <MdArrowBack size={20} />
        <span className="font-medium">Back to Projects</span>
      </Link>

      {/*========= Project Header =========*/}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaFileAlt className="text-blue-500 text-2xl" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}
                >
                  {getStatusLabel()}
                </span>
              </div>
            </div>
          </div>
          {project.canEdit && (
            <button
              onClick={() => router.push(`/user/MyProjects/${project.id}/edit`)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              <MdEdit size={20} />
              Edit Project
            </button>
          )}
        </div>

        {/*========= Progress Bar =========*/}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-blue-600">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/*========= Description =========*/}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/*========= Project Details Grid =========*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*========= Key Information =========*/}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MdCalendarToday className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">Fiscal Year</p>
                <p className="text-sm font-medium text-gray-900">
                  {project.fiscalYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdPerson className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">Project Manager</p>
                <p className="text-sm font-medium text-gray-900">
                  {project.projectManager}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdFolder className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="text-sm font-medium text-gray-900">
                  {project.department}
                </p>
              </div>
            </div>
            {project.createdDate && (
              <div className="flex items-center gap-3">
                <MdCalendarToday className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Created Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.createdDate}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*========= Budget Information =========*/}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-500">Total Budget</p>
                <p className="text-sm font-semibold text-gray-900">
                  ${project.budget.toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-500">Spent Amount</p>
                <p className="text-sm font-semibold text-blue-600">
                  ${project.spentAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(project.spentAmount / project.budget) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Remaining</p>
                <p className="text-sm font-semibold text-green-600">
                  ${(project.budget - project.spentAmount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*========= Team Members =========*/}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Members
          </h3>
          <div className="space-y-3">
            {project.teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {member
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">{member}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*========= Objectives =========*/}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Objectives
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <MdCheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <span className="text-sm text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*========= Milestones =========*/}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Milestones
        </h3>
        <div className="space-y-4">
          {project.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              {getMilestoneIcon(milestone.status)}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {milestone.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Due: {milestone.dueDate}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  milestone.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : milestone.status === "in-progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {milestone.status === "in-progress"
                  ? "In Progress"
                  : milestone.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/*========= Documents =========*/}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Documents
        </h3>
        <div className="space-y-3">
          {project.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <FaFileAlt className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded: {doc.uploadedDate} • {doc.size}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <MdDownload className="text-gray-600" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
