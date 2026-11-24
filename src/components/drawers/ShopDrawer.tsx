import React, { useEffect, useMemo, useState } from 'react';
import { Check, Coins, Plus, ShoppingBag, X } from 'lucide-react';
import {
  BACKGROUND_CATALOG,
  CLOTHING_CATALOG,
  DECORATION_CATALOG,
  PATTERN_CATALOG,
  TREAT_CATALOG,
} from '../../data/catalog';
import {
  BackgroundDef,
  BackgroundId,
  ClothingItemDef,
  ClothingSlot,
  DecorationItemDef,
  PatternId,
  TreatItemDef,
} from '../../types/game';
import { GarmentSvg } from '../svg/GarmentSvg';
import { PaperBackground } from '../svg/PaperBackgrounds';
import { PaperDecorationSvg } from '../svg/PaperDecorations';
import { ResponsiveDrawerShell } from './ResponsiveDrawerShell';

export type ShopTab = 'clothing' | 'patterns' | 'decorations' | 'rooms' | 'treats';

interface Props {
  initialTab?: ShopTab;
  coins: number;
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  unlockedDecorationIds: string[];
  unlockedBackgroundIds: BackgroundId[];
  treatCounts: Record<string, number>;
  onBuy: (
    kind: 'clothing' | 'pattern' | 'decoration' | 'background' | 'treat',
    id: string,
  ) => boolean;
  onPlaceDecoration: (itemId: string) => void;
  onVisitBackground: (bgId: BackgroundId) => void;
  mobileCollapsed: boolean;
  onSetMobileCollapsed: (collapsed: boolean) => void;
  onClose: () => void;
}

const SLOT_LABELS: Record<ClothingSlot, string> = {
  hat: 'Hats',
  eyewear: 'Eyewear',
  neckwear: 'Neckwear',
  top: 'Tops',
  wings: 'Wings & Back',
  handheld: 'Held Items',
};

const PROP_CATEGORY_LABELS: Record<'indoor' | 'outdoor' | 'craft', string> = {
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  craft: 'Craft Studio',
};

function groupItems<T>(items: T[], getKey: (item: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    const arr = map.get(key) || [];
    arr.push(item);
    map.set(key, arr);
  }
  return Array.from(map.entries());
}

export const ShopDrawer: React.FC<Props> = ({
  initialTab = 'clothing',
  coins,
  unlockedClothingIds,
  unlockedPatternIds,
  unlockedDecorationIds,
  unlockedBackgroundIds,
  treatCounts,
  onBuy,
  onPlaceDecoration,
  onVisitBackground,
  mobileCollapsed,
  onSetMobileCollapsed,
  onClose,
}) => {
  const [tab, setTab] = useState<ShopTab>(initialTab);
  const [subFilter, setSubFilter] = useState<string>('all');

  useEffect(() => {
    setTab(initialTab);
    setSubFilter('all');
  }, [initialTab]);

  const paidClothing = useMemo(() => CLOTHING_CATALOG.filter((c) => c.price > 0), []);
  const paidPatterns = useMemo(() => PATTERN_CATALOG.filter((p) => p.price > 0), []);
  const paidProps = useMemo(() => DECORATION_CATALOG.filter((d) => d.price > 0), []);
  const paidRooms = useMemo(() => BACKGROUND_CATALOG.filter((b) => !b.starterUnlocked), []);
  const paidTreats = useMemo(() => TREAT_CATALOG.filter((t) => !t.isFree), []);

  const subOptions = useMemo(() => {
    if (tab === 'clothing') {
      return [
        { id: 'all', label: 'All' },
        { id: 'hat', label: 'Hats' },
        { id: 'eyewear', label: 'Eyewear' },
        { id: 'neckwear', label: 'Neck' },
        { id: 'top', label: 'Tops' },
        { id: 'wings', label: 'Wings' },
        { id: 'handheld', label: 'Held' },
      ];
    }
    if (tab === 'patterns') {
      const subs = Array.from(new Set(paidPatterns.map((p) => p.subcategory)));
      return [{ id: 'all', label: 'All' }, ...subs.map((s) => ({ id: s, label: s }))];
    }
    if (tab === 'decorations') {
      return [
        { id: 'all', label: 'All' },
        { id: 'indoor', label: 'Indoor' },
        { id: 'outdoor', label: 'Outdoor' },
        { id: 'craft', label: 'Craft Studio' },
      ];
    }
    if (tab === 'rooms') {
      const subs = Array.from(new Set(paidRooms.map((r) => r.subcategory)));
      return [{ id: 'all', label: 'All' }, ...subs.map((s) => ({ id: s, label: s }))];
    }
    if (tab === 'treats') {
      const subs = Array.from(new Set(paidTreats.map((t) => t.subcategory)));
      return [{ id: 'all', label: 'All' }, ...subs.map((s) => ({ id: s, label: s }))];
    }
    return [];
  }, [tab, paidPatterns, paidRooms, paidTreats]);

  const activeSub = subOptions.some((o) => o.id === subFilter) ? subFilter : 'all';

  const clothingGroups = useMemo(() => {
    const filtered =
      activeSub === 'all' ? paidClothing : paidClothing.filter((c) => c.slot === activeSub);
    return groupItems<ClothingItemDef>(
      filtered,
      (c) => `${SLOT_LABELS[c.slot]} · ${c.subcategory}`,
    );
  }, [paidClothing, activeSub]);

  const patternGroups = useMemo(() => {
    const filtered =
      activeSub === 'all'
        ? paidPatterns
        : paidPatterns.filter((p) => p.subcategory === activeSub);
    return groupItems(filtered, (p) => p.subcategory);
  }, [paidPatterns, activeSub]);

  const propGroups = useMemo(() => {
    const filtered =
      activeSub === 'all' ? paidProps : paidProps.filter((d) => d.category === activeSub);
    return groupItems<DecorationItemDef>(
      filtered,
      (d) =>
        activeSub === 'all'
          ? `${PROP_CATEGORY_LABELS[d.category]} · ${d.subcategory}`
          : d.subcategory,
    );
  }, [paidProps, activeSub]);

  const roomGroups = useMemo(() => {
    const filtered =
      activeSub === 'all' ? paidRooms : paidRooms.filter((r) => r.subcategory === activeSub);
    return groupItems<BackgroundDef>(filtered, (r) => r.subcategory);
  }, [paidRooms, activeSub]);

  const treatGroups = useMemo(() => {
    const filtered =
      activeSub === 'all' ? paidTreats : paidTreats.filter((t) => t.subcategory === activeSub);
    return groupItems<TreatItemDef>(filtered, (t) => t.subcategory);
  }, [paidTreats, activeSub]);

  return (
    <ResponsiveDrawerShell
      titleLabel="Craft Shop"
      dockSide="right"
      widthClass="md:w-[384px]"
      desktopTopClass="md:top-24"
      mobileCollapsed={mobileCollapsed}
      onSetMobileCollapsed={onSetMobileCollapsed}
    >
      <div className="px-4 py-2 md:py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-display text-base md:text-lg font-bold text-[#3D312A] flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-[#D99B26]" />
            Craft Shop
          </h3>
          <p className="text-xs text-[#6E5D52]">
            Balance: <span className="font-mono-num font-bold text-[#3D312A]">{coins}</span> Coins
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close shop"
          className="w-10 h-10 md:w-8 md:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="px-2.5 pt-2.5 pb-2 flex flex-wrap gap-1 border-b border-[#E8DCC8]">
        {(
          [
            ['clothing', 'Clothes'],
            ['patterns', 'Patterns'],
            ['decorations', 'Props'],
            ['rooms', 'Rooms'],
            ['treats', 'Treats'],
          ] as [ShopTab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              setSubFilter('all');
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              tab === id
                ? 'bg-[#3D312A] text-[#FBF7F0]'
                : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Subcategory Filter Bar */}
      {subOptions.length > 1 && (
        <div className="px-3 py-1.5 bg-[#FBF7F0] border-b border-[#E8DCC8] flex flex-wrap gap-1">
          {subOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSubFilter(opt.id)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap ${
                activeSub === opt.id
                  ? 'bg-[#2F7D6D] text-white'
                  : 'text-[#6E5D52] hover:bg-[#E8DCC8]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Shop Catalog Grouped by Subcategories */}
      <div className="flex-1 overflow-y-auto overscroll-contain craft-scroll p-3.5 space-y-4">
        {tab === 'clothing' &&
          clothingGroups.map(([groupLabel, items]) => (
            <section key={groupLabel} className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {groupLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              {items.map((item) => {
                const owned = unlockedClothingIds.includes(item.id);
                const canAfford = coins >= item.price;
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center gap-3"
                  >
                    <div className="w-14 h-12 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                      <GarmentSvg
                        itemId={item.id}
                        colorHex={item.defaultColor}
                        patternId={item.defaultPattern}
                        className="w-12 h-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#3D312A] truncate">{item.name}</div>
                      <div className="text-[11px] text-[#6E5D52] leading-snug">{item.description}</div>
                    </div>
                    {owned ? (
                      <span className="text-xs font-semibold text-[#2F7D6D] flex items-center gap-1 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Owned
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onBuy('clothing', item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                          canAfford
                            ? 'bg-[#D99B26] hover:bg-[#C3891B] text-[#FFFDF8] cursor-pointer'
                            : 'bg-[#E8DCC8] text-[#8E7C6E] cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span className="font-mono-num">{item.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </section>
          ))}

        {tab === 'patterns' &&
          patternGroups.map(([groupLabel, items]) => (
            <section key={groupLabel} className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {groupLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              {items.map((pat) => {
                const owned = unlockedPatternIds.includes(pat.id);
                const canAfford = coins >= pat.price;
                return (
                  <div
                    key={pat.id}
                    className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center gap-3"
                  >
                    <div className="w-14 h-12 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                      <GarmentSvg
                        itemId="top_sweater"
                        colorHex="#D95D39"
                        patternId={pat.id}
                        className="w-12 h-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#3D312A]">{pat.name} Pattern</div>
                      <div className="text-[11px] text-[#6E5D52]">Works on all hats, tops & scarves</div>
                    </div>
                    {owned ? (
                      <span className="text-xs font-semibold text-[#2F7D6D] flex items-center gap-1 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Owned
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onBuy('pattern', pat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                          canAfford
                            ? 'bg-[#D99B26] hover:bg-[#C3891B] text-[#FFFDF8] cursor-pointer'
                            : 'bg-[#E8DCC8] text-[#8E7C6E] cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span className="font-mono-num">{pat.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </section>
          ))}

        {tab === 'decorations' &&
          propGroups.map(([groupLabel, items]) => (
            <section key={groupLabel} className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {groupLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              {items.map((deco) => {
                const owned = unlockedDecorationIds.includes(deco.id);
                const canAfford = coins >= deco.price;
                return (
                  <div
                    key={deco.id}
                    className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center gap-3"
                  >
                    <div className="w-14 h-12 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                      <PaperDecorationSvg itemId={deco.id} className="w-11 h-11" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#3D312A] truncate">{deco.name}</div>
                      <div className="text-[11px] text-[#6E5D52] leading-snug">{deco.description}</div>
                    </div>
                    {owned ? (
                      <button
                        type="button"
                        onClick={() => onPlaceDecoration(deco.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" /> Place
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onBuy('decoration', deco.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                          canAfford
                            ? 'bg-[#D99B26] hover:bg-[#C3891B] text-[#FFFDF8] cursor-pointer'
                            : 'bg-[#E8DCC8] text-[#8E7C6E] cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span className="font-mono-num">{deco.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </section>
          ))}

        {tab === 'rooms' &&
          roomGroups.map(([groupLabel, items]) => (
            <section key={groupLabel} className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {groupLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              {items.map((bg) => {
                const owned = unlockedBackgroundIds.includes(bg.id);
                const canAfford = coins >= bg.price;
                return (
                  <div
                    key={bg.id}
                    className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center gap-3"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#D6C4AC] shrink-0">
                      <PaperBackground backgroundId={bg.id} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#3D312A] truncate">{bg.name}</div>
                      <div className="text-[11px] text-[#6E5D52] leading-snug">{bg.subtitle}</div>
                    </div>
                    {owned ? (
                      <button
                        type="button"
                        onClick={() => onVisitBackground(bg.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-bold shrink-0 cursor-pointer whitespace-nowrap"
                      >
                        Visit
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onBuy('background', bg.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                          canAfford
                            ? 'bg-[#D99B26] hover:bg-[#C3891B] text-[#FFFDF8] cursor-pointer'
                            : 'bg-[#E8DCC8] text-[#8E7C6E] cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span className="font-mono-num">{bg.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </section>
          ))}

        {tab === 'treats' &&
          treatGroups.map(([groupLabel, items]) => (
            <section key={groupLabel} className="space-y-2">
              <div className="flex items-baseline justify-between px-0.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                  {groupLabel}
                </h4>
                <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
              </div>
              {items.map((treat) => {
                const canAfford = coins >= treat.price;
                const qty = treatCounts[treat.id] || 0;
                return (
                  <div
                    key={treat.id}
                    className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#3D312A]">
                        {treat.name}{' '}
                        <span className="font-mono-num text-[#6E5D52] font-normal">
                          · In Bag: {qty}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6E5D52]">
                        +{treat.hungerGain} Hunger · +{treat.loveGain} Love
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onBuy('treat', treat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                        canAfford
                          ? 'bg-[#D99B26] hover:bg-[#C3891B] text-[#FFFDF8] cursor-pointer'
                          : 'bg-[#E8DCC8] text-[#8E7C6E] cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span className="font-mono-num">{treat.price}</span>
                    </button>
                  </div>
                );
              })}
            </section>
          ))}
      </div>
    </ResponsiveDrawerShell>
  );
};
