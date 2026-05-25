"use client";
import {
  HiOutlineUsers,
  HiOutlineFolder,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog,
} from "react-icons/hi2";
import StatCard from "./StatCard";
import QuickActionCard from "./QuickActionCard";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { toastManager } from "@/components/ui/toast";

type AdminDashboardStats = {
  users: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
    inactive: number;
  };
  projects: {
    total: number;
    draft: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  reports: {
    avg_score: number;
  };
  support_tickets: {
    open: number;
    ongoing: number;
    resolved: number;
  };
};

//========== Admin Dashboard Component ==========
const Dashboard = () => {
  //========== Stats Data ==========
  const axios = useAxios();
  const [statistics, setStats] = useState<AdminDashboardStats>({
    users: {
      total: 0,
      active: 0,
      pending: 0,
      suspended: 0,
      inactive: 0,
    },
    projects: {
      total: 0,
      draft: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    reports: {
      avg_score: 0,
    },
    support_tickets: {
      open: 0,
      ongoing: 0,
      resolved: 0,
    },
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("calculations/admin_dashboard/");
        const dashboardData = response.data?.data ?? response.data;
        const data: AdminDashboardStats = {
          users: {
            total: dashboardData.users?.total ?? 0,
            active: dashboardData.users?.active ?? 0,
            pending: dashboardData.users?.pending ?? 0,
            suspended: dashboardData.users?.suspended ?? 0,
            inactive: dashboardData.users?.inactive ?? 0,
          },
          projects: {
            total: dashboardData.projects?.total ?? 0,
            draft: dashboardData.projects?.draft ?? 0,
            pending: dashboardData.projects?.pending ?? 0,
            approved: dashboardData.projects?.approved ?? 0,
            rejected: dashboardData.projects?.rejected ?? 0,
          },
          reports: {
            avg_score: dashboardData.reports?.avg_score ?? 0,
          },
          support_tickets: {
            open: dashboardData.support_tickets?.open ?? 0,
            ongoing: dashboardData.support_tickets?.ongoing ?? 0,
            resolved: dashboardData.support_tickets?.resolved ?? 0,
          },
        };
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        toastManager.add({
          title: "Error",
          description:
            "Failed to load dashboard statistics. Please try again later.",
        });
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      id: "1",
      icon: <HiOutlineUsers size={24} className="text-blue-600" />,
      value: statistics.users.total || 0,
      label: "Total Users",
      change: "-",
      changeType: "positive" as const,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-white",
    },
    {
      id: "2",
      icon: <HiOutlineUsers size={24} className="text-emerald-600" />,
      value: statistics.users.active || 0,
      label: "Active Users",
      change: "-",
      changeType: "positive" as const,
      bgColor: "bg-emerald-50",
      iconBgColor: "bg-white",
    },
    {
      id: "3",
      icon: <HiOutlineFolder size={24} className="text-green-600" />,
      value: statistics.projects.total || 0,
      label: "Total Projects",
      change: "-",
      changeType: "positive" as const,
      bgColor: "bg-green-50",
      iconBgColor: "bg-white",
    },
    {
      id: "4",
      icon: <HiOutlineClock size={24} className="text-orange-600" />,
      value: statistics.projects.pending || 0,
      label: "Pending Projects",
      change: "-",
      changeType: "negative" as const,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-white",
    },
    {
      id: "5",
      icon: <HiOutlineDocumentText size={24} className="text-purple-600" />,
      value: statistics.projects.approved || 0,
      label: "Approved Projects",
      change: "-",
      changeType: "positive" as const,
      bgColor: "bg-purple-50",
      iconBgColor: "bg-white",
    },
    {
      id: "6",
      icon: <HiOutlineChartBar size={24} className="text-sky-600" />,
      value: statistics.reports.avg_score || 0,
      label: "Average Report Score",
      change: "-",
      changeType: "positive" as const,
      bgColor: "bg-sky-50",
      iconBgColor: "bg-white",
    },
  ];

  //========== Quick Actions Data ==========
  const quickActions = [
    {
      id: "1",
      icon: <HiOutlineUsers size={24} />,
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/Admin/userManagement",
      iconColor: "text-blue-600",
    },
    {
      id: "2",
      icon: <HiOutlineFolder size={24} />,
      title: "Manage Projects",
      description: "Review and approve projects",
      href: "/Admin/projectManagement",
      iconColor: "text-green-600",
    },
    {
      id: "4",
      icon: <HiOutlineCog size={24} />,
      title: "Settings",
      description: "Configure system settings",
      href: "/Admin/settings",
      iconColor: "text-gray-600",
    },
  ];

  //========== Recent Activities Data ==========
  const recentActivities = [
    {
      id: "1",
      user: "John Smith",
      action: "completed project submission",
      project: "Website Redesign",
      timestamp: "5 minutes ago",
    },
    {
      id: "2",
      user: "Sarah Johnson",
      action: "requested clarification on",
      project: "Mobile App Dev",
      timestamp: "12 minutes ago",
    },
    {
      id: "3",
      user: "Admin",
      action: "approved section for",
      project: "Data Platform",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      user: "Michael Chen",
      action: "uploaded evidence to",
      project: "Cloud Migration",
      timestamp: "2 hours ago",
    },
    {
      id: "5",
      user: "Emily Davis",
      action: "started new project",
      project: "AI Integration",
      timestamp: "3 hours ago",
    },
  ];
  return (
    <div className="space-y-8  mx-auto py-4 md:px-20 sm:p-6 ">
      {/*========== Welcome Section ==========*/}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back, Admin
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your platform today
        </p>
      </div>

      {/*========== Stats Grid ==========*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            change={stat.change}
            changeType={stat.changeType}
            bgColor={stat.bgColor}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/*========== Quick Actions ==========*/}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.id}
              icon={action.icon}
              title={action.title}
              description={action.description}
              href={action.href}
              iconColor={action.iconColor}
            />
          ))}
        </div>
      </div>

      {/*========== Recent Activity ==========*/}
      {/* <div className="bg-white  rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div>
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              user={activity.user}
              action={activity.action}
              project={activity.project}
              timestamp={activity.timestamp}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
