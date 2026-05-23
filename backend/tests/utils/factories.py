def build_tool_input(tool="chatgpt", plan="team", spend=600.0, seats=20, use_case="writing"):
    return {
        "tool": tool,
        "current_plan": plan,
        "current_spend": spend,
        "seats": seats,
        "use_case": use_case
    }
