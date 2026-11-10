import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
import { Resume } from "@/types/resume";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentSummary, resume, tone, targetRole } = body as {
      currentSummary?: string;
      resume: Resume;
      tone?: "technical" | "executive" | "fresher" | "tailored";
      targetRole?: string;
    };

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Please provide resume data for context." },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const summary = await provider.improveSummary(
      currentSummary || "",
      resume,
      tone || "technical",
      targetRole
    );

    return NextResponse.json({
      success: true,
      data: {
        summary,
      },
    });
  } catch (err: any) {
    console.error("AI Summary generation error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate summary." },
      { status: 500 }
    );
  }
}

