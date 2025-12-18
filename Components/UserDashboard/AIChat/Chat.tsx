"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlinePaperAirplane } from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { LuBot, LuUser } from "react-icons/lu";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: string;
}

const dummyResponses: Record<string, string> = {
  "what costs can i claim": `Eligible R&D expenditure includes:

**Staff Costs:**
• Salaries for employees directly engaged in R&D core activities
• Must be conducting or directly supporting core activities
• Pro-rated if only partially engaged in R&D

**Contractor Costs:**
• Payments to contractors for R&D activities
• Subject to specific rules and rates

**Other Deductible Costs:**
• Materials consumed in R&D
• Depreciation on R&D equipment
• Feedstock costs

**NOT eligible:**
• Interest expenses
• Overheads (unless using simplified method)
• Non-R&D activities
• Ineligible core activities`,

  "what qualifies as core r&d": `Core R&D activities must meet these criteria:

1. **Purpose**: Generating new knowledge (including new or improved materials, products, devices, processes, or services)

2. **Uncertainty**: The outcome cannot be known in advance based on current knowledge

3. **Scientific Method**: Must apply systematic progression of work that:
   • Is based on principles of established science
   • Proceeds from hypothesis to experiment
   • Uses observation and evaluation
   • Leads to logical conclusions

4. **Experimentation**: Conducted for the purpose of the experiment

Examples of activities that qualify:
• Developing new algorithms with uncertain outcomes
• Testing new manufacturing processes with unknown efficiency
• Creating new materials with uncertain properties`,

  "technical uncertainty": `Technical uncertainty is a core requirement for R&D activities:

**What it means:**
• The outcome cannot be determined in advance using existing knowledge
• There must be genuine scientific or technological uncertainty
• The solution requires experimentation and testing

**Requirements:**
• Must formulate a clear hypothesis before starting
• Hypothesis should address specific technical uncertainty
• Must be testable through systematic experimentation
• Should aim to generate new knowledge

**Example:**
"We hypothesized that using graphene-enhanced polymers would increase tensile strength by 40% while reducing weight by 25%, though this combination had never been achieved in existing materials science."

**NOT technical uncertainty:**
• Routine problem-solving
• Adapting existing technology
• Cosmetic improvements`,

  "eligible costs": `R&D Tax Incentive eligible costs include:

**Staff Costs** (Most Common):
• Salaries and wages for R&D employees
• Superannuation contributions
• Payroll tax
• Must be directly engaged in R&D activities

**Contractor Costs**:
• Limited to 2/3 of the actual expenditure
• Must be for R&D activities on your behalf
• Subject to specific registration requirements

**Other Deductible Expenditure**:
• Materials and consumables used in R&D
• Energy costs for R&D equipment
• Depreciation on R&D assets
• Travel directly related to R&D

**Excluded Costs**:
• General business overheads
• Marketing and sales expenses
• Interest and financing costs
• Activities not meeting R&D definition`,

  default: `Thank you for your question! As your R&D compliance assistant, I can help you understand:

• Australian R&D tax incentive requirements
• What qualifies as core and supporting R&D activities
• Eligible expenditure categories and rates
• Technical uncertainty and hypothesis formulation
• Documentation and compliance requirements

Could you please provide more specific details about your question? For example:
- Are you asking about eligibility criteria?
- Do you need help with cost classifications?
- Would you like guidance on technical documentation?

Feel free to use the quick question buttons below or type your specific query!`,
};

const Chat = () => {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello! I'm your R&D compliance assistant. I can help you with:

• Understanding Australian R&D tax incentive requirements
• Clarifying what qualifies as core R&D activities
• Explaining eligible expenditure categories
• Answering questions about technical uncertainty
• Guidance on systematic experimentation

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageTitle("AI Chat");
  }, [setPageTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("cost") || lowerMessage.includes("claim")) {
      return dummyResponses["what costs can i claim"];
    } else if (
      lowerMessage.includes("core") ||
      lowerMessage.includes("qualif")
    ) {
      return dummyResponses["what qualifies as core r&d"];
    } else if (
      lowerMessage.includes("uncertain") ||
      lowerMessage.includes("hypothesis")
    ) {
      return dummyResponses["technical uncertainty"];
    } else if (lowerMessage.includes("eligible")) {
      return dummyResponses["eligible costs"];
    } else {
      return dummyResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
// TODO: Replace with actual AI integration ,chat timeout for demo
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputValue),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
      <div className="flex bg-gray-50 flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 overflow-hidden">
        <div className="py-4 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            AI Compliance Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Ask questions about Australian R&D tax incentives
          </p>
        </div>
        <div className="flex-1 flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 lg:p-8 shadow-sm overflow-hidden">
          {/*========================= Messages Container ========================= */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <LuBot size={20} className="text-white" />
                  </div>
                )}
                <div
                  className={`flex flex-col ${
                    message.type === "user" ? "items-end" : "items-start"
                  } max-w-[85%] sm:max-w-[75%]`}
                >
                  <Card
                    className={`px-4 py-3 ${
                      message.type === "user"
                        ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </Card>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                    {message.timestamp}
                  </span>
                </div>
                {message.type === "user" && (
                  <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
                    <LuUser size={20} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <Card className="px-4 py-3 bg-gray-100 dark:bg-gray-800">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/*========================= Input Area ========================= */}
          <div className="pb-4 space-y-3">
            <Card className="p-3">
              <div className="flex gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about R&D eligibility, compliance, or documentation..."
                  className="flex-1 resize-none outline-none bg-transparent text-sm min-h-11 max-h-32 py-2 px-1"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="self-end bg-purple-600 border-none cursor-pointer hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlinePaperAirplane
                    size={20}
                    className="w-5 text-white h-5"
                  />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
                Press Enter to send • Shift + Enter for new line
              </p>
            </Card>
            {/* =================== Quick Questions ========================= */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  handleQuickQuestion("What qualifies as core R&D?")
                }
                variant="outline"
                size="sm"
                className="text-xs"
              >
                What qualifies as core R&D?
              </Button>
              <Button
                onClick={() => handleQuickQuestion("Technical uncertainty?")}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Technical uncertainty?
              </Button>
              <Button
                onClick={() => handleQuickQuestion("Eligible costs?")}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Eligible costs?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
