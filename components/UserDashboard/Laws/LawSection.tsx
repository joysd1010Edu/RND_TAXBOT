"use client";
import { LawSection as LawSectionType } from "@/Type/UserDashboard/Laws";
import { Card } from "@/components/ui/card";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Accordion,
} from "@/components/ui/accordion";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { LawSubsection } from "./LawSubsection";

interface LawSectionProps {
  section: LawSectionType;
}

export const LawSection = ({ section }: LawSectionProps) => {
  return (
    <AccordionItem value={section.id}>
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
                  <LawSubsection key={subsection.id} subsection={subsection} />
                ))}
              </Accordion>
            )}
          </div>
        </AccordionPanel>
      </Card>
    </AccordionItem>
  );
};
