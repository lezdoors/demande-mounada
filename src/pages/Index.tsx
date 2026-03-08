import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import RequestTypesSection from "@/components/RequestTypesSection";
import ProcessSection from "@/components/ProcessSection";
import DocumentsSection from "@/components/DocumentsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import FaqSection from "@/components/FaqSection";
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
        <DocumentsSection />
        <AdvantagesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
