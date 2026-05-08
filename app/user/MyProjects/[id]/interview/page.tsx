"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import ProjectInterview from "@/components/UserDashboard/MyProjects/ProjectInterview";

const InterviewLoadingSkeleton = () => (
  <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
    <div className="text-center">
      <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-lg text-gray-600">Loading AI Interview...</p>
    </div>
  </div>
);

const InterviewPage = () => {
  const params = useParams();
  const projectId = params?.id as string;

  if (!projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Project not found.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<InterviewLoadingSkeleton />}>
      <ProjectInterview projectId={projectId} />
    </Suspense>
  );
};

export default InterviewPage;
