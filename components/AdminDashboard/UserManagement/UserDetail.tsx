"use client";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineFolder,
  HiOutlineBolt,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { toastManager } from "@/components/ui/toast";
import UserHeader from "@/components/AdminDashboard/UserManagement/UserHeader";
import ProjectCard from "@/components/AdminDashboard/UserManagement/ProjectCard";
import ActivityItem from "@/components/AdminDashboard/UserManagement/ActivityItem";
import SendEmailModal from "@/components/AdminDashboard/UserManagement/SendEmailModal";
import type {
  User,
  UserProject,
  UserActivity,
} from "@/Type/AdminDashboard/UserManagement";
import { use, useEffect, useState } from "react";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { set } from "react-hook-form";

//========== User Detail Page Component ==========
export default function UserDetailPage({ userId }: { userId: string }) {
  const parsedId = parseInt(userId);
  const axios = useAxios();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`users/user/${parsedId}`);
        console.log("Fetched user data:", response.data);
        setUser(response.data.data);
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Failed to load user details. Please try again.";
        setError(message);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  //========== Loading State ==========
  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/Admin/userManagement"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <HiOutlineArrowLeft size={16} />
            Back to Users
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 text-sm">Loading user details...</p>
        </div>
      </div>
    );
  }

  //========== Error State ==========
  if (error || !user) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/Admin/userManagement"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <HiOutlineArrowLeft size={16} />
            Back to Users
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <HiOutlineExclamationTriangle size={32} className="text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to Load User
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
            {error || "User not found."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  //========== Assigned Projects Data ==========
  const projects: UserProject[] = [
    {
      id: "1",
      name: "eigula integragte kora baki",
      status: "In Progress",
      statusColor: "blue",
      updated: "2 hours ago",
      progress: 75,
    },
    {
      id: "2",
      name: "Monu khushi hoio na kintu kaj korte hobe",
      status: "Needs Clarification",
      statusColor: "orange",
      updated: "1 day ago",
      progress: 45,
    },
    {
      id: "3",
      name: "Data data dak pari , data moder kar bari",
      status: "Submitted",
      statusColor: "green",
      updated: "3 days ago",
      progress: 100,
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
      description: `Password reset link sent to ${user?.email}`,
    });
  };

  const handleSendEmail = () => {
    setIsEmailModalOpen(true);
  };

  const handleSendEmailSubmit = async (data: {
    subject: string;
    body: string;
  }) => {
    try {
      setIsSendingEmail(true);
      await axios.post(`users/send-mail/${parsedId}/`, {
        subject: data.subject,
        message: data.body,
      });

     
      setIsEmailModalOpen(false);

     
      setTimeout(() => {
        toastManager.add({
          type: "success",
          title: "Email Sent",
          description: `Email sent successfully to ${user?.full_name}`,
        });
      }, 100);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Failed to send email. Please try again.";
      toastManager.add({
        type: "error",
        title: "Error",
        description: message,
      });
      throw err; // Re-throw so modal knows it failed
    } finally {
      setIsSendingEmail(false);
      setIsEmailModalOpen(false);
    }
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
          Detailed information and activity for {user?.full_name}
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
      <div className="grid grid-cols-1  gap-6">
        {/*========== Assigned Projects ==========*/}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
        </div> */}

        {/*========== Recent Activity ==========*/}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
        </div> */}
      </div>

      {/*========== Support Messages ==========*/}
      {/* TODO: implement Support message */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
      </div> */}

      {/*========== Send Email Modal ==========*/}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        recipientName={user?.full_name || "User"}
        recipientEmail={user?.email || ""}
        onSend={handleSendEmailSubmit}
        isSending={isSendingEmail}
      />
    </div>
  );
}
