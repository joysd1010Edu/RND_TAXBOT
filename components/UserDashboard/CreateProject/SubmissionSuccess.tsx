"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

const SubmissionSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/*========================= Success Icon =========================*/}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        {/*========================= Success Message =========================*/}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Submission Successful!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Your R&D Project has been successfully submitted for review. Our
            expert panel will carefully evaluate your submission.
          </p>
        </div>

        {/*========================= Action Buttons =========================*/}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button
            onClick={() => router.push("/user/MyProjects")}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-8 py-6 text-base flex items-center gap-2"
          >
            <HiOutlineEye className="w-5 h-5" />
            <span>View Submitted Project</span>
          </Button>

          <Button
            onClick={() => router.push("/user/CreateProject")}
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-base flex items-center gap-2"
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>Create New R&D Project</span>
          </Button>

          <Button
            onClick={() => router.push("/user/UserDashboard")}
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-base flex items-center gap-2"
          >
            <HiOutlineSquares2X2 className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
