"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  ProjectFormData,
  CreateProjectContextType,
} from "@/Type/UserDashboard/CreateProject";
import { toastManager } from "@/components/ui/toast";
import { useAxios } from "@/Hooks/useAxiosInstance";

const CreateProjectContext = createContext<CreateProjectContextType | null>(
  null,
);

export const useCreateProject = () => {
  const context = useContext(CreateProjectContext);
  if (!context) {
    throw new Error(
      "useCreateProject must be used within CreateProjectProvider",
    );
  }
  return context;
};

const initialFormData: ProjectFormData = {
  projectTitle: "",
  briefSummary: "",
  financialYear: "",
  projectStartDate: "",
  projectEndDate: "",
  industry: "",
  staffMembers: "",
  q1: {
    coreActivitiesDescription: "",
    hypothesis: "",
    uncertainty: "",
    systematicProgression: "",
    outcomes: "",
    newKnowledge: "",
  },
  q2: {
    coreActivitiesDescription: "",
    hypothesis: "",
    uncertainty: "",
    systematicProgression: "",
    outcomes: "",
    newKnowledge: "",
  },
  q3: {
    coreActivitiesDescription: "",
    hypothesis: "",
    uncertainty: "",
    systematicProgression: "",
    outcomes: "",
    newKnowledge: "",
  },
  q4: {
    coreActivitiesDescription: "",
    hypothesis: "",
    uncertainty: "",
    systematicProgression: "",
    outcomes: "",
    newKnowledge: "",
  },
  totalExpenditure: "",
  staffCosts: "",
  contractorCosts: "",
  materialsConsumables: "",
  equipmentDepreciation: "",
  otherEligibleCosts: "",
  technicalDocuments: [],
  financialDocuments: [],
  otherDocuments: [],
};

interface CreateProjectProviderProps {
  children: React.ReactNode;
}

export const CreateProjectProvider: React.FC<CreateProjectProviderProps> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const renewFromId = searchParams.get("renewFrom");
  const isEditMode = !!projectId;
  const axios = useAxios();

  const [formData, setFormData] = useState<ProjectFormData>(() => {
    // If editing, load from localStorage or API
    if (projectId) {
      const savedProject = localStorage.getItem(`project_${projectId}`);
      if (savedProject) {
        return JSON.parse(savedProject);
      }
    }
    // If renewing, load from existing project but as new
    if (renewFromId) {
      const existingProject = localStorage.getItem(`project_${renewFromId}`);
      if (existingProject) {
        const parsed = JSON.parse(existingProject);
        // Remove id and status to create a new project
        const { id, status, updatedAt, ...projectData } = parsed;
        return {
          ...projectData,
          projectTitle: `${projectData.projectTitle} (Renewed)`,
        };
      }
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  //========================= Update Form Data =========================
  const updateFormData = useCallback((data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  //========================= Calculate Completion Percentage =========================
  const completionPercentage = Math.round((currentStep / totalSteps) * 100);

  //========================= Save Draft =========================
  const saveDraft = useCallback(async () => {
    try {
      const projectData: ProjectFormData = {
        ...formData,
        status: "draft",
        updatedAt: new Date().toISOString(),
        id: projectId || `project_${Date.now()}`,
      };

      // Save to localStorage (replace with API call)
      localStorage.setItem(
        `project_${projectData.id}`,
        JSON.stringify(projectData),
      );

      // Show success toast
      toastManager.add({
        title: "Draft Saved",
        description: "Your project has been saved as a draft successfully.",
        type: "success",
      });
    } catch (error) {
      toastManager.add({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        type: "error",
      });
    }
  }, [formData, projectId]);

  //========================= Submit Project =========================
  const submitProject = useCallback(async (): Promise<boolean> => {
    try {
      const id = projectId || `project_${Date.now()}`;

      const fd = new FormData();
      fd.append("project_title", formData.projectTitle);
      fd.append("brief_summary", formData.briefSummary);
      fd.append("financial_year", formData.financialYear);
      fd.append("project_start_date", formData.projectStartDate);
      fd.append("project_end_date", formData.projectEndDate);
      fd.append("industry", formData.industry);
      fd.append("staff_members", formData.staffMembers);

      for (const q of ["q1", "q2", "q3", "q4"] as const) {
        fd.append(
          `core_rnd_activity_${q}`,
          formData[q].coreActivitiesDescription,
        );
        fd.append(`scientific_hypothesis_testing_${q}`, formData[q].hypothesis);
        fd.append(
          `scientific_hypothesis_existed_${q}`,
          formData[q].uncertainty,
        );
        fd.append(
          `systematic_progression_${q}`,
          formData[q].systematicProgression,
        );
        fd.append(`outcomes_${q}`, formData[q].outcomes);
        fd.append(`new_knowledge_${q}`, formData[q].newKnowledge);
      }

      fd.append("total_rnd_expenditure", formData.totalExpenditure);
      fd.append("staff_costs", formData.staffCosts);
      fd.append("contractor_costs", formData.contractorCosts);
      fd.append("materials_costs", formData.materialsConsumables);
      fd.append("equipment_costs", formData.equipmentDepreciation);
      fd.append("other_costs", formData.otherEligibleCosts);

      formData.technicalDocuments?.forEach((file) =>
        fd.append("technical_documents", file),
      );
      formData.financialDocuments?.forEach((file) =>
        fd.append("financial_documents", file),
      );
      formData.otherDocuments?.forEach((file) =>
        fd.append("other_documents", file),
      );

      await axios.post("tax_project/userlist/", fd);

      // Remove local draft now that it's in the API
      localStorage.removeItem(`project_${id}`);

      toastManager.add({
        title: "Project Submitted",
        description: "Your R&D project has been sent for review successfully.",
        type: "success",
      });

      return true;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          data?: { message?: string; detail?: string; error?: string };
        };
      };
      const apiMessage =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.detail ||
        axiosError?.response?.data?.error ||
        "Failed to submit project. Please try again.";

      toastManager.add({
        title: "Submission Failed",
        description: apiMessage,
        type: "error",
      });

      return false;
    }
  }, [formData, projectId, axios]);

  const contextValue: CreateProjectContextType = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    totalSteps,
    completionPercentage,
    saveDraft,
    submitProject,
    isEditMode,
    projectId: projectId || undefined,
  };

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
};
