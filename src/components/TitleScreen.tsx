import React, { useEffect } from 'react';
import { PET_CATALOG } from '../data/catalog';
import { PetId } from '../types/game';
import { PaperBackground } from './svg/PaperBackgrounds';

interface Props {
  hasAdopted: boolean;
  activePetName: string;
  stickerMap: Partial<Record<PetId, string>>;
  onStart: () => void;
  onChooseNewPet: () => void;
}

export const TitleScreen: React.FC<Props> = ({
  hasAdopted,
  activePetName,
  stickerMap,
  onStart,
  onChooseNewPet,
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onStart]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Live atmospheric cut-paper backdrop */}
      <div className="absolute inset-0">
        <PaperBackground backgroundId="meadow" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(251, 247, 240, 0.78) 0%, rgba(251, 247, 240, 0.35) 55%, rgba(61, 49, 42, 0.14) 100%)',
          }}
        />
      </div>

      {/* Main Title Composition (scroll-safe on compact mobile heights) */}
      <div className="relative z-10 w-full h-full overflow-y-auto overscroll-contain craft-scroll flex flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Top spacer for calm negative space */}
        <div className="h-2 sm:h-4 shrink-0" />

        {/* Centerpiece: Bespoke SVG Cut-Paper Lockup + Procreate Sticker Cast */}
        <div className="flex flex-col items-center max-w-3xl w-full text-center my-auto py-2">
          {/* Bespoke Cut-Paper Title SVG */}
          <div className="relative mb-2.5 sm:mb-3 max-w-full">
            <div className="washi-tape w-16 sm:w-20 h-3.5 sm:h-4 -rotate-6 absolute -top-2 -left-2 sm:-left-4 rounded-sm" />
            <div className="washi-tape-sage w-16 sm:w-20 h-3.5 sm:h-4 rotate-6 absolute -top-2 -right-2 sm:-right-4 rounded-sm" />
            <svg
              viewBox="0 0 600 156"
              className="w-[min(88vw,340px)] sm:w-[460px] md:w-[540px] h-auto sticker-shadow"
              aria-label="Sticker Pals: Paper Pets"
            >
              {/* Layered paper backing cards */}
              <rect
                x="22"
                y="22"
                width="556"
                height="116"
                rx="18"
                fill="#E8DCC8"
                transform="rotate(-1.2 300 80)"
              />
              <rect
                x="18"
                y="18"
                width="564"
                height="116"
                rx="16"
                fill="#FBF7F0"
                stroke="#D6C4AC"
                strokeWidth="3"
              />
              {/* Stitched dashed inner trim */}
              <rect
                x="28"
                y="28"
                width="544"
                height="96"
                rx="12"
                fill="none"
                stroke="#C9B396"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Eyebrow Sticker Banner: Sticker Pals */}
              <rect
                x="202"
                y="4"
                width="196"
                height="30"
                rx="8"
                fill="#D95D39"
                stroke="#FFFDF8"
                strokeWidth="2.5"
              />
              <text
                x="300"
                y="24"
                textAnchor="middle"
                fontSize="14.5"
                fontWeight="700"
                letterSpacing="2.4"
                fill="#FFFDF8"
              >
                STICKER PALS
              </text>
              {/* Main Display Title: Paper Pets */}
              <text
                x="300"
                y="100"
                textAnchor="middle"
                className="font-display"
                fontSize="58"
                fontWeight="700"
                fill="#3D312A"
                letterSpacing="-0.5"
              >
                Paper Pets
              </text>
            </svg>
          </div>

          <p className="text-sm sm:text-base text-[#594A40] max-w-md mb-4 sm:mb-6 font-medium px-2">
            A cozy cut-paper scrapbook studio for your hand-drawn animal stickers.
          </p>

          {/* Six Animal Stickers Showcase */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-end justify-center gap-2.5 sm:gap-5 mb-5 sm:mb-7 max-w-sm sm:max-w-none">
            {PET_CATALOG.map((pet, idx) => (
              <div
                key={pet.id}
                className="relative flex flex-col items-center animate-gentle-bob"
                style={{ animationDelay: `${idx * 0.25}s` }}
              >
                <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
                  <img
                    src={stickerMap[pet.id] || pet.rawAsset}
                    alt={pet.defaultName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain sticker-shadow"
                  />
                </div>
                <span className="mt-1 text-[11px] sm:text-xs font-semibold text-[#3D312A] bg-[#FBF7F0]/90 px-2 py-0.5 rounded border border-[#D6C4AC] whitespace-nowrap">
                  {pet.defaultName}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none">
            <button
              type="button"
              onClick={onStart}
              className="min-h-[48px] px-7 py-3 rounded-xl bg-[#D95D39] hover:bg-[#C54E2B] active:translate-y-0.5 text-[#FFFDF8] font-bold text-base shadow-[0_4px_0_#9E3A1D] transition-all cursor-pointer whitespace-nowrap"
            >
              {hasAdopted ? `Visit ${activePetName}` : 'Choose Your Pet'}
            </button>

            {hasAdopted && (
              <button
                type="button"
                onClick={onChooseNewPet}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-[#FBF7F0] hover:bg-[#F3EBDD] text-[#3D312A] font-semibold text-sm border-2 border-[#CEB99C] shadow-[0_3px_0_#D6C4AC] transition-all cursor-pointer whitespace-nowrap"
              >
                Switch Pet
              </button>
            )}
          </div>
        </div>

        {/* Single flat control hint line */}
        <p className="text-[11px] sm:text-xs text-[#594A40] bg-[#FBF7F0]/85 px-3.5 py-1.5 rounded-lg border border-[#D6C4AC] mt-3 text-center">
          Drag any prop anytime · Toggle Day/Night skies · Save layouts for tomorrow
        </p>
      </div>
    </div>
  );
};
