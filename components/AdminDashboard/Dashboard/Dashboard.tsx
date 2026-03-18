"use client";
import {
  HiOutlineUsers,
  HiOutlineFolder,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineDocumentText,
  HiOutlineArrowTrendingUp as HiOutlineTrendingUp,
  HiOutlineCog,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import StatCard from "./StatCard";
import QuickActionCard from "./QuickActionCard";
import ActivityItem from "./ActivityItem";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { toastManager } from "@/components/ui/toast";

//========== Admin Dashboard Component ==========
const Dashboard = () => {
  //========== Stats Data ==========
  const axios = useAxios();
  const [Statistics, setStats] = useState({
    totalUsers: 0,
    active_projects: 0,
    pendingReviews: 0,
    inactive_users: 0,
    active_users: 0,
    completed_projects: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("calculations/admin_dashboard/");
        const data = {
          totalUsers: response.data.data.total_users,
          active_projects: response.data.data.active_projects,
          pendingReviews: response.data.data.pending_projects,
          inactive_users: response.data.data.inactive_users,
          active_users: response.data.data.active_users,
          completed_projects: response.data.data.completed_projects,
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
      value: Statistics?.totalUsers||0,
      label: "Total Users",
      bgColor: "bg-blue-50",
      iconBgColor: "bg-white",
    },
    {
      id: "2",
      icon: <HiOutlineFolder size={24} className="text-green-600" />,
      value: Statistics?.active_projects || 0,
      label: "Active Projects",
      bgColor: "bg-green-50",
      iconBgColor: "bg-white",
    },
    {
      id: "3",
      icon: <HiOutlineClock size={24} className="text-orange-600" />,
      value: Statistics?.pendingReviews || 0,
      label: "Pending Reviews",
      changeType: "negative" as const,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-white",
    },
    {
      id: "4",
      icon: <HiOutlineExclamationCircle size={24} className="text-red-600" />,
      value: Statistics?.inactive_users || 0,
      label: "Inactive Users",
      bgColor: "bg-red-50",
      iconBgColor: "bg-white",
    },
    {
      id: "5",
      icon: <HiOutlineDocumentText size={24} className="text-purple-600" />,
      value: Statistics?.active_users || 0,
      label: "Active Users",
      bgColor: "bg-purple-50",
      iconBgColor: "bg-white",
    },
    {
      id: "6",
      icon: <HiOutlineTrendingUp size={24} className="text-blue-600" />,
      value: `${Statistics?.completed_projects || 0}`,
      label: "Completed Projects",
      bgColor: "bg-blue-50",
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
