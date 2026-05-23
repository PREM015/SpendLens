from app.api.v1.schemas.audit import FormState, ToolEntry
from app.services.audit.audit_engine import run_audit

def test_identifies_cursor_plan_fit():
    form = FormState(
        teamSize=2,
        primaryUseCase='coding',
        tools=[
            ToolEntry(
                id='1',
                tool='cursor',
                plan='Business',
                seats=2,
                monthlySpend=80,
                useCase='coding'
            )
        ]
    )

    result = run_audit(form)

    # Should downgrade to Pro
    assert 'Downgrade to Pro plan' in result.tool_results[0].recommended_action
    assert result.tool_results[0].monthly_savings == 40.0

def test_detects_duplicate_coding_tools():
    form = FormState(
        teamSize=5,
        primaryUseCase='coding',
        tools=[
            ToolEntry(
                id='1',
                tool='cursor',
                plan='Pro',
                seats=5,
                monthlySpend=100,
                useCase='coding'
            ),
            ToolEntry(
                id='2',
                tool='copilot',
                plan='Business',
                seats=5,
                monthlySpend=105,
                useCase='coding'
            )
        ]
    )

    result = run_audit(form)

    copilot_result = next((t for t in result.tool_results if t.tool == 'copilot'), None)
    assert copilot_result is not None
    assert 'Consolidate' in copilot_result.recommended_action
    assert copilot_result.monthly_savings == 105.0

def test_calculates_total_annual_savings():
    form = FormState(
        teamSize=2,
        primaryUseCase='coding',
        tools=[
            ToolEntry(
                id='1',
                tool='cursor',
                plan='Business',
                seats=2,
                monthlySpend=80,
                useCase='coding'
            )
        ]
    )

    result = run_audit(form)
    
    assert result.total_monthly_savings == 40.0
    assert result.total_annual_savings == 480.0

def test_flags_high_spend_for_credex():
    form = FormState(
        teamSize=50,
        primaryUseCase='coding',
        tools=[
            ToolEntry(
                id='1',
                tool='openai_api',
                plan='paygo',
                seats=1,
                monthlySpend=2000,
                useCase='coding'
            )
        ]
    )

    result = run_audit(form)

    assert result.savings_flag == 'high'
    assert result.tool_results[0].flag == 'credits'
    assert 'Credex can negotiate volume discounts' in result.tool_results[0].reason

def test_returns_optimal_for_well_configured_setups():
    form = FormState(
        teamSize=5,
        primaryUseCase='coding',
        tools=[
            ToolEntry(
                id='1',
                tool='cursor',
                plan='Pro',
                seats=5,
                monthlySpend=100,
                useCase='coding'
            )
        ]
    )

    result = run_audit(form)

    assert result.savings_flag == 'optimal'
    assert result.total_monthly_savings == 0.0
    assert result.tool_results[0].flag == 'optimal'
