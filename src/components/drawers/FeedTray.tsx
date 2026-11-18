import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { TREAT_CATALOG } from '../../data/catalog';

interface Props {
  treatCounts: Record<string, number>;
  onFeed: (treatId: string) => void;
  onOpenShop: () => void;
  onClose: () => void;
}

export const FeedTray: React.FC<Props> = ({ treatCounts, onFeed, onOpenShop, onClose }) => {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-xl paper-card rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display text-base font-bold text-[#3D312A]">Snack Pantry</h3>
          <p className="text-xs text-[#6E5D52]">Pick a paper treat to feed your pet</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenShop}
            className="text-xs font-semibold text-[#D95D39] hover:underline flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Buy Treats
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close snack pantry"
            className="w-7 h-7 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TREAT_CATALOG.map((treat) => {
          const count = treat.isFree ? null : treatCounts[treat.id] || 0;
          const disabled = !treat.isFree && (count ?? 0) <= 0;

          return (
            <button
              key={treat.id}
              type="button"
              disabled={disabled}
              onClick={() => onFeed(treat.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                disabled
                  ? 'bg-[#F3EBDD]/50 border-[#D6C4AC] opacity-60 cursor-not-allowed'
                  : 'bg-[#FBF7F0] border-[#D6C4AC] hover:bg-[#F3EBDD] active:scale-95 cursor-pointer'
              }`}
            >
              <div className="text-xs font-bold text-[#3D312A] truncate">{treat.name}</div>
              <div className="text-[11px] text-[#2F7D6D] font-semibold mt-0.5">
                +{treat.hungerGain} Hunger
              </div>
              <div className="text-[11px] text-[#6E5D52] font-mono-num mt-0.5">
                {treat.isFree ? 'Always Free' : `${count} left`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
