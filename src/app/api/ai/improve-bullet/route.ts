import { NextRequest, NextResponse } from "next/server";
import { getAIProvider, auditFactLock } from "@/lib/ai";
import { BulletImprovementRequest } from "@/types/ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BulletImprovementRequest;

    if (!body || !body.originalBullet || typeof body.originalBullet !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide a valid original bullet point." },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.improveBullet(body);
    const audit = auditFactLock(body.originalBullet, result.improvedBullet);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        audit,
      },
    });
  } catch (err: any) {
    console.error("AI Bullet improvement error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to improve bullet point." },
      { status: 500 }
    );
  }
}

