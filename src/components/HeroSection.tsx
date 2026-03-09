import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const illustrationStyle = "grayscale(1) brightness(1.8) contrast(0.4)";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] bg-background overflow-hidden flex flex-col items-center justify-center">
      {/* Left-side scene */}
      <div className="hidden lg:block absolute left-0 bottom-0 w-[40%] h-[65%] pointer-events-none select-none">
        <img
          src="/mockups/collectif.jpeg"
          alt=""
          className="absolute bottom-0 -left-4 w-[60%] rounded-tr-3xl object-cover"
          style={{ filter: illustrationStyle, maxHeight: "75%" }}
        />
        <img
          src="/mockups/definitif.jpeg"
          alt=""
          className="absolute bottom-12 left-[28%] w-[55%] rounded-2xl object-cover"
          style={{ filter: illustrationStyle, maxHeight: "80%" }}
        />
      </div>

      {/* Right-side scene */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-[40%] h-[65%] pointer-events-none select-none">
        <img
          src="/mockups/provisoire.jpeg"
          alt=""
          className="absolute bottom-0 -right-4 w-[60%] rounded-tl-3xl object-cover"
          style={{ filter: illustrationStyle, maxHeight: "75%" }}
        />
        <img
          src="/mockups/puissance.jpeg"
          alt=""
          className="absolute bottom-12 right-[28%] w-[55%] rounded-2xl object-cover"
          style={{ filter: illustrationStyle, maxHeight: "80%" }}
        />
      </div>

      {/* Wide center gradient */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 45%, hsl(210 20% 98%) 30%, transparent 75%)"
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 section-container text-center py-12 lg:py-0">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-foreground mb-4 max-w-3xl mx-auto">
          Partenaire n&deg;1 en France dans l'aide au raccordement Enedis.
        </h1>

        <p className="text-base lg:text-lg text-primary mb-6 max-w-lg mx-auto font-medium">
          Confiez-nous le d&eacute;p&ocirc;t et le suivi de votre dossier de raccordement Enedis.
        </p>

        <Button
          variant="cta"
          size="lg"
          className="text-base sm:text-lg h-13 sm:h-14 px-10 sm:px-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] uppercase tracking-wider font-semibold"
          onClick={() => navigate("/form")}
        >
          Commencer ma demande
        </Button>
      </div>

      {/* Mobile scrolling strip */}
      <div className="lg:hidden relative w-full overflow-hidden mt-6 pb-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-hero-scroll">
          {[
            "/mockups/definitif.jpeg",
            "/mockups/provisoire.jpeg",
            "/mockups/puissance.jpeg",
            "/mockups/collectif.jpeg",
            "/mockups/definitif-alt.jpeg",
            "/mockups/provisoire-alt.jpeg",
            "/mockups/definitif.jpeg",
            "/mockups/provisoire.jpeg",
            "/mockups/puissance.jpeg",
            "/mockups/collectif.jpeg",
            "/mockups/definitif-alt.jpeg",
            "/mockups/provisoire-alt.jpeg",
          ].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-40 aspect-square rounded-xl overflow-hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: illustrationStyle }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
