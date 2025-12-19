"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import AnalyticsStatCard from "./AnalyticsStatCard";
import UserEngagementChart from "./UserEngagementChart";
import IncompleteSectionsChart from "./IncompleteSectionsChart";
import CompletionTimeChart from "./CompletionTimeChart";
import RejectedSectionsChart from "./RejectedSectionsChart";
import IncompleteUsersTable from "./IncompleteUsersTable";
import type { IncompleteUser } from "@/Type/AdminDashboard/Analytics";
import { LuUserMinus, LuUsers } from "react-icons/lu";
import { IoPulseSharp, IoWarningOutline } from "react-icons/io5";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";

//========== Analytics Component ==========
const Analysis = () => {
  const { setPageTitle } = usePageTitle();
  useEffect(() => {
    setPageTitle("Analytics & Reporting");
  }, [setPageTitle]);

  //========== Stats Data ==========
  const stats = [
    {
      id: "1",
      icon: <LuUsers size={24} />,
      label: "Active Users",
      value: 67,
      subtext: "+15% from last month",
      subtextType: "positive" as const,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "2",
      icon: <LuUserMinus size={24} />,
      label: "Inactive Users",
      value: 11,
      subtext: "Needs attention",
      subtextType: "negative" as const,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: "3",
      icon: <IoPulseSharp size={24} />,
      label: "Avg Completion Time",
      value: "30 days",
      subtext: "33% improvement",
      subtextType: "positive" as const,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: "4",
      icon: <IoWarningOutline size={24} />,
      label: "Stuck Projects",
      value: 8,
      subtext: "No activity 14+ days",
      subtextType: "warning" as const,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  //========== Incomplete Users Data ==========
  const incompleteUsers: IncompleteUser[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      project: "Website Redesign",
      incompleteSection: "Technical Challenges",
      daysInactive: 7,
      daysInactiveColor: "text-yellow-600",
      lastActivity: "7 days ago",
      remindersSent: 1,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@innovative.io",
      project: "Mobile App Development",
      incompleteSection: "Budget Planning",
      daysInactive: 14,
      daysInactiveColor: "text-orange-600",
      lastActivity: "2 weeks ago",
      remindersSent: 2,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "mchen@startup.io",
      project: "Data Analytics Platform",
      incompleteSection: "Evidence Upload",
      daysInactive: 21,
      daysInactiveColor: "text-red-600",
      lastActivity: "3 weeks ago",
      remindersSent: 3,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@designstudio.com",
      project: "Cloud Migration",
      incompleteSection: "Resource Allocation",
      daysInactive: 10,
      daysInactiveColor: "text-orange-600",
      lastActivity: "10 days ago",
      remindersSent: 1,
    },
  ];

  return (
    <div className="space-y-8 px-0 md:px-8 lg:px-20 py-4">
      {/*========== Back Button and Header ==========*/}
      <div>
        <Link
          href="/Admin/Dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics & Reporting
        </h1>
        <p className="text-gray-600">
          Monitor user engagement, track completion rates, and manage inactive
          users
        </p>
      </div>

      {/*========== Stats Grid ==========*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <AnalyticsStatCard
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            subtext={stat.subtext}
            subtextType={stat.subtextType}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/*========== Charts Grid ==========*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserEngagementChart />
        <IncompleteSectionsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompletionTimeChart />
        <RejectedSectionsChart />
      </div>

      {/*========== Incomplete Users Table ==========*/}
      <IncompleteUsersTable users={incompleteUsers} />
    </div>
  );
};

export default Analysis;
