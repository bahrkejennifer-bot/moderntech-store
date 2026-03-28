import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY');
  if (!HEYGEN_API_KEY) {
    return new Response(JSON.stringify({ error: 'HEYGEN_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const { action, video_id, avatar_id, script, voice_id } = await req.json();

  try {
    if (action === 'list_avatars') {
      const res = await fetch('https://api.heygen.com/v2/avatars', {
        headers: { 'x-api-key': HEYGEN_API_KEY, 'accept': 'application/json' }
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'list_voices') {
      const res = await fetch('https://api.heygen.com/v2/voices', {
        headers: { 'x-api-key': HEYGEN_API_KEY, 'accept': 'application/json' }
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'generate') {
      const payload = {
        video_inputs: [{
          character: {
            type: 'avatar',
            avatar_id: avatar_id,
            avatar_style: 'normal',
          },
          voice: {
            type: 'text',
            input_text: script,
            voice_id: voice_id,
          },
        }],
        dimension: { width: 1920, height: 1080 },
        caption: true,
      };

      const res = await fetch('https://api.heygen.com/v2/video/generate', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'status') {
      const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${video_id}`, {
        headers: { 'x-api-key': HEYGEN_API_KEY, 'accept': 'application/json' }
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
