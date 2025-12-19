"use client";
import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import type { ClarificationModalProps } from "@/Type/AdminDashboard/ProjectManagement";

//========== Clarification Modal Component ==========
const ClarificationModal: React.FC<ClarificationModalProps> = ({
  isOpen,
  sectionTitle,
  onClose,
  onSend,
}) => {
  const [message, setMessage] = useState("");

  //========== Handle Send ==========
  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/*========== Backdrop ==========*/}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/*========== Modal ==========*/}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
        >
          {/*========== Header ==========*/}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Request Clarification
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiOutlineXMark size={24} className="text-gray-600" />
            </button>
          </div>

          {/*========== Description ==========*/}
          <p className="text-sm text-gray-600 mb-4">
            Send a clarification request to the user for: {sectionTitle}
          </p>

          {/*========== Textarea ==========*/}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your clarification request or questions..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-37.5 mb-4"
          />

          {/*========== Actions ==========*/}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClarificationModal;
