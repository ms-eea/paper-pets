import React, { useEffect, useState } from 'react';
import { Coins, RotateCcw, X } from 'lucide-react';
import { PET_CATALOG } from '../../data/catalog';
import { PetId } from '../../types/game';
import { sound } from '../../utils/sound';
import { PaperDecorationSvg } from '../svg/PaperDecorations';

interface Props {
  stickerMap: Partial<Record<PetId, string>>;
  onComplete: (coinsEarned: number, score: number) => void;
  onExit: () => void;
}

interface MemoryCard {
  uid: number;
  pairKey: string;
  label: string;
  petId?: PetId;
  decoId?: string;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(): MemoryCard[] {
  const entries: Omit<MemoryCard, 'uid' | 'flipped' | 'matched'>[] = [
    ...PET_CATALOG.map((p) => ({
      pairKey: p.id,
      label: p.defaultName,
      petId: p.id,
    })),
    { pairKey: 'deco_sunflower', label: 'Sunflower', decoId: 'deco_sunflower' },
    { pairKey: 'deco_lantern', label: 'Lantern', decoId: 'deco_lantern' },
  ];

  const doubled = [...entries, ...entries].map((item, idx) => ({
    ...item,
    uid: idx,
    flipped: false,
    matched: false,
  }));

  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled;
}

export const StickerMemoryGame: React.FC<Props> = ({ stickerMap, onComplete, onExit }) => {
  const [cards, setCards] = useState<MemoryCard[]>(() => buildDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [wonResult, setWonResult] = useState<{ coins: number; score: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);

  const handleCardClick = (uid: number) => {
    if (locked || wonResult) return;
    const target = cards.find((c) => c.uid === uid);
    if (!target || target.flipped || target.matched) return;

    sound.playCardFlip();
    const nextCards = cards.map((c) => (c.uid === uid ? { ...c, flipped: true } : c));
    setCards(nextCards);

    const nextPicked = [...picked, uid];
    setPicked(nextPicked);

    if (nextPicked.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      setLocked(true);

      const first = nextCards.find((c) => c.uid === nextPicked[0])!;
      const second = nextCards.find((c) => c.uid === nextPicked[1])!;

      if (first.pairKey === second.pairKey) {
        window.setTimeout(() => {
          sound.playMatch();
          const matchedDeck = nextCards.map((c) =>
            c.pairKey === first.pairKey ? { ...c, matched: true } : c,
          );
          setCards(matchedDeck);
          setPicked([]);
          setLocked(false);

          if (matchedDeck.every((c) => c.matched)) {
            const efficiencyBonus = Math.max(0, 24 - nextMoves) * 2;
            const coinsEarned = 26 + efficiencyBonus;
            const score = Math.max(100, 500 - nextMoves * 15);
            sound.playSuccess();
            setWonResult({ coins: coinsEarned, score });
            onComplete(coinsEarned, score);
          }
        }, 260);
      } else {
        window.setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              nextPicked.includes(c.uid) && !c.matched ? { ...c, flipped: false } : c,
            ),
          );
          setPicked([]);
          setLocked(false);
        }, 680);
      }
    }
  };

  const handleRestart = () => {
    setCards(buildDeck());
    setPicked([]);
    setMoves(0);
    setLocked(false);
    setWonResult(null);
  };

  const matchedPairs = cards.filter((c) => c.matched).length / 2;

  return (
    <div className="fixed inset-0 z-50 bg-[#3D312A]/60 flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-xl max-h-[94dvh] overflow-y-auto overscroll-contain craft-scroll paper-card rounded-2xl">
        <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F3EBDD] border-b border-[#D6C4AC] flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#3D312A]">
              Sticker Memory Match
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6E5D52]">
              Match all 8 sticker pairs · Fewer moves earn bonus coins
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC]">
              {matchedPairs}/8 Pairs
            </span>
            <span className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC]">
              {moves} Moves
            </span>
            <button
              type="button"
              onClick={onExit}
              aria-label="Close memory game"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-3.5 py-1.5 bg-[#FBF7F0] border-b border-[#D6C4AC] text-center text-[11px] sm:text-xs text-[#3D312A]">
          <strong className="text-[#2F7D6D]">Goal:</strong> Click or tap 2 cards to match all 8 sticker pairs · Fewer moves earn bonus Coins
        </div>

        <div className="p-3 sm:p-6 bg-[#FBF7F0]">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card) => {
              const revealed = card.flipped || card.matched;
              const pet = card.petId ? PET_CATALOG.find((p) => p.id === card.petId) : null;
              return (
                <button
                  key={card.uid}
                  type="button"
                  onClick={() => handleCardClick(card.uid)}
                  className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1.5 sm:p-2 transition-transform duration-150 cursor-pointer ${
                    card.matched
                      ? 'bg-[#E6F3EE] border-[#2F7D6D]'
                      : revealed
                        ? 'bg-[#FFFDF8] border-[#D95D39] scale-[1.02]'
                        : 'bg-[#E8DCC8] border-[#C9B396] hover:bg-[#DFD0BA] active:scale-95'
                  }`}
                >
                  {revealed ? (
                    <>
                      <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                        {pet ? (
                          <img
                            src={stickerMap[pet.id] || pet.rawAsset}
                            alt={pet.defaultName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain sticker-shadow"
                          />
                        ) : (
                          <PaperDecorationSvg itemId={card.decoId || 'deco_sunflower'} />
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-[#3D312A] mt-0.5 truncate max-w-full">
                        {card.label}
                      </span>
                    </>
                  ) : (
                    <div className="w-full h-full rounded-lg border border-dashed border-[#B59B7D] flex items-center justify-center">
                      <span className="font-display text-lg font-bold text-[#8E755B]">?</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {wonResult && (
          <div className="absolute inset-0 bg-[#3D312A]/45 flex items-center justify-center p-6">
            <div className="paper-card rounded-2xl p-6 text-center max-w-sm w-full space-y-4">
              <h4 className="font-display text-2xl font-bold text-[#3D312A]">Board Cleared!</h4>
              <p className="text-xs text-[#6E5D52]">
                Matched all 8 pairs in <span className="font-mono-num font-bold">{moves}</span> moves
              </p>
              <div className="paper-card-kraft rounded-xl p-4 flex items-center justify-center gap-2">
                <Coins className="w-5 h-5 text-[#D99B26]" />
                <span className="font-mono-num text-2xl font-bold text-[#3D312A]">
                  +{wonResult.coins} Coins
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#F3EBDD] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-[#3D312A] font-semibold text-sm cursor-pointer whitespace-nowrap"
                >
                  Back to Room
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
