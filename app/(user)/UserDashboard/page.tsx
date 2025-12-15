"use client";

import React from "react";
import { useAuth } from "@/Components/Providers/AuthProvider";

//========== User Dashboard Page ===========
const page = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/*========= Header =========*/}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome, {user?.name || user?.email}
              </h1>
              <p className="text-gray-600 mt-2">User Dashboard</p>
            </div>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-gray-600 text-sm font-semibold">
              Total Income
            </h2>
            <p className="text-2xl font-bold text-blue-600">$45,000</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-gray-600 text-sm font-semibold">Tax Paid</h2>
            <p className="text-2xl font-bold text-green-600">$9,000</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-gray-600 text-sm font-semibold">Tax Rate</h2>
            <p className="text-2xl font-bold text-purple-600">20%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">2024-01-15</td>
                <td>Salary Deposit</td>
                <td className="text-right">$5,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">2024-01-10</td>
                <td>Freelance Payment</td>
                <td className="text-right">$2,500</td>
              </tr>
              <tr>
                <td className="py-3">2024-01-05</td>
                <td>Investment Income</td>
                <td className="text-right">$1,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
