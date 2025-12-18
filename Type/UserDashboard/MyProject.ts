//========== Project Types ===========

export type ProjectStatus =
  | "draft"
  | "completed"
  | "pending-review"
  | "under_review";

export interface Project {
  id: string;
  title: string;
  fiscalYear: string;
  progress: number;
  status: ProjectStatus;
  lastUpdated: string;
  canEdit: boolean;
  canRenew: boolean;
  description?: string;
  createdDate?: string;
  submittedDate?: string;
  completedDate?: string;
}

export interface ProjectDetailsData extends Project {
  projectManager: string;
  department: string;
  budget: number;
  spentAmount: number;
  teamMembers: string[];
  objectives: string[];
  milestones: {
    id: string;
    title: string;
    status: "completed" | "in-progress" | "pending";
    dueDate: string;
  }[];
  documents: {
    id: string;
    name: string;
    uploadedDate: string;
    size: string;
  }[];
}

export interface FilterState {
  search: string;
  status: ProjectStatus | "all";
}
