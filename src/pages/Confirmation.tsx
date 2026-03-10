import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { trackPurchase } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, FileText, Phone, ArrowRight } from "lucide-react";

const DOSSIER_PRICE = 129.80;

const Confirmation = () => {
  usePageMeta({
    title: "Demande confirmée | Raccordement Enedis",
    description: "Votre demande de raccordement a été confirmée. Votre dossier est en cours de traitement.",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentIntentId = searchParams.get("payment_intent") || "";
  const demandeId = searchParams.get("demandeId") || "";
  const reference = searchParams.get("ref") || "";
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!demandeId && !paymentIntentId) {
      navigate("/");
      return;
    }

    if (paymentIntentId && !tracked) {
      trackPurchase(paymentIntentId, DOSSIER_PRICE);
      setTracked(true);
    }
  }, [demandeId, paymentIntentId, navigate, tracked]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
            Demande confirmée.
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Votre dossier de raccordement est en cours de traitement par nos équipes.
          </p>

          {/* Reference card */}
          {reference && (
            <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Référence de votre dossier
                  </p>
                  <p className="font-heading text-xl text-foreground font-semibold tracking-wide">
                    {reference}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Conservez cette référence. Vous recevrez un e-mail de confirmation avec les détails de votre dossier.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Prochaines étapes
            </h2>
            <ol className="space-y-4">
              {[
                "Vérification de votre dossier par nos équipes (24-48h)",
                "Soumission de votre demande auprès d'Enedis",
                "Vous recevrez un suivi par e-mail à chaque étape",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="cta"
              className="rounded-full shadow-cta px-8"
              onClick={() => navigate("/")}
            >
              Retour à l'accueil
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <a
              href="tel:0188615000"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              01 88 61 50 00
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Confirmation;
