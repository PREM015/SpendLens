import json
import uuid

demo_audit = {
    "id": f"demo_{uuid.uuid4().hex[:12]}",
    "share_token": uuid.uuid4().hex,
    "monthly_savings": 250.0,
    "annual_savings": 3000.0,
    "tools": []
}

with open("data/seed/demo_audits.json", "w") as f:
    json.dump([demo_audit], f, indent=2)

print("Demo data generated.")
