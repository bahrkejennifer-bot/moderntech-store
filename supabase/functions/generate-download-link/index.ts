import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create client with user's auth token to verify identity
    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get authenticated user
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { productId } = await req.json();
    
    if (!productId || typeof productId !== "string") {
      return new Response(
        JSON.stringify({ error: "Product ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role to access full data
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Get product details
    const { data: product, error: productError } = await supabaseAdmin
      .from("digital_products")
      .select("id, pdf_path, is_free, title")
      .eq("id", productId)
      .maybeSingle();

    if (productError) {
      console.error("Product query error:", productError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch product" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!product.pdf_path) {
      return new Response(
        JSON.stringify({ error: "PDF not available for this product" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If product is NOT free, verify purchase
    if (!product.is_free) {
      const { data: purchase, error: purchaseError } = await supabaseAdmin
        .from("purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (purchaseError) {
        console.error("Purchase query error:", purchaseError);
        return new Response(
          JSON.stringify({ error: "Failed to verify purchase" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!purchase) {
        console.log(`User ${user.id} attempted to download unpurchased product ${productId}`);
        return new Response(
          JSON.stringify({ error: "Purchase required to download this product" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Generate signed URL using service role (bypasses storage RLS)
    const { data: signedUrl, error: storageError } = await supabaseAdmin.storage
      .from("digital-products")
      .createSignedUrl(product.pdf_path, 3600); // 1 hour expiry

    if (storageError || !signedUrl?.signedUrl) {
      console.error("Storage error:", storageError);
      return new Response(
        JSON.stringify({ error: "Failed to generate download URL" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generated download link for user ${user.id}, product ${productId} (free: ${product.is_free})`);

    return new Response(
      JSON.stringify({ signedUrl: signedUrl.signedUrl, title: product.title }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-download-link:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
