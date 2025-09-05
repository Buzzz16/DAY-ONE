import Flashcards from "../../components/Flashcards";

export default function FlashcardsPage() {
  const sampleCards = [
    {
      question: "Berapakah hasil 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Hasil 5 × 6 adalah?",
      options: ["30", "35", "25", "20"],
      answer: "30",
    },
    {
      question: "Berapakah akar kuadrat dari 81?",
      options: ["7", "8", "9", "10"],
      answer: "9",
    },
    {
      question: "Bilangan prima terkecil adalah?",
      options: ["0", "1", "2", "3"],
      answer: "2",
    },
    {
      question: "Hasil 12 ÷ 4 adalah?",
      options: ["2", "3", "4", "5"],
      answer: "3",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Flashcards Pilihan Ganda</h1>
      <Flashcards cards={sampleCards} />
    </div>
  );
}
