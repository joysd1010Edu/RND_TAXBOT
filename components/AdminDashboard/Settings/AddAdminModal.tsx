"use client";
import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import type { AdminAccount } from "@/Type/AdminDashboard/Settings";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: Omit<AdminAccount, "id">) => void;
}

//========== Add Admin Modal Component ==========
const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin" as AdminAccount["role"],
    status: "active" as AdminAccount["status"],
  });

  //========== Handle Submit ==========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      email: "",
      role: "Admin",
      status: "active",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/*========== Backdrop ==========*/}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/*========== Modal ==========*/}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-sm md:max-w-md">
        {/*========== Modal Header ==========*/}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Add Admin Account
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineXMark size={20} className="text-gray-500" />
          </button>
        </div>

        {/*========== Modal Body ==========*/}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/*========== Name Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin name"
              required
            />
          </div>

          {/*========== Email Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/*========== Role Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as AdminAccount["role"],
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {/*========== Status Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as AdminAccount["status"],
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/*========== Action Buttons ==========*/}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAdminModal;
