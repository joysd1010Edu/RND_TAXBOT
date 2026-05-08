"use client";
import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineDocumentCheck } from "react-icons/hi2";
import ComplianceRuleCard from "./ComplianceRuleCard";
import AddRuleModal from "./AddRuleModal";
import type { ComplianceRule } from "@/Type/AdminDashboard/Settings";
import { toastManager } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

//========== Compliance Rules Tab Component ==========
const ComplianceRulesTab: React.FC = () => {
  //========== State for Rules ==========
  const [rules, setRules] = useState<ComplianceRule[]>([
    {
      id: "1",
      title: "Minimum Compliance Score",
      description: "Minimum score required for section approval",
      value: "70%",
      type: "text",
    },
    {
      id: "2",
      title: "Evidence Required",
      description: "All core sections must have supporting evidence",
      value: "Yes",
      type: "text",
    },
    {
      id: "3",
      title: "Auto-reject threshold",
      description: "Sections below this score are auto-rejected",
      value: "50%",
      type: "text",
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  //========== Handle Actions ==========
  const handleAddRule = (newRule: Omit<ComplianceRule, "id">) => {
    const rule: ComplianceRule = {
      ...newRule,
      id: (rules.length + 1).toString(),
    };
    setRules([...rules, rule]);
    toastManager.add({
      type: "success",
      title: "Rule Added",
      description: "New compliance rule has been added successfully",
    });
  };

  const handleUpdateRule = (id: string, value: string) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, value } : rule)),
    );
  };

  const handleDeleteRule = (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDeleteRule = () => {
    if (!pendingDeleteId) return;
    setRules((prev) => prev.filter((rule) => rule.id !== pendingDeleteId));
    toastManager.add({
      type: "error",
      title: "Rule Deleted",
      description: "Compliance rule has been removed",
    });
    setPendingDeleteId(null);
  };

  const handleSaveChanges = () => {
    toastManager.add({
      type: "success",
      title: "Changes Saved",
      description: "Compliance rules have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/*========== Header ==========*/}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Compliance Rules & Thresholds
        </h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlinePlus size={18} />
          Add Rule
        </button>
      </div>

      {/*========== Rules List ==========*/}
      <div className="space-y-4">
        {rules.map((rule) => (
          <ComplianceRuleCard
            key={rule.id}
            rule={rule}
            onUpdate={handleUpdateRule}
            onDelete={handleDeleteRule}
          />
        ))}
      </div>

      {/*========== Save Button ==========*/}
      <button
        onClick={handleSaveChanges}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <HiOutlineDocumentCheck size={18} />
        Save Changes
      </button>

      {/*========== Modal ==========*/}
      <div>
        <AddRuleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRule}
        />
      </div>

      <Dialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete rule?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The selected compliance rule will be
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setPendingDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteRule}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplianceRulesTab;
