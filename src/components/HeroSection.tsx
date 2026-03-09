import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, ShieldCheck, File } from "lucide-react";

const trustIndicators = [
  "Processus guidé étape par étape",
  "Interface claire et structurée",
  "Transmission organisée des informations",
];

const HeroSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="fade-in">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] font-semibold text-foreground mb-8">
              Votre demande de raccordement électrique, structurée simplement.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Notre plateforme vous accompagne dans la préparation et la structuration
              de votre dossier de raccordement électrique. Remplissez votre demande en ligne,
              ajoutez les informations nécessaires, et transmettez un dossier complet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button variant="cta" size="lg" className="text-base h-12 px-8">
                Commencer ma demande
              </Button>
              <Button variant="ctaOutline" size="lg" className="text-base h-12 px-8">
                Voir les étapes
              </Button>
            </div>

            <ul className="space-y-3">
              {trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right visual — three layered cards */}
          <div className="fade-in hidden lg:block relative h-[480px]" style={{ animationDelay: "0.15s" }}>
            {/* Card 3 (back) — Validation */}
            <div
              className="absolute top-0 right-0 w-64 bg-card border border-border rounded-xl p-5 shadow-sm animate-float-delayed z-0"
              style={{ transform: "rotate(2deg)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Validation du dossier</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Votre dossier est en cours de préparation. Toutes les pièces seront vérifiées avant transmission.
              </p>
            </div>

            {/* Card 2 (middle) — Documents */}
            <div
              className="absolute bottom-4 left-0 w-60 bg-card border border-border rounded-xl p-5 shadow-md animate-float-delayed z-10"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Documents joints</div>
              </div>
              <div className="space-y-2.5">
                {["Plan de masse.pdf", "Plan de situation.pdf", "Photo du terrain.jpg"].map((name) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <File className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 1 (front) — Main form */}
            <div
              className="absolute top-16 left-12 right-8 bg-card border border-border rounded-xl p-7 shadow-lg animate-float z-20"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-sm bg-primary/30" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Demande de raccordement</div>
                    <div className="text-xs text-muted-foreground">Formulaire en cours</div>
                  </div>
                </div>

                {["Informations du demandeur", "Adresse du projet", "Type de raccordement", "Documents joints"].map((label, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium ${i < 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {i < 2 ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary animate-progress-fill" style={{ width: 0 }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Progression : 50%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
