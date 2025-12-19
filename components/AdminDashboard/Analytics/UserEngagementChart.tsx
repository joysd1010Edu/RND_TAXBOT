"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { EngagementDataPoint } from "@/Type/AdminDashboard/Analytics";

//========== User Engagement Chart Component ==========
const UserEngagementChart: React.FC = () => {
  //========== Chart Data ==========
  const data: EngagementDataPoint[] = [
    { month: "Jan", activeUsers: 45, inactiveUsers: 12 },
    { month: "Feb", activeUsers: 52, inactiveUsers: 15 },
    { month: "Mar", activeUsers: 48, inactiveUsers: 18 },
    { month: "Apr", activeUsers: 63, inactiveUsers: 10 },
    { month: "May", activeUsers: 58, inactiveUsers: 13 },
    { month: "Jun", activeUsers: 67, inactiveUsers: 11 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        User Engagement Trends
      </h3>

      {/*========== Chart ==========*/}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#10b981"
            strokeWidth={2}
            name="Active Users"
            dot={{ fill: "#10b981", r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="inactiveUsers"
            stroke="#ef4444"
            strokeWidth={2}
            name="Inactive Users"
            dot={{ fill: "#ef4444", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagementChart;
