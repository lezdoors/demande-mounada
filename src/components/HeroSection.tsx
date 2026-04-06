import { useNavigate } from "react-router-dom";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <CinematicHero
      tagline1="Votre raccordement,"
      tagline2="simplifie et garanti."
      brandName="ENEDIS"
      cardHeading="Votre dossier, notre expertise."
      cardDescription={
        <>
          Nous preparons et verifions votre dossier de raccordement electrique
          pour garantir sa conformite aux exigences{" "}
          <span className="text-white font-semibold">Enedis</span>. Traitement
          sous 48h.
        </>
      }
      metricValue={4}
      metricLabel="Etapes"
      ctaHeading="Lancez votre raccordement."
      ctaDescription="Remplissez le formulaire en quelques minutes. Nous nous occupons de tout le reste."
      onCtaClick={() => navigate("/form")}
    />
  );
};

export default HeroSection;
