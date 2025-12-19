export interface StatCard {
  id: string;
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change: string;
  changeType: "positive" | "negative";
  bgColor: string;
  iconBgColor: string;
}

export interface QuickAction {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconColor: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  project: string;
  timestamp: string;
}

export interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change: string;
  changeType: "positive" | "negative";
  bgColor: string;
  iconBgColor: string;
}

export interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconColor: string;
}

export interface ActivityItemProps {
  user: string;
  action: string;
  project: string;
  timestamp: string;
}
