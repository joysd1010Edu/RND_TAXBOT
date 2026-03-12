export interface TopBarProps {
  title: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isCollapsed: boolean;
  isNotificationOpen?: boolean;
  setIsNotificationOpen?: (value: boolean) => void;
  unreadCount?: number;
  onUnreadCountChange?: (count: number) => void;
}

export interface Notification {
  id: number;
  user: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}
