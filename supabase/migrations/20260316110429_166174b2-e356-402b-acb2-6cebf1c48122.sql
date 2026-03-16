
-- Episodes table for video & podcast content
CREATE TABLE public.episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_code text NOT NULL,
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'video',
  day_theme text,
  thumbnail_url text,
  youtube_url text,
  spotify_url text,
  apple_url text,
  story_html text,
  transcript_html text,
  quote_text text,
  quote_author text,
  takeaways jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  has_cc boolean DEFAULT false,
  has_transcript boolean DEFAULT false,
  publish_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published episodes"
  ON public.episodes FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage episodes"
  ON public.episodes FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
