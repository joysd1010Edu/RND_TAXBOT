"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import AdminAccountsTab from "./AdminAccountsTab";
import ComplianceRulesTab from "./ComplianceRulesTab";
import AIQuestionsTab from "./AIQuestionsTab";
import EmailTemplatesTab from "./EmailTemplatesTab";

//========== Tab Type ==========
type TabType = "admin" | "compliance" | "questions" | "email";

//========== Settings Component ==========
const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabType>("admin");

  //========== Tab Configuration ==========
  const tabs = [
    {
      id: "admin" as TabType,
      label: "Admin Accounts",
      icon: HiOutlineUserGroup,
    },
    {
      id: "compliance" as TabType,
      label: "Compliance Rules",
      icon: HiOutlineShieldCheck,
    },
    {
      id: "questions" as TabType,
      label: "AI Questions",
      icon: HiOutlineDocumentText,
    },
    {
      id: "email" as TabType,
      label: "Email Templates",
      icon: HiOutlineEnvelope,
    },
  ];

  return (
    <div className="space-y-8 px-0 md:px-8 lg:px-16 py-6">
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
          Settings Management
        </h1>
        <p className="text-gray-600">
          Configure system settings, compliance rules, and templates
        </p>
      </div>

      {/*========== Tab Navigation ==========*/}
      <div className="border-b border-gray-200">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/*========== Tab Content ==========*/}
      <div className="pb-8">
        {activeTab === "admin" && <AdminAccountsTab />}
        {activeTab === "compliance" && <ComplianceRulesTab />}
        {activeTab === "questions" && <AIQuestionsTab />}
        {activeTab === "email" && <EmailTemplatesTab />}
      </div>
    </div>
  );
};

export default Settings;
