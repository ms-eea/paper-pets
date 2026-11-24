import { useCallback, useEffect, useState } from 'react';
import { CalendarCheck, Camera, Check, X } from 'lucide-react';
import { BottomDock } from './components/BottomDock';
import { DailyCheckInModal } from './components/DailyCheckInModal';
import { DecorateDrawer } from './components/drawers/DecorateDrawer';
import { DressUpDrawer } from './components/drawers/DressUpDrawer';
import { FeedTray } from './components/drawers/FeedTray';
import { MiniGamesDrawer } from './components/drawers/MiniGamesDrawer';
import { ShopDrawer, ShopTab } from './components/drawers/ShopDrawer';
import { EventActionBanner } from './components/EventActionBanner';
import { CatchTreatsGame } from './components/minigames/CatchTreatsGame';
import { ColorShapeSortGame } from './components/minigames/ColorShapeSortGame';
import { StickerMemoryGame } from './components/minigames/StickerMemoryGame';
import { PaperStage } from './components/PaperStage';
import { PetAdoptionModal } from './components/PetAdoptionModal';
import { TitleScreen } from './components/TitleScreen';
import { TopHud } from './components/TopHud';
import { DEFAULT_ROOM_TIME_OF_DAY, PET_BY_ID, TREAT_CATALOG } from './data/catalog';
import { usePaperPetsStore } from './hooks/usePaperPetsStore';
import {
  ActiveDrawer,
  ClothingSlot,
  GameScreenState,
  MiniGameId,
  PetId,
  StageParticle,
} from './types/game';
import { sound } from './utils/sound';
import { preloadAllPetStickers } from './utils/stickerProcessor';

export default function App() {
  const [screen, setScreen] = useState<GameScreenState>('TITLE_MENU');
  const [activeMiniGame, setActiveMiniGame] = useState<MiniGameId | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>('none');
  const [shopTab, setShopTab] = useState<ShopTab>('clothing');
  const [selectedDecoId, setSelectedDecoId] = useState<string | null>(null);
  const [selectedGarmentSlot, setSelectedGarmentSlot] = useState<ClothingSlot | null>(null);
  const [dressFocusRequest, setDressFocusRequest] = useState<{
    slot: ClothingSlot;
    token: number;
  } | null>(null);
  const [stickerMap, setStickerMap] = useState<Partial<Record<PetId, string>>>({});
  const [petSquishing, setPetSquishing] = useState(false);
  const [petTrickActive, setPetTrickActive] = useState(false);
  const [particles, setParticles] = useState<StageParticle[]>([]);
  const [photoMode, setPhotoMode] = useState(false);
  const [showPhotoHint, setShowPhotoHint] = useState(false);
  const [decorateDockSide, setDecorateDockSide] = useState<'left' | 'right'>('right');
  const [decorateMinimized, setDecorateMinimized] = useState(false);
  const [saveToastMessage, setSaveToastMessage] = useState<string | null>(null);

  const pauseDecay = screen !== 'PLAYING';
  const {
    data,
    welcomeNotice,
    checkInNotice,
    hasUnsavedRoomChanges,
    hasUnsavedOutfitChanges,
    dismissWelcomeNotice,
    dismissCheckInNotice,
    recordPetInteraction,
    claimDailyCheckIn,
    adoptPet,
    selectPet,
    renamePet,
    selectBackground,
    setRoomTimeOfDay,
    giveLove,
    feedPet,
    equipGarment,
    clearOutfit,
    updateEquippedStyle,
    saveOutfitNow,
    saveOutfitSlot,
    loadOutfitSlot,
    deleteOutfitSlot,
    addPlacedDecoration,
    updatePlacedDecoration,
    removePlacedDecoration,
    resetActiveRoom,
    saveRoomNow,
    saveRoomLayoutSlot,
    loadRoomLayoutSlot,
    overwriteRoomLayoutSlot,
    deleteRoomLayoutSlot,
    buyShopItem,
    buyAndPlaceDecoration,
    buyAndEquipClothing,
    buyAndApplyPattern,
    awardMiniGameReward,
    toggleMute,
  } = usePaperPetsStore(pauseDecay);

  // Process the 5 uploaded Procreate PNGs into crisp centered die-cut stickers
  useEffect(() => {
    let mounted = true;
    preloadAllPetStickers().then((map) => {
      if (mounted) setStickerMap(map);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Esc exits Photo Mode or closes contextual drawers while playing
  useEffect(() => {
    if (screen !== 'PLAYING') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (photoMode) {
          sound.playClick();
          setPhotoMode(false);
        } else if (activeDrawer !== 'none') {
          setActiveDrawer('none');
          setSelectedDecoId(null);
          setSelectedGarmentSlot(null);
        } else if (selectedDecoId || selectedGarmentSlot) {
          setSelectedDecoId(null);
          setSelectedGarmentSlot(null);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, activeDrawer, photoMode, selectedDecoId, selectedGarmentSlot]);

  // Briefly show and fade out Photo Mode instructions so screenshots stay spotless
  useEffect(() => {
    if (!photoMode) {
      setShowPhotoHint(false);
      return;
    }
    setShowPhotoHint(true);
    const timer = window.setTimeout(() => setShowPhotoHint(false), 2400);
    return () => window.clearTimeout(timer);
  }, [photoMode]);

  const spawnBurst = useCallback((kind: StageParticle['kind'], label?: string) => {
    const colors =
      kind === 'heart'
        ? ['#D95D39', '#C85C7D', '#E89EB0']
        : kind === 'star'
          ? ['#E09F3E', '#F2CC66']
          : ['#2F7D6D', '#E09F3E'];

    const count = kind === 'crumb' ? 2 : 4;
    const created: StageParticle[] = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${i}`,
      x: 44 + Math.random() * 14,
      y: 44 + Math.random() * 10,
      kind,
      label: i === 0 ? label : undefined,
      color: colors[i % colors.length],
    }));

    setParticles((prev) => [...prev.slice(-14), ...created]);
    window.setTimeout(() => {
      const ids = new Set(created.map((c) => c.id));
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 1100);
  }, []);

  const triggerSquish = useCallback(() => {
    setPetSquishing(false);
    window.requestAnimationFrame(() => setPetSquishing(true));
    window.setTimeout(() => setPetSquishing(false), 580);
  }, []);

  const triggerTrick = useCallback(
    (withSound: boolean) => {
      if (withSound) {
        sound.playPetTrick(data.activePetId);
        recordPetInteraction();
      }
      setPetTrickActive(false);
      window.requestAnimationFrame(() => setPetTrickActive(true));
      window.setTimeout(() => setPetTrickActive(false), 1180);
    },
    [data.activePetId, recordPetInteraction],
  );

  // Occasional calm idle signature animation while relaxing on stage
  useEffect(() => {
    if (screen !== 'PLAYING' || activeDrawer !== 'none') return;
    const timer = window.setInterval(() => {
      triggerTrick(false);
    }, 15000);
    return () => window.clearInterval(timer);
  }, [screen, activeDrawer, triggerTrick]);

  // Auto-dismiss daily check-in toast cleanly after 6 seconds
  useEffect(() => {
    if (!checkInNotice) return;
    const timer = window.setTimeout(() => dismissCheckInNotice(), 6000);
    return () => window.clearTimeout(timer);
  }, [checkInNotice, dismissCheckInNotice]);

  // Auto-dismiss room save toast after 3 seconds
  useEffect(() => {
    if (!saveToastMessage) return;
    const timer = window.setTimeout(() => setSaveToastMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [saveToastMessage]);

  const handleSaveRoom = useCallback(() => {
    saveRoomNow();
    setSaveToastMessage('Room decorations saved for your next visit!');
  }, [saveRoomNow]);

  const handleSaveLayoutSlot = useCallback(
    (name?: string) => {
      const slot = saveRoomLayoutSlot(name);
      setSaveToastMessage(`Saved layout "${slot.name}"!`);
    },
    [saveRoomLayoutSlot],
  );

  const handleLoadLayoutSlot = useCallback(
    (slotId: string) => {
      const ok = loadRoomLayoutSlot(slotId);
      if (ok) {
        setSelectedDecoId(null);
        setSaveToastMessage('Loaded saved room layout!');
      }
    },
    [loadRoomLayoutSlot],
  );

  const handleOverwriteLayoutSlot = useCallback(
    (slotId: string) => {
      overwriteRoomLayoutSlot(slotId);
      setSaveToastMessage('Updated saved room layout!');
    },
    [overwriteRoomLayoutSlot],
  );

  const handleSaveOutfit = useCallback(() => {
    saveOutfitNow();
    setSaveToastMessage('Outfit saved for your next visit!');
  }, [saveOutfitNow]);

  const handleSaveOutfitSlot = useCallback(
    (name?: string) => {
      const slot = saveOutfitSlot(name);
      setSaveToastMessage(`Saved outfit "${slot.name}"!`);
    },
    [saveOutfitSlot],
  );

  const handleLoadOutfitSlot = useCallback(
    (slotId: string) => {
      const ok = loadOutfitSlot(slotId);
      if (ok) {
        setSelectedGarmentSlot(null);
        setSaveToastMessage('Loaded saved outfit!');
      }
    },
    [loadOutfitSlot],
  );

  const handleEditGarment = useCallback((slot: ClothingSlot) => {
    sound.playClick();
    setSelectedDecoId(null);
    setSelectedGarmentSlot(slot);
    setActiveDrawer('dress');
    setDressFocusRequest({ slot, token: Date.now() });
  }, []);

  const handleRemoveGarment = useCallback(
    (slot: ClothingSlot) => {
      equipGarment(slot, null);
      setSelectedGarmentSlot((prev) => (prev === slot ? null : prev));
    },
    [equipGarment],
  );

  const handleGiveLove = useCallback(() => {
    giveLove();
    triggerSquish();
    spawnBurst('heart');
  }, [giveLove, triggerSquish, spawnBurst]);

  const handleFeed = useCallback(
    (treatId: string) => {
      const treat = TREAT_CATALOG.find((t) => t.id === treatId);
      const ok = feedPet(treatId);
      if (ok && treat) {
        triggerSquish();
        spawnBurst('crumb', `${treat.name}!`);
      }
    },
    [feedPet, triggerSquish, spawnBurst],
  );

  const handleStartFromTitle = useCallback(() => {
    sound.playPop();
    if (data.hasAdopted) {
      setScreen('PLAYING');
    } else {
      setScreen('ADOPT');
    }
  }, [data.hasAdopted]);

  const handleAdoptConfirm = useCallback(
    (petId: PetId, customName: string) => {
      sound.playSuccess();
      if (data.hasAdopted) {
        selectPet(petId);
        renamePet(petId, customName);
      } else {
        adoptPet(petId, customName);
      }
      setSelectedGarmentSlot(null);
      setSelectedDecoId(null);
      setActiveDrawer('none');
      setScreen('PLAYING');
    },
    [data.hasAdopted, selectPet, renamePet, adoptPet],
  );

  const handleToggleDrawer = useCallback((drawer: ActiveDrawer) => {
    sound.playClick();
    setActiveDrawer(drawer);
    if (drawer !== 'decorate') {
      setSelectedDecoId(null);
    } else {
      setSelectedGarmentSlot(null);
      setDecorateMinimized(false);
    }
    if (drawer !== 'dress' && drawer !== 'none') {
      setSelectedGarmentSlot(null);
    }
  }, []);

  const openShopTab = useCallback((tab: ShopTab) => {
    sound.playClick();
    setShopTab(tab);
    setActiveDrawer('shop');
    setSelectedDecoId(null);
    setSelectedGarmentSlot(null);
  }, []);

  const handlePlaceDecoration = useCallback(
    (itemId: string) => {
      const newId = addPlacedDecoration(itemId);
      setSelectedDecoId(newId);
    },
    [addPlacedDecoration],
  );

  const handleBuyAndPlace = useCallback(
    (itemId: string) => {
      const newId = buyAndPlaceDecoration(itemId);
      if (newId) setSelectedDecoId(newId);
    },
    [buyAndPlaceDecoration],
  );

  const handleEnterPhotoMode = useCallback(() => {
    sound.playClick();
    setActiveDrawer('none');
    setSelectedDecoId(null);
    setSelectedGarmentSlot(null);
    setPhotoMode(true);
  }, []);

  const handleExitPhotoMode = useCallback(() => {
    sound.playClick();
    setPhotoMode(false);
  }, []);

  const handleLaunchMiniGame = useCallback((gameId: MiniGameId) => {
    sound.playPop();
    setPhotoMode(false);
    setSelectedDecoId(null);
    setSelectedGarmentSlot(null);
    setActiveMiniGame(gameId);
    setActiveDrawer('none');
    setScreen('MINIGAME');
  }, []);

  const handleExitMiniGame = useCallback(() => {
    sound.playClick();
    setActiveMiniGame(null);
    setScreen('PLAYING');
  }, []);

  const activePetDef = PET_BY_ID[data.activePetId];
  const activePetName = data.petNames[data.activePetId] || activePetDef.defaultName;
  const activeTimeOfDay =
    data.roomTimeOfDay[data.activeBackgroundId] || DEFAULT_ROOM_TIME_OF_DAY[data.activeBackgroundId];
  const currentRoomDecorations = data.roomDecorations[data.activeBackgroundId] || [];
  const selectedDecoration =
    currentRoomDecorations.find((d) => d.instanceId === selectedDecoId) || null;

  const hasMobileBottomSheet =
    !photoMode &&
    (activeDrawer === 'feed' ||
      activeDrawer === 'dress' ||
      activeDrawer === 'minigames' ||
      activeDrawer === 'shop' ||
      (activeDrawer === 'decorate' && !decorateMinimized));

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden paper-grain-bg">
      {/* TITLE SCREEN */}
      {screen === 'TITLE_MENU' && (
        <TitleScreen
          hasAdopted={data.hasAdopted}
          activePetName={activePetName}
          stickerMap={stickerMap}
          onStart={handleStartFromTitle}
          onChooseNewPet={() => {
            sound.playClick();
            setScreen('ADOPT');
          }}
        />
      )}

      {/* ADOPTION / PET ALBUM SCREEN */}
      {screen === 'ADOPT' && (
        <PetAdoptionModal
          initialPetId={data.activePetId}
          petNames={data.petNames}
          stickerMap={stickerMap}
          canClose={data.hasAdopted}
          onConfirm={handleAdoptConfirm}
          onClose={() => setScreen(data.hasAdopted ? 'PLAYING' : 'TITLE_MENU')}
        />
      )}

      {/* MAIN PAPER STAGE & HUD */}
      {(screen === 'PLAYING' || screen === 'MINIGAME') && (
        <>
          {!photoMode && (
            <TopHud
              activePetId={data.activePetId}
              petName={activePetName}
              stickerSrc={stickerMap[data.activePetId]}
              love={data.love}
              hunger={data.hunger}
              coins={data.coins}
              activeBackgroundId={data.activeBackgroundId}
              timeOfDay={activeTimeOfDay}
              unlockedBackgroundIds={data.unlockedBackgroundIds}
              dailyCheckIn={data.dailyCheckIn}
              muted={data.muted}
              hasUnsavedRoomChanges={hasUnsavedRoomChanges}
              lastRoomSaveAt={data.lastRoomSaveAt}
              onSelectBackground={(bgId) => {
                selectBackground(bgId);
                setSelectedDecoId(null);
              }}
              onChangeTimeOfDay={(time) => setRoomTimeOfDay(data.activeBackgroundId, time)}
              onOpenPets={() => handleToggleDrawer(activeDrawer === 'pets' ? 'none' : 'pets')}
              onOpenCheckIn={() => handleToggleDrawer(activeDrawer === 'checkin' ? 'none' : 'checkin')}
              onSaveRoom={handleSaveRoom}
              onEnterPhotoMode={handleEnterPhotoMode}
              onToggleMute={toggleMute}
              onReturnTitle={() => {
                sound.playClick();
                setPhotoMode(false);
                setActiveDrawer('none');
                setScreen('TITLE_MENU');
              }}
            />
          )}

          <PaperStage
            backgroundId={data.activeBackgroundId}
            timeOfDay={activeTimeOfDay}
            petId={data.activePetId}
            petName={activePetName}
            stickerMap={stickerMap}
            outfit={data.outfits[data.activePetId] || {}}
            decorations={currentRoomDecorations}
            decorateMode={activeDrawer === 'decorate' && !photoMode}
            dressMode={activeDrawer === 'dress' && !photoMode}
            photoMode={photoMode}
            hasMobileBottomSheet={hasMobileBottomSheet}
            selectedDecoId={selectedDecoId}
            onSelectDeco={setSelectedDecoId}
            onUpdateDeco={updatePlacedDecoration}
            onRemoveDeco={(id) => {
              removePlacedDecoration(id);
              if (selectedDecoId === id) setSelectedDecoId(null);
            }}
            selectedGarmentSlot={selectedGarmentSlot}
            onSelectGarment={(slot) => {
              setSelectedGarmentSlot(slot);
              if (slot && activeDrawer === 'dress') {
                setDressFocusRequest({ slot, token: Date.now() });
              }
            }}
            onEditGarment={handleEditGarment}
            onRemoveGarment={handleRemoveGarment}
            onPetTap={handleGiveLove}
            petSquishing={petSquishing}
            petTrickActive={petTrickActive}
            particles={particles}
            love={data.love}
            hunger={data.hunger}
          />

          {/* Clean Photo Mode Tap-to-Exit Layer + Auto-Fading Hint */}
          {photoMode && screen === 'PLAYING' && (
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={handleExitPhotoMode}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleExitPhotoMode();
                }}
                aria-label="Exit Photo Mode and show UI"
                className="fixed inset-0 z-30 cursor-pointer bg-transparent"
              />
              <div
                className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none paper-card rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-semibold text-[#3D312A] max-w-[92vw] transition-opacity duration-500 ${
                  showPhotoHint ? 'opacity-95' : 'opacity-0'
                }`}
              >
                <Camera className="w-4 h-4 text-[#2F7D6D] shrink-0" />
                <span className="truncate">
                  Photo Mode — tap anywhere to show UI
                </span>
              </div>
              <button
                type="button"
                onClick={handleExitPhotoMode}
                className="fixed top-3 right-3 z-40 paper-card rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#3D312A] opacity-0 hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Photo Mode</span>
              </button>
            </>
          )}

          {/* Priority Floating Event Call-to-Action Banner */}
          {!photoMode &&
            screen === 'PLAYING' &&
            !welcomeNotice &&
            !checkInNotice &&
            !saveToastMessage &&
            activeDrawer !== 'pets' &&
            activeDrawer !== 'checkin' && (
              <EventActionBanner
                petName={activePetName}
                love={data.love}
                hunger={data.hunger}
                dailyCheckIn={data.dailyCheckIn}
                hasUnsavedRoomChanges={hasUnsavedRoomChanges}
                hideOnMobile={hasMobileBottomSheet}
                onClaimCheckIn={() => {
                  const grant = claimDailyCheckIn();
                  if (grant) {
                    triggerSquish();
                    spawnBurst('coin', `+${grant.coinsAwarded} Coins`);
                  }
                }}
                onOpenCheckInModal={() => handleToggleDrawer('checkin')}
                onOpenFeed={() => handleToggleDrawer('feed')}
                onGiveLove={handleGiveLove}
                onSaveRoom={handleSaveRoom}
              />
            )}

          {/* Returning Player Decay Notice */}
          {!photoMode && welcomeNotice && screen === 'PLAYING' && !checkInNotice && (
            <div className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-3.5 py-2.5 flex items-center gap-3 max-w-md w-[94vw]">
              <div className="flex-1 text-xs text-[#3D312A]">
                <strong>Welcome back!</strong> You were away{' '}
                <span className="font-mono-num">{welcomeNotice.minutesAway}</span> min —{' '}
                {activePetName} is ready for love & snacks.
              </div>
              <button
                type="button"
                onClick={dismissWelcomeNotice}
                aria-label="Dismiss welcome notice"
                className="w-9 h-9 md:w-7 md:h-7 rounded hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Daily Check-In Streak Toast */}
          {!photoMode && checkInNotice && screen === 'PLAYING' && (
            <div className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-3.5 py-2.5 flex items-center gap-3 max-w-md w-[94vw] border-[#2F7D6D]">
              <CalendarCheck className="w-4 h-4 text-[#2F7D6D] shrink-0" />
              <div className="flex-1 text-xs text-[#3D312A]">
                <strong>
                  Day <span className="font-mono-num">{checkInNotice.streak}</span> Check-In!
                </strong>{' '}
                Earned{' '}
                <span className="font-mono-num font-bold text-[#2F7D6D]">
                  +{checkInNotice.coinsAwarded} Coins
                </span>{' '}
                for caring for {activePetName}.
              </div>
              <button
                type="button"
                onClick={() => {
                  dismissCheckInNotice();
                  handleToggleDrawer('checkin');
                }}
                className="text-xs font-bold text-[#D95D39] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Stamps
              </button>
              <button
                type="button"
                onClick={dismissCheckInNotice}
                aria-label="Dismiss check-in notice"
                className="w-7 h-7 rounded hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Contextual Drawers */}
          {!photoMode && activeDrawer === 'feed' && (
            <FeedTray
              treatCounts={data.treatCounts}
              onFeed={handleFeed}
              onOpenShop={() => openShopTab('treats')}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'dress' && (
            <DressUpDrawer
              key={data.activePetId}
              petId={data.activePetId}
              petName={activePetName}
              coins={data.coins}
              outfit={data.outfits[data.activePetId] || {}}
              lastClothingSlot={data.lastClothingSlots?.[data.activePetId]}
              focusRequest={dressFocusRequest}
              hasUnsavedOutfitChanges={hasUnsavedOutfitChanges}
              lastOutfitSaveAt={data.lastOutfitSaveAt}
              savedOutfitSlots={data.savedOutfitSlots || []}
              unlockedClothingIds={data.unlockedClothingIds}
              unlockedPatternIds={data.unlockedPatternIds}
              onEquip={equipGarment}
              onClearOutfit={() => {
                clearOutfit();
                setSelectedGarmentSlot(null);
              }}
              onSaveOutfitNow={handleSaveOutfit}
              onSaveOutfitSlot={handleSaveOutfitSlot}
              onLoadOutfitSlot={handleLoadOutfitSlot}
              onDeleteOutfitSlot={deleteOutfitSlot}
              onBuyAndEquipClothing={buyAndEquipClothing}
              onBuyAndApplyPattern={buyAndApplyPattern}
              onUpdateStyle={updateEquippedStyle}
              onOpenShopTab={(tab) => openShopTab(tab)}
              onClose={() => {
                setActiveDrawer('none');
                setSelectedGarmentSlot(null);
              }}
            />
          )}

          {/* Room Save Confirmation Toast */}
          {!photoMode && saveToastMessage && screen === 'PLAYING' && (
            <div className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-4 py-2 flex items-center gap-2 border-[#2F7D6D] bg-[#FBF7F0] max-w-[92vw]">
              <Check className="w-4 h-4 text-[#2F7D6D] shrink-0" />
              <span className="text-xs font-semibold text-[#3D312A] truncate">
                {saveToastMessage}
              </span>
            </div>
          )}

          {activeDrawer === 'decorate' && (
            <DecorateDrawer
              coins={data.coins}
              unlockedDecorationIds={data.unlockedDecorationIds}
              selectedDecoration={selectedDecoration}
              activeBackgroundId={data.activeBackgroundId}
              timeOfDay={activeTimeOfDay}
              hasUnsavedRoomChanges={hasUnsavedRoomChanges}
              lastRoomSaveAt={data.lastRoomSaveAt}
              savedRoomSlots={data.savedRoomSlots}
              dockSide={decorateDockSide}
              minimized={decorateMinimized}
              onToggleDockSide={() => {
                sound.playClick();
                setDecorateDockSide((side) => (side === 'right' ? 'left' : 'right'));
              }}
              onToggleMinimized={() => {
                sound.playClick();
                setDecorateMinimized((m) => !m);
              }}
              onChangeTimeOfDay={(time) => setRoomTimeOfDay(data.activeBackgroundId, time)}
              onResetRoom={() => {
                resetActiveRoom();
                setSelectedDecoId(null);
                setSaveToastMessage('Room reset to starter layout!');
              }}
              onSaveRoom={handleSaveRoom}
              onSaveLayoutSlot={handleSaveLayoutSlot}
              onLoadLayoutSlot={handleLoadLayoutSlot}
              onOverwriteLayoutSlot={handleOverwriteLayoutSlot}
              onDeleteLayoutSlot={deleteRoomLayoutSlot}
              onAddDecoration={handlePlaceDecoration}
              onBuyAndPlace={handleBuyAndPlace}
              onUpdateSelected={(patch) => {
                if (selectedDecoId) updatePlacedDecoration(selectedDecoId, patch);
              }}
              onRemoveSelected={() => {
                if (selectedDecoId) {
                  removePlacedDecoration(selectedDecoId);
                  setSelectedDecoId(null);
                }
              }}
              onOpenPropsShop={() => openShopTab('decorations')}
              onClose={() => {
                setActiveDrawer('none');
                setSelectedDecoId(null);
                setDecorateMinimized(false);
              }}
            />
          )}

          {activeDrawer === 'minigames' && (
            <MiniGamesDrawer
              highScores={data.highScores}
              onLaunchGame={handleLaunchMiniGame}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'shop' && (
            <ShopDrawer
              initialTab={shopTab}
              coins={data.coins}
              unlockedClothingIds={data.unlockedClothingIds}
              unlockedPatternIds={data.unlockedPatternIds}
              unlockedDecorationIds={data.unlockedDecorationIds}
              unlockedBackgroundIds={data.unlockedBackgroundIds}
              treatCounts={data.treatCounts}
              onBuy={buyShopItem}
              onPlaceDecoration={(itemId) => {
                const newId = addPlacedDecoration(itemId);
                setActiveDrawer('decorate');
                setSelectedDecoId(newId);
              }}
              onVisitBackground={(bgId) => {
                selectBackground(bgId);
                setActiveDrawer('none');
              }}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'pets' && (
            <PetAdoptionModal
              initialPetId={data.activePetId}
              petNames={data.petNames}
              stickerMap={stickerMap}
              canClose={true}
              onConfirm={(petId, customName) => {
                selectPet(petId);
                renamePet(petId, customName);
                setSelectedGarmentSlot(null);
                setActiveDrawer('none');
              }}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'checkin' && (
            <DailyCheckInModal
              dailyCheckIn={data.dailyCheckIn}
              activePetId={data.activePetId}
              petName={activePetName}
              stickerSrc={stickerMap[data.activePetId]}
              onClaim={() => {
                const grant = claimDailyCheckIn();
                if (grant) {
                  triggerSquish();
                  spawnBurst('coin', `+${grant.coinsAwarded} Coins`);
                }
              }}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {!photoMode && (
            <BottomDock
              activeDrawer={activeDrawer}
              trickLabel={activePetDef.trickLabel}
              onGiveLove={handleGiveLove}
              onPlayTrick={() => triggerTrick(true)}
              onToggleDrawer={handleToggleDrawer}
            />
          )}
        </>
      )}

      {/* ACTIVE MINI-GAME ARENA */}
      {screen === 'MINIGAME' && activeMiniGame === 'catch_treats' && (
        <CatchTreatsGame
          petId={data.activePetId}
          petName={activePetName}
          stickerSrc={stickerMap[data.activePetId]}
          onComplete={(coins, score) => awardMiniGameReward('catch_treats', coins, score)}
          onExit={handleExitMiniGame}
        />
      )}

      {screen === 'MINIGAME' && activeMiniGame === 'memory_match' && (
        <StickerMemoryGame
          stickerMap={stickerMap}
          onComplete={(coins, score) => awardMiniGameReward('memory_match', coins, score)}
          onExit={handleExitMiniGame}
        />
      )}

      {screen === 'MINIGAME' && activeMiniGame === 'color_sort' && (
        <ColorShapeSortGame
          onComplete={(coins, score) => awardMiniGameReward('color_sort', coins, score)}
          onExit={handleExitMiniGame}
        />
      )}
    </main>
  );
}
