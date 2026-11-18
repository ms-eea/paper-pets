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
    <aside className="fixed right-3 sm:right-5 top-24 bottom-24 z-30 w-[320px] sm:w-[368px] paper-card rounded-2xl flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-[#D6C4AC] bg-[#F3EBDD] flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-[#3D312A]">Mini-Game Table</h3>
          <p className="text-xs text-[#6E5D52]">Play quick games to earn Craft Coins</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mini-games"
          className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto craft-scroll p-4 space-y-3">
        {GAMES.map((g) => (
          <div
            key={g.id}
            className="p-4 rounded-xl bg-[#FBF7F0] border border-[#D6C4AC] space-y-2.5"
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
              className="w-full py-2 px-4 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-white text-xs font-bold shadow-[0_2px_0_#1C4D43] cursor-pointer transition-colors"
            >
              Play {g.title}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
