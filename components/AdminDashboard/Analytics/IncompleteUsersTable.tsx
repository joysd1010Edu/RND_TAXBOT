"use client";
import React, { useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import type { IncompleteUsersTableProps } from "@/Type/AdminDashboard/Analytics";
import { toastManager } from "@/components/ui/toast";

//========== Incomplete Users Table Component ==========
const IncompleteUsersTable: React.FC<IncompleteUsersTableProps> = ({
  users,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  //========== Handle Select All ==========
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  //========== Handle Individual Selection ==========
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  //========== Handle Send Reminder ==========
  const handleSendReminder = (userName: string, userEmail: string) => {
    toastManager.add({
      type: "success",
      title: "Reminder Sent",
      description: `Reminder sent successfully to ${userName} (${userEmail})`,
    });
  };

  //========== Handle Schedule Call ==========
  const handleScheduleCall = (userName: string) => {
    toastManager.add({
      type: "info",
      title: "Call Scheduled",
      description: `Call scheduled with ${userName}`,
    });
  };

  //========== Handle Send Multiple Reminders ==========
  const handleSendMultipleReminders = () => {
    if (selectedUsers.length === 0) {
      toastManager.add({
        type: "error",
        title: "No Users Selected",
        description: "Please select at least one user to send reminders",
      });
      return;
    }

    toastManager.add({
      type: "success",
      title: "Reminders Sent",
      description: `Successfully sent reminders to ${selectedUsers.length} user(s)`,
    });
    setSelectedUsers([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HiOutlineExclamationTriangle size={24} className="text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Users with Incomplete Required Responses
            </h3>
            <p className="text-sm text-gray-500">
              Automatically detected users who need follow-up
            </p>
          </div>
        </div>
        <button
          onClick={handleSendMultipleReminders}
          disabled={selectedUsers.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <HiOutlineExclamationTriangle size={18} />
          Send {selectedUsers.length > 0 ? selectedUsers.length : ""} Reminder
          {selectedUsers.length !== 1 ? "s" : ""}
        </button>
      </div>

      {/*========== Table ==========*/}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Project
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Incomplete Section
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Days Inactive
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Last Activity
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Reminders Sent
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) =>
                      handleSelectUser(user.id, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.project}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">
                    {user.incompleteSection}
                  </p>
                </td>
                <td className="p-4">
                  <span
                    className={`text-sm font-semibold ${user.daysInactiveColor}`}
                  >
                    {user.daysInactive} days
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.lastActivity}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.remindersSent}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendReminder(user.name, user.email)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    >
                      Send Reminder
                    </button>
                    <button
                      onClick={() => handleScheduleCall(user.name)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    >
                      Schedule Call
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncompleteUsersTable;
