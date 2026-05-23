from datetime import datetime
from typing import List
from app.api.v1.schemas.audit import AuditResult, ToolAuditResult, FormState, ToolEntry
from app.services.pricing.pricing_loader import get_tool_display_name
from app.services.audit.plan_evaluator import check_plan_fit
from app.services.audit.downgrade_advisor import check_same_vendor_downgrade
from app.services.audit.alternative_advisor import check_alternative_tool, check_duplicates
from app.services.audit.credits_advisor import apply_credits_check
from app.services.audit.savings_calculator import calculate_totals

def audit_single_tool(entry: ToolEntry, form: FormState) -> ToolAuditResult:
    tool = entry.tool
    plan = entry.plan
    seats = entry.seats
    monthly_spend = entry.monthly_spend
    use_case = entry.use_case
    display_name = get_tool_display_name(tool)

    # 1. Plan-fit check
    plan_fit = check_plan_fit(tool, plan, seats, monthly_spend, display_name)
    if plan_fit:
        return plan_fit

    # 2. Same-vendor downgrade
    downgrade = check_same_vendor_downgrade(tool, plan, seats, monthly_spend, display_name)
    if downgrade:
        return downgrade

    # 3. Alternative tool check
    alternative = check_alternative_tool(tool, plan, seats, monthly_spend, use_case, display_name)
    if alternative:
        return alternative

    # No savings found
    return ToolAuditResult(
        tool=tool,
        current_spend=monthly_spend,
        current_plan=plan,
        recommended_action='Keep current plan',
        monthly_savings=0.0,
        annual_savings=0.0,
        reason=f"Your {display_name} {plan} subscription is well-matched to your team size of {seats} and use case. No changes recommended.",
        flag='optimal'
    )

def run_audit(form: FormState) -> AuditResult:
    tool_results: List[ToolAuditResult] = []

    for entry in form.tools:
        result = audit_single_tool(entry, form)
        tool_results.append(result)

    # Cross-tool duplicate check
    duplicate_results = check_duplicates(form, tool_results)
    for dup in duplicate_results:
        for idx, res in enumerate(tool_results):
            if res.tool == dup.tool:
                if dup.monthly_savings > res.monthly_savings:
                    tool_results[idx] = dup
                break

    # Credits check
    tool_results = apply_credits_check(form, tool_results)

    # Totals
    monthly_savings, annual_savings, savings_flag = calculate_totals(tool_results)

    return AuditResult(
        tools=tool_results,
        monthly_savings=monthly_savings,
        annual_savings=annual_savings,
        savings_flag=savings_flag,
        created_at=datetime.utcnow().isoformat()
    )
