"use client";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import type { ComplianceRuleCardProps } from "@/Type/AdminDashboard/Settings";

//========== Compliance Rule Card Component ==========
const ComplianceRuleCard: React.FC<ComplianceRuleCardProps> = ({
  rule,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header with Delete Button ==========*/}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            {rule.title}
          </h4>
          <p className="text-sm text-gray-600">{rule.description}</p>
        </div>
        <button
          onClick={() => onDelete(rule.id)}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <HiOutlineTrash size={20} className="text-red-600" />
        </button>
      </div>

      {/*========== Input Field ==========*/}
      <input
        type="text"
        value={rule.value}
        onChange={(e) => onUpdate(rule.id, e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ComplianceRuleCard;
