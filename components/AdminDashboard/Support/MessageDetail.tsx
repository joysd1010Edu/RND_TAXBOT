"use client";
import React, { useState } from "react";
import {
  HiOutlinePaperClip,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import type { MessageDetailProps } from "@/Type/AdminDashboard/Support";

//========== Message Detail Component ==========
const MessageDetail: React.FC<MessageDetailProps> = ({
  message,
  onSaveNotes,
  onSendReply,
  onMarkResolved,
  onDownloadAttachment,
}) => {
  const [internalNotes, setInternalNotes] = useState(
    message.internalNotes || ""
  );
  const [replyText, setReplyText] = useState("");

  //========== Get Priority Badge Color ==========
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //========== Get Status Badge Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-700";
      case "in-review":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //========== Handle Save Notes ==========
  const handleSaveNotes = () => {
    onSaveNotes(internalNotes);
  };

  //========== Handle Send Reply ==========
  const handleSendReply = () => {
    if (replyText.trim()) {
      onSendReply(replyText);
      setReplyText("");
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/*========== Header with Title and Badges ==========*/}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {message.subject}
          </h2>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              message.priority
            )}`}
          >
            {message.priority} priority
          </span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              message.status
            )}`}
          >
            {message.status}
          </span>
        </div>

        {/*========== Message Meta Info ==========*/}
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">From:</span> {message.userName} (
            {message.userEmail})
          </p>
          <p>
            <span className="font-medium">Project:</span> {message.project}
          </p>
          <p>
            <span className="font-medium">Received:</span> {message.timestamp}
          </p>
        </div>
      </div>

      {/*========== Message Content ==========*/}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Message</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {message.message}
          </p>
        </div>
      </div>

      {/*========== Attachments ==========*/}
      {message.attachments && message.attachments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Attachments
          </h3>
          <div className="space-y-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <HiOutlinePaperClip size={20} className="text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {attachment.name}
                  </span>
                </div>
                <button
                  onClick={() => onDownloadAttachment(attachment)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*========== Internal Notes ==========*/}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Internal Notes{" "}
          <span className="text-xs text-gray-500 font-normal">
            (Not visible to user)
          </span>
        </h3>
        <textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          placeholder="Add internal notes for team reference..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-25"
        />
        <button
          onClick={handleSaveNotes}
          className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Save Notes
        </button>
      </div>

      {/*========== Reply to User ==========*/}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Reply to User
        </h3>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-30"
        />
      </div>

      {/*========== Action Buttons ==========*/}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSendReply}
          disabled={!replyText.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlinePaperAirplane size={18} />
          Send Reply
        </button>
        <button
          onClick={onMarkResolved}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlineCheckCircle size={18} />
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};

export default MessageDetail;
