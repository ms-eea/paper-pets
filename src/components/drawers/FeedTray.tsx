import React, { useMemo, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { TREAT_CATALOG } from '../../data/catalog';

interface Props {
  treatCounts: Record<string, number>;
  onFeed: (treatId: string) => void;
  onOpenShop: () => void;
  onClose: () => void;
}

export const FeedTray: React.FC<Props> = ({ treatCounts, onFeed, onOpenShop, onClose }) => {
  const [subFilter, setSubFilter] = useState<string>('all');

  const subcategories = useMemo(
    () => Array.from(new Set(TREAT_CATALOG.map((t) => t.subcategory))),
    [],
  );

  const visibleTreats = useMemo(
    () =>
      subFilter === 'all'
        ? TREAT_CATALOG
        : TREAT_CATALOG.filter((t) => t.subcategory === subFilter),
    [subFilter],
  );

  return (
    <div className="fixed inset-x-0 bottom-[calc(62px+env(safe-area-inset-bottom))] sm:bottom-[72px] md:bottom-24 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-30 w-full sm:w-[92vw] sm:max-w-2xl paper-card rounded-t-2xl sm:rounded-2xl p-3.5 sm:p-4 max-h-[45dvh] sm:max-h-none flex flex-col">
      <div className="sm:hidden w-10 h-1 rounded-full bg-[#CEB99C] mx-auto mb-2 shrink-0" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 shrink-0">
        <div>
          <h3 className="font-display text-base font-bold text-[#3D312A]">Snack Pantry</h3>
          <p className="text-xs text-[#6E5D52]">Pick a paper treat to feed your pet</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex flex-wrap items-center gap-1 bg-[#F3EBDD] p-0.5 rounded-lg border border-[#D6C4AC]">
            <button
              type="button"
              onClick={() => setSubFilter('all')}
              className={`min-h-[32px] sm:min-h-0 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                subFilter === 'all'
                  ? 'bg-[#3D312A] text-[#FBF7F0]'
                  : 'text-[#6E5D52] hover:text-[#3D312A]'
              }`}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubFilter(sub)}
                className={`min-h-[32px] sm:min-h-0 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  subFilter === sub
                    ? 'bg-[#3D312A] text-[#FBF7F0]'
                    : 'text-[#6E5D52] hover:text-[#3D312A]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenShop}
            className="min-h-[36px] sm:min-h-0 px-2 text-xs font-semibold text-[#D95D39] hover:underline flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Buy Treats
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close snack pantry"
            className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 overflow-y-auto overscroll-contain craft-scroll pr-0.5 flex-1 sm:max-h-44">
        {visibleTreats.map((treat) => {
          const count = treat.isFree ? null : treatCounts[treat.id] || 0;
          const disabled = !treat.isFree && (count ?? 0) <= 0;

          return (
            <button
              key={treat.id}
              type="button"
              disabled={disabled}
              onClick={() => onFeed(treat.id)}
              className={`min-h-[68px] p-2.5 rounded-xl border text-left transition-all ${
                disabled
                  ? 'bg-[#F3EBDD]/50 border-[#D6C4AC] opacity-60 cursor-not-allowed'
                  : 'bg-[#FBF7F0] border-[#D6C4AC] hover:bg-[#F3EBDD] active:scale-95 cursor-pointer'
              }`}
            >
              <div className="flex items-baseline justify-between gap-1">
                <div className="text-xs font-bold text-[#3D312A] truncate">{treat.name}</div>
                <span className="text-[10px] text-[#8E7C6E] shrink-0">{treat.subcategory}</span>
              </div>
              <div className="text-[11px] text-[#2F7D6D] font-semibold mt-0.5">
                +{treat.hungerGain} Hunger · +{treat.loveGain} Love
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
