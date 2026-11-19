import React from 'react';
import { CalendarCheck, Check, Coins, Sparkles, X } from 'lucide-react';
import {
  getDailyRewardForStreak,
  getLocalDateKey,
  getPreviousDateKey,
  PET_BY_ID,
} from '../data/catalog';
import { DailyCheckInState, PetId } from '../types/game';

interface Props {
  dailyCheckIn: DailyCheckInState;
  activePetId: PetId;
  petName: string;
  stickerSrc?: string;
  onClaim: () => void;
  onClose: () => void;
}

export const DailyCheckInModal: React.FC<Props> = ({
  dailyCheckIn,
  activePetId,
  petName,
  stickerSrc,
  onClaim,
  onClose,
}) => {
  const pet = PET_BY_ID[activePetId];
  const todayKey = getLocalDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);
  const checkedInToday = dailyCheckIn.lastCheckInDate === todayKey;

  // Determine the current consecutive streak state accurately
  const activeStreak =
    dailyCheckIn.lastCheckInDate === todayKey || dailyCheckIn.lastCheckInDate === yesterdayKey
      ? dailyCheckIn.streak
      : 0;

  // Day index we are displaying for today (if already claimed today, highlight that day; otherwise next day)
  const todayDisplayStreak = checkedInToday ? Math.max(1, activeStreak) : activeStreak + 1;
  const weekIndex = Math.floor((todayDisplayStreak - 1) / 7);
  const weekStartDay = weekIndex * 7 + 1;
  const todayRewardCoins = getDailyRewardForStreak(todayDisplayStreak);

  const days = Array.from({ length: 7 }, (_, i) => {
    const dayNum = weekStartDay + i;
    const coins = getDailyRewardForStreak(dayNum);
    const isCompleted = checkedInToday ? dayNum <= activeStreak : dayNum <= activeStreak;
    const isTodayTarget = !checkedInToday && dayNum === todayDisplayStreak;
    const isClaimedToday = checkedInToday && dayNum === activeStreak;
    return { dayNum, coins, isCompleted, isTodayTarget, isClaimedToday };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#3D312A]/45"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl paper-card rounded-2xl p-4 sm:p-8 max-h-[92dvh] overflow-y-auto overscroll-contain craft-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="washi-tape w-24 h-4 -rotate-2 absolute -top-2 left-10 rounded-sm" />
        <div className="washi-tape-sage w-20 h-4 rotate-3 absolute -top-2 right-14 rounded-sm" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close daily check-in"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5D52] mb-1">
            <CalendarCheck className="w-4 h-4 text-[#2F7D6D]" />
            <span>Scrapbook Stamp Card</span>
            {weekIndex > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>Week {weekIndex + 1} Loyalty Bonus</span>
              </>
            )}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3D312A]">
            Daily Pet Check-In
          </h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#6E5D52]">
            <span>
              Streak:{' '}
              <strong className="font-mono-num text-[#3D312A]">
                {activeStreak} {activeStreak === 1 ? 'Day' : 'Days'}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Best:{' '}
              <strong className="font-mono-num text-[#3D312A]">
                {dailyCheckIn.bestStreak} {dailyCheckIn.bestStreak === 1 ? 'Day' : 'Days'}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Total Stamps:{' '}
              <strong className="font-mono-num text-[#3D312A]">{dailyCheckIn.totalCheckIns}</strong>
            </span>
          </div>
        </div>

        {/* 7-Day Scrapbook Stamp Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {days.map((d, idx) => {
            const isGrandDay = idx === 6;
            return (
              <div
                key={d.dayNum}
                className={`relative rounded-xl border-2 p-3.5 flex flex-col justify-between transition-all ${
                  isGrandDay ? 'col-span-2' : ''
                } ${
                  d.isClaimedToday
                    ? 'bg-[#E6F3EE] border-[#2F7D6D]'
                    : d.isCompleted
                      ? 'bg-[#F3EBDD] border-[#2F7D6D]/60'
                      : d.isTodayTarget
                        ? 'bg-[#FFF7EE] border-[#D95D39] shadow-[0_3px_0_#D95D39]'
                        : 'bg-[#FBF7F0] border-[#D6C4AC]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-[#3D312A] whitespace-nowrap">
                    Day {d.dayNum}
                  </span>
                  {d.isCompleted ? (
                    <span className="w-6 h-6 rounded-full bg-[#2F7D6D] text-[#FFFDF8] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.75]" />
                    </span>
                  ) : d.isTodayTarget ? (
                    <span className="text-[11px] font-bold text-[#D95D39] whitespace-nowrap">
                      Today
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-[#8C7A6C] whitespace-nowrap">
                      {isGrandDay ? 'Grand Stamp' : 'Upcoming'}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Coins
                      className={`w-4 h-4 shrink-0 ${
                        d.isCompleted
                          ? 'text-[#2F7D6D]'
                          : d.isTodayTarget
                            ? 'text-[#D99B26]'
                            : 'text-[#B59B7D]'
                      }`}
                    />
                    <span className="font-mono-num text-base font-bold text-[#3D312A]">
                      +{d.coins}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6E5D52]">
                    {d.isClaimedToday
                      ? 'Stamped'
                      : d.isCompleted
                        ? 'Collected'
                        : isGrandDay
                          ? 'Streak Jackpot'
                          : 'Coins'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Pet Prompt & Primary Action */}
        <div className="paper-card-kraft rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] flex items-center justify-center shrink-0 p-1">
              <img
                src={stickerSrc || pet.rawAsset}
                alt={petName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sticker-shadow"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#3D312A]">
                {checkedInToday
                  ? `${petName} is stamped in for today!`
                  : `${petName} is ready for today's check-in`}
              </div>
              <p className="text-xs text-[#6E5D52] mt-0.5 leading-snug">
                {checkedInToday
                  ? 'Come back tomorrow and interact with your pets to keep your streak growing.'
                  : 'Pet, feed, dress up, play a trick, or claim here each day to earn extra streak coins.'}
              </p>
            </div>
          </div>

          {checkedInToday ? (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-[#FFFDF8] font-bold text-sm shadow-[0_3px_0_#1C4D43] cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Checked In Today</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClaim}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-[#D95D39] hover:bg-[#C54E2B] text-[#FFFDF8] font-bold text-sm shadow-[0_3px_0_#9E3A1D] cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check In &amp; Claim +{todayRewardCoins}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
