"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineInbox,
} from "react-icons/hi2";
import MessageListItem from "./MessageListItem";
import MessageDetail from "./MessageDetail";
import type { SupportMessage, Attachment } from "@/Type/AdminDashboard/Support";
import { toastManager } from "@/components/ui/toast";

//========== Support Inbox Component ==========
const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  //========== Sample Messages Data ==========
  const messages: SupportMessage[] = [
    {
      id: "1",
      userName: "John Smith",
      userEmail: "john.smith@techcorp.com",
      subject: "Budget Section Clarification",
      message:
        "I need help understanding how to break down R&D vs non-R&D costs in the budget section. Can you provide guidance?",
      priority: "high",
      status: "open",
      timestamp: "2 hours ago",
      project: "Website Redesign",
      description:
        "I need help understanding how to break down R&D vs non-R&D costs in the budget section. Can you provide guidance?",
      attachments: [
        {
          id: "a1",
          name: "budget-draft.xlsx",
        },
      ],
      internalNotes: "",
    },
    {
      id: "2",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@innovate.com",
      subject: "Evidence Upload Issue",
      message:
        "I'm having trouble uploading large PDF files to the evidence section. The upload keeps failing after 50%.",
      priority: "medium",
      status: "in-review",
      timestamp: "5 hours ago",
      project: "Mobile App Development",
      description:
        "I'm having trouble uploading large PDF files to the evidence section. The upload keeps failing after 50%.",
      attachments: [],
      internalNotes: "Checked server logs - file size exceeded 25MB limit",
    },
    {
      id: "3",
      userName: "Michael Chen",
      userEmail: "mchen@startupx.io",
      subject: "R&D Criteria Question",
      message:
        "Does machine learning model training qualify as core R&D activity? We've spent significant time on this.",
      priority: "medium",
      status: "resolved",
      timestamp: "1 day ago",
      project: "Data Analytics Platform",
      description:
        "Does machine learning model training qualify as core R&D activity? We've spent significant time on this.",
      attachments: [],
      internalNotes: "Confirmed ML training qualifies - sent detailed response",
    },
    {
      id: "4",
      userName: "Emily Davis",
      userEmail: "emily.d@designstudio.com",
      subject: "Project Timeline Extension",
      message:
        "Can we request an extension for project submission? We need additional time to gather documentation.",
      priority: "low",
      status: "open",
      timestamp: "2 days ago",
      project: "Cloud Migration",
      description:
        "Can we request an extension for project submission? We need additional time to gather documentation.",
      attachments: [],
      internalNotes: "",
    },
  ];

  //========== Filter Messages ==========
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  //========== Get Selected Message ==========
  const selectedMessage = messages.find((m) => m.id === selectedMessageId);

  //========== Handle Actions ==========
  const handleSaveNotes = (notes: string) => {
    toastManager.add({
      type: "success",
      title: "Notes Saved",
      description: "Internal notes have been saved successfully",
    });
  };

  const handleSendReply = (reply: string) => {
    toastManager.add({
      type: "success",
      title: "Reply Sent",
      description: `Your reply has been sent to ${selectedMessage?.userName}`,
    });
  };

  const handleMarkResolved = () => {
    toastManager.add({
      type: "success",
      title: "Marked as Resolved",
      description: `Support ticket for ${selectedMessage?.userName} has been marked as resolved`,
    });
  };

  const handleDownloadAttachment = (attachment: Attachment) => {
    toastManager.add({
      type: "info",
      title: "Downloading",
      description: `Downloading ${attachment.name}...`,
    });
  };

  return (
    <div className="space-y-8 px-0 md:px-10 lg:px-18 py-4">
      {/*========== Back Button and Header ==========*/}
      <div>
        <Link
          href="/Admin/Dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Inbox</h1>
        <p className="text-gray-600">
          Manage user support requests and help messages
        </p>
      </div>

      {/*========== Main Content ==========*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
        {/*========== Left Sidebar - Message List ==========*/}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {/*========== Search and Filter ==========*/}
          <div className="p-4 border-b border-gray-200 space-y-4">
            {/*========== Search Input ==========*/}
            <div className="relative">
              <HiOutlineMagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/*========== Status Filter ==========*/}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-review">In Review</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/*========== Message List ==========*/}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => (
              <MessageListItem
                key={message.id}
                message={message}
                isSelected={selectedMessageId === message.id}
                onClick={() => setSelectedMessageId(message.id)}
              />
            ))}

            {/*========== Empty State ==========*/}
            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <HiOutlineMagnifyingGlass
                  size={48}
                  className="text-gray-300 mb-3"
                />
                <p className="text-sm text-gray-500">No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/*========== Right Panel - Message Detail ==========*/}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedMessage ? (
            <MessageDetail
              message={selectedMessage}
              onSaveNotes={handleSaveNotes}
              onSendReply={handleSendReply}
              onMarkResolved={handleMarkResolved}
              onDownloadAttachment={handleDownloadAttachment}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <HiOutlineInbox size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a message to view details
              </h3>
              <p className="text-sm text-gray-500">
                Choose a support request from the list to view and respond
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
