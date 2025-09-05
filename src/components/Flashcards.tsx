
import { useState } from "react";

export type Flashcard = {
  question: string;
  answer: string;
  userAnswer?: string;
  isCorrect?: boolean;
};

export default function Flashcard({ q, a }: { q: string; a: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-80 h-48 flex items-center justify-center
                 bg-white rounded-xl shadow cursor-pointer p-4 text-center"
    >
      {flipped ? a : q}
    </div>
  );
}
