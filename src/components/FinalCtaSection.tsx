import { Button } from "@/components/ui/button";

const FinalCtaSection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="section-container text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary-foreground mb-4">
          Commencez votre demande de raccordement en ligne
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Le formulaire est conçu pour vous guider étape par étape dans la préparation
          de votre dossier.
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="font-medium"
        >
          Commencer ma demande
        </Button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
