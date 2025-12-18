"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiOutlineSparkles } from "react-icons/hi2";

const BudgetSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  return (
    <div className="space-y-6">
      {/*========================= Section Header =========================*/}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Budget & Expenditure
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Financial details and R&D expenditure allocation
        </p>
      </div>

      {/*========================= Total R&D Expenditure =========================*/}
      <div className="space-y-2">
        <Label htmlFor="totalExpenditure">
          Total R&D Expenditure (AUD) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="totalExpenditure"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("totalExpenditure", {
            required: "Total expenditure is required",
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.totalExpenditure ? "border-red-500" : ""}
        />
        {errors.totalExpenditure && (
          <p className="text-xs text-red-500">
            {errors.totalExpenditure.message}
          </p>
        )}
      </div>

      {/*========================= Staff Costs =========================*/}
      <div className="space-y-2">
        <Label htmlFor="staffCosts">
          Staff Costs (AUD) <span className="text-red-500">*</span>
        </Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            Only include costs for staff directly engaged in R&D core activities
          </p>
        </div>

        <Input
          id="staffCosts"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("staffCosts", {
            required: "Staff costs are required",
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.staffCosts ? "border-red-500" : ""}
        />
        {errors.staffCosts && (
          <p className="text-xs text-red-500">{errors.staffCosts.message}</p>
        )}
      </div>

      {/*========================= Contractor Costs =========================*/}
      <div className="space-y-2">
        <Label htmlFor="contractorCosts">Contractor Costs (AUD)</Label>
        <Input
          id="contractorCosts"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("contractorCosts", {
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.contractorCosts ? "border-red-500" : ""}
        />
        {errors.contractorCosts && (
          <p className="text-xs text-red-500">
            {errors.contractorCosts.message}
          </p>
        )}
      </div>

      {/*========================= Materials & Consumables =========================*/}
      <div className="space-y-2">
        <Label htmlFor="materialsConsumables">
          Materials & Consumables (AUD)
        </Label>
        <Input
          id="materialsConsumables"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("materialsConsumables", {
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.materialsConsumables ? "border-red-500" : ""}
        />
        {errors.materialsConsumables && (
          <p className="text-xs text-red-500">
            {errors.materialsConsumables.message}
          </p>
        )}
      </div>

      {/*========================= Equipment & Depreciation =========================*/}
      <div className="space-y-2">
        <Label htmlFor="equipmentDepreciation">
          Equipment & Depreciation (AUD)
        </Label>
        <Input
          id="equipmentDepreciation"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("equipmentDepreciation", {
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.equipmentDepreciation ? "border-red-500" : ""}
        />
        {errors.equipmentDepreciation && (
          <p className="text-xs text-red-500">
            {errors.equipmentDepreciation.message}
          </p>
        )}
      </div>

      {/*========================= Other Eligible Costs =========================*/}
      <div className="space-y-2">
        <Label htmlFor="otherEligibleCosts">Other Eligible Costs (AUD)</Label>

        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            Ensure all costs claimed are directly related to R&D activities
          </p>
        </div>

        <Input
          id="otherEligibleCosts"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          {...register("otherEligibleCosts", {
            min: { value: 0, message: "Must be a positive number" },
          })}
          className={errors.otherEligibleCosts ? "border-red-500" : ""}
        />
        {errors.otherEligibleCosts && (
          <p className="text-xs text-red-500">
            {errors.otherEligibleCosts.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetSection;
