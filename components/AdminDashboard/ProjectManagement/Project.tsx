"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import ProjectTableRow from "./ProjectTableRow";
import type { Project } from "@/Type/AdminDashboard/ProjectManagement";
import { toastManager } from "@/components/ui/toast";

//========== Project Management Component ==========
const Project = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  //========== Sample Projects Data ==========
  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign Project",
      userName: "John Smith",
      userEmail: "john.smith@techcorp.com",
      industry: "Technology",
      progress: 75,
      compliance: 88,
      status: "in progress",
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Mobile App Development",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@innovate.com",
      industry: "Healthcare",
      progress: 45,
      compliance: 62,
      status: "needs clarification",
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "Data Analytics Platform",
      userName: "Michael Chen",
      userEmail: "mchen@startupx.io",
      industry: "Finance",
      progress: 100,
      compliance: 95,
      status: "submitted",
      lastUpdated: "3 days ago",
    },
    {
      id: "4",
      name: "Cloud Migration",
      userName: "Emily Davis",
      userEmail: "emily.d@designstudio.com",
      industry: "Manufacturing",
      progress: 90,
      compliance: 78,
      status: "in progress",
      lastUpdated: "5 hours ago",
    },
    {
      id: "5",
      name: "AI Integration System",
      userName: "Robert Wilson",
      userEmail: "rwilson@datatech.com",
      industry: "Retail",
      progress: 100,
      compliance: 92,
      status: "completed",
      lastUpdated: "1 week ago",
    },
  ];

  //========== Filter Projects ==========
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  //========== Handle Actions ==========
  const handleView = (projectId: string) => {
    router.push(`/Admin/projectManagement/${projectId}`);
  };

  const handleEmail = (project: Project) => {
    toastManager.add({
      type: "success",
      title: "Email Sent",
      description: `Email sent to ${project.userName} about ${project.name}`,
    });
  };

  const handleDownload = (project: Project) => {
    toastManager.add({
      type: "info",
      title: "Downloading",
      description: `Downloading report for ${project.name}...`,
    });
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
          <option value="in progress">In Progress</option>
          <option value="needs clarification">Needs Clarification</option>
          <option value="submitted">Submitted</option>
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
                  Project Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Industry
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Progress
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Compliance
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Last Updated
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
                  onDownload={handleDownload}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/*========== Empty State ==========*/}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
