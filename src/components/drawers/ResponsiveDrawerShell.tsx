import React, { useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  titleLabel: string;
  dockSide?: 'left' | 'right';
  widthClass?: string;
  desktopTopClass?: string;
  mobileCollapsed: boolean;
  onSetMobileCollapsed: (collapsed: boolean) => void;
  children: React.ReactNode;
}

export const ResponsiveDrawerShell: React.FC<Props> = ({
  titleLabel,
  dockSide = 'right',
  widthClass = 'md:w-[368px]',
  desktopTopClass = 'md:top-24',
  mobileCollapsed,
  onSetMobileCollapsed,
  children,
}) => {
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    handled: boolean;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      handled: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragRef.current;
    if (!st || st.pointerId !== e.pointerId || st.handled) return;
    const dy = e.clientY - st.startY;
    if (dy > 24 && !mobileCollapsed) {
      st.handled = true;
      onSetMobileCollapsed(true);
    } else if (dy < -24 && mobileCollapsed) {
      st.handled = true;
      onSetMobileCollapsed(false);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragRef.current;
    if (!st || st.pointerId !== e.pointerId) return;
    const dy = e.clientY - st.startY;
    if (!st.handled && Math.abs(dy) <= 10) {
      onSetMobileCollapsed(!mobileCollapsed);
    }
    dragRef.current = null;
  };

  return (
    <aside
      aria-label={titleLabel}
      className={`fixed inset-x-0 bottom-[calc(62px+env(safe-area-inset-bottom))] sm:bottom-[72px] md:inset-x-auto ${desktopTopClass} md:bottom-24 z-30 ${
        mobileCollapsed
          ? 'h-[15dvh] min-h-[76px] max-h-[108px]'
          : 'h-[45dvh] min-h-[260px] max-h-[48dvh]'
      } md:h-auto md:min-h-0 md:max-h-none ${widthClass} paper-card rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden transition-[height,min-height,max-height] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        dockSide === 'left' ? 'md:left-5' : 'md:right-5'
      }`}
    >
      {/* Mobile (< 768px) Tap / Drag Sheet Handle */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={!mobileCollapsed}
        aria-label={mobileCollapsed ? `Expand ${titleLabel} sheet` : `Collapse ${titleLabel} sheet`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSetMobileCollapsed(!mobileCollapsed);
          }
        }}
        className="md:hidden w-full min-h-[26px] pt-1.5 pb-1 px-4 bg-[#F3EBDD] flex items-center justify-center gap-2 touch-none select-none cursor-grab active:cursor-grabbing shrink-0"
      >
        <span className="w-10 h-1 rounded-full bg-[#C7B091]" />
        <span className="text-[10px] font-bold text-[#6E5D52] flex items-center gap-0.5 whitespace-nowrap">
          {mobileCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Expand</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Drag down to peek</span>
            </>
          )}
        </span>
      </div>

      {children}
    </aside>
  );
};
