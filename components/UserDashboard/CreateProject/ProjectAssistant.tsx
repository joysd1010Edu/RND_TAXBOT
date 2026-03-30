"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { ProjectFormData } from "@/Type/UserDashboard/CreateProject";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const quickPrompts = [
  "Summarize my form so far",
  "Draft a concise project objective",
  "List potential R&D activities to consider",
];

const ProjectAssistant: React.FC = () => {
  const { getValues, setValue, watch } = useFormContext<ProjectFormData>();
  const axios = useAxios();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I can answer questions about your R&D project and can paste suggestions directly into your form fields.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const watchedUploads = watch(["planDocument", "yoyDocument"]);

  const attachmentNames = useMemo(() => {
    return watchedUploads
      .map((file) => {
        if (file && typeof File !== "undefined" && file instanceof File) {
          return file.name;
        }
        return undefined;
      })
      .filter(Boolean) as string[];
  }, [watchedUploads]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: ChatMessage["role"], content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${role}`,
        role,
        content,
      },
    ]);
  };

  const buildContext = () => {
    const snapshot = getValues();
    const activitySummary = (snapshot.activities || [])
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name || "(no name)"} | ${item.type || "type"} | ${
            item.status || "status"
          } | effort ${item.effort || "n/a"}%`,
      )
      .join("\n");

    return {
      projectTitle: snapshot.projectTitle,
      objective: snapshot.briefSummary,
      industry: snapshot.industry,
      financialYear: snapshot.financialYear,
      staff: snapshot.staffMembers,
      budgetedSpend: snapshot.budgetedSpend,
      attachments: attachmentNames,
      activities: activitySummary,
    };
  };

  const sendMessage = async (text?: string) => {
    const textToSend = (text ?? inputValue).trim();
    if (!textToSend) return;

    addMessage("user", textToSend);
    setInputValue("");
    setIsSending(true);

    try {
      const payload = {
        message: textToSend,
        context: buildContext(),
      };

      const response = await axios.post("/chatbot/project-assistant/", payload);
      const aiText =
        response.data?.response ||
        response.data?.data ||
        response.data?.message ||
        "I reviewed your request. What would you like me to fill or update?";

      addMessage("assistant", aiText);
    } catch (error) {
      console.error("Project assistant request failed", error);
      const snapshot = buildContext();
      const fallback =
        "I could not reach the assistant service. Based on your form I see: " +
        `${snapshot.projectTitle ? `Title: ${snapshot.projectTitle}. ` : ""}` +
        `${snapshot.objective ? "Objective present. " : "Objective missing. "}` +
        `${attachmentNames.length ? `Attachments: ${attachmentNames.join(", ")}. ` : "No uploads yet. "}` +
        "Feel free to keep asking and I will stay in the panel.";
      addMessage("assistant", fallback);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const applyToField = (field: keyof ProjectFormData, content: string) => {
    setValue(field, content, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-md">
      {isOpen ? (
        <Card className="border border-gray-200 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div>
              <div className="text-base font-semibold text-gray-900">
                Project AI assistant
              </div>
              <div className="text-sm text-gray-600">
                Uses current form values and upload names
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1 text-gray-700"
            >
              <HiOutlineChevronDown className="h-4 w-4" />
              Hide
            </Button>
          </div>

          <div className="px-4 pt-2 pb-3 space-y-3 max-h-80 overflow-y-auto text-[15px]">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`rounded-lg px-3 py-2 text-base leading-relaxed border ${
                    message.role === "assistant"
                      ? "bg-indigo-50 border-indigo-100 text-gray-900"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-600">
                      {message.role === "assistant" ? "Assistant" : "You"}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-base">
                    {message.content}
                  </div>
                </div>
                {message.role === "assistant" && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        applyToField("briefSummary", message.content)
                      }
                    >
                      Use for objective
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        applyToField("projectTitle", message.content)
                      }
                    >
                      Use for title
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="text-sm text-gray-600">Thinking...</div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-3 space-y-2">
           
            <div className="flex items-end gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about the project or request a rewrite..."
                className="min-h-[70px] text-base"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={isSending || !inputValue.trim()}
                className="h-[70px] px-3"
              >
                <HiOutlinePaperAirplane className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 w-full justify-between rounded-full bg-white shadow-lg border border-gray-200 px-4 py-3 text-base font-medium text-gray-900 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-2">
            <HiOutlineChevronUp className="h-4 w-4" />
            <span>Project AI assistant</span>
          </div>
          <span className="text-sm text-gray-600">Tap to expand</span>
        </button>
      )}
    </div>
  );
};

export default ProjectAssistant;
