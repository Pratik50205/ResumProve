import { NextRequest, NextResponse } from "next/server";
import { parseJobDescription } from "@/lib/parser/jobParser";

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { text, title, company } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Job description text is required" },
        { status: 400 }
      );
    }

    if (text.length > 50000) {
      return NextResponse.json(
        { error: "Job description exceeds maximum allowed length (50,000 characters)" },
        { status: 400 }
      );
    }

    // Run high-precision deterministic job parser
    const parsed = parseJobDescription(text, title, company);

    const timingMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      parsed,
      timingMs,
    });
  } catch (error: any) {
    console.error("Failed to parse job description:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error parsing job description" },
      { status: 500 }
    );
  }
}

