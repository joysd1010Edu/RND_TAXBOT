"use client";

import React, { useEffect } from "react";
import { usePageTitle } from "@/Components/Providers/PageTitleProvider";
import MyProject from "@/Components/UserDashboard/MyProjects/MyProject";

//========== My Projects Page ===========
const Page = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("My Projects");
  }, [setPageTitle]);

  return <MyProject />;
};

export default Page;
