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

interface RatingTrendPoint {
  month: string;
  avg_score: number;
}

interface UserRatingChartProps {
  data: RatingTrendPoint[];
  overall: {
    avg_score: number;
    avg_technical_uncertainty: number;
    avg_systematic_progression: number;
    avg_new_knowledge: number;
    avg_evidence_documentation: number;
  };
  isLoading: boolean;
}

//========== User Rating Chart Component ==========
const IncompleteSectionsChart: React.FC<UserRatingChartProps> = ({
  data,
  overall,
  isLoading,
}) => {
  const defaultData: RatingTrendPoint[] = [
    { month: "Jan", avg_score: 0 },
    { month: "Feb", avg_score: 0 },
    { month: "Mar", avg_score: 0 },
    { month: "Apr", avg_score: 0 },
    { month: "May", avg_score: 0 },
    { month: "Jun", avg_score: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Average User Rating
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
            <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value} / 100`, "Avg Score"]} />
            <Line
              type="monotone"
              dataKey="avg_score"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Avg Score"
              dot={{ fill: "#f59e0b", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Overall Score
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {overall.avg_score.toFixed(1)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Technical Uncertainty
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {overall.avg_technical_uncertainty.toFixed(1)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Systematic Progression
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {overall.avg_systematic_progression.toFixed(1)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Evidence Documentation
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {overall.avg_evidence_documentation.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncompleteSectionsChart;
