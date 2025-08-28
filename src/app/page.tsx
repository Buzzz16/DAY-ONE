"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      role: "bot",
      text: "Halo 👋 Aku Counto, asisten matematika. Ada soal?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // UI-only, tidak ada response
    setTimeout(() => setLoading(false), 500); // simulasi delay typing
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 font-bold">
          Counto Chatbot (Math Assistant)
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-blue-500 text-white rounded-bl-sm"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {m.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500">
              Counto sedang mengetik…
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis soal matematika…"
            className="flex-1 border px-3 py-2 rounded-lg text-black placeholder-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
