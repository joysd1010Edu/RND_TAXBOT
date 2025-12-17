"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaDollarSign, FaClock, FaChartLine } from "react-icons/fa";

interface BudgetCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

interface CostCategory {
  category: string;
  rndAmount: number;
  nonRndAmount: number;
  total: number;
  rndPercentage: number;
}

interface FinancialAnalysisProps {
  budgetCards: BudgetCard[];
  costCategories: CostCategory[];
  chartData: {
    name: string;
    rndExpenditure: number;
    nonRndExpenditure: number;
  }[];
}

//========== Financial Analysis Component ===========
const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({
  budgetCards,
  costCategories,
  chartData,
}) => {
  const totalRnd = costCategories.reduce((sum, cat) => sum + cat.rndAmount, 0);
  const totalNonRnd = costCategories.reduce(
    (sum, cat) => sum + cat.nonRndAmount,
    0
  );
  const grandTotal = totalRnd + totalNonRnd;
  const overallRndPercentage = Math.round((totalRnd / grandTotal) * 100);

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-8">
      {/*========= Section Title =========*/}
      <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
        Financial Analysis & Budget Breakdown
      </h2>

      {/*========= Budget Cards =========*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {budgetCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-xl p-6 text-white`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-2xl sm:text-3xl font-normal mb-1">
              {card.value}
            </div>
            <div className="text-sm font-medium opacity-90">{card.label}</div>
          </div>
        ))}
      </div>

      {/*========= Detailed Cost Breakdown Table =========*/}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Detailed Cost Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  Cost Category
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  R&D Amount
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  Non-R&D Amount
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  Total
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  R&D %
                </th>
              </tr>
            </thead>
            <tbody>
              {costCategories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-900 border-b border-gray-100">
                    {category.category}
                  </td>
                  <td className="p-4 text-sm text-green-600 font-medium text-right border-b border-gray-100">
                    ${category.rndAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600 text-right border-b border-gray-100">
                    ${category.nonRndAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-900 font-medium text-right border-b border-gray-100">
                    ${category.total.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-blue-600 font-semibold text-right border-b border-gray-100">
                    {category.rndPercentage}%
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="p-4 text-sm text-gray-900 border-t-2 border-gray-300">
                  Total
                </td>
                <td className="p-4 text-sm text-green-600 text-right border-t-2 border-gray-300">
                  ${totalRnd.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-gray-600 text-right border-t-2 border-gray-300">
                  ${totalNonRnd.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-gray-900 text-right border-t-2 border-gray-300">
                  ${grandTotal.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-blue-600 text-right border-t-2 border-gray-300">
                  {overallRndPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/*========= Cost Distribution Chart =========*/}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Cost Distribution by Category
        </h3>
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                stroke="#9ca3af"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#9ca3af"
                label={{
                  value: "Amount ($)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#6b7280",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) =>
                  value !== undefined
                    ? `$${(value as number).toLocaleString()}`
                    : ""
                }
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Bar
                dataKey="rndExpenditure"
                fill="#10b981"
                name="R&D Expenditure"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="nonRndExpenditure"
                fill="#9ca3af"
                name="Non-R&D Expenditure"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
