"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ProjectDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  return (
    <div className="space-y-6">
      {/*========================= Section Header =========================*/}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Project Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Basic information about your R&D project
        </p>
      </div>

      {/*========================= Project Title =========================*/}
      <div className="space-y-2">
        <Label htmlFor="projectTitle">
          Project Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="projectTitle"
          placeholder="Enter a descriptive project title"
          {...register("projectTitle", {
            required: "Project title is required",
          })}
          className={errors.projectTitle ? "border-red-500" : ""}
        />
        {errors.projectTitle && (
          <p className="text-xs text-red-500">{errors.projectTitle.message}</p>
        )}
      </div>

      {/*========================= Brief Summary =========================*/}
      <div className="space-y-2">
        <Label htmlFor="briefSummary">
          Brief Summary <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="briefSummary"
          placeholder="Provide a brief overview of your R&D project"
          rows={4}
          {...register("briefSummary", {
            required: "Brief summary is required",
          })}
          className={errors.briefSummary ? "border-red-500" : ""}
        />
        {errors.briefSummary && (
          <p className="text-xs text-red-500">{errors.briefSummary.message}</p>
        )}
      </div>

      {/*========================= Financial Year =========================*/}
      <div className="space-y-2">
        <Label htmlFor="financialYear">
          Financial Year <span className="text-red-500">*</span>
        </Label>
        <Input
          id="financialYear"
          placeholder="e.g., 2025"
          {...register("financialYear", {
            required: "Financial year is required",
          })}
          className={errors.financialYear ? "border-red-500" : ""}
        />
        {errors.financialYear && (
          <p className="text-xs text-red-500">{errors.financialYear.message}</p>
        )}
      </div>

      {/*========================= Project Start Date =========================*/}
      <div className="space-y-2">
        <Label htmlFor="projectStartDate">
          Project Start Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="projectStartDate"
          type="date"
          {...register("projectStartDate", {
            required: "Project start date is required",
          })}
          className={errors.projectStartDate ? "border-red-500" : ""}
        />
        {errors.projectStartDate && (
          <p className="text-xs text-red-500">
            {errors.projectStartDate.message}
          </p>
        )}
      </div>

      {/*========================= Project End Date =========================*/}
      <div className="space-y-2">
        <Label htmlFor="projectEndDate">
          Project End Date (or expected) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="projectEndDate"
          type="date"
          {...register("projectEndDate", {
            required: "Project end date is required",
          })}
          className={errors.projectEndDate ? "border-red-500" : ""}
        />
        {errors.projectEndDate && (
          <p className="text-xs text-red-500">
            {errors.projectEndDate.message}
          </p>
        )}
      </div>

      {/*========================= Industry =========================*/}
      <div className="space-y-2">
        <Label htmlFor="industry">
          Industry <span className="text-red-500">*</span>
        </Label>
        <Input
          id="industry"
          placeholder="e.g., Software Development, Manufacturing"
          {...register("industry", {
            required: "Industry is required",
          })}
          className={errors.industry ? "border-red-500" : ""}
        />
        {errors.industry && (
          <p className="text-xs text-red-500">{errors.industry.message}</p>
        )}
      </div>

      {/*========================= Staff Members Involved =========================*/}
      <div className="space-y-2">
        <Label htmlFor="staffMembers">
          Staff Members Involved (comma-separated){" "}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="staffMembers"
          placeholder="e.g., John Smith, Sarah Chen"
          {...register("staffMembers", {
            required: "Staff members are required",
          })}
          className={errors.staffMembers ? "border-red-500" : ""}
        />
        {errors.staffMembers && (
          <p className="text-xs text-red-500">{errors.staffMembers.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
