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
  PetOutfit,
  PlacedDecoration,
  SavedOutfitSlot,
  SavedRoomLayoutSlot,
  TimeOfDay,
} from '../types/game';
import { sound } from '../utils/sound';

// Gentle decay: ~0.45 points per minute (~27 points per hour), floored at 10
const DECAY_PER_MS = 0.45 / 60000;
const MIN_METER = 10;
const CLOTHING_SLOTS: ClothingSlot[] = ['hat', 'eyewear', 'neckwear', 'top', 'wings', 'handheld'];

function persistSaveSync(next: PaperPetsSaveData) {
  try {
    localStorage.setItem(
      SAVE_STORAGE_KEY,
      JSON.stringify({
        ...next,
        lastSavedAt: next.lastSavedAt || Date.now(),
      }),
    );
  } catch {
    // Ignore storage quota errors
  }
}

function sanitizeOutfit(rawOutfit: PetOutfit | undefined | null): PetOutfit {
  const cleaned: PetOutfit = {};
  if (!rawOutfit || typeof rawOutfit !== 'object') return cleaned;
  for (const slot of CLOTHING_SLOTS) {
    const garment = rawOutfit[slot];
    if (!garment || typeof garment !== 'object' || typeof garment.itemId !== 'string') continue;
    const def = CLOTHING_CATALOG.find((c) => c.id === garment.itemId && c.slot === slot);
    if (!def) continue;
    const validPattern = PATTERN_CATALOG.some((p) => p.id === garment.patternId)
      ? garment.patternId
      : def.defaultPattern;
    cleaned[slot] = {
      itemId: def.id,
      colorHex: typeof garment.colorHex === 'string' && garment.colorHex ? garment.colorHex : def.defaultColor,
      patternId: validPattern,
      ...(typeof garment.nudgeX === 'number' && Number.isFinite(garment.nudgeX)
        ? { nudgeX: Math.max(-15, Math.min(15, garment.nudgeX)) }
        : {}),
      ...(typeof garment.nudgeY === 'number' && Number.isFinite(garment.nudgeY)
        ? { nudgeY: Math.max(-15, Math.min(15, garment.nudgeY)) }
        : {}),
      ...(typeof garment.nudgeScale === 'number' && Number.isFinite(garment.nudgeScale)
        ? { nudgeScale: Math.max(0.7, Math.min(1.35, garment.nudgeScale)) }
        : {}),
    };
  }
  return cleaned;
}

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

    const normalizeDecoListForPanorama = (list: PlacedDecoration[]) =>
      list.map((d) => ({
        ...d,
        x: Math.round((25 + Math.min(97, Math.max(3, d.x)) * 0.5) * 10) / 10,
      }));

    const needsPanoramicMigration = parsed.panoramicNormalized !== true;

    const mergedRooms: Record<BackgroundId, PlacedDecoration[]> = {
      ...initial.roomDecorations,
    };

    if (parsed.roomDecorations && typeof parsed.roomDecorations === 'object') {
      for (const [bgKey, list] of Object.entries(parsed.roomDecorations)) {
        if (!Array.isArray(list)) continue;
        let nextList = list;
        if (bgKey === 'meadow') {
          nextList = nextList
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
        mergedRooms[bgKey as BackgroundId] = needsPanoramicMigration
          ? normalizeDecoListForPanorama(nextList)
          : nextList;
      }
    }

    const rawRoomDecorations = mergedRooms;

    const rawOutfits = { ...initial.outfits, ...(parsed.outfits || {}) };
    const normalizedOutfits: Record<PetId, PetOutfit> = {
      rawr: sanitizeOutfit(rawOutfits.rawr),
      scorch: sanitizeOutfit(rawOutfits.scorch),
      trot: sanitizeOutfit(rawOutfits.trot),
      buddybear: sanitizeOutfit(rawOutfits.buddybear),
      catty: sanitizeOutfit(rawOutfits.catty),
      douggie: sanitizeOutfit(rawOutfits.douggie),
    };

    const hydratedOutfitSlots: SavedOutfitSlot[] = Array.isArray(parsed.savedOutfitSlots)
      ? parsed.savedOutfitSlots
          .filter((s) => s && typeof s.id === 'string' && typeof s.petId === 'string')
          .map((s) => ({
            ...s,
            outfit: sanitizeOutfit(s.outfit),
          }))
      : [];

    const equippedItemIds: string[] = [];
    for (const petOutfit of Object.values(normalizedOutfits)) {
      for (const slot of CLOTHING_SLOTS) {
        const garment = petOutfit?.[slot];
        if (garment?.itemId) equippedItemIds.push(garment.itemId);
      }
    }
    for (const slotEntry of hydratedOutfitSlots) {
      for (const slot of CLOTHING_SLOTS) {
        const garment = slotEntry.outfit?.[slot];
        if (garment?.itemId) equippedItemIds.push(garment.itemId);
      }
    }

    const merged: PaperPetsSaveData = {
      ...initial,
      ...parsed,
      petNames: { ...initial.petNames, ...(parsed.petNames || {}) },
      outfits: normalizedOutfits,
      lastClothingSlots: { ...(parsed.lastClothingSlots || {}) },
      savedOutfitSlots: hydratedOutfitSlots,
      treatCounts: { ...initial.treatCounts, ...(parsed.treatCounts || {}) },
      roomDecorations: rawRoomDecorations,
      roomTimeOfDay: {
        ...DEFAULT_ROOM_TIME_OF_DAY,
        ...(parsed.roomTimeOfDay || {}),
      },
      savedRoomSlots: Array.isArray(parsed.savedRoomSlots)
        ? parsed.savedRoomSlots.map((slot) => ({
            ...slot,
            decorations: needsPanoramicMigration
              ? normalizeDecoListForPanorama(slot.decorations || [])
              : slot.decorations || [],
          }))
        : [],
      panoramicNormalized: true,
      lastRoomSaveAt: parsed.lastRoomSaveAt || parsed.lastSavedAt || initial.lastRoomSaveAt,
      lastOutfitSaveAt: parsed.lastOutfitSaveAt || parsed.lastSavedAt || initial.lastOutfitSaveAt,
      highScores: { ...initial.highScores, ...(parsed.highScores || {}) },
      dailyCheckIn: hydratedCheckIn,
      unlockedClothingIds: Array.from(
        new Set([
          ...initial.unlockedClothingIds,
          ...(parsed.unlockedClothingIds || []),
          ...equippedItemIds,
        ]),
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
  const [hasUnsavedOutfitChanges, setHasUnsavedOutfitChanges] = useState<boolean>(false);

  // Keep sound mute synced
  useEffect(() => {
    sound.setMuted(data.muted);
  }, [data.muted]);

  // Persist to localStorage whenever data updates
  useEffect(() => {
    persistSaveSync({
      ...data,
      lastSavedAt: Date.now(),
    });
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
      setHasUnsavedOutfitChanges(true);
      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        if (!garment) {
          delete petOutfit[slot];
        } else {
          petOutfit[slot] = garment;
        }
        const nextLastSlots = { ...(prev.lastClothingSlots || {}) };
        if (garment) {
          nextLastSlots[prev.activePetId] = slot;
        } else if (!nextLastSlots[prev.activePetId] || nextLastSlots[prev.activePetId] === slot) {
          const fallbackSlot = CLOTHING_SLOTS.find((candidate) => Boolean(petOutfit[candidate]));
          if (fallbackSlot) {
            nextLastSlots[prev.activePetId] = fallbackSlot;
          } else {
            delete nextLastSlots[prev.activePetId];
          }
        }
        const baseNext: PaperPetsSaveData = {
          ...prev,
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
          lastClothingSlots: nextLastSlots,
          lastSavedAt: Date.now(),
        };
        const next = garment ? applyDailyCheckInToSave(baseNext) : baseNext;
        persistSaveSync(next);
        return next;
      });
    },
    [notifyGrantIfNewDay],
  );

  const clearOutfit = useCallback(() => {
    sound.playClick();
    setHasUnsavedOutfitChanges(true);
    setData((prev) => {
      const nextLastSlots = { ...(prev.lastClothingSlots || {}) };
      delete nextLastSlots[prev.activePetId];
      const next: PaperPetsSaveData = {
        ...prev,
        outfits: {
          ...prev.outfits,
          [prev.activePetId]: {},
        },
        lastClothingSlots: nextLastSlots,
        lastSavedAt: Date.now(),
      };
      persistSaveSync(next);
      return next;
    });
  }, []);

  const updateEquippedStyle = useCallback(
    (
      slot: ClothingSlot,
      updates: Partial<Pick<EquippedGarment, 'colorHex' | 'patternId' | 'nudgeX' | 'nudgeY' | 'nudgeScale'>>,
    ) => {
      setHasUnsavedOutfitChanges(true);
      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        const current = petOutfit[slot];
        if (!current) return prev;
        petOutfit[slot] = { ...current, ...updates };
        const next: PaperPetsSaveData = {
          ...prev,
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
          lastClothingSlots: {
            ...(prev.lastClothingSlots || {}),
            [prev.activePetId]: slot,
          },
          lastSavedAt: Date.now(),
        };
        persistSaveSync(next);
        return next;
      });
    },
    [],
  );

  const addPlacedDecoration = useCallback((itemId: string, targetCenterX = 50): string => {
    const def = DECORATION_CATALOG.find((d) => d.id === itemId);
    const id = `dec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    sound.playPop();
    setHasUnsavedRoomChanges(true);
    setData((prev) => {
      const bgId = prev.activeBackgroundId;
      const list = prev.roomDecorations[bgId] || [];
      const offset = (list.length % 5) * 3 - 6;
      const newDeco: PlacedDecoration = {
        instanceId: id,
        itemId,
        x: Math.min(92, Math.max(8, Math.round((targetCenterX + offset) * 10) / 10)),
        y: Math.min(80, Math.max(24, 60 + (list.length % 3) * 5)),
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
    (itemId: string, targetCenterX = 50): string | null => {
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
        const offset = (list.length % 5) * 3 - 6;
        const newDeco: PlacedDecoration = {
          instanceId,
          itemId,
          x: Math.min(92, Math.max(8, Math.round((targetCenterX + offset) * 10) / 10)),
          y: Math.min(80, Math.max(24, 60 + (list.length % 3) * 5)),
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
      setHasUnsavedOutfitChanges(true);

      setData((prev) => {
        const already = prev.unlockedClothingIds.includes(item.id);
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}), [slot]: garment };
        const next = applyDailyCheckInToSave({
          ...prev,
          coins: already ? prev.coins : prev.coins - item.price,
          unlockedClothingIds: already
            ? prev.unlockedClothingIds
            : [...prev.unlockedClothingIds, item.id],
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
          lastClothingSlots: {
            ...(prev.lastClothingSlots || {}),
            [prev.activePetId]: slot,
          },
          lastSavedAt: Date.now(),
        });
        persistSaveSync(next);
        return next;
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
      setHasUnsavedOutfitChanges(true);

      setData((prev) => {
        const petOutfit = { ...(prev.outfits[prev.activePetId] || {}) };
        const current = petOutfit[slot];
        if (!current) return prev;
        const already = prev.unlockedPatternIds.includes(patternId);
        petOutfit[slot] = { ...current, patternId };
        const next: PaperPetsSaveData = {
          ...prev,
          coins: already ? prev.coins : prev.coins - pat.price,
          unlockedPatternIds: already
            ? prev.unlockedPatternIds
            : [...prev.unlockedPatternIds, patternId],
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: petOutfit,
          },
          lastClothingSlots: {
            ...(prev.lastClothingSlots || {}),
            [prev.activePetId]: slot,
          },
          lastSavedAt: Date.now(),
        };
        persistSaveSync(next);
        return next;
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

  const saveOutfitNow = useCallback((): number => {
    const now = Date.now();
    sound.playSuccess();
    setHasUnsavedOutfitChanges(false);
    setData((prev) => {
      const next: PaperPetsSaveData = {
        ...prev,
        lastSavedAt: now,
        lastOutfitSaveAt: now,
      };
      persistSaveSync(next);
      return next;
    });
    return now;
  }, []);

  const saveOutfitSlot = useCallback(
    (customName?: string): SavedOutfitSlot => {
      const now = Date.now();
      const petId = data.activePetId;
      const petName = data.petNames[petId] || 'Pet';
      const existingSlots = data.savedOutfitSlots || [];
      const samePetCount = existingSlots.filter((s) => s.petId === petId).length + 1;
      const slotName = customName?.trim()
        ? customName.trim().slice(0, 32)
        : `${petName} Look #${samePetCount}`;

      const snapshot: SavedOutfitSlot = {
        id: `look_${now}_${Math.random().toString(36).slice(2, 6)}`,
        petId,
        name: slotName,
        outfit: sanitizeOutfit(structuredClone(data.outfits[petId] || {})),
        savedAt: now,
      };

      sound.playSuccess();
      setHasUnsavedOutfitChanges(false);
      setData((prev) => {
        const next: PaperPetsSaveData = {
          ...prev,
          lastSavedAt: now,
          lastOutfitSaveAt: now,
          savedOutfitSlots: [snapshot, ...(prev.savedOutfitSlots || [])].slice(0, 18),
        };
        persistSaveSync(next);
        return next;
      });
      return snapshot;
    },
    [data.activePetId, data.outfits, data.petNames, data.savedOutfitSlots],
  );

  const loadOutfitSlot = useCallback(
    (slotId: string): boolean => {
      const slot = (data.savedOutfitSlots || []).find((s) => s.id === slotId);
      if (!slot) return false;
      sound.playPop();
      setHasUnsavedOutfitChanges(false);
      setData((prev) => {
        const now = Date.now();
        const cloned = sanitizeOutfit(structuredClone(slot.outfit));
        const itemIds = CLOTHING_SLOTS.map((s) => cloned[s]?.itemId).filter(
          (id): id is string => Boolean(id),
        );
        const firstSlot = CLOTHING_SLOTS.find((s) => Boolean(cloned[s]));
        const nextLastSlots = { ...(prev.lastClothingSlots || {}) };
        if (firstSlot) {
          nextLastSlots[prev.activePetId] = firstSlot;
        } else {
          delete nextLastSlots[prev.activePetId];
        }
        const next: PaperPetsSaveData = {
          ...prev,
          lastSavedAt: now,
          lastOutfitSaveAt: now,
          unlockedClothingIds: Array.from(new Set([...prev.unlockedClothingIds, ...itemIds])),
          outfits: {
            ...prev.outfits,
            [prev.activePetId]: cloned,
          },
          lastClothingSlots: nextLastSlots,
        };
        persistSaveSync(next);
        return next;
      });
      return true;
    },
    [data.savedOutfitSlots],
  );

  const deleteOutfitSlot = useCallback((slotId: string) => {
    sound.playClick();
    setData((prev) => {
      const next: PaperPetsSaveData = {
        ...prev,
        savedOutfitSlots: (prev.savedOutfitSlots || []).filter((s) => s.id !== slotId),
      };
      persistSaveSync(next);
      return next;
    });
  }, []);

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
      persistSaveSync(next);
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
        persistSaveSync(next);
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
        persistSaveSync(next);
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
      persistSaveSync(next);
      return next;
    });
  }, []);

  const deleteRoomLayoutSlot = useCallback((slotId: string) => {
    sound.playClick();
    setData((prev) => {
      const next: PaperPetsSaveData = {
        ...prev,
        savedRoomSlots: prev.savedRoomSlots.filter((s) => s.id !== slotId),
      };
      persistSaveSync(next);
      return next;
    });
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
  };
}
