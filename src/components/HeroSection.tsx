import { Button } from "@/components/ui/button";

const mockups = [
  { src: "/mockups/definitif.jpeg", alt: "Raccordement définitif" },
  { src: "/mockups/provisoire.jpeg", alt: "Raccordement provisoire" },
  { src: "/mockups/puissance.jpeg", alt: "Augmentation de puissance" },
  { src: "/mockups/collectif.jpeg", alt: "Raccordement collectif" },
  { src: "/mockups/definitif-alt.jpeg", alt: "Compteur Linky" },
  { src: "/mockups/provisoire-alt.jpeg", alt: "Chantier électrique" },
];

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Centered content */}
      <div className="section-container pt-20 pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] font-semibold text-foreground mb-6">
            Votre raccordement Enedis, simplifié
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            Constituez votre dossier en quelques minutes. Nous gérons les démarches auprès d'Enedis.
          </p>

          <Button variant="cta" size="lg" className="text-base h-14 px-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            Commencer ma demande
          </Button>
        </div>
      </div>

      {/* Scrolling mockup strip — Lemonade-style panoramic scene */}
      <div className="relative w-full overflow-hidden pb-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track — duplicated for seamless loop */}
        <div className="flex gap-6 animate-hero-scroll">
          {[...mockups, ...mockups].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-52 sm:w-64 lg:w-72 aspect-square rounded-2xl overflow-hidden bg-muted shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading={i < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="h-16 bg-gradient-to-b from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
