from prometheus_client import Counter, Histogram

# Metrics
AUDITS_CREATED = Counter('audits_created_total', 'Total number of audits created')
LEADS_CAPTURED = Counter('leads_captured_total', 'Total number of leads captured')
SAVINGS_TOTAL = Counter('savings_identified_total', 'Total savings identified across all audits')

AUDIT_PROCESSING_TIME = Histogram('audit_processing_seconds', 'Time spent processing audits')

def inc_audits_created():
    AUDITS_CREATED.inc()

def inc_leads_captured():
    LEADS_CAPTURED.inc()

def add_savings(amount: float):
    SAVINGS_TOTAL.inc(amount)
