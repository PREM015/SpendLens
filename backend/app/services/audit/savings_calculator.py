from typing import List, Tuple
from app.api.v1.schemas.audit import ToolAuditResult

def calculate_totals(tool_results: List[ToolAuditResult]) -> Tuple[float, float, str]:
    total_monthly_savings = round(sum(r.monthly_savings for r in tool_results), 2)
    total_annual_savings = round(total_monthly_savings * 12, 2)
    
    savings_flag = 'optimal'
    if any(r.flag == 'credits' for r in tool_results):
        savings_flag = 'high'
    elif total_monthly_savings == 0:
        savings_flag = 'optimal'
    elif total_annual_savings >= 1000:
        savings_flag = 'high'
    else:
        savings_flag = 'low'
        
    return total_monthly_savings, total_annual_savings, savings_flag
