"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAxios } from "@/Hooks/useAxiosInstance";

interface CompletionTimePoint {
  month: string;
  avg_completion_minutes: number;
}

//========== Completion Time Chart Component ==========
const CompletionTimeChart: React.FC = () => {
  const axios = useAxios();
  const [data, setData] = useState<CompletionTimePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "calculations/analytics/avg_completion_time/",
      );
      if (response.data?.success && Array.isArray(response.data.data)) {
        setData(
          response.data.data.map(
            (item: { month: string; avg_completion_minutes: number }) => ({
              month: item.month,
              avg_completion_minutes: Number(
                item.avg_completion_minutes.toFixed(1),
              ),
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

  const defaultData: CompletionTimePoint[] = [
    { month: "Jan", avg_completion_minutes: 0 },
    { month: "Feb", avg_completion_minutes: 0 },
    { month: "Mar", avg_completion_minutes: 0 },
    { month: "Apr", avg_completion_minutes: 0 },
    { month: "May", avg_completion_minutes: 0 },
    { month: "Jun", avg_completion_minutes: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Average Project Completion Time
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
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              label={{
                value: "Minutes",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#6b7280" },
              }}
            />
            <Tooltip formatter={(value) => [`${value} min`, "Avg Time"]} />
            <Line
              type="monotone"
              dataKey="avg_completion_minutes"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Avg Completion Time"
              dot={{ fill: "#3b82f6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CompletionTimeChart;
