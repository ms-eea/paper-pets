import React from 'react';
import {
  CalendarCheck,
  Camera,
  Coins,
  Heart,
  Home,
  MapPin,
  PawPrint,
  Utensils,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BACKGROUND_CATALOG, getLocalDateKey, getPreviousDateKey, PET_BY_ID } from '../data/catalog';
import { BackgroundId, DailyCheckInState, PetId } from '../types/game';

interface Props {
  activePetId: PetId;
  petName: string;
  stickerSrc?: string;
  love: number;
  hunger: number;
  coins: number;
  activeBackgroundId: BackgroundId;
  unlockedBackgroundIds: BackgroundId[];
  dailyCheckIn: DailyCheckInState;
  muted: boolean;
  onSelectBackground: (id: BackgroundId) => void;
  onOpenPets: () => void;
  onOpenCheckIn: () => void;
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
  unlockedBackgroundIds,
  dailyCheckIn,
  muted,
  onSelectBackground,
  onOpenPets,
  onOpenCheckIn,
  onEnterPhotoMode,
  onToggleMute,
  onReturnTitle,
}) => {
  const pet = PET_BY_ID[activePetId];
  const loveInt = Math.round(love);
  const hungerInt = Math.round(hunger);
  const todayKey = getLocalDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);
  const checkedInToday = dailyCheckIn.lastCheckInDate === todayKey;
  const activeStreak =
    dailyCheckIn.lastCheckInDate === todayKey || dailyCheckIn.lastCheckInDate === yesterdayKey
      ? dailyCheckIn.streak
      : 0;

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex flex-wrap items-start justify-between gap-3">
      {/* Left Cluster: Pet Identity & Care Fill Bars */}
      <div className="pointer-events-auto flex flex-wrap items-center gap-3 paper-card rounded-xl px-3 py-2">
        <button
          type="button"
          onClick={onOpenPets}
          className="flex items-center gap-2.5 pr-3 border-r border-[#D6C4AC] hover:opacity-85 transition-opacity text-left shrink-0"
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

        {/* Love Bar (icon + fill bar + explicit numeric/text state) */}
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

      {/* Right Cluster: Room Switcher, Coins, Sound, Title */}
      <div className="pointer-events-auto flex flex-wrap items-center gap-2">
        {/* Background Selector */}
        <label className="paper-card rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#2F7D6D] shrink-0" />
          <span className="sr-only">Choose background room</span>
          <select
            value={activeBackgroundId}
            onChange={(e) => onSelectBackground(e.target.value as BackgroundId)}
            aria-label="Choose background room"
            className="bg-transparent text-xs font-semibold text-[#3D312A] focus:outline-none cursor-pointer pr-1"
          >
            {Array.from(
              BACKGROUND_CATALOG.filter((b) => unlockedBackgroundIds.includes(b.id)).reduce(
                (acc, bg) => {
                  const list = acc.get(bg.subcategory) || [];
                  list.push(bg);
                  acc.set(bg.subcategory, list);
                  return acc;
                },
                new Map<string, typeof BACKGROUND_CATALOG>(),
              ),
            ).map(([groupLabel, bgs]) => (
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

        {/* Daily Check-In Button */}
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

        {/* Coins Counter */}
        <div className="paper-card rounded-xl px-3 py-2 flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-[#D99B26]" />
          <span className="font-mono-num text-sm font-semibold text-[#3D312A]">{coins}</span>
          <span className="text-xs text-[#6E5D52] hidden sm:inline">Coins</span>
        </div>

        {/* Photo Mode Button */}
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

        {/* Audio Mute & Menu Buttons */}
        <div className="paper-card rounded-xl p-1 flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            title={muted ? 'Unmute sound' : 'Mute sound'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3D312A] hover:bg-[#E8DCC8] transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onReturnTitle}
            aria-label="Title screen"
            title="Title screen"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3D312A] hover:bg-[#E8DCC8] transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
