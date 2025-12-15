"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/Components/Providers/AuthProvider";

//========== Route Guard Component ===========
export const RouteGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  //========== Public Routes Configuration ===========
  const publicRoutes = ["/Login", "/Forgot"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    //========== Authentication Check ===========
    if (!isLoading) {
      
      if (!isAuthenticated && !isPublicRoute && pathname !== "/") {
        router.push(`/Login?redirect=${pathname}`);
      }

      
      if (isAuthenticated && pathname === "/") {
        router.push("/Dashboard");
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, pathname, router]);

  //========== Show Loading State ===========
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
