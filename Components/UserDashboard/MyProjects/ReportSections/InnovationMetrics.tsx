"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface InnovationMetricsProps {
  metrics: {
    subject: string;
    value: number;
    fullMark: number;
  }[];
}

//========== Innovation & Technical Advancement Metrics Component ===========
const InnovationMetrics: React.FC<InnovationMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white shadow-lg border-b border-l border-r border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
        Innovation & Technical Advancement Metrics
      </h2>

      {/*========= Radar Chart =========*/}
      <div className="w-full h-96 sm:h-125">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={metrics}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "#6b7280" }}
            />
            <Radar
              name="Innovation Score"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InnovationMetrics;
