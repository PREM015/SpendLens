import pytest
from tests.utils.factories import build_tool_input

@pytest.fixture
def overspend_inputs():
    return [build_tool_input(tool="chatgpt", plan="team", spend=600.0, seats=20, use_case="writing")]

@pytest.fixture
def optimal_inputs():
    return [build_tool_input(tool="cursor", plan="pro", spend=20.0, seats=1, use_case="coding")]
