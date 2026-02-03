"use client";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { useEffect, useState } from "react";
import { lawsData } from "@/Data/UserDashboard/lawsData";
import { Accordion } from "@/components/ui/accordion";
import { LawSearch } from "./LawSearch";
import { LawNotice } from "./LawNotice";
import { LawSection } from "./LawSection";
import { OfficialResources } from "./OfficialResources";

const Laws = () => {
  const { setPageTitle } = usePageTitle();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPageTitle("Laws and Guidelines");
  }, [setPageTitle]);

  const filteredSections = lawsData.sections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description?.toLowerCase().includes(query) ||
      section.subsections?.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          (typeof sub.content === "string" &&
            sub.content.toLowerCase().includes(query))
      )
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          R&D Tax Incentive Laws & Guidelines
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Australian legislation and compliance requirements
        </p>
      </div>

      <LawSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <LawNotice />

      <Accordion className="space-y-3">
        {filteredSections.map((section) => (
          <LawSection key={section.id} section={section} />
        ))}
      </Accordion>

      <OfficialResources resources={lawsData.officialResources} />
    </div>
  );
};

export default Laws;
