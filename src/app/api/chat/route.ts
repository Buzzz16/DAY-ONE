import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    console.log("=== API ROUTE CALLED ===");
    
    const body = await req.json();
    console.log("Request body:", body);
    
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Check API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("❌ API key not found!");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }
    console.log("✅ API key found");

    // Get last user message
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    console.log("Processing message:", lastUserMessage);

    // Use generateText instead of streamText for simpler debugging
    const result = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `Kamu adalah asisten matematika bernama Counto. 
Jawab soal matematika berikut dengan penjelasan step-by-step yang jelas:

Soal: ${lastUserMessage}

Format jawaban:
- Tulis langkah-langkah penyelesaian
- Gunakan LaTeX untuk rumus matematika (contoh: $x^2 + 5x = 10$)
- Berikan jawaban final yang jelas`,
      maxTokens: 500,
    });

    console.log("✅ Response generated:", result.text.substring(0, 100) + "...");
    
    // Return simple JSON response
    return NextResponse.json({ 
      response: result.text,
      usage: result.usage 
    });
    
  } catch (error) {
    console.error("💥 API ERROR:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate response", 
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}