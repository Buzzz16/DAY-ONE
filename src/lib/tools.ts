import { evaluate } from "mathjs";

// type hasil evaluasi
export type MathEvalResult = {
  success: boolean;
  result?: string;
  error?: string;
};

export async function mathEvaluator(input: string): Promise<MathEvalResult> {
  try {
    console.log("Panggil MathEvaluator dengan input:", input);
    const result = evaluate(input); // pakai mathjs
    return {
      success: true,
      result: result.toString(),
    };
  } catch (err) {
    console.log("Error");
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
