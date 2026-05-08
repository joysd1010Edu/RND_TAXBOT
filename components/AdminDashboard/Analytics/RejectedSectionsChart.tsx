"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { RejectedSectionData } from "@/Type/AdminDashboard/Analytics";

//========== Rejected Sections Chart Component ==========
const RejectedSectionsChart: React.FC = () => {
  //========== Chart Data ==========
  const info: RejectedSectionData[] = [
    { name: "Technical Challenges", value: 35, color: "#ef4444" },
    { name: "Budget Details", value: 28, color: "#f97316" },
    { name: "Risk Assessment", value: 18, color: "#eab308" },
    { name: "Evidence Quality", value: 22, color: "#84cc16" },
  ];

  //========== Custom Label ==========
  const renderCustomLabel = (entry: RejectedSectionData) => {
    return `${entry.name}: ${entry.value}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Most Common Rejected Sections
      </h3>

      {/*========== Chart ==========*/}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={info as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {info.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RejectedSectionsChart;
