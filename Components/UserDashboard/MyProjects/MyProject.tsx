"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MdArrowBack, MdSearch, MdFilterList } from "react-icons/md";
import {
  Project,
  FilterState,
  ProjectStatus,
} from "@/Type/UserDashboard/MyProject";
import ProjectListCard from "@/components/Shared/Cards/ProjectListCard";

//========== Dummy Data ===========
const dummyProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Analytics Platform Development",
    fiscalYear: "FY 2025",
    progress: 65,
    status: "draft",
    lastUpdated: "Q3 2025",
    canEdit: true,
    canRenew: false,
  },
  {
    id: "2",
    title: "Advanced Manufacturing Process Innovation",
    fiscalYear: "FY 2024",
    progress: 100,
    status: "completed",
    lastUpdated: "Q4 2024",
    canEdit: false,
    canRenew: true,
  },
  {
    id: "3",
    title: "Sustainable Energy Storage Solution",
    fiscalYear: "FY 2025",
    progress: 95,
    status: "pending-review",
    lastUpdated: "Q3 2025",
    canEdit: false,
    canRenew: false,
  },
  {
    id: "4",
    title: "Machine Learning Model Optimization Framework",
    fiscalYear: "FY 2025",
    progress: 45,
    status: "draft",
    lastUpdated: "Q2 2025",
    canEdit: true,
    canRenew: false,
  },
  {
    id: "5",
    title: "Quantum Computing Algorithm Research",
    fiscalYear: "FY 2024",
    progress: 100,
    status: "completed",
    lastUpdated: "Q2 2024",
    canEdit: false,
    canRenew: true,
  },
  {
    id: "6",
    title: "Blockchain-Based Supply Chain Management",
    fiscalYear: "FY 2025",
    progress: 80,
    status: "pending-review",
    lastUpdated: "Q3 2025",
    canEdit: false,
    canRenew: false,
  },
];

//========== My Projects Component ===========
const MyProject: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
  });

  //========== Filter and Search Logic ===========
  const filteredProjects = useMemo(() => {
    return dummyProjects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || project.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [filters]);

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
              <option
                value="pending-review"
                className=" px-2 py-2 rounded-b-2xl"
              >
                Pending Review
              </option>
            </select>
          </div>
        </div>
      </div>

      {/*========= Projects Grid =========*/}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-start">
          {filteredProjects.map((project) => (
            <ProjectListCard key={project.id} project={project} />
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
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProject;
