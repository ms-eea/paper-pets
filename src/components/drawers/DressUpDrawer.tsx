import React, { useMemo, useState } from 'react';
import { Sliders, Trash2, X } from 'lucide-react';
import {
  CLOTHING_CATALOG,
  COLOR_SWATCHES,
  PATTERN_CATALOG,
} from '../../data/catalog';
import { ClothingItemDef, ClothingSlot, EquippedGarment, PatternId, PetOutfit } from '../../types/game';
import { GarmentSvg } from '../svg/GarmentSvg';

interface Props {
  coins: number;
  outfit: PetOutfit;
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  onEquip: (slot: ClothingSlot, garment: EquippedGarment | null) => void;
  onBuyAndEquipClothing: (slot: ClothingSlot, garment: EquippedGarment) => void;
  onBuyAndApplyPattern: (slot: ClothingSlot, patternId: PatternId) => void;
  onUpdateStyle: (
    slot: ClothingSlot,
    updates: Partial<Pick<EquippedGarment, 'colorHex' | 'patternId' | 'nudgeX' | 'nudgeY' | 'nudgeScale'>>,
  ) => void;
  onOpenShopTab: (tab: 'clothing' | 'patterns') => void;
  onClose: () => void;
}

const SLOTS: { id: ClothingSlot; label: string }[] = [
  { id: 'hat', label: 'Hats' },
  { id: 'eyewear', label: 'Eyewear' },
  { id: 'neckwear', label: 'Neckwear' },
  { id: 'top', label: 'Tops' },
];

export const DressUpDrawer: React.FC<Props> = ({
  coins,
  outfit,
  unlockedClothingIds,
  unlockedPatternIds,
  onEquip,
  onBuyAndEquipClothing,
  onBuyAndApplyPattern,
  onUpdateStyle,
  onOpenShopTab,
  onClose,
}) => {
  const [activeSlot, setActiveSlot] = useState<ClothingSlot>('hat');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [showFitNudge, setShowFitNudge] = useState(false);

  const slotItems = useMemo(
    () => CLOTHING_CATALOG.filter((item) => item.slot === activeSlot),
    [activeSlot],
  );

  const subcategories = useMemo(() => {
    const seen: string[] = [];
    for (const item of slotItems) {
      if (!seen.includes(item.subcategory)) seen.push(item.subcategory);
    }
    return seen;
  }, [slotItems]);

  const activeSub = subFilter !== 'all' && subcategories.includes(subFilter) ? subFilter : 'all';

  const groupedItems = useMemo(() => {
    const filtered =
      activeSub === 'all' ? slotItems : slotItems.filter((i) => i.subcategory === activeSub);
    const map = new Map<string, ClothingItemDef[]>();
    for (const item of filtered) {
      const list = map.get(item.subcategory) || [];
      list.push(item);
      map.set(item.subcategory, list);
    }
    return Array.from(map.entries());
  }, [slotItems, activeSub]);

  const patternGroups = useMemo(() => {
    const map = new Map<string, typeof PATTERN_CATALOG>();
    for (const pat of PATTERN_CATALOG) {
      const list = map.get(pat.subcategory) || [];
      list.push(pat);
      map.set(pat.subcategory, list);
    }
    return Array.from(map.entries());
  }, []);

  const currentEquipped = outfit[activeSlot];

  return (
    <aside className="fixed right-3 sm:right-5 top-24 bottom-24 z-30 w-[320px] sm:w-[368px] paper-card rounded-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-[#3D312A] leading-tight">
            Paper Wardrobe
          </h3>
          <p className="text-xs text-[#6E5D52]">Layer garments with custom patterns & colors</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close wardrobe"
          className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Slot Tabs */}
      <div className="px-3 pt-3 pb-2 flex items-center gap-1 border-b border-[#E8DCC8]">
        {SLOTS.map((s) => {
          const active = s.id === activeSlot;
          const hasEquipped = Boolean(outfit[s.id]);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveSlot(s.id);
                setSubFilter('all');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                active
                  ? 'bg-[#3D312A] text-[#FBF7F0]'
                  : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
              }`}
            >
              {s.label}
              {hasEquipped ? ' ✓' : ''}
            </button>
          );
        })}
      </div>

      {/* Subcategory Filter Bar */}
      {subcategories.length > 1 && (
        <div className="px-3 py-1.5 bg-[#FBF7F0] border-b border-[#E8DCC8] flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setSubFilter('all')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap ${
              activeSub === 'all'
                ? 'bg-[#2F7D6D] text-white'
                : 'text-[#6E5D52] hover:bg-[#E8DCC8]'
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubFilter(sub)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap ${
                activeSub === sub
                  ? 'bg-[#2F7D6D] text-white'
                  : 'text-[#6E5D52] hover:bg-[#E8DCC8]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto craft-scroll p-4 space-y-4">
        {/* Garment Picker Grouped by Subcategory */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3D312A]">Choose Piece</span>
            {currentEquipped && (
              <button
                type="button"
                onClick={() => onEquip(activeSlot, null)}
                className="text-xs font-semibold text-[#B83B1D] hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Take Off
              </button>
            )}
          </div>

          {groupedItems.map(([subLabel, items]) => (
            <section key={subLabel}>
              <div className="flex items-baseline justify-between mb-1.5 px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {subLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const unlocked = unlockedClothingIds.includes(item.id);
                  const canAfford = coins >= item.price;
                  const isWorn = currentEquipped?.itemId === item.id;
                  const previewColor = isWorn ? currentEquipped.colorHex : item.defaultColor;
                  const previewPattern = isWorn ? currentEquipped.patternId : item.defaultPattern;
                  const nextGarment: EquippedGarment = {
                    itemId: item.id,
                    colorHex: currentEquipped?.colorHex || item.defaultColor,
                    patternId: currentEquipped?.patternId || item.defaultPattern,
                  };

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (unlocked) {
                          onEquip(activeSlot, nextGarment);
                        } else if (canAfford) {
                          onBuyAndEquipClothing(activeSlot, nextGarment);
                        } else {
                          onOpenShopTab('clothing');
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isWorn
                          ? 'bg-[#F3EBDD] border-[#D95D39] ring-1 ring-[#D95D39]'
                          : unlocked
                            ? 'bg-[#FBF7F0] border-[#D6C4AC] hover:bg-[#F3EBDD]'
                            : canAfford
                              ? 'bg-[#FFF9ED] border-[#E09F3E] hover:bg-[#FCEFD2]'
                              : 'bg-[#F3EBDD]/50 border-[#D6C4AC] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="h-14 w-full flex items-center justify-center mb-1.5">
                        <GarmentSvg
                          itemId={item.id}
                          colorHex={previewColor}
                          patternId={previewPattern}
                          className="w-16 h-12"
                        />
                      </div>
                      <div className="text-xs font-bold text-[#3D312A] truncate">{item.name}</div>
                      <div className="text-[11px] font-medium">
                        {isWorn ? (
                          <span className="text-[#D95D39] font-semibold">Equipped</span>
                        ) : unlocked ? (
                          <span className="text-[#6E5D52]">Ready</span>
                        ) : canAfford ? (
                          <span className="text-[#B87B14] font-semibold font-mono-num">
                            Buy &amp; Wear · {item.price}
                          </span>
                        ) : (
                          <span className="text-[#6E5D52] font-mono-num">
                            Need {item.price} Coins
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Pattern & Color Customization for Equipped Slot */}
        {currentEquipped && (
          <>
            <div className="pt-3 border-t border-[#E8DCC8] space-y-2.5">
              <div className="text-xs font-bold text-[#3D312A]">Paper Pattern</div>
              {patternGroups.map(([subLabel, pats]) => (
                <div key={subLabel}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E5D52] mb-1">
                    {subLabel}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {pats.map((pat) => {
                      const unlocked = unlockedPatternIds.includes(pat.id);
                      const canAfford = coins >= pat.price;
                      const active = currentEquipped.patternId === pat.id;
                      return (
                        <button
                          key={pat.id}
                          type="button"
                          onClick={() => {
                            if (unlocked) {
                              onUpdateStyle(activeSlot, { patternId: pat.id });
                            } else if (canAfford) {
                              onBuyAndApplyPattern(activeSlot, pat.id);
                            } else {
                              onOpenShopTab('patterns');
                            }
                          }}
                          className={`px-2 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap truncate ${
                            active
                              ? 'bg-[#2F7D6D] text-white border-[#2F7D6D]'
                              : unlocked
                                ? 'bg-[#FBF7F0] text-[#3D312A] border-[#D6C4AC] hover:bg-[#F3EBDD]'
                                : 'bg-[#F3EBDD]/60 text-[#6E5D52] border-[#D6C4AC]'
                          }`}
                        >
                          {pat.name}
                          {!unlocked && ` (${pat.price})`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8DCC8]">
              <div className="text-xs font-bold text-[#3D312A] mb-2">Color Swatch</div>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => {
                  const active = currentEquipped.colorHex === swatch.hex;
                  return (
                    <button
                      key={swatch.hex}
                      type="button"
                      title={swatch.name}
                      aria-label={swatch.name}
                      onClick={() => onUpdateStyle(activeSlot, { colorHex: swatch.hex })}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        active
                          ? 'border-[#3D312A] scale-110 ring-2 ring-[#D95D39]/50'
                          : 'border-[#FFFDF8] hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Optional Fit Nudge */}
            <div className="pt-2 border-t border-[#E8DCC8]">
              <button
                type="button"
                onClick={() => setShowFitNudge((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#6E5D52] hover:text-[#3D312A]"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showFitNudge ? 'Hide Fit Adjustment' : 'Fine-Tune Fit'}
              </button>

              {showFitNudge && (
                <div className="mt-2.5 space-y-2 p-2.5 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC]">
                  <label className="block text-[11px] font-semibold text-[#3D312A]">
                    Vertical Shift ({currentEquipped.nudgeY ?? 0}%)
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      step={1}
                      value={currentEquipped.nudgeY ?? 0}
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeY: Number(e.target.value) })
                      }
                      className="w-full accent-[#D95D39]"
                    />
                  </label>
                  <label className="block text-[11px] font-semibold text-[#3D312A]">
                    Horizontal Shift ({currentEquipped.nudgeX ?? 0}%)
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      step={1}
                      value={currentEquipped.nudgeX ?? 0}
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeX: Number(e.target.value) })
                      }
                      className="w-full accent-[#D95D39]"
                    />
                  </label>
                  <label className="block text-[11px] font-semibold text-[#3D312A]">
                    Size ({Math.round((currentEquipped.nudgeScale ?? 1) * 100)}%)
                    <input
                      type="range"
                      min={0.7}
                      max={1.35}
                      step={0.05}
                      value={currentEquipped.nudgeScale ?? 1}
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeScale: Number(e.target.value) })
                      }
                      className="w-full accent-[#D95D39]"
                    />
                  </label>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
