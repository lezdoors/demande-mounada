import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2 } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
  locale: "fr",
});

const DOSSIER_PRICE = 129.80;

/* ─── Payment form inner component ─── */
function CheckoutForm({
  demandeId,
  leadId,
  reference,
  clientSecret,
  summary,
}: {
  demandeId: string;
  leadId: string;
  reference: string;
  clientSecret: string;
  summary: { first_name: string; last_name: string; email: string; phone: string; type_demande: string } | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Erreur de validation");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation?demandeId=${demandeId}&leadId=${leadId}&ref=${reference}`,
        payment_method_data: {
          billing_details: {
            name: summary ? `${summary.first_name} ${summary.last_name}` : "",
            email: summary?.email || "",
            phone: summary?.phone || "",
          },
        },
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Erreur lors du traitement");
      setProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      navigate(
        `/confirmation?payment_intent=${paymentIntent.id}&demandeId=${demandeId}&leadId=${leadId}&ref=${reference}`
      );
    }
  };

  const TYPE_LABELS: Record<string, string> = {
    provisoire: "Raccordement provisoire",
    definitif: "Raccordement définitif",
    augmentation_puissance: "Modification de branchement",
    collectif: "Viabilisation de terrain",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary */}
      <div className="bg-muted/30 rounded-xl p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          Récapitulatif de votre dossier
        </h3>
        <div className="space-y-2 text-sm">
          {summary && (
            <>
              <p className="font-medium">{summary.first_name} {summary.last_name}</p>
              <p className="text-muted-foreground">{TYPE_LABELS[summary.type_demande] || summary.type_demande}</p>
            </>
          )}
          <p className="text-muted-foreground">Référence : {reference}</p>
        </div>
        <div className="border-t border-border mt-4 pt-3 flex items-center justify-between">
          <span className="text-sm font-medium">Frais de dossier</span>
          <span className="text-lg font-heading font-semibold">{DOSSIER_PRICE.toFixed(2)} &euro;</span>
        </div>
      </div>

      {/* Card input */}
      <div className="bg-white border border-border rounded-xl p-5">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={!stripe || processing}
        className="w-full rounded-xl text-sm uppercase tracking-wider font-semibold h-14 shadow-cta"
      >
        {processing ? "Traitement en cours..." : `Valider — ${DOSSIER_PRICE.toFixed(2)} €`}
      </Button>
    </form>
  );
}

/* ─── Main payment page ─── */
const Paiement = () => {
  usePageMeta({
    title: "Finaliser votre demande | Raccordement Enedis",
    description: "Finalisez votre demande de raccordement Enedis.",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const demandeId = searchParams.get("demandeId") || "";
  const leadId = searchParams.get("leadId") || "";
  const reference = searchParams.get("ref") || "";

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    first_name: string; last_name: string; email: string; phone: string; type_demande: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!demandeId) {
      navigate("/form");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("dr-create-payment-intent", {
          body: { demandeId, leadId, quantity: 1 },
        });
        if (fnError) throw fnError;
        setClientSecret(data.clientSecret);
        if (data.summary) setSummary(data.summary);
      } catch {
        setError("Impossible de préparer le dossier. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [demandeId, leadId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Préparation de votre dossier...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-destructive mb-4">{error || "Erreur de chargement"}</p>
            <Button variant="cta" onClick={() => navigate("/form")} className="rounded-full shadow-cta">
              Recommencer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Progress indicator */}
        <div className="flex justify-center gap-0 px-4 pt-6 mb-2">
          {["COORDONNÉES", "PROJET", "VALIDATION"].map((label, i) => (
            <div key={label} className="flex-1 max-w-[140px] text-center">
              <div className="text-[10px] sm:text-xs font-medium tracking-wider text-muted-foreground mb-1.5 uppercase">
                {label}
              </div>
              <div
                className="h-0.5 rounded-full"
                style={{ background: i <= 2 ? "hsl(228 72% 52%)" : "#e5e5e5" }}
              />
            </div>
          ))}
        </div>

        {/* Avatar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-4 sm:px-6 pb-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                Finalisez votre demande.
              </h1>
              <p className="text-muted-foreground">
                Votre dossier est prêt. Procédez au règlement pour lancer le traitement.
              </p>
            </div>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "flat",
                  variables: {
                    colorPrimary: "hsl(228, 72%, 52%)",
                    borderRadius: "12px",
                    fontFamily: "Inter, system-ui, sans-serif",
                  },
                },
              }}
            >
              <CheckoutForm
                demandeId={demandeId}
                leadId={leadId}
                reference={reference}
                clientSecret={clientSecret}
                summary={summary}
              />
            </Elements>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Paiement;
