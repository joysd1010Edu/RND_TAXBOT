"use client";
import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperClip,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import type { SectionDetailProps } from "@/Type/AdminDashboard/ProjectManagement";

//========== Section Detail Component ==========
const SectionDetail: React.FC<SectionDetailProps> = ({
  section,
  onApprove,
  onReject,
  onRequestClarification,
  onDownloadFile,
}) => {
  //========== Get Status Badge ==========
  const getStatusBadge = () => {
    switch (section.status) {
      case "approved":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            approved
          </span>
        );
      case "needs clarification":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            needs clarification
          </span>
        );
      case "rejected":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            rejected
          </span>
        );
      case "pending":
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            pending
          </span>
        );
      default:
        return null;
    }
  };

  //========== Get Compliance Color ==========
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return "text-green-600";
    if (compliance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/*========== Header ==========*/}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
        {getStatusBadge()}
      </div>

      {/*========== Compliance Score ==========*/}
      <div className="mb-6">
        <p
          className={`text-sm font-semibold ${getComplianceColor(
            section.compliance
          )}`}
        >
          Compliance Score: {section.compliance}%
        </p>
      </div>

      {/*========== User's Response ==========*/}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          User&apos;s Response
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {section.userResponse}
          </p>
        </div>
      </div>

      {/*========== AI Compliance Analysis ==========*/}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          AI Compliance Analysis
        </h3>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {section.aiAnalysis}
          </p>
        </div>
      </div>

      {/*========== Missing Details ==========*/}
      {section.missingDetails && section.missingDetails.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineExclamationTriangle
              size={20}
              className="text-orange-600"
            />
            <h3 className="text-sm font-semibold text-gray-900">
              Missing Details
            </h3>
          </div>
          <ul className="space-y-2">
            {section.missingDetails.map((detail, index) => (
              <li key={index} className="text-sm text-gray-700 pl-4">
                • {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/*========== Follow-up Questions ==========*/}
      {section.followUpQuestions && section.followUpQuestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Existing Follow-up Questions
          </h3>
          <ul className="space-y-2">
            {section.followUpQuestions.map((question, index) => (
              <li key={index} className="text-sm text-gray-700 pl-4">
                • {question}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/*========== Evidence Files ==========*/}
      {section.evidenceFiles && section.evidenceFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Evidence Files
          </h3>
          <div className="space-y-2">
            {section.evidenceFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <HiOutlinePaperClip size={20} className="text-blue-600" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  onClick={() => onDownloadFile(file)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*========== Admin Comments ==========*/}
      {section.adminComments && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Admin Comments
          </h3>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {section.adminComments}
            </p>
          </div>
        </div>
      )}

      {/*========== Action Buttons ==========*/}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onApprove}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlineCheckCircle size={18} />
          Approve Section
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlineXCircle size={18} />
          Reject Section
        </button>
        <button
          onClick={onRequestClarification}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlineChatBubbleLeftRight size={18} />
          Request Clarification
        </button>
      </div>
    </div>
  );
};

export default SectionDetail;
