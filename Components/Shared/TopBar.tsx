"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/Components/Providers/AuthProvider";
import {
  MdHelpOutline,
  MdNotifications,
  MdPerson,
  MdKeyboardArrowDown,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { TopBarProps } from "@/Type/Shared/Shared";

//========== TopBar Component ===========
const TopBar: React.FC<TopBarProps> = ({
  title,
  isSidebarOpen,
  setIsSidebarOpen,
  isCollapsed,
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  };

  const handleProfile = () => {
    router.push("/Profile");
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`bg-white border-b border-gray-200 px-6 py-4 transition-all duration-300 ${
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      }`}
    >
      <div className="flex items-center justify-between">
        {/*========= Mobile Menu Button & Logo (Mobile/Tablet Only) =========*/}
        <div className="flex items-center justify-between lg:hidden w-full">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <MdClose size={24} className="text-gray-600" />
            ) : (
              <MdMenu size={24} className="text-gray-600" />
            )}
          </button>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
        </div>

        {/*========= Page Title  =========*/}
        <h1 className="hidden lg:block text-2xl font-bold text-[#05396B]">
          {title}
        </h1>

        {/*========= Right Section (Desktop Only) =========*/}
        <div className="hidden lg:flex items-center gap-4">
          {/*========= Help Icon =========*/}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdHelpOutline size={24} className="text-gray-600" />
          </button>

          {/*========= Notification Icon =========*/}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdNotifications size={24} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/*========= User Profile Dropdown =========*/}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MdPerson size={24} className="text-[#05396B]" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "John Smith"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "john@techcorp.com"}
                </p>
              </div>
              <MdKeyboardArrowDown
                size={20}
                className={`text-gray-600 transition-transform hidden md:block ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/*========= Dropdown Menu =========*/}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                >
                  <MdPerson size={20} className="text-gray-600" />
                  <span className="text-sm text-gray-700">
                    Profile Settings
                  </span>
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
      </div>
    </header>
  );
};

export default TopBar;
