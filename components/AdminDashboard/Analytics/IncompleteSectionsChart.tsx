"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAxios } from "@/Hooks/useAxiosInstance";

interface FeedbackDataPoint {
  category: string;
  rating: number;
}

//========== User Feedback Chart Component ==========
const IncompleteSectionsChart: React.FC = () => {
  const axios = useAxios();
  const [data, setData] = useState<FeedbackDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "calculations/analytics/avg_user_rating/",
      );
      if (
        response.data?.success &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const items = response.data.data as {
          avg_q1: number;
          avg_q2: number;
          avg_q3: number;
          avg_q4: number;
          avg_others: number;
        }[];
        const len = items.length;
        const avg = (key: keyof (typeof items)[0]) =>
          Number(
            (items.reduce((sum, i) => sum + (i[key] ?? 0), 0) / len).toFixed(1),
          );
        setData([
          { category: "Q1", rating: avg("avg_q1") },
          { category: "Q2", rating: avg("avg_q2") },
          { category: "Q3", rating: avg("avg_q3") },
          { category: "Q4", rating: avg("avg_q4") },
          { category: "Others", rating: avg("avg_others") },
        ]);
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

  const defaultData: FeedbackDataPoint[] = [
    { category: "Q1", rating: 0 },
    { category: "Q2", rating: 0 },
    { category: "Q3", rating: 0 },
    { category: "Q4", rating: 0 },
    { category: "Others", rating: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/*========== Header ==========*/}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        User Feedback
      </h3>

      {/*========== Chart ==========*/}
      {isLoading ? (
        <div className="flex items-center justify-center h-75">
          <p className="text-gray-400">Loading...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
            />
            <Tooltip formatter={(value) => [`${value} / 5`, "Avg Rating"]} />
            <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncompleteSectionsChart;
