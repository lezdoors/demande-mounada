import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

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
    setVisible(false);
    setDismissed(true);
  }

  function reopen() {
    setVisible(true);
    setDismissed(false);
  }

  /* ─── Closed state: small discreet shield icon ─── */
  if (!visible && dismissed) {
    return (
      <button
        onClick={reopen}
        className="fixed z-[70] bottom-3 left-3 h-8 w-8 rounded-full bg-white/80 text-muted-foreground border border-border/60 shadow-sm hover:bg-white hover:shadow-md transition-all flex items-center justify-center"
        aria-label="Paramètres cookies"
      >
        <Shield className="h-3.5 w-3.5" />
      </button>
    );
  }

  if (!visible) return null;

  /* ─── Open state: compact cookie notice ─── */
  return (
    <div className="fixed z-[70] bottom-3 left-3 pointer-events-none">
      <div
        className="pointer-events-auto w-[280px] bg-white rounded-xl shadow-lg border border-border/40 relative"
        role="dialog"
        aria-label="Cookies"
      >
        <div className="px-4 pt-3.5 pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span className="text-[13px] font-semibold text-foreground">Cookies</span>
            </div>
            <button
              onClick={close}
              className="text-muted-foreground/50 hover:text-foreground transition-colors -mt-0.5"
              aria-label="Fermer"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>

          <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">
            Ce site utilise des cookies pour ameliorer votre experience et mesurer l'audience.
          </p>

          <div className="flex gap-2">
            <button
              onClick={close}
              className="flex-1 py-1.5 text-[12px] text-muted-foreground border border-border rounded-lg hover:bg-muted/40 transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={accept}
              className="flex-1 py-1.5 text-[12px] font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
