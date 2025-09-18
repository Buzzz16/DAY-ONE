'use client';

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Flashcards from "../../components/Flashcards";
import { useRouter } from "next/navigation";

export default function FlashcardsPage() {
  const router = useRouter();

  const sampleCards = [
    { question: "Berapakah hasil 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Hasil 5 × 6 adalah?", options: ["30", "35", "25", "20"], answer: "30" },
    { question: "Berapakah akar kuadrat dari 81?", options: ["7", "8", "9", "10"], answer: "9" },
    { question: "Bilangan prima terkecil adalah?", options: ["0", "1", "2", "3"], answer: "2" },
    { question: "Hasil 12 ÷ 4 adalah?", options: ["2", "3", "4", "5"], answer: "3" },
  ];

  return (
    <div className="p-6 flex flex-col items-center gap-4 min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-lg"
      >
        🎯 Tantangan Flashcards
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white rounded-2xl shadow-md border border-gray-200 backdrop-blur-md transition duration-300"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        <span className="text-gray-700 font-medium">Kembali</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Flashcards cards={sampleCards} />
      </motion.div>
    </div>
  );
}
