import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ArrowLeft, HelpCircle, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── slide-out menu links (Lemonade style) ─── */
const menuLinks = [
  { label: "Nos services", href: "/#services" },
  { label: "Comment ça marche", href: "/#process" },
  { label: "Enedis", href: "/#enedis" },
  { label: "FAQ", href: "/#faq" },
  { label: "Recommencer", action: "reset" },
];

/* ─── step tabs (matching connect's 4 main sections) ─── */
const tabs = [
  { label: "COORDONNÉES", steps: [0, 1] },
  { label: "PROJET", steps: [2, 3, 4, 5, 6] },
  { label: "ENVOI", steps: [7] },
];

const TOTAL_STEPS = 8;

/* ─── option sets (matching connect exactly) ─── */
const serviceTypes = [
  { value: "provisoire", label: "Provisoire ou chantier" },
  { value: "definitif", label: "Raccordement définitif" },
  { value: "augmentation_puissance", label: "Modification de branchement" },
  { value: "collectif", label: "Viabilisation de terrain" },
];

const dateInterventionOptions = [
  "Dans 17 jours",
  "Le mois prochain",
  "+3 mois",
];

const clientTypes = [
  { value: "particulier", label: "Particulier" },
  { value: "entreprise", label: "Entreprise" },
  { value: "collectivite", label: "Collectivité" },
];

const buildingTypes = [
  "Maison",
  "Immeuble",
  "Commercial",
  "Industriel",
  "Terrain nu",
];

const horsEauOptions = ["Oui", "Non"];
const compteurOptions = ["Oui", "Non", "Je ne sais pas"];

const PUISSANCE_MONO = [3, 6, 9, 12];
const PUISSANCE_TRI = [12, 15, 18, 24, 30, 36];

const delaiOptions = [
  "Moins d'1,5 mois",
  "Entre 1,5 et 3 mois",
  "Entre 3 et 6 mois",
  "Plus de 6 mois",
];

/* ─── form data (CRM-compatible field names matching connect) ─── */
interface FormData {
  // Step 1 - Contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  code_postal_projet: string;
  ville_projet: string;
  // Step 2 - Demand type
  type_demande: string;
  date_intervention: string;
  // Step 2 - Client type
  type_client: string;
  raison_sociale: string;
  siren: string;
  nom_collectivite: string;
  service_direction: string;
  siret_insee: string;
  // Step 2 - Address
  adresse_projet: string;
  complement_adresse: string;
  adresse_facturation_diff: boolean;
  adresse_facturation: string;
  code_postal_facturation: string;
  ville_facturation: string;
  // Step 3 - Project
  usage_raccordement: string;
  hors_eau_hors_air: string;
  type_alimentation: string;
  puissance_kva: number | null;
  delai_souhaite: string;
  compteur_existant: string;
  commentaires: string;
  // Consent
  consent: boolean;
}

const initialData: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  code_postal_projet: "",
  ville_projet: "",
  type_demande: "",
  date_intervention: "",
  type_client: "particulier",
  raison_sociale: "",
  siren: "",
  nom_collectivite: "",
  service_direction: "",
  siret_insee: "",
  adresse_projet: "",
  complement_adresse: "",
  adresse_facturation_diff: false,
  adresse_facturation: "",
  code_postal_facturation: "",
  ville_facturation: "",
  usage_raccordement: "",
  hors_eau_hors_air: "",
  type_alimentation: "",
  puissance_kva: null,
  delai_souhaite: "",
  compteur_existant: "",
  commentaires: "",
  consent: false,
};

/* ─── radio option component ─── */
function RadioOption({
  label,
  selected,
  onClick,
  description,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all ${
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-muted/30 text-foreground hover:border-primary/30"
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-primary" : "border-muted-foreground/30"
        }`}
      >
        {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </div>
      <div>
        <span className="text-sm font-medium">{label}</span>
        {description && (
          <span className="block text-xs text-muted-foreground mt-0.5">{description}</span>
        )}
      </div>
    </button>
  );
}

/* ─── text input component ─── */
function FormInput({
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
  error,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className={`w-full px-5 py-4 rounded-xl border text-sm font-medium tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors ${
          error ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
        }`}
      />
      {error && <p className="text-xs text-destructive mt-1 ml-1">{error}</p>}
    </div>
  );
}

/* ─── checkbox component ─── */
function FormCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`h-5 w-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-primary border-primary" : "border-muted-foreground/30"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      {children}
    </label>
  );
}

/* ─── main form ─── */
const Form = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fd, setFd] = useState<FormData>(initialData);
  const [cities, setCities] = useState<string[]>([]);
  const [cityOpen, setCityOpen] = useState(false);
  const [billingCities, setBillingCities] = useState<string[]>([]);
  const [billingCityOpen, setBillingCityOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setFd((prev) => ({ ...prev, [key]: val }));

  /* ─── city auto-fetch from postcode (project) ─── */
  useEffect(() => {
    if (fd.code_postal_projet.length === 5 && /^\d{5}$/.test(fd.code_postal_projet)) {
      fetch(`https://geo.api.gouv.fr/communes?codePostal=${fd.code_postal_projet}&fields=nom`)
        .then((r) => r.json())
        .then((data: { nom: string }[]) => {
          const names = data.map((c) => c.nom);
          setCities(names);
          if (names.length === 1) set("ville_projet", names[0]);
        })
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
  }, [fd.code_postal_projet]);

  /* ─── city auto-fetch from postcode (billing) ─── */
  useEffect(() => {
    if (fd.code_postal_facturation.length === 5 && /^\d{5}$/.test(fd.code_postal_facturation)) {
      fetch(`https://geo.api.gouv.fr/communes?codePostal=${fd.code_postal_facturation}&fields=nom`)
        .then((r) => r.json())
        .then((data: { nom: string }[]) => {
          const names = data.map((c) => c.nom);
          setBillingCities(names);
          if (names.length === 1) set("ville_facturation", names[0]);
        })
        .catch(() => setBillingCities([]));
    } else {
      setBillingCities([]);
    }
  }, [fd.code_postal_facturation]);

  /* ─── reset power when phase changes (matching connect logic) ─── */
  useEffect(() => {
    if (fd.type_alimentation === "inconnu") {
      set("puissance_kva", 6);
    } else if (fd.type_alimentation === "monophase") {
      if (fd.puissance_kva && !PUISSANCE_MONO.includes(fd.puissance_kva)) set("puissance_kva", 6);
    } else if (fd.type_alimentation === "triphase") {
      if (fd.puissance_kva && !PUISSANCE_TRI.includes(fd.puissance_kva)) set("puissance_kva", 12);
    }
  }, [fd.type_alimentation]);

  /* ─── validation per step ─── */
  const validate = (): boolean => {
    const e: Record<string, string> = {};

    switch (step) {
      case 0:
        if (fd.first_name.trim().length < 2) e.first_name = "Prénom requis";
        if (fd.last_name.trim().length < 2) e.last_name = "Nom requis";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = "Email invalide";
        {
          const cleaned = fd.phone.replace(/\D/g, "");
          const valid =
            /^0[1-9]\d{8}$/.test(cleaned) ||
            /^33[1-9]\d{8}$/.test(cleaned) ||
            /^(\+33|0033)[1-9]\d{8}$/.test(fd.phone.replace(/\s/g, ""));
          if (!valid) e.phone = "Format: 06 12 34 56 78";
        }
        break;
      case 1: {
        const cp = fd.code_postal_projet.replace(/\D/g, "");
        if (cp.length !== 5) e.code_postal_projet = "5 chiffres requis";
        if (!fd.ville_projet.trim() || fd.ville_projet.length < 2) e.ville_projet = "Ville requise";
        break;
      }
      case 2:
        if (!fd.type_demande) e.type_demande = "Requis";
        break;
      case 3:
        if (!fd.type_client) e.type_client = "Requis";
        if (fd.type_client === "entreprise" && fd.siren && !/^\d{9}$/.test(fd.siren))
          e.siren = "SIREN : 9 chiffres";
        break;
      case 4:
        if (!fd.adresse_projet.trim() || fd.adresse_projet.length < 5)
          e.adresse_projet = "Adresse requise (min. 5 car.)";
        {
          const cp = fd.code_postal_projet.replace(/\D/g, "");
          if (cp.length !== 5) e.code_postal_projet = "5 chiffres requis";
        }
        if (!fd.ville_projet.trim()) e.ville_projet = "Ville requise";
        if (fd.adresse_facturation_diff) {
          if (!fd.adresse_facturation.trim()) e.adresse_facturation = "Adresse requise";
          const cpb = fd.code_postal_facturation.replace(/\D/g, "");
          if (cpb.length !== 5) e.code_postal_facturation = "5 chiffres requis";
          if (!fd.ville_facturation.trim()) e.ville_facturation = "Ville requise";
        }
        break;
      case 5:
        // Building type optional in connect, but required radio
        break;
      case 6:
        if (!fd.type_alimentation) e.type_alimentation = "Requis";
        break;
      case 7:
        if (!fd.consent) e.consent = "Requis";
        break;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0:
        return (
          fd.first_name.trim().length >= 2 &&
          fd.last_name.trim().length >= 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email) &&
          fd.phone.replace(/\D/g, "").length >= 10
        );
      case 1:
        return /^\d{5}$/.test(fd.code_postal_projet) && fd.ville_projet.trim().length >= 2;
      case 2:
        return !!fd.type_demande;
      case 3:
        return !!fd.type_client;
      case 4:
        return (
          fd.adresse_projet.trim().length >= 5 &&
          /^\d{5}$/.test(fd.code_postal_projet) &&
          fd.ville_projet.trim().length > 0 &&
          (!fd.adresse_facturation_diff ||
            (fd.adresse_facturation.trim().length > 0 &&
              /^\d{5}$/.test(fd.code_postal_facturation) &&
              fd.ville_facturation.trim().length > 0))
        );
      case 5:
        return true; // building type optional
      case 6:
        return !!fd.type_alimentation;
      case 7:
        return fd.consent;
      default:
        return false;
    }
  };

  const next = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // TODO: wire CRM submission (submit-demande) + redirect to payment page
    console.log("Form submitted:", fd);
  };

  /* ─── power options based on phase (matching connect) ─── */
  const powerOptions =
    fd.type_alimentation === "monophase"
      ? PUISSANCE_MONO
      : fd.type_alimentation === "triphase"
        ? PUISSANCE_TRI
        : [];

  /* ─── which tab is active ─── */
  const activeTabIdx = tabs.findIndex((t) => t.steps.includes(step));

  /* ─── city dropdown helper ─── */
  const CityField = ({
    value,
    onChange,
    citiesList,
    open,
    setOpen,
    error,
  }: {
    value: string;
    onChange: (v: string) => void;
    citiesList: string[];
    open: boolean;
    setOpen: (v: boolean) => void;
    error?: string;
  }) => {
    if (citiesList.length > 1) {
      return (
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`w-full px-5 py-4 rounded-xl border text-left text-sm font-medium tracking-wide transition-colors ${
              value
                ? "border-border bg-muted/30 text-foreground"
                : "border-border bg-muted/30 text-muted-foreground/40"
            } focus:outline-none focus:border-primary`}
          >
            {value || "Ville"}
            <ChevronDown className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
          </button>
          {open && (
            <div className="absolute z-10 top-full mt-1 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
              {citiesList.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                  className={`w-full px-5 py-3 text-left text-sm hover:bg-muted/50 transition-colors ${
                    value === c ? "bg-primary/5 text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {error && <p className="text-xs text-destructive mt-1 ml-1">{error}</p>}
        </div>
      );
    }
    return (
      <FormInput
        placeholder="Ville"
        value={value}
        onChange={onChange}
        error={error}
      />
    );
  };

  /* ─── recap labels (matching connect) ─── */
  const TYPE_DEMANDE_LABELS: Record<string, string> = {
    provisoire: "Raccordement provisoire ou chantier",
    definitif: "Raccordement définitif",
    augmentation_puissance: "Modification de branchement",
    collectif: "Viabilisation de terrain",
  };
  const TYPE_CLIENT_LABELS: Record<string, string> = {
    particulier: "Client particulier",
    entreprise: "Client entreprise",
    collectivite: "Collectivité",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ─── Lemonade-style slide-out menu ─── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark sidebar */}
          <div className="w-64 bg-[#2d2d2d] text-white flex flex-col p-6">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="self-end mb-8 p-1 hover:opacity-70 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
            <nav className="flex flex-col gap-1 flex-1">
              {menuLinks.map((link) =>
                link.action === "reset" ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setStep(0);
                      setFd(initialData);
                    }}
                    className="text-left px-2 py-3 text-base hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-3 text-base hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>
          {/* Backdrop */}
          <div className="flex-1 bg-black/30" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* ─── Header ─── */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-border/50">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-illu.png" alt="" className="h-8 w-8" />
            <div className="leading-tight">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Portail en ligne
              </span>
              <span className="block text-xs font-heading text-foreground">
                Raccordement Enedis
              </span>
            </div>
          </a>
        </div>
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <button type="button" className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* ─── Avatar ─── */}
      <div className="flex justify-center pt-6 pb-2">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-heading text-primary">E</span>
        </div>
      </div>

      {/* ─── Tab bar ─── */}
      <div className="flex justify-center gap-0 px-4 mb-6">
        {tabs.map((tab, i) => (
          <div key={tab.label} className="flex-1 max-w-[140px] text-center">
            <div className="text-[10px] sm:text-xs font-medium tracking-wider text-muted-foreground mb-1.5 uppercase">
              {tab.label}
            </div>
            <div
              className="h-0.5 rounded-full transition-colors"
              style={{ background: i <= activeTabIdx ? "hsl(228 72% 52%)" : "#e5e5e5" }}
            />
          </div>
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* ═══════════ STEP 0: Contact ═══════════ */}
          {step === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Bonjour !
                </h2>
                <p className="text-muted-foreground">
                  Renseignez vos coordonnées pour commencer.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    placeholder="Prénom"
                    value={fd.first_name}
                    onChange={(v) => set("first_name", v)}
                    error={errors.first_name}
                  />
                  <FormInput
                    placeholder="Nom"
                    value={fd.last_name}
                    onChange={(v) => set("last_name", v)}
                    error={errors.last_name}
                  />
                </div>
                <FormInput
                  placeholder="Email"
                  type="email"
                  value={fd.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                />
                <FormInput
                  placeholder="Téléphone (ex: 06 12 34 56 78)"
                  type="tel"
                  value={fd.phone}
                  onChange={(v) => set("phone", v)}
                  error={errors.phone}
                />
              </div>
            </div>
          )}

          {/* ═══════════ STEP 1: Location (postcode + city) ═══════════ */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Où est situé votre projet ?
                </h2>
                <p className="text-muted-foreground">Code postal et ville du lieu de raccordement.</p>
              </div>
              <div className="space-y-4">
                <FormInput
                  placeholder="Code postal"
                  value={fd.code_postal_projet}
                  onChange={(v) => set("code_postal_projet", v.replace(/\D/g, "").slice(0, 5))}
                  maxLength={5}
                  error={errors.code_postal_projet}
                />
                <CityField
                  value={fd.ville_projet}
                  onChange={(v) => set("ville_projet", v)}
                  citiesList={cities}
                  open={cityOpen}
                  setOpen={setCityOpen}
                  error={errors.ville_projet}
                />
              </div>
            </div>
          )}

          {/* ═══════════ STEP 2: Connection Type ═══════════ */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Type de raccordement.
                </h2>
                <p className="text-muted-foreground">
                  Quel type de raccordement vous intéresse ?
                </p>
              </div>
              <div className="space-y-3">
                {serviceTypes.map((t) => (
                  <RadioOption
                    key={t.value}
                    label={t.label}
                    selected={fd.type_demande === t.value}
                    onClick={() => set("type_demande", t.value)}
                  />
                ))}
              </div>

              {/* Provisoire: date d'intervention */}
              {fd.type_demande === "provisoire" && (
                <div className="mt-6">
                  <p className="text-sm text-foreground font-medium mb-3">
                    Date d'intervention (travaux)
                  </p>
                  <div className="space-y-3">
                    {dateInterventionOptions.map((d) => (
                      <RadioOption
                        key={d}
                        label={d}
                        selected={fd.date_intervention === d}
                        onClick={() => set("date_intervention", d)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ STEP 3: Client Type ═══════════ */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Vous êtes...
                </h2>
                <p className="text-muted-foreground">Quel type de client êtes-vous ?</p>
              </div>
              <div className="space-y-3">
                {clientTypes.map((t) => (
                  <RadioOption
                    key={t.value}
                    label={t.label}
                    selected={fd.type_client === t.value}
                    onClick={() => set("type_client", t.value)}
                  />
                ))}
              </div>

              {/* Entreprise fields */}
              {fd.type_client === "entreprise" && (
                <div className="mt-6 space-y-4">
                  <p className="text-xs text-muted-foreground">Informations entreprise (optionnel)</p>
                  <FormInput
                    placeholder="Raison sociale"
                    value={fd.raison_sociale}
                    onChange={(v) => set("raison_sociale", v)}
                  />
                  <FormInput
                    placeholder="SIREN (9 chiffres)"
                    value={fd.siren}
                    onChange={(v) => set("siren", v)}
                    maxLength={9}
                    error={errors.siren}
                  />
                </div>
              )}

              {/* Collectivité fields */}
              {fd.type_client === "collectivite" && (
                <div className="mt-6 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Informations collectivité (optionnel)
                  </p>
                  <FormInput
                    placeholder="Nom de la collectivité"
                    value={fd.nom_collectivite}
                    onChange={(v) => set("nom_collectivite", v)}
                  />
                  <FormInput
                    placeholder="Service / Direction"
                    value={fd.service_direction}
                    onChange={(v) => set("service_direction", v)}
                  />
                  <FormInput
                    placeholder="SIRET / Code INSEE"
                    value={fd.siret_insee}
                    onChange={(v) => set("siret_insee", v)}
                  />
                </div>
              )}
            </div>
          )}

          {/* ═══════════ STEP 4: Project Address ═══════════ */}
          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Adresse du projet.
                </h2>
                <p className="text-muted-foreground">
                  L'adresse complète du lieu de raccordement.
                </p>
              </div>
              <div className="space-y-4">
                <FormInput
                  placeholder="Adresse"
                  value={fd.adresse_projet}
                  onChange={(v) => set("adresse_projet", v)}
                  error={errors.adresse_projet}
                />
                <FormInput
                  placeholder="Complément d'adresse (optionnel)"
                  value={fd.complement_adresse}
                  onChange={(v) => set("complement_adresse", v)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    placeholder="Code postal"
                    value={fd.code_postal_projet}
                    onChange={(v) => set("code_postal_projet", v.replace(/\D/g, "").slice(0, 5))}
                    maxLength={5}
                    error={errors.code_postal_projet}
                  />
                  <CityField
                    value={fd.ville_projet}
                    onChange={(v) => set("ville_projet", v)}
                    citiesList={cities}
                    open={cityOpen}
                    setOpen={setCityOpen}
                    error={errors.ville_projet}
                  />
                </div>

                {/* Billing address toggle */}
                <div className="pt-2">
                  <FormCheckbox
                    checked={fd.adresse_facturation_diff}
                    onChange={(v) => set("adresse_facturation_diff", v)}
                  >
                    <span className="text-sm text-foreground">
                      Adresse de facturation différente
                    </span>
                  </FormCheckbox>
                </div>

                {fd.adresse_facturation_diff && (
                  <div className="space-y-4 pt-2 border-t border-border/50">
                    <p className="text-sm text-foreground font-medium pt-2">
                      Adresse de facturation
                    </p>
                    <FormInput
                      placeholder="Adresse de facturation"
                      value={fd.adresse_facturation}
                      onChange={(v) => set("adresse_facturation", v)}
                      error={errors.adresse_facturation}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        placeholder="Code postal"
                        value={fd.code_postal_facturation}
                        onChange={(v) =>
                          set("code_postal_facturation", v.replace(/\D/g, "").slice(0, 5))
                        }
                        maxLength={5}
                        error={errors.code_postal_facturation}
                      />
                      <CityField
                        value={fd.ville_facturation}
                        onChange={(v) => set("ville_facturation", v)}
                        citiesList={billingCities}
                        open={billingCityOpen}
                        setOpen={setBillingCityOpen}
                        error={errors.ville_facturation}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════ STEP 5: Building Type ═══════════ */}
          {step === 5 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Type de projet.
                </h2>
                <p className="text-muted-foreground">
                  Quel type de bâtiment concerne votre raccordement ?
                </p>
              </div>
              <div className="space-y-3">
                {buildingTypes.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.usage_raccordement === t}
                    onClick={() => {
                      set("usage_raccordement", t);
                      if (t === "Terrain nu") set("hors_eau_hors_air", "");
                    }}
                  />
                ))}
              </div>

              {/* Hors d'eau / hors d'air (if not terrain) */}
              {fd.usage_raccordement && fd.usage_raccordement !== "Terrain nu" && (
                <div className="mt-6">
                  <p className="text-sm text-foreground font-medium mb-3">
                    Votre projet est-il hors d'eau / hors d'air ?
                  </p>
                  <div className="space-y-3">
                    {horsEauOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={fd.hors_eau_hors_air === opt}
                        onClick={() => set("hors_eau_hors_air", opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Terrain viabilisé */}
              <div className="mt-6">
                <p className="text-sm text-foreground font-medium mb-3">
                  Terrain viabilisé ?
                </p>
                <div className="space-y-3">
                  {compteurOptions.map((opt) => (
                    <RadioOption
                      key={opt}
                      label={opt}
                      selected={fd.compteur_existant === opt}
                      onClick={() => set("compteur_existant", opt)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ STEP 6: Power + Timeline ═══════════ */}
          {step === 6 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Besoin électrique.
                </h2>
                <p className="text-muted-foreground">
                  Type d'alimentation et puissance souhaitée.
                </p>
              </div>

              {/* Phase type */}
              <p className="text-sm text-foreground font-medium mb-3">
                Type d'alimentation *
              </p>
              <div className="space-y-3 mb-2">
                <RadioOption
                  label="Monophasé"
                  description="Usage résidentiel standard"
                  selected={fd.type_alimentation === "monophase"}
                  onClick={() => set("type_alimentation", "monophase")}
                />
                <RadioOption
                  label="Triphasé"
                  description="Usage professionnel"
                  selected={fd.type_alimentation === "triphase"}
                  onClick={() => set("type_alimentation", "triphase")}
                />
                <RadioOption
                  label="Je ne sais pas"
                  description="Nous vous conseillerons"
                  selected={fd.type_alimentation === "inconnu"}
                  onClick={() => set("type_alimentation", "inconnu")}
                />
              </div>

              {/* Power kVA */}
              {fd.type_alimentation && fd.type_alimentation !== "inconnu" && (
                <div className="mt-6">
                  <p className="text-sm text-foreground font-medium mb-3">
                    Puissance demandée (kVA)
                  </p>
                  <div className="space-y-3">
                    {powerOptions.map((kva) => (
                      <RadioOption
                        key={kva}
                        label={`${kva} kVA`}
                        selected={fd.puissance_kva === kva}
                        onClick={() => set("puissance_kva", kva)}
                        description={
                          fd.type_alimentation === "triphase" && kva === 36
                            ? "Tarif Jaune — étude spécifique"
                            : undefined
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {fd.type_alimentation === "inconnu" && (
                <div className="mt-4 bg-muted/40 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    Nous vous conseillons 6 kVA pour un usage résidentiel standard. La puissance
                    sera déterminée lors de l'étude technique.
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div className="mt-8">
                <p className="text-sm text-foreground font-medium mb-3">
                  Échéance de raccordement souhaitée
                </p>
                <div className="space-y-3">
                  {delaiOptions.map((d) => (
                    <RadioOption
                      key={d}
                      label={d}
                      selected={fd.delai_souhaite === d}
                      onClick={() => set("delai_souhaite", d)}
                    />
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="mt-8">
                <p className="text-sm text-foreground font-medium mb-3">
                  Commentaires ou précisions
                </p>
                <textarea
                  placeholder="Informations complémentaires sur votre projet (optionnel)"
                  value={fd.commentaires}
                  onChange={(e) => set("commentaires", e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {fd.commentaires.length}/500
                </p>
              </div>
            </div>
          )}

          {/* ═══════════ STEP 7: Recap + Consent ═══════════ */}
          {step === 7 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Récapitulatif.
                </h2>
                <p className="text-muted-foreground">
                  Vérifiez vos informations avant envoi.
                </p>
              </div>

              <div className="space-y-5">
                {/* Ma demande */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Ma demande
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>{TYPE_CLIENT_LABELS[fd.type_client] || fd.type_client}</p>
                    <p>{TYPE_DEMANDE_LABELS[fd.type_demande] || fd.type_demande}</p>
                    {fd.type_demande === "provisoire" && fd.date_intervention && (
                      <p className="text-muted-foreground">
                        Intervention : {fd.date_intervention}
                      </p>
                    )}
                    <p>
                      {fd.first_name} {fd.last_name}
                    </p>
                    <p className="text-muted-foreground">{fd.email}</p>
                    <p className="text-muted-foreground">{fd.phone}</p>
                    {fd.raison_sociale && <p>Entreprise : {fd.raison_sociale}</p>}
                    {fd.siren && <p className="text-muted-foreground">SIREN : {fd.siren}</p>}
                    {fd.nom_collectivite && <p>Collectivité : {fd.nom_collectivite}</p>}
                  </div>
                </div>

                {/* Mon projet */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Mon projet
                  </h3>
                  <div className="space-y-1 text-sm">
                    {fd.usage_raccordement && (
                      <p>
                        {fd.usage_raccordement === "Terrain nu"
                          ? "Terrain nu"
                          : `Raccordement d'un(e) ${fd.usage_raccordement.toLowerCase()}`}
                      </p>
                    )}
                    <p>{fd.adresse_projet}</p>
                    {fd.complement_adresse && (
                      <p className="text-muted-foreground">{fd.complement_adresse}</p>
                    )}
                    <p>
                      {fd.code_postal_projet} {fd.ville_projet}
                    </p>
                    {fd.compteur_existant && (
                      <p className="text-muted-foreground">
                        Terrain viabilisé : {fd.compteur_existant}
                      </p>
                    )}
                    {fd.hors_eau_hors_air && (
                      <p className="text-muted-foreground">
                        Hors d'eau / hors d'air : {fd.hors_eau_hors_air}
                      </p>
                    )}
                    {fd.adresse_facturation_diff && (
                      <p className="text-muted-foreground">
                        Facturation : {fd.adresse_facturation}, {fd.code_postal_facturation}{" "}
                        {fd.ville_facturation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mon besoin électrique */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Besoin électrique
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      {fd.puissance_kva || 6} kVA (
                      {fd.type_alimentation === "triphase"
                        ? "Triphasé"
                        : fd.type_alimentation === "inconnu"
                          ? "À déterminer"
                          : "Monophasé"}
                      )
                    </p>
                    {fd.delai_souhaite && (
                      <p className="text-muted-foreground">
                        Échéance : {fd.delai_souhaite}
                      </p>
                    )}
                    {fd.commentaires && (
                      <p className="text-muted-foreground">{fd.commentaires}</p>
                    )}
                  </div>
                </div>

                {/* Consent */}
                <FormCheckbox checked={fd.consent} onChange={(v) => set("consent", v)}>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    J'accepte les{" "}
                    <a href="/cgu" className="underline hover:text-foreground">
                      Conditions Générales d'Utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="/confidentialite" className="underline hover:text-foreground">
                      Politique de confidentialité
                    </a>
                    . *
                  </span>
                </FormCheckbox>
              </div>
            </div>
          )}

          {/* ─── Next / Submit button ─── */}
          <div className="mt-8 pb-10">
            <Button
              variant="cta"
              size="lg"
              className={`w-full rounded-xl text-sm uppercase tracking-wider font-semibold h-14 transition-all ${
                canNext() ? "opacity-100" : "opacity-40 pointer-events-none"
              }`}
              onClick={step === TOTAL_STEPS - 1 ? handleSubmit : next}
            >
              {step === TOTAL_STEPS - 1 ? "Envoyer ma demande" : "Suivant"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
