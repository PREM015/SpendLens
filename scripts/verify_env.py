import os
import sys

required_vars = [
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "ANTHROPIC_API_KEY"
]

missing = []
for var in required_vars:
    if not os.environ.get(var):
        missing.append(var)

if missing:
    print(f"Missing required environment variables: {', '.join(missing)}")
    sys.exit(1)

print("All required environment variables are set.")
