import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 2s delay (like Axeptio — wait for user to engage)
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
  }

  function dismiss() {
    // "Je choisis" = same as accept (always approved per Ryan)
    accept();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-end md:justify-start p-4 md:p-6 pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        role="dialog"
        aria-label="Cookies"
      >
        {/* Top section with blob */}
        <div className="relative px-6 pt-5 pb-4">
          {/* "Continuer sans accepter" link */}
          <button
            onClick={dismiss}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Continuer sans accepter
          </button>

          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-24 h-24 -mr-4 -mt-2">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "hsl(228, 72%, 52%)",
                filter: "blur(1px)",
                transform: "scale(1.1) translate(15%, -20%)",
              }}
            />
          </div>

          {/* Heading */}
          <div className="mt-3 relative z-10">
            <p className="text-lg text-foreground">Salut c'est nous...</p>
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              les Cookies !
            </h2>
          </div>

          {/* Body text */}
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            On a attendu d'être sûrs que le contenu de ce site vous intéresse
            avant de vous déranger, mais on aimerait bien vous accompagner
            pendant votre visite...
            <br />
            C'est OK pour vous ?
          </p>
        </div>

        {/* Certified by line */}
        <div className="px-6 pb-3 flex items-center justify-center gap-1.5">
          <span className="text-[11px] text-muted-foreground/60">
            Consentements certifiés par
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary"
          >
            <path
              d="M4 12.5l4 4L20 5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 12.5l4 4"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
          <span className="text-[11px] font-medium text-muted-foreground/60">
            axeptio
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 border-t border-border">
          <button
            onClick={dismiss}
            className="py-4 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors border-r border-border"
          >
            Je choisis
          </button>
          <button
            onClick={accept}
            className="py-4 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
          >
            OK pour moi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
