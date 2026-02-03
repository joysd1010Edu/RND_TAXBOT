"use client";
import { Card } from "@/components/ui/card";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export const LawNotice = () => {
  return (
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
  );
};
