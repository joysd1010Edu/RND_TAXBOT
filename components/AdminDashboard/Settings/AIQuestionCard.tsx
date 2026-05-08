"use client";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import type { AIQuestionCardProps } from "@/Type/AdminDashboard/Settings";

//========== AI Question Card Component ==========
const AIQuestionCard: React.FC<AIQuestionCardProps> = ({
  question,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header with Section and Delete Button ==========*/}
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">
          Section: {question.section}
        </h4>
        <button
          onClick={() => onDelete(question.id)}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <HiOutlineTrash size={20} className="text-red-600" />
        </button>
      </div>

      {/*========== Question Text ==========*/}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-900">{question.question}</p>
      </div>
    </div>
  );
};

export default AIQuestionCard;
