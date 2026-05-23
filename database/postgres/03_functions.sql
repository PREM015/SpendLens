CREATE OR REPLACE FUNCTION cleanup_old_anonymous_audits() RETURNS void AS $$
BEGIN
    DELETE FROM audit_tool_entries 
    WHERE audit_id IN (
        SELECT id FROM audits 
        WHERE created_at < NOW() - INTERVAL '30 days' AND is_public = FALSE
    );

    DELETE FROM audits 
    WHERE created_at < NOW() - INTERVAL '30 days' AND is_public = FALSE;
END;
$$ LANGUAGE plpgsql;
