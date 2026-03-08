import { FileText } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const documents = [
  "Autorisation d'urbanisme",
  "Plan de situation",
  "Plan de masse",
  "Photographies du terrain",
  "Informations techniques du projet",
  "Coordonnées du demandeur",
];

const DocumentsSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="documents" className="section-padding bg-muted/40">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div ref={ref} className="scroll-fade-in text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Documents requis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selon la nature de votre projet, les documents suivants peuvent être demandés
              lors de la constitution de votre dossier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc}
                className="bg-card border border-border rounded-lg p-5 flex items-center gap-3.5 hover:shadow-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="h-9 w-9 rounded-md bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{doc}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Cette liste est indicative. Les documents nécessaires peuvent varier selon la nature et la localisation de votre projet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
