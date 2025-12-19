"use client";
import React from "react";
import type { AdminAccountRowProps } from "@/Type/AdminDashboard/Settings";

//========== Admin Account Row Component ==========
const AdminAccountRow: React.FC<AdminAccountRowProps> = ({
  account,
  onEdit,
  onRemove,
}) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/*========== Name ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-900">{account.name}</p>
      </td>

      {/*========== Email ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{account.email}</p>
      </td>

      {/*========== Role ==========*/}
      <td className="p-4">
        <p className="text-sm text-gray-700">{account.role}</p>
      </td>

      {/*========== Status ==========*/}
      <td className="p-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            account.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {account.status}
        </span>
      </td>

      {/*========== Actions ==========*/}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(account)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(account)}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminAccountRow;
