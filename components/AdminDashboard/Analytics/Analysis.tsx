"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import AnalyticsStatCard from "./AnalyticsStatCard";
import UserEngagementChart from "./UserEngagementChart";
import IncompleteSectionsChart from "./IncompleteSectionsChart";
import CompletionTimeChart from "./CompletionTimeChart";
import IncompleteUsersTable from "./IncompleteUsersTable";
import type { IncompleteUser } from "@/Type/AdminDashboard/Analytics";
import { LuUsers } from "react-icons/lu";
import { IoPulseSharp, IoWarningOutline } from "react-icons/io5";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { toastManager } from "@/components/ui/toast";
import { useAxios } from "@/Hooks/useAxiosInstance";

type UserActivityPoint = {
  month: string;
  active: number;
  pending: number;
};

type CompletionTimePoint = {
  month: string;
  avg_days: number;
  project_count: number;
};

type RatingTrendPoint = {
  month: string;
  avg_score: number;
  project_count: number;
};

type DashboardAnalytics = {
  userActivity: UserActivityPoint[];
  completionTime: CompletionTimePoint[];
  ratingTrend: RatingTrendPoint[];
  overallRating: {
    avg_score: number;
    avg_technical_uncertainty: number;
    avg_systematic_progression: number;
    avg_new_knowledge: number;
    avg_evidence_documentation: number;
  };
  summary: {
    pending_users: number;
    inactive_users: number;
  };
};

//========== Analytics Component ==========
const Analysis = () => {
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    userActivity: [],
    completionTime: [],
    ratingTrend: [],
    overallRating: {
      avg_score: 0,
      avg_technical_uncertainty: 0,
      avg_systematic_progression: 0,
      avg_new_knowledge: 0,
      avg_evidence_documentation: 0,
    },
    summary: {
      pending_users: 0,
      inactive_users: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const { setPageTitle } = usePageTitle();
  useEffect(() => {
    setPageTitle("Analytics & Reporting");
  }, [setPageTitle]);
  const axios = useAxios();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [activityResponse, completionResponse, ratingResponse] =
          await Promise.all([
            axios.get("calculations/analytics/user_activity/"),
            axios.get("calculations/analytics/avg_completion_time/"),
            axios.get("calculations/analytics/avg_user_rating/"),
          ]);

        const userActivity = Array.isArray(
          activityResponse.data?.monthly_registrations,
        )
          ? activityResponse.data.monthly_registrations.map(
              (item: UserActivityPoint) => ({
                month: item.month,
                active: Number(item.active ?? 0),
                pending: Number(item.pending ?? 0),
              }),
            )
          : [];

        const completionTime = Array.isArray(completionResponse.data?.data)
          ? completionResponse.data.data.map((item: CompletionTimePoint) => ({
              month: item.month,
              avg_days: Number(item.avg_days ?? 0),
              project_count: Number(item.project_count ?? 0),
            }))
          : [];

        const ratingTrend = Array.isArray(
          ratingResponse.data?.data?.monthly_trend,
        )
          ? ratingResponse.data.data.monthly_trend.map(
              (item: RatingTrendPoint) => ({
                month: item.month,
                avg_score: Number(item.avg_score ?? 0),
                project_count: Number(item.project_count ?? 0),
              }),
            )
          : [];

        setAnalytics({
          userActivity,
          completionTime,
          ratingTrend,
          overallRating: {
            avg_score: Number(
              ratingResponse.data?.data?.overall?.avg_score ?? 0,
            ),
            avg_technical_uncertainty: Number(
              ratingResponse.data?.data?.overall?.avg_technical_uncertainty ??
                0,
            ),
            avg_systematic_progression: Number(
              ratingResponse.data?.data?.overall?.avg_systematic_progression ??
                0,
            ),
            avg_new_knowledge: Number(
              ratingResponse.data?.data?.overall?.avg_new_knowledge ?? 0,
            ),
            avg_evidence_documentation: Number(
              ratingResponse.data?.data?.overall?.avg_evidence_documentation ??
                0,
            ),
          },
          summary: {
            pending_users: Number(
              activityResponse.data?.summary?.pending_users ?? 0,
            ),
            inactive_users: Number(
              activityResponse.data?.summary?.inactive_users ?? 0,
            ),
          },
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        toastManager.add({
          title: "Error",
          description:
            "Failed to load dashboard statistics. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const latestActiveUsers =
    analytics.userActivity.length > 0
      ? analytics.userActivity[analytics.userActivity.length - 1].active
      : 0;

  //========== Stats Data ==========
  const stats = [
    {
      id: "1",
      icon: <LuUsers size={24} />,
      label: "Active Users",
      value: latestActiveUsers,
      subtext: "Latest month activity",
      subtextType: "positive" as const,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "2",
      icon: <IoWarningOutline size={24} />,
      label: "Pending Users",
      value: analytics.summary.pending_users || 0,
      subtext: "Awaiting review",
      subtextType: "negative" as const,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },

    {
      id: "4",
      icon: <IoPulseSharp size={24} />,
      label: "Inactive Users",
      value: analytics.summary.inactive_users || 0,
      subtext: "Needs attention",
      subtextType: "warning" as const,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: "5",
      icon: <LuUsers size={24} />,
      label: "Average Score",
      value: analytics.overallRating.avg_score || 0,
      subtext: "Overall report score",
      subtextType: "positive" as const,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
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
        <UserEngagementChart
          data={analytics.userActivity}
          isLoading={isLoading}
        />
        <IncompleteSectionsChart
          data={analytics.ratingTrend}
          overall={analytics.overallRating}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1  gap-6">
        <CompletionTimeChart
          data={analytics.completionTime}
          isLoading={isLoading}
        />
      </div>

      {/*========== Incomplete Users Table ==========*/}
      {/* <IncompleteUsersTable users={incompleteUsers} /> */}
    </div>
  );
};

export default Analysis;
