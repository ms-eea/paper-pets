import React, { useEffect, useState } from 'react';
import { CalendarCheck, Coins, Heart, Save, Utensils, X } from 'lucide-react';
import {
  getDailyRewardForStreak,
  getLocalDateKey,
  getPreviousDateKey,
} from '../data/catalog';
import { DailyCheckInState } from '../types/game';

interface Props {
  petName: string;
  love: number;
  hunger: number;
  dailyCheckIn: DailyCheckInState;
  hasUnsavedRoomChanges: boolean;
  hideOnMobile?: boolean;
  onClaimCheckIn: () => void;
  onOpenCheckInModal: () => void;
  onOpenFeed: () => void;
  onGiveLove: () => void;
  onSaveRoom: () => void;
}

export const EventActionBanner: React.FC<Props> = ({
  petName,
  love,
  hunger,
  dailyCheckIn,
  hasUnsavedRoomChanges,
  hideOnMobile = false,
  onClaimCheckIn,
  onOpenCheckInModal,
  onOpenFeed,
  onGiveLove,
  onSaveRoom,
}) => {
  const [dismissedKeys, setDismissedKeys] = useState<string[]>([]);

  // Reset the unsaved-room dismissal once the room becomes saved again
  useEffect(() => {
    if (!hasUnsavedRoomChanges) {
      setDismissedKeys((prev) => prev.filter((k) => k !== 'unsaved_room'));
    }
  }, [hasUnsavedRoomChanges]);

  const todayKey = getLocalDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);
  const checkedInToday = dailyCheckIn.lastCheckInDate === todayKey;
  const activeStreak =
    dailyCheckIn.lastCheckInDate === todayKey || dailyCheckIn.lastCheckInDate === yesterdayKey
      ? dailyCheckIn.streak
      : 0;
  const nextDayNum = activeStreak + 1;
  const todayRewardCoins = getDailyRewardForStreak(nextDayNum);

  type EventAction = {
    key: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaClass: string;
    onPrimary: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
  };

  const candidates: EventAction[] = [];

  if (!checkedInToday) {
    candidates.push({
      key: `checkin_${todayKey}`,
      icon: <CalendarCheck className="w-4 h-4 text-[#D95D39] shrink-0" />,
      title: `Day ${nextDayNum} Daily Check-In Ready`,
      subtitle: `Claim today's stamp for +${todayRewardCoins} Coins`,
      ctaLabel: `Claim +${todayRewardCoins}`,
      ctaClass: 'bg-[#D95D39] hover:bg-[#C54E2B] text-[#FFFDF8] shadow-[0_2px_0_#9E3A1D]',
      onPrimary: onClaimCheckIn,
      secondaryLabel: 'Stamps',
      onSecondary: onOpenCheckInModal,
    });
  }

  if (hunger < 40) {
    candidates.push({
      key: 'low_hunger',
      icon: <Utensils className="w-4 h-4 text-[#2F7D6D] shrink-0" />,
      title: `${petName} is getting hungry`,
      subtitle: 'Pick a paper snack to fill their belly',
      ctaLabel: 'Feed Snack',
      ctaClass: 'bg-[#2F7D6D] hover:bg-[#256659] text-[#FFFDF8] shadow-[0_2px_0_#1C4D43]',
      onPrimary: onOpenFeed,
    });
  }

  if (love < 40) {
    candidates.push({
      key: 'low_love',
      icon: <Heart className="w-4 h-4 text-[#D95D39] fill-[#D95D39] shrink-0" />,
      title: `${petName} misses hugs`,
      subtitle: 'Give a quick cuddle to boost Love',
      ctaLabel: 'Give Love',
      ctaClass: 'bg-[#D95D39] hover:bg-[#C54E2B] text-[#FFFDF8] shadow-[0_2px_0_#9E3A1D]',
      onPrimary: onGiveLove,
    });
  }

  if (hasUnsavedRoomChanges) {
    candidates.push({
      key: 'unsaved_room',
      icon: <Save className="w-4 h-4 text-[#D95D39] shrink-0" />,
      title: 'Room changes ready to save',
      subtitle: 'Save your prop layout for next time',
      ctaLabel: 'Save Room',
      ctaClass: 'bg-[#D95D39] hover:bg-[#C54E2B] text-[#FFFDF8] shadow-[0_2px_0_#9E3A1D]',
      onPrimary: onSaveRoom,
    });
  }

  const activeEvent = candidates.find((c) => !dismissedKeys.includes(c.key));
  if (!activeEvent) return null;

  return (
    <div
      role="region"
      aria-label="Suggested activity"
      className={`fixed top-[62px] md:top-[84px] left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-lg pointer-events-auto ${
        hideOnMobile ? 'hidden md:block' : ''
      }`}
    >
      <div className="paper-card rounded-xl px-3 py-2 flex items-center justify-between gap-2.5 border-[#D95D39]/55 bg-[#FFFDF8]/95">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] flex items-center justify-center shrink-0">
            {activeEvent.icon}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#3D312A] truncate">{activeEvent.title}</div>
            <div className="text-[11px] text-[#6E5D52] truncate">{activeEvent.subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {activeEvent.secondaryLabel && activeEvent.onSecondary && (
            <button
              type="button"
              onClick={activeEvent.onSecondary}
              className="hidden sm:inline-flex min-h-[36px] px-2.5 py-1.5 rounded-lg bg-[#F3EBDD] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-xs font-semibold text-[#3D312A] items-center cursor-pointer whitespace-nowrap"
            >
              {activeEvent.secondaryLabel}
            </button>
          )}
          <button
            type="button"
            onClick={activeEvent.onPrimary}
            className={`min-h-[38px] sm:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap ${activeEvent.ctaClass}`}
          >
            {activeEvent.key.startsWith('checkin_') && <Coins className="w-3.5 h-3.5 shrink-0" />}
            <span>{activeEvent.ctaLabel}</span>
          </button>
          <button
            type="button"
            onClick={() => setDismissedKeys((prev) => [...prev, activeEvent.key])}
            aria-label="Dismiss reminder"
            className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#6E5D52] hover:text-[#3D312A] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
