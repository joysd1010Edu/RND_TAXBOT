"use client";
import React, { useEffect, useState } from "react";
import { MdClose, MdAccessTime, MdWarning, MdError } from "react-icons/md";
import type {
  Notification,
  NotificationPanelProps,
} from "@/Type/Shared/Shared";

//========== Notification Panel Component ==========
const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  //========== Sample Notifications Data ==========
  const notifications: Notification[] = [
    {
      id: "1",
      type: "info",
      title: "Q4 Update Required",
      description: "Please update your R&D activities for Q4 2025",
      timestamp: "27 days ago",
      isRead: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Clarification Needed",
      description:
        "The technical team has requested additional information for your Energy Storage project",
      timestamp: "18 days ago",
      isRead: false,
    },
    {
      id: "3",
      type: "error",
      title: "Incomplete Section",
      description: "Budget allocation section requires completion",
      timestamp: "13 days ago",
      isRead: true,
    },
  ];

  //========== Get Icon and Color Based on Type ==========
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <MdAccessTime size={24} className="text-blue-500" />;
      case "warning":
        return <MdWarning size={24} className="text-orange-500" />;
      case "error":
        return <MdError size={24} className="text-red-500" />;
      default:
        return <MdAccessTime size={24} className="text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!shouldRender) return null;

  return (
    <>
      {/*========== Backdrop ==========*/}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/*========== Notification Panel ==========*/}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 md:w-125 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/*========== Header ==========*/}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Notifications
            </h2>
            <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close notifications"
          >
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/*========== Notification List ==========*/}
        <div className="overflow-y-auto h-[calc(100vh-88px)]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                !notification.isRead ? "bg-blue-50/30" : ""
              }`}
            >
              {/*========== Icon ==========*/}
              <div className="shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/*========== Content ==========*/}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/*========== Empty State ==========*/}
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <MdAccessTime size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-sm text-gray-500">
                You&apos;re all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
