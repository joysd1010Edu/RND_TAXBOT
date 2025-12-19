"use client";
import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import type { AIQuestion } from "@/Type/AdminDashboard/Settings";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: Omit<AIQuestion, "id">) => void;
}

//========== Add Question Modal Component ==========
const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    section: "",
    question: "",
  });

  //========== Handle Submit ==========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      section: "",
      question: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/*========== Backdrop ==========*/}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/*========== Modal ==========*/}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl  shadow-2xl z-50 w-full max-w-sm md:max-w-md">
        {/*========== Modal Header ==========*/}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Add AI Question
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
          {/*========== Section Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name
            </label>
            <input
              type="text"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Technical Challenges, Budget"
              required
            />
          </div>

          {/*========== Question Field ==========*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter the follow-up question"
              rows={4}
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
              Add Question
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQuestionModal;
