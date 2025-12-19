"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";
import { Label } from "@/components/ui/label";
import { HiOutlineArrowUpTray, HiOutlineXMark } from "react-icons/hi2";

const DocumentsSection = () => {
  const { setValue, watch } = useFormContext<ProjectFormData>();

  const [technicalFiles, setTechnicalFiles] = useState<File[]>([]);
  const [financialFiles, setFinancialFiles] = useState<File[]>([]);
  const [otherFiles, setOtherFiles] = useState<File[]>([]);

  //========================= Handle File Upload =========================
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "technical" | "financial" | "other"
  ) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB max

    if (type === "technical") {
      const newFiles = [...technicalFiles, ...validFiles];
      setTechnicalFiles(newFiles);
      setValue("technicalDocuments", newFiles);
    } else if (type === "financial") {
      const newFiles = [...financialFiles, ...validFiles];
      setFinancialFiles(newFiles);
      setValue("financialDocuments", newFiles);
    } else {
      const newFiles = [...otherFiles, ...validFiles];
      setOtherFiles(newFiles);
      setValue("otherDocuments", newFiles);
    }
  };

  //========================= Handle File Remove =========================
  const handleFileRemove = (
    index: number,
    type: "technical" | "financial" | "other"
  ) => {
    if (type === "technical") {
      const newFiles = technicalFiles.filter((_, i) => i !== index);
      setTechnicalFiles(newFiles);
      setValue("technicalDocuments", newFiles);
    } else if (type === "financial") {
      const newFiles = financialFiles.filter((_, i) => i !== index);
      setFinancialFiles(newFiles);
      setValue("financialDocuments", newFiles);
    } else {
      const newFiles = otherFiles.filter((_, i) => i !== index);
      setOtherFiles(newFiles);
      setValue("otherDocuments", newFiles);
    }
  };

  //========================= Render Upload Area =========================
  const renderUploadArea = (
    label: string,
    type: "technical" | "financial" | "other",
    files: File[]
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e, type)}
          className="hidden"
          id={`${type}-upload`}
        />
        <label
          htmlFor={`${type}-upload`}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <HiOutlineArrowUpTray className="w-12 h-12 text-gray-400" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF, DOC, XLS, images, or other relevant documents (max 10MB each)
          </p>
        </label>
      </div>

      {/*========================= Uploaded Files List =========================*/}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleFileRemove(index, type)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <HiOutlineXMark className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/*========================= Section Header =========================*/}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Supporting Documents
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload relevant documentation to support your R&D claim
        </p>
      </div>

      {/*========================= Technical Documents =========================*/}
      {renderUploadArea(
        "Technical Documents (lab notes, test results, prototypes, etc.)",
        "technical",
        technicalFiles
      )}

      {/*========================= Financial Documents =========================*/}
      {renderUploadArea(
        "Financial Documents (timesheets, invoices, etc.)",
        "financial",
        financialFiles
      )}

      {/*========================= Other Supporting Documents =========================*/}
      {renderUploadArea("Other Supporting Documents", "other", otherFiles)}
    </div>
  );
};

export default DocumentsSection;
