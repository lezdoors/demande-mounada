import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { CHAT_CONFIG } from "@/lib/chatConfig";
import {
  buildFormUrl,
  detectIntent,
  detectResponseSignal,
  detectHandoffSignal,
  extractQualification,
  mergeQualification,
  type LeadQualification,
} from "@/lib/chatUtils";

interface Message {
  id: string;
  type: "bot" | "user" | "system";
  text: string;
  cta?: { label: string; href: string };
}

function pushEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/* ─── typing dots ─── */
const Dots = () => (
  <div className="flex gap-1 px-4 py-3 bg-muted/40 rounded-xl w-fit">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-pulse"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [badge, setBadge] = useState(false);
  const [exchanges, setExchanges] = useState(0);
  const [lastCta, setLastCta] = useState(0);
  const [leadData, setLeadData] = useState<LeadQualification>({});
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [nudged, setNudged] = useState(false);
  const [nudgeCooldown, setNudgeCooldown] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─── scroll to bottom ─── */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ─── focus input when opened ─── */
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  /* ─── badge on first visit ─── */
  useEffect(() => {
    if (!localStorage.getItem("chatVisited")) setBadge(true);
  }, []);

  /* ─── listen for support section opening chat with a message ─── */
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      if (!detail?.message) return;
      setOpen(true);
      sessionStorage.setItem("chatOpen", "true");
      localStorage.setItem("chatVisited", "1");
      setBadge(false);
      if (messages.length === 0) initChat();
      // Small delay so chat renders first, then send the message
      setTimeout(() => send(detail.message), 400);
    };
    window.addEventListener("chat:open", handler);
    return () => window.removeEventListener("chat:open", handler);
  }, [messages]);

  /* ─── session restore ─── */
  useEffect(() => {
    if (sessionStorage.getItem("chatOpen") === "true") {
      setOpen(true);
      const saved = sessionStorage.getItem("chatMessages");
      if (saved) {
        try { setMessages(JSON.parse(saved)); } catch { /* ignore */ }
      } else {
        initChat();
      }
    }
  }, []);

  /* ─── persist messages to session ─── */
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  /* ─── inactivity nudge ─── */
  useEffect(() => {
    if (!open || messages.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      const now = Date.now();
      if (now < nudgeCooldown) return;
      if (now - lastActivity >= CHAT_CONFIG.INACTIVITY_TIMEOUT_MS && !nudged) {
        addBot(
          "Je reste disponible si vous avez d'autres questions. Souhaitez-vous démarrer votre dossier ?",
          { label: "Démarrer ma demande", href: buildFormUrl(leadData) }
        );
        setNudged(true);
        setNudgeCooldown(now + CHAT_CONFIG.INACTIVITY_NUDGE_COOLDOWN_MS);
      }
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [open, lastActivity, nudged, messages.length, nudgeCooldown, leadData]);

  /* ─── subscribe to human replies via Supabase Realtime ─── */
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatbot_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as { role: string; content: string; id: string };
          // Only show messages from team (human or system), not our own inserts
          if (row.role === "assistant" || row.role === "human") {
            setMessages((prev) => [
              ...prev,
              { id: row.id, type: "bot", text: row.content },
            ]);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversationId]);

  /* ─── helpers ─── */
  function initChat() {
    setMessages([
      {
        id: Date.now().toString(),
        type: "bot",
        text: `Bonjour, je suis ${CHAT_CONFIG.ADVISOR_NAME}, votre conseillère raccordement. En quoi puis-je vous aider ?`,
      },
    ]);
  }

  function addBot(text: string, cta?: { label: string; href: string }) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), type: "bot", text, cta },
      ]);
      setLastActivity(Date.now());
    }, 500);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    sessionStorage.setItem("chatOpen", String(next));
    if (next) {
      localStorage.setItem("chatVisited", "1");
      setBadge(false);
      pushEvent("chat_open");
      if (messages.length === 0) initChat();
    }
  }

  function canShowCta() {
    return Date.now() - lastCta >= CHAT_CONFIG.CTA_COOLDOWN_MS;
  }

  function showCta(trigger: string) {
    if (!canShowCta()) return;
    setLastCta(Date.now());
    pushEvent("chat_cta_shown", { trigger, ...leadData });
    const text =
      leadData.type_demande || leadData.type_client
        ? "Parfait, je vous propose de remplir notre formulaire rapide. Cela prend moins de 5 minutes."
        : "Je peux démarrer votre dossier maintenant si vous le souhaitez.";
    addBot(text, { label: "Démarrer ma demande", href: buildFormUrl(leadData) });
  }

  /** Create conversation row in chatbot_conversations */
  async function createConversation(): Promise<string | null> {
    try {
      const visitorId = sessionStorage.getItem("visitorId") || crypto.randomUUID();
      sessionStorage.setItem("visitorId", visitorId);
      const { data } = await supabase
        .from("chatbot_conversations")
        .insert({ site: "demande", visitor_id: visitorId, status: "active" })
        .select("id")
        .single();
      if (data?.id) {
        setConversationId(data.id);
        return data.id;
      }
    } catch { /* non-blocking */ }
    return null;
  }

  /** Insert a message row into chatbot_messages */
  async function persistMessage(convId: string, role: string, content: string) {
    try {
      await supabase
        .from("chatbot_messages")
        .insert({ conversation_id: convId, role, content });
    } catch { /* non-blocking */ }
  }

  /* ─── send message ─── */
  async function send(text: string) {
    const userMsg: Message = { id: Date.now().toString(), type: "user", text };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setLastActivity(Date.now());
    setNudged(false);
    setInput("");

    const count = exchanges + 1;
    setExchanges(count);

    // Extract qualification
    const q = extractQualification(text);
    const merged = mergeQualification(leadData, q);
    setLeadData(merged);

    if ((merged.type_client || merged.type_demande) && merged.postal_code) {
      pushEvent("chat_lead_qualified", merged);
    }

    setTyping(true);

    try {
      // Build API messages (skip welcome message)
      const apiMsgs = messages
        .filter((m) => m.type !== "system")
        .map((m) => ({
          role: m.type === "user" ? "user" : "assistant",
          content: m.text,
        }));
      apiMsgs.push({ role: "user", content: text });

      // Add page context on first exchange
      const path = window.location.pathname;
      if (messages.length <= 1) {
        let ctx = "";
        if (path === "/form") ctx = "L'utilisateur est sur le formulaire de demande.";
        else if (path === "/faq") ctx = "L'utilisateur consulte la FAQ.";
        else if (path === "/services") ctx = "L'utilisateur consulte la page des services.";
        if (ctx) apiMsgs.unshift({ role: "user", content: `[Contexte: ${ctx}]` });
      }

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ messages: apiMsgs }),
        }
      );

      if (res.status === 429 || res.status === 402) {
        setTyping(false);
        addBot(
          `Le service est temporairement surchargé. Vous pouvez nous appeler au ${CHAT_CONFIG.FALLBACK_PHONE} (${CHAT_CONFIG.FALLBACK_HOURS}).`
        );
        return;
      }

      if (!res.ok || !res.body) throw new Error("AI error");

      // SSE streaming
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      const botId = (Date.now() + 1).toString();

      setMessages((prev) => [...prev, { id: botId, type: "bot", text: "" }]);
      setTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const json = trimmed.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              setMessages((prev) =>
                prev.map((m) => (m.id === botId ? { ...m, text: assistantText } : m))
              );
            }
          } catch { /* skip */ }
        }
      }

      // Accumulate qualification from response
      const rq = extractQualification(assistantText);
      const finalLead = mergeQualification(merged, rq);
      setLeadData(finalLead);

      // Persist to chatbot_conversations + chatbot_messages
      let convId = conversationId;
      if (!convId) convId = await createConversation();
      if (convId) {
        persistMessage(convId, "user", text);
        persistMessage(convId, "assistant", assistantText);
      }

      // Human handoff detection — if AI says it can't answer, flag for team
      if (detectHandoffSignal(assistantText) && convId) {
        supabase.functions.invoke("flag-conversation", {
          body: { conversationId: convId, reason: "ai_handoff" },
        }).catch(() => {});
      }

      // Smart CTA logic
      const userIntent = detectIntent(text);
      const responseSignal = detectResponseSignal(assistantText);
      const thresholdReached = count >= CHAT_CONFIG.MAX_EXCHANGES_BEFORE_CTA;

      if (userIntent || responseSignal || thresholdReached) {
        const trigger = userIntent
          ? "user_intent"
          : responseSignal
            ? "ai_suggestion"
            : "exchange_threshold";
        setTimeout(() => showCta(trigger), 800);
      }
    } catch {
      setTyping(false);
      addBot(
        `Une erreur s'est produite. Vous pouvez nous appeler au ${CHAT_CONFIG.FALLBACK_PHONE} (${CHAT_CONFIG.FALLBACK_HOURS}).`
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) send(input.trim());
  }

  /* ─── closed state: bubble ─── */
  if (!open) {
    return (
      <button
        onClick={toggle}
        className="fixed z-50 bottom-20 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-cta flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Ouvrir le chat"
      >
        <img src="/sophie-avatar.svg" alt="Sophie" className="h-14 w-14 rounded-full" />
        {badge && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full border-2 border-white" />
        )}
        <span className="absolute bottom-0.5 right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
      </button>
    );
  }

  /* ─── open state: panel ─── */
  return (
    <div className="fixed z-50 bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[380px] h-[75vh] md:h-auto md:max-h-[560px] bg-white md:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 md:rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/sophie-avatar.svg" alt="Sophie" className="h-9 w-9 rounded-full" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {CHAT_CONFIG.ADVISOR_NAME}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Conseillère raccordement
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={`tel:${CHAT_CONFIG.FALLBACK_PHONE.replace(/\s/g, "")}`}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            aria-label="Appeler"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-muted/10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[85%]">
              <div
                className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.type === "user"
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground"
                }`}
              >
                {msg.text}
              </div>
              {msg.cta && (
                <a
                  href={msg.cta.href}
                  onClick={() => pushEvent("chat_cta_click", { ...leadData })}
                  className="mt-2 block w-full text-center px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-cta"
                >
                  {msg.cta.label}
                </a>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <Dots />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-border/50 md:rounded-b-2xl">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-muted/20 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;
