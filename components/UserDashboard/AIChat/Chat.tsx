"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlinePaperAirplane } from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/components/Providers/PageTitleProvider";
import { LuBot, LuUser } from "react-icons/lu";
import { useAxios } from "@/Hooks/useAxiosInstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: string;
}

interface StoredUser {
  id?: string;
}

const Chat = () => {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const axios = useAxios();

  useEffect(() => {
    setPageTitle("AI Chat");
  }, [setPageTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addAIMessage = (content: string) => {
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, aiResponse]);
  };

  //========== Fetch Chat History ===========
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("chatbot/history/");
        if (response.data?.success && Array.isArray(response.data.data)) {
          const sorted = [...response.data.data].sort(
            (a: { created_at: string }, b: { created_at: string }) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
          if (sorted.length === 0) {
            setIsNewUser(true);
          } else {
            const historyMessages: Message[] = sorted.map(
              (item: {
                id: number;
                role: string;
                content: string;
                created_at: string;
              }) => ({
                id: item.id.toString(),
                type: item.role === "assistant" ? "ai" : "user",
                content: item.content,
                timestamp: new Date(item.created_at).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                ),
              }),
            );
            setMessages(historyMessages);
          }
        } else {
          setIsNewUser(true);
        }
        setIsHistoryLoaded(true);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
        setIsNewUser(true);
        setIsHistoryLoaded(true);
      }
    };
    fetchHistory();
  }, []);

  //========== WebSocket Connection ===========
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const storedUserRaw =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token || !storedUserRaw) {
      return;
    }

    let userId: string | undefined;
    try {
      const storedUser = JSON.parse(storedUserRaw) as StoredUser;
      userId = storedUser.id;
    } catch (error) {
      console.error("Unable to parse user data for websocket", error);
      return;
    }

    if (!userId) {
      return;
    }

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://3774-103-159-73-161.ngrok-free.app/api/";
    const normalizedBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");
    const wsBaseUrl = normalizedBaseUrl
      .replace(/^https:\/\//, "wss://")
      .replace(/^http:\/\//, "ws://")
      .replace(/\/$/, "");
    const wsUrl = `${wsBaseUrl}/ws/chat/${userId}/?token=${encodeURIComponent(token)}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsSocketConnected(true);
      console.log("Chat websocket connected");
    };

    ws.onmessage = (event) => {
      setIsTyping(false);

      try {
        const parsed = JSON.parse(event.data);
        // Expected format: { user_message: "...", ai_response: "..." }
        const aiText = parsed.ai_response;

        if (typeof aiText === "string" && aiText.trim()) {
          addAIMessage(aiText);
          return;
        }
      } catch {
        if (typeof event.data === "string" && event.data.trim()) {
          addAIMessage(event.data);
          return;
        }
      }

      console.error("Unexpected websocket response format:", event.data);
    };

    ws.onerror = (error) => {
      setIsTyping(false);
      console.error("Chat websocket error", error);
    };

    ws.onclose = () => {
      setIsSocketConnected(false);
      setIsTyping(false);
      console.log("Chat websocket disconnected");
    };

    return () => {
      ws.close();
      wsRef.current = null;
      setIsSocketConnected(false);
    };
  }, []);

  const handleSendMessage = (overrideMessage?: string) => {
    const textToSend = overrideMessage ?? inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const socket = wsRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setIsTyping(false);
      addAIMessage(
        "Chat server is not connected. Please refresh and try again.",
      );
      return;
    }

    socket.send(
      JSON.stringify({
        message: textToSend,
      }),
    );
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex bg-gray-50 flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 overflow-hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="py-4 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            AI Compliance Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Ask questions about Australian R&D tax incentives
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Status: {isSocketConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
        <div className="flex-1 flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 lg:p-8 shadow-sm overflow-hidden">
          {/*========================= Messages Container ========================= */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {/*========== Boilerplate for new users ==========*/}
            {isHistoryLoaded && isNewUser && messages.length === 0 && (
              <div className="flex gap-3 justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <LuBot size={20} className="text-white" />
                </div>
                <Card className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-[85%] sm:max-w-[75%]">
                  <p className="text-sm leading-relaxed">{`Hello! I'm your R&D compliance assistant. I can help you with:`}</p>
                  <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>
                      Understanding Australian R&D tax incentive requirements
                    </li>
                    <li>Clarifying what qualifies as core R&D activities</li>
                    <li>Explaining eligible expenditure categories</li>
                    <li>Answering questions about technical uncertainty</li>
                    <li>Guidance on systematic experimentation</li>
                  </ul>
                  <p className="text-sm mt-2">How can I help you today?</p>
                </Card>
              </div>
            )}
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
                    {message.type === "user" ? (
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    ) : (
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-1 last:mb-0">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside my-1 space-y-0.5">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside my-1 space-y-0.5">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="ml-2">{children}</li>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-base font-bold mt-2 mb-1">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-sm font-bold mt-2 mb-1">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-sm font-semibold mt-1 mb-0.5">
                                {children}
                              </h3>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-gray-400 pl-3 italic my-1">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
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
                  onClick={() => handleSendMessage()}
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
            {isHistoryLoaded && isNewUser && messages.length === 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
