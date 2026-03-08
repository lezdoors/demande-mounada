import { Button } from "@/components/ui/button";

const FinalCtaSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-primary">
      <div className="section-container text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary-foreground mb-5">
          Commencez votre demande de raccordement en ligne
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Le formulaire est conçu pour vous guider étape par étape dans la préparation
          de votre dossier.
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="font-medium hover:scale-[1.02] transition-all duration-200"
        >
          Commencer ma demande
        </Button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
