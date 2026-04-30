UPDATE public.blog_posts
SET products = '[
  {"id":"plaud-notepin-s","badge":"AI Capture","title":"PLAUD NotePin S","description":"Wearable AI voice recorder — capture every podcast idea, transcribed and summarized instantly.","image_url":"https://m.media-amazon.com/images/I/61VwN0R6MLB._AC_SL1500_.jpg","affiliate_link":"https://www.amazon.com/s?k=PLAUD+NotePin+S&tag=moderntechs0c-20"},
  {"id":"obsbot-tiny-3-4k","badge":"Pro Webcam","title":"OBSBOT Tiny 3 4K","description":"AI-tracking 4K webcam — broadcast-grade video for solo and remote podcast interviews.","image_url":"https://m.media-amazon.com/images/I/61qAOcAcQRL._AC_SL1500_.jpg","affiliate_link":"https://www.amazon.com/s?k=OBSBOT+Tiny+3+4K&tag=moderntechs0c-20"},
  {"id":"eufy-floodlight-e340","badge":"Studio Security","title":"eufy Floodlight Camera E340","description":"Dual-cam 3K floodlight — secure your home studio while you record.","image_url":"https://m.media-amazon.com/images/I/61g8E0+znML._AC_SL1500_.jpg","affiliate_link":"https://www.amazon.com/s?k=eufy+Floodlight+Camera+E340&tag=moderntechs0c-20"}
]'::jsonb,
updated_at = now()
WHERE slug = 'how-to-start-your-first-podcast';