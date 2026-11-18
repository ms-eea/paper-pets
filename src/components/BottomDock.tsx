import React from 'react';
import {
  Gamepad2,
  Heart,
  Paintbrush,
  Shirt,
  ShoppingBag,
  Utensils,
  Wand2,
} from 'lucide-react';
import { ActiveDrawer } from '../types/game';

interface Props {
  activeDrawer: ActiveDrawer;
  trickLabel: string;
  onGiveLove: () => void;
  onPlayTrick: () => void;
  onToggleDrawer: (drawer: ActiveDrawer) => void;
}

export const BottomDock: React.FC<Props> = ({
  activeDrawer,
  trickLabel,
  onGiveLove,
  onPlayTrick,
  onToggleDrawer,
}) => {
  const navBtn = (
    drawer: ActiveDrawer,
    label: string,
    icon: React.ReactNode,
    activeClass = 'bg-[#3D312A] text-[#FBF7F0] border-[#3D312A]',
  ) => {
    const active = activeDrawer === drawer;
    return (
      <button
        type="button"
        onClick={() => onToggleDrawer(active ? 'none' : drawer)}
        className={`h-11 px-3.5 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          active
            ? activeClass
            : 'bg-[#FBF7F0] text-[#3D312A] border-[#CEB99C] hover:bg-[#F3EBDD]'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav
      aria-label="Pet care and craft controls"
      className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[96vw] paper-card rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto"
    >
      {/* Primary Care & Signature Trick Actions */}
      <button
        type="button"
        onClick={onGiveLove}
        className="h-11 px-4 rounded-xl bg-[#D95D39] hover:bg-[#C54E2B] active:translate-y-0.5 text-[#FFFDF8] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_2px_0_#9E3A1D] transition-all cursor-pointer whitespace-nowrap shrink-0"
      >
        <Heart className="w-4 h-4 fill-current" />
        <span>Give Love</span>
      </button>

      {navBtn(
        'feed',
        'Feed',
        <Utensils className="w-4 h-4 text-[#2F7D6D]" />,
        'bg-[#2F7D6D] text-white border-[#2F7D6D]',
      )}

      <button
        type="button"
        onClick={onPlayTrick}
        title={`Play ${trickLabel}`}
        className="h-11 px-3.5 sm:px-4 rounded-xl bg-[#F3EBDD] hover:bg-[#E8DCC8] active:translate-y-0.5 border border-[#CEB99C] text-[#3D312A] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
      >
        <Wand2 className="w-4 h-4 text-[#D99B26]" />
        <span>{trickLabel}</span>
      </button>

      <div className="w-px h-7 bg-[#D6C4AC] mx-0.5 shrink-0" />

      {navBtn('dress', 'Dress Up', <Shirt className="w-4 h-4" />)}
      {navBtn('decorate', 'Decorate', <Paintbrush className="w-4 h-4" />)}
      {navBtn('minigames', 'Mini-Games', <Gamepad2 className="w-4 h-4 text-[#D95D39]" />)}
      {navBtn('shop', 'Shop', <ShoppingBag className="w-4 h-4 text-[#D99B26]" />)}
    </nav>
  );
};
