"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  HiOutlineEye,
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlineNoSymbol,
  HiOutlineTrash,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import type { User } from "@/Type/AdminDashboard/UserManagement";
import { UserRowProps } from "@/Type/AdminDashboard/UserManagement";


//========== User Row Component ==========
const UserRow: React.FC<UserRowProps> = ({
  user,
  onViewProfile,
  onSendEmail,
  onResetPassword,
  onSuspendAccount,
  onDeleteUser,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  //========== Close Menu on Outside Click ==========
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  //========== Handle Actions ==========
  const handleAction = (action: () => void, actionName: string) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <tr className="border-b cursor-pointer border-gray-100 hover:bg-gray-50">
      {/*========== User ID ==========*/}
      <td className="p-4">
        <span className="text-sm text-gray-700">#{user.id}</span>
      </td>

      {/*========== Name & Email ==========*/}
      <td onClick={() => onViewProfile(user.id)} className="p-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </td>

      {/*========== Company ==========*/}
      <td onClick={() => onViewProfile(user.id)} className="p-4">
        <p className="text-sm text-gray-700">{user.company}</p>
      </td>

      {/*========== Projects ==========*/}
      <td onClick={() => onViewProfile(user.id)} className="p-4">
        <p className="text-sm text-gray-700">{user.projects}</p>
      </td>

      {/*========== Status ==========*/}
      <td onClick={() => onViewProfile(user.id)} className="p-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </span>
      </td>

      {/*========== Last Login ==========*/}
      <td onClick={() => onViewProfile(user.id)} className="p-4">
        <p className="text-sm text-gray-700">{user.lastLogin}</p>
      </td>

      {/*========== Actions ==========*/}
      <td className="p-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineEllipsisVertical size={20} className="text-gray-600" />
          </button>

          {/*========== Dropdown Menu ==========*/}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
              <button
                onClick={() =>
                  handleAction(() => onViewProfile(user.id), "View Profile")
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
              >
                <HiOutlineEye size={20} />
                <span className="text-sm">View Profile</span>
              </button>
              <button
                onClick={() =>
                  handleAction(() => onSendEmail(user), "Send Email")
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
              >
                <HiOutlineEnvelope size={20} />
                <span className="text-sm">Send Email</span>
              </button>
              <button
                onClick={() =>
                  handleAction(() => onResetPassword(user), "Reset Password")
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
              >
                <HiOutlineKey size={20} />
                <span className="text-sm">Reset Password</span>
              </button>
              <button
                onClick={() =>
                  handleAction(() => onSuspendAccount(user), "Suspend Account")
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
              >
                <HiOutlineNoSymbol size={20} />
                <span className="text-sm">Suspend Account</span>
              </button>
              <hr className="my-2 border-gray-200" />
              <button
                onClick={() =>
                  handleAction(() => onDeleteUser(user), "Delete User")
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
              >
                <HiOutlineTrash size={20} />
                <span className="text-sm font-medium">Delete User</span>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
