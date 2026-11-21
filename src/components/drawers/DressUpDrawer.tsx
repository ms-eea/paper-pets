import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
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
  PetOutfit,
} from '../../types/game';
import { GarmentSvg } from '../svg/GarmentSvg';

interface Props {
  coins: number;
  outfit: PetOutfit;
  lastClothingSlot?: ClothingSlot;
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  onEquip: (slot: ClothingSlot, garment: EquippedGarment | null) => void;
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

export const DressUpDrawer: React.FC<Props> = ({
  coins,
  outfit,
  lastClothingSlot,
  unlockedClothingIds,
  unlockedPatternIds,
  onEquip,
  onBuyAndEquipClothing,
  onBuyAndApplyPattern,
  onUpdateStyle,
  onOpenShopTab,
  onClose,
}) => {
  const [activeSlot, setActiveSlot] = useState<ClothingSlot>(() =>
    resolveInitialSlot(outfit, lastClothingSlot),
  );
  const [subFilter, setSubFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'choose' | 'style'>(() => {
    const initial = resolveInitialSlot(outfit, lastClothingSlot);
    return outfit[initial] ? 'style' : 'choose';
  });

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

  const wornTrackRef = useRef<HTMLDivElement | null>(null);
  const wornCardRefs = useRef<Partial<Record<ClothingSlot, HTMLDivElement | null>>>({});
  const [scrollBounds, setScrollBounds] = useState({ left: false, right: false });

  const updateScrollBounds = useCallback(() => {
    const el = wornTrackRef.current;
    if (!el) {
      setScrollBounds((prev) => (prev.left || prev.right ? { left: false, right: false } : prev));
      return;
    }
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setScrollBounds((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(updateScrollBounds);
    const el = wornTrackRef.current;
    let observer: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updateScrollBounds());
      observer.observe(el);
    }
    window.addEventListener('resize', updateScrollBounds);
    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('resize', updateScrollBounds);
    };
  }, [wornEntries.length, updateScrollBounds]);

  useEffect(() => {
    const activeCard = wornCardRefs.current[activeSlot];
    if (!activeCard) return;
    activeCard.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'nearest',
    });
    const timer = window.setTimeout(updateScrollBounds, 260);
    return () => window.clearTimeout(timer);
  }, [activeSlot, updateScrollBounds]);

  const scrollWornStrip = (direction: -1 | 1) => {
    const el = wornTrackRef.current;
    if (!el) return;
    const step = Math.max(200, Math.round(el.clientWidth * 0.8));
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

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

  const effectiveView: 'choose' | 'style' =
    viewMode === 'style' && currentEquipped ? 'style' : 'choose';

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
      <div className="px-4 py-2.5 md:py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-base md:text-lg font-bold text-[#3D312A] leading-tight">
            Paper Wardrobe
          </h3>
          <p className="text-xs text-[#6E5D52] hidden sm:block">
            Equip a piece, then fine-tune its fit, color &amp; pattern
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close wardrobe"
          className="w-10 h-10 md:w-8 md:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Slot Tabs */}
      <div className="px-3 pt-2.5 pb-2 flex items-center gap-1 border-b border-[#E8DCC8] shrink-0">
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

      {/* Wearing Now Quick-Edit Strip */}
      {wornEntries.length > 0 && (
        <div className="px-3 py-2 bg-[#FBF7F0] border-b border-[#E8DCC8] shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-[#6E5D52]">
              Wearing Now · {wornEntries.length} saved
            </span>
            {(scrollBounds.left || scrollBounds.right) && (
              <span className="text-[10px] font-medium text-[#8E7C6E] whitespace-nowrap">
                Use arrows or scroll
              </span>
            )}
          </div>
          <div className="flex items-stretch gap-1.5">
            {(wornEntries.length > 1 || scrollBounds.left || scrollBounds.right) && (
              <button
                type="button"
                onClick={() => scrollWornStrip(-1)}
                disabled={!scrollBounds.left}
                aria-label="Scroll worn items left"
                title="Previous worn items"
                className={`w-8 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                  scrollBounds.left
                    ? 'bg-[#F3EBDD] hover:bg-[#E8DCC8] border-[#C9B393] text-[#3D312A] cursor-pointer'
                    : 'bg-[#F6EFE3] border-[#E8DCC8] text-[#B8A794] cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              ref={wornTrackRef}
              onScroll={updateScrollBounds}
              onWheel={(e) => {
                const el = wornTrackRef.current;
                if (!el || el.scrollWidth <= el.clientWidth + 4) return;
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
                  el.scrollLeft += e.deltaY;
                }
              }}
              className="flex-1 min-w-0 flex items-stretch gap-2 overflow-x-auto scroll-smooth craft-scroll pb-0.5"
            >
              {wornEntries.map(({ slotMeta: itemSlot, garment, def }) => {
                const isEditingThis =
                  activeSlot === itemSlot.id && effectiveView === 'style';
                return (
                  <div
                    key={itemSlot.id}
                    ref={(node) => {
                      wornCardRefs.current[itemSlot.id] = node;
                    }}
                    className={`shrink-0 rounded-xl border px-2 py-1.5 flex items-center gap-2 ${
                      isEditingThis
                        ? 'bg-[#FFF7EE] border-[#D95D39]'
                        : 'bg-[#F3EBDD] border-[#D6C4AC]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FBF7F0] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                      <GarmentSvg
                        itemId={garment.itemId}
                        colorHex={garment.colorHex}
                        patternId={garment.patternId}
                        className="w-7 h-7"
                      />
                    </div>
                    <div className="min-w-0 max-w-[96px]">
                      <div className="text-[11px] font-bold text-[#3D312A] truncate">
                        {def?.name || 'Saved Piece'}
                      </div>
                      <div className="text-[10px] text-[#6E5D52] truncate">{itemSlot.label}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSlot(itemSlot.id);
                          setSubFilter('all');
                          setViewMode('style');
                        }}
                        className={`min-h-[32px] px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer ${
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
                          if (itemSlot.id === activeSlot) {
                            setViewMode('choose');
                          }
                        }}
                        className="min-h-[32px] px-2 py-1 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[11px] font-bold text-[#B83B1D] flex items-center gap-1 whitespace-nowrap cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 shrink-0" />
                        <span>Take Off</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {(wornEntries.length > 1 || scrollBounds.left || scrollBounds.right) && (
              <button
                type="button"
                onClick={() => scrollWornStrip(1)}
                disabled={!scrollBounds.right}
                aria-label="Scroll worn items right"
                title="Next worn items"
                className={`w-8 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                  scrollBounds.right
                    ? 'bg-[#F3EBDD] hover:bg-[#E8DCC8] border-[#C9B393] text-[#3D312A] cursor-pointer'
                    : 'bg-[#F6EFE3] border-[#E8DCC8] text-[#B8A794] cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Two-Step Mode Switcher: Choose Piece vs Fine-Tune & Style */}
      <div className="px-3 py-2 bg-[#F6EFE3] border-b border-[#E8DCC8] grid grid-cols-2 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setViewMode('choose')}
          className={`min-h-[36px] py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            effectiveView === 'choose'
              ? 'bg-[#2F7D6D] text-white'
              : 'bg-[#FBF7F0] text-[#3D312A] border border-[#D6C4AC] hover:bg-[#F3EBDD]'
          }`}
        >
          <Shirt className="w-3.5 h-3.5 shrink-0" />
          <span>Choose Piece</span>
        </button>

        <button
          type="button"
          disabled={!currentEquipped}
          onClick={() => setViewMode('style')}
          className={`min-h-[36px] py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
            !currentEquipped
              ? 'bg-[#F3EBDD]/60 text-[#9A8879] border border-[#E8DCC8] cursor-not-allowed'
              : effectiveView === 'style'
                ? 'bg-[#D95D39] text-white cursor-pointer'
                : 'bg-[#FFF7EE] text-[#D95D39] border border-[#D95D39]/60 hover:bg-[#FCEAD9] cursor-pointer'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
          <span>Fine-Tune &amp; Style</span>
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
