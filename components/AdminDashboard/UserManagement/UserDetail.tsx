"use client";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineFolder,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { toastManager } from "@/components/ui/toast";
import UserHeader from "@/components/AdminDashboard/UserManagement/UserHeader";
import ProjectCard from "@/components/AdminDashboard/UserManagement/ProjectCard";
import ActivityItem from "@/components/AdminDashboard/UserManagement/ActivityItem";
import SupportMessageItem from "@/components/AdminDashboard/UserManagement/SupportMessageItem";
import type {
  User,
  UserProject,
  UserActivity,
  SupportMessage,
} from "@/Type/AdminDashboard/UserManagement";

//========== User Detail Page Component ==========
export default function UserDetailPage({ params }: { params: { id: string } }) {
  const userId = params.id;

  //========== Sample User Data ==========
  const user: User = {
    id: userId,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp Inc",
    projects: 3,
    status: "active",
    lastLogin: "2 hours ago",
    role: "Project Manager",
    department: "R&D",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
  };

  //========== Assigned Projects Data ==========
  const projects: UserProject[] = [
    {
      id: "1",
      name: "Website Redesign",
      status: "In Progress",
      statusColor: "blue",
      updated: "2 hours ago",
      progress: 75,
    },
    {
      id: "2",
      name: "Mobile App Development",
      status: "Needs Clarification",
      statusColor: "orange",
      updated: "1 day ago",
      progress: 45,
    },
    {
      id: "3",
      name: "Data Analytics Platform",
      status: "Submitted",
      statusColor: "green",
      updated: "3 days ago",
      progress: 100,
    },
  ];

  //========== Recent Activity Data ==========
  const activities: UserActivity[] = [
    {
      id: "1",
      action: "Uploaded evidence file",
      project: "Website Redesign",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      action: "Submitted section for review",
      project: "Website Redesign",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      action: "Responded to clarification request",
      project: "Mobile App Development",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      action: "Started new project",
      project: "Data Analytics Platform",
      timestamp: "2 days ago",
    },
    {
      id: "5",
      action: "Completed Core Activity 3",
      project: "Website Redesign",
      timestamp: "3 days ago",
    },
  ];

  //========== Support Messages Data ==========
  const supportMessages: SupportMessage[] = [
    {
      id: "1",
      subject: "Help with Budget Section",
      date: "2024-11-20",
      status: "resolved",
      statusColor: "green",
    },
    {
      id: "2",
      subject: "Clarification on R&D Criteria",
      date: "2024-11-22",
      status: "open",
      statusColor: "orange",
    },
  ];

  //========== Handle Actions ==========
  const handleEditDetails = () => {
    toastManager.add({
      type: "info",
      title: "Edit Details",
      description: "Edit user details feature coming soon",
    });
  };

  const handleResetPassword = () => {
    toastManager.add({
      type: "success",
      title: "Password Reset",
      description: `Password reset link sent to ${user.email}`,
    });
  };

  const handleSendEmail = () => {
    toastManager.add({
      type: "success",
      title: "Email Sent",
      description: `Email sent successfully to ${user.name}`,
    });
  };

  return (
    <div className="space-y-8">
      {/*========== Back Button and Title ==========*/}
      <div>
        <Link
          href="/Admin/userManagement"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
        <p className="text-gray-600">
          Detailed information and activity for {user.name}
        </p>
      </div>

      {/*========== User Header ==========*/}
      <UserHeader
        user={user}
        onEditDetails={handleEditDetails}
        onResetPassword={handleResetPassword}
        onSendEmail={handleSendEmail}
      />

      {/*========== Content Grid ==========*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*========== Assigned Projects ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineFolder size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Assigned Projects ({projects.length})
            </h3>
          </div>
          <div>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/*========== Recent Activity ==========*/}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineBolt size={24} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div>
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      {/*========== Support Messages ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <HiOutlineChatBubbleLeftRight size={24} className="text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Support Messages
          </h3>
        </div>
        <div>
          {supportMessages.map((message) => (
            <SupportMessageItem key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
