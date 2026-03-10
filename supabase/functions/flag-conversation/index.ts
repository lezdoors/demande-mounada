import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId, reason } = await req.json();
    if (!conversationId) {
      return new Response(
        JSON.stringify({ error: "conversationId required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update conversation status to needs_human
    const { data: conv, error: updateErr } = await supabase
      .from("conversations")
      .update({ status: "needs_human", flagged_reason: reason || "ai_handoff" })
      .eq("id", conversationId)
      .select("id, messages, lead_id")
      .single();

    if (updateErr) {
      console.error("Flag error:", updateErr);
      return new Response(
        JSON.stringify({ error: "Failed to flag conversation" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send Telegram notification to team
    const TELEGRAM_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID && conv) {
      const msgs = (conv.messages as { type: string; text: string }[]) || [];
      const lastUserMsg = [...msgs].reverse().find((m) => m.type === "user")?.text || "(pas de message)";
      const preview = lastUserMsg.length > 100 ? lastUserMsg.slice(0, 100) + "..." : lastUserMsg;

      const text = [
        "--- CHAT HANDOFF ---",
        `Conversation: ${conversationId}`,
        conv.lead_id ? `Lead: ${conv.lead_id}` : "",
        `Raison: ${reason || "AI ne peut pas répondre"}`,
        `Dernier message: "${preview}"`,
        "",
        "Répondre dans le CRM admin.",
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }).catch((e) => console.error("Telegram error:", e));
    }

    return new Response(
      JSON.stringify({ ok: true, conversationId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("flag-conversation error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
