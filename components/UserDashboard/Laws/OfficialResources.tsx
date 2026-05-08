"use client";
import { OfficialResource } from "@/Type/UserDashboard/Laws";
import { Card } from "@/components/ui/card";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

interface OfficialResourcesProps {
  resources: OfficialResource[];
}

export const OfficialResources = ({ resources }: OfficialResourcesProps) => {
  return (
    <div className="space-y-3 pt-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
        Official Resources
      </h2>
      <div className="grid gap-3 sm:grid-cols-1">
        {resources.map((resource) => (
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
  );
};
