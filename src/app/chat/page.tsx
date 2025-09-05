"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "Halo! 👋 Aku **Counto**, asisten matematika yang cheerful! Siap bantu soal dari basic sampai intermediate. Coba ketik pertanyaanmu ya. 🧮✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // ➜ Button "New Chat" handler
  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Halo! 👋 Aku **Counto**, asisten matematika yang cheerful! Siap bantu soal dari basic sampai intermediate. Coba ketik pertanyaanmu ya. 🧮✨",
      },
    ]);
    setInput("");
  };

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ➜ Kirim pesan ke backend
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      const data = await response.json();

      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data?.response?.trim() ||
          "Maaf, tidak ada jawaban dari server. Coba ulangi ya! 😅",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Wah, ada kendala jaringan/server nih. Coba lagi sebentar ya! 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div
        className="w-full max-w-6xl h-[82vh] sm:h-[86vh] lg:h-[88vh]
             bg-white/40 backdrop-blur-xl
             border border-black/10 rounded-3xl shadow-2xl ring-1 ring-black/10
             overflow-hidden text-black"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white/70">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-400 via-fuchsia-500 to-pink-500 shadow">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                <path
                  d="M7 22h10l1-6h-2l-1-5h-6l-1 5H6l1 6zM9 7a3 3 0 1 0 6 0"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold leading-tight text-black">
                Counto — Cheerful Math Chat
              </h1>
              <p className="text-xs text-black/70">
                Group3 × Mas Hasnat • GDGOC Bootcamp
              </p>
            </div>
          </div>

          {/* Tombol kanan */}
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/flashcards")}
              className="rounded-xl px-4 py-2 text-sm font-medium
                       bg-gradient-to-r from-emerald-400 to-teal-500
                       text-white shadow hover:opacity-90 active:opacity-95 transition"
            >
              Flashcards
            </button>
            <button
              onClick={handleNewChat}
              className="rounded-xl px-4 py-2 text-sm font-medium
                       bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500
                       text-white shadow hover:opacity-90 active:opacity-95 transition"
            >
              New Chat
            </button>
          </div>
        </header>

        {/* Chat messages */}
        <section
          ref={chatRef}
          className="thin-scrollbar h-[calc(100%-144px)] sm:h-[calc(100%-152px)]
                     overflow-y-auto px-4 sm:px-6 py-4 space-y-4"
        >
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role}>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {m.content}
              </ReactMarkdown>
            </ChatMessage>
          ))}

          {loading && <TypingIndicator />}
        </section>

        {/* Input box */}
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3
                     border-t border-black/10 bg-white/70"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis soal matematika… (boleh pakai LaTeX, contoh: $\\int x^2 dx$)"
            disabled={loading}
            className="flex-1 rounded-2xl px-4 sm:px-5 py-2.5
                       bg-white/85 text-black placeholder-black/50
                       border border-black/10 focus:outline-none
                       focus:ring-2 focus:ring-teal-400/40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-2xl px-5 py-2.5 font-medium
                       bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500
                       text-white shadow hover:opacity-90 active:opacity-95 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim…" : "Kirim"}
          </button>
        </form>
      </div>
    </main>
  );
}
