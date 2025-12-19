"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  MdDashboard,
  MdBarChart,
  MdPeople,
  MdFolder,
  MdMessage,
  MdSettings,
  MdNotifications,
  MdPerson,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useAuth } from "@/components/Providers/AuthProvider";
import { GoLaw } from "react-icons/go";
import { FaPlus } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  userRole?: "admin" | "user";
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

//========== Navbar Component ===========
const Navbar: React.FC<NavbarProps> = ({
  userRole = "user",
  isSidebarOpen,
  setIsSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //========== Navigation Items Based on Role ===========
  const adminNavItems: NavItem[] = [
    { label: "Dashboard", href: "/Dashboard", icon: <MdDashboard size={20} /> },
    {
      label: "Analytics & Reports",
      href: "/Admin/Analytics",
      icon: <MdBarChart size={20} />,
    },
    {
      label: "User Management",
      href: "/Admin/Users",
      icon: <MdPeople size={20} />,
    },
    {
      label: "Project Management",
      href: "/Admin/Projects",
      icon: <MdFolder size={20} />,
    },
    {
      label: "Support Inbox",
      href: "/Admin/Support",
      icon: <MdMessage size={20} />,
    },
    {
      label: "Settings",
      href: "/Admin/Settings",
      icon: <MdSettings size={20} />,
    },
  ];

  const userNavItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/user/UserDashboard",
      icon: <MdDashboard size={20} />,
    },
    {
      label: "Create new project",
      href: "/user/CreateProject",
      icon: <FaPlus size={20} />,
    },
    {
      label: "My Projects",
      href: "/user/MyProjects",
      icon: <MdFolder size={20} />,
    },
    { label: "AI Chat", href: "/user/AIChat", icon: <MdMessage size={20} /> },
    {
      label: "Laws & Guidelines",
      href: "/user/Law",
      icon: <GoLaw size={20} />,
    },
  ];

  const navItems = userRole === "admin" ? adminNavItems : userNavItems;

  //========== Close Dropdown on Outside Click ===========
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  };

  const handleProfile = () => {
    router.push("/Profile");
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/*========= Overlay for Mobile =========*/}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/*========= Sidebar =========*/}
      <aside
        className={`fixed left-0 top-0 h-full ${
          isCollapsed ? "w-20" : "w-64"
        } bg-linear-to-b from-[#064D8F] to-[#05396B] text-white z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        {/*========= Logo Section =========*/}
        <div className="p-5.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="PATTENS Logo"
                width={40}
                height={40}
              />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg">PATTENS</h2>
                <p className="text-xs text-blue-200">Tax Incentive Claims</p>
              </div>
            )}
          </div>
        </div>

        {/*========= Navigation Items =========*/}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "gap-3"
                } px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-[#05396B] font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/*========= Notifications & User Profile (Mobile/Tablet) =========*/}
        <div className="lg:hidden border-t border-white/10 p-4 space-y-4">
          {/*========= Notification =========*/}
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors w-full flex items-center justify-center">
            <MdNotifications size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/*========= User Profile Dropdown =========*/}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors w-full"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MdPerson size={24} className="text-[#05396B]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold">
                  {user?.name || "John Smith"}
                </p>
                <p className="text-xs text-blue-200">
                  {user?.email || "john@techcorp.com"}
                </p>
              </div>
              <MdKeyboardArrowDown
                size={20}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/*========= Dropdown Menu =========*/}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <MdPerson size={20} />
                  <span className="text-sm">Profile Settings</span>
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/*========= Collapse Button (Desktop Only) =========*/}
        <div className="hidden lg:block border-t border-white/10 p-4 flex-shrink-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            {isCollapsed ? (
              <MdChevronRight size={20} className="mx-auto" />
            ) : (
              <>
                <MdChevronLeft size={20} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
