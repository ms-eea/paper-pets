import React from 'react';
import { Coins, Gamepad2, Grid2X2, Shapes, X } from 'lucide-react';
import { MiniGameId } from '../../types/game';

interface Props {
  highScores: Record<MiniGameId, number>;
  onLaunchGame: (id: MiniGameId) => void;
  onClose: () => void;
}

const GAMES: {
  id: MiniGameId;
  title: string;
  desc: string;
  rewardHint: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'catch_treats',
    title: 'Catch the Treats',
    desc: 'Steer your dressed pet to catch falling cupcakes & stars while dodging boots.',
    rewardHint: 'Up to ~60 Coins/round',
    icon: <Gamepad2 className="w-5 h-5 text-[#D95D39]" />,
  },
  {
    id: 'memory_match',
    title: 'Sticker Memory Match',
    desc: 'Flip die-cut pet cards and match all 8 pairs in as few moves as possible.',
    rewardHint: '25–45 Coins/board',
    icon: <Grid2X2 className="w-5 h-5 text-[#2F7D6D]" />,
  },
  {
    id: 'color_sort',
    title: 'Color & Shape Sorting',
    desc: 'Sort incoming construction-paper shapes into matching craft bins on time.',
    rewardHint: 'Up to ~55 Coins/round',
    icon: <Shapes className="w-5 h-5 text-[#D99B26]" />,
  },
];

export const MiniGamesDrawer: React.FC<Props> = ({ highScores, onLaunchGame, onClose }) => {
  return (
    <aside className="fixed inset-x-0 bottom-[calc(60px+env(safe-area-inset-bottom))] sm:bottom-20 md:inset-x-auto md:right-5 md:top-24 md:bottom-24 z-30 h-[48dvh] max-h-[54dvh] md:h-auto md:max-h-none md:w-[368px] paper-card rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden">
      <div className="md:hidden w-10 h-1 rounded-full bg-[#CEB99C] mx-auto mt-2 mb-0.5 shrink-0" />
      <div className="px-4 py-2.5 md:py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-[#3D312A]">Mini-Game Table</h3>
          <p className="text-xs text-[#6E5D52]">Play quick games to earn Craft Coins</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mini-games"
          className="w-10 h-10 md:w-8 md:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain craft-scroll p-3.5 md:p-4 space-y-3">
        {GAMES.map((g) => (
          <div
            key={g.id}
            className="p-3.5 md:p-4 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#F3EBDD] border border-[#D6C4AC] flex items-center justify-center shrink-0">
                  {g.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#3D312A] leading-tight">{g.title}</h4>
                  <div className="text-[11px] text-[#6E5D52] flex items-center gap-1 mt-0.5">
                    <Coins className="w-3 h-3 text-[#D99B26]" />
                    <span>{g.rewardHint}</span>
                    {highScores[g.id] > 0 && (
                      <>
                        <span>·</span>
                        <span className="font-mono-num">Best: {highScores[g.id]}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6E5D52] leading-relaxed">{g.desc}</p>

            <button
              type="button"
              onClick={() => onLaunchGame(g.id)}
              className="w-full min-h-[44px] py-2 px-4 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-bold shadow-[0_2px_0_#1C4D43] cursor-pointer transition-colors"
            >
              Play {g.title}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
