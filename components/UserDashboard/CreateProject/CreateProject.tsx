"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import {
  CreateProjectProvider,
  useCreateProject,
} from "@/components/Providers/CreateProjectProvider";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import SubmissionSuccess from "./SubmissionSuccess";

const CreateProjectContent = () => {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const { formData, updateFormData, saveDraft, submitProject } =
    useCreateProject();

  const [showSuccess, setShowSuccess] = useState(false);
  const [path, setPath] = useState<"doc" | "manual">("doc");
  const [depth, setDepth] = useState<"quick" | "detail">("quick");

  const sectionOrder = [
    { id: "upload", label: "Input" },
    { id: "overview", label: "Details" },
    { id: "activities", label: "Activities" },
    { id: "company", label: "Company" },
    { id: "prefs", label: "Review scope" },
    { id: "notes", label: "Notes" },
  ];

  const methods = useForm<ProjectFormData>({
    defaultValues: useMemo(
      () => ({
        ...formData,
        activities:
          formData.activities && Array.isArray(formData.activities)
            ? formData.activities
            : [
                {
                  name: "",
                  type: "Core",
                  effort: "",
                  status: "Active",
                },
              ],
      }),
      [formData],
    ),
    mode: "onChange",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities" as const,
  });

  useEffect(() => {
    setPageTitle("Create New R&D Project");
  }, [setPageTitle]);

  const scrollToFirstError = () => {
    const firstError = document.querySelector(".border-red-500");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onSaveDraft = async (values: ProjectFormData) => {
    updateFormData(values);
    await saveDraft(values);
  };

  const onSubmit = async (values: ProjectFormData) => {
    updateFormData(values);
    const success = await submitProject();
    if (success) setShowSuccess(true);
  };

  const validateDates = () => {
    const start = new Date(watch("projectStartDate"));
    const end = new Date(watch("projectEndDate"));
    if (watch("projectStartDate") && watch("projectEndDate") && start > end) {
      return "End date must be after start date";
    }
    return true;
  };

  const handlePlanUpload = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const file = fileList[0];
    setValue("planDocument", file);
  };

  if (showSuccess) {
    return <SubmissionSuccess />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          async (values) => onSubmit(values),
          () => {
            scrollToFirstError();
          },
        )}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7 font-[Inter] text-lg leading-8">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  RDTI compliance review
                </h1>
                <p className="text-lg text-gray-700">
                  Generate a compliance review report from your R&D Tax
                  Incentive plan
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const isValid = await trigger();
                  if (!isValid) return scrollToFirstError();
                  await onSaveDraft(methods.getValues());
                }}
              >
                Save draft
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-base text-gray-700 overflow-x-auto pb-3">
            {sectionOrder.map((section, idx) => (
              <React.Fragment key={section.id}>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="flex items-center gap-2 transition-all duration-200 hover:text-indigo-700"
                >
                  <div className="w-8 h-8 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 flex items-center justify-center text-sm font-semibold shadow-sm">
                    {idx + 1}
                  </div>
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
                {idx < sectionOrder.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div id="upload" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() => setPath("doc")}
              className={`text-left rounded-xl border transition-all duration-200 p-5 shadow-sm ${
                path === "doc"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mb-3 text-lg">
                📄
              </div>
              <div className="text-base font-semibold text-gray-900">
                Upload document
              </div>
              <div className="text-sm text-gray-700">
                Upload your existing R&D plan PDF or Word file
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPath("manual")}
              className={`text-left rounded-xl border transition-all duration-200 p-5 shadow-sm ${
                path === "manual"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mb-3 text-lg">
                ✏️
              </div>
              <div className="text-base font-semibold text-gray-900">
                Fill in manually
              </div>
              <div className="text-sm text-gray-700">
                Enter your R&D details directly into the form
              </div>
            </button>
          </div>

          {path === "doc" && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3 transition-shadow duration-200 hover:shadow-md">
              <div className="text-base font-semibold text-gray-900">
                Upload your R&D plan
              </div>
              <label
                htmlFor="planUpload"
                className="border border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl">⬆</div>
                <div className="text-base text-gray-900">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-gray-600">
                  PDF or Word · Max 20MB
                </div>
              </label>
              <input
                id="planUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handlePlanUpload(e.target.files)}
              />
              {watch("planDocument") && (
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <span className="text-lg">📄</span>
                  <span>{(watch("planDocument") as File).name}</span>
                </div>
              )}
              <div className="text-xs text-indigo-700 bg-indigo-50 rounded-md px-3 py-2">
                You can also fill in details below to supplement your document
              </div>
            </div>
          )}

          <div
            id="overview"
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-5 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
              Project overview
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label>Project title</Label>
                <Input
                  {...register("projectTitle", {
                    required: "Project title is required",
                  })}
                  placeholder="e.g. Water Filling Stations"
                  className={errors.projectTitle ? "border-red-500" : ""}
                />
                {errors.projectTitle && (
                  <span className="text-xs text-red-600">
                    {errors.projectTitle.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Financial year</Label>
                <Input
                  {...register("financialYear", {
                    required: "Financial year is required",
                  })}
                  placeholder="FY 2024–25"
                  className={errors.financialYear ? "border-red-500" : ""}
                />
                {errors.financialYear && (
                  <span className="text-xs text-red-600">
                    {errors.financialYear.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Start date</Label>
                <Input
                  type="date"
                  {...register("projectStartDate", {
                    required: "Start date is required",
                    validate: () => validateDates(),
                  })}
                  className={errors.projectStartDate ? "border-red-500" : ""}
                />
                {errors.projectStartDate && (
                  <span className="text-xs text-red-600">
                    {(errors.projectStartDate.message as string) ||
                      (errors.projectStartDate.type === "validate" &&
                      validateDates() !== true
                        ? validateDates()
                        : "")}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>End date</Label>
                <Input
                  type="date"
                  {...register("projectEndDate", {
                    required: "End date is required",
                    validate: () => validateDates(),
                  })}
                  className={errors.projectEndDate ? "border-red-500" : ""}
                />
                {errors.projectEndDate && (
                  <span className="text-xs text-red-600">
                    {(errors.projectEndDate.message as string) ||
                      (errors.projectEndDate.type === "validate" &&
                      validateDates() !== true
                        ? validateDates()
                        : "")}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Industry / ANZSIC class</Label>
                <Input
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  placeholder="2439 – Other Electrical Equipment Manufacturing"
                  className={errors.industry ? "border-red-500" : ""}
                />
                {errors.industry && (
                  <span className="text-xs text-red-600">
                    {errors.industry.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Staff members involved</Label>
                <Input
                  {...register("staffMembers", {
                    required: "Staff members are required",
                  })}
                  placeholder="Jane Doe, Sam Lee"
                  className={errors.staffMembers ? "border-red-500" : ""}
                />
                {errors.staffMembers && (
                  <span className="text-xs text-red-600">
                    {errors.staffMembers.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Project objective</Label>
              <Textarea
                rows={4}
                {...register("briefSummary", {
                  required: "Project objective is required",
                })}
                placeholder="Describe the goal of your R&D project..."
                className={errors.briefSummary ? "border-red-500" : ""}
              />
              {errors.briefSummary && (
                <span className="text-xs text-red-600">
                  {errors.briefSummary.message}
                </span>
              )}
            </div>
          </div>

          <div
            id="activities"
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-900">
                R&D activities
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    type: "Core",
                    effort: "",
                    status: "Active",
                  })
                }
                className="text-indigo-700 border-indigo-200"
              >
                <HiOutlinePlus className="w-4 h-4" /> Add activity
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="text-left pb-2">Activity</th>
                    <th className="text-left pb-2">Type</th>
                    <th className="text-left pb-2">% Effort</th>
                    <th className="text-left pb-2">Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, idx) => (
                    <tr key={field.id} className="border-t border-gray-100">
                      <td className="py-2 pr-2">
                        <Input
                          {...register(`activities.${idx}.name` as const, {
                            required: "Required",
                          })}
                          placeholder="Activity name"
                          className={
                            errors.activities?.[idx]?.name
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <select
                          {...register(`activities.${idx}.type` as const)}
                          className="border border-gray-300 rounded-md px-2 py-2 text-sm w-full"
                        >
                          <option>Core</option>
                          <option>Supporting</option>
                        </select>
                      </td>
                      <td className="py-2 pr-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...register(`activities.${idx}.effort` as const, {
                            min: { value: 0, message: "0-100" },
                            max: { value: 100, message: "0-100" },
                          })}
                          placeholder="0"
                          className={
                            errors.activities?.[idx]?.effort
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <select
                          {...register(`activities.${idx}.status` as const)}
                          className="border border-gray-300 rounded-md px-2 py-2 text-sm w-full"
                        >
                          <option>Active</option>
                          <option>Completed</option>
                          <option>On hold</option>
                        </select>
                      </td>
                      <td className="py-2 text-right">
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(idx)}
                          >
                            <HiOutlineTrash className="w-4 h-4 text-gray-500" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            id="company"
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Company details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label>Company legal name</Label>
                <Input
                  {...register("companyName")}
                  placeholder="e.g. Abberfield Technology Pty Ltd"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>ABN</Label>
                <Input {...register("abn")} placeholder="12 345 678 901" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Contact person</Label>
                <Input {...register("contactPerson")} placeholder="Full name" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Email address</Label>
                <Input
                  type="email"
                  {...register("contactEmail", {
                    pattern: {
                      value: /.+@.+\..+/i,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="name@company.com.au"
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && (
                  <span className="text-xs text-red-600">
                    {errors.contactEmail.message as string}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Budgeted R&D spend</Label>
                <Input
                  {...register("budgetedSpend")}
                  placeholder="$3,700,000"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Report title</Label>
                <Input
                  {...register("reportTitle")}
                  defaultValue="RDTI Compliance Review Report"
                />
              </div>
            </div>
          </div>

          <div
            id="prefs"
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Report preferences
            </div>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {[
                {
                  id: "includeRecommendations",
                  title: "Include recommendations",
                  subtitle: "AI will suggest improvements for weak sections",
                },
                {
                  id: "flagIncompleteSections",
                  title: "Flag incomplete sections",
                  subtitle:
                    "Highlight fields with placeholder or missing content",
                },
                {
                  id: "flagNoFyClaim",
                  title: "Flag activities with no FY claim",
                  subtitle:
                    "Identify activities excluded from the current year",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-4 bg-white"
                >
                  <div>
                    <div className="text-base font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-700">{item.subtitle}</div>
                  </div>
                  <Controller
                    control={control}
                    name={item.id as keyof ProjectFormData}
                    defaultValue={true}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(val) => field.onChange(val)}
                        aria-label={item.title}
                      />
                    )}
                  />
                </div>
              ))}
              <div className="px-4 py-4 bg-white flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-medium text-gray-900">
                      Year-on-year comparison
                    </div>
                    <div className="text-sm text-gray-700">
                      Upload prior year plan for comparison
                    </div>
                  </div>
                  <Controller
                    control={control}
                    name="enableYoYComparison"
                    defaultValue={false}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(val) => field.onChange(val)}
                        aria-label="Enable year-on-year comparison"
                      />
                    )}
                  />
                </div>
                {watch("enableYoYComparison") && (
                  <div className="flex items-center gap-3 pt-3">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setValue("yoyDocument", file);
                      }}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {watch("yoyDocument") && (
                      <span className="text-sm text-gray-800">
                        {(watch("yoyDocument") as File).name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                const isValid = await trigger();
                if (!isValid) return scrollToFirstError();
                await onSaveDraft(methods.getValues());
              }}
            >
              Save draft
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-base font-semibold"
            >
              Generate PDF report
              <HiOutlineArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
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
