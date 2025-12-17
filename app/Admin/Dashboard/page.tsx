"use client";

import React, { useEffect } from "react";
import { MdPeople, MdAssignment, MdPendingActions } from "react-icons/md";
import StatCard from "@/Components/Shared/Cards/StatCard";
import { usePageTitle } from "@/Components/Providers/PageTitleProvider";

//========== Admin Dashboard Page ===========
const Page = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);
  return (
    <div className="space-y-6">
      {/*========= Welcome Section =========*/}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Overview
        </h2>
        <p className="text-gray-600">
          Manage users, projects, and monitor system activities
        </p>
      </div>

      {/*========= Stats Cards =========*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value="0"
          icon={<MdPeople size={28} className="text-blue-600" />}
          bgColor="bg-blue-50"
          iconBgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatCard
          title="Active Projects"
          value="0"
          icon={<MdAssignment size={28} className="text-green-600" />}
          bgColor="bg-green-50"
          iconBgColor="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Pending Reviews"
          value="0"
          icon={<MdPendingActions size={28} className="text-orange-600" />}
          bgColor="bg-orange-50"
          iconBgColor="bg-orange-100"
          textColor="text-orange-600"
        />
      </div>

      {/*========= Additional Admin Content Can Go Here =========*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <p className="text-gray-500 text-sm">
            No recent activities to display
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
