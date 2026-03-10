import { useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const MobileStickyBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on the form page
  if (location.pathname === "/form") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 px-3 h-14">
        {/* Click-to-call */}
        <a
          href="tel:0188615000"
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          style={{ flex: "0 0 40%" }}
        >
          <Phone className="h-4 w-4" />
          Appeler
        </a>

        {/* CTA button */}
        <button
          onClick={() => navigate("/form")}
          className="flex-1 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-cta hover:opacity-95 transition-opacity"
        >
          Commencer ma demande
        </button>
      </div>
    </div>
  );
};

export default MobileStickyBar;
