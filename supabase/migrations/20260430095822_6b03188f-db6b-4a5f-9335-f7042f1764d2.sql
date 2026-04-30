ALTER TABLE public.pending_lead_confirmations
ADD COLUMN IF NOT EXISTS source_path text;