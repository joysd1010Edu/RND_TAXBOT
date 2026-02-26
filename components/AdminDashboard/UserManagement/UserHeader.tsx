"use client";
import React from "react";
import type { UserHeaderProps } from "@/Type/AdminDashboard/UserManagement";
import { HiOutlineEnvelope, HiOutlineBriefcase } from "react-icons/hi2";

//========== User Header Component ==========
const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  onEditDetails,
  onResetPassword,
  onSendEmail,
}) => {
  //========== Derive status from API flags ==========
  const status = user.is_suspended
    ? "suspended"
    : user.is_active
      ? "active"
      : "pending";

  //========== Get Status Badge Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //========== Format date helper ==========
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== User Info ==========*/}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.full_name || "N/A"}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <HiOutlineEnvelope size={16} />
              <span>{user.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineBriefcase size={16} />
              <span>{user.company || "N/A"}</span>
            </div>
          </div>
        </div>

        {/*========== Action Buttons ==========*/}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onSendEmail}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Send Email
          </button>
        </div>
      </div>

      {/*========== User Details Grid ==========*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Designation</p>
          <p className="text-sm font-medium text-gray-900">
            {user.role || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Industry</p>
          <p className="text-sm font-medium text-gray-900">
            {user.industry || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Phone</p>
          <p className="text-sm font-medium text-gray-900">
            {user.phone || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Join Date</p>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(user.date_joined)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Last Login</p>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(user.last_login)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
