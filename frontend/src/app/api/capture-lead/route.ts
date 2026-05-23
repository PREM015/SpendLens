import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendAuditEmail } from "@/lib/resend";
import { LeadFormSchema } from "@/lib/form-schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot check
    if (body.website && body.website.trim() !== "") {
      // Bot detected, silently return success
      return NextResponse.json({ success: true, message: "Lead captured" });
    }

    // 2. Validate input
    const validationResult = LeadFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid lead data", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const { auditId, email, company, role, teamSize } = validationResult.data;

    // 3. Save to Supabase (catch unique constraint violation if they already submitted)
    const { error: dbError } = await supabase.from("leads").insert({
      audit_id: auditId,
      email,
      company: company || null,
      role: role || null,
      team_size: teamSize || null,
    });

    if (dbError && dbError.code !== "23505") { // Ignore unique violation
      console.error("Supabase insert error:", dbError);
    }

    // 4. Fetch the audit result to send the email
    const { data: audit, error: auditError } = await supabase
      .from("audits")
      .select("result, ai_summary")
      .eq("id", auditId)
      .single();

    if (!auditError && audit) {
      const fullResult = {
        ...audit.result,
        aiSummary: audit.ai_summary || audit.result.aiSummary,
      };
      
      // 5. Send email via Resend
      await sendAuditEmail(email, fullResult, auditId);
    }

    return NextResponse.json({ success: true, message: "Lead captured and email sent" });
  } catch (error) {
    console.error("Error in capture-lead API:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to process lead", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
