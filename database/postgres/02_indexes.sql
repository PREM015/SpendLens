CREATE INDEX idx_audits_share_token ON audits(share_token);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_abuse_logs_ip ON abuse_logs(ip_address);
CREATE INDEX idx_audit_tool_entries_audit_id ON audit_tool_entries(audit_id);
CREATE INDEX idx_email_events_lead_id ON email_events(lead_id);
