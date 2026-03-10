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
import NotFound from "./pages/NotFound";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
