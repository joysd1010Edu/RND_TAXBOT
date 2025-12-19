"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { IncompleteSectionData } from "@/Type/AdminDashboard/Analytics";

//========== Incomplete Sections Chart Component ==========
const IncompleteSectionsChart: React.FC = () => {
  //========== Chart Data ==========
  const data: IncompleteSectionData[] = [
    { section: "Project Overview", count: 5 },
    { section: "Technical Challenges", count: 18 },
    { section: "Budget Planning", count: 12 },
    { section: "Resource Allocation", count: 8 },
    { section: "Risk Assessment", count: 15 },
    { section: "Evidence Upload", count: 21 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Sections Most Often Incomplete
      </h3>

      {/*========== Chart ==========*/}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" stroke="#6b7280" fontSize={12} />
          <YAxis
            dataKey="section"
            type="category"
            stroke="#6b7280"
            fontSize={12}
            width={150}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncompleteSectionsChart;
