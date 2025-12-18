"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import {
  FaArrowUp,
  FaBolt,
  FaUsers,
  FaDollarSign,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import { usePageTitle } from "@/Components/Providers/PageTitleProvider";
import ReportHeader from "./ReportSections/ReportHeader";
import ExecutiveSummary from "./ReportSections/ExecutiveSummary";
import ComplianceScoreBreakdown from "./ReportSections/ComplianceScoreBreakdown";
import InnovationMetrics from "./ReportSections/InnovationMetrics";
import ProgressCharts from "./ReportSections/ProgressCharts";
import FinancialAnalysis from "./ReportSections/FinancialAnalysis";
import TeamComposition from "./ReportSections/TeamComposition";
import CoreActivities from "./ReportSections/CoreActivities";
import SupportingActivities from "./ReportSections/SupportingActivities";
import TechnologyStack from "./ReportSections/TechnologyStack";
import ProjectMilestones from "./ReportSections/ProjectMilestones";
import RiskAssessment from "./ReportSections/RiskAssessment";
import IntellectualProperty from "./ReportSections/IntellectualProperty";
import Conclusion from "./ReportSections/Conclusion";
import Appendices from "./ReportSections/Appendices";
import { complianceReportData } from "@/Data/UserDashboard/complianceReportData";

//========== Project Details Component ===========
const ProjectDetails: React.FC = () => {
  const params = useParams();
  const { setPageTitle } = usePageTitle();
  const projectId =1 //TODO: replace with params.projectId when dynamic routing is set up

  const reportData = complianceReportData[projectId];

  useEffect(() => {
    if (reportData) {
      setPageTitle("R&D Compliance Report");
    }
  }, [reportData, setPageTitle]);

  if (!reportData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/user/MyProjects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            <MdArrowBack size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:px-12  mx-auto">
      {/*========= Back Button =========*/}
      <Link
        href="/user/MyProjects"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <MdArrowBack size={20} />
        <span className="font-medium">Back to Projects</span>
      </Link>

      {/*========= Report Sections =========*/}
      <div className="space-y-0 max-w-6xl mx-auto">
        <ReportHeader {...reportData.header} />
        <ExecutiveSummary {...reportData.executiveSummary} />
        <ComplianceScoreBreakdown
          categories={reportData.complianceScore.categories}
        />
        <InnovationMetrics metrics={reportData.innovationMetrics.metrics} />
        <ProgressCharts
          progressData={reportData.progressCharts.progressData}
          resourceData={reportData.progressCharts.resourceData}
        />
        <FinancialAnalysis
          budgetCards={reportData.financialAnalysis.budgetCards}
          costCategories={reportData.financialAnalysis.costCategories}
          chartData={reportData.financialAnalysis.chartData}
        />
        <TeamComposition {...reportData.teamComposition} />
        <CoreActivities activities={reportData.coreActivities} />
        <SupportingActivities {...reportData.supportingActivities} />
        <TechnologyStack {...reportData.technologyStack} />
        <ProjectMilestones {...reportData.projectMilestones} />
        <RiskAssessment {...reportData.riskAssessment} />
        <IntellectualProperty {...reportData.intellectualProperty} />
        <Conclusion {...reportData.conclusion} />
        <Appendices {...reportData.appendices} />
      </div>
    </div>
  );
};

export default ProjectDetails;
