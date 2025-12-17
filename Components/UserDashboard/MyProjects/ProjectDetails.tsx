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

//========== Dummy Compliance Report Data ===========
const complianceReportData: Record<string, any> = {
  "1": {
    header: {
      projectTitle:
        "Advanced AI-Powered E-Commerce Platform with Real-Time Personalization",
      companyName: "InnovaTech Solutions Inc.",
      complianceScore: 98,
      reportDate: "December 9, 2025",
      projectPeriod: "January 15, 2024 - December 15, 2024",
      investigator: "Dr. Sarah Johnson",
      industry: "E-Commerce / Artificial Intelligence",
      totalBudget: 850000,
      teamSize: 12,
      status: "Completed",
    },
    executiveSummary: {
      projectTitle:
        "Advanced AI-Powered E-Commerce Platform with Real-Time Personalization",
      companyName: "InnovaTech Solutions Inc.",
      projectPeriod: "January 15, 2024 to December 15, 2024",
      complianceScore: 98,
      summaryText:
        "This comprehensive R&D compliance report presents a detailed analysis of the Advanced AI-Powered E-Commerce Platform with Real-Time Personalization, conducted by InnovaTech Solutions Inc. over a 12-month period from January 15, 2024 to December 15, 2024.",
      complianceText:
        "The project demonstrates an exceptional overall compliance score of 98%, indicating outstanding alignment with R&D tax credit requirements and qualifying criteria. This project represents significant technical advancement in the field of AI-powered e-commerce platforms, with novel approaches to recommendation systems, distributed architecture, and real-time personalization.",
      keyHighlights: [
        {
          label: "4 Core R&D Activities",
          value: "with scores ranging from 96% to 99%",
        },
        {
          label: "4 Supporting Activities",
          value: "with scores ranging from 96% to 100%",
        },
        {
          label: "2 Patent Applications Filed",
          value: "for novel innovations",
        },
        { label: "10,200 R&D Hours", value: "invested by qualified personnel" },
        {
          label: "$680,000 Qualifying R&D Expenditure",
          value: "properly documented",
        },
      ],
      businessMetrics: [
        {
          icon: <FaArrowUp />,
          value: "32%",
          label: "Improvement in CTR",
          color: "bg-green-600",
        },
        {
          icon: <FaBolt />,
          value: "87ms",
          label: "P95 Latency Achieved",
          color: "bg-blue-600",
        },
        {
          icon: <FaUsers />,
          value: "12M",
          label: "Concurrent Users",
          color: "bg-purple-600",
        },
      ],
    },
    complianceScore: {
      categories: [
        { name: "Core R&D Activities", score: 98, color: "#10b981" },
        { name: "Supporting Activities", score: 96, color: "#f97316" },
        { name: "Documentation Quality", score: 100, color: "#3b82f6" },
        { name: "Evidence & Validation", score: 98, color: "#06b6d4" },
        { name: "Innovation Metrics", score: 97, color: "#8b5cf6" },
        { name: "Technical Advancement", score: 99, color: "#ec4899" },
      ],
    },
    innovationMetrics: {
      metrics: [
        { subject: "Novel Algorithms", value: 95, fullMark: 100 },
        { subject: "Technical Complexity", value: 92, fullMark: 100 },
        { subject: "Industry Advancement", value: 88, fullMark: 100 },
        { subject: "Scalability Innovation", value: 94, fullMark: 100 },
        { subject: "Security Protocols", value: 90, fullMark: 100 },
        { subject: "Performance Optimization", value: 93, fullMark: 100 },
      ],
    },
    progressCharts: {
      progressData: [
        { month: "Jan 24", activitiesCompleted: 45, complianceScore: 67 },
        { month: "Feb 24", activitiesCompleted: 58, complianceScore: 72 },
        { month: "Mar 24", activitiesCompleted: 68, complianceScore: 78 },
        { month: "Apr 24", activitiesCompleted: 75, complianceScore: 82 },
        { month: "May 24", activitiesCompleted: 82, complianceScore: 86 },
        { month: "Jun 24", activitiesCompleted: 88, complianceScore: 89 },
        { month: "Jul 24", activitiesCompleted: 92, complianceScore: 92 },
        { month: "Aug 24", activitiesCompleted: 95, complianceScore: 94 },
        { month: "Sep 24", activitiesCompleted: 97, complianceScore: 96 },
        { month: "Oct 24", activitiesCompleted: 99, complianceScore: 97 },
        { month: "Nov 24", activitiesCompleted: 100, complianceScore: 98 },
        { month: "Dec 24", activitiesCompleted: 100, complianceScore: 98 },
      ],
      resourceData: [
        { month: "Jan 24", budgetUtilization: 62, rndHours: 650 },
        { month: "Feb 24", budgetUtilization: 65, rndHours: 720 },
        { month: "Mar 24", budgetUtilization: 68, rndHours: 780 },
        { month: "Apr 24", budgetUtilization: 72, rndHours: 850 },
        { month: "May 24", budgetUtilization: 78, rndHours: 920 },
        { month: "Jun 24", budgetUtilization: 82, rndHours: 980 },
        { month: "Jul 24", budgetUtilization: 85, rndHours: 1050 },
        { month: "Aug 24", budgetUtilization: 88, rndHours: 1100 },
        { month: "Sep 24", budgetUtilization: 90, rndHours: 1150 },
        { month: "Oct 24", budgetUtilization: 92, rndHours: 1200 },
        { month: "Nov 24", budgetUtilization: 95, rndHours: 1300 },
        { month: "Dec 24", budgetUtilization: 98, rndHours: 1400 },
      ],
    },
    financialAnalysis: {
      budgetCards: [
        {
          icon: <FaDollarSign />,
          value: "$850,000",
          label: "Total Budget",
          color: "bg-blue-600",
        },
        {
          icon: <FaDollarSign />,
          value: "$680,000",
          label: "R&D Qualifying",
          color: "bg-green-600",
        },
        {
          icon: <FaClock />,
          value: "10,200",
          label: "R&D Hours",
          color: "bg-orange-600",
        },
        {
          icon: <FaChartLine />,
          value: "80%",
          label: "R&D Percentage",
          color: "bg-purple-600",
        },
      ],
      costCategories: [
        {
          category: "Personnel Costs",
          rndAmount: 420000,
          nonRndAmount: 80000,
          total: 500000,
          rndPercentage: 84,
        },
        {
          category: "Software & Tools",
          rndAmount: 95000,
          nonRndAmount: 25000,
          total: 120000,
          rndPercentage: 79,
        },
        {
          category: "Cloud Infrastructure",
          rndAmount: 85000,
          nonRndAmount: 35000,
          total: 120000,
          rndPercentage: 71,
        },
        {
          category: "Research Materials",
          rndAmount: 45000,
          nonRndAmount: 5000,
          total: 50000,
          rndPercentage: 90,
        },
        {
          category: "Testing & QA",
          rndAmount: 35000,
          nonRndAmount: 25000,
          total: 60000,
          rndPercentage: 58,
        },
      ],
      chartData: [
        {
          name: "Personnel Costs",
          rndExpenditure: 420000,
          nonRndExpenditure: 80000,
        },
        {
          name: "Software & Tools",
          rndExpenditure: 95000,
          nonRndExpenditure: 25000,
        },
        {
          name: "Cloud Infrastructure",
          rndExpenditure: 85000,
          nonRndExpenditure: 35000,
        },
        {
          name: "Research Materials",
          rndExpenditure: 45000,
          nonRndExpenditure: 5000,
        },
        {
          name: "Testing & QA",
          rndExpenditure: 35000,
          nonRndExpenditure: 25000,
        },
      ],
    },
    teamComposition: {
      introText:
        "The R&D team consisted of 12 highly qualified professionals with expertise in artificial intelligence, distributed systems, software engineering, and data science. Total R&D hours: 10,200 hours",
      teamMembers: [
        {
          name: "Dr. Sarah Johnson",
          role: "Principal Investigator / Project Lead",
          degree: "PhD Computer Science",
          specializations: ["AI/ML", "System Architecture"],
          hours: 1850,
        },
        {
          name: "Michael Chen",
          role: "Senior AI/ML Engineer",
          degree: "MSc Artificial Intelligence",
          specializations: ["Deep Learning", "NLP"],
          hours: 1920,
        },
        {
          name: "Emily Rodriguez",
          role: "Lead Backend Developer",
          degree: "BSc Software Engineering",
          specializations: ["Distributed Systems", "Microservices"],
          hours: 1880,
        },
        {
          name: "James Wilson",
          role: "Research Scientist",
          degree: "PhD Machine Learning",
          specializations: ["Recommendation Systems", "Data Science"],
          hours: 1750,
        },
        {
          name: "Lisa Park",
          role: "Senior Full-Stack Developer",
          degree: "BSc Computer Science",
          specializations: ["React", "Node.js", "Real-time Systems"],
          hours: 1650,
        },
        {
          name: "David Kumar",
          role: "DevOps Engineer",
          degree: "BSc Information Technology",
          specializations: ["Cloud Architecture", "CI/CD"],
          hours: 920,
        },
        {
          name: "Anna Kowalski",
          role: "Data Engineer",
          degree: "MSc Data Science",
          specializations: ["Big Data", "ETL Pipelines"],
          hours: 1580,
        },
        {
          name: "Robert Taylor",
          role: "Security Researcher",
          degree: "MSc Cybersecurity",
          specializations: ["Cybersecurity", "Encryption"],
          hours: 1450,
        },
        {
          name: "Maria Garcia",
          role: "UX Research Lead",
          degree: "MSc HCI",
          specializations: ["User Research", "A/B Testing"],
          hours: 980,
        },
        {
          name: "Tom Anderson",
          role: "Performance Engineer",
          degree: "BSc Computer Engineering",
          specializations: ["Optimization", "Caching"],
          hours: 850,
        },
        {
          name: "Sophie Martin",
          role: "QA Automation Engineer",
          degree: "BSc Software Testing",
          specializations: ["Test Automation", "Quality Assurance"],
          hours: 720,
        },
        {
          name: "Chris Lee",
          role: "Technical Writer",
          degree: "BA Technical Writing",
          specializations: ["Documentation", "Technical Communication"],
          hours: 650,
        },
      ],
      totalMembers: 12,
      advancedDegrees: 5,
      totalHours: 10200,
      rndFocusRate: 85,
    },
  },
  "2": {
    header: {
      projectTitle: "Advanced Manufacturing Process Innovation",
      companyName: "TechManufacture Inc.",
      complianceScore: 95,
      reportDate: "December 20, 2024",
      projectPeriod: "February 1, 2024 - December 15, 2024",
      investigator: "Dr. Sarah Johnson",
      industry: "E-Commerce / Artificial Intelligence",
      totalBudget: 850000,
      teamSize: 12,
      status: "Completed",
    },
    executiveSummary: {
      projectTitle: "Advanced Manufacturing Process Innovation",
      companyName: "TechManufacture Inc.",
      projectPeriod: "February 1, 2024 to December 15, 2024",
      complianceScore: 95,
      summaryText:
        "This comprehensive R&D compliance report presents a detailed analysis of the Advanced Manufacturing Process Innovation project, conducted by TechManufacture Inc. over an 11-month period from February 1, 2024 to December 15, 2024.",
      complianceText:
        "The project demonstrates an excellent overall compliance score of 95%, indicating strong alignment with R&D tax credit requirements. This project represents significant technical advancement in manufacturing automation and robotics.",
      keyHighlights: [
        {
          label: "3 Core R&D Activities",
          value: "with scores ranging from 93% to 97%",
        },
        {
          label: "3 Supporting Activities",
          value: "with scores ranging from 92% to 96%",
        },
        { label: "1 Patent Application Filed", value: "for automation system" },
        { label: "8,500 R&D Hours", value: "invested by qualified personnel" },
        {
          label: "$620,000 Qualifying R&D Expenditure",
          value: "properly documented",
        },
      ],
      businessMetrics: [
        {
          icon: <FaArrowUp />,
          value: "40%",
          label: "Production Efficiency",
          color: "bg-green-600",
        },
        {
          icon: <FaBolt />,
          value: "30%",
          label: "Waste Reduction",
          color: "bg-blue-600",
        },
        {
          icon: <FaUsers />,
          value: "50",
          label: "Staff Trained",
          color: "bg-purple-600",
        },
      ],
    },
    complianceScore: {
      categories: [
        { name: "Core R&D Activities", score: 95, color: "#10b981" },
        { name: "Supporting Activities", score: 94, color: "#f97316" },
        { name: "Documentation Quality", score: 96, color: "#3b82f6" },
        { name: "Evidence & Validation", score: 95, color: "#06b6d4" },
        { name: "Innovation Metrics", score: 93, color: "#8b5cf6" },
        { name: "Technical Advancement", score: 97, color: "#ec4899" },
      ],
    },
    innovationMetrics: {
      metrics: [
        { subject: "Novel Algorithms", value: 88, fullMark: 100 },
        { subject: "Technical Complexity", value: 90, fullMark: 100 },
        { subject: "Industry Advancement", value: 92, fullMark: 100 },
        { subject: "Scalability Innovation", value: 87, fullMark: 100 },
        { subject: "Security Protocols", value: 85, fullMark: 100 },
        { subject: "Performance Optimization", value: 89, fullMark: 100 },
      ],
    },
    progressCharts: {
      progressData: [
        { month: "Feb 24", activitiesCompleted: 35, complianceScore: 62 },
        { month: "Mar 24", activitiesCompleted: 48, complianceScore: 70 },
        { month: "Apr 24", activitiesCompleted: 60, complianceScore: 75 },
        { month: "May 24", activitiesCompleted: 70, complianceScore: 80 },
        { month: "Jun 24", activitiesCompleted: 78, complianceScore: 84 },
        { month: "Jul 24", activitiesCompleted: 85, complianceScore: 87 },
        { month: "Aug 24", activitiesCompleted: 90, complianceScore: 90 },
        { month: "Sep 24", activitiesCompleted: 94, complianceScore: 92 },
        { month: "Oct 24", activitiesCompleted: 97, complianceScore: 94 },
        { month: "Nov 24", activitiesCompleted: 99, complianceScore: 95 },
        { month: "Dec 24", activitiesCompleted: 100, complianceScore: 95 },
      ],
      resourceData: [
        { month: "Feb 24", budgetUtilization: 55, rndHours: 600 },
        { month: "Mar 24", budgetUtilization: 60, rndHours: 680 },
        { month: "Apr 24", budgetUtilization: 65, rndHours: 750 },
        { month: "May 24", budgetUtilization: 70, rndHours: 820 },
        { month: "Jun 24", budgetUtilization: 75, rndHours: 890 },
        { month: "Jul 24", budgetUtilization: 80, rndHours: 960 },
        { month: "Aug 24", budgetUtilization: 84, rndHours: 1020 },
        { month: "Sep 24", budgetUtilization: 88, rndHours: 1080 },
        { month: "Oct 24", budgetUtilization: 92, rndHours: 1150 },
        { month: "Nov 24", budgetUtilization: 96, rndHours: 1220 },
        { month: "Dec 24", budgetUtilization: 98, rndHours: 1300 },
      ],
    },
    financialAnalysis: {
      budgetCards: [
        {
          icon: <FaDollarSign />,
          value: "$750,000",
          label: "Total Budget",
          color: "bg-blue-600",
        },
        {
          icon: <FaDollarSign />,
          value: "$620,000",
          label: "R&D Qualifying",
          color: "bg-green-600",
        },
        {
          icon: <FaClock />,
          value: "8,500",
          label: "R&D Hours",
          color: "bg-orange-600",
        },
        {
          icon: <FaChartLine />,
          value: "83%",
          label: "R&D Percentage",
          color: "bg-purple-600",
        },
      ],
      costCategories: [
        {
          category: "Personnel Costs",
          rndAmount: 380000,
          nonRndAmount: 70000,
          total: 450000,
          rndPercentage: 84,
        },
        {
          category: "Equipment & Tools",
          rndAmount: 125000,
          nonRndAmount: 25000,
          total: 150000,
          rndPercentage: 83,
        },
        {
          category: "R&D Materials",
          rndAmount: 80000,
          nonRndAmount: 20000,
          total: 100000,
          rndPercentage: 80,
        },
        {
          category: "Testing & Validation",
          rndAmount: 35000,
          nonRndAmount: 15000,
          total: 50000,
          rndPercentage: 70,
        },
      ],
      chartData: [
        {
          name: "Personnel Costs",
          rndExpenditure: 380000,
          nonRndExpenditure: 70000,
        },
        {
          name: "Equipment & Tools",
          rndExpenditure: 125000,
          nonRndExpenditure: 25000,
        },
        {
          name: "R&D Materials",
          rndExpenditure: 80000,
          nonRndExpenditure: 20000,
        },
        {
          name: "Testing & Validation",
          rndExpenditure: 35000,
          nonRndExpenditure: 15000,
        },
      ],
    },
    teamComposition: {
      introText:
        "The R&D team consisted of 10 highly qualified professionals with expertise in manufacturing, robotics, automation, and process engineering. Total R&D hours: 8,500 hours",
      teamMembers: [
        {
          name: "James Wilson",
          role: "Principal Engineer / Project Lead",
          degree: "PhD Mechanical Engineering",
          specializations: ["Automation", "Robotics"],
          hours: 1650,
        },
        {
          name: "Lisa Anderson",
          role: "Senior Robotics Engineer",
          degree: "MSc Robotics",
          specializations: ["Industrial Robotics", "Control Systems"],
          hours: 1580,
        },
        {
          name: "David Brown",
          role: "Process Engineer",
          degree: "BSc Industrial Engineering",
          specializations: ["Process Optimization", "Lean Manufacturing"],
          hours: 1420,
        },
        {
          name: "Maria Garcia",
          role: "Automation Specialist",
          degree: "MSc Automation Engineering",
          specializations: ["PLC Programming", "SCADA"],
          hours: 1380,
        },
      ],
      totalMembers: 10,
      advancedDegrees: 4,
      totalHours: 8500,
      rndFocusRate: 82,
    },
  },
};

//========== Project Details Component ===========
const ProjectDetails: React.FC = () => {
  const params = useParams();
  const { setPageTitle } = usePageTitle();
  const projectId = params.id as string;

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

      <div className=" max-w-6xl mx-auto">
        {/*========= Report Header =========*/}
        <ReportHeader {...reportData.header} />
        {/*========= Executive Summary =========*/}
        <ExecutiveSummary {...reportData.executiveSummary} />
        {/*========= Compliance Score Breakdown =========*/}
        <ComplianceScoreBreakdown
          categories={reportData.complianceScore.categories}
        />
        {/*========= Innovation & Technical Advancement Metrics =========*/}
        <InnovationMetrics metrics={reportData.innovationMetrics.metrics} />
        {/*========= Project Progress & Resource Utilization =========*/}
        <ProgressCharts
          progressData={reportData.progressCharts.progressData}
          resourceData={reportData.progressCharts.resourceData}
        />
        {/*========= Financial Analysis & Budget Breakdown =========*/}
        <FinancialAnalysis
          budgetCards={reportData.financialAnalysis.budgetCards}
          costCategories={reportData.financialAnalysis.costCategories}
          chartData={reportData.financialAnalysis.chartData}
        />
        {/*========= R&D Team Composition & Qualifications =========*/}
        <TeamComposition {...reportData.teamComposition} />
      </div>
    </div>
  );
};

export default ProjectDetails;
