export interface Project {
  id: string;
  name: string;
  userName: string;
  userEmail: string;
  industry: string;
  progress: number;
  compliance: number;
  status: "in progress" | "needs clarification" | "submitted" | "completed";
  lastUpdated: string;
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
  onDownload: (project: Project) => void;
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
