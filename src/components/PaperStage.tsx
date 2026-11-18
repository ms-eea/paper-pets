import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, FlipHorizontal, Maximize2, X } from 'lucide-react';
import { DECORATION_CATALOG } from '../data/catalog';
import {
  BackgroundId,
  PetId,
  PetOutfit,
  PlacedDecoration,
  StageParticle,
} from '../types/game';
import { PetWithWardrobe } from './PetWithWardrobe';
import { PaperBackground } from './svg/PaperBackgrounds';
import { PaperDecorationSvg } from './svg/PaperDecorations';

interface Props {
  backgroundId: BackgroundId;
  petId: PetId;
  petName: string;
  stickerMap: Partial<Record<PetId, string>>;
  outfit: PetOutfit;
  decorations: PlacedDecoration[];
  decorateMode: boolean;
  selectedDecoId: string | null;
  onSelectDeco: (id: string | null) => void;
  onUpdateDeco: (id: string, patch: Partial<PlacedDecoration>) => void;
  onRemoveDeco: (id: string) => void;
  onPetTap: () => void;
  petSquishing: boolean;
  petTrickActive: boolean;
  particles: StageParticle[];
  love: number;
  hunger: number;
}

type DragState =
  | {
      mode: 'move';
      id: string;
      startClientX: number;
      startClientY: number;
      origX: number;
      origY: number;
    }
  | {
      mode: 'resize';
      id: string;
      startClientX: number;
      startClientY: number;
      origScale: number;
    };

export const PaperStage: React.FC<Props> = ({
  backgroundId,
  petId,
  petName,
  stickerMap,
  outfit,
  decorations,
  decorateMode,
  selectedDecoId,
  onSelectDeco,
  onUpdateDeco,
  onRemoveDeco,
  onPetTap,
  petSquishing,
  petTrickActive,
  particles,
  love,
  hunger,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [stageWidth, setStageWidth] = useState<number>(1200);

  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!dragState) return;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (dragState.mode === 'move') {
        const dxPct = ((e.clientX - dragState.startClientX) / rect.width) * 100;
        const dyPct = ((e.clientY - dragState.startClientY) / rect.height) * 100;
        onUpdateDeco(dragState.id, {
          x: Math.min(94, Math.max(6, dragState.origX + dxPct)),
          y: Math.min(88, Math.max(12, dragState.origY + dyPct)),
        });
      } else {
        const delta = (e.clientX - dragState.startClientX + (e.clientY - dragState.startClientY)) * 0.0065;
        const nextScale = Math.min(2.2, Math.max(0.35, Math.round((dragState.origScale + delta) * 100) / 100));
        onUpdateDeco(dragState.id, { scale: nextScale });
      }
    };
    const handlePointerUp = () => setDragState(null);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragState, onUpdateDeco]);

  const petSizePx = Math.min(310, Math.max(200, Math.round(stageWidth * 0.24)));

  const renderDecoration = (deco: PlacedDecoration) => {
    const def = DECORATION_CATALOG.find((d) => d.id === deco.itemId);
    const basePx = def?.baseSizePx ?? 100;
    const isSelected = decorateMode && selectedDecoId === deco.instanceId;

    return (
      <div
        key={deco.instanceId}
        onPointerDown={(e) => {
          if (!decorateMode) return;
          e.stopPropagation();
          onSelectDeco(deco.instanceId);
          setDragState({
            mode: 'move',
            id: deco.instanceId,
            startClientX: e.clientX,
            startClientY: e.clientY,
            origX: deco.x,
            origY: deco.y,
          });
        }}
        className={`absolute select-none ${
          decorateMode ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
        style={{
          left: `${deco.x}%`,
          top: `${deco.y}%`,
          width: basePx,
          height: basePx,
          transform: `translate(-50%, -50%) scale(${deco.scale})`,
          zIndex: isSelected ? 40 : deco.zLayer === 'front' ? 25 : 10,
        }}
      >
        <div
          className={`w-full h-full sticker-shadow transition-shadow duration-150 ${
            isSelected ? 'ring-2 ring-[#D95D39] ring-offset-2 ring-offset-transparent rounded-xl' : ''
          }`}
          style={{ transform: deco.flipped ? 'scaleX(-1)' : undefined }}
        >
          <PaperDecorationSvg itemId={deco.itemId} />
        </div>

        {/* Quick X Remove Badge on Item in Decorate Mode */}
        {decorateMode && (
          <button
            type="button"
            title={`Remove ${def?.name || 'decoration'}`}
            aria-label={`Remove ${def?.name || 'decoration'}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveDeco(deco.instanceId);
            }}
            className="absolute -top-2.5 -right-2.5 z-10 w-6 h-6 rounded-full bg-[#FBF7F0] hover:bg-[#D95D39] text-[#B83B1D] hover:text-white border-2 border-[#CEB99C] hover:border-[#FFFDF8] shadow-md flex items-center justify-center cursor-pointer transition-colors"
            style={{ transform: `scale(${1 / deco.scale})` }}
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        )}

        {/* Selected Prop Controls (keeps visual size independent of prop scale) */}
        {isSelected && (
          <>
            {/* Corner Drag Resize Handle */}
            <button
              type="button"
              aria-label="Resize decoration"
              onPointerDown={(e) => {
                e.stopPropagation();
                setDragState({
                  mode: 'resize',
                  id: deco.instanceId,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  origScale: deco.scale,
                });
              }}
              className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-[#D95D39] text-white border-2 border-[#FFFDF8] shadow-md flex items-center justify-center cursor-nwse-resize"
              style={{ transform: `scale(${1 / deco.scale})` }}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Floating Layer & Flip Toolbar */}
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FBF7F0] border border-[#CEB99C] shadow-md whitespace-nowrap"
              style={{ transform: `translateX(-50%) scale(${1 / deco.scale})` }}
            >
              <button
                type="button"
                title={deco.zLayer === 'back' ? 'Bring in front of pet' : 'Send behind pet'}
                onClick={() =>
                  onUpdateDeco(deco.instanceId, {
                    zLayer: deco.zLayer === 'back' ? 'front' : 'back',
                  })
                }
                className="p-1.5 rounded hover:bg-[#E8DCC8] text-[#3D312A] text-xs font-medium flex items-center gap-1"
              >
                {deco.zLayer === 'back' ? (
                  <>
                    <ArrowUp className="w-3.5 h-3.5" /> Front
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-3.5 h-3.5" /> Back
                  </>
                )}
              </button>
              <button
                type="button"
                title="Flip horizontally"
                onClick={() => onUpdateDeco(deco.instanceId, { flipped: !deco.flipped })}
                className="p-1.5 rounded hover:bg-[#E8DCC8] text-[#3D312A]"
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const backDecos = decorations.filter((d) => d.zLayer === 'back');
  const frontDecos = decorations.filter((d) => d.zLayer === 'front');

  const needsCareHint = love < 35 || hunger < 35;

  return (
    <div
      ref={stageRef}
      onPointerDown={() => {
        if (decorateMode) onSelectDeco(null);
      }}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Cut-Paper Background Scene */}
      <div className="absolute inset-0 pointer-events-none">
        <PaperBackground backgroundId={backgroundId} />
      </div>

      {/* Back Depth Decorations */}
      {backDecos.map(renderDecoration)}

      {/* Center Stage Pet Sticker + Wardrobe */}
      <div
        className={`absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 z-20 ${
          decorateMode ? 'pointer-events-none opacity-85' : ''
        }`}
      >
        <div className="relative flex flex-col items-center">
          {needsCareHint && !decorateMode && (
            <div className="mb-1 px-2.5 py-0.5 rounded-md bg-[#FBF7F0]/95 border border-[#D6C4AC] text-xs font-medium text-[#6E5D52] shadow-sm whitespace-nowrap">
              {hunger < 35 ? `${petName} is hungry!` : `${petName} misses hugs!`}
            </div>
          )}
          <PetWithWardrobe
            petId={petId}
            stickerSrc={stickerMap[petId]}
            outfit={outfit}
            sizePx={petSizePx}
            squishing={petSquishing}
            trickActive={petTrickActive}
            onClick={decorateMode ? undefined : onPetTap}
          />
        </div>
      </div>

      {/* Front Depth Decorations */}
      {frontDecos.map(renderDecoration)}

      {/* Particle Bursts (Hearts, Treat Crumbs, Sparkles) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-float-particle font-semibold text-base select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              color: p.color,
            }}
          >
            {p.kind === 'heart' && (
              <svg viewBox="0 0 24 24" className="w-7 h-7 sticker-shadow" fill={p.color}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {p.kind === 'crumb' && (
              <span className="px-2 py-0.5 rounded bg-[#FBF7F0] border border-[#D6C4AC] text-xs text-[#3D312A] shadow-sm">
                {p.label || 'Yum!'}
              </span>
            )}
            {p.kind === 'star' && (
              <svg viewBox="0 0 24 24" className="w-6 h-6 sticker-shadow" fill={p.color}>
                <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
              </svg>
            )}
            {p.kind === 'coin' && (
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6 sticker-shadow">
                  <circle cx="12" cy="12" r="10" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" fill="none" stroke="#B87B14" strokeWidth="1.5" />
                </svg>
                {p.label && (
                  <span className="px-2 py-0.5 rounded bg-[#FBF7F0] border border-[#D6C4AC] font-mono-num text-xs font-bold text-[#2F7D6D] shadow-sm whitespace-nowrap">
                    {p.label}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
