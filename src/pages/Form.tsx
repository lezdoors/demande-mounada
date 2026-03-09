import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: "type", label: "TYPE" },
  { id: "projet", label: "PROJET" },
  { id: "details", label: "DETAILS" },
  { id: "contact", label: "CONTACT" },
];

const typeOptions = [
  "Raccordement definitif",
  "Raccordement provisoire",
  "Viabilisation de terrain",
  "Augmentation de puissance",
  "Raccordement collectif",
  "Autre demande",
];

const Form = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    usage: "",
    puissance: "",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    message: "",
  });

  const handleTypeSelect = (type: string) => {
    setFormData({ ...formData, type });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const canNext = () => {
    switch (currentStep) {
      case 0: return formData.type !== "";
      case 1: return formData.usage !== "";
      case 2: return formData.adresse !== "" && formData.codePostal !== "";
      case 3: return formData.prenom !== "" && formData.nom !== "" && formData.email !== "";
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header — Lemonade style */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-border/50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <span className="font-heading text-lg text-foreground">
            Demande <span className="text-primary">Raccordement</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <button onClick={handleBack} className="p-1.5 hover:bg-muted rounded-md transition-colors">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Avatar */}
      <div className="flex justify-center pt-6 pb-2">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-heading text-primary">E</span>
        </div>
      </div>

      {/* Step tabs */}
      <div className="flex justify-center gap-0 px-4 mb-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex-1 max-w-[120px] text-center">
            <div className="text-[10px] sm:text-xs font-medium tracking-wider text-muted-foreground mb-1.5 uppercase">
              {step.label}
            </div>
            <div className="h-0.5 rounded-full" style={{
              background: i <= currentStep ? "hsl(228 72% 52%)" : "#e5e5e5",
            }} />
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          {/* Step 0: Type */}
          {currentStep === 0 && (
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                Bonjour !
              </h2>
              <p className="text-muted-foreground mb-8">
                Quel type de raccordement vous interesse ?
              </p>
              <div className="space-y-3">
                {typeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleTypeSelect(option)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all ${
                      formData.type === option
                        ? "border-primary bg-primary/4 text-foreground"
                        : "border-border bg-muted/30 text-foreground hover:border-primary/30"
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.type === option ? "border-primary" : "border-muted-foreground/30"
                    }`}>
                      {formData.type === option && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Projet */}
          {currentStep === 1 && (
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                Parlez-nous de votre projet.
              </h2>
              <p className="text-muted-foreground mb-8">
                Decrivez l'usage prevu pour le raccordement.
              </p>
              <div className="space-y-3">
                {["Habitation principale", "Construction neuve", "Chantier de construction", "Local professionnel", "Autre"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleChange("usage", option)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all ${
                      formData.usage === option
                        ? "border-primary bg-primary/4 text-foreground"
                        : "border-border bg-muted/30 text-foreground hover:border-primary/30"
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.usage === option ? "border-primary" : "border-muted-foreground/30"
                    }`}>
                      {formData.usage === option && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                Ou se situe votre projet ?
              </h2>
              <p className="text-muted-foreground mb-8">
                L'adresse du lieu de raccordement.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="ADRESSE"
                  value={formData.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="CODE POSTAL"
                    value={formData.codePostal}
                    onChange={(e) => handleChange("codePostal", e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="VILLE"
                    value={formData.ville}
                    onChange={(e) => handleChange("ville", e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <textarea
                  placeholder="MESSAGE OU PRECISIONS (OPTIONNEL)"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {currentStep === 3 && (
            <div className="text-center">
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                Vos coordonnees.
              </h2>
              <p className="text-muted-foreground mb-8">
                Pour que nous puissions vous recontacter.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="PRENOM"
                    value={formData.prenom}
                    onChange={(e) => handleChange("prenom", e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="NOM"
                    value={formData.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="TELEPHONE"
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium uppercase tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {/* Next button */}
          <div className="mt-10 pb-10">
            <Button
              variant="cta"
              size="lg"
              className={`w-full rounded-xl text-sm uppercase tracking-wider font-semibold h-14 transition-all ${
                canNext() ? "opacity-100" : "opacity-40 pointer-events-none"
              }`}
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? "Envoyer ma demande" : "Suivant"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
