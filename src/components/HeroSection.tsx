import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, ShieldCheck } from "lucide-react";

const trustIndicators = [
  "Processus guidé étape par étape",
  "Interface claire et structurée",
  "Transmission organisée des informations",
];

const HeroSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="fade-in">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-semibold text-foreground mb-6">
              Votre demande de raccordement électrique, structurée simplement.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Notre plateforme vous accompagne dans la préparation et la structuration
              de votre dossier de raccordement électrique. Remplissez votre demande en ligne,
              ajoutez les informations nécessaires, et transmettez un dossier complet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button variant="cta" size="lg">
                Commencer ma demande
              </Button>
              <Button variant="ctaOutline" size="lg">
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

          {/* Right visual — layered animated cards */}
          <div className="fade-in hidden lg:block relative" style={{ animationDelay: "0.15s" }}>
            {/* Background floating card 1 */}
            <div className="absolute -top-4 -right-2 w-52 bg-card border border-border rounded-lg p-4 shadow-sm animate-float-delayed z-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Documents joints</div>
                  <div className="text-[11px] text-muted-foreground">3 fichiers ajoutés</div>
                </div>
              </div>
            </div>

            {/* Background floating card 2 */}
            <div className="absolute -bottom-3 -left-4 w-56 bg-card border border-border rounded-lg p-4 shadow-sm animate-float z-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Validation du dossier</div>
                  <div className="text-[11px] text-muted-foreground">Vérification en cours</div>
                </div>
              </div>
            </div>

            {/* Main form card */}
            <div className="relative z-10 bg-card border border-border rounded-lg p-8 shadow-md animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
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
