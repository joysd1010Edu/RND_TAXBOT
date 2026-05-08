export interface Project {
  id: number;
  status: string;
  project_title: string;
  brief_summary: string;
  financial_year: string;
  project_start_date: string;
  project_end_date: string;
  industry: string;
  staff_members: number;
  total_rnd_expenditure: string;
  staff_costs: string;
  contractor_costs: string;
  materials_costs: string;
  equipment_costs: string;
  other_costs: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface ProjectSection {
  id: string;
  title: string;
  compliance: number;
  status: "approved" | "needs clarification" | "pending" | "rejected";
  userResponse: string;
  aiAnalysis: string;
  evidenceFiles?: EvidenceFile[];
  adminComments?: string;
  missingDetails?: string[];
  followUpQuestions?: string[];
}

export interface EvidenceFile {
  id: string;
  name: string;
  url?: string;
}

export interface ProjectTableRowProps {
  project: Project;
  onView: (projectId: string) => void;
  onEmail: (project: Project) => void;

}

export interface ProjectDetailProps {
  projectId: string;
}

export interface SectionListItemProps {
  section: ProjectSection;
  isSelected: boolean;
  onClick: () => void;
}

export interface SectionDetailProps {
  section: ProjectSection;
  onApprove: () => void;
  onReject: () => void;
  onRequestClarification: () => void;
  onDownloadFile: (file: EvidenceFile) => void;
}

export interface ClarificationModalProps {
  isOpen: boolean;
  sectionTitle: string;
  onClose: () => void;
  onSend: (message: string) => void;
}
