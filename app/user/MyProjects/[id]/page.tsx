"use client";
import { use } from "react";
import ProjectDetails from "@/components/UserDashboard/MyProjects/ProjectDetails";

//========== Project Details Page ===========
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return <ProjectDetails projectId={id} />;
};

export default Page;
