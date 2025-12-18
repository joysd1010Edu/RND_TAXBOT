"use client";

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ProgressChartsProps {
  progressData: {
    month: string;
    activitiesCompleted: number;
    complianceScore: number;
  }[];
  resourceData: {
    month: string;
    budgetUtilization: number;
    rndHours: number;
  }[];
}

//========== Project Progress Charts Component ===========
const ProgressCharts: React.FC<ProgressChartsProps> = ({
  progressData,
  resourceData,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Project Progress Over Time =========*/}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
          Project Progress Over Time
        </h2>
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="activitiesCompleted"
                stroke="#10b981"
                strokeWidth={2}
                name="Activities Completed (%)"
                dot={{ fill: "#10b981", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="complianceScore"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Compliance Score (%)"
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*========= Resource Utilization Timeline =========*/}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
          Resource Utilization Timeline
        </h2>
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={resourceData}>
              <defs>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
                label={{
                  value: "Budget %",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#6b7280",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
                label={{
                  value: "R&D Hours",
                  angle: 90,
                  position: "insideRight",
                  fill: "#6b7280",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="budgetUtilization"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorBudget)"
                name="Budget Utilization (%)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="rndHours"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorHours)"
                name="R&D Hours"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
