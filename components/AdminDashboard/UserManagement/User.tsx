"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import UserTable from "./UserTable";

//========== User Management Component ==========
const User = () => {
  return (
    <div className="space-y-8 px-0 md:px-8 lg:px-20 py-4">
      {/*========== Back Button and Header ==========*/}
      <div>
        <Link
          href="/Admin/Dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <HiOutlineArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">
          Manage user accounts, reset passwords, and handle support
        </p>
      </div>

      {/*========== User Table ==========*/}
      <UserTable />
    </div>
  );
};

export default User;
