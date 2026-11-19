export type PetId = 'rawr' | 'scorch' | 'trot' | 'buddybear' | 'catty' | 'douggie';

export type ClothingSlot = 'hat' | 'eyewear' | 'neckwear' | 'top';

export type PatternId =
  | 'solid'
  | 'polka'
  | 'stripes'
  | 'gingham'
  | 'stars'
  | 'chevron'
  | 'plaid'
  | 'hearts'
  | 'floral'
  | 'terrazzo';

export type BackgroundId =
  | 'meadow'
  | 'living_room'
  | 'sunny_porch'
  | 'campsite'
  | 'craft_desk'
  | 'autumn_park'
  | 'blossom_garden'
  | 'cozy_library'
  | 'beach_cove'
  | 'treehouse_loft';

export type GameScreenState = 'TITLE_MENU' | 'ADOPT' | 'PLAYING' | 'MINIGAME';

export type ActiveDrawer =
  | 'none'
  | 'feed'
  | 'dress'
  | 'decorate'
  | 'minigames'
  | 'shop'
  | 'pets'
  | 'checkin';

export interface StageParticle {
  id: string;
  x: number;
  y: number;
  kind: 'heart' | 'crumb' | 'star' | 'coin';
  label?: string;
  color: string;
}

export type GameMode = 'care' | 'feed' | 'dress' | 'decorate' | 'play' | 'shop' | 'pets';

export type MiniGameId = 'catch_treats' | 'memory_match' | 'color_sort';

export interface AnchorBox {
  /** Center X relative to cropped 460x460 sticker canvas (0..100%) */
  x: number;
  /** Center Y relative to cropped 460x460 sticker canvas (0..100%) */
  y: number;
  /** Relative scale factor */
  scale: number;
  /** Rotation in degrees */
  rotate: number;
}

export interface PetDefinition {
  id: PetId;
  defaultName: string;
  species: string;
  personality: string;
  trickLabel: string;
  accentColor: string;
  rawAsset: string;
  anchors: Record<ClothingSlot, AnchorBox>;
}

export interface ClothingItemDef {
  id: string;
  slot: ClothingSlot;
  subcategory: string;
  name: string;
  price: number;
  defaultColor: string;
  defaultPattern: PatternId;
  description: string;
}

export interface PatternDef {
  id: PatternId;
  name: string;
  price: number;
  starter?: boolean;
}

export interface DecorationItemDef {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor' | 'craft';
  subcategory: string;
  price: number;
  defaultScale: number;
  baseSizePx: number;
  description: string;
}

export interface BackgroundDef {
  id: BackgroundId;
  name: string;
  subcategory: string;
  subtitle: string;
  price: number;
  starterUnlocked: boolean;
}

export interface TreatItemDef {
  id: string;
  name: string;
  subcategory: string;
  price: number;
  hungerGain: number;
  loveGain: number;
  isFree?: boolean;
  description: string;
}

export interface EquippedGarment {
  itemId: string;
  colorHex: string;
  patternId: PatternId;
  /** Optional fine-tune offset X in percentage points relative to sticker container */
  nudgeX?: number;
  /** Optional fine-tune offset Y in percentage points relative to sticker container */
  nudgeY?: number;
  /** Optional scale multiplier (0.75 .. 1.35) */
  nudgeScale?: number;
}

export type PetOutfit = Partial<Record<ClothingSlot, EquippedGarment>>;

export interface PlacedDecoration {
  instanceId: string;
  itemId: string;
  /** Stage percentage 0..100 */
  x: number;
  /** Stage percentage 0..100 */
  y: number;
  scale: number;
  zLayer: 'back' | 'front';
  flipped?: boolean;
}

export interface DailyCheckInState {
  streak: number;
  bestStreak: number;
  totalCheckIns: number;
  /** YYYY-MM-DD in local time when last checked in */
  lastCheckInDate: string | null;
}

export interface PaperPetsSaveData {
  version: number;
  hasAdopted: boolean;
  activePetId: PetId;
  petNames: Record<PetId, string>;
  coins: number;
  love: number;
  hunger: number;
  lastSavedAt: number;
  activeBackgroundId: BackgroundId;
  outfits: Record<PetId, PetOutfit>;
  unlockedClothingIds: string[];
  unlockedPatternIds: PatternId[];
  unlockedDecorationIds: string[];
  unlockedBackgroundIds: BackgroundId[];
  treatCounts: Record<string, number>;
  roomDecorations: Record<BackgroundId, PlacedDecoration[]>;
  highScores: Record<MiniGameId, number>;
  dailyCheckIn: DailyCheckInState;
  muted: boolean;
}
