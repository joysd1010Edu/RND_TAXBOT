"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import TopBar from "@/components/Shared/TopBar";
import { useAuth } from "@/components/Providers/AuthProvider";
import { useErrorPage } from "@/components/Providers/ErrorPageProvider";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

//========== Dashboard Layout Component ===========
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isErrorPage } = useErrorPage();

  //========== Sidebar State Management ===========
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  //========== Public Routes (No Navbar/TopBar) ===========
  const publicRoutes = [
    "/Login",
    "/Forgot",
    "/",
    "/403",
    "/not-found",
    "/Not-found",
  ];
  const isPublicRoute =
    publicRoutes.some((route) => pathname === route) ||
    pathname === null ||
    isErrorPage;

  //========== Determine User Role ===========
  const userRole = user?.role === "admin" ? "admin" : "user";
  const { pageTitle } = usePageTitle();

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar
        userRole={userRole}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <TopBar
        title={pageTitle}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
      />
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        } p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
