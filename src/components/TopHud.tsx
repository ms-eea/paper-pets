import React, { useEffect, useRef, useState } from 'react';
import {
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  Coins,
  Heart,
  Home,
  MapPin,
  Moon,
  PawPrint,
  Save,
  SlidersHorizontal,
  Sun,
  Utensils,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  BACKGROUND_CATALOG,
  getLocalDateKey,
  getPreviousDateKey,
  PET_BY_ID,
  ROOM_SUPPORTS_DAY_NIGHT,
} from '../data/catalog';
import { BackgroundId, DailyCheckInState, PetId, TimeOfDay } from '../types/game';

interface Props {
  activePetId: PetId;
  petName: string;
  stickerSrc?: string;
  love: number;
  hunger: number;
  coins: number;
  activeBackgroundId: BackgroundId;
  timeOfDay: TimeOfDay;
  unlockedBackgroundIds: BackgroundId[];
  dailyCheckIn: DailyCheckInState;
  muted: boolean;
  hasUnsavedRoomChanges: boolean;
  lastRoomSaveAt: number;
  onSelectBackground: (id: BackgroundId) => void;
  onChangeTimeOfDay: (time: TimeOfDay) => void;
  onOpenPets: () => void;
  onOpenCheckIn: () => void;
  onSaveRoom: () => void;
  onEnterPhotoMode: () => void;
  onToggleMute: () => void;
  onReturnTitle: () => void;
}

function getMoodLabel(val: number, type: 'love' | 'hunger'): string {
  if (val >= 80) return type === 'love' ? 'Adored' : 'Full';
  if (val >= 50) return type === 'love' ? 'Content' : 'Satisfied';
  if (val >= 28) return type === 'love' ? 'Lonely' : 'Peckish';
  return type === 'love' ? 'Needs Hug' : 'Hungry';
}

export const TopHud: React.FC<Props> = ({
  activePetId,
  petName,
  stickerSrc,
  love,
  hunger,
  coins,
  activeBackgroundId,
  timeOfDay,
  unlockedBackgroundIds,
  dailyCheckIn,
  muted,
  hasUnsavedRoomChanges,
  lastRoomSaveAt,
  onSelectBackground,
  onChangeTimeOfDay,
  onOpenPets,
  onOpenCheckIn,
  onSaveRoom,
  onEnterPhotoMode,
  onToggleMute,
  onReturnTitle,
}) => {
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const pet = PET_BY_ID[activePetId];
  const supportsDayNight = ROOM_SUPPORTS_DAY_NIGHT[activeBackgroundId];
  const loveInt = Math.round(love);
  const hungerInt = Math.round(hunger);
  const todayKey = getLocalDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);
  const checkedInToday = dailyCheckIn.lastCheckInDate === todayKey;
  const activeStreak =
    dailyCheckIn.lastCheckInDate === todayKey || dailyCheckIn.lastCheckInDate === yesterdayKey
      ? dailyCheckIn.streak
      : 0;
  const savedTimeLabel = new Date(lastRoomSaveAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  useEffect(() => {
    if (!mobileToolsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (mobileBarRef.current && !mobileBarRef.current.contains(e.target as Node)) {
        setMobileToolsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileToolsOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileToolsOpen]);

  const unlockedBgGroups = Array.from(
    BACKGROUND_CATALOG.filter((b) => unlockedBackgroundIds.includes(b.id)).reduce((acc, bg) => {
      const list = acc.get(bg.subcategory) || [];
      list.push(bg);
      acc.set(bg.subcategory, list);
      return acc;
    }, new Map<string, typeof BACKGROUND_CATALOG>()),
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      {/* MOBILE (< md): Compact Single-Row HUD + Collapsible Tools Menu */}
      <div
        ref={mobileBarRef}
        className="md:hidden pointer-events-auto relative px-2 pt-[max(0.5rem,env(safe-area-inset-top))]"
      >
        <div className="paper-card rounded-xl px-2 py-1.5 flex items-center justify-between gap-2">
          {/* Pet Avatar Switcher */}
          <button
            type="button"
            onClick={onOpenPets}
            className="min-h-[40px] flex items-center gap-1.5 pr-2 border-r border-[#D6C4AC] shrink-0 cursor-pointer text-left"
            aria-label={`Switch or rename ${petName}`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={stickerSrc || pet.rawAsset}
                alt={petName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="text-xs font-bold text-[#3D312A] max-w-[64px] truncate hidden min-[400px]:inline">
              {petName}
            </span>
          </button>

          {/* Compact Dual Bars: Love + Hunger */}
          <div className="flex-1 min-w-0 grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-1 text-[10px] font-semibold text-[#3D312A] mb-0.5">
                <span className="flex items-center gap-0.5 truncate">
                  <Heart className="w-3 h-3 text-[#D95D39] fill-[#D95D39] shrink-0" />
                  <span>Love</span>
                </span>
                <span className="font-mono-num text-[#6E5D52]">{loveInt}</span>
              </div>
              <div className="h-2 w-full rounded-sm bg-[#E8DCC8] border border-[#D6C4AC] overflow-hidden">
                <div
                  className="h-full bg-[#D95D39] transition-[width] duration-300"
                  style={{ width: `${Math.max(6, loveInt)}%` }}
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center justify-between gap-1 text-[10px] font-semibold text-[#3D312A] mb-0.5">
                <span className="flex items-center gap-0.5 truncate">
                  <Utensils className="w-3 h-3 text-[#2F7D6D] shrink-0" />
                  <span>Food</span>
                </span>
                <span className="font-mono-num text-[#6E5D52]">{hungerInt}</span>
              </div>
              <div className="h-2 w-full rounded-sm bg-[#E8DCC8] border border-[#D6C4AC] overflow-hidden">
                <div
                  className="h-full bg-[#2F7D6D] transition-[width] duration-300"
                  style={{ width: `${Math.max(6, hungerInt)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Coins + Quick Save + Tools Toggle */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="px-1.5 py-1 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#D99B26] shrink-0" />
              <span className="font-mono-num text-xs font-bold text-[#3D312A]">{coins}</span>
            </div>

            <button
              type="button"
              onClick={onSaveRoom}
              aria-label={hasUnsavedRoomChanges ? 'Save room decorations' : 'Room saved'}
              className={`min-w-[36px] min-h-[36px] px-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                hasUnsavedRoomChanges
                  ? 'bg-[#D95D39] text-white'
                  : 'bg-[#E6F1EE] text-[#2F7D6D]'
              }`}
            >
              {hasUnsavedRoomChanges ? (
                <Save className="w-4 h-4 shrink-0" />
              ) : (
                <Check className="w-4 h-4 shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileToolsOpen((open) => !open)}
              aria-expanded={mobileToolsOpen}
              aria-label="Open room tools menu"
              className={`min-h-[36px] px-2 rounded-lg border flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                mobileToolsOpen
                  ? 'bg-[#3D312A] text-[#FBF7F0] border-[#3D312A]'
                  : 'bg-[#F3EBDD] text-[#3D312A] border-[#D6C4AC]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>Tools</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Tools Popover */}
        {mobileToolsOpen && (
          <div className="mt-2 ml-auto w-full max-w-[340px] paper-card rounded-2xl p-3.5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-[#3D312A]">Room &amp; Tools</span>
              <button
                type="button"
                onClick={() => setMobileToolsOpen(false)}
                aria-label="Close tools menu"
                className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Room Selector */}
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52] block mb-1">
                Active Room
              </span>
              <div className="min-h-[44px] rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] px-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2F7D6D] shrink-0" />
                <select
                  value={activeBackgroundId}
                  onChange={(e) => onSelectBackground(e.target.value as BackgroundId)}
                  aria-label="Choose background room"
                  className="flex-1 bg-transparent text-xs font-semibold text-[#3D312A] focus:outline-none py-2 cursor-pointer"
                >
                  {unlockedBgGroups.map(([groupLabel, bgs]) => (
                    <optgroup key={groupLabel} label={groupLabel}>
                      {bgs.map((bg) => (
                        <option key={bg.id} value={bg.id}>
                          {bg.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </label>

            {/* Per-Room Day / Night Toggle */}
            {supportsDayNight && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D52] block mb-1">
                  Sky Light
                </span>
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC]">
                  <button
                    type="button"
                    onClick={() => onChangeTimeOfDay('day')}
                    aria-pressed={timeOfDay === 'day'}
                    className={`min-h-[40px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      timeOfDay === 'day'
                        ? 'bg-[#E09F3E] text-[#FFFDF8]'
                        : 'text-[#6E5D52] hover:text-[#3D312A]'
                    }`}
                  >
                    <Sun className="w-4 h-4 shrink-0" />
                    <span>Day Sky</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTimeOfDay('night')}
                    aria-pressed={timeOfDay === 'night'}
                    className={`min-h-[40px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      timeOfDay === 'night'
                        ? 'bg-[#324364] text-[#FCEB9F]'
                        : 'text-[#6E5D52] hover:text-[#3D312A]'
                    }`}
                  >
                    <Moon className="w-4 h-4 shrink-0" />
                    <span>Night Sky</span>
                  </button>
                </div>
              </div>
            )}

            {/* Utility Action Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileToolsOpen(false);
                  onOpenCheckIn();
                }}
                className={`min-h-[44px] px-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  checkedInToday
                    ? 'bg-[#F3EBDD] border-[#D6C4AC] text-[#2F7D6D]'
                    : 'bg-[#FFF7EE] border-[#D95D39] text-[#D95D39]'
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span className="font-mono-num">
                  {checkedInToday
                    ? `Day ${activeStreak}`
                    : activeStreak > 0
                      ? `Day ${activeStreak + 1}`
                      : 'Check-In'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileToolsOpen(false);
                  onEnterPhotoMode();
                }}
                className="min-h-[44px] px-3 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] text-xs font-semibold text-[#3D312A] flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Camera className="w-4 h-4 text-[#2F7D6D] shrink-0" />
                <span>Photo Mode</span>
              </button>

              <button
                type="button"
                onClick={onToggleMute}
                className="min-h-[44px] px-3 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] text-xs font-semibold text-[#3D312A] flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4 text-[#B83B1D] shrink-0" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#2F7D6D] shrink-0" />
                )}
                <span>{muted ? 'Sound Off' : 'Sound On'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileToolsOpen(false);
                  onReturnTitle();
                }}
                className="min-h-[44px] px-3 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] text-xs font-semibold text-[#3D312A] flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Home className="w-4 h-4 text-[#6E5D52] shrink-0" />
                <span>Title Screen</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP & TABLET (>= md): Full Dual-Cluster HUD */}
      <div className="hidden md:flex p-3 sm:p-4 flex-wrap items-start justify-between gap-3">
        {/* Left Cluster: Pet Identity & Care Fill Bars */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-3 paper-card rounded-xl px-3 py-2">
          <button
            type="button"
            onClick={onOpenPets}
            className="flex items-center gap-2.5 pr-3 border-r border-[#D6C4AC] hover:opacity-85 transition-opacity text-left shrink-0 cursor-pointer"
            title="Switch or rename pet"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={stickerSrc || pet.rawAsset}
                alt={petName}
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#3D312A] leading-tight whitespace-nowrap">
                {petName}
              </div>
              <div className="text-xs text-[#6E5D52] flex items-center gap-1 whitespace-nowrap">
                <PawPrint className="w-3 h-3" />
                <span>{pet.species}</span>
              </div>
            </div>
          </button>

          {/* Love Bar */}
          <div className="min-w-[138px]">
            <div className="flex items-center justify-between gap-2 text-xs mb-1">
              <span className="font-semibold text-[#3D312A] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#D95D39] fill-[#D95D39]" />
                Love
              </span>
              <span className="font-mono-num text-[11px] text-[#6E5D52]">
                {loveInt}/100 · {getMoodLabel(loveInt, 'love')}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-sm bg-[#E8DCC8] border border-[#D6C4AC] overflow-hidden">
              <div
                className="h-full bg-[#D95D39] transition-[width] duration-300"
                style={{ width: `${Math.max(4, loveInt)}%` }}
              />
            </div>
          </div>

          {/* Hunger Bar */}
          <div className="min-w-[138px]">
            <div className="flex items-center justify-between gap-2 text-xs mb-1">
              <span className="font-semibold text-[#3D312A] flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-[#2F7D6D]" />
                Hunger
              </span>
              <span className="font-mono-num text-[11px] text-[#6E5D52]">
                {hungerInt}/100 · {getMoodLabel(hungerInt, 'hunger')}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-sm bg-[#E8DCC8] border border-[#D6C4AC] overflow-hidden">
              <div
                className="h-full bg-[#2F7D6D] transition-[width] duration-300"
                style={{ width: `${Math.max(4, hungerInt)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Cluster: Room Switcher, Day/Night, Coins, Save, Photo Mode, Sound, Title */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <label className="paper-card rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#2F7D6D] shrink-0" />
            <span className="sr-only">Choose background room</span>
            <select
              value={activeBackgroundId}
              onChange={(e) => onSelectBackground(e.target.value as BackgroundId)}
              aria-label="Choose background room"
              className="bg-transparent text-xs font-semibold text-[#3D312A] focus:outline-none cursor-pointer pr-1"
            >
              {unlockedBgGroups.map(([groupLabel, bgs]) => (
                <optgroup key={groupLabel} label={groupLabel}>
                  {bgs.map((bg) => (
                    <option key={bg.id} value={bg.id}>
                      {bg.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {supportsDayNight && (
            <div
              role="group"
              aria-label="Room sky time of day"
              className="paper-card rounded-xl p-1 flex items-center gap-0.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => onChangeTimeOfDay('day')}
                aria-pressed={timeOfDay === 'day'}
                title="Daytime sky & light"
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  timeOfDay === 'day'
                    ? 'bg-[#E09F3E] text-[#FFFDF8]'
                    : 'text-[#6E5D52] hover:bg-[#F3EBDD] hover:text-[#3D312A]'
                }`}
              >
                <Sun className="w-3.5 h-3.5 shrink-0" />
                <span>Day</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeTimeOfDay('night')}
                aria-pressed={timeOfDay === 'night'}
                title="Nighttime starry sky"
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  timeOfDay === 'night'
                    ? 'bg-[#324364] text-[#FCEB9F]'
                    : 'text-[#6E5D52] hover:bg-[#F3EBDD] hover:text-[#3D312A]'
                }`}
              >
                <Moon className="w-3.5 h-3.5 shrink-0" />
                <span>Night</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenCheckIn}
            title="Open Daily Check-In stamp card"
            className={`paper-card rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              checkedInToday
                ? 'text-[#2F7D6D] hover:bg-[#F3EBDD]'
                : 'text-[#D95D39] border-[#D95D39] bg-[#FFF7EE] hover:bg-[#FCEAD9]'
            }`}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span className="font-mono-num">
              {checkedInToday
                ? `Day ${activeStreak}`
                : activeStreak > 0
                  ? `Day ${activeStreak + 1} Ready`
                  : 'Check-In'}
            </span>
          </button>

          <div className="paper-card rounded-xl px-3 py-2 flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#D99B26]" />
            <span className="font-mono-num text-sm font-semibold text-[#3D312A]">{coins}</span>
            <span className="text-xs text-[#6E5D52] hidden sm:inline">Coins</span>
          </div>

          <button
            type="button"
            onClick={onSaveRoom}
            aria-label={hasUnsavedRoomChanges ? 'Save room decorations' : 'Room saved'}
            title={
              hasUnsavedRoomChanges
                ? 'Save room decorations for your next visit'
                : `Room saved (${savedTimeLabel}) — click to save again`
            }
            className={`paper-card rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              hasUnsavedRoomChanges
                ? 'bg-[#D95D39] text-white border-[#B83B1D] hover:bg-[#C74E2B]'
                : 'text-[#2F7D6D] hover:bg-[#F3EBDD]'
            }`}
          >
            {hasUnsavedRoomChanges ? (
              <Save className="w-4 h-4 shrink-0" />
            ) : (
              <Check className="w-4 h-4 shrink-0" />
            )}
            <span>{hasUnsavedRoomChanges ? 'Save Room' : 'Saved'}</span>
          </button>

          <button
            type="button"
            onClick={onEnterPhotoMode}
            aria-label="Photo Mode"
            title="Photo Mode — hide UI for a clean screenshot"
            className="paper-card rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs font-semibold text-[#3D312A] hover:bg-[#F3EBDD] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Camera className="w-4 h-4 text-[#2F7D6D] shrink-0" />
            <span>Photo Mode</span>
          </button>

          <div className="paper-card rounded-xl p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
              title={muted ? 'Unmute sound' : 'Mute sound'}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3D312A] hover:bg-[#E8DCC8] transition-colors cursor-pointer"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onReturnTitle}
              aria-label="Title screen"
              title="Title screen"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3D312A] hover:bg-[#E8DCC8] transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
