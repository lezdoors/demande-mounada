import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    } else {
      setDismissed(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
    setDismissed(true);
  }

  function close() {
    // Close without storing — will reappear next session
    setVisible(false);
    setDismissed(true);
  }

  function reopen() {
    setVisible(true);
    setDismissed(false);
  }

  /* ─── Closed state: small round hand/wave button bottom-left ─── */
  if (!visible && dismissed) {
    return (
      <button
        onClick={reopen}
        className="fixed z-[70] bottom-4 left-4 h-12 w-12 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        aria-label="Paramètres cookies"
      >
        {/* Hand wave icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-4 0v1" />
          <path d="M14 10V4a2 2 0 0 0-4 0v2" />
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      </button>
    );
  }

  if (!visible) return null;

  /* ─── Open state: Axeptio-style card ─── */
  return (
    <div className="fixed z-[70] bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-none">
      <div
        className="pointer-events-auto w-[340px] md:w-[380px] bg-white rounded-2xl shadow-2xl relative"
        role="dialog"
        aria-label="Cookies"
        style={{ overflow: "visible" }}
      >
        {/* Close X button */}
        <button
          onClick={close}
          className="absolute -top-3 -left-3 z-10 h-8 w-8 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center shadow-md hover:bg-black transition-colors"
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Blue blob — overflows top-right */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "hsl(228, 72%, 52%)",
            filter: "blur(2px)",
            opacity: 0.9,
          }}
        />

        {/* Content */}
        <div className="relative z-[1] px-7 pt-6 pb-5 rounded-2xl bg-white/95" style={{ backdropFilter: "blur(8px)" }}>
          {/* Continue without accepting */}
          <button
            onClick={accept}
            className="text-[13px] text-muted-foreground/70 underline underline-offset-2 decoration-muted-foreground/30 hover:text-foreground transition-colors"
          >
            Continuer sans accepter
          </button>

          {/* Heading */}
          <div className="mt-4">
            <p className="text-[22px] text-foreground leading-tight">
              Salut c'est nous...
            </p>
            <h2 className="text-[34px] font-black text-foreground leading-tight tracking-tight">
              les Cookies !
            </h2>
          </div>

          {/* Body */}
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            On a attendu d'être sûrs que le contenu de ce site vous intéresse
            avant de vous déranger, mais on aimerait bien vous accompagner
            pendant votre visite...
            <br />
            C'est OK pour vous ?
          </p>

          {/* Certified by */}
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <span className="text-[11px] text-muted-foreground/50">
              Consentements certifiés par
            </span>
            {/* Double-check icon */}
            <svg width="16" height="12" viewBox="0 0 20 14" fill="none">
              <path d="M2 7l4 4L16 1" stroke="hsl(228,72%,52%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 7l4 4" stroke="hsl(228,72%,52%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
            <span className="text-[11px] font-medium text-muted-foreground/50">
              axeptio
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="relative z-[1] grid grid-cols-2 border-t border-border/60 rounded-b-2xl overflow-hidden bg-white">
          <button
            onClick={accept}
            className="py-4 text-[15px] font-bold text-foreground hover:bg-muted/40 transition-colors border-r border-border/60"
          >
            Je choisis
          </button>
          <button
            onClick={accept}
            className="py-4 text-[15px] font-bold text-foreground hover:bg-muted/40 transition-colors"
          >
            OK pour moi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
