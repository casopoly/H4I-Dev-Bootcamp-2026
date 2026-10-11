"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Message } from "@/types/Message";
import { MessageType } from "@/constants/messages";
import { requestJson } from "@/lib/requestJson";

const TYPE_LABELS: Record<MessageType, string> = {
  contact: "Contact",
  "job-application": "Job application",
};

// "loading" until the first answer arrives; "failed" keeps the error on screen with a Try again button
type LoadState = { kind: "loading" } | { kind: "ready" } | { kind: "failed"; error: string };

export default function AdminMessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });

  const loadMessages = useCallback(async () => {
    // no-store so you never see a cached, out-of-date list. The API already sorts newest first
    const result = await requestJson<Message[]>("/api/contact", { cache: "no-store" });
    if (!result.ok) {
      setLoadState({ kind: "failed", error: result.error });
      return;
    }
    setMessages(result.data);
    setLoadState({ kind: "ready" });
  }, []);

  // Load once when the page opens
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  function retryLoad() {
    setLoadState({ kind: "loading" });
    loadMessages();
  }

  if (loadState.kind === "loading") {
    return <p className="text-brand-800">Loading messages...</p>;
  }

  if (loadState.kind === "failed") {
    return (
      <Card className="flex flex-col items-start gap-4">
        <p role="alert" className="font-medium text-red-700">
          Couldn&apos;t load messages: {loadState.error}
        </p>
        <Button onClick={retryLoad}>Try again</Button>
      </Card>
    );
  }

  if (messages.length === 0) {
    return <p className="text-brand-800">No messages yet</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {messages.map((message) => (
        <li key={message._id}>
          <Card className="flex flex-col gap-2">
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                {TYPE_LABELS[message.type] ?? message.type}
              </span>
              <time dateTime={message.createdAt} className="text-sm text-brand-800">
                {new Date(message.createdAt).toLocaleString()}
              </time>
            </div>
            <h2 className="text-xl break-words">{message.subject ?? "(no subject)"}</h2>
            <p className="text-sm text-brand-800">
              {message.name} ·{" "}
              <a href={`mailto:${message.email}`} className="break-all underline">
                {message.email}
              </a>
            </p>
            <p className="whitespace-pre-wrap break-words">{message.message}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
