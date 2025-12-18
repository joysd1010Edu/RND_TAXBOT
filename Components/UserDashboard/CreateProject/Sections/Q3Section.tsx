"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HiOutlineSparkles } from "react-icons/hi2";

const Q3Section = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  return (
    <div className="space-y-6">
      {/*========================= Section Header =========================*/}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Core R&D Activities - Q3
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Describe your R&D activities for Q3
        </p>
      </div>

      {/*========================= Core Activities Description =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.coreActivitiesDescription">
          Describe the core R&D activities undertaken in Q3
          <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            AI will analyze this to ensure it meets Australian R&D tax incentive
            requirements. Core activities must involve systematic,
            investigative, and experimental activities.
          </p>
        </div>

        <Textarea
          id="q3.coreActivitiesDescription"
          placeholder="Detail the research and development work conducted this quarter"
          rows={6}
          {...register("q3.coreActivitiesDescription", {
            required: "Core activities description is required",
          })}
          className={
            errors.q3?.coreActivitiesDescription ? "border-red-500" : ""
          }
        />
        {errors.q3?.coreActivitiesDescription && (
          <p className="text-xs text-red-500">
            {errors.q3.coreActivitiesDescription.message}
          </p>
        )}
      </div>

      {/*========================= Hypothesis =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.hypothesis">
          What scientific or technological hypothesis were you testing?
          <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            Core activities must be conducted for the purpose of generating new
            knowledge. Describe the hypothesis or technical challenge.
          </p>
        </div>

        <Textarea
          id="q3.hypothesis"
          placeholder="Explain the technical hypothesis or problem you were investigating"
          rows={6}
          {...register("q3.hypothesis", {
            required: "Hypothesis is required",
          })}
          className={errors.q3?.hypothesis ? "border-red-500" : ""}
        />
        {errors.q3?.hypothesis && (
          <p className="text-xs text-red-500">{errors.q3.hypothesis.message}</p>
        )}
      </div>

      {/*========================= Uncertainty =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.uncertainty">
          What scientific or technological uncertainty existed?
          <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            CRITICAL: The uncertainty must not be readily deducible by a
            competent professional. Explain why this was uncertain.
          </p>
        </div>

        <Textarea
          id="q3.uncertainty"
          placeholder="Describe the uncertainty that required systematic investigation"
          rows={6}
          {...register("q3.uncertainty", {
            required: "Uncertainty description is required",
          })}
          className={errors.q3?.uncertainty ? "border-red-500" : ""}
        />
        {errors.q3?.uncertainty && (
          <p className="text-xs text-red-500">
            {errors.q3.uncertainty.message}
          </p>
        )}
      </div>

      {/*========================= Systematic Progression =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.systematicProgression">
          Describe the systematic progression and experimentation
          <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            Must demonstrate systematic experimentation, not routine
            problem-solving. Detail your methodology.
          </p>
        </div>

        <Textarea
          id="q3.systematicProgression"
          placeholder="Outline the experimental process and methodology used"
          rows={6}
          {...register("q3.systematicProgression", {
            required: "Systematic progression description is required",
          })}
          className={errors.q3?.systematicProgression ? "border-red-500" : ""}
        />
        {errors.q3?.systematicProgression && (
          <p className="text-xs text-red-500">
            {errors.q3.systematicProgression.message}
          </p>
        )}
      </div>

      {/*========================= Outcomes =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.outcomes">
          What were the outcomes and findings in Q3?
          <span className="text-red-500">*</span>
        </Label>

        <Textarea
          id="q3.outcomes"
          placeholder="Describe results, findings, and any new knowledge generated"
          rows={6}
          {...register("q3.outcomes", {
            required: "Outcomes description is required",
          })}
          className={errors.q3?.outcomes ? "border-red-500" : ""}
        />
        {errors.q3?.outcomes && (
          <p className="text-xs text-red-500">{errors.q3.outcomes.message}</p>
        )}
      </div>

      {/*========================= New Knowledge =========================*/}
      <div className="space-y-2">
        <Label htmlFor="q3.newKnowledge">
          What new knowledge was generated?
          <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            Must demonstrate generation of new knowledge beyond existing state
            of knowledge.
          </p>
        </div>

        <Textarea
          id="q3.newKnowledge"
          placeholder="Explain the new technical or scientific knowledge created"
          rows={6}
          {...register("q3.newKnowledge", {
            required: "New knowledge description is required",
          })}
          className={errors.q3?.newKnowledge ? "border-red-500" : ""}
        />
        {errors.q3?.newKnowledge && (
          <p className="text-xs text-red-500">
            {errors.q3.newKnowledge.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Q3Section;
