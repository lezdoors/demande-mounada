import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="noise-overlay py-24 sm:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(228,72%,48%) 0%, hsl(228,72%,56%) 50%, hsl(240,60%,52%) 100%)" }}>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(210 20% 98%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(210 20% 98%) 0%, transparent 50%)",
          }}
        />
      </div>
      <div className="section-container text-center relative z-10">
        <h2 className="font-heading text-[40px] sm:text-5xl font-bold text-primary-foreground mb-5">
          Pret a lancer votre raccordement ?
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
          Commencez votre demande en ligne. Notre equipe prend en charge votre dossier sous 48h.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="btn-lift rounded-full px-10 font-medium transition-all text-base"
            onClick={() => navigate("/form")}
          >
            Commencer ma demande
          </Button>
          <a
            href="tel:0188615000"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
          >
            <Phone className="h-4 w-4" />
            01 88 61 50 00 (Non surtaxe)
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
