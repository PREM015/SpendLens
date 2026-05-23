import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/generate-summary";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json(
        { success: false, error: { message: "Missing auditId", code: "BAD_REQUEST" } },
        { status: 400 }
      );
    }

    // 1. Fetch audit from Supabase
    const { data: audit, error: fetchError } = await supabase
      .from("audits")
      .select("*")
      .eq("id", auditId)
      .single();

    if (fetchError || !audit) {
      return NextResponse.json(
        { success: false, error: { message: "Audit not found", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    if (audit.ai_summary) {
      return NextResponse.json({ summary: audit.ai_summary });
    }

    // 2. Generate summary
    const summary = await generateSummary(audit.result, audit.team_size, audit.use_case);

    // 3. Update audit in Supabase
    await supabase
      .from("audits")
      .update({ ai_summary: summary })
      .eq("id", auditId);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in generate-summary API:", error);
    // Return a generic error message, frontend will fallback gracefully
    return NextResponse.json(
      { success: false, error: { message: "Failed to generate summary", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
