"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/Components/Shared/Navbar";
import TopBar from "@/Components/Shared/TopBar";
import { useAuth } from "@/Components/Providers/AuthProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

//========== Dashboard Layout Component ===========
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  //========== Sidebar State Management ===========
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  //========== Public Routes (No Navbar/TopBar) ===========
  const publicRoutes = ["/Login", "/Forgot", "/"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  //========== Determine User Role ===========
  const userRole = user?.role === "admin" ? "admin" : "user";

  //========== Get Page Title ===========
  const getPageTitle = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length === 0) return "Dashboard";

    const lastSegment = pathSegments[pathSegments.length - 1];
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userRole={userRole}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <TopBar
        title={getPageTitle()}
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
