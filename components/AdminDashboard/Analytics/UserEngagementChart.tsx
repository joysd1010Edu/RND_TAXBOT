"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import { useAxios } from "@/Hooks/useAxiosInstance";

interface ActivityDataPoint {
  month: string;
  active: number;
  pending: number;
}

//========== User Engagement Chart Component ==========
const UserEngagementChart: React.FC = () => {
  const axios = useAxios();
  const [data, setData] = useState<ActivityDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("calculations/analytics/user_activity/");
      if (
        response.data?.success &&
        Array.isArray(response.data.monthly_registrations)
      ) {
        setData(
          response.data.monthly_registrations.map(
            (item: ActivityDataPoint) => ({
              month: item.month,
              active: item.active,
              pending: item.pending,
            }),
          ),
        );
      }
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultData: ActivityDataPoint[] = [
    { month: "Jan", active: 0, pending: 0 },
    { month: "Feb", active: 0, pending: 0 },
    { month: "Mar", active: 0, pending: 0 },
    { month: "Apr", active: 0, pending: 0 },
    { month: "May", active: 0, pending: 0 },
    { month: "Jun", active: 0, pending: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        User Engagement Trends
      </h3>

      {/*========== Chart ==========*/}
      {isLoading ? (
        <div className="flex items-center justify-center h-75">
          <p className="text-gray-400">Loading...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#10b981"
              strokeWidth={2}
              name="Active Users"
              dot={{ fill: "#10b981", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Pending Users"
              dot={{ fill: "#f59e0b", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserEngagementChart;
