import { Info } from "lucide-react";

const EnedisNoticeBar = () => {
  return (
    <div className="bg-[#00A651]/[0.06] border-y border-[#00A651]/20">
      <div className="section-container py-3.5">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <div className="h-6 w-6 rounded-full bg-[#00A651] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-[13px] sm:text-sm text-foreground/80 leading-relaxed">
            <span className="font-bold text-foreground">Important — Raccordement Enedis :</span>{" "}
            Enedis assure la gestion technique du reseau electrique et des compteurs Linky,
            intervient en cas de panne sur le reseau public, et realise tous les types de
            branchements electriques, independamment du fournisseur d'electricite choisi.
            Le delai de raccordement varie selon la region et la complexite du projet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnedisNoticeBar;
