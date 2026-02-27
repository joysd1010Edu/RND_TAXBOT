export interface User {
  id?: number;
  email: string;
  full_name: string;
  company: string | null;
  company_size: string | null;
  abn: string | null;
  city: string | null;
  state: string | null;
  post_code: string | null;
  street_address: string | null;
  phone: string | null;
  website: string | null;
  industry: string | null;
  fiscal_year_end: string | null;
  role: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_suspended: boolean;
  date_joined: string;
  last_login: string;
  projects?: number;
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
  onViewProfile: (userId: number) => void;
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
  onViewProfile: (userId: number) => void;
  onUnsuspendAccount: (user: User) => void;
  onSuspendAccount: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export interface AddUserFormData {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
}

export interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: AddUserFormData) => void;
}
