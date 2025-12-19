"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CompletionTimeData } from "@/Type/AdminDashboard/Analytics";

//========== Completion Time Chart Component ==========
const CompletionTimeChart: React.FC = () => {
  //========== Chart Data ==========
  const data: CompletionTimeData[] = [
    { month: "Jan", days: 45 },
    { month: "Feb", days: 42 },
    { month: "Mar", days: 38 },
    { month: "Apr", days: 35 },
    { month: "May", days: 32 },
    { month: "Jun", days: 30 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Average Project Completion Time
      </h3>

      {/*========== Chart ==========*/}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="days"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionTimeChart;
