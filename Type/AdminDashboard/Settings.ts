export interface AdminAccount {
  name?: any;
  id: string;
  full_name: string;
  email: string;
  role: "SUPERADMIN" | "REVIEWER";
  status?: "active" | "inactive";
  is_active?: boolean;
  is_suspended?: boolean;
  password?: string;
  confirm_password?: string;
}

export interface ComplianceRule {
  id: string;
  title: string;
  description: string;
  value: string;
  type: "number" | "text" | "boolean";
}

export interface AIQuestion {
  id: string;
  section: string;
  question: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  content: string;
}

export interface AdminAccountRowProps {
  account: AdminAccount;
  getStatus: (account: AdminAccount) => "active" | "suspended" | "pending";
  onEdit: (account: AdminAccount) => void;
  onRemove: (account: AdminAccount) => void;
}

export interface ComplianceRuleCardProps {
  rule: ComplianceRule;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

export interface AIQuestionCardProps {
  question: AIQuestion;
  onDelete: (id: string) => void;
}
