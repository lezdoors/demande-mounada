import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Form from "./pages/Form";
import Services from "./pages/Services";
import Enedis from "./pages/Enedis";
import Faq from "./pages/Faq";
import CommentCaMarche from "./pages/CommentCaMarche";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import Paiement from "./pages/Paiement";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import MobileStickyBar from "./components/MobileStickyBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/form" element={<Form />} />
          <Route path="/services" element={<Services />} />
          <Route path="/enedis" element={<Enedis />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions-generales" element={<ConditionsGenerales />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileStickyBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
