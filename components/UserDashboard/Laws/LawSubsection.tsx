"use client";
import { LawSubsection as LawSubsectionType } from "@/Type/UserDashboard/Laws";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/ui/accordion";
import {
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
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

interface LawSubsectionProps {
  subsection: LawSubsectionType;
}

export const LawSubsection = ({ subsection }: LawSubsectionProps) => {
  const getIcon = (iconName?: string, iconColor?: string) => {
    if (!iconName) return null;
    const Icon = iconMap[iconName];
    return Icon ? (
      <Icon
        className={`w-5 h-5 ${iconColor || "text-gray-600 dark:text-gray-400"}`}
      />
    ) : null;
  };

  const renderContent = () => {
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
            <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">
              Requirements & Key Points:
            </h5>
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
            <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">
              Not Eligible:
            </h5>
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

  return (
    <AccordionItem
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
          {renderContent()}
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};
