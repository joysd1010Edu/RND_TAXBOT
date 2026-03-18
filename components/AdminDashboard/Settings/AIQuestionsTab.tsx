"use client";
import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineDocumentCheck } from "react-icons/hi2";
import AIQuestionCard from "./AIQuestionCard";
import AddQuestionModal from "./AddQuestionModal";
import type { AIQuestion } from "@/Type/AdminDashboard/Settings";
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

//========== AI Questions Tab Component ==========
const AIQuestionsTab: React.FC = () => {
  //========== State for Questions ==========
  const [questions, setQuestions] = useState<AIQuestion[]>([
    {
      id: "1",
      section: "Technical Challenges",
      question: "What specific technical uncertainties are you resolving?",
    },
    {
      id: "2",
      section: "Technical Challenges",
      question:
        "How does your approach differ from standard industry practice?",
    },
    {
      id: "3",
      section: "Budget",
      question:
        "What percentage of your budget is allocated to R&D activities?",
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  //========== Handle Actions ==========
  const handleAddQuestion = (newQuestion: Omit<AIQuestion, "id">) => {
    const question: AIQuestion = {
      ...newQuestion,
      id: (questions.length + 1).toString(),
    };
    setQuestions([...questions, question]);
    toastManager.add({
      type: "success",
      title: "Question Added",
      description: "New AI question has been added successfully",
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDeleteQuestion = () => {
    if (!pendingDeleteId) return;
    setQuestions((prev) => prev.filter((q) => q.id !== pendingDeleteId));
    toastManager.add({
      type: "error",
      title: "Question Deleted",
      description: "AI question has been removed",
    });
    setPendingDeleteId(null);
  };

  const handleSaveQuestions = () => {
    toastManager.add({
      type: "success",
      title: "Questions Saved",
      description: "AI question patterns have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/*========== Header ==========*/}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            AI Question Patterns
          </h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <HiOutlinePlus size={18} />
            Add Question
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Default follow-up questions for each section
        </p>
      </div>

      {/*========== Questions List ==========*/}
      <div className="space-y-4">
        {questions.map((question) => (
          <AIQuestionCard
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
          />
        ))}
      </div>

      {/*========== Save Button ==========*/}
      <button
        onClick={handleSaveQuestions}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <HiOutlineDocumentCheck size={18} />
        Save Questions
      </button>

      {/*========== Modal ==========*/}
      <div>
        <AddQuestionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddQuestion}
        />
      </div>

      <Dialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete question?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The selected AI question will be
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setPendingDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteQuestion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIQuestionsTab;
