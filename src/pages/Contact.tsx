import { usePageMeta } from "@/hooks/usePageMeta";
import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const contactCards = [
  {
    icon: Phone,
    title: "Telephone",
    value: "01 88 61 50 00",
    subtitle: "Appel non surtaxe",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@demande-raccordement.fr",
    subtitle: "Reponse sous 24h ouvrees",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Ven 9h-18h",
    subtitle: "Hors jours feries",
  },
];

const subjectOptions = [
  "Renseignements sur le service",
  "Suivi de mon dossier",
  "Probleme technique",
  "Demande de remboursement",
  "Partenariat / Professionnel",
  "Autre",
];

const Contact = () => {
  usePageMeta({
    title: "Contactez le Service Raccordement | Demande Raccordement",
    description: "Contactez notre service raccordement Enedis. Réponse sous 24h. Téléphone, email, formulaire en ligne.",
  });
  const heroRef = useScrollFadeIn();
  const cardsRef = useScrollFadeIn();
  const formRef = useScrollFadeIn();
  const mapRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-muted/40">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                Contact
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Contactez-nous
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Une question sur votre dossier de raccordement ? Notre equipe est disponible
                pour vous accompagner dans toutes vos demarches.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={cardsRef} className="scroll-fade-in">
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {contactCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
                      <card.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm font-medium text-foreground mb-1">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding bg-muted/40">
          <div className="section-container">
            <div ref={formRef} className="scroll-fade-in max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-3">
                  Envoyez-nous un message
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Remplissez le formulaire ci-dessous et nous vous repondrons dans les meilleurs delais.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom complet
                      </label>
                      <Input placeholder="Jean Dupont" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <Input type="email" placeholder="jean.dupont@email.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Telephone
                      </label>
                      <Input type="tel" placeholder="06 12 34 56 78" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Sujet
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjectOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Message
                    </label>
                    <Textarea
                      placeholder="Decrivez votre demande..."
                      className="min-h-[140px]"
                    />
                  </div>

                  <Button variant="cta" className="w-full rounded-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map / Address Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={mapRef} className="scroll-fade-in text-center max-w-2xl mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">
                Service 100% en ligne
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-3">
                Pas de bureau physique. Notre service est entierement dematerialise
                pour vous offrir un accompagnement rapide et efficace, ou que vous soyez en France.
              </p>
              <p className="text-sm text-muted-foreground">
                Toutes vos demarches de raccordement sont gerees en ligne, de la constitution
                du dossier jusqu'a son envoi a Enedis.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Contact;
