export interface QuarterlyActivities {
  coreActivitiesDescription: string;
  hypothesis: string;
  uncertainty: string;
  systematicProgression: string;
  outcomes: string;
  newKnowledge: string;
}

export interface ProjectFormData {
  // Section 1: Project Details
  projectTitle: string;
  briefSummary: string;
  financialYear: string;
  projectStartDate: string;
  projectEndDate: string;
  industry: string;
  staffMembers: string;

  // Section 2: Core R&D Activities - Q1
  q1: QuarterlyActivities;

  // Section 3: Core R&D Activities - Q2
  q2: QuarterlyActivities;

  // Section 4: Core R&D Activities - Q3
  q3: QuarterlyActivities;

  // Section 5: Core R&D Activities - Q4
  q4: QuarterlyActivities;

  // Section 6: Budget & Expenditure
  totalExpenditure: string;
  staffCosts: string;
  contractorCosts: string;
  materialsConsumables: string;
  equipmentDepreciation: string;
  otherEligibleCosts: string;

  // Section 7: Supporting Documents
  technicalDocuments: File[];
  financialDocuments: File[];
  otherDocuments: File[];

  // Additional metadata
  id?: string;
  status?: "draft" | "submitted" | "under_review" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
  submittedAt?: string;
}

export interface CreateProjectContextType {
  formData: ProjectFormData;
  updateFormData: (data: Partial<ProjectFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  completionPercentage: number;
  saveDraft: () => Promise<void>;
  submitProject: () => Promise<void>;
  isEditMode: boolean;
  projectId?: string;
}
