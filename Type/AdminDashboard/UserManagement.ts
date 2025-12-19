export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  projects: number;
  status: "active" | "pending" | "suspended";
  lastLogin: string;
  role?: string;
  department?: string;
  phone?: string;
  joinDate?: string;
}

export interface UserProject {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  updated: string;
  progress: number;
}

export interface UserActivity {
  id: string;
  action: string;
  project: string;
  timestamp: string;
}

export interface SupportMessage {
  id: string;
  subject: string;
  date: string;
  status: "resolved" | "open";
  statusColor: string;
}

export interface UserTableProps {
  users: User[];
  onViewProfile: (userId: string) => void;
  onSendEmail: (user: User) => void;
  onResetPassword: (user: User) => void;
  onSuspendAccount: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export interface UserDetailProps {
  userId: string;
}

export interface UserHeaderProps {
  user: User;
  onEditDetails: () => void;
  onResetPassword: () => void;
  onSendEmail: () => void;
}

export interface ProjectCardProps {
  project: UserProject;
}

export interface ActivityItemProps {
  activity: UserActivity;
}

export interface SupportMessageItemProps {
  message: SupportMessage;
}

export interface UserRowProps {
  user: User;
  onViewProfile: (userId: string) => void;
  onSendEmail: (user: User) => void;
  onResetPassword: (user: User) => void;
  onSuspendAccount: (user: User) => void;
  onDeleteUser: (user: User) => void;
}