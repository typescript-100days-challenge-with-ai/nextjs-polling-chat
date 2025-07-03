"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import type { Message } from "@/lib/store";

const fetchMessages = async (): Promise<Message[]> => {
  const res = await fetch("/api/messages");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const postMessage = async ({ user, message }: { user: string; message: string }) => {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, message }),
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const user = searchParams.get("name") || "Anonymous";
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, isError } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    refetchInterval: 1000, // Poll every 1 second
  });

  const mutation = useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate({ user, message: message.trim() });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Chat Room</h1>
        <p className="text-center text-sm">Welcome, {user}!</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {isLoading && <p className="text-center">Loading messages...</p>}
          {isError && <p className="text-center text-red-500">Failed to load messages.</p>}
          {messages?.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user === user ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.user === user ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}>
                <p className="font-bold">{msg.user}</p>
                <p>{msg.message}</p>
                <p className="text-xs text-right opacity-75">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            disabled={mutation.isPending}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </footer>
    </div>
  );
}
