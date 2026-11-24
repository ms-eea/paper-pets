import React from 'react';
import { PET_BY_ID } from '../data/catalog';
import { ClothingSlot, PetId, PetOutfit } from '../types/game';
import { GarmentSvg } from './svg/GarmentSvg';
import { PetTrickVfx } from './svg/PetTrickVfx';

interface Props {
  petId: PetId;
  stickerSrc?: string;
  outfit: PetOutfit;
  sizePx?: number;
  squishing?: boolean;
  trickActive?: boolean;
  idleBob?: boolean;
  interactiveGarments?: boolean;
  selectedGarmentSlot?: ClothingSlot | null;
  onSelectGarment?: (slot: ClothingSlot) => void;
  onClick?: () => void;
  className?: string;
}

const BACK_LAYER_ORDER: ClothingSlot[] = ['wings'];
const FRONT_LAYER_ORDER: ClothingSlot[] = ['top', 'neckwear', 'eyewear', 'hat', 'handheld'];

const TRICK_CLASS_BY_PET: Record<PetId, string> = {
  rawr: 'animate-trick-rawr',
  scorch: 'animate-trick-scorch',
  trot: 'animate-trick-trot',
  buddybear: 'animate-trick-buddybear',
  catty: 'animate-trick-catty',
  douggie: 'animate-trick-douggie',
};

export const PetWithWardrobe: React.FC<Props> = ({
  petId,
  stickerSrc,
  outfit,
  sizePx = 280,
  squishing = false,
  trickActive = false,
  idleBob = true,
  interactiveGarments = false,
  selectedGarmentSlot = null,
  onSelectGarment,
  onClick,
  className = '',
}) => {
  const pet = PET_BY_ID[petId];
  const imgSrc = stickerSrc || pet.rawAsset;

  const motionClass = trickActive
    ? TRICK_CLASS_BY_PET[petId]
    : squishing
      ? 'animate-happy-squish'
      : idleBob
        ? 'animate-gentle-bob'
        : '';

  const renderSlotLayer = (slot: ClothingSlot) => {
    const equipped = outfit[slot];
    if (!equipped) return null;
    const anchor = pet.anchors[slot];
    if (!anchor) return null;
    const leftPct = anchor.x + (equipped.nudgeX ?? 0);
    const topPct = anchor.y + (equipped.nudgeY ?? 0);
    const slotScale = anchor.scale * (equipped.nudgeScale ?? 1);
    const baseWidthPct =
      slot === 'wings'
        ? 86
        : slot === 'top'
          ? 54
          : slot === 'hat'
            ? 46
            : slot === 'handheld'
              ? 38
              : 44;
    const rot = anchor.rotate ?? 0;
    const isSelected = interactiveGarments && selectedGarmentSlot === slot;

    return (
      <div
        key={slot}
        className="absolute pointer-events-none sticker-shadow transition-[filter] duration-150"
        style={{
          left: `${leftPct}%`,
          top: `${topPct}%`,
          width: `${baseWidthPct}%`,
          aspectRatio: '4 / 3',
          transform: `translate(-50%, -50%) scale(${slotScale}) rotate(${rot}deg)`,
          filter: isSelected
            ? 'drop-shadow(0 0 5px #D95D39) drop-shadow(0 3px 6px rgba(61, 49, 42, 0.28))'
            : undefined,
        }}
      >
        <GarmentSvg
          itemId={equipped.itemId}
          colorHex={equipped.colorHex}
          patternId={equipped.patternId}
          interactive={interactiveGarments}
          onSelect={
            interactiveGarments && onSelectGarment
              ? () => onSelectGarment(slot)
              : undefined
          }
        />
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative select-none ${motionClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Subtle grounded paper contact shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[3%] w-[62%] h-[9%] rounded-full bg-[#3D312A]/20 pointer-events-none"
        style={{ filter: 'blur(4px)' }}
      />

      {/* Back Layer (Wings & Capes Behind Pet) */}
      {BACK_LAYER_ORDER.map(renderSlotLayer)}

      {/* Processed Procreate Animal Sticker */}
      <img
        src={imgSrc}
        alt={`${pet.defaultName} the ${pet.species}`}
        referrerPolicy="no-referrer"
        draggable={false}
        className="w-full h-full object-contain sticker-shadow pointer-events-none"
      />

      {/* Front Layered Wardrobe Overlay (top -> neckwear -> eyewear -> hat -> handheld) */}
      {FRONT_LAYER_ORDER.map(renderSlotLayer)}

      {/* Species Signature Trick Cut-Paper VFX */}
      {trickActive && <PetTrickVfx petId={petId} />}
    </div>
  );
};
