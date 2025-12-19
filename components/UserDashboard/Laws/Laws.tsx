"use client";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { useEffect, useState } from "react";
import { lawsData } from "@/Data/UserDashboard/lawsData";
import { LawSubsection } from "@/Type/UserDashboard/Laws";
import {
  HiOutlineChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineBeaker,
  HiOutlineSquares2X2,
  HiOutlineListBullet,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineReceiptPercent,
  HiOutlineDocumentText,
  HiOutlineArchiveBox,
  HiOutlineGlobeAlt,
  HiOutlineXCircle,
  HiOutlineBookmark,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineExclamationCircle,
  HiOutlineChevronDown,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/ui/accordion";

const iconMap: Record<string, any> = {
  calculator: HiOutlineCalculator,
  "check-circle": HiOutlineCheckCircle,
  "book-open": HiOutlineBookOpen,
  lightbulb: HiOutlineLightBulb,
  flask: HiOutlineBeaker,
  layers: HiOutlineSquares2X2,
  list: HiOutlineListBullet,
  users: HiOutlineUsers,
  briefcase: HiOutlineBriefcase,
  receipt: HiOutlineReceiptPercent,
  "file-text": HiOutlineDocumentText,
  archive: HiOutlineArchiveBox,
  globe: HiOutlineGlobeAlt,
  "x-circle": HiOutlineXCircle,
  book: HiOutlineBookmark,
  "external-link": HiOutlineArrowTopRightOnSquare,
};

const Laws = () => {
  const { setPageTitle } = usePageTitle();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPageTitle("Laws and Guidelines");
  }, [setPageTitle]);

  const getIcon = (iconName?: string, iconColor?: string) => {
    if (!iconName) return null;
    const Icon = iconMap[iconName];
    return Icon ? (
      <Icon
        className={`w-5 h-5 ${iconColor || "text-gray-600 dark:text-gray-400"}`}
      />
    ) : null;
  };

  const renderSubsectionContent = (subsection: LawSubsection) => {
    return (
      <div className="space-y-4">
        {subsection.content && (
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {Array.isArray(subsection.content) ? (
              <ul className="space-y-2 list-disc list-inside">
                {subsection.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              subsection.content
            )}
          </div>
        )}

        {subsection.checkmarks && subsection.checkmarks.length > 0 && (
          <div className="space-y-2">
            {subsection.checkmarks.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <HiOutlineCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        )}

        {subsection.crossmarks && subsection.crossmarks.length > 0 && (
          <div className="space-y-2">
            {subsection.crossmarks.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <HiOutlineXMark className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        )}

        {subsection.examples && subsection.examples.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">
              Examples:
            </h5>
            <ul className="space-y-1.5 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {subsection.examples.map((example, idx) => (
                <li key={idx}>{example}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

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

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search laws, guidelines, and requirements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <div className="p-4 flex gap-3">
          <HiOutlineExclamationCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
              Important Notice
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              This information is for general guidance only and should not be
              considered legal or tax advice. Always consult with qualified R&D
              tax advisors and refer to the official legislation. The R&D Tax
              Incentive program is subject to changes and updates by the
              Australian Government.
            </p>
          </div>
        </div>
      </Card>

      <Accordion className="space-y-3">
        {filteredSections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center gap-3">
                  <HiOutlineChevronRight className="w-5 h-5 shrink-0" />
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionPanel>
                <div className="px-4 sm:px-6 pb-4 space-y-4 border-t dark:border-gray-700">
                  {section.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 pt-4">
                      {section.description}
                    </p>
                  )}

                  {section.subsections && section.subsections.length > 0 && (
                    <Accordion className="space-y-2">
                      {section.subsections.map((subsection) => (
                        <AccordionItem
                          key={subsection.id}
                          value={subsection.id}
                          className="border dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                              {getIcon(subsection.icon, subsection.iconColor)}
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {subsection.title}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionPanel>
                            <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                              {renderSubsectionContent(subsection)}
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              </AccordionPanel>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="space-y-3 pt-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Official Resources
        </h2>
        <div className="grid gap-3 sm:grid-cols-1">
          {lawsData.officialResources.map((resource) => (
            <Card
              key={resource.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.open(resource.url, "_blank")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {resource.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                </div>
                <HiOutlineArrowTopRightOnSquare className="w-5 h-5 text-gray-400 shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laws;
