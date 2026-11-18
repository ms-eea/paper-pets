import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { PET_CATALOG } from '../data/catalog';
import { PetId } from '../types/game';

interface Props {
  initialPetId: PetId;
  petNames: Record<PetId, string>;
  stickerMap: Partial<Record<PetId, string>>;
  canClose: boolean;
  onConfirm: (petId: PetId, customName: string) => void;
  onRenameOnly?: (petId: PetId, customName: string) => void;
  onClose?: () => void;
}

export const PetAdoptionModal: React.FC<Props> = ({
  initialPetId,
  petNames,
  stickerMap,
  canClose,
  onConfirm,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<PetId>(initialPetId);
  const [nameInput, setNameInput] = useState<string>(petNames[initialPetId] || 'Rawr');

  const selectedPet = PET_CATALOG.find((p) => p.id === selectedId) || PET_CATALOG[0];

  const handlePick = (id: PetId) => {
    setSelectedId(id);
    setNameInput(petNames[id] || PET_CATALOG.find((p) => p.id === id)?.defaultName || '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D312A]/45">
      <div className="relative w-full max-w-3xl paper-card rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto craft-scroll">
        <div className="washi-tape w-24 h-4 -rotate-3 absolute -top-2 left-10 rounded-sm" />

        {canClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close pet selector"
            className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A]"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3D312A]">
            {canClose ? 'Your Sticker Pet Album' : 'Adopt Your First Paper Pet'}
          </h2>
          <p className="text-sm text-[#6E5D52] mt-1">
            All six pet stickers are yours to visit, dress up, and care for anytime.
          </p>
        </div>

        {/* 6 Pet Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {PET_CATALOG.map((pet) => {
            const active = pet.id === selectedId;
            return (
              <button
                key={pet.id}
                type="button"
                onClick={() => handlePick(pet.id)}
                className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#F3EBDD] border-[#D95D39] shadow-[0_3px_0_#D95D39]'
                    : 'bg-[#FBF7F0] border-[#D6C4AC] hover:bg-[#F3EBDD]'
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D95D39] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-2">
                  <img
                    src={stickerMap[pet.id] || pet.rawAsset}
                    alt={pet.defaultName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain sticker-shadow"
                  />
                </div>
                <span className="text-sm font-bold text-[#3D312A] whitespace-nowrap">
                  {petNames[pet.id] || pet.defaultName}
                </span>
                <span className="text-[11px] text-[#6E5D52] whitespace-nowrap">{pet.species}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pet Detail & Name Input */}
        <div className="paper-card-kraft rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs font-semibold text-[#6E5D52] mb-1">
              {selectedPet.species} · {selectedPet.personality}
            </div>
            <label className="block text-xs font-bold text-[#3D312A] mb-1" htmlFor="pet-name-input">
              Nickname
            </label>
            <input
              id="pet-name-input"
              type="text"
              maxLength={18}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={selectedPet.defaultName}
              className="w-full sm:max-w-xs px-3 py-2 rounded-lg bg-[#FBF7F0] border border-[#C9B396] text-sm font-semibold text-[#3D312A] focus:outline-none focus:border-[#D95D39]"
            />
          </div>

          <button
            type="button"
            onClick={() => onConfirm(selectedId, nameInput)}
            className="px-6 py-3 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-[#FFFDF8] font-bold text-sm shadow-[0_3px_0_#1C4D43] cursor-pointer whitespace-nowrap shrink-0"
          >
            {canClose ? `Play with ${nameInput.trim() || selectedPet.defaultName}` : 'Start Playing'}
          </button>
        </div>
      </div>
    </div>
  );
};
