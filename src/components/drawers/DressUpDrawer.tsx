import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  Check,
  Minus,
  Plus,
  RotateCcw,
  Save,
  Shirt,
  Sliders,
  Trash2,
  X,
} from 'lucide-react';
import {
  CLOTHING_CATALOG,
  COLOR_SWATCHES,
  PATTERN_CATALOG,
} from '../../data/catalog';
import {
  ClothingItemDef,
  ClothingSlot,
  EquippedGarment,
  PatternId,
  PetId,
  PetOutfit,
  SavedOutfitSlot,
} from '../../types/game';
import { GarmentSvg } from '../svg/GarmentSvg';

interface Props {
  petId: PetId;
  petName: string;
  coins: number;
  outfit: PetOutfit;
  lastClothingSlot?: ClothingSlot;
  focusRequest?: { slot: ClothingSlot; token: number } | null;
  hasUnsavedOutfitChanges: boolean;
  lastOutfitSaveAt?: number;
  savedOutfitSlots: SavedOutfitSlot[];
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  onEquip: (slot: ClothingSlot, garment: EquippedGarment | null) => void;
  onClearOutfit: () => void;
  onSaveOutfitNow: () => void;
  onSaveOutfitSlot: (customName?: string) => void;
  onLoadOutfitSlot: (slotId: string) => void;
  onDeleteOutfitSlot: (slotId: string) => void;
  onBuyAndEquipClothing: (slot: ClothingSlot, garment: EquippedGarment) => void;
  onBuyAndApplyPattern: (slot: ClothingSlot, patternId: PatternId) => void;
  onUpdateStyle: (
    slot: ClothingSlot,
    updates: Partial<
      Pick<EquippedGarment, 'colorHex' | 'patternId' | 'nudgeX' | 'nudgeY' | 'nudgeScale'>
    >,
  ) => void;
  onOpenShopTab: (tab: 'clothing' | 'patterns') => void;
  onClose: () => void;
}

const SLOTS: { id: ClothingSlot; label: string; singular: string }[] = [
  { id: 'hat', label: 'Hats', singular: 'hat' },
  { id: 'eyewear', label: 'Eyewear', singular: 'glasses' },
  { id: 'neckwear', label: 'Neckwear', singular: 'tie or scarf' },
  { id: 'top', label: 'Tops', singular: 'top' },
];

function resolveInitialSlot(outfit: PetOutfit, lastClothingSlot?: ClothingSlot): ClothingSlot {
  if (lastClothingSlot && outfit[lastClothingSlot]) {
    return lastClothingSlot;
  }
  const firstWorn = SLOTS.find((s) => Boolean(outfit[s.id]));
  return firstWorn ? firstWorn.id : 'hat';
}

function formatSavedTime(ts?: number): string {
  if (!ts) return '';
  const diffMin = Math.floor((Date.now() - ts) / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export const DressUpDrawer: React.FC<Props> = ({
  petId,
  petName,
  coins,
  outfit,
  lastClothingSlot,
  focusRequest = null,
  hasUnsavedOutfitChanges,
  lastOutfitSaveAt,
  savedOutfitSlots,
  unlockedClothingIds,
  unlockedPatternIds,
  onEquip,
  onClearOutfit,
  onSaveOutfitNow,
  onSaveOutfitSlot,
  onLoadOutfitSlot,
  onDeleteOutfitSlot,
  onBuyAndEquipClothing,
  onBuyAndApplyPattern,
  onUpdateStyle,
  onOpenShopTab,
  onClose,
}) => {
  const [activeSlot, setActiveSlot] = useState<ClothingSlot>(() =>
    focusRequest?.slot ?? resolveInitialSlot(outfit, lastClothingSlot),
  );
  const [subFilter, setSubFilter] = useState<string>('all');
  const [lookNameInput, setLookNameInput] = useState('');
  const [viewMode, setViewMode] = useState<'choose' | 'style' | 'saved'>(() => {
    const initial = focusRequest?.slot ?? resolveInitialSlot(outfit, lastClothingSlot);
    return outfit[initial] ? 'style' : 'choose';
  });

  useEffect(() => {
    if (!focusRequest) return;
    setActiveSlot(focusRequest.slot);
    setSubFilter('all');
    setViewMode(outfit[focusRequest.slot] ? 'style' : 'choose');
  }, [focusRequest?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const slotMeta = SLOTS.find((s) => s.id === activeSlot) || SLOTS[0];

  const wornEntries = useMemo(
    () =>
      SLOTS.flatMap((s) => {
        const garment = outfit[s.id];
        if (!garment) return [];
        const def = CLOTHING_CATALOG.find((c) => c.id === garment.itemId) || null;
        return [{ slotMeta: s, garment, def }];
      }),
    [outfit],
  );

  const petSavedLooks = useMemo(
    () => savedOutfitSlots.filter((s) => s.petId === petId),
    [savedOutfitSlots, petId],
  );

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
  const currentDef = currentEquipped
    ? CLOTHING_CATALOG.find((c) => c.id === currentEquipped.itemId) || null
    : null;

  const effectiveView: 'choose' | 'style' | 'saved' =
    viewMode === 'saved'
      ? 'saved'
      : viewMode === 'style' && currentEquipped
        ? 'style'
        : 'choose';

  const nudgeX = currentEquipped?.nudgeX ?? 0;
  const nudgeY = currentEquipped?.nudgeY ?? 0;
  const nudgeScale = currentEquipped?.nudgeScale ?? 1;
  const hasFitChanges = nudgeX !== 0 || nudgeY !== 0 || nudgeScale !== 1;

  const stepNudge = (field: 'nudgeX' | 'nudgeY', delta: number) => {
    const currentVal = field === 'nudgeX' ? nudgeX : nudgeY;
    const clamped = Math.max(-15, Math.min(15, currentVal + delta));
    onUpdateStyle(activeSlot, { [field]: clamped });
  };

  const stepScale = (delta: number) => {
    const next = Math.max(0.7, Math.min(1.35, Math.round((nudgeScale + delta) * 100) / 100));
    onUpdateStyle(activeSlot, { nudgeScale: next });
  };

  return (
    <aside className="fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] sm:bottom-20 md:inset-x-auto md:right-5 md:top-24 md:bottom-24 z-30 h-[50dvh] max-h-[55dvh] md:h-auto md:max-h-none md:w-[368px] paper-card rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden">
      <div className="md:hidden w-10 h-1 rounded-full bg-[#CEB99C] mx-auto mt-2 mb-0.5 shrink-0" />
      {/* Header */}
      <div className="px-4 py-2.5 md:py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between gap-2 shrink-0">
        <div className="min-w-0">
          <h3 className="font-display text-base md:text-lg font-bold text-[#3D312A] leading-tight">
            Paper Wardrobe
          </h3>
          <p className="text-xs text-[#6E5D52] hidden sm:block truncate">
            {petName}&apos;s outfits — pick, fit &amp; save looks
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onSaveOutfitNow}
            title="Save current outfit for your next visit"
            className={`min-h-[34px] md:min-h-[30px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-colors whitespace-nowrap cursor-pointer ${
              hasUnsavedOutfitChanges
                ? 'bg-[#D95D39] hover:bg-[#C24D2B] text-white border-[#B83B1D]'
                : 'bg-[#E5F2EE] hover:bg-[#D5EBE4] text-[#2F7D6D] border-[#2F7D6D]/40'
            }`}
          >
            {hasUnsavedOutfitChanges ? (
              <>
                <Save className="w-3.5 h-3.5 shrink-0" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Saved</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wardrobe"
            className="w-10 h-10 md:w-8 md:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vertical Stacked Wearing Now List (above category tabs, never clipped) */}
      {wornEntries.length > 0 && (
        <div className="px-3 py-2 bg-[#FBF7F0] border-b border-[#E8DCC8] shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-[#6E5D52]">
              Wearing Now · {wornEntries.length} {wornEntries.length === 1 ? 'item' : 'items'}
            </span>
            {wornEntries.length >= 2 && (
              <button
                type="button"
                onClick={() => {
                  onClearOutfit();
                  if (effectiveView === 'style') setViewMode('choose');
                }}
                className="text-[11px] font-bold text-[#B83B1D] hover:underline whitespace-nowrap cursor-pointer"
              >
                Take Off All
              </button>
            )}
          </div>
          <div className="max-h-[108px] sm:max-h-[126px] overflow-y-auto overscroll-contain craft-scroll space-y-1.5 pr-0.5">
            {wornEntries.map(({ slotMeta: itemSlot, garment, def }) => {
              const isEditingThis =
                activeSlot === itemSlot.id && effectiveView === 'style';
              return (
                <div
                  key={itemSlot.id}
                  className={`w-full rounded-xl border px-2.5 py-1.5 flex items-center justify-between gap-2 ${
                    isEditingThis
                      ? 'bg-[#FFF7EE] border-[#D95D39]'
                      : 'bg-[#F3EBDD] border-[#D6C4AC]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#FBF7F0] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                      <GarmentSvg
                        itemId={garment.itemId}
                        colorHex={garment.colorHex}
                        patternId={garment.patternId}
                        className="w-7 h-7"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#3D312A] truncate">
                        {def?.name || 'Saved Piece'}
                      </div>
                      <div className="text-[10px] text-[#6E5D52] truncate">{itemSlot.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSlot(itemSlot.id);
                        setSubFilter('all');
                        setViewMode('style');
                      }}
                      className={`min-h-[32px] px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                        isEditingThis
                          ? 'bg-[#D95D39] text-white'
                          : 'bg-[#FBF7F0] text-[#3D312A] border border-[#D6C4AC] hover:bg-[#E8DCC8]'
                      }`}
                    >
                      <Sliders className="w-3 h-3 shrink-0" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onEquip(itemSlot.id, null);
                        if (itemSlot.id === activeSlot && effectiveView === 'style') {
                          setViewMode('choose');
                        }
                      }}
                      className="min-h-[32px] px-2.5 py-1 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[11px] font-bold text-[#B83B1D] flex items-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 shrink-0" />
                      <span>Take Off</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slot Tabs */}
      <div className="px-3 pt-2 pb-2 flex items-center gap-1 border-b border-[#E8DCC8] shrink-0">
        {SLOTS.map((s) => {
          const active = s.id === activeSlot && effectiveView !== 'saved';
          const hasEquipped = Boolean(outfit[s.id]);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveSlot(s.id);
                setSubFilter('all');
                setViewMode(outfit[s.id] ? 'style' : 'choose');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
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

      {/* Primary Three-Mode Switcher: Choose Piece | Fine-Tune & Style | Saved Looks */}
      <div className="px-3 py-2 bg-[#F6EFE3] border-b border-[#E8DCC8] grid grid-cols-3 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setViewMode('choose')}
          className={`min-h-[34px] py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
            effectiveView === 'choose'
              ? 'bg-[#2F7D6D] text-white'
              : 'bg-[#FBF7F0] text-[#3D312A] border border-[#D6C4AC] hover:bg-[#F3EBDD]'
          }`}
        >
          <Shirt className="w-3.5 h-3.5 shrink-0" />
          <span>Choose</span>
        </button>

        <button
          type="button"
          disabled={!currentEquipped}
          onClick={() => setViewMode('style')}
          className={`min-h-[34px] py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap ${
            !currentEquipped
              ? 'bg-[#F3EBDD]/60 text-[#9A8879] border border-[#E8DCC8] cursor-not-allowed'
              : effectiveView === 'style'
                ? 'bg-[#D95D39] text-white cursor-pointer'
                : 'bg-[#FFF7EE] text-[#D95D39] border border-[#D95D39]/60 hover:bg-[#FCEAD9] cursor-pointer'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
          <span>Fine-Tune</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('saved')}
          className={`min-h-[34px] py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap cursor-pointer ${
            effectiveView === 'saved'
              ? 'bg-[#3D312A] text-[#FBF7F0]'
              : 'bg-[#FBF7F0] text-[#3D312A] border border-[#D6C4AC] hover:bg-[#F3EBDD]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 shrink-0" />
          <span>Saved ({petSavedLooks.length})</span>
        </button>
      </div>

      {/* Subcategory Filter Bar (only when browsing pieces) */}
      {effectiveView === 'choose' && subcategories.length > 1 && (
        <div className="px-3 py-1.5 bg-[#FBF7F0] border-b border-[#E8DCC8] flex flex-wrap gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setSubFilter('all')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
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
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
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
      <div className="flex-1 overflow-y-auto overscroll-contain craft-scroll p-3.5 md:p-4 space-y-4">
        {effectiveView === 'choose' ? (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#3D312A]">
                Pick a {slotMeta.singular} — Fine-Tune opens automatically
              </span>
              {currentEquipped && (
                <button
                  type="button"
                  onClick={() => {
                    onEquip(activeSlot, null);
                    setViewMode('choose');
                  }}
                  className="px-2 py-1 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-xs font-bold text-[#B83B1D] flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 shrink-0" />
                  <span>Take Off</span>
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
                    const previewPattern = isWorn
                      ? currentEquipped.patternId
                      : item.defaultPattern;
                    const nextGarment: EquippedGarment = {
                      itemId: item.id,
                      colorHex: currentEquipped?.colorHex || item.defaultColor,
                      patternId: currentEquipped?.patternId || item.defaultPattern,
                    };

                    if (isWorn) {
                      return (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl border bg-[#F3EBDD] border-[#D95D39] ring-1 ring-[#D95D39] text-left flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="h-14 w-full flex items-center justify-center mb-1.5">
                              <GarmentSvg
                                itemId={item.id}
                                colorHex={previewColor}
                                patternId={previewPattern}
                                className="w-16 h-12"
                              />
                            </div>
                            <div className="text-xs font-bold text-[#3D312A] truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] font-semibold text-[#D95D39]">
                              Wearing now
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewMode('style')}
                              className="min-h-[34px] px-1.5 py-1 rounded-lg bg-[#D95D39] hover:bg-[#C24D2B] text-white text-[11px] font-bold flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer"
                            >
                              <Sliders className="w-3 h-3 shrink-0" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onEquip(activeSlot, null);
                                setViewMode('choose');
                              }}
                              className="min-h-[34px] px-1.5 py-1 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[#B83B1D] text-[11px] font-bold flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3 shrink-0" />
                              <span>Take Off</span>
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (unlocked) {
                            onEquip(activeSlot, nextGarment);
                            setViewMode('style');
                          } else if (canAfford) {
                            onBuyAndEquipClothing(activeSlot, nextGarment);
                            setViewMode('style');
                          } else {
                            onOpenShopTab('clothing');
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          unlocked
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
                          {unlocked ? (
                            <span className="text-[#2F7D6D] font-semibold">Wear &amp; Fit</span>
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
        ) : effectiveView === 'saved' ? (
          <div className="space-y-4">
            <section className="p-3 rounded-xl bg-[#F3EBDD] border border-[#CEB99C] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-[#3D312A]">
                  Save {petName}&apos;s Current Outfit
                </div>
                {lastOutfitSaveAt && (
                  <span className="text-[11px] font-medium text-[#6E5D52]">
                    {hasUnsavedOutfitChanges
                      ? 'Unsaved edits'
                      : `Saved ${formatSavedTime(lastOutfitSaveAt)}`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={lookNameInput}
                  onChange={(e) => setLookNameInput(e.target.value)}
                  maxLength={32}
                  placeholder="Look name (optional)"
                  className="flex-1 min-w-0 px-2.5 py-2 rounded-lg bg-[#FBF7F0] border border-[#D6C4AC] text-xs font-medium text-[#3D312A] placeholder:text-[#9A8879] focus:outline-none focus:border-[#2F7D6D]"
                />
                <button
                  type="button"
                  disabled={wornEntries.length === 0}
                  onClick={() => {
                    onSaveOutfitSlot(lookNameInput);
                    setLookNameInput('');
                  }}
                  className={`min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
                    wornEntries.length === 0
                      ? 'bg-[#E8DCC8] text-[#9A8879] cursor-not-allowed'
                      : 'bg-[#2F7D6D] hover:bg-[#246356] text-white cursor-pointer'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 shrink-0" />
                  <span>Save Look</span>
                </button>
              </div>
              {wornEntries.length === 0 && (
                <p className="text-[11px] text-[#6E5D52]">
                  Put on at least one hat, glasses, tie, or top to save an outfit look.
                </p>
              )}
            </section>

            <section className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  Saved Looks for {petName}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">
                  {petSavedLooks.length}
                </span>
              </div>

              {petSavedLooks.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#FBF7F0] border border-dashed border-[#D6C4AC] text-center text-xs text-[#6E5D52]">
                  No saved looks yet. Style {petName} and tap <strong>Save Look</strong> above to
                  keep favorite outfits ready to swap anytime!
                </div>
              ) : (
                <div className="space-y-2">
                  {petSavedLooks.map((slot) => {
                    const slotPieces = SLOTS.flatMap((s) => {
                      const g = slot.outfit[s.id];
                      return g ? [{ slot: s.id, garment: g }] : [];
                    });
                    return (
                      <div
                        key={slot.id}
                        className="p-2.5 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="text-xs font-bold text-[#3D312A] truncate">
                            {slot.name}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {slotPieces.map(({ slot: pieceSlot, garment }) => (
                              <span
                                key={pieceSlot}
                                className="w-7 h-7 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center"
                              >
                                <GarmentSvg
                                  itemId={garment.itemId}
                                  colorHex={garment.colorHex}
                                  patternId={garment.patternId}
                                  className="w-6 h-6"
                                />
                              </span>
                            ))}
                            <span className="text-[10px] font-medium text-[#6E5D52]">
                              {slotPieces.length}{' '}
                              {slotPieces.length === 1 ? 'piece' : 'pieces'} ·{' '}
                              {formatSavedTime(slot.savedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onLoadOutfitSlot(slot.id);
                              const firstLoaded = SLOTS.find((s) => Boolean(slot.outfit[s.id]));
                              if (firstLoaded) {
                                setActiveSlot(firstLoaded.id);
                                setViewMode('style');
                              } else {
                                setViewMode('choose');
                              }
                            }}
                            className="min-h-[34px] px-2.5 py-1 rounded-lg bg-[#2F7D6D] hover:bg-[#246356] text-white text-xs font-bold whitespace-nowrap cursor-pointer"
                          >
                            Wear
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete saved look ${slot.name}`}
                            onClick={() => onDeleteOutfitSlot(slot.id)}
                            className="min-h-[34px] min-w-[34px] p-1.5 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[#B83B1D] flex items-center justify-center cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        ) : (
          currentEquipped && (
            <div className="space-y-4">
              {/* Active Piece Summary Bar */}
              <div className="p-2.5 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-11 h-10 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                    <GarmentSvg
                      itemId={currentEquipped.itemId}
                      colorHex={currentEquipped.colorHex}
                      patternId={currentEquipped.patternId}
                      className="w-10 h-9"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#3D312A] truncate">
                      {currentDef?.name || 'Equipped Piece'}
                    </div>
                    <div className="text-[11px] text-[#6E5D52] truncate">
                      {slotMeta.label} · Saved on pet
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('choose')}
                    className="min-h-[34px] px-2.5 py-1.5 rounded-lg bg-[#F3EBDD] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-[11px] font-bold text-[#3D312A] cursor-pointer whitespace-nowrap"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onEquip(activeSlot, null);
                      setViewMode('choose');
                    }}
                    className="min-h-[34px] px-2.5 py-1.5 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[11px] font-bold text-[#B83B1D] flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Take Off</span>
                  </button>
                </div>
              </div>

              {/* 1. FINE-TUNE FIT (Top Priority Position & Scale Controls) */}
              <section className="p-3 rounded-xl bg-[#F3EBDD] border border-[#CEB99C] space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D312A]">
                    <Sliders className="w-3.5 h-3.5 text-[#D95D39]" />
                    <span>Fine-Tune Fit</span>
                  </div>
                  {hasFitChanges && (
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateStyle(activeSlot, { nudgeX: 0, nudgeY: 0, nudgeScale: 1 })
                      }
                      className="text-[11px] font-semibold text-[#2F7D6D] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Fit
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-[#6E5D52] leading-snug">
                  Move ties, bows, hats, or glasses up, down, left, right, and resize so they sit
                  neatly on your pet.
                </p>

                {/* Up / Down Position */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#3D312A]">
                    <span>Up / Down Position</span>
                    <span className="font-mono-num text-[#6E5D52]">
                      {nudgeY > 0 ? `+${nudgeY}` : nudgeY}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => stepNudge('nudgeY', -1)}
                      aria-label="Move up"
                      title="Move up"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      step={1}
                      value={nudgeY}
                      aria-label="Vertical position shift"
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeY: Number(e.target.value) })
                      }
                      className="flex-1 accent-[#D95D39] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => stepNudge('nudgeY', 1)}
                      aria-label="Move down"
                      title="Move down"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Left / Right Position */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#3D312A]">
                    <span>Left / Right Position</span>
                    <span className="font-mono-num text-[#6E5D52]">
                      {nudgeX > 0 ? `+${nudgeX}` : nudgeX}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => stepNudge('nudgeX', -1)}
                      aria-label="Move left"
                      title="Move left"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      step={1}
                      value={nudgeX}
                      aria-label="Horizontal position shift"
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeX: Number(e.target.value) })
                      }
                      className="flex-1 accent-[#D95D39] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => stepNudge('nudgeX', 1)}
                      aria-label="Move right"
                      title="Move right"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Size / Scale */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#3D312A]">
                    <span>Size</span>
                    <span className="font-mono-num text-[#6E5D52]">
                      {Math.round(nudgeScale * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => stepScale(-0.05)}
                      aria-label="Make smaller"
                      title="Make smaller"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={0.7}
                      max={1.35}
                      step={0.05}
                      value={nudgeScale}
                      aria-label="Garment size"
                      onChange={(e) =>
                        onUpdateStyle(activeSlot, { nudgeScale: Number(e.target.value) })
                      }
                      className="flex-1 accent-[#D95D39] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => stepScale(0.05)}
                      aria-label="Make larger"
                      title="Make larger"
                      className="w-9 h-9 md:w-7 md:h-7 rounded-lg bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* 2. COLOR SWATCHES */}
              <section className="pt-1">
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
              </section>

              {/* 3. PAPER PATTERNS */}
              <section className="pt-2 border-t border-[#E8DCC8] space-y-2.5">
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
                            className={`px-2 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap truncate cursor-pointer ${
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
              </section>
            </div>
          )
        )}
      </div>
    </aside>
  );
};
