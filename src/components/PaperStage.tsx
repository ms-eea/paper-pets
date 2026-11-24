import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  FlipHorizontal,
  Maximize2,
  Sliders,
  Trash2,
  X,
} from 'lucide-react';
import { CLOTHING_CATALOG, DECORATION_CATALOG } from '../data/catalog';
import {
  BackgroundId,
  ClothingSlot,
  PetId,
  PetOutfit,
  PlacedDecoration,
  StageParticle,
  TimeOfDay,
} from '../types/game';
import { PetWithWardrobe } from './PetWithWardrobe';
import { GarmentSvg } from './svg/GarmentSvg';
import { PaperBackground } from './svg/PaperBackgrounds';
import { PaperDecorationSvg } from './svg/PaperDecorations';

interface Props {
  backgroundId: BackgroundId;
  timeOfDay: TimeOfDay;
  petId: PetId;
  petName: string;
  stickerMap: Partial<Record<PetId, string>>;
  outfit: PetOutfit;
  decorations: PlacedDecoration[];
  decorateMode: boolean;
  dressMode?: boolean;
  photoMode?: boolean;
  hasMobileBottomSheet?: boolean;
  selectedDecoId: string | null;
  onSelectDeco: (id: string | null) => void;
  onUpdateDeco: (id: string, patch: Partial<PlacedDecoration>) => void;
  onRemoveDeco: (id: string) => void;
  selectedGarmentSlot?: ClothingSlot | null;
  onSelectGarment?: (slot: ClothingSlot | null) => void;
  onEditGarment?: (slot: ClothingSlot) => void;
  onRemoveGarment?: (slot: ClothingSlot) => void;
  onPetTap: () => void;
  petSquishing: boolean;
  petTrickActive: boolean;
  particles: StageParticle[];
  love: number;
  hunger: number;
}

const SLOT_LABELS: Record<ClothingSlot, string> = {
  hat: 'Hat',
  eyewear: 'Eyewear',
  neckwear: 'Neckwear',
  top: 'Top',
};

type DragState =
  | {
      mode: 'move';
      id: string;
      pointerId: number;
      startClientX: number;
      startClientY: number;
      origX: number;
      origY: number;
    }
  | {
      mode: 'resize';
      id: string;
      pointerId: number;
      startClientX: number;
      startClientY: number;
      origScale: number;
    };

export const PaperStage: React.FC<Props> = ({
  backgroundId,
  timeOfDay,
  petId,
  petName,
  stickerMap,
  outfit,
  decorations,
  decorateMode,
  dressMode = false,
  photoMode = false,
  hasMobileBottomSheet = false,
  selectedDecoId,
  onSelectDeco,
  onUpdateDeco,
  onRemoveDeco,
  selectedGarmentSlot = null,
  onSelectGarment,
  onEditGarment,
  onRemoveGarment,
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
      if (e.pointerId !== dragState.pointerId) return;
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (dragState.mode === 'move') {
        const dxPct = ((e.clientX - dragState.startClientX) / rect.width) * 100;
        const dyPct = ((e.clientY - dragState.startClientY) / rect.height) * 100;
        onUpdateDeco(dragState.id, {
          x: Math.min(97, Math.max(3, dragState.origX + dxPct)),
          y: Math.min(89, Math.max(15, dragState.origY + dyPct)),
        });
      } else {
        const delta =
          (e.clientX - dragState.startClientX + (e.clientY - dragState.startClientY)) * 0.0065;
        const nextScale = Math.min(
          2.2,
          Math.max(0.35, Math.round((dragState.origScale + delta) * 100) / 100),
        );
        onUpdateDeco(dragState.id, { scale: nextScale });
      }
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId === dragState.pointerId) {
        setDragState(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, onUpdateDeco]);

  const isCompactPhone = stageWidth < 640;
  const isTabletOrBelow = stageWidth < 768;

  const petSizePx = isCompactPhone
    ? hasMobileBottomSheet
      ? Math.min(168, Math.max(124, Math.round(stageWidth * 0.34)))
      : Math.min(208, Math.max(148, Math.round(stageWidth * 0.42)))
    : Math.min(310, Math.max(200, Math.round(stageWidth * 0.24)));

  const propViewportFactor = isCompactPhone
    ? Math.max(0.64, Math.min(0.88, stageWidth / 520))
    : 1;

  const renderDecoration = (deco: PlacedDecoration) => {
    const def = DECORATION_CATALOG.find((d) => d.id === deco.itemId);
    const basePx = Math.round((def?.baseSizePx ?? 100) * propViewportFactor);
    const canInteractAnytime = !photoMode && !dressMode;
    const isDraggingThis = dragState?.id === deco.instanceId;
    const isSelected = canInteractAnytime && selectedDecoId === deco.instanceId;

    return (
      <div
        key={deco.instanceId}
        onPointerDown={(e) => {
          if (!canInteractAnytime) return;
          e.stopPropagation();
          onSelectGarment?.(null);
          onSelectDeco(deco.instanceId);
          setDragState({
            mode: 'move',
            id: deco.instanceId,
            pointerId: e.pointerId,
            startClientX: e.clientX,
            startClientY: e.clientY,
            origX: deco.x,
            origY: deco.y,
          });
        }}
        title={
          canInteractAnytime && !decorateMode
            ? `Click ${def?.name || 'decoration'} to remove or drag to move`
            : undefined
        }
        className={`absolute select-none touch-none ${
          canInteractAnytime ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
        style={{
          left: `${deco.x}%`,
          top: `${deco.y}%`,
          width: basePx,
          height: basePx,
          transform: `translate(-50%, -50%) scale(${deco.scale})`,
          zIndex: isSelected || isDraggingThis ? 45 : deco.zLayer === 'front' ? 25 : 10,
        }}
      >
        <div
          className={`w-full h-full sticker-shadow transition-shadow duration-150 rounded-xl ${
            isSelected
              ? 'ring-2 ring-[#D95D39] ring-offset-2 ring-offset-transparent'
              : canInteractAnytime && !decorateMode
                ? 'hover:ring-2 hover:ring-[#D95D39]/40'
                : ''
          }`}
          style={{ transform: deco.flipped ? 'scaleX(-1)' : undefined }}
        >
          <PaperDecorationSvg itemId={deco.itemId} />
        </div>

        {/* Corner X Remove Button when clicked/selected (works in normal play and Decorate mode) */}
        {isSelected && (
          <button
            type="button"
            title={`Remove ${def?.name || 'decoration'}`}
            aria-label={`Remove ${def?.name || 'decoration'}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveDeco(deco.instanceId);
            }}
            className="absolute -top-3.5 -right-3.5 md:-top-2.5 md:-right-2.5 z-10 w-8 h-8 md:w-6 md:h-6 rounded-full bg-[#FBF7F0] hover:bg-[#D95D39] text-[#B83B1D] hover:text-white border-2 border-[#CEB99C] hover:border-[#FFFDF8] shadow-md flex items-center justify-center cursor-pointer transition-colors"
            style={{ transform: `scale(${1 / deco.scale})` }}
          >
            <X className="w-4 h-4 md:w-3.5 md:h-3.5" strokeWidth={2.5} />
          </button>
        )}

        {/* Decorate-mode Resize, Depth & Flip Controls */}
        {isSelected && decorateMode && (
          <>
            <button
              type="button"
              aria-label="Resize decoration"
              onPointerDown={(e) => {
                e.stopPropagation();
                setDragState({
                  mode: 'resize',
                  id: deco.instanceId,
                  pointerId: e.pointerId,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  origScale: deco.scale,
                });
              }}
              className="absolute -bottom-4 -right-4 md:-bottom-3 md:-right-3 w-9 h-9 md:w-7 md:h-7 rounded-full bg-[#D95D39] text-white border-2 border-[#FFFDF8] shadow-md flex items-center justify-center cursor-nwse-resize touch-none"
              style={{ transform: `scale(${1 / deco.scale})` }}
            >
              <Maximize2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </button>

            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute -top-12 md:-top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-xl bg-[#FBF7F0] border border-[#CEB99C] shadow-md whitespace-nowrap"
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
                className="min-h-[34px] md:min-h-0 px-2 py-1.5 rounded-lg hover:bg-[#E8DCC8] text-[#3D312A] text-xs font-semibold flex items-center gap-1 cursor-pointer"
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
                aria-label="Flip horizontally"
                title="Flip horizontally"
                onClick={() => onUpdateDeco(deco.instanceId, { flipped: !deco.flipped })}
                className="min-h-[34px] min-w-[34px] md:min-h-0 md:min-w-0 p-1.5 rounded-lg hover:bg-[#E8DCC8] text-[#3D312A] flex items-center justify-center cursor-pointer"
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

  const petTopClass =
    isTabletOrBelow && hasMobileBottomSheet
      ? 'top-[32%]'
      : isTabletOrBelow
        ? 'top-[52%]'
        : 'top-[56%]';

  const selectedGarment =
    selectedGarmentSlot && !decorateMode && !photoMode
      ? outfit[selectedGarmentSlot] || null
      : null;
  const selectedGarmentDef = selectedGarment
    ? CLOTHING_CATALOG.find((c) => c.id === selectedGarment.itemId) || null
    : null;

  return (
    <div
      ref={stageRef}
      onPointerDown={() => {
        if (!photoMode) {
          onSelectDeco(null);
          onSelectGarment?.(null);
        }
      }}
      className="relative w-full h-full overflow-hidden touch-pan-x touch-pan-y"
    >
      {/* Cut-Paper Background Scene */}
      <div className="absolute inset-0 pointer-events-none">
        <PaperBackground backgroundId={backgroundId} timeOfDay={timeOfDay} />
      </div>

      {/* Back Depth Decorations */}
      {backDecos.map(renderDecoration)}

      {/* Center Stage Pet Sticker + Wardrobe (nudges up on mobile when half-screen sheet is open) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-200 ${petTopClass} ${
          decorateMode
            ? 'z-20 pointer-events-none opacity-80'
            : selectedGarment
              ? 'z-30'
              : 'z-20'
        }`}
      >
        <div className="relative flex flex-col items-center">
          {needsCareHint && !decorateMode && !photoMode && !selectedGarment && (
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
            interactiveGarments={!photoMode && !decorateMode}
            selectedGarmentSlot={!photoMode && !decorateMode ? selectedGarmentSlot : null}
            onSelectGarment={(slot) => {
              onSelectDeco(null);
              onSelectGarment?.(slot);
            }}
            onClick={decorateMode || photoMode ? undefined : onPetTap}
          />

          {/* Floating Garment Quick-Action Popover */}
          {selectedGarment && selectedGarmentSlot && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-2.5 py-2 flex items-center gap-2 shadow-lg border-[#CEB99C] bg-[#FBF7F0] max-w-[92vw]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F3EBDD] border border-[#E8DCC8] flex items-center justify-center shrink-0">
                <GarmentSvg
                  itemId={selectedGarment.itemId}
                  colorHex={selectedGarment.colorHex}
                  patternId={selectedGarment.patternId}
                  className="w-7 h-7"
                />
              </div>
              <div className="min-w-0 max-w-[116px]">
                <div className="text-xs font-bold text-[#3D312A] truncate">
                  {selectedGarmentDef?.name || 'Outfit Piece'}
                </div>
                <div className="text-[10px] font-medium text-[#6E5D52] truncate">
                  {SLOT_LABELS[selectedGarmentSlot]}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onEditGarment?.(selectedGarmentSlot)}
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#D95D39] hover:bg-[#C24D2B] text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 shrink-0" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveGarment?.(selectedGarmentSlot)}
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#FCE6E0] hover:bg-[#F7CFC4] border border-[#E5ACA0] text-[#B83B1D] text-xs font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Take Off</span>
                </button>
                <button
                  type="button"
                  aria-label="Close clothing actions"
                  onClick={() => onSelectGarment?.(null)}
                  className="w-8 h-8 rounded-lg hover:bg-[#E8DCC8] text-[#6E5D52] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Front Depth Decorations */}
      {frontDecos.map(renderDecoration)}

      {/* Particle Bursts */}
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
