import { FolderOpen, Clock, LayoutList, User } from "lucide-react";

const advantages = [
  {
    icon: FolderOpen,
    title: "Organisation claire du dossier",
    description: "Vos informations sont structurées de manière cohérente pour constituer un dossier complet.",
  },
  {
    icon: Clock,
    title: "Gain de temps dans les démarches",
    description: "Le formulaire guidé vous permet de préparer votre demande efficacement, sans oubli.",
  },
  {
    icon: LayoutList,
    title: "Présentation structurée des informations",
    description: "Chaque élément est organisé selon les exigences administratives habituelles.",
  },
  {
    icon: User,
    title: "Interface simple pour les particuliers",
    description: "Conçue pour être accessible, même sans connaissance technique préalable.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3">
            Pourquoi utiliser ce service
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {advantages.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="h-10 w-10 rounded-md bg-primary/8 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
