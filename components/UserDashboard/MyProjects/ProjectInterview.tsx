"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiUser,
  FiAlertTriangle,
  FiRefreshCw,
  FiMessageSquare,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAxios } from "@/Hooks/useAxiosInstance";
import ReactMarkdown from "react-markdown";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type FetchStatus = "idle" | "loading" | "error" | "empty";

// ────────────────────────── COMPONENT ───────────────────────────────────────
export default function ProjectChat({ projectId }: { projectId: string }) {
  // Use prop passed from parent instead of hardcoded constant
  const axios = useAxios();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ────────────────────────── FETCH HISTORY ───────────────────────────────────────
  const fetchHistory = async () => {
    setFetchStatus("loading");
    setErrorMsg(null);
    try {
      const { data } = await axios.get(
        `/tax_project/projects/${projectId}/chat/`,
      );
      console.log("Fetched chat history:", data);
      const payload = data?.data ?? data?.result ?? data;
      const msgs: Message[] = Array.isArray(payload) ? payload : [];
      setMessages(msgs);
      const lastMessage = msgs[msgs.length - 1];
      setInterviewComplete(
        Boolean(
          lastMessage?.role === "assistant" &&
          typeof lastMessage.content === "string" &&
          lastMessage.content.includes("INTERVIEW_COMPLETE"),
        ),
      );
      setFetchStatus(msgs.length === 0 ? "empty" : "idle");
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message ??
        "Failed to load chat history.";
      setErrorMsg(msg);
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [projectId]);

  // ─── AUTO SCROLL ────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  // ─── AUTO RESIZE TEXTAREA ───────────────────────────────────────────────
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  // ─── SEND ────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || sending || interviewComplete) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const current = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setSending(true);
    setFetchStatus("idle");

    try {
      const { data } = await axios.post(
        `/tax_project/projects/${projectId}/chat/`,
        { content: current },
      );

      // API response shape: { role, content, interview_complete, summary }
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data?.content ??
          data?.reply ??
          data?.message ??
          "No response from assistant.",
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (data?.interview_complete === true) {
        setInterviewComplete(true);
      }
    } catch (err: any) {
      const errText =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message ??
        "Please try again.";
      const errMsg: Message = {
        id: Date.now() + 2,
        role: "assistant",
        content: `⚠️ Failed to get response. ${errText}`,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #fafbff 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── HEADER ── */}
      <header
        className="flex items-center gap-3.5 px-6 py-4 flex-shrink-0 text-white"
        style={{
          background: "linear-gradient(90deg, #003B7A 0%, #0059c1 100%)",
          boxShadow: "0 2px 16px rgba(0,59,122,0.18)",
        }}
      >
        <div
          className="w-11 h-11 flex items-center justify-center flex-shrink-0"
          style={{
            borderRadius: 14,
            background: "rgba(255,255,255,0.12)",
            border: "1.5px solid rgba(255,255,255,0.2)",
          }}
        >
          <BsRobot size={22} />
        </div>

        <div>
          <div className="font-bold text-[17px] tracking-tight">
            R&amp;D AI Interview Assistant
          </div>
          <div
            className="text-[13px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {interviewComplete
              ? "✓ Interview complete — you may now submit"
              : "Ask about your project, experiments & evidence"}
          </div>
        </div>

        <div className="ml-auto">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(52,211,153,0.2)",
              color: "#6ee7b7",
              border: "1px solid rgba(52,211,153,0.35)",
            }}
          >
            {interviewComplete ? "Complete" : "Online"}
          </span>
        </div>
      </header>

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[18px] px-5 pt-7 pb-3">
        {/* Loading history */}
        {fetchStatus === "loading" && (
          <CenterState>
            <ImSpinner2
              size={32}
              style={{ color: "#003B7A", animation: "spin 1s linear infinite" }}
            />
            <p className="text-slate-500 mt-3 text-[15px]">
              Loading conversation…
            </p>
          </CenterState>
        )}

        {/* Error loading history */}
        {fetchStatus === "error" && (
          <CenterState>
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <FiAlertTriangle size={24} color="#ef4444" />
            </div>
            <p className="text-gray-700 font-semibold text-base">
              Failed to load chat history
            </p>
            <p className="text-gray-400 text-sm mt-1.5 mb-4">{errorMsg}</p>
            <button
              onClick={fetchHistory}
              className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] cursor-pointer border-none"
              style={{ background: "#003B7A" }}
            >
              <FiRefreshCw size={15} />
              Retry
            </button>
          </CenterState>
        )}

        {/* Empty state */}
        {fetchStatus === "empty" && messages.length === 0 && (
          <CenterState>
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #003B7A, #0059c1)",
                boxShadow: "0 8px 32px rgba(0,59,122,0.22)",
              }}
            >
              <FiMessageSquare size={30} color="#fff" />
            </div>
            <p className="text-slate-800 font-bold text-xl">
              Start your AI Interview
            </p>
            <p className="text-slate-500 text-sm mt-2 max-w-[340px] text-center leading-relaxed">
              Describe your R&amp;D project — technical challenges, experiments,
              uncertainties — and the AI will guide you through the interview.
            </p>
          </CenterState>
        )}

        {/* Messages */}
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const isError = msg.content.startsWith("⚠️");

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {/* AI avatar */}
              {!isUser && (
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isError
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "linear-gradient(135deg, #003B7A, #0059c1)",
                    boxShadow: "0 2px 8px rgba(0,59,122,0.2)",
                  }}
                >
                  {isError ? (
                    <FiAlertTriangle size={16} color="#fff" />
                  ) : (
                    <BsRobot size={16} color="#fff" />
                  )}
                </div>
              )}

              {/* Bubble */}
              <div
                className="max-w-[72%] text-[14.5px] leading-[1.7] whitespace-pre-wrap break-words"
                style={{
                  padding: "13px 18px",
                  borderRadius: isUser
                    ? "20px 20px 6px 20px"
                    : "20px 20px 20px 6px",
                  background: isUser
                    ? "linear-gradient(135deg, #003B7A, #0059c1)"
                    : isError
                      ? "#fef2f2"
                      : "#ffffff",
                  color: isUser ? "#fff" : isError ? "#dc2626" : "#1e293b",
                  boxShadow: isUser
                    ? "0 4px 16px rgba(0,59,122,0.25)"
                    : "0 2px 10px rgba(0,0,0,0.07)",
                  border: isError ? "1px solid #fecaca" : "none",
                }}
              >
                {isUser ? (
                  msg.content
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>

              {/* User avatar */}
              {isUser && (
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #475569, #334155)",
                  }}
                >
                  <FiUser size={16} color="#fff" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {sending && (
          <div className="flex items-end gap-2.5">
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #003B7A, #0059c1)",
              }}
            >
              <BsRobot size={16} color="#fff" />
            </div>
            <div
              className="flex items-center gap-2 text-slate-500 text-sm px-5 py-3.5 bg-white"
              style={{
                borderRadius: "20px 20px 20px 6px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              }}
            >
              <ImSpinner2
                size={15}
                style={{
                  animation: "spin 1s linear infinite",
                  color: "#003B7A",
                }}
              />
              Thinking…
            </div>
          </div>
        )}

        {/* Interview complete banner */}
        {interviewComplete && (
          <div
            className="rounded-2xl px-5 py-4 text-center text-sm font-semibold text-green-800"
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              border: "1px solid #86efac",
            }}
          >
            ✓ Interview complete! You can now review and submit your project.
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT ── */}
      <div className="bg-white border-t border-slate-200 px-5 pt-3.5 pb-[18px] flex-shrink-0">
        {interviewComplete ? (
          <p className="text-center text-slate-400 text-sm py-2.5">
            Interview is complete. No further messages needed.
          </p>
        ) : (
          <>
            <div
              className="flex items-end gap-3 bg-slate-50 rounded-2xl px-3.5 py-2.5 transition-colors duration-200 focus-within:border-[#003B7A]"
              style={{ border: "1.5px solid #e2e8f0" }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKey}
                rows={1}
                placeholder="Describe your R&D project or answer the AI's question…"
                disabled={sending}
                className="flex-1 resize-none border-none outline-none bg-transparent text-[14.5px] text-slate-800 leading-[1.6] overflow-auto disabled:opacity-60"
                style={{ maxHeight: 160, fontFamily: "inherit" }}
              />
              <button
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="w-[42px] h-[42px] rounded-xl flex items-center justify-center flex-shrink-0 border-none transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
                style={{
                  background:
                    sending || !input.trim()
                      ? "#e2e8f0"
                      : "linear-gradient(135deg, #003B7A, #0059c1)",
                  cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                }}
              >
                <FiSend
                  size={17}
                  color={sending || !input.trim() ? "#94a3b8" : "#fff"}
                />
              </button>
            </div>
            <p className="text-[11.5px] text-slate-400 mt-2 pl-1">
              Enter to send · Shift+Enter for new line
            </p>
          </>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── CENTER STATE WRAPPER ─────────────────────────────────────────────────────
function CenterState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 text-center min-h-[300px]">
      {children}
    </div>
  );
}
