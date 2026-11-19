import { useCallback, useEffect, useState } from 'react';
import {
  BACKGROUND_CATALOG,
  CLOTHING_CATALOG,
  createInitialSaveData,
  DECORATION_CATALOG,
  DEFAULT_ROOM_DECORATIONS,
  DEFAULT_ROOM_TIME_OF_DAY,
  getDailyRewardForStreak,
  getLocalDateKey,
  getPreviousDateKey,
  PATTERN_CATALOG,
  SAVE_STORAGE_KEY,
  TREAT_CATALOG,
} from '../data/catalog';
import {
  BackgroundId,
  ClothingSlot,
  DailyCheckInState,
  EquippedGarment,
  MiniGameId,
  PaperPetsSaveData,
  PatternId,
  PetId,
  PlacedDecoration,
  SavedRoomLayoutSlot,
  TimeOfDay,
} from '../types/game';
import { sound } from '../utils/sound';

// Gentle decay: ~0.45 points per minute (~27 points per hour), floored at 10
const DECAY_PER_MS = 0.45 / 60000;
const MIN_METER = 10;

export interface AwaySummary {
  minutesAway: number;
  loveDrop: number;
  hungerDrop: number;
}

export interface CheckInRewardNotice {
  streak: number;
  coinsAwarded: number;
}

function previewDailyCheckInGrant(current: DailyCheckInState): CheckInRewardNotice | null {
  const todayKey = getLocalDateKey();
  if (current.lastCheckInDate === todayKey) return null;
  const yesterdayKey = getPreviousDateKey(todayKey);
  const nextStreak = current.lastCheckInDate === yesterdayKey ? current.streak + 1 : 1;
  return {
    streak: nextStreak,
    coinsAwarded: getDailyRewardForStreak(nextStreak),
  };
}

function applyDailyCheckInToSave(prev: PaperPetsSaveData): PaperPetsSaveData {
  const todayKey = getLocalDateKey();
  if (prev.dailyCheckIn.lastCheckInDate === todayKey) return prev;
  const yesterdayKey = getPreviousDateKey(todayKey);
  const nextStreak =
    prev.dailyCheckIn.lastCheckInDate === yesterdayKey ? prev.dailyCheckIn.streak + 1 : 1;
  const coinsAwarded = getDailyRewardForStreak(nextStreak);
  return {
    ...prev,
    coins: prev.coins + coinsAwarded,
    dailyCheckIn: {
      streak: nextStreak,
      bestStreak: Math.max(prev.dailyCheckIn.bestStreak, nextStreak),
      totalCheckIns: prev.dailyCheckIn.totalCheckIns + 1,
      lastCheckInDate: todayKey,
    },
  };
}

function loadAndNormalizeSave(): { save: PaperPetsSaveData; awaySummary: AwaySummary | null } {
  const initial = createInitialSaveData();
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return { save: initial, awaySummary: null };
    const parsed = JSON.parse(raw) as Partial<PaperPetsSaveData>;
    const rawCheckIn = parsed.dailyCheckIn;
    const todayKey = getLocalDateKey();
    const yesterdayKey = getPreviousDateKey(todayKey);
    const hydratedCheckIn: DailyCheckInState = {
      ...initial.dailyCheckIn,
      ...(rawCheckIn || {}),
    };
    if (
      hydratedCheckIn.lastCheckInDate !== todayKey &&
      hydratedCheckIn.lastCheckInDate !== yesterdayKey
    ) {
      hydratedCheckIn.streak = 0;
    }

    const rawRoomDecorations = {
      ...initial.roomDecorations,
      ...(parsed.roomDecorations || {}),
    };

    // Unstick legacy Outdoor Meadow starter bunting (init_m_2) and keep starter sky props clear of TopHud
    if (Array.isArray(rawRoomDecorations.meadow)) {
      rawRoomDecorations.meadow = rawRoomDecorations.meadow
        .filter((d) => !(d.instanceId === 'init_m_2' && d.itemId === 'deco_bunting'))
        .map((d) => {
          if (d.instanceId === 'init_m_sun' && d.y < 24) {
            return { ...d, x: Math.max(20, d.x), y: 26 };
          }
          if (d.instanceId === 'init_m_cloud' && d.y < 23) {
            return { ...d, y: 24 };
          }
          return d;
        });
    }

    const merged: PaperPetsSaveData = {
      ...initial,
      ...parsed,
      petNames: { ...initial.petNames, ...(parsed.petNames || {}) },
      outfits: { ...initial.outfits, ...(parsed.outfits || {}) },
      treatCounts: { ...initial.treatCounts, ...(parsed.treatCounts || {}) },
      roomDecorations: rawRoomDecorations,
      roomTimeOfDay: {
        ...DEFAULT_ROOM_TIME_OF_DAY,
        ...(parsed.roomTimeOfDay || {}),
      },
      savedRoomSlots: Array.isArray(parsed.savedRoomSlots) ? parsed.savedRoomSlots : [],
      lastRoomSaveAt: parsed.lastRoomSaveAt || parsed.lastSavedAt || initial.lastRoomSaveAt,
      highScores: { ...initial.highScores, ...(parsed.highScores || {}) },
      dailyCheckIn: hydratedCheckIn,
      unlockedClothingIds: Array.from(
        new Set([...initial.unlockedClothingIds, ...(parsed.unlockedClothingIds || [])]),
      ),
      unlockedPatternIds: Array.from(
        new Set([...initial.unlockedPatternIds, ...(parsed.unlockedPatternIds || [])]),
      ),
      unlockedDecorationIds: Array.from(
        new Set([...initial.unlockedDecorationIds, ...(parsed.unlockedDecorationIds || [])]),
      ),
      unlockedBackgroundIds: Array.from(
        new Set([...initial.unlockedBackgroundIds, ...(parsed.unlockedBackgroundIds || [])]),
      ),
    };

    const now = Date.now();
    const elapsedMs = Math.max(0, now - (merged.lastSavedAt || now));
    // Cap offline decay window at 12 hours so returning always feels welcoming
    const cappedMs = Math.min(elapsedMs, 12 * 60 * 60 * 1000);
    const decay = cappedMs * DECAY_PER_MS;

    const prevLove = merged.love;
    const prevHunger = merged.hunger;
    merged.love = Math.max(MIN_METER, Math.round((prevLove - decay) * 10) / 10);
    merged.hunger = Math.max(MIN_METER, Math.round((prevHunger - decay * 1.1) * 10) / 10);
    merged.lastSavedAt = now;

    const minutesAway = Math.floor(elapsedMs / 60000);
    const loveDrop = Math.round(prevLove - merged.love);
    const hungerDrop = Math.round(prevHunger - merged.hunger);

    const awaySummary =
      merged.hasAdopted && minutesAway >= 2 && (loveDrop >= 1 || hungerDrop >= 1)
        ? { minutesAway, loveDrop, hungerDrop }
        : null;

    return { save: merged, awaySummary };
  } catch {
    return { save: initial, awaySummary: null };
  }
}

export function usePaperPetsStore(pauseDecay: boolean) {
  const [{ save, awaySummary }, setBoot] = useState(() => loadAndNormalizeSave());
  const [data, setData] = useState<PaperPetsSaveData>(save);
  const [welcomeNotice, setWelcomeNotice] = useState<AwaySummary | null>(awaySummary);
  const [checkInNotice, setCheckInNotice] = useState<CheckInRewardNotice | null>(null);
  const [hasUnsavedRoomChanges, setHasUnsavedRoomChanges] = useState<boolean>(false);

  // Keep sound mute synced
  useEffect(() => {
    sound.setMuted(data.muted);
  }, [data.muted]);

  // Persist to localStorage whenever data updates
  useEffect(() => {
    try {
      const payload: PaperPetsSaveData = {
        ...data,
        lastSavedAt: Date.now(),
      };
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [data]);

  // Slow continuous care decay while active on stage
  useEffect(() => {
    if (pauseDecay || !data.hasAdopted) return;
    const interval = window.setInterval(() => {
      setData((prev) => ({
        ...prev,
        love: Math.max(MIN_METER, Math.round((prev.love - 0.15) * 10) / 10),
        hunger: Math.max(MIN_METER, Math.round((prev.hunger - 0.18) * 10) / 10),
        lastSavedAt: Date.now(),
      }));
    }, 20000);
    return () => window.clearInterval(interval);
  }, [pauseDecay, data.hasAdopted]);

  const dismissWelcomeNotice = useCallback(() => {
    setWelcomeNotice(null);
    setBoot((b) => ({ ...b, awaySummary: null }));
  }, []);

  const dismissCheckInNotice = useCallback(() => {
    setCheckInNotice(null);
  }, []);

  const notifyGrantIfNewDay = useCallback(
    (delaySoundMs = 140): CheckInRewardNotice | null => {
      const grant = previewDailyCheckInGrant(data.dailyCheckIn);
      if (grant) {
        setCheckInNotice(grant);
        window.setTimeout(() => sound.playCoin(), delaySoundMs);
      }
      return grant;
    },
    [data.dailyCheckIn],
  );

  const recordPetInteraction = useCallback((): CheckInRewardNotice | null => {
    const grant = notifyGrantIfNewDay(120);
    if (!grant) return null;
    setData((prev) => applyDailyCheckInToSave(prev));
    return grant;
  }, [notifyGrantIfNewDay]);

  const claimDailyCheckIn = useCallback((): CheckInRewardNotice | null => {
    const grant = previewDailyCheckInGrant(data.dailyCheckIn);
    if (!grant) return null;
    sound.playCoin();
    setCheckInNotice(grant);
    setData((prev) => {
      const stamped = applyDailyCheckInToSave(prev);
      return {
        ...stamped,
        love: Math.min(100, Math.round(stamped.love + 5)),
        lastSavedAt: Date.now(),
      };
    });
    return grant;
  }, [data.dailyCheckIn]);

  const adoptPet = useCallback((petId: PetId, customName?: string) => {
    setData((prev) => ({
      ...prev,
      hasAdopted: true,
      activePetId: petId,
      petNames: {
        ...prev.petNames,
        [petId]: customName?.trim() ? customName.trim() : prev.petNames[petId],
      },
      lastSavedAt: Date.now(),
    }));
  }, []);

  const selectPet = useCallback((petId: PetId) => {
    sound.playPop();
    setData((prev) => ({
      ...prev,
      activePetId: petId,
    }));
  }, []);

  const renamePet = useCallback((petId: PetId, newName: string) => {
    const trimmed = newName.trim().slice(0, 18);
    if (!trimmed) return;
    setData((prev) => ({
      ...prev,
      petNames: {
        ...prev.petNames,
        [petId]: trimmed,
      },
    }));
  }, []);

  const selectBackground = useCallback((bgId: BackgroundId) => {
    sound.playPop();
    setData((prev) => {
      if (!prev.unlockedBackgroundIds.includes(bgId)) return prev;
      return { ...prev, activeBackgroundId: bgId };
    });
  }, []);

  const setRoomTimeOfDay = useCallback((bgId: BackgroundId, time: TimeOfDay) => {
    sound.playClick();
    setData((prev) => ({
      ...prev,
      roomTimeOfDay: {
        ...prev.roomTimeOfDay,
        [bgId]: time,
      },
    }));
  }, []);

  const giveLove = useCallback((): CheckInRewardNotice | null => {
    sound.playLove();
    const grant = notifyGrantIfNewDay(150);
    setData((prev) =>
      applyDailyCheckInToSave({
        ...prev,
        love: Math.min(100, Math.round(prev.love + 12)),
        lastSavedAt: Date.now(),
      }),
    );
    return grant;
  }, [notifyGrantIfNewDay]);

  const feedPet = useCallback(
    (treatId: string): boolean => {
      const treat = TREAT_CATALOG.find((t) => t.id === treatId);
      if (!treat) return false;
      if (!treat.isFree && (data.treatCounts[treatId] || 0) <= 0) return false;

      sound.playFeed();
      notifyGrantIfNewDay(150);

      setData((prev) => {
        if (!treat.isFree) {
          const count = prev.treatCounts[treatId] || 0;
          if (count <= 0) return prev;
          return applyDailyCheckInToSave({
            ...prev,
            hunger: Math.min(100, Math.round(prev.hunger + treat.hungerGain)),
            love: Math.min(100, Math.round(prev.love + treat.loveGain)),
            treatCounts: {
              ...prev.treatCounts,
              [treatId]: count - 1,
            },
            lastSavedAt: Date.now(),
          });
        }
        return applyDailyCheckInToSave({
          ...prev,
          hunger: Math.min(100, Math.round(prev.hunger + treat.hungerGain)),
          love: Math.min(100, Math.round(prev.love + treat.loveGain)),
          lastSavedAt: Date.now(),
        });
      });

      return true;
    },
    [data.treatCounts, notifyGrantIfNewDay],
  );

  const equipGarment = useCallback(
    (slot: ClothingSlot, garment: EquippedGarment | null) => {
      sound.playPop();
      if (garment) notifyGrantIfNewDay(140);
      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        if (!garment) {
          delete petOutfit[slot];
        } else {
          petOutfit[slot] = garment;
        }
        const next = {
          ...prev,
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
        };
        return garment ? applyDailyCheckInToSave(next) : next;
      });
    },
    [notifyGrantIfNewDay],
  );

  const updateEquippedStyle = useCallback(
    (
      slot: ClothingSlot,
      updates: Partial<Pick<EquippedGarment, 'colorHex' | 'patternId' | 'nudgeX' | 'nudgeY' | 'nudgeScale'>>,
    ) => {
      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        const current = petOutfit[slot];
        if (!current) return prev;
        petOutfit[slot] = { ...current, ...updates };
        return {
          ...prev,
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
        };
      });
    },
    [],
  );

  const addPlacedDecoration = useCallback((itemId: string): string => {
    const def = DECORATION_CATALOG.find((d) => d.id === itemId);
    const id = `dec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    sound.playPop();
    setHasUnsavedRoomChanges(true);
    setData((prev) => {
      const bgId = prev.activeBackgroundId;
      const list = prev.roomDecorations[bgId] || [];
      const offset = (list.length % 5) * 4 - 8;
      const newDeco: PlacedDecoration = {
        instanceId: id,
        itemId,
        x: Math.min(82, Math.max(18, 50 + offset)),
        y: Math.min(80, Math.max(24, 62 + (list.length % 3) * 5)),
        scale: def?.defaultScale ?? 1.0,
        zLayer: 'back',
        flipped: false,
      };
      return {
        ...prev,
        roomDecorations: {
          ...prev.roomDecorations,
          [bgId]: [...list, newDeco],
        },
      };
    });
    return id;
  }, []);

  const updatePlacedDecoration = useCallback(
    (instanceId: string, patch: Partial<PlacedDecoration>) => {
      setHasUnsavedRoomChanges(true);
      setData((prev) => {
        const bgId = prev.activeBackgroundId;
        const list = prev.roomDecorations[bgId] || [];
        return {
          ...prev,
          roomDecorations: {
            ...prev.roomDecorations,
            [bgId]: list.map((item) =>
              item.instanceId === instanceId ? { ...item, ...patch } : item,
            ),
          },
        };
      });
    },
    [],
  );

  const removePlacedDecoration = useCallback((instanceId: string) => {
    sound.playClick();
    setHasUnsavedRoomChanges(true);
    setData((prev) => {
      const bgId = prev.activeBackgroundId;
      const list = prev.roomDecorations[bgId] || [];
      return {
        ...prev,
        roomDecorations: {
          ...prev.roomDecorations,
          [bgId]: list.filter((item) => item.instanceId !== instanceId),
        },
      };
    });
  }, []);

  const resetActiveRoom = useCallback(() => {
    sound.playPop();
    setHasUnsavedRoomChanges(true);
    setData((prev) => {
      const bgId = prev.activeBackgroundId;
      const defaults = (DEFAULT_ROOM_DECORATIONS[bgId] || []).map((item) => ({ ...item }));
      return {
        ...prev,
        roomTimeOfDay: {
          ...prev.roomTimeOfDay,
          [bgId]: DEFAULT_ROOM_TIME_OF_DAY[bgId],
        },
        roomDecorations: {
          ...prev.roomDecorations,
          [bgId]: defaults,
        },
      };
    });
  }, []);

  const buyShopItem = useCallback(
    (
      kind: 'clothing' | 'pattern' | 'decoration' | 'background' | 'treat',
      id: string,
    ): boolean => {
      if (kind === 'clothing') {
        const item = CLOTHING_CATALOG.find((c) => c.id === id);
        if (!item || data.unlockedClothingIds.includes(id) || data.coins < item.price) return false;
        sound.playCoin();
        setData((prev) => ({
          ...prev,
          coins: prev.coins - item.price,
          unlockedClothingIds: prev.unlockedClothingIds.includes(id)
            ? prev.unlockedClothingIds
            : [...prev.unlockedClothingIds, id],
        }));
        return true;
      }
      if (kind === 'pattern') {
        const pat = PATTERN_CATALOG.find((p) => p.id === id);
        if (!pat || data.unlockedPatternIds.includes(id as PatternId) || data.coins < pat.price)
          return false;
        sound.playCoin();
        setData((prev) => ({
          ...prev,
          coins: prev.coins - pat.price,
          unlockedPatternIds: prev.unlockedPatternIds.includes(id as PatternId)
            ? prev.unlockedPatternIds
            : [...prev.unlockedPatternIds, id as PatternId],
        }));
        return true;
      }
      if (kind === 'decoration') {
        const deco = DECORATION_CATALOG.find((d) => d.id === id);
        if (!deco || data.unlockedDecorationIds.includes(id) || data.coins < deco.price)
          return false;
        sound.playCoin();
        setData((prev) => ({
          ...prev,
          coins: prev.coins - deco.price,
          unlockedDecorationIds: prev.unlockedDecorationIds.includes(id)
            ? prev.unlockedDecorationIds
            : [...prev.unlockedDecorationIds, id],
        }));
        return true;
      }
      if (kind === 'background') {
        const bg = BACKGROUND_CATALOG.find((b) => b.id === id);
        if (
          !bg ||
          data.unlockedBackgroundIds.includes(id as BackgroundId) ||
          data.coins < bg.price
        )
          return false;
        sound.playCoin();
        setData((prev) => ({
          ...prev,
          coins: prev.coins - bg.price,
          unlockedBackgroundIds: prev.unlockedBackgroundIds.includes(id as BackgroundId)
            ? prev.unlockedBackgroundIds
            : [...prev.unlockedBackgroundIds, id as BackgroundId],
        }));
        return true;
      }
      if (kind === 'treat') {
        const treat = TREAT_CATALOG.find((t) => t.id === id);
        if (!treat || treat.isFree || data.coins < treat.price) return false;
        sound.playCoin();
        setData((prev) => ({
          ...prev,
          coins: prev.coins - treat.price,
          treatCounts: {
            ...prev.treatCounts,
            [id]: (prev.treatCounts[id] || 0) + 1,
          },
        }));
        return true;
      }
      return false;
    },
    [data],
  );

  const buyAndPlaceDecoration = useCallback(
    (itemId: string): string | null => {
      const deco = DECORATION_CATALOG.find((d) => d.id === itemId);
      if (!deco) return null;
      const alreadyUnlocked = data.unlockedDecorationIds.includes(itemId);
      if (!alreadyUnlocked && data.coins < deco.price) return null;

      const instanceId = `dec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      if (!alreadyUnlocked) {
        sound.playCoin();
      } else {
        sound.playPop();
      }
      setHasUnsavedRoomChanges(true);

      setData((prev) => {
        const bgId = prev.activeBackgroundId;
        const list = prev.roomDecorations[bgId] || [];
        const offset = (list.length % 5) * 4 - 8;
        const newDeco: PlacedDecoration = {
          instanceId,
          itemId,
          x: Math.min(82, Math.max(18, 50 + offset)),
          y: Math.min(80, Math.max(24, 62 + (list.length % 3) * 5)),
          scale: deco.defaultScale ?? 1.0,
          zLayer: 'back',
          flipped: false,
        };
        const unlocked = prev.unlockedDecorationIds.includes(itemId);
        return {
          ...prev,
          coins: unlocked ? prev.coins : prev.coins - deco.price,
          unlockedDecorationIds: unlocked
            ? prev.unlockedDecorationIds
            : [...prev.unlockedDecorationIds, itemId],
          roomDecorations: {
            ...prev.roomDecorations,
            [bgId]: [...list, newDeco],
          },
        };
      });
      return instanceId;
    },
    [data.coins, data.unlockedDecorationIds],
  );

  const buyAndEquipClothing = useCallback(
    (slot: ClothingSlot, garment: EquippedGarment): boolean => {
      const item = CLOTHING_CATALOG.find((c) => c.id === garment.itemId);
      if (!item) return false;
      const unlocked = data.unlockedClothingIds.includes(item.id);
      if (!unlocked && data.coins < item.price) return false;

      if (!unlocked) sound.playCoin();
      else sound.playPop();
      notifyGrantIfNewDay(180);

      setData((prev) => {
        const already = prev.unlockedClothingIds.includes(item.id);
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}), [slot]: garment };
        return applyDailyCheckInToSave({
          ...prev,
          coins: already ? prev.coins : prev.coins - item.price,
          unlockedClothingIds: already
            ? prev.unlockedClothingIds
            : [...prev.unlockedClothingIds, item.id],
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
        });
      });
      return true;
    },
    [data.coins, data.unlockedClothingIds, notifyGrantIfNewDay],
  );

  const buyAndApplyPattern = useCallback(
    (slot: ClothingSlot, patternId: PatternId): boolean => {
      const pat = PATTERN_CATALOG.find((p) => p.id === patternId);
      if (!pat) return false;
      const unlocked = data.unlockedPatternIds.includes(patternId);
      if (!unlocked && data.coins < pat.price) return false;

      if (!unlocked) sound.playCoin();
      else sound.playClick();

      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        const current = petOutfit[slot];
        if (!current) return prev;
        const already = prev.unlockedPatternIds.includes(patternId);
        petOutfit[slot] = { ...current, patternId };
        return {
          ...prev,
          coins: already ? prev.coins : prev.coins - pat.price,
          unlockedPatternIds: already
            ? prev.unlockedPatternIds
            : [...prev.unlockedPatternIds, patternId],
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
        };
      });
      return true;
    },
    [data.coins, data.unlockedPatternIds],
  );

  const awardMiniGameReward = useCallback(
    (gameId: MiniGameId, earnedCoins: number, score: number) => {
      if (earnedCoins > 0) sound.playCoin();
      notifyGrantIfNewDay(180);
      setData((prev) =>
        applyDailyCheckInToSave({
          ...prev,
          coins: prev.coins + Math.max(0, Math.round(earnedCoins)),
          love: Math.min(100, Math.round(prev.love + 4)),
          highScores: {
            ...prev.highScores,
            [gameId]: Math.max(prev.highScores[gameId] || 0, score),
          },
          lastSavedAt: Date.now(),
        }),
      );
    },
    [notifyGrantIfNewDay],
  );

  const saveRoomNow = useCallback((): number => {
    const now = Date.now();
    sound.playSuccess();
    setHasUnsavedRoomChanges(false);
    setData((prev) => {
      const next: PaperPetsSaveData = {
        ...prev,
        lastSavedAt: now,
        lastRoomSaveAt: now,
      };
      try {
        localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
    return now;
  }, []);

  const saveRoomLayoutSlot = useCallback(
    (customName?: string): SavedRoomLayoutSlot => {
      const now = Date.now();
      const bgName =
        BACKGROUND_CATALOG.find((b) => b.id === data.activeBackgroundId)?.name || 'Room';
      const sameRoomCount =
        data.savedRoomSlots.filter((s) => s.backgroundId === data.activeBackgroundId).length + 1;
      const slotName = customName?.trim()
        ? customName.trim().slice(0, 32)
        : `${bgName} #${sameRoomCount}`;

      const snapshot: SavedRoomLayoutSlot = {
        id: `slot_${now}_${Math.random().toString(36).slice(2, 6)}`,
        name: slotName,
        backgroundId: data.activeBackgroundId,
        timeOfDay: data.roomTimeOfDay[data.activeBackgroundId],
        decorations: structuredClone(data.roomDecorations[data.activeBackgroundId] || []),
        savedAt: now,
      };

      sound.playSuccess();
      setHasUnsavedRoomChanges(false);
      setData((prev) => {
        const next: PaperPetsSaveData = {
          ...prev,
          lastSavedAt: now,
          lastRoomSaveAt: now,
          savedRoomSlots: [snapshot, ...prev.savedRoomSlots].slice(0, 18),
        };
        try {
          localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage quota errors
        }
        return next;
      });
      return snapshot;
    },
    [data.activeBackgroundId, data.roomDecorations, data.roomTimeOfDay, data.savedRoomSlots],
  );

  const loadRoomLayoutSlot = useCallback(
    (slotId: string): boolean => {
      const slot = data.savedRoomSlots.find((s) => s.id === slotId);
      if (!slot) return false;
      sound.playPop();
      setHasUnsavedRoomChanges(false);
      setData((prev) => {
        const targetBgId = prev.unlockedBackgroundIds.includes(slot.backgroundId)
          ? slot.backgroundId
          : prev.activeBackgroundId;
        const cloned = structuredClone(slot.decorations);
        const now = Date.now();
        const next: PaperPetsSaveData = {
          ...prev,
          activeBackgroundId: targetBgId,
          lastSavedAt: now,
          lastRoomSaveAt: now,
          roomTimeOfDay: slot.timeOfDay
            ? { ...prev.roomTimeOfDay, [targetBgId]: slot.timeOfDay }
            : prev.roomTimeOfDay,
          roomDecorations: {
            ...prev.roomDecorations,
            [targetBgId]: cloned,
          },
        };
        try {
          localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage quota errors
        }
        return next;
      });
      return true;
    },
    [data.savedRoomSlots],
  );

  const overwriteRoomLayoutSlot = useCallback((slotId: string) => {
    const now = Date.now();
    sound.playSuccess();
    setHasUnsavedRoomChanges(false);
    setData((prev) => {
      const cloned = structuredClone(prev.roomDecorations[prev.activeBackgroundId] || []);
      const next: PaperPetsSaveData = {
        ...prev,
        lastSavedAt: now,
        lastRoomSaveAt: now,
        savedRoomSlots: prev.savedRoomSlots.map((slot) =>
          slot.id === slotId
            ? {
                ...slot,
                backgroundId: prev.activeBackgroundId,
                timeOfDay: prev.roomTimeOfDay[prev.activeBackgroundId],
                decorations: cloned,
                savedAt: now,
              }
            : slot,
        ),
      };
      try {
        localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  }, []);

  const deleteRoomLayoutSlot = useCallback((slotId: string) => {
    sound.playClick();
    setData((prev) => ({
      ...prev,
      savedRoomSlots: prev.savedRoomSlots.filter((s) => s.id !== slotId),
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setData((prev) => ({
      ...prev,
      muted: !prev.muted,
    }));
  }, []);

  return {
    data,
    welcomeNotice,
    checkInNotice,
    hasUnsavedRoomChanges,
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
    updateEquippedStyle,
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
  };
}
