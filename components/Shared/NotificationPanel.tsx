"use client";
import React, { useEffect, useState, useCallback } from "react";
import { MdClose, MdAccessTime, MdDelete } from "react-icons/md";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import type {
  Notification,
  NotificationPanelProps,
} from "@/Type/Shared/Shared";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { toastManager } from "@/components/ui/toast";

//========== Notification Panel Component ==========
const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
}) => {
  const axios = useAxios();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //========== Fetch Notifications ==========
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("users/notifications/");
      if (response.data?.success) {
        setNotifications(response.data.data ?? []);
      }
    } catch {
      // silent fail for background fetch
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  //========== Report unread count whenever notifications change ==========
  useEffect(() => {
    onUnreadCountChange?.(notifications.filter((n) => !n.is_read).length);
  }, [notifications, onUnreadCountChange]);

  //========== Fetch on mount for badge count ==========
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  //========== Animate open/close + refetch on open ==========
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fetchNotifications]);

  //========== Mark as Read ==========
  const handleMarkAsRead = async (id: number) => {
    try {
      await axios.put(`users/notifications/${id}/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to mark notification as read.",
      });
    }
  };

  //========== Delete Notification (DELETE) ==========
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`users/notifications/${id}/`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to delete notification.",
      });
    }
  };

  //========== Format Relative Time ==========
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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
          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <MdAccessTime size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-sm text-gray-500">
                You&apos;re all caught up! Check back later for updates.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors relative ${
                  !notification.is_read ? "bg-blue-50/30" : ""
                }`}
              >
                {/*========== Icon ==========*/}
                <div className="shrink-0 mt-1">
                  <MdAccessTime size={24} className="text-blue-500" />
                </div>

                {/*========== Content ==========*/}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    {!notification.is_read && (
                      <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-400">
                      {formatTime(notification.created_at)}
                    </p>
                    <div className="flex items-center gap-2">
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Mark as read"
                        >
                          <HiOutlineCheckCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        title="Delete"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
