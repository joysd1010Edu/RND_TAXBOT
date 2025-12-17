"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { MdCheckCircle } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface CategoryScore {
  name: string;
  score: number;
  color: string;
}

interface ComplianceScoreProps {
  categories: CategoryScore[];
}

//========== Compliance Score Breakdown Component ===========
const ComplianceScoreBreakdown: React.FC<ComplianceScoreProps> = ({
  categories,
}) => {
  const pieData = categories.map((cat) => ({
    name: cat.name,
    value: cat.score,
  }));

  const COLORS = categories.map((cat) => cat.color);

  return (
    <div className="bg-white shadow-lg border-t border-l border-r border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
        Compliance Score Breakdown
      </h2>

      {/*========= Two Column Layout =========*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/*========= Left: Pie Chart =========*/}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Score Distribution by Category
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/*========= Right: Detailed Scores =========*/}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Category Scores
          </h3>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-normal text-green-600">
                    {category.score}%
                  </span>
                  <IoMdCheckmarkCircleOutline
                    className="text-green-600"
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScoreBreakdown;
