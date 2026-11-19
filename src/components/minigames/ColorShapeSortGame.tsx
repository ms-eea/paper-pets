import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Coins, RotateCcw, X } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Props {
  onComplete: (coinsEarned: number, score: number) => void;
  onExit: () => void;
}

type SortColor = 'coral' | 'sage' | 'gold' | 'sky';
type SortShape = 'circle' | 'star' | 'heart' | 'square';

interface CraftToken {
  id: number;
  color: SortColor;
  shape: SortShape;
}

const BINS: { color: SortColor; shape: SortShape; label: string; hex: string }[] = [
  { color: 'coral', shape: 'heart', label: 'Coral · Heart', hex: '#D95D39' },
  { color: 'sage', shape: 'circle', label: 'Sage · Circle', hex: '#2F7D6D' },
  { color: 'gold', shape: 'star', label: 'Gold · Star', hex: '#E09F3E' },
  { color: 'sky', shape: 'square', label: 'Sky · Square', hex: '#4C8DAE' },
];

const COLORS: SortColor[] = ['coral', 'sage', 'gold', 'sky'];
const SHAPES: SortShape[] = ['heart', 'circle', 'star', 'square'];

function randomToken(id: number): CraftToken {
  return {
    id,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  };
}

const TokenShapeSvg: React.FC<{ shape: SortShape; fill: string; size?: number }> = ({
  shape,
  fill,
  size = 56,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className="sticker-shadow">
    {shape === 'circle' && (
      <circle cx="32" cy="32" r="24" fill={fill} stroke="#FFFDF8" strokeWidth="4" />
    )}
    {shape === 'square' && (
      <rect x="10" y="10" width="44" height="44" rx="8" fill={fill} stroke="#FFFDF8" strokeWidth="4" />
    )}
    {shape === 'star' && (
      <polygon
        points="32,6 39,23 58,24 43,36 48,55 32,45 16,55 21,36 6,24 25,23"
        fill={fill}
        stroke="#FFFDF8"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    )}
    {shape === 'heart' && (
      <path
        d="M32 54 C14 42 8 28 14 18 C19 10 28 12 32 19 C36 12 45 10 50 18 C56 28 50 42 32 54 Z"
        fill={fill}
        stroke="#FFFDF8"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const ColorShapeSortGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [timeLeft, setTimeLeft] = useState(35);
  const [rule, setRule] = useState<'color' | 'shape'>('color');
  const [queue, setQueue] = useState<CraftToken[]>(() => [
    randomToken(1),
    randomToken(2),
    randomToken(3),
  ]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'good' | 'bad'>('none');
  const [finished, setFinished] = useState(false);

  const nextIdRef = useRef(4);
  const rewardSentRef = useRef(false);
  const latestScoreRef = useRef({ coins: 0, score: 0 });
  latestScoreRef.current = { coins, score };

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setFinished(true);
          if (!rewardSentRef.current) {
            rewardSentRef.current = true;
            sound.playSuccess();
            onComplete(latestScoreRef.current.coins, latestScoreRef.current.score);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished, onComplete]);

  const handleSort = useCallback(
    (binIndex: number) => {
      if (finished) return;
      const bin = BINS[binIndex];
      const current = queue[0];
      if (!bin || !current) return;

      const isMatch = rule === 'color' ? current.color === bin.color : current.shape === bin.shape;

      if (isMatch) {
        const nextStreak = streak + 1;
        const coinGain = nextStreak >= 5 ? 3 : 2;
        const ptsGain = 15 + Math.min(25, nextStreak * 3);
        sound.playPop();
        setStreak(nextStreak);
        setCoins((c) => c + coinGain);
        setScore((s) => s + ptsGain);
        setFeedback('good');

        const nextCount = sortedCount + 1;
        setSortedCount(nextCount);
        if (nextCount % 6 === 0) {
          setRule((r) => (r === 'color' ? 'shape' : 'color'));
        }
      } else {
        sound.playError();
        setStreak(0);
        setFeedback('bad');
      }

      window.setTimeout(() => setFeedback('none'), 160);
      setQueue((prev) => [...prev.slice(1), randomToken(nextIdRef.current++)]);
    },
    [finished, queue, rule, streak, sortedCount],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
        return;
      }
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleSort(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSort, onExit]);

  const handleRestart = () => {
    rewardSentRef.current = false;
    nextIdRef.current = 4;
    setTimeLeft(35);
    setRule('color');
    setQueue([randomToken(1), randomToken(2), randomToken(3)]);
    setScore(0);
    setCoins(0);
    setStreak(0);
    setSortedCount(0);
    setFinished(false);
  };

  const activeToken = queue[0];
  const activeHex = BINS.find((b) => b.color === activeToken?.color)?.hex || '#D95D39';

  return (
    <div className="fixed inset-0 z-50 bg-[#3D312A]/60 flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-xl max-h-[94dvh] overflow-y-auto overscroll-contain craft-scroll paper-card rounded-2xl">
        <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F3EBDD] border-b border-[#D6C4AC] flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#3D312A]">
              Color &amp; Shape Sorting
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6E5D52]">
              Tap a tray or press keys 1–4 · Watch when the rule flips!
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC]">
              {timeLeft}s
            </span>
            <span className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC] flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#D99B26]" />
              {coins}
            </span>
            <button
              type="button"
              onClick={onExit}
              aria-label="Close sorting game"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-[#FBF7F0] space-y-4 sm:space-y-5">
          {/* Active Rule Banner */}
          <div className="flex items-center justify-between paper-card-kraft rounded-xl px-4 py-2.5">
            <div className="text-sm font-bold text-[#3D312A]">
              Active Rule:{' '}
              <span className="text-[#D95D39] underline decoration-2 underline-offset-4">
                {rule === 'color' ? 'Match by COLOR' : 'Match by SHAPE'}
              </span>
            </div>
            <div className="font-mono-num text-xs font-semibold text-[#6E5D52]">
              Streak: {streak}x
            </div>
          </div>

          {/* Active Cutout Token & Preview Queue */}
          <div className="flex flex-col items-center justify-center py-3">
            <div className="text-xs text-[#6E5D52] mb-2">Sort this cutout:</div>
            <div
              className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-transform duration-150 ${
                feedback === 'good'
                  ? 'bg-[#E6F3EE] border-[#2F7D6D] scale-105'
                  : feedback === 'bad'
                    ? 'bg-[#FBE4DD] border-[#D95D39] scale-95'
                    : 'bg-[#FFFDF8] border-[#CEB99C]'
              }`}
            >
              {activeToken && (
                <>
                  <TokenShapeSvg shape={activeToken.shape} fill={activeHex} size={62} />
                  <span className="text-[11px] font-semibold text-[#6E5D52] capitalize mt-1">
                    {activeToken.color} {activeToken.shape}
                  </span>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-[#6E5D52]">
              <span>Next:</span>
              {queue.slice(1).map((t) => {
                const hex = BINS.find((b) => b.color === t.color)?.hex || '#D95D39';
                return (
                  <div
                    key={t.id}
                    className="w-8 h-8 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] flex items-center justify-center opacity-80"
                  >
                    <TokenShapeSvg shape={t.shape} fill={hex} size={22} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Craft Sorting Bins */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BINS.map((bin, idx) => (
              <button
                key={bin.color}
                type="button"
                onClick={() => handleSort(idx)}
                className="min-h-[76px] p-3 rounded-xl bg-[#F3EBDD] hover:bg-[#E8DCC8] active:scale-95 border-2 border-[#CEB99C] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-transform"
              >
                <TokenShapeSvg shape={bin.shape} fill={bin.hex} size={38} />
                <span className="text-xs font-bold text-[#3D312A] whitespace-nowrap">
                  {bin.label}
                </span>
                <span className="font-mono-num text-[10px] text-[#6E5D52] hidden sm:inline">
                  Key {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {finished && (
          <div className="absolute inset-0 bg-[#3D312A]/45 flex items-center justify-center p-6">
            <div className="paper-card rounded-2xl p-6 text-center max-w-sm w-full space-y-4">
              <h4 className="font-display text-2xl font-bold text-[#3D312A]">Time&apos;s Up!</h4>
              <div className="paper-card-kraft rounded-xl p-4 flex justify-around">
                <div>
                  <div className="text-xs text-[#6E5D52]">Score</div>
                  <div className="font-mono-num text-xl font-bold text-[#3D312A]">{score}</div>
                </div>
                <div className="w-px bg-[#D6C4AC]" />
                <div>
                  <div className="text-xs text-[#6E5D52]">Coins Earned</div>
                  <div className="font-mono-num text-xl font-bold text-[#D99B26]">+{coins}</div>
                </div>
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
