const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TELEGRAM_BOT_TOKEN || !TELEGRAM_GROUP_ID) {
  console.error("Missing env vars. Need: SUPABASE_URL, SUPABASE_ANON_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_GROUP_ID");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const seen = new Set();

async function sendTelegram(text) {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_GROUP_ID,
          text,
          disable_web_page_preview: true,
        }),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram send error:", res.status, err);
    }
  } catch (e) {
    console.error("Telegram fetch error:", e.message);
  }
}

async function poll() {
  try {
    const { data, error } = await supabase
      .from("chatbot_conversations")
      .select("id, site, visitor_id, status, handed_off_to, created_at")
      .eq("status", "needs_human")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Poll error:", error.message);
      return;
    }

    for (const conv of data || []) {
      if (seen.has(conv.id)) continue;
      seen.add(conv.id);

      // Fetch last user message
      const { data: msgs } = await supabase
        .from("chatbot_messages")
        .select("content")
        .eq("conversation_id", conv.id)
        .eq("role", "user")
        .order("created_at", { ascending: false })
        .limit(1);

      const lastMsg = msgs?.[0]?.content || "(pas de message)";
      const preview =
        lastMsg.length > 120 ? lastMsg.slice(0, 120) + "..." : lastMsg;

      const text = [
        "--- CHAT NEEDS HUMAN ---",
        `Site: ${conv.site || "unknown"}`,
        `Conversation: ${conv.id}`,
        `Reason: ${conv.handed_off_to || "ai_handoff"}`,
        `Message: "${preview}"`,
        "",
        "Respond in CRM admin.",
      ].join("\n");

      await sendTelegram(text);
      console.log(`[${new Date().toISOString()}] Alerted: ${conv.id}`);
    }
  } catch (e) {
    console.error("Poll exception:", e.message);
  }
}

// Prevent seen set from growing unbounded
setInterval(() => {
  if (seen.size > 500) seen.clear();
}, 3600000);

console.log(`[${new Date().toISOString()}] Mouha chatbot monitor started`);
console.log(`Supabase: ${SUPABASE_URL}`);
console.log("Polling every 30s...");
poll();
setInterval(poll, 30000);
