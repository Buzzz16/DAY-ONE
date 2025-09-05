import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { mathEvaluator } from "../../../lib/tools";

export const maxDuration = 60;

// 🔎 fungsi deteksi ekspresi matematika
function looksLikeMath(input: string): boolean {
  // boleh ada teks tapi harus mengandung angka + operator
  return /[0-9]+.*[+\-*/^=].*/.test(input);
}

export async function POST(req: NextRequest) {
  try {
    console.log("=== API ROUTE CALLED ===");

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const lastUserMessage =
      messages[messages.length - 1]?.content?.toString() || "";
    console.log("Processing message:", lastUserMessage);

    let responseText: string;

    if (looksLikeMath(lastUserMessage)) {
      // coba math evaluator
      console.log("Panggil MathEvaluator dengan input:", lastUserMessage);

      const match = lastUserMessage.match(/[\d+\-*/^().=x\s]+/);
      const cleanedInput = match ? match[0].trim() : lastUserMessage;

      const mathResult = await mathEvaluator(cleanedInput);

      if (mathResult.success) {
        responseText = `### 📝 Problem\n${lastUserMessage}\n\n### ✅ Final Answer\n> **${mathResult.result}**`;
      } else {
        // fallback ke AI kalau math gagal parse
        const aiResult = await generateText({
          model: google("gemini-2.5-flash"),
          prompt: lastUserMessage,
        });
        responseText = aiResult.text;
      }
    } else {
      // langsung AI untuk input non-math
      const aiResult = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: lastUserMessage,
      });
      responseText = aiResult.text;
    }

    console.log("✅ Response generated:", responseText.slice(0, 80) + "...");

    return NextResponse.json({
      response: responseText,
    });
  } catch (error) {
    console.error("💥 API ERROR:", error);
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
