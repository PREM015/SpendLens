import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: "Missing audit ID", code: "BAD_REQUEST" } },
        { status: 400 }
      );
    }

    const { data: audit, error } = await supabase
      .from("audits")
      .select("result, ai_summary, created_at")
      .eq("id", id)
      .single();

    if (error || !audit) {
      return NextResponse.json(
        { success: false, error: { message: "Audit not found", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    // Ensure we merge ai_summary into the result object if it's there
    const publicResult = {
      ...audit.result,
      aiSummary: audit.ai_summary || audit.result.aiSummary,
      createdAt: audit.created_at || audit.result.createdAt,
    };

    return NextResponse.json({ success: true, result: publicResult });
  } catch (error) {
    console.error("Error in GET /api/audit/[id]:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
