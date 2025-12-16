
"use client";

import React from "react";
import { MdPlayCircle, MdCheckCircle, MdInfo, MdArrowForward } from "react-icons/md";
import StatCard from "@/Components/Shared/Cards/StatCard";
import ProjectCard from "@/Components/Shared/Cards/ProjectCard";
import Link from "next/link";

//========== Dashboard Component ===========
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/*========= Welcome Section =========*/}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Manage your R&D tax incentive claims and track your progress</p>
      </div>

      {/*========= Stats Cards =========*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Projects"
          value="0"
          icon={<MdPlayCircle size={28} className="text-orange-600" />}
          bgColor="bg-orange-50"
          iconBgColor="bg-orange-100"
          textColor="text-orange-600"
        />
        <StatCard
          title="Completed Claims"
          value="0"
          icon={<MdCheckCircle size={28} className="text-green-600" />}
          bgColor="bg-green-50"
          iconBgColor="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Pending Review"
          value="0"
          icon={<MdInfo size={28} className="text-blue-600" />}
          bgColor="bg-blue-50"
          iconBgColor="bg-blue-100"
          textColor="text-blue-600"
        />
      </div>

      {/*========= Current Year R&D Project =========*/}
      <ProjectCard
        title="Current Year R&D Project (2025)"
        description=""
        isEmpty={true}
        emptyMessage="No R&D project has been created for 2025. Start a new project to begin your R&D tax incentive submission."
        actionButton={
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2\">\n            <span>Create New Project</span>\n          </button>
        }
      />\n\n      {/*========= Previous R&D Project =========*/}
      <ProjectCard
        title="Previous R&D Project"
        description="\"
        isEmpty={true}
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
      />
    </div>
  );
};

export default Dashboard;