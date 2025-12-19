export interface AnalyticsStat {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  subtextType: "positive" | "negative" | "warning" | "info";
  bgColor: string;
  iconColor: string;
}

export interface EngagementDataPoint {
  month: string;
  activeUsers: number;
  inactiveUsers: number;
}

export interface IncompleteSectionData {
  section: string;
  count: number;
}

export interface CompletionTimeData {
  month: string;
  days: number;
}

export interface RejectedSectionData {
  name: string;
  value: number;
  color: string;
}

export interface IncompleteUser {
  id: string;
  name: string;
  email: string;
  project: string;
  incompleteSection: string;
  daysInactive: number;
  daysInactiveColor: string;
  lastActivity: string;
  remindersSent: number;
}

export interface AnalyticsStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  subtextType: "positive" | "negative" | "warning" | "info";
  bgColor: string;
  iconColor: string;
}

export interface IncompleteUsersTableProps {
  users: IncompleteUser[];
}
