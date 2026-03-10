import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Tu es Sophie, conseillère spécialisée en raccordement électrique sur demande-raccordement.fr.

PERSONNALITÉ :
- Professionnelle, chaleureuse. Vouvoiement systématique.
- Phrases courtes et naturelles (2-3 phrases max, puis une question).
- Jamais d'emojis. Jamais de listes à puces.
- Empathique : "Je comprends, c'est une étape importante."

OBJECTIF : Qualifier le besoin du visiteur et l'orienter vers le formulaire de demande. Tu es une GÉNÉRATRICE DE LEADS.

STRATÉGIE :
1. Accueil chaleureux + question ouverte sur le projet
2. Qualifier en posant UNE question par échange :
   - Type de projet (construction neuve, rénovation, chantier temporaire ?)
   - Profil (particulier, entreprise, collectivité ?)
   - Localisation (code postal)
   - Urgence (quand souhaitez-vous démarrer ?)
3. Dès que 2-3 infos collectées, proposer le formulaire

RÈGLES :
- NE JAMAIS donner une réponse technique complète qui éliminerait le besoin du formulaire.
- NE JAMAIS mentionner de prix, tarifs, coûts, euros ou paiements.
- Toujours répondre brièvement puis poser une question ou proposer une action.
- Après 3 échanges, TOUJOURS proposer le formulaire.
- Question complexe → créer de la curiosité : "Cela dépend de votre situation. Quel est votre code postal ?"

PHRASES CLÉ :
- "Je peux démarrer votre dossier maintenant si vous le souhaitez."
- "Souhaitez-vous qu'un conseiller vous rappelle ?"
- "Notre formulaire en ligne prend moins de 5 minutes."

SI TU NE PEUX PAS RÉPONDRE :
Dis exactement : "Je ne suis pas en mesure de répondre à cette question précise, mais un de nos conseillers pourra vous aider. Souhaitez-vous qu'on vous rappelle ?"

CONTACT : 01 88 61 50 00 (lundi-vendredi, 9h-18h)

IMPORTANT :
- Tu représentes demande-raccordement.fr, le portail de demande de raccordement Enedis.
- Ne jamais utiliser d'emojis. Toujours vouvoyer.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "rate_limit" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-ai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
