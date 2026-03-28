"use client";

import React, { useMemo, useState } from "react";
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

type SupportStatus = "pending" | "ongoing" | "resolved";

type SupportMessage = {
  sender: "you" | "support";
  content: string;
  timestamp: string;
};

type SupportQuery = {
  id: string;
  subject: string;
  excerpt: string;
  status: SupportStatus;
  timeAgo: string;
  messages: SupportMessage[];
  attachmentName?: string;
};

const statusBadge: Record<SupportStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  ongoing: "bg-blue-100 text-blue-800",
  resolved: "bg-emerald-100 text-emerald-800",
};

const initialQueries: SupportQuery[] = [
  {
    id: "1",
    subject: "Budget Section Clarification",
    excerpt: "Need help understanding the budget form",
    status: "pending",
    timeAgo: "2 hours ago",
    messages: [
      {
        sender: "you",
        content:
          "Can you clarify how to enter subcontractor costs in the budget?",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    subject: "Evidence Upload Issue",
    excerpt: "PDF upload stalls halfway",
    status: "ongoing",
    timeAgo: "5 hours ago",
    messages: [
      {
        sender: "you",
        content: "My evidence PDF will not finish uploading. Any size limits?",
        timestamp: "5 hours ago",
      },
      {
        sender: "support",
        content:
          "Hi Sarah, please try again — we increased the upload limit to 25MB.",
        timestamp: "4 hours ago",
      },
    ],
  },
  {
    id: "3",
    subject: "Project Timeline Extension",
    excerpt: "Need guidance on extension request",
    status: "resolved",
    timeAgo: "2 days ago",
    messages: [
      {
        sender: "you",
        content: "How do I request more time for the reporting window?",
        timestamp: "2 days ago",
      },
      {
        sender: "support",
        content:
          "You can submit an extension request under Settings → Compliance. We attached the template.",
        timestamp: "1 day ago",
      },
    ],
  },
];

const SupportPage = () => {
  const [queries, setQueries] = useState<SupportQuery[]>(initialQueries);
  const [selectedId, setSelectedId] = useState<string>(
    initialQueries[0]?.id ?? "",
  );
  const [search, setSearch] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newBody, setNewBody] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const filtered = useMemo(
    () =>
      queries.filter((q) => {
        const matchSearch =
          q.subject.toLowerCase().includes(search.toLowerCase()) ||
          q.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
      }),
    [queries, search],
  );

  const selected = queries.find((q) => q.id === selectedId) || filtered[0];

  const handleCreate = () => {
    if (!newSubject.trim() || !newBody.trim()) return;
    const newItem: SupportQuery = {
      id: crypto.randomUUID(),
      subject: newSubject.trim(),
      excerpt: newBody.trim().slice(0, 70),
      status: "pending",
      timeAgo: "just now",
      messages: [
        {
          sender: "you",
          content: newBody.trim(),
          timestamp: "just now",
        },
      ],
      attachmentName: attachment?.name,
    };
    setQueries((prev) => [newItem, ...prev]);
    setSelectedId(newItem.id);
    setNewSubject("");
    setNewBody("");
    setAttachment(null);
  };

  const markResolved = () => {
    if (!selected) return;
    setQueries((prev) =>
      prev.map((q) =>
        q.id === selected.id
          ? { ...q, status: "resolved", timeAgo: "just now" }
          : q,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[17px]">
        <Link
          href="/user/UserDashboard"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          <HiOutlineArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>

        <div>
          <h1 className="text-4xl font-semibold text-slate-900">
            Support Inbox
          </h1>
          <p className="text-lg text-slate-600">
            Manage your support requests and see past solutions.
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

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((item) => {
                const isActive = item.id === selected?.id;
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
                        {item.subject}
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[11px] rounded-full capitalize ${statusBadge[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-1">
                      {item.excerpt}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{item.timeAgo}</span>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center text-sm text-slate-500 py-8">
                  No messages found
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-3">
              <div className="text-sm font-semibold text-slate-900">
                New support query
              </div>
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject"
                className="bg-slate-50"
              />
              <Textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={3}
                placeholder="Describe your question..."
                className="bg-slate-50"
              />
              <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-600">
                <label className="flex-1" htmlFor="supportAttachment">
                  Optional attachment (one file)
                </label>
                <input
                  id="supportAttachment"
                  type="file"
                  onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                  className="text-sm border border-slate-300 rounded-md p-1 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={handleCreate}
                className="w-full"
                disabled={!newSubject.trim() || !newBody.trim()}
              >
                Submit request
              </Button>
            </div>
          </div>

          <div className="bg-white border col-span-2 border-slate-200 rounded-2xl shadow-sm p-7 min-h-[520px] flex flex-col">
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
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                      <span
                        className={`px-2 py-0.5 rounded-full capitalize ${statusBadge[selected.status]}`}
                      >
                        {selected.status}
                      </span>
                      <span>{selected.timeAgo}</span>
                    </div>
                    {selected.attachmentName && (
                      <div className="text-sm text-slate-600 mt-1">
                        Attachment: {selected.attachmentName}
                      </div>
                    )}
                  </div>
                  {selected.status !== "resolved" && (
                    <Button size="sm" variant="outline" onClick={markResolved}>
                      <HiOutlineCheckCircle className="w-4 h-4 mr-1" /> Mark
                      resolved
                    </Button>
                  )}
                </div>

                <div className="flex-1 space-y-4 py-4 overflow-y-auto pr-2">
                  {selected.messages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {msg.sender === "you" ? "You" : "Support"}
                      </div>
                      <div
                        className={`rounded-xl px-4 py-3 text-sm leading-relaxed border ${
                          msg.sender === "you"
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

                <div className="border-t border-slate-200 pt-4">
                  <div className="text-sm text-slate-700 mb-2">
                    Support will respond here once they review your query.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <HiOutlinePaperAirplane className="w-4 h-4" />
                    Keep this tab open; we will notify you by email as well.
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

export default SupportPage;
