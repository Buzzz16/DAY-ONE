"use client";

import { useState } from "react";

export type Flashcard = {
  question: string;
  options: string[];
  answer: string;
};

export default function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const card = cards[currentIndex];

  const handleSelect = (option: string) => {
    setSelected(option);
    setShowResult(true);

    // tunggu 1.5 detik baru lanjut pertanyaan berikutnya
    setTimeout(() => {
      setSelected(null);
      setShowResult(false);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 rounded-xl shadow-md bg-white text-black text-center w-[400px]">
          <h2 className="text-xl font-bold mb-2">🎉 Selesai!</h2>
          <p>Kamu sudah menjawab semua pertanyaan 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 rounded-xl shadow-md bg-white text-black w-[400px]">
        <h2 className="font-semibold mb-4 text-lg">
          {currentIndex + 1}. {card.question}
        </h2>

        <div className="space-y-2">
          {card.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = card.answer === opt;

            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                disabled={showResult}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-colors
                  ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-200 border-green-600"
                        : "bg-red-200 border-red-600"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && (
          <p className="mt-3 text-sm">
            {selected === card.answer
              ? "✅ Jawaban benar!"
              : `❌ Salah. Jawaban benar: ${card.answer}`}
          </p>
        )}
      </div>
    </div>
  );
}
