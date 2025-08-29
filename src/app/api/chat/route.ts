import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    console.log("=== API ROUTE CALLED ===");

    const body = await req.json();
    console.log("Request body:", body);

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ API key not found!");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    console.log("✅ API key found");

    const lastUserMessage = messages[messages.length - 1]?.content?.toString() || "";
    console.log("Processing message:", lastUserMessage);

    const result = await generateText({
  model: google("gemini-2.5-flash"),
      prompt: `
## Task
Transform the input algebra problem into a **step-by-step solution** in Markdown, with all math formatted in LaTeX.

### Output Rules
1. Use these sections:
   - ### 📝 Problem
   - ### 💡 Step-by-Step Solution
   - ### ✅ Final Answer
2. Use LaTeX for all math:
   - Inline: $...$
   - Block: $$...$$
3. Step-by-step solution must show:
   - Equation
   - Explanation of the step
4. Final answer must be:
   - Clear
   - Bolded
   - Enclosed in a Markdown blockquote

### Example
**Input:** Solve for x: 3(x - 2) + 5 = 14

**Output:**
### 📝 Problem
Solve for $x$:
$$ 3(x - 2) + 5 = 14 $$

### 💡 Step-by-Step Solution
1. $$ 3x - 6 + 5 = 14 $$  
   Apply distributive property.

2. $$ 3x - 1 = 14 $$  
   Combine constants.

3. $$ 3x = 15 $$  
   Add 1 to both sides.

4. $$ x = \\frac{15}{3} $$  
   Divide both sides by 3.

5. $$ x = 5 $$  
   Simplify.

### ✅ Final Answer
> **$x = 5$**

---

Now solve this problem:
${lastUserMessage}
      `,
      maxOutputTokens: 500,
    });

    console.log(
      "✅ Response generated:",
      result.text ? result.text.substring(0, 100) + "..." : "No text"
    );

    return NextResponse.json({
      response: result.text,
      usage: result.usage,
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
