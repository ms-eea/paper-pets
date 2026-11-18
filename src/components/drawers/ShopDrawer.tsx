import React, { useEffect, useState } from 'react';
import { Check, Coins, Plus, ShoppingBag, X } from 'lucide-react';
import {
  BACKGROUND_CATALOG,
  CLOTHING_CATALOG,
  DECORATION_CATALOG,
  PATTERN_CATALOG,
  TREAT_CATALOG,
} from '../../data/catalog';
import { BackgroundId, PatternId } from '../../types/game';
import { GarmentSvg } from '../svg/GarmentSvg';
import { PaperBackground } from '../svg/PaperBackgrounds';
import { PaperDecorationSvg } from '../svg/PaperDecorations';

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
  onClose: () => void;
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
  onClose,
}) => {
  const [tab, setTab] = useState<ShopTab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <aside className="fixed right-3 sm:right-5 top-24 bottom-24 z-30 w-[330px] sm:w-[376px] paper-card rounded-2xl flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-[#3D312A] flex items-center gap-1.5">
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
          className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
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
            onClick={() => setTab(id)}
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

      {/* Shop Catalog Grid */}
      <div className="flex-1 overflow-y-auto craft-scroll p-3.5 space-y-2.5">
        {tab === 'clothing' &&
          CLOTHING_CATALOG.filter((c) => c.price > 0).map((item) => {
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

        {tab === 'patterns' &&
          PATTERN_CATALOG.filter((p) => p.price > 0).map((pat) => {
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

        {tab === 'decorations' &&
          DECORATION_CATALOG.filter((d) => d.price > 0).map((deco) => {
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

        {tab === 'rooms' &&
          BACKGROUND_CATALOG.filter((b) => !b.starterUnlocked).map((bg) => {
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

        {tab === 'treats' &&
          TREAT_CATALOG.filter((t) => !t.isFree).map((treat) => {
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
                    <span className="font-mono-num text-[#6E5D52] font-normal">· In Bag: {qty}</span>
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
      </div>
    </aside>
  );
};
