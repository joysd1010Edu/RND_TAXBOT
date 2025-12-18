"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ProjectFormData,
  CreateProjectContextType,
} from "@/Type/UserDashboard/CreateProject";
import { toastManager } from "@/components/ui/toast";

const CreateProjectContext = createContext<CreateProjectContextType | null>(
  null
);

export const useCreateProject = () => {
  const context = useContext(CreateProjectContext);
  if (!context) {
    throw new Error(
      "useCreateProject must be used within CreateProjectProvider"
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const renewFromId = searchParams.get("renewFrom");
  const isEditMode = !!projectId;

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
        JSON.stringify(projectData)
      );

      // Show success toast
      toastManager.add({
        title: "Draft Saved",
        description: "Your project has been saved as a draft successfully.",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      toastManager.add({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        type: "error",
        duration: 3000,
      });
    }
  }, [formData, projectId]);

  //========================= Submit Project =========================
  const submitProject = useCallback(async () => {
    try {
      const projectData: ProjectFormData = {
        ...formData,
        status: "under_review",
        updatedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        id: projectId || `project_${Date.now()}`,
      };

      // Save to localStorage (replace with API call)
      localStorage.setItem(
        `project_${projectData.id}`,
        JSON.stringify(projectData)
      );

      toastManager.add({
        title: "Project Submitted",
        description: "Your R&D project has been sent for review successfully.",
        type: "success",
        duration: 3000,
      });

      // Redirect to projects list
      setTimeout(() => {
        router.push("/user/MyProjects");
      }, 1500);
    } catch (error) {
      toastManager.add({
        title: "Error",
        description: "Failed to submit project. Please try again.",
        type: "error",
        duration: 3000,
      });
    }
  }, [formData, projectId, router]);

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
    projectId,
  };

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
};
