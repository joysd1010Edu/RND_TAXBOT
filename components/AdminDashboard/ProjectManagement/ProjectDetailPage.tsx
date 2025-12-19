"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineArrowDownTray,
  HiOutlineDocument,
} from "react-icons/hi2";
import SectionListItem from "@/components/AdminDashboard/ProjectManagement/SectionListItem";
import SectionDetail from "@/components/AdminDashboard/ProjectManagement/SectionDetail";
import ClarificationModal from "@/components/AdminDashboard/ProjectManagement/ClarificationModal";
import type {
  Project,
  ProjectSection,
  EvidenceFile,
} from "@/Type/AdminDashboard/ProjectManagement";
import { toastManager } from "@/components/ui/toast";

const ProjectDetailPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const projectId = params.id;
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [isClarificationModalOpen, setIsClarificationModalOpen] =
    useState(false);
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");

  //========== Sample Project Data ==========
  const project: Project = {
    id: projectId,
    name: "Website Redesign Project",
    userName: "John Smith",
    userEmail: "john.smith@techcorp.com",
    industry: "Technology",
    progress: 75,
    compliance: 88,
    status: "in progress",
    lastUpdated: "2 hours ago",
  };

  //========== Sample Sections Data ==========
  const coreActivities: ProjectSection[] = [
    {
      id: "1",
      title: "Project Overview & Objectives",
      compliance: 95,
      status: "approved",
      userResponse:
        "We are developing a new website redesign to improve user experience and increase conversion rates. The project involves implementing modern UI/UX principles, responsive design, and performance optimization.",
      aiAnalysis:
        "Strong alignment with R&D criteria. Clear innovation focus on UX improvements. Technical advancement evident in performance optimization approach.",
      evidenceFiles: [
        { id: "f1", name: "project-scope.pdf" },
        { id: "f2", name: "wireframes.pdf" },
      ],
      adminComments: "Excellent detail. Approved for compliance.",
    },
    {
      id: "2",
      title: "Technical Challenges & Innovation",
      compliance: 62,
      status: "needs clarification",
      userResponse:
        "We are using new technologies like React and modern CSS frameworks.",
      aiAnalysis:
        "Insufficient detail on technical uncertainty. Need more specific information about novel approaches and technical risks.",
      missingDetails: [
        "Specific technical challenges faced",
        "Novel approaches being developed",
        "How this differs from standard practice",
        "Measurement of technical advancement",
      ],
      followUpQuestions: [
        "What specific technical uncertainties are you resolving?",
        "How are you measuring the advancement beyond current industry practice?",
      ],
    },
  ];

  const supportingActivities: ProjectSection[] = [
    {
      id: "3",
      title: "Budget & Resource Allocation",
      compliance: 75,
      status: "pending",
      userResponse:
        "Total project budget is $250,000 with 60% allocated to development, 25% to design, and 15% to testing.",
      aiAnalysis:
        "Budget breakdown provided but missing breakdown of R&D vs non-R&D costs. Need clarification on qualifying expenditure.",
      evidenceFiles: [{ id: "f3", name: "budget-summary.xlsx" }],
      missingDetails: [
        "R&D-specific cost breakdown",
        "Staff time allocation to R&D activities",
        "Subcontractor R&D costs",
      ],
    },
  ];

  //========== Get Selected Section ==========
  const allSections = [...coreActivities, ...supportingActivities];
  const selectedSection = allSections.find((s) => s.id === selectedSectionId);

  //========== Get Overall Compliance Color ==========
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return "text-green-600";
    if (compliance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  //========== Get Status Badge Color ==========
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in progress":
        return "bg-yellow-100 text-yellow-700";
      case "needs clarification":
        return "bg-orange-100 text-orange-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //========== Handle Actions ==========
  const handleGenerateReport = () => {
    toastManager.add({
      type: "info",
      title: "Generating Report",
      description: "R&D compliance report is being generated...",
    });
  };

  const handleExportData = () => {
    toastManager.add({
      type: "success",
      title: "Data Exported",
      description: "Project data has been exported successfully",
    });
  };

  const handleApproveSection = () => {
    toastManager.add({
      type: "success",
      title: "Section Approved",
      description: `${selectedSection?.title} has been approved`,
    });
  };

  const handleRejectSection = () => {
    toastManager.add({
      type: "error",
      title: "Section Rejected",
      description: `${selectedSection?.title} has been rejected`,
    });
  };

  const handleRequestClarification = () => {
    setCurrentSectionTitle(selectedSection?.title || "");
    setIsClarificationModalOpen(true);
  };

  const handleSendClarification = (description: string) => {
    toastManager.add({
      type: "success",
      title: "Clarification Sent",
      description: `Clarification request sent to ${project.userName}`,
    });
    setIsClarificationModalOpen(false);
  };

  const handleDownloadFile = (file: EvidenceFile) => {
    toastManager.add({
      type: "info",
      title: "Downloading",
      description: `Downloading ${file.name}...`,
    });
  };

  return (
    <div className="space-y-8">
      {/*========== Back Button ==========*/}
      <Link
        href="/Admin/projectManagement"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <HiOutlineArrowLeft size={16} />
        Back to Projects
      </Link>

      {/*========== Project Header ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.name}
            </h1>
            <p className="text-sm text-gray-600">
              User: {project.userName} • Industry: {project.industry}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right">
              <p
                className={`text-lg font-bold ${getComplianceColor(
                  project.compliance
                )}`}
              >
                Overall Compliance: {project.compliance}%
              </p>
            </div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/*========== Action Buttons ==========*/}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <HiOutlineDocumentText size={18} />
            Generate R&D Report
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            <HiOutlineArrowDownTray size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/*========== Content Grid ==========*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-400px)]">
        {/*========== Left Sidebar - Sections ==========*/}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto">
            {/*========== Core Activities ==========*/}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900">
                Core Activities
              </h3>
            </div>
            {coreActivities.map((section) => (
              <SectionListItem
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onClick={() => setSelectedSectionId(section.id)}
              />
            ))}

            {/*========== Supporting Activities ==========*/}
            <div className="p-4 border-b border-gray-200 bg-gray-50 mt-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Supporting Activities
              </h3>
            </div>
            {supportingActivities.map((section) => (
              <SectionListItem
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onClick={() => setSelectedSectionId(section.id)}
              />
            ))}
          </div>
        </div>

        {/*========== Right Panel - Section Detail ==========*/}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedSection ? (
            <SectionDetail
              section={selectedSection}
              onApprove={handleApproveSection}
              onReject={handleRejectSection}
              onRequestClarification={handleRequestClarification}
              onDownloadFile={handleDownloadFile}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <HiOutlineDocument size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a section to review details
              </h3>
              <p className="text-sm text-gray-500">
                Choose a section from the list to view compliance analysis
              </p>
            </div>
          )}
        </div>
      </div>

      {/*========== Clarification Modal ==========*/}
      <ClarificationModal
        isOpen={isClarificationModalOpen}
        sectionTitle={currentSectionTitle}
        onClose={() => setIsClarificationModalOpen(false)}
        onSend={handleSendClarification}
      />
    </div>
  );
}

export default ProjectDetailPage;