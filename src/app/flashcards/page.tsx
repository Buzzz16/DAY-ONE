"use client";

import { useState } from "react";

export default function FlashcardsPage() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState<
    { question: string; answer: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setFlashcards(data.flashcards || []);
    } catch (err) {
      console.error("❌ Error fetching flashcards:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Flashcard Generator</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Masukkan topik (contoh: Integral)"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {flashcards.length > 0 && (
        <div className="grid gap-4">
          {flashcards.map((card, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow bg-white max-w-md"
            >
              <p className="font-semibold">Q{i + 1}: {card.question}</p>
              <p className="text-gray-700 mt-2">➡ {card.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
