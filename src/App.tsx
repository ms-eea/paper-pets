import { useCallback, useEffect, useState } from 'react';
import { CalendarCheck, X } from 'lucide-react';
import { BottomDock } from './components/BottomDock';
import { DailyCheckInModal } from './components/DailyCheckInModal';
import { DecorateDrawer } from './components/drawers/DecorateDrawer';
import { DressUpDrawer } from './components/drawers/DressUpDrawer';
import { FeedTray } from './components/drawers/FeedTray';
import { MiniGamesDrawer } from './components/drawers/MiniGamesDrawer';
import { ShopDrawer, ShopTab } from './components/drawers/ShopDrawer';
import { CatchTreatsGame } from './components/minigames/CatchTreatsGame';
import { ColorShapeSortGame } from './components/minigames/ColorShapeSortGame';
import { StickerMemoryGame } from './components/minigames/StickerMemoryGame';
import { PaperStage } from './components/PaperStage';
import { PetAdoptionModal } from './components/PetAdoptionModal';
import { TitleScreen } from './components/TitleScreen';
import { TopHud } from './components/TopHud';
import { PET_BY_ID, TREAT_CATALOG } from './data/catalog';
import { usePaperPetsStore } from './hooks/usePaperPetsStore';
import {
  ActiveDrawer,
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
  const [stickerMap, setStickerMap] = useState<Partial<Record<PetId, string>>>({});
  const [petSquishing, setPetSquishing] = useState(false);
  const [petTrickActive, setPetTrickActive] = useState(false);
  const [particles, setParticles] = useState<StageParticle[]>([]);

  const pauseDecay = screen !== 'PLAYING';
  const {
    data,
    welcomeNotice,
    checkInNotice,
    dismissWelcomeNotice,
    dismissCheckInNotice,
    recordPetInteraction,
    claimDailyCheckIn,
    adoptPet,
    selectPet,
    renamePet,
    selectBackground,
    giveLove,
    feedPet,
    equipGarment,
    updateEquippedStyle,
    addPlacedDecoration,
    updatePlacedDecoration,
    removePlacedDecoration,
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

  // Esc closes contextual drawers while playing
  useEffect(() => {
    if (screen !== 'PLAYING') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDrawer !== 'none') {
        setActiveDrawer('none');
        setSelectedDecoId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, activeDrawer]);

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
    }
  }, []);

  const openShopTab = useCallback((tab: ShopTab) => {
    sound.playClick();
    setShopTab(tab);
    setActiveDrawer('shop');
    setSelectedDecoId(null);
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

  const handleLaunchMiniGame = useCallback((gameId: MiniGameId) => {
    sound.playPop();
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
  const currentRoomDecorations = data.roomDecorations[data.activeBackgroundId] || [];
  const selectedDecoration =
    currentRoomDecorations.find((d) => d.instanceId === selectedDecoId) || null;

  return (
    <main className="relative w-screen h-screen overflow-hidden paper-grain-bg">
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
          <TopHud
            activePetId={data.activePetId}
            petName={activePetName}
            stickerSrc={stickerMap[data.activePetId]}
            love={data.love}
            hunger={data.hunger}
            coins={data.coins}
            activeBackgroundId={data.activeBackgroundId}
            unlockedBackgroundIds={data.unlockedBackgroundIds}
            dailyCheckIn={data.dailyCheckIn}
            muted={data.muted}
            onSelectBackground={selectBackground}
            onOpenPets={() => handleToggleDrawer(activeDrawer === 'pets' ? 'none' : 'pets')}
            onOpenCheckIn={() => handleToggleDrawer(activeDrawer === 'checkin' ? 'none' : 'checkin')}
            onToggleMute={toggleMute}
            onReturnTitle={() => {
              sound.playClick();
              setActiveDrawer('none');
              setScreen('TITLE_MENU');
            }}
          />

          <PaperStage
            backgroundId={data.activeBackgroundId}
            petId={data.activePetId}
            petName={activePetName}
            stickerMap={stickerMap}
            outfit={data.outfits[data.activePetId] || {}}
            decorations={currentRoomDecorations}
            decorateMode={activeDrawer === 'decorate'}
            selectedDecoId={selectedDecoId}
            onSelectDeco={setSelectedDecoId}
            onUpdateDeco={updatePlacedDecoration}
            onRemoveDeco={(id) => {
              removePlacedDecoration(id);
              if (selectedDecoId === id) setSelectedDecoId(null);
            }}
            onPetTap={handleGiveLove}
            petSquishing={petSquishing}
            petTrickActive={petTrickActive}
            particles={particles}
            love={data.love}
            hunger={data.hunger}
          />

          {/* Returning Player Decay Notice */}
          {welcomeNotice && screen === 'PLAYING' && !checkInNotice && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-4 py-2.5 flex items-center gap-3 max-w-md w-[92vw]">
              <div className="flex-1 text-xs text-[#3D312A]">
                <strong>Welcome back!</strong> You were away{' '}
                <span className="font-mono-num">{welcomeNotice.minutesAway}</span> min —{' '}
                {activePetName} is ready for love & snacks.
              </div>
              <button
                type="button"
                onClick={dismissWelcomeNotice}
                aria-label="Dismiss welcome notice"
                className="w-7 h-7 rounded hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Daily Check-In Streak Toast */}
          {checkInNotice && screen === 'PLAYING' && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 paper-card rounded-xl px-4 py-2.5 flex items-center gap-3 max-w-md w-[92vw] border-[#2F7D6D]">
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
          {activeDrawer === 'feed' && (
            <FeedTray
              treatCounts={data.treatCounts}
              onFeed={handleFeed}
              onOpenShop={() => openShopTab('treats')}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'dress' && (
            <DressUpDrawer
              coins={data.coins}
              outfit={data.outfits[data.activePetId] || {}}
              unlockedClothingIds={data.unlockedClothingIds}
              unlockedPatternIds={data.unlockedPatternIds}
              onEquip={equipGarment}
              onBuyAndEquipClothing={buyAndEquipClothing}
              onBuyAndApplyPattern={buyAndApplyPattern}
              onUpdateStyle={updateEquippedStyle}
              onOpenShopTab={(tab) => openShopTab(tab)}
              onClose={() => setActiveDrawer('none')}
            />
          )}

          {activeDrawer === 'decorate' && (
            <DecorateDrawer
              coins={data.coins}
              unlockedDecorationIds={data.unlockedDecorationIds}
              selectedDecoration={selectedDecoration}
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

          <BottomDock
            activeDrawer={activeDrawer}
            trickLabel={activePetDef.trickLabel}
            onGiveLove={handleGiveLove}
            onPlayTrick={() => triggerTrick(true)}
            onToggleDrawer={handleToggleDrawer}
          />
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
