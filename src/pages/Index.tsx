import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import RequestTypesSection from "@/components/RequestTypesSection";
import ProcessSection from "@/components/ProcessSection";
import EnedisInfoSection from "@/components/EnedisInfoSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import SpecializedServicesSection from "@/components/SpecializedServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SEOContentSection from "@/components/SEOContentSection";
import FaqSection from "@/components/FaqSection";
import ActualiteSection from "@/components/ActualiteSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <RequestTypesSection />
        <ProcessSection />
        <EnedisInfoSection />
        <AdvantagesSection />
        <SpecializedServicesSection />
        <TestimonialsSection />
        <SEOContentSection />
        <FaqSection />
        <ActualiteSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
