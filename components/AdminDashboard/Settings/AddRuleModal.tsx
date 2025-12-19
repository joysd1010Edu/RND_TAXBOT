"use client";
import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import type { ComplianceRule } from "@/Type/AdminDashboard/Settings";

interface AddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (rule: Omit<ComplianceRule, "id">) => void;
}

//========== Add Rule Modal Component ==========
const AddRuleModal: React.FC<AddRuleModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    type: "text" as ComplianceRule["type"],
  });

  //========== Handle Submit ==========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: "",
      description: "",
      value: "",
      type: "text",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/*========== Backdrop ==========*/}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/*========== Modal ==========*/}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full md:max-w-md max-w-sm">
        {/*========== Modal Header ==========*/}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Add Compliance Rule
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
          {/*========== Title Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rule Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rule title"
              required
            />
          </div>

          {/*========== Description Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe the rule"
              rows={3}
              required
            />
          </div>

          {/*========== Type Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as ComplianceRule["type"],
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>

          {/*========== Value Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Value
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter default value"
              required
            />
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
              Add Rule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRuleModal;
