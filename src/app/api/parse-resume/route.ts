import { NextRequest, NextResponse } from "next/server";
import { parseResumeDocument } from "@/lib/parser/resumeParser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    const fileName = file.name || "resume";
    const lowerName = fileName.toLowerCase();

    let format: "pdf" | "docx" | "txt" | null = null;
    if (lowerName.endsWith(".pdf") || file.type === "application/pdf") {
      format = "pdf";
    } else if (
      lowerName.endsWith(".docx") ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      format = "docx";
    } else if (lowerName.endsWith(".txt") || file.type === "text/plain") {
      format = "txt";
    }

    if (!format) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload a PDF (.pdf), Microsoft Word (.docx), or Plain Text (.txt) file.",
        },
        { status: 400 }
      );
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File exceeds maximum size limit of 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    // For DOCX mammoth needs Buffer; for PDF pdfjs-dist strictly requires a non-Buffer Uint8Array
    const payload = format === "docx" ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer);

    const parseResult = await parseResumeDocument(payload, format, fileName);

    return NextResponse.json({
      success: true,
      data: parseResult,
    });
  } catch (error: any) {
    console.error("Resume parsing API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to parse resume document.",
      },
      { status: 500 }
    );
  }
}

