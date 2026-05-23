-- SpendLens Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: audits
-- Stores the complete audit result and submission data.
CREATE TABLE IF NOT EXISTS public.audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    team_size INTEGER NOT NULL,
    use_case VARCHAR(50) NOT NULL,
    result JSONB NOT NULL,
    ai_summary TEXT
);

-- Index for faster queries on recent audits
CREATE INDEX idx_audits_created_at ON public.audits(created_at DESC);

-- Table: leads
-- Stores lead capture emails linked to specific audits.
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(100),
    team_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one email per audit to prevent spam/duplicates
    CONSTRAINT unique_email_per_audit UNIQUE (email, audit_id)
);

-- Index for querying leads
CREATE INDEX idx_leads_email ON public.leads(email);

-- Row Level Security (RLS) configuration

-- Audits table RLS
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can create an audit)
CREATE POLICY "Enable insert for public" ON public.audits
    FOR INSERT
    WITH CHECK (true);

-- Allow public reads for share URLs (anyone can view an audit by its UUID)
CREATE POLICY "Enable select for public" ON public.audits
    FOR SELECT
    USING (true);

-- Allow public updates (only for adding the ai_summary)
CREATE POLICY "Enable update for public" ON public.audits
    FOR UPDATE
    USING (true);

-- Leads table RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit the lead form)
CREATE POLICY "Enable insert for leads" ON public.leads
    FOR INSERT
    WITH CHECK (true);

-- DO NOT allow public reads on leads table (keep emails secure)
-- Only service role / admin can view leads
