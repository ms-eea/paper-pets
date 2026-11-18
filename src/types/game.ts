export type PetId = 'rawr' | 'scorch' | 'trot' | 'buddybear' | 'catty' | 'douggie';

export type ClothingSlot = 'hat' | 'eyewear' | 'neckwear' | 'top';

export type PatternId = 'solid' | 'polka' | 'stripes' | 'gingham' | 'stars' | 'chevron';

export type BackgroundId =
  | 'meadow'
  | 'living_room'
  | 'sunny_porch'
  | 'campsite'
  | 'craft_desk'
  | 'autumn_park'
  | 'blossom_garden';

export type GameScreenState = 'TITLE_MENU' | 'ADOPT' | 'PLAYING' | 'MINIGAME';

export type MiniGameId = 'catch_treats' | 'memory_match' | 'color_sort';

export type ActiveDrawer =
  | 'none'
  | 'feed'
  | 'dress'
  | 'decorate'
  | 'minigames'
  | 'shop'
  | 'pets'
  | 'checkin';

export interface SlotAnchor {
  x: number; // percentage of pet box width (0-100)
  y: number; // percentage of pet box height (0-100)
  scale: number; // relative scale multiplier
  rotate?: number; // degrees
}

export interface PetDefinition {
  id: PetId;
  defaultName: string;
  species: string;
  personality: string;
  trickLabel: string;
  rawAsset: string;
  accentColor: string;
  anchors: Record<ClothingSlot, SlotAnchor>;
}

export interface EquippedGarment {
  itemId: string;
  colorHex: string;
  patternId: PatternId;
  nudgeX?: number;
  nudgeY?: number;
  nudgeScale?: number;
}

export type PetOutfit = Partial<Record<ClothingSlot, EquippedGarment>>;

export interface ClothingItemDef {
  id: string;
  name: string;
  slot: ClothingSlot;
  price: number;
  defaultColor: string;
  defaultPattern: PatternId;
  description: string;
}

export interface TreatItemDef {
  id: string;
  name: string;
  price: number;
  hungerGain: number;
  loveGain: number;
  isFree?: boolean;
  description: string;
}

export interface DecorationItemDef {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor' | 'craft';
  price: number;
  defaultScale: number;
  baseSizePx: number;
  description: string;
}

export interface PlacedDecoration {
  instanceId: string;
  itemId: string;
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  scale: number; // 0.35..2.2
  zLayer: 'back' | 'front';
  flipped: boolean;
}

export interface BackgroundDef {
  id: BackgroundId;
  name: string;
  subtitle: string;
  price: number;
  starterUnlocked: boolean;
}

export interface PaperPetsSaveData {
  version: number;
  hasAdopted: boolean;
  activePetId: PetId;
  activeBackgroundId: BackgroundId;
  petNames: Record<PetId, string>;
  outfits: Record<PetId, PetOutfit>;
  love: number;
  hunger: number;
  coins: number;
  lastSavedAt: number;
  muted: boolean;
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  unlockedDecorationIds: string[];
  unlockedBackgroundIds: BackgroundId[];
  treatCounts: Record<string, number>;
  roomDecorations: Record<BackgroundId, PlacedDecoration[]>;
  highScores: Record<MiniGameId, number>;
  dailyCheckIn: DailyCheckInState;
}

export interface DailyCheckInState {
  streak: number;
  bestStreak: number;
  totalCheckIns: number;
  lastCheckInDate: string | null; // YYYY-MM-DD local calendar date
}

export interface StageParticle {
  id: string;
  x: number;
  y: number;
  kind: 'heart' | 'crumb' | 'star' | 'coin';
  label?: string;
  color: string;
}
