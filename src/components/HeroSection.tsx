import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fadedStyle = "grayscale(1) brightness(1.8) contrast(0.4)";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="noise-overlay relative min-h-[70vh] overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #e8eef6 0%, hsl(210 20% 98%) 60%, #ffffff 100%)",
      }}
    >
      {/* Subtle background image — low opacity atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url(/mockups/definitif.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      {/* Parallax-hint perspective wrapper */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      />

      {/* Left-side supporting mockups — smaller, faded */}
      <div className="hidden lg:block absolute left-0 bottom-0 w-[38%] h-[70%] pointer-events-none select-none z-[2]">
        <img
          src="/mockups/collectif.jpeg"
          alt=""
          className="absolute bottom-0 left-[8%] w-[48%] rounded-tr-3xl object-cover"
          style={{ filter: fadedStyle, maxHeight: "70%" }}
        />
        <img
          src="/mockups/puissance.jpeg"
          alt=""
          className="absolute bottom-12 left-[34%] w-[44%] rounded-2xl object-cover"
          style={{ filter: fadedStyle, maxHeight: "65%" }}
        />
      </div>

      {/* Right-side hero object — large, full color, prominent */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-[42%] h-[80%] pointer-events-none select-none z-[3]">
        <img
          src="/mockups/definitif.jpeg"
          alt=""
          className="absolute bottom-0 right-[6%] w-[65%] rounded-2xl object-cover shadow-xl"
          style={{ maxHeight: "90%", borderRadius: "20px" }}
        />
      </div>

      {/* Center gradient — softer, lets glass card stand out */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-[4]"
        style={{
          background: "radial-gradient(ellipse 50% 100% at 45% 45%, rgba(232,238,246,0.92) 30%, transparent 72%)"
        }}
      />

      {/* Centered content — directly on hero */}
      <div className="relative z-10 section-container text-center py-12 lg:py-0 max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] text-foreground mb-4 font-bold">
          Partenaire n&deg;1 en France dans l'aide au raccordement Enedis.
        </h1>

        <p className="text-lg lg:text-xl text-primary mb-6 max-w-lg mx-auto font-medium">
          Confiez-nous le d&eacute;p&ocirc;t et le suivi de votre dossier de raccordement Enedis.
        </p>

        <Button
          variant="cta"
          size="lg"
          className="btn-lift text-base sm:text-lg h-13 sm:h-14 px-10 sm:px-14 rounded-full shadow-cta uppercase tracking-wider font-semibold"
          onClick={() => navigate("/form")}
        >
          Commencer ma demande
        </Button>
      </div>

      {/* Mobile scrolling strip — full color, larger images */}
      <div className="lg:hidden relative w-full overflow-hidden mt-6 pb-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
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
            <div key={i} className="flex-shrink-0 w-48 aspect-square rounded-xl overflow-hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
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
