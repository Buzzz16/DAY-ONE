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

    // Check API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ API key not found!");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    console.log("✅ API key found");

    // Get last user message
    const lastUserMessage =
      messages[messages.length - 1]?.content?.toString() || "";
    console.log("Processing message:", lastUserMessage);

    // Use generateText
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `## Core Task
Your goal is to transform an input algebra problem into a comprehensive solution formatted in **Markdown** with all mathematical notation rendered using **LaTeX**.

---

## Output Requirements & Formatting Rules
1.  **Structure:** The response **must** be organized into the following sections using Markdown headings:
    * \`### 📝 Problem\`
    * \`### 💡 Step-by-Step Solution\`
    * \`### ✅ Final Answer\`

2.  **LaTeX is Mandatory:** **ALL** mathematical variables, numbers, equations, and expressions **must** be formatted using LaTeX.
    * Use \`$ ... $\` for inline mathematical notation (e.g., \`the variable $x$\`).
    * Use \`$$ ... $$\` for block-level equations that should be centered on their own line.

3.  **Step-by-Step Explanation:**
    * Under the \`### 💡 Step-by-Step Solution\` heading, break down the solution into logical, numbered steps.
    * For each step, first show the mathematical transformation (the equation), and then on the next line, provide a concise, clear explanation of the action taken (e.g., "Combine like terms," "Apply the distributive property," "Isolate the variable $x$").

4.  **Clarity and Highlighting:**
    * The final answer under the \`### ✅ Final Answer\` section **must** be stated clearly and enclosed in a Markdown blockquote. The final equation or value should be **bolded**.

---

## Example of Required Output

**User Input:**
\`Solve for x: 3(x - 2) + 5 = 14\`

**Your Expected Output:**

### 📝 Problem
Solve the following equation for the variable $x$:
$$ 3(x - 2) + 5 = 14 $$

### 💡 Step-by-Step Solution
1.  $$ 3x - 6 + 5 = 14 $$
    Apply the distributive property by multiplying $3$ by each term inside the parentheses.

2.  $$ 3x - 1 = 14 $$
    Combine the constant terms on the left side ($-6 + 5 = -1$).

3.  $$ 3x = 14 + 1 $$
    To isolate the term with $x$, add $1$ to both sides of the equation.

4.  $$ 3x = 15 $$
    Simplify the right side of the equation.

5.  $$ x = \\frac{15}{3} $$
    Divide both sides by $3$ to solve for $x$.

6.  $$ x = 5 $$
    Perform the final division.

### ✅ Final Answer
> The solution to the equation is **$x = 5$**.
      
---
      
Now solve the following user problem:
${lastUserMessage}`,
      maxTokens: 500,
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
