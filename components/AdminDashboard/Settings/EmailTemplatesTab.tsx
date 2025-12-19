"use client";
import React, { useState } from "react";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { toastManager } from "@/components/ui/toast";

//========== Email Templates Tab Component ==========
const EmailTemplatesTab: React.FC = () => {
  //========== State for Template ==========
  const [template, setTemplate] = useState(
    "Dear {user_name},\n\nThis is a reminder about your project {project_name}. Please complete the {section_name} section.\n\nBest regards,\nAdmin Team"
  );

  //========== Handle Save Template ==========
  const handleSaveTemplate = () => {
    toastManager.add({
      type: "success",
      title: "Template Saved",
      description: "Email template has been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/*========== Header ==========*/}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Email Templates
        </h3>
        <p className="text-sm text-gray-600">
          Customize email templates. Use variables: {"{user_name}"},{" "}
          {"{project_name}"}, {"{section_name}"}
        </p>
      </div>

      {/*========== Template Section ==========*/}
      <div>
        <h4 className="text-base font-medium text-gray-900 mb-3">
          Reminder Email Template
        </h4>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-100 font-mono"
          placeholder="Enter your email template..."
        />
      </div>

      {/*========== Save Button ==========*/}
      <button
        onClick={handleSaveTemplate}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <HiOutlineDocumentCheck size={18} />
        Save Template
      </button>
    </div>
  );
};

export default EmailTemplatesTab;
