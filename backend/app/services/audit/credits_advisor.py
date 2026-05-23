from typing import List
from app.api.v1.schemas.audit import ToolAuditResult, FormState

def apply_credits_check(form: FormState, tool_results: List[ToolAuditResult]) -> List[ToolAuditResult]:
    total_monthly_spend = sum(t.monthly_spend for t in form.tools)
    
    if total_monthly_spend > 500:
        for result in tool_results:
            if result.flag != 'savings':
                result.flag = 'credits'
                result.reason += f" Your total AI spend of ${total_monthly_spend:,.2f}/mo exceeds $500 — Credex can negotiate volume discounts across all your subscriptions."
                
    return tool_results
