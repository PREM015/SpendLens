-- Schema creation is handled by Alembic in Python, but this serves as a reference backup

CREATE TABLE IF NOT EXISTS audits (
    id VARCHAR PRIMARY KEY,
    share_token VARCHAR UNIQUE,
    monthly_savings FLOAT NOT NULL DEFAULT 0.0,
    annual_savings FLOAT NOT NULL DEFAULT 0.0,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_tool_entries (
    id VARCHAR PRIMARY KEY,
    audit_id VARCHAR REFERENCES audits(id),
    tool VARCHAR NOT NULL,
    current_plan VARCHAR NOT NULL,
    current_spend FLOAT NOT NULL,
    seats INTEGER NOT NULL,
    use_case VARCHAR NOT NULL,
    recommended_action VARCHAR NOT NULL,
    recommended_plan VARCHAR,
    recommended_tool VARCHAR,
    monthly_savings FLOAT NOT NULL DEFAULT 0.0,
    annual_savings FLOAT NOT NULL DEFAULT 0.0,
    reason VARCHAR NOT NULL,
    flag VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    company VARCHAR,
    role VARCHAR,
    team_size INTEGER,
    audit_id VARCHAR REFERENCES audits(id),
    consent_given BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tool_pricing (
    id VARCHAR PRIMARY KEY,
    tool_id VARCHAR NOT NULL,
    plan_name VARCHAR NOT NULL,
    monthly_usd_per_seat FLOAT NOT NULL,
    min_seats INTEGER,
    is_custom BOOLEAN DEFAULT FALSE,
    source_url VARCHAR NOT NULL,
    last_verified DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS abuse_logs (
    id VARCHAR PRIMARY KEY,
    ip_address VARCHAR NOT NULL,
    fingerprint VARCHAR,
    action VARCHAR NOT NULL,
    description VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_events (
    id VARCHAR PRIMARY KEY,
    lead_id VARCHAR REFERENCES leads(id),
    event_type VARCHAR NOT NULL,
    provider_id VARCHAR,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
