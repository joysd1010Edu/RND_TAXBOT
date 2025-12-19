export interface TopBarProps {
  title: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isCollapsed: boolean;
  isNotificationOpen?: boolean;
  setIsNotificationOpen?: (value: boolean) => void;
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "error";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
