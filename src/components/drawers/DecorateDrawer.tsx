import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookmarkPlus,
  Check,
  Coins,
  FolderOpen,
  Maximize2,
  Minimize2,
  Moon,
  PanelLeft,
  PanelRight,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Sun,
  Trash2,
  X,
} from 'lucide-react';
import {
  BACKGROUND_CATALOG,
  DAY_SKY_SUGGESTED_IDS,
  DECORATION_CATALOG,
  NIGHT_SKY_SUGGESTED_IDS,
  ROOM_SUGGESTED_DECORATIONS,
  ROOM_SUPPORTS_DAY_NIGHT,
} from '../../data/catalog';
import {
  BackgroundId,
  DecorationItemDef,
  PlacedDecoration,
  SavedRoomLayoutSlot,
  TimeOfDay,
} from '../../types/game';
import { PaperDecorationSvg } from '../svg/PaperDecorations';
import { ResponsiveDrawerShell } from './ResponsiveDrawerShell';

interface Props {
  coins: number;
  unlockedDecorationIds: string[];
  selectedDecoration: PlacedDecoration | null;
  activeBackgroundId: BackgroundId;
  timeOfDay: TimeOfDay;
  hasUnsavedRoomChanges: boolean;
  lastRoomSaveAt: number;
  savedRoomSlots: SavedRoomLayoutSlot[];
  dockSide: 'left' | 'right';
  minimized: boolean;
  onToggleDockSide: () => void;
  onToggleMinimized: () => void;
  onChangeTimeOfDay: (time: TimeOfDay) => void;
  onResetRoom: () => void;
  onSaveRoom: () => void;
  onSaveLayoutSlot: (name?: string) => void;
  onLoadLayoutSlot: (slotId: string) => void;
  onOverwriteLayoutSlot: (slotId: string) => void;
  onDeleteLayoutSlot: (slotId: string) => void;
  onAddDecoration: (itemId: string) => void;
  onBuyAndPlace: (itemId: string) => void;
  onUpdateSelected: (patch: Partial<PlacedDecoration>) => void;
  onRemoveSelected: () => void;
  onOpenPropsShop: () => void;
  mobileCollapsed: boolean;
  onSetMobileCollapsed: (collapsed: boolean) => void;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<'all' | 'indoor' | 'outdoor' | 'craft', string> = {
  all: 'All',
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  craft: 'Craft',
};

export const DecorateDrawer: React.FC<Props> = ({
  coins,
  unlockedDecorationIds,
  selectedDecoration,
  activeBackgroundId,
  timeOfDay,
  hasUnsavedRoomChanges,
  lastRoomSaveAt,
  savedRoomSlots,
  dockSide,
  minimized,
  onToggleDockSide,
  onToggleMinimized,
  onChangeTimeOfDay,
  onResetRoom,
  onSaveRoom,
  onSaveLayoutSlot,
  onLoadLayoutSlot,
  onOverwriteLayoutSlot,
  onDeleteLayoutSlot,
  onAddDecoration,
  onBuyAndPlace,
  onUpdateSelected,
  onRemoveSelected,
  onOpenPropsShop,
  mobileCollapsed,
  onSetMobileCollapsed,
  onClose,
}) => {
  const [panelTab, setPanelTab] = useState<'props' | 'layouts'>('props');
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor' | 'craft'>('all');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [slotNameInput, setSlotNameInput] = useState<string>('');
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const supportsDayNight = ROOM_SUPPORTS_DAY_NIGHT[activeBackgroundId];
  const activeBgName =
    BACKGROUND_CATALOG.find((b) => b.id === activeBackgroundId)?.name || 'Current Room';

  const suggestedItems = useMemo(() => {
    const roomIds = ROOM_SUGGESTED_DECORATIONS[activeBackgroundId] || [];
    const skyIds = supportsDayNight
      ? timeOfDay === 'night'
        ? NIGHT_SKY_SUGGESTED_IDS
        : DAY_SKY_SUGGESTED_IDS
      : [];
    const combinedIds = Array.from(new Set([...roomIds, ...skyIds]));
    return combinedIds
      .map((id) => DECORATION_CATALOG.find((d) => d.id === id))
      .filter((item): item is DecorationItemDef => Boolean(item));
  }, [activeBackgroundId, supportsDayNight, timeOfDay]);

  const categoryItems = useMemo(
    () => DECORATION_CATALOG.filter((d) => filter === 'all' || d.category === filter),
    [filter],
  );

  const subcategories = useMemo(() => {
    const seen: string[] = [];
    for (const item of categoryItems) {
      if (!seen.includes(item.subcategory)) seen.push(item.subcategory);
    }
    return seen;
  }, [categoryItems]);

  const activeSub = subFilter !== 'all' && subcategories.includes(subFilter) ? subFilter : 'all';

  const visibleGroups = useMemo(() => {
    const filtered =
      activeSub === 'all'
        ? categoryItems
        : categoryItems.filter((d) => d.subcategory === activeSub);

    const groups = new Map<string, DecorationItemDef[]>();
    for (const item of filtered) {
      const label =
        filter === 'all'
          ? `${CATEGORY_LABELS[item.category]} · ${item.subcategory}`
          : item.subcategory;
      const list = groups.get(label) || [];
      list.push(item);
      groups.set(label, list);
    }
    return Array.from(groups.entries());
  }, [categoryItems, activeSub, filter]);

  const lastSaveTimeLabel = new Date(lastRoomSaveAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const renderPropCard = (item: DecorationItemDef) => {
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
            <span className="text-[#B87B14] flex items-center gap-1 font-mono-num">
              <Coins className="w-3 h-3" /> Buy · {item.price}
            </span>
          ) : (
            <span className="text-[#6E5D52] flex items-center gap-1 font-mono-num">
              <Coins className="w-3 h-3" /> {item.price} Coins
            </span>
          )}
        </div>
      </button>
    );
  };

  if (minimized) {
    return (
      <div
        className={`fixed bottom-[calc(62px+env(safe-area-inset-bottom))] sm:bottom-[72px] md:bottom-24 z-30 left-2 right-2 md:right-auto md:left-auto paper-card rounded-2xl px-3 py-2 flex items-center justify-between md:justify-start gap-2 ${
          dockSide === 'left' ? 'md:left-5' : 'md:right-5'
        }`}
      >
        <div className="pr-1 min-w-0">
          <div className="text-xs font-bold text-[#3D312A] whitespace-nowrap truncate">
            Decorating Mode
          </div>
          <div className="text-[11px] text-[#6E5D52] whitespace-nowrap truncate">
            Drag any prop freely
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onSaveRoom}
            className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              hasUnsavedRoomChanges
                ? 'bg-[#D95D39] text-white hover:bg-[#C74E2B]'
                : 'bg-[#E6F1EE] text-[#2F7D6D]'
            }`}
          >
            {hasUnsavedRoomChanges ? (
              <Save className="w-3.5 h-3.5" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            <span>{hasUnsavedRoomChanges ? 'Save' : 'Saved'}</span>
          </button>
          <button
            type="button"
            onClick={onToggleMinimized}
            title="Expand Room Decorator"
            className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-[#3D312A] text-[#FBF7F0] hover:bg-[#2F251F] text-xs font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close decorator"
            className="w-9 h-9 md:w-7 md:h-7 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveDrawerShell
      titleLabel="Room Decorator"
      dockSide={dockSide}
      widthClass="md:w-[368px]"
      desktopTopClass="md:top-16"
      mobileCollapsed={mobileCollapsed}
      onSetMobileCollapsed={onSetMobileCollapsed}
    >
      {/* Header with Dock Switch & Minimize */}
      <div className="px-4 py-2 md:py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between gap-2 shrink-0">
        <div className="min-w-0">
          <h3 className="font-display text-base md:text-lg font-bold text-[#3D312A] leading-tight">
            Room Decorator
          </h3>
          <p className="text-xs text-[#6E5D52] truncate hidden md:block">
            {dockSide === 'right'
              ? 'Move panel left or minimize to reach right side'
              : 'Right side clear — drag any prop anywhere'}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onToggleDockSide}
            title={
              dockSide === 'right'
                ? 'Move panel to left side to decorate right side'
                : 'Move panel to right side'
            }
            aria-label={
              dockSide === 'right' ? 'Move panel to left side' : 'Move panel to right side'
            }
            className="hidden md:flex w-8 h-8 rounded-lg hover:bg-[#E8DCC8] items-center justify-center text-[#3D312A] cursor-pointer"
          >
            {dockSide === 'right' ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelRight className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onToggleMinimized}
            title="Minimize panel to reveal full room"
            aria-label="Minimize decorator panel"
            className="hidden md:flex w-8 h-8 rounded-lg hover:bg-[#E8DCC8] items-center justify-center text-[#3D312A] cursor-pointer"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close decorator"
            className="w-9 h-9 md:w-8 md:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switcher: Props vs Saved Layouts + Quick Save */}
      <div className="px-3 py-2 bg-[#FBF7F0] border-b border-[#D6C4AC] flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setPanelTab('props')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            panelTab === 'props'
              ? 'bg-[#3D312A] text-[#FBF7F0]'
              : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
          }`}
        >
          Props & Items
        </button>
        <button
          type="button"
          onClick={() => setPanelTab('layouts')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            panelTab === 'layouts'
              ? 'bg-[#3D312A] text-[#FBF7F0]'
              : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
          }`}
        >
          Saved Layouts ({savedRoomSlots.length})
        </button>
        <button
          type="button"
          onClick={onSaveRoom}
          title={`Save room decorations (Last saved ${lastSaveTimeLabel})`}
          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
            hasUnsavedRoomChanges
              ? 'bg-[#D95D39] text-white hover:bg-[#C74E2B]'
              : 'bg-[#E6F1EE] text-[#2F7D6D] hover:bg-[#D5E9E3]'
          }`}
        >
          {hasUnsavedRoomChanges ? (
            <Save className="w-3.5 h-3.5" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          <span>{hasUnsavedRoomChanges ? 'Save' : 'Saved'}</span>
        </button>
      </div>

      {/* Room Sky Time & Reset Strip */}
      <div className="px-3 py-1.5 bg-[#F6EFE3] border-b border-[#E8DCC8] flex items-center justify-between gap-2">
        {supportsDayNight ? (
          <div className="flex items-center gap-1" role="group" aria-label="Room sky time">
            <button
              type="button"
              onClick={() => onChangeTimeOfDay('day')}
              aria-pressed={timeOfDay === 'day'}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                timeOfDay === 'day'
                  ? 'bg-[#E09F3E] text-[#FFFDF8]'
                  : 'bg-[#FBF7F0] text-[#6E5D52] hover:text-[#3D312A]'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Day</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeTimeOfDay('night')}
              aria-pressed={timeOfDay === 'night'}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                timeOfDay === 'night'
                  ? 'bg-[#324364] text-[#FCEB9F]'
                  : 'bg-[#FBF7F0] text-[#6E5D52] hover:text-[#3D312A]'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Night</span>
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-semibold text-[#6E5D52] truncate">{activeBgName}</span>
        )}

        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            title={`Reset ${activeBgName} to starter props`}
            className="px-2 py-1 rounded-md bg-[#FBF7F0] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-[11px] font-semibold text-[#6E5D52] hover:text-[#3D312A] flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Room</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                onResetRoom();
                setConfirmReset(false);
              }}
              className="px-2 py-1 rounded-md bg-[#B83B1D] hover:bg-[#9D3016] text-white text-[11px] font-bold cursor-pointer whitespace-nowrap"
            >
              Confirm Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="px-2 py-1 rounded-md bg-[#FBF7F0] border border-[#D6C4AC] text-[11px] font-semibold text-[#3D312A] cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Selected Prop Depth & Scale Inspector */}
      {selectedDecoration && panelTab === 'props' && (
        <div className="p-3.5 bg-[#F3EBDD] border-b border-[#D6C4AC] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3D312A]">
              Selected:{' '}
              {DECORATION_CATALOG.find((d) => d.id === selectedDecoration.itemId)?.name || 'Prop'}
            </span>
            <button
              type="button"
              onClick={onRemoveSelected}
              className="text-xs font-semibold text-[#B83B1D] hover:underline flex items-center gap-1 cursor-pointer"
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
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border cursor-pointer ${
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
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border cursor-pointer ${
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

      {panelTab === 'props' ? (
        <>
          {/* Primary Category Tabs */}
          <div className="px-3 pt-2.5 pb-2 flex items-center gap-1 border-b border-[#E8DCC8]">
            {(['all', 'indoor', 'outdoor', 'craft'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  setSubFilter('all');
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  filter === cat
                    ? 'bg-[#2F7D6D] text-white'
                    : 'bg-[#F3EBDD] text-[#6E5D52] hover:text-[#3D312A]'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Subcategory Filter Strip */}
          {subcategories.length > 1 && (
            <div className="px-3 py-1.5 bg-[#FBF7F0] border-b border-[#E8DCC8] flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setSubFilter('all')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeSub === 'all'
                    ? 'bg-[#3D312A] text-[#FBF7F0]'
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
                      ? 'bg-[#3D312A] text-[#FBF7F0]'
                      : 'text-[#6E5D52] hover:bg-[#E8DCC8]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Decoration Inventory: Suggested for Active Room First, Then Subcategories */}
          <div className="flex-1 overflow-y-auto overscroll-contain craft-scroll p-3.5 space-y-4">
            {filter === 'all' && activeSub === 'all' && suggestedItems.length > 0 && (
              <section className="pb-3 border-b border-[#E8DCC8]">
                <div className="flex items-baseline justify-between mb-1 px-0.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2F7D6D]">
                    Suggested for {activeBgName}
                  </h4>
                  <span className="font-mono-num text-[11px] text-[#8E7C6E]">
                    {suggestedItems.length}
                  </span>
                </div>
                <p className="text-[11px] text-[#6E5D52] mb-2 px-0.5">
                  {supportsDayNight
                    ? `${timeOfDay === 'night' ? 'Night sky' : 'Daytime sky'} & room theme picks`
                    : 'Curated studio picks'}
                </p>
                <div className="grid grid-cols-2 gap-2.5">{suggestedItems.map(renderPropCard)}</div>
              </section>
            )}

            {visibleGroups.map(([groupLabel, items]) => (
              <section key={groupLabel}>
                <div className="flex items-baseline justify-between mb-2 px-0.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                    {groupLabel}
                  </h4>
                  <span className="font-mono-num text-[11px] text-[#8E7C6E]">{items.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">{items.map(renderPropCard)}</div>
              </section>
            ))}
          </div>
        </>
      ) : (
        /* SAVED ROOM LAYOUT SLOTS TAB */
        <div className="flex-1 overflow-y-auto overscroll-contain craft-scroll p-3.5 space-y-4">
          {/* Save Current Room Banner */}
          <div className="p-3 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-[#3D312A]">Current Room: {activeBgName}</div>
                <div className="text-[11px] text-[#6E5D52] font-mono-num">
                  Last saved at {lastSaveTimeLabel}
                </div>
              </div>
              <button
                type="button"
                onClick={onSaveRoom}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  hasUnsavedRoomChanges
                    ? 'bg-[#D95D39] text-white hover:bg-[#C74E2B]'
                    : 'bg-[#2F7D6D] text-white hover:bg-[#256659]'
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>{hasUnsavedRoomChanges ? 'Save Now' : 'Saved'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveLayoutSlot(slotNameInput);
                setSlotNameInput('');
              }}
              className="pt-2 border-t border-[#D6C4AC] flex items-center gap-1.5"
            >
              <input
                type="text"
                value={slotNameInput}
                onChange={(e) => setSlotNameInput(e.target.value)}
                maxLength={32}
                placeholder={`Name slot (e.g. Cozy ${activeBgName})`}
                aria-label="Layout slot name"
                className="flex-1 min-w-0 min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-lg bg-[#FBF7F0] border border-[#D6C4AC] text-base md:text-xs text-[#3D312A] placeholder:text-[#9A8879] focus:outline-none focus:border-[#D95D39]"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 rounded-lg bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save Slot</span>
              </button>
            </form>
          </div>

          {/* Saved Slots List */}
          <div>
            <div className="flex items-baseline justify-between mb-2 px-0.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52]">
                Saved Layout Slots
              </h4>
              <span className="font-mono-num text-[11px] text-[#8E7C6E]">
                {savedRoomSlots.length}/18
              </span>
            </div>

            {savedRoomSlots.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#FBF7F0] border border-dashed border-[#CEB99C] text-center space-y-1">
                <div className="text-xs font-bold text-[#3D312A]">No saved layout slots yet</div>
                <p className="text-[11px] text-[#6E5D52]">
                  Save your favorite arrangements above so you can reload them anytime you come back.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedRoomSlots.map((slot) => {
                  const bgLabel =
                    BACKGROUND_CATALOG.find((b) => b.id === slot.backgroundId)?.name ||
                    slot.backgroundId;
                  const isCurrentRoom = slot.backgroundId === activeBackgroundId;
                  const dateLabel = new Date(slot.savedAt).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  });
                  const timeLabel = new Date(slot.savedAt).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={slot.id}
                      className="p-3 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#3D312A] truncate">
                            {slot.name}
                          </div>
                          <div className="text-[11px] text-[#6E5D52] flex flex-wrap items-center gap-1.5 mt-0.5">
                            <span
                              className={
                                isCurrentRoom ? 'font-semibold text-[#2F7D6D]' : 'font-semibold'
                              }
                            >
                              {bgLabel}
                            </span>
                            {slot.timeOfDay && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{slot.timeOfDay === 'night' ? 'Night' : 'Day'}</span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-num">{slot.decorations.length} props</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-num">
                              {dateLabel} {timeLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onLoadLayoutSlot(slot.id)}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Load</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOverwriteLayoutSlot(slot.id)}
                          title="Overwrite this slot with current room arrangement"
                          className="py-1.5 px-2.5 rounded-lg bg-[#F3EBDD] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-[#3D312A] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Update</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteLayoutSlot(slot.id)}
                          aria-label={`Delete layout ${slot.name}`}
                          title="Delete saved layout"
                          className="py-1.5 px-2 rounded-lg bg-[#F3EBDD] hover:bg-[#FCE6E0] border border-[#D6C4AC] text-[#B83B1D] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </ResponsiveDrawerShell>
  );
};
