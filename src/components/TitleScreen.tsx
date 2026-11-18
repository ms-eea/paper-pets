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

      {/* Main Title Composition */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-10 px-6">
        {/* Top spacer for calm negative space */}
        <div className="h-4" />

        {/* Centerpiece: Bespoke SVG Cut-Paper Lockup + Procreate Sticker Cast */}
        <div className="flex flex-col items-center max-w-3xl w-full text-center">
          {/* Bespoke Cut-Paper Title SVG */}
          <div className="relative mb-3">
            <div className="washi-tape w-20 h-4 -rotate-6 absolute -top-2 -left-4 rounded-sm" />
            <div className="washi-tape-sage w-20 h-4 rotate-6 absolute -top-2 -right-4 rounded-sm" />
            <svg
              viewBox="0 0 560 128"
              className="w-[300px] sm:w-[440px] md:w-[500px] h-auto sticker-shadow"
              aria-label="Paper Pets"
            >
              {/* Layered paper backing cards */}
              <rect
                x="18"
                y="16"
                width="524"
                height="96"
                rx="16"
                fill="#E8DCC8"
                transform="rotate(-1.2 280 64)"
              />
              <rect
                x="14"
                y="12"
                width="532"
                height="96"
                rx="14"
                fill="#FBF7F0"
                stroke="#D6C4AC"
                strokeWidth="3"
              />
              {/* Stitched dashed inner trim */}
              <rect
                x="24"
                y="22"
                width="512"
                height="76"
                rx="10"
                fill="none"
                stroke="#C9B396"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <text
                x="280"
                y="78"
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

          <p className="text-sm sm:text-base text-[#594A40] max-w-md mb-6 font-medium">
            A cozy cut-paper scrapbook world for your hand-drawn animal stickers.
          </p>

          {/* Five Procreate Animal Stickers Showcase */}
          <div className="flex items-end justify-center gap-2 sm:gap-5 mb-7 flex-wrap">
            {PET_CATALOG.map((pet, idx) => (
              <div
                key={pet.id}
                className="relative flex flex-col items-center animate-gentle-bob"
                style={{ animationDelay: `${idx * 0.25}s` }}
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                  <img
                    src={stickerMap[pet.id] || pet.rawAsset}
                    alt={pet.defaultName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain sticker-shadow"
                  />
                </div>
                <span className="mt-1 text-xs font-semibold text-[#3D312A] bg-[#FBF7F0]/90 px-2 py-0.5 rounded border border-[#D6C4AC]">
                  {pet.defaultName}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="px-7 py-3.5 rounded-xl bg-[#D95D39] hover:bg-[#C54E2B] active:translate-y-0.5 text-[#FFFDF8] font-bold text-base shadow-[0_4px_0_#9E3A1D] transition-all cursor-pointer whitespace-nowrap"
            >
              {hasAdopted ? `Visit ${activePetName}` : 'Choose Your Pet'}
            </button>

            {hasAdopted && (
              <button
                type="button"
                onClick={onChooseNewPet}
                className="px-5 py-3.5 rounded-xl bg-[#FBF7F0] hover:bg-[#F3EBDD] text-[#3D312A] font-semibold text-sm border-2 border-[#CEB99C] shadow-[0_3px_0_#D6C4AC] transition-all cursor-pointer whitespace-nowrap"
              >
                Switch Pet
              </button>
            )}
          </div>
        </div>

        {/* Single flat control hint line */}
        <p className="text-xs text-[#594A40] bg-[#FBF7F0]/85 px-4 py-1.5 rounded-lg border border-[#D6C4AC]">
          Press Enter to Start · Tap pet to give love · Drag & resize props in Decorate mode
        </p>
      </div>
    </div>
  );
};
