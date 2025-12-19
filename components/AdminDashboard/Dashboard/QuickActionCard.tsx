"use client";
import React from "react";
import Link from "next/link";
import type { QuickActionCardProps } from "@/Type/AdminDashboard/Dashboard";

//========== Quick Action Card Component ==========
const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  description,
  href,
  iconColor,
}) => {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
    >
      {/*========== Icon ==========*/}
      <div className={`${iconColor} mb-4`}>{icon}</div>

      {/*========== Title and Description ==========*/}
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
