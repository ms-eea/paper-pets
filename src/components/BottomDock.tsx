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
  const desktopNavBtn = (
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

  const mobileDrawerTab = (
    drawer: ActiveDrawer,
    shortLabel: string,
    icon: React.ReactNode,
    activeClass = 'bg-[#3D312A] text-[#FBF7F0]',
  ) => {
    const active = activeDrawer === drawer;
    return (
      <button
        type="button"
        onClick={() => onToggleDrawer(active ? 'none' : drawer)}
        aria-pressed={active}
        className={`min-h-[48px] py-1 px-0.5 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer whitespace-nowrap ${
          active ? activeClass : 'text-[#3D312A] active:bg-[#E8DCC8]'
        }`}
      >
        {icon}
        <span className="text-[10px] font-bold leading-none tracking-tight">{shortLabel}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile (< sm): Fitted 7-column single-row thumb dock with zero horizontal scroll */}
      <nav
        aria-label="Mobile pet care and studio controls"
        className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-[#FBF7F0]/95 backdrop-blur-sm border-t-2 border-[#D6C4AC] shadow-[0_-4px_16px_rgba(61,49,42,0.1)] px-1.5 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] grid grid-cols-7 gap-0.5"
      >
        <button
          type="button"
          onClick={onGiveLove}
          className="min-h-[48px] py-1 px-0.5 rounded-xl bg-[#D95D39] active:translate-y-0.5 text-[#FFFDF8] flex flex-col items-center justify-center gap-0.5 shadow-[0_2px_0_#9E3A1D] transition-all cursor-pointer whitespace-nowrap"
        >
          <Heart className="w-[18px] h-[18px] fill-current shrink-0" />
          <span className="text-[10px] font-bold leading-none tracking-tight">Love</span>
        </button>

        {mobileDrawerTab(
          'feed',
          'Feed',
          <Utensils className="w-[18px] h-[18px] shrink-0 text-current" />,
          'bg-[#2F7D6D] text-white',
        )}

        <button
          type="button"
          onClick={onPlayTrick}
          title={`Play ${trickLabel}`}
          className="min-h-[48px] py-1 px-0.5 rounded-xl text-[#3D312A] active:bg-[#E8DCC8] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Wand2 className="w-[18px] h-[18px] text-[#D99B26] shrink-0" />
          <span className="text-[10px] font-bold leading-none tracking-tight">Trick</span>
        </button>

        {mobileDrawerTab('dress', 'Dress', <Shirt className="w-[18px] h-[18px] shrink-0" />)}
        {mobileDrawerTab(
          'decorate',
          'Decor',
          <Paintbrush className="w-[18px] h-[18px] shrink-0" />,
        )}
        {mobileDrawerTab(
          'minigames',
          'Games',
          <Gamepad2 className="w-[18px] h-[18px] shrink-0" />,
        )}
        {mobileDrawerTab('shop', 'Shop', <ShoppingBag className="w-[18px] h-[18px] shrink-0" />)}
      </nav>

      {/* Tablet & Desktop (>= sm): Floating cardstock action dock */}
      <nav
        aria-label="Pet care and craft controls"
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[96vw] paper-card rounded-2xl p-1.5 items-center gap-1.5 overflow-x-auto"
      >
        <button
          type="button"
          onClick={onGiveLove}
          className="h-11 px-4 rounded-xl bg-[#D95D39] hover:bg-[#C54E2B] active:translate-y-0.5 text-[#FFFDF8] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_2px_0_#9E3A1D] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Give Love</span>
        </button>

        {desktopNavBtn(
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

        {desktopNavBtn('dress', 'Dress Up', <Shirt className="w-4 h-4" />)}
        {desktopNavBtn('decorate', 'Decorate', <Paintbrush className="w-4 h-4" />)}
        {desktopNavBtn('minigames', 'Mini-Games', <Gamepad2 className="w-4 h-4 text-[#D95D39]" />)}
        {desktopNavBtn('shop', 'Shop', <ShoppingBag className="w-4 h-4 text-[#D99B26]" />)}
      </nav>
    </>
  );
};
