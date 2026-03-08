import { FileText } from "lucide-react";

const documents = [
  "Autorisation d'urbanisme",
  "Plan de situation",
  "Plan de masse",
  "Photographies du terrain",
  "Informations techniques du projet",
  "Coordonnées du demandeur",
];

const DocumentsSection = () => {
  return (
    <section id="documents" className="section-padding bg-muted/40">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3">
              Documents requis
            </h2>
            <p className="text-muted-foreground">
              Selon la nature de votre projet, les documents suivants peuvent être demandés
              lors de la constitution de votre dossier.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {documents.map((doc) => (
              <div key={doc} className="flex items-center gap-3 px-6 py-4">
                <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{doc}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Cette liste est indicative. Les documents nécessaires peuvent varier selon la nature et la localisation de votre projet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
