import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Coins, Plus, Trash2, X } from 'lucide-react';
import { DECORATION_CATALOG } from '../../data/catalog';
import { PlacedDecoration } from '../../types/game';
import { PaperDecorationSvg } from '../svg/PaperDecorations';

interface Props {
  coins: number;
  unlockedDecorationIds: string[];
  selectedDecoration: PlacedDecoration | null;
  onAddDecoration: (itemId: string) => void;
  onBuyAndPlace: (itemId: string) => void;
  onUpdateSelected: (patch: Partial<PlacedDecoration>) => void;
  onRemoveSelected: () => void;
  onOpenPropsShop: () => void;
  onClose: () => void;
}

export const DecorateDrawer: React.FC<Props> = ({
  coins,
  unlockedDecorationIds,
  selectedDecoration,
  onAddDecoration,
  onBuyAndPlace,
  onUpdateSelected,
  onRemoveSelected,
  onOpenPropsShop,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor' | 'craft'>('all');

  const items = DECORATION_CATALOG.filter((d) => filter === 'all' || d.category === filter);

  return (
    <aside className="fixed right-3 sm:right-5 top-24 bottom-24 z-30 w-[320px] sm:w-[356px] paper-card rounded-2xl flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-[#3D312A] leading-tight">
            Room Decorator
          </h3>
          <p className="text-xs text-[#6E5D52]">Drag, resize, or click × on props to remove</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close decorator"
          className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Prop Depth & Scale Inspector */}
      {selectedDecoration && (
        <div className="p-3.5 bg-[#F3EBDD] border-b border-[#D6C4AC] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3D312A]">
              Selected:{' '}
              {DECORATION_CATALOG.find((d) => d.id === selectedDecoration.itemId)?.name || 'Prop'}
            </span>
            <button
              type="button"
              onClick={onRemoveSelected}
              className="text-xs font-semibold text-[#B83B1D] hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>

          <label className="block text-xs font-semibold text-[#3D312A]">
            Scale & Depth ({Math.round(selectedDecoration.scale * 100)}%)
            <input
              type="range"
              min={0.35}
              max={2.2}
              step={0.05}
              value={selectedDecoration.scale}
              onChange={(e) => onUpdateSelected({ scale: Number(e.target.value) })}
              className="w-full accent-[#D95D39] mt-1"
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateSelected({ zLayer: 'back' })}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border ${
                selectedDecoration.zLayer === 'back'
                  ? 'bg-[#3D312A] text-white border-[#3D312A]'
                  : 'bg-[#FBF7F0] text-[#3D312A] border-[#D6C4AC]'
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" /> Behind Pet
            </button>
            <button
              type="button"
              onClick={() => onUpdateSelected({ zLayer: 'front' })}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border ${
                selectedDecoration.zLayer === 'front'
                  ? 'bg-[#3D312A] text-white border-[#3D312A]'
                  : 'bg-[#FBF7F0] text-[#3D312A] border-[#D6C4AC]'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" /> In Front
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="px-3 pt-2.5 pb-2 flex items-center gap-1 border-b border-[#E8DCC8]">
        {(['all', 'indoor', 'outdoor', 'craft'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === cat
                ? 'bg-[#2F7D6D] text-white'
                : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Decoration Inventory Grid */}
      <div className="flex-1 overflow-y-auto craft-scroll p-3.5 grid grid-cols-2 gap-2.5 content-start">
        {items.map((item) => {
          const unlocked = unlockedDecorationIds.includes(item.id);
          const canAfford = coins >= item.price;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (unlocked) {
                  onAddDecoration(item.id);
                } else if (canAfford) {
                  onBuyAndPlace(item.id);
                } else {
                  onOpenPropsShop();
                }
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                unlocked
                  ? 'bg-[#FBF7F0] border-[#D6C4AC] hover:bg-[#F3EBDD]'
                  : canAfford
                    ? 'bg-[#FFF9ED] border-[#E09F3E] hover:bg-[#FCEFD2]'
                    : 'bg-[#F3EBDD]/55 border-[#D6C4AC] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="h-14 flex items-center justify-center mb-1.5">
                <PaperDecorationSvg itemId={item.id} className="w-14 h-14" />
              </div>
              <div className="text-xs font-bold text-[#3D312A] truncate">{item.name}</div>
              <div className="text-[11px] flex items-center gap-1 mt-0.5 font-semibold">
                {unlocked ? (
                  <span className="text-[#2F7D6D] flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Place in Room
                  </span>
                ) : canAfford ? (
                  <span className="text-[#B87B14] flex items-center gap-1">
                    <Coins className="w-3 h-3" /> Buy &amp; Place · {item.price}
                  </span>
                ) : (
                  <span className="text-[#6E5D52] flex items-center gap-1">
                    <Coins className="w-3 h-3" /> Need {item.price} Coins
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
