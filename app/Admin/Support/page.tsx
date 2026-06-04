"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineInboxStack,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/Hooks/useAxiosInstance";
import { toastManager } from "@/components/ui/toast";

type SupportStatus = "pending" | "ongoing" | "resolved";

type SupportMessage = {
  sender: "user" | "admin";
  content: string;
  timestamp: string;
};

type SupportQuery = {
  id: string;
  userName: string;
  subject: string;
  excerpt: string;
  status: SupportStatus;
  timeAgo: string;
  attachmentNames: string[];
};

const statusBadge: Record<SupportStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  ongoing: "bg-blue-100 text-blue-800",
  resolved: "bg-emerald-100 text-emerald-800",
};

const toSupportStatus = (value: unknown): SupportStatus => {
  const normalized = String(value || "pending").toLowerCase();
  if (normalized === "resolved") return "resolved";
  if (
    normalized === "ongoing" ||
    normalized === "in_progress" ||
    normalized === "in-review"
  ) {
    return "ongoing";
  }
  return "pending";
};

const formatRelativeTime = (value: unknown): string => {
  if (!value) return "-";
  const parsedDate = new Date(String(value));
  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  const seconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const getUserName = (item: Record<string, unknown>): string => {
  const user = item.user as Record<string, unknown> | undefined;
  return (
    (item.user_name as string) ||
    (item.user_full_name as string) ||
    (item.created_by_name as string) ||
    (user?.full_name as string) ||
    (user?.name as string) ||
    "User"
  );
};

const getAttachmentNames = (item: Record<string, unknown>): string[] => {
  const names = new Set<string>();

  const singleAttachmentName =
    (item.attachment_name as string) ||
    (item.file_name as string) ||
    ((item.attachment as Record<string, unknown> | undefined)?.name as string);

  if (singleAttachmentName) {
    names.add(singleAttachmentName);
  }

  const attachments = Array.isArray(item.attachments)
    ? (item.attachments as Array<Record<string, unknown>>)
    : [];
  attachments.forEach((attachment) => {
    const name =
      (attachment.name as string) ||
      (attachment.file_name as string) ||
      (attachment.filename as string);
    if (name) names.add(name);
  });

  return Array.from(names);
};

const normalizeList = (payload: unknown): SupportQuery[] => {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as Record<string, unknown>)?.results)
      ? ((payload as Record<string, unknown>).results as unknown[])
      : Array.isArray((payload as Record<string, unknown>)?.data)
        ? ((payload as Record<string, unknown>).data as unknown[])
        : [];

  return source.map((raw): SupportQuery => {
    const item = (raw || {}) as Record<string, unknown>;
    const messageText =
      (item.last_message as string) ||
      (item.initial_message as string) ||
      (item.description as string) ||
      "";

    return {
      id: String(item.id || ""),
      userName: getUserName(item),
      subject: String(item.subject || "Untitled"),
      excerpt: String(messageText).slice(0, 80),
      status: toSupportStatus(item.status),
      timeAgo: formatRelativeTime(item.updated_at || item.created_at),
      attachmentNames: getAttachmentNames(item),
    };
  });
};

const normalizeMessages = (payload: unknown): SupportMessage[] => {
  const detail = (payload || {}) as Record<string, unknown>;

  const rawMessages = Array.isArray(detail.messages)
    ? detail.messages
    : Array.isArray(detail.replies)
      ? detail.replies
      : Array.isArray(detail.chat)
        ? detail.chat
        : [];

  const mappedMessages = rawMessages.map((entry): SupportMessage => {
    const item = (entry || {}) as Record<string, unknown>;
    const senderRaw = String(
      item.sender || item.role || item.user_type || "user",
    ).toLowerCase();

    const isAdminSender =
      senderRaw.includes("support") ||
      senderRaw.includes("admin") ||
      senderRaw.includes("staff") ||
      senderRaw.includes("assistant");

    return {
      sender: isAdminSender ? "admin" : "user",
      content: String(item.message || item.content || item.text || ""),
      timestamp: formatRelativeTime(item.created_at || item.timestamp),
    };
  });

  if (mappedMessages.length > 0) {
    return mappedMessages;
  }

  const initialMessage = String(detail.initial_message || "").trim();
  if (initialMessage) {
    return [
      {
        sender: "user",
        content: initialMessage,
        timestamp: formatRelativeTime(detail.created_at),
      },
    ];
  }

  return [];
};

const SupportAdminPage = () => {
  const axios = useAxios();
  const [queries, setQueries] = useState<SupportQuery[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [reply, setReply] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const selected = useMemo(
    () => queries.find((q) => q.id === selectedId),
    [queries, selectedId],
  );

  const fetchSupportList = useCallback(async () => {
    try {
      setIsLoadingList(true);
      const response = await axios.get("/support_inbox/");
      console.log("Fetched support inbox list:", response.data);
      const payload = response.data?.data ?? response.data;
      const normalized = normalizeList(payload);
      setQueries(normalized);
      setSelectedId((prev) => {
        if (prev && normalized.some((item) => item.id === prev)) {
          return prev;
        }
        return normalized[0]?.id || "";
      });
    } catch (error) {
      console.error("Failed to fetch support list", error);
      toastManager.add({
        title: "Error",
        description: "Could not load support inbox list.",
        type: "error",
      });
    } finally {
      setIsLoadingList(false);
    }
  }, [axios]);

  const fetchSupportDetails = useCallback(
    async (inboxId: string) => {
      if (!inboxId) {
        setMessages([]);
        return;
      }

      try {
        setIsLoadingDetails(true);
        const response = await axios.get(`/support_inbox/${inboxId}/`);
        const detail = response.data?.data ?? response.data;

        setMessages(normalizeMessages(detail));

        const status = toSupportStatus(
          (detail as Record<string, unknown>)?.status,
        );
        const timeAgo = formatRelativeTime(
          (detail as Record<string, unknown>)?.updated_at ||
            (detail as Record<string, unknown>)?.created_at,
        );
        const attachmentNames = getAttachmentNames(
          detail as Record<string, unknown>,
        );
        const userName = getUserName(detail as Record<string, unknown>);

        setQueries((prev) =>
          prev.map((item) =>
            item.id === inboxId
              ? {
                  ...item,
                  status,
                  timeAgo,
                  userName,
                  attachmentNames:
                    attachmentNames.length > 0
                      ? attachmentNames
                      : item.attachmentNames,
                }
              : item,
          ),
        );
      } catch (error) {
        console.error("Failed to fetch support details", error);
        setMessages([]);
        toastManager.add({
          title: "Error",
          description: "Could not load inbox details.",
          type: "error",
        });
      } finally {
        setIsLoadingDetails(false);
      }
    },
    [axios],
  );

  useEffect(() => {
    fetchSupportList();
  }, [fetchSupportList]);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    fetchSupportDetails(selectedId);
  }, [fetchSupportDetails, selectedId]);

  const filtered = useMemo(
    () =>
      queries.filter((q) => {
        const searchText = search.toLowerCase();
        return (
          q.subject.toLowerCase().includes(searchText) ||
          q.excerpt.toLowerCase().includes(searchText) ||
          q.userName.toLowerCase().includes(searchText)
        );
      }),
    [queries, search],
  );

  const handleSendReply = async () => {
    if (!selectedId || !reply.trim() || selected?.status === "resolved") return;

    try {
      setIsReplying(true);
      await axios.post(`/support_inbox/${selectedId}/send/`, {
        message: reply.trim(),
      });

      setReply("");
      await fetchSupportDetails(selectedId);
      await fetchSupportList();

      toastManager.add({
        title: "Success",
        description: "Reply sent successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to send support reply", error);
      toastManager.add({
        title: "Error",
        description: "Failed to send reply.",
        type: "error",
      });
    } finally {
      setIsReplying(false);
    }
  };

  const handleMarkResolved = async () => {
    if (!selectedId || selected?.status === "resolved") return;

    try {
      setIsResolving(true);
      await axios.patch(`/support_inbox/${selectedId}/resolved/`, {});
      await fetchSupportDetails(selectedId);
      await fetchSupportList();
      toastManager.add({
        title: "Success",
        description: "Support request marked as resolved.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to mark support request as resolved", error);
      toastManager.add({
        title: "Error",
        description: "Failed to update support status.",
        type: "error",
      });
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[17px]">
        <Link
          href="/Admin/Dashboard"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          <HiOutlineArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>

        <div>
          <h1 className="text-4xl font-semibold text-slate-900">
            Support Inbox
          </h1>
          <p className="text-lg text-slate-600">
            Review user support requests and provide solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="bg-slate-50"
            />

            <div className="space-y-3 max-h-130 overflow-y-auto pr-1">
              {isLoadingList && queries.length === 0 && (
                <div className="text-center text-sm text-slate-500 py-8">
                  Loading support inbox...
                </div>
              )}
              {filtered.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left rounded-xl border transition-colors duration-150 p-3 flex flex-col gap-1 ${
                      isActive
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-900">
                        {item.userName}
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[11px] rounded-full capitalize ${statusBadge[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700">{item.subject}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {item.excerpt}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{item.timeAgo}</span>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && !isLoadingList && (
                <div className="text-center text-sm text-slate-500 py-8">
                  No messages found
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border col-span-2 border-slate-200 rounded-2xl shadow-sm p-7 min-h-130 flex flex-col">
            {!selected ? (
              <div className="flex flex-1 flex-col items-center justify-center text-slate-500 gap-2">
                <HiOutlineInboxStack className="w-12 h-12" />
                <p className="text-sm">Select a message to view details</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">
                      {selected.subject}
                    </div>
                    <div className="text-base text-slate-700">
                      From {selected.userName}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                      <span
                        className={`px-2 py-0.5 rounded-full capitalize ${statusBadge[selected.status]}`}
                      >
                        {selected.status}
                      </span>
                      <span>{selected.timeAgo}</span>
                    </div>
                    {selected.attachmentNames.length > 0 && (
                      <div className="mt-2 text-sm text-slate-700">
                        Attachments: {selected.attachmentNames.join(", ")}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleMarkResolved}
                    disabled={selected.status === "resolved" || isResolving}
                  >
                    <HiOutlineCheckCircle className="w-4 h-4 mr-1" />
                    {selected.status === "resolved"
                      ? "Resolved"
                      : isResolving
                        ? "Marking..."
                        : "Mark resolved"}
                  </Button>
                </div>

                <div className="flex-1 space-y-4 py-4 overflow-y-auto pr-2">
                  {isLoadingDetails && (
                    <div className="text-sm text-slate-500">
                      Loading thread...
                    </div>
                  )}
                  {!isLoadingDetails && messages.length === 0 && (
                    <div className="text-sm text-slate-500">
                      No messages yet.
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {msg.sender === "admin" ? "You" : selected.userName}
                      </div>
                      <div
                        className={`rounded-xl px-4 py-3 text-sm leading-relaxed border ${
                          msg.sender === "admin"
                            ? "bg-indigo-50 border-indigo-100 text-slate-900"
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-xs text-slate-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={3}
                    disabled={selected.status === "resolved"}
                    placeholder={
                      selected.status === "resolved"
                        ? "This request is resolved"
                        : "Write your response..."
                    }
                    className="bg-slate-50"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <HiOutlinePaperAirplane className="w-4 h-4" />
                      Replies are saved in this thread.
                    </div>
                    <Button
                      onClick={handleSendReply}
                      disabled={
                        selected.status === "resolved" ||
                        isReplying ||
                        !reply.trim()
                      }
                    >
                      {isReplying ? "Sending..." : "Send reply"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAdminPage;
