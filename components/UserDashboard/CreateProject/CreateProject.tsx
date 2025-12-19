"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import {
  CreateProjectProvider,
  useCreateProject,
} from "@/components/Providers/CreateProjectProvider";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import ProjectDetailsSection from "./Sections/ProjectDetailsSection";
import Q1Section from "./Sections/Q1Section";
import Q2Section from "./Sections/Q2Section";
import Q3Section from "./Sections/Q3Section";
import Q4Section from "./Sections/Q4Section";
import BudgetSection from "./Sections/BudgetSection";
import DocumentsSection from "./Sections/DocumentsSection";
import SubmissionSuccess from "./SubmissionSuccess";

const CreateProjectContent = () => {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    totalSteps,
    completionPercentage,
    saveDraft,
    submitProject,
    isEditMode,
  } = useCreateProject();

  const [showSuccess, setShowSuccess] = useState(false);

  const methods = useForm<ProjectFormData>({
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    setPageTitle("Create New R&D Project");
  }, [setPageTitle]);

  //========================= Handle Step Navigation =========================
  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      updateFormData(methods.getValues());
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevious = () => {
    updateFormData(methods.getValues());
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //========================= Handle Save Draft =========================
  const handleSaveDraft = async () => {
    updateFormData(methods.getValues());
    await saveDraft();
  };

  //========================= Handle Submit =========================
  const handleSubmit = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      updateFormData(methods.getValues());
      await submitProject();
      setShowSuccess(true);
    }
  };

  //========================= Render Current Section =========================
  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <ProjectDetailsSection />;
      case 2:
        return <Q1Section />;
      case 3:
        return <Q2Section />;
      case 4:
        return <Q3Section />;
      case 5:
        return <Q4Section />;
      case 6:
        return <BudgetSection />;
      case 7:
        return <DocumentsSection />;
      default:
        return <ProjectDetailsSection />;
    }
  };

  //========================= Show Success Page =========================
  if (showSuccess) {
    return <SubmissionSuccess />;
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/*========================= Header =========================*/}
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {isEditMode ? "Edit R&D Project" : "Create New R&D Project"}
            </h1>
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              className="flex items-center gap-2"
            >
              <HiOutlineDocumentText className="w-4 h-4" />
              <span>Save Draft</span>
            </Button>
          </div>

          {/*========================= Progress Bar =========================*/}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Section {currentStep} of {totalSteps}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {completionPercentage}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/*========================= Form Section =========================*/}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8 shadow-sm">
          {renderSection()}
        </div>

        {/*========================= Navigation Buttons =========================*/}
        <div className="flex items-center justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentStep} / {totalSteps}
          </span>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
            >
              <HiOutlineCheckCircle className="w-5 h-5" />
              <span>Submit for Review</span>
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <span>Next Section</span>
              <HiOutlineArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

const CreateProject = () => {
  return (
    <CreateProjectProvider>
      <CreateProjectContent />
    </CreateProjectProvider>
  );
};

export default CreateProject;
