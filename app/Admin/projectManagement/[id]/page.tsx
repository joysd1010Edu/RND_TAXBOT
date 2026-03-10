"use client";
import { use } from "react";
import ProjectDetailPage from "@/components/AdminDashboard/ProjectManagement/ProjectDetailPage";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return <ProjectDetailPage projectId={id} />;
};

export default page;
