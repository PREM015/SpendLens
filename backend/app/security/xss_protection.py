import html

def sanitize_input(text: str) -> str:
    """
    Sanitize text input to prevent XSS.
    This is a basic html escaping mechanism.
    """
    if not text:
        return text
    return html.escape(text)

def sanitize_dict(data: dict) -> dict:
    """
    Recursively sanitize string values in a dictionary.
    """
    sanitized = {}
    for k, v in data.items():
        if isinstance(v, str):
            sanitized[k] = sanitize_input(v)
        elif isinstance(v, dict):
            sanitized[k] = sanitize_dict(v)
        elif isinstance(v, list):
            sanitized[k] = [sanitize_input(i) if isinstance(i, str) else i for i in v]
        else:
            sanitized[k] = v
    return sanitized
