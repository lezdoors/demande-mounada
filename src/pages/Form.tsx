import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ArrowLeft, HelpCircle, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── step tabs ─── */
const tabs = [
  { label: "COORDONNÉES", steps: [0, 1] },
  { label: "PROJET", steps: [2, 3, 4, 5] },
  { label: "ENVOI", steps: [6, 7] },
];

const TOTAL_STEPS = 8;

/* ─── option sets ─── */
const clientTypes = ["Particulier", "Professionnel", "Collectivité"];

const connectionTypes = [
  "Nouveau raccordement",
  "Augmentation de puissance",
  "Raccordement provisoire",
  "Déplacement de compteur",
  "Autre demande",
];

const buildingTypes = [
  "Maison",
  "Immeuble",
  "Commercial",
  "Industriel",
  "Terrain nu",
];

const viabilisationOptions = ["Oui", "Non", "Je ne sais pas"];

const phaseTypes = ["Monophasé", "Triphasé", "Je ne sais pas"];

const monoPower = ["3 kVA", "6 kVA", "9 kVA", "12 kVA"];
const triPower = ["12 kVA", "15 kVA", "18 kVA", "24 kVA", "30 kVA", "36 kVA"];

const projectStates = ["Projet en cours de réalisation", "Projet à l'étude"];
const travauxOptions = [
  "À Enedis",
  "À une entreprise agréée de mon choix",
  "Je n'ai pas encore choisi",
];

/* ─── form data ─── */
interface FormData {
  clientType: string;
  companyName: string;
  siren: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  connectionType: string;
  otherDescription: string;
  knowsPdl: boolean;
  pdl: string;
  buildingType: string;
  isViabilise: string;
  address: string;
  addressComplement: string;
  postcode: string;
  city: string;
  phaseType: string;
  powerKva: string;
  projectState: string;
  travauxChoice: string;
  comments: string;
  consent: boolean;
}

const initialData: FormData = {
  clientType: "",
  companyName: "",
  siren: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  connectionType: "",
  otherDescription: "",
  knowsPdl: false,
  pdl: "",
  buildingType: "",
  isViabilise: "",
  address: "",
  addressComplement: "",
  postcode: "",
  city: "",
  phaseType: "",
  powerKva: "",
  projectState: "",
  travauxChoice: "",
  comments: "",
  consent: false,
};

/* ─── radio button component ─── */
function RadioOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
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
      <span className="text-sm font-medium">{label}</span>
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
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium tracking-wide placeholder:text-muted-foreground/40 placeholder:uppercase placeholder:tracking-wider focus:outline-none focus:border-primary transition-colors"
    />
  );
}

/* ─── main form ─── */
const Form = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fd, setFd] = useState<FormData>(initialData);
  const [cities, setCities] = useState<string[]>([]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setFd((prev) => ({ ...prev, [key]: val }));

  /* auto-fetch cities from postcode */
  useEffect(() => {
    if (fd.postcode.length === 5 && /^\d{5}$/.test(fd.postcode)) {
      fetch(`https://geo.api.gouv.fr/communes?codePostal=${fd.postcode}&fields=nom`)
        .then((r) => r.json())
        .then((data: { nom: string }[]) => {
          const names = data.map((c) => c.nom);
          setCities(names);
          if (names.length === 1) set("city", names[0]);
        })
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
  }, [fd.postcode]);

  /* reset power when phase changes */
  useEffect(() => {
    set("powerKva", "");
  }, [fd.phaseType]);

  /* ─── validation per step ─── */
  const canNext = (): boolean => {
    switch (step) {
      case 0: {
        if (!fd.clientType) return false;
        if (
          (fd.clientType === "Professionnel" || fd.clientType === "Collectivité") &&
          fd.companyName.length < 2
        )
          return false;
        return true;
      }
      case 1:
        return (
          fd.firstName.length >= 2 &&
          fd.lastName.length >= 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email) &&
          /^0[1-79]\d{8}$/.test(fd.phone.replace(/\s/g, ""))
        );
      case 2: {
        if (!fd.connectionType) return false;
        if (fd.connectionType === "Autre demande" && fd.otherDescription.length < 10)
          return false;
        return true;
      }
      case 3: {
        if (!fd.buildingType) return false;
        if (fd.buildingType === "Terrain nu" && !fd.isViabilise) return false;
        return true;
      }
      case 4:
        return fd.address.length >= 5 && /^\d{5}$/.test(fd.postcode) && fd.city.length > 0;
      case 5: {
        if (!fd.phaseType) return false;
        if (fd.phaseType !== "Je ne sais pas" && !fd.powerKva) return false;
        return true;
      }
      case 6:
        return !!fd.projectState && !!fd.travauxChoice;
      case 7:
        return fd.consent;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: wire CRM submission + redirect to payment
    console.log("Form submitted:", fd);
  };

  /* ─── which tab is active ─── */
  const activeTabIdx = tabs.findIndex((t) => t.steps.includes(step));
  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  /* ─── power options based on phase ─── */
  const powerOptions = fd.phaseType === "Monophasé" ? monoPower : fd.phaseType === "Triphasé" ? triPower : [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ─── Header ─── */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-border/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <span className="font-heading text-lg text-foreground">
            Demande <span className="text-primary">Raccordement</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button
              onClick={back}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
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
              style={{
                background: i <= activeTabIdx ? "hsl(228 72% 52%)" : "#e5e5e5",
              }}
            />
          </div>
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* ────────────── STEP 0: Client Type ────────────── */}
          {step === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Bonjour !
                </h2>
                <p className="text-muted-foreground">Vous êtes...</p>
              </div>
              <div className="space-y-3">
                {clientTypes.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.clientType === t}
                    onClick={() => set("clientType", t)}
                  />
                ))}
              </div>
              {(fd.clientType === "Professionnel" || fd.clientType === "Collectivité") && (
                <div className="mt-6 space-y-4">
                  <FormInput
                    placeholder={fd.clientType === "Collectivité" ? "Nom de la collectivité" : "Raison sociale"}
                    value={fd.companyName}
                    onChange={(v) => set("companyName", v)}
                  />
                  <FormInput
                    placeholder="SIREN (optionnel)"
                    value={fd.siren}
                    onChange={(v) => set("siren", v)}
                  />
                </div>
              )}
            </div>
          )}

          {/* ────────────── STEP 1: Contact Info ────────────── */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Vos coordonnées.
                </h2>
                <p className="text-muted-foreground">
                  Pour que nous puissions traiter votre dossier.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    placeholder="Prénom"
                    value={fd.firstName}
                    onChange={(v) => set("firstName", v)}
                  />
                  <FormInput
                    placeholder="Nom"
                    value={fd.lastName}
                    onChange={(v) => set("lastName", v)}
                  />
                </div>
                <FormInput
                  placeholder="Email"
                  type="email"
                  value={fd.email}
                  onChange={(v) => set("email", v)}
                />
                <FormInput
                  placeholder="Téléphone (ex: 06 12 34 56 78)"
                  type="tel"
                  value={fd.phone}
                  onChange={(v) => set("phone", v)}
                />
              </div>
            </div>
          )}

          {/* ────────────── STEP 2: Connection Type ────────────── */}
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
                {connectionTypes.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.connectionType === t}
                    onClick={() => set("connectionType", t)}
                  />
                ))}
              </div>

              {/* Conditional: "Autre" description */}
              {fd.connectionType === "Autre demande" && (
                <div className="mt-6">
                  <textarea
                    placeholder="Décrivez votre demande (min. 10 caractères)"
                    value={fd.otherDescription}
                    onChange={(e) => set("otherDescription", e.target.value)}
                    rows={3}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm font-medium tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              )}

              {/* Conditional: PDL for augmentation/déplacement */}
              {(fd.connectionType === "Augmentation de puissance" ||
                fd.connectionType === "Déplacement de compteur") && (
                <div className="mt-6 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => set("knowsPdl", !fd.knowsPdl)}
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                        fd.knowsPdl
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {fd.knowsPdl && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm text-foreground">
                      Je connais mon numéro PDL
                    </span>
                  </label>
                  {fd.knowsPdl && (
                    <FormInput
                      placeholder="Numéro PDL (14 chiffres)"
                      value={fd.pdl}
                      onChange={(v) => set("pdl", v)}
                      maxLength={14}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ────────────── STEP 3: Building Type ────────────── */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Type de bâtiment.
                </h2>
                <p className="text-muted-foreground">
                  Quel type de bâtiment concerne votre projet ?
                </p>
              </div>
              <div className="space-y-3">
                {buildingTypes.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.buildingType === t}
                    onClick={() => set("buildingType", t)}
                  />
                ))}
              </div>

              {/* Conditional: viabilisation for terrain */}
              {fd.buildingType === "Terrain nu" && (
                <div className="mt-6">
                  <p className="text-sm text-foreground font-medium mb-3">
                    Le terrain est-il viabilisé ?
                  </p>
                  <div className="space-y-3">
                    {viabilisationOptions.map((opt) => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        selected={fd.isViabilise === opt}
                        onClick={() => set("isViabilise", opt)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Un terrain viabilisé dispose déjà des réseaux (eau, électricité,
                    assainissement). Si non viabilisé, un raccordement complet sera
                    nécessaire.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ────────────── STEP 4: Address ────────────── */}
          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Adresse du projet.
                </h2>
                <p className="text-muted-foreground">
                  Où se situe le lieu de raccordement ?
                </p>
              </div>
              <div className="space-y-4">
                <FormInput
                  placeholder="Adresse"
                  value={fd.address}
                  onChange={(v) => set("address", v)}
                />
                <FormInput
                  placeholder="Complément (optionnel)"
                  value={fd.addressComplement}
                  onChange={(v) => set("addressComplement", v)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    placeholder="Code postal"
                    value={fd.postcode}
                    onChange={(v) => set("postcode", v.replace(/\D/g, "").slice(0, 5))}
                    maxLength={5}
                  />
                  {/* City — dropdown if multiple, auto-filled if single */}
                  <div className="relative">
                    {cities.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                          className={`w-full px-5 py-4 rounded-xl border text-left text-sm font-medium tracking-wide transition-colors ${
                            fd.city
                              ? "border-border bg-muted/30 text-foreground"
                              : "border-border bg-muted/30 text-muted-foreground/40"
                          } focus:outline-none focus:border-primary`}
                        >
                          <span className={fd.city ? "" : "uppercase tracking-wider"}>
                            {fd.city || "Ville"}
                          </span>
                          <ChevronDown className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                        </button>
                        {cityDropdownOpen && (
                          <div className="absolute z-10 top-full mt-1 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
                            {cities.map((c) => (
                              <button
                                key={c}
                                onClick={() => {
                                  set("city", c);
                                  setCityDropdownOpen(false);
                                }}
                                className={`w-full px-5 py-3 text-left text-sm hover:bg-muted/50 transition-colors ${
                                  fd.city === c ? "bg-primary/5 text-primary font-medium" : "text-foreground"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <FormInput
                        placeholder="Ville"
                        value={fd.city}
                        onChange={(v) => set("city", v)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────── STEP 5: Power ────────────── */}
          {step === 5 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Puissance souhaitée.
                </h2>
                <p className="text-muted-foreground">
                  Quel type de branchement et quelle puissance ?
                </p>
              </div>

              <p className="text-sm text-foreground font-medium mb-3">
                Type de branchement
              </p>
              <div className="space-y-3 mb-6">
                {phaseTypes.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.phaseType === t}
                    onClick={() => set("phaseType", t)}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                Monophasé : usage résidentiel standard (220V). Triphasé : usage
                professionnel ou équipements puissants (380V).
              </p>

              {fd.phaseType && fd.phaseType !== "Je ne sais pas" && (
                <>
                  <p className="text-sm text-foreground font-medium mb-3">
                    Puissance demandée
                  </p>
                  <div className="space-y-3">
                    {powerOptions.map((p) => (
                      <RadioOption
                        key={p}
                        label={p}
                        selected={fd.powerKva === p}
                        onClick={() => set("powerKva", p)}
                      />
                    ))}
                  </div>
                  {fd.powerKva === "36 kVA" && (
                    <p className="text-xs text-amber-600 mt-3">
                      Tarif Jaune — nécessite une étude spécifique.
                    </p>
                  )}
                </>
              )}

              {fd.phaseType === "Je ne sais pas" && (
                <div className="bg-muted/40 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    La puissance sera déterminée lors de l'étude technique selon votre
                    projet et vos usages.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ────────────── STEP 6: Project State ────────────── */}
          {step === 6 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">
                  Avancement du projet.
                </h2>
                <p className="text-muted-foreground">
                  Où en êtes-vous dans votre projet ?
                </p>
              </div>

              <p className="text-sm text-foreground font-medium mb-3">
                État du projet
              </p>
              <div className="space-y-3 mb-8">
                {projectStates.map((s) => (
                  <RadioOption
                    key={s}
                    label={s}
                    selected={fd.projectState === s}
                    onClick={() => set("projectState", s)}
                  />
                ))}
              </div>

              <p className="text-sm text-foreground font-medium mb-3">
                À qui souhaitez-vous confier les travaux ?
              </p>
              <div className="space-y-3">
                {travauxOptions.map((t) => (
                  <RadioOption
                    key={t}
                    label={t}
                    selected={fd.travauxChoice === t}
                    onClick={() => set("travauxChoice", t)}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Conformément à l'article L.342-2 du code de l'énergie, vous pouvez
                choisir de confier les travaux à Enedis ou à une entreprise agréée.
              </p>
            </div>
          )}

          {/* ────────────── STEP 7: Summary + Consent ────────────── */}
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
                {/* Contact */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Coordonnées
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Type :</span> {fd.clientType}</p>
                    <p><span className="text-muted-foreground">Nom :</span> {fd.firstName} {fd.lastName}</p>
                    <p><span className="text-muted-foreground">Email :</span> {fd.email}</p>
                    <p><span className="text-muted-foreground">Tél :</span> {fd.phone}</p>
                    {fd.companyName && (
                      <p><span className="text-muted-foreground">Entreprise :</span> {fd.companyName}</p>
                    )}
                    {fd.siren && (
                      <p><span className="text-muted-foreground">SIREN :</span> {fd.siren}</p>
                    )}
                  </div>
                </div>

                {/* Project */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Projet
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Raccordement :</span> {fd.connectionType}</p>
                    {fd.otherDescription && (
                      <p><span className="text-muted-foreground">Description :</span> {fd.otherDescription}</p>
                    )}
                    <p><span className="text-muted-foreground">Bâtiment :</span> {fd.buildingType}</p>
                    {fd.buildingType === "Terrain nu" && (
                      <p><span className="text-muted-foreground">Viabilisé :</span> {fd.isViabilise}</p>
                    )}
                    <p><span className="text-muted-foreground">Adresse :</span> {fd.address}{fd.addressComplement ? `, ${fd.addressComplement}` : ""}</p>
                    <p><span className="text-muted-foreground">Ville :</span> {fd.postcode} {fd.city}</p>
                    <p>
                      <span className="text-muted-foreground">Puissance :</span>{" "}
                      {fd.phaseType === "Je ne sais pas"
                        ? "À déterminer"
                        : `${fd.powerKva} (${fd.phaseType})`}
                    </p>
                    {fd.pdl && (
                      <p><span className="text-muted-foreground">PDL :</span> {fd.pdl}</p>
                    )}
                  </div>
                </div>

                {/* State */}
                <div className="bg-muted/30 rounded-xl p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Avancement
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">État :</span> {fd.projectState}</p>
                    <p><span className="text-muted-foreground">Travaux :</span> {fd.travauxChoice}</p>
                  </div>
                </div>

                {/* Comments */}
                <textarea
                  placeholder="Précisions supplémentaires sur votre projet (optionnel)"
                  value={fd.comments}
                  onChange={(e) => set("comments", e.target.value)}
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-muted/30 text-sm tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                />

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => set("consent", !fd.consent)}
                    className={`h-5 w-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      fd.consent
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {fd.consent && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    J'accepte les{" "}
                    <a href="/cgu" className="underline hover:text-foreground">
                      Conditions Générales
                    </a>{" "}
                    et la{" "}
                    <a href="/confidentialite" className="underline hover:text-foreground">
                      Politique de confidentialité
                    </a>
                    . *
                  </span>
                </label>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
                  <span>Transmission sécurisée</span>
                  <span>Données protégées</span>
                </div>
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
              {step === TOTAL_STEPS - 1 ? "Transmettre ma demande" : "Suivant"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
