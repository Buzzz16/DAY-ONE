import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid topic" },
        { status: 400 }
      );
    }

    const prompt = `Buatkan 5 flashcards belajar tentang "${topic}".
    Format JSON:
    [
      {"question": "pertanyaan...", "answer": "jawaban..."},
      ...
    ]`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    let flashcards;
    try {
      flashcards = JSON.parse(text);
    } catch (err) {
      console.error("⚠️ Gagal parse JSON:", err);
      flashcards = [];
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("💥 FLASHCARD API ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to generate flashcards",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
