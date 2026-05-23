from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from fastapi import Response

def get_metrics():
    """
    Returns Prometheus formatted metrics.
    """
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
