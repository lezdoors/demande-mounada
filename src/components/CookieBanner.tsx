import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-border shadow-lg px-4 py-4 md:py-3">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        <p className="text-sm text-foreground flex-1">
          En poursuivant votre navigation, vous acceptez l'utilisation de cookies pour mesurer l'audience et améliorer votre expérience.{" "}
          <a href="/politique-confidentialite" className="text-primary underline">
            En savoir plus
          </a>
        </p>
        <button
          onClick={dismiss}
          className="px-6 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          Compris
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
