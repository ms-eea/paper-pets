import { PET_CATALOG } from '../data/catalog';
import { PetId } from '../types/game';

const processedCache = new Map<PetId, string>();
const inFlightPromises = new Map<PetId, Promise<string>>();

/**
 * Flood-fills white/near-white background pixels (and faint off-white canvas marks)
 * starting from image borders so the Procreate drawing keeps its interior whites intact,
 * then removes tiny stray specks, crops tightly, and outputs a crisp centered sticker PNG.
 */
async function extractStickerDataUrl(rawUrl: string): Promise<string> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = rawUrl;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load ${rawUrl}`));
  });

  const maxWorkDim = 680;
  const scale = Math.min(1, maxWorkDim / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));

  const workCanvas = document.createElement('canvas');
  workCanvas.width = w;
  workCanvas.height = h;
  const ctx = workCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return rawUrl;

  ctx.drawImage(img, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  const totalPixels = w * h;

  const visited = new Uint8Array(totalPixels);
  const isBg = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let head = 0;
  let tail = 0;

  const looksLikeCanvasBg = (idx: number): boolean => {
    const p = idx * 4;
    const a = data[p + 3];
    if (a < 30) return true;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const spread = maxC - minC;
    // Catch pure white, light paper shadows, faint floral swirls, and top-edge brush stamps
    return minC >= 188 && spread <= 28;
  };

  const enqueue = (x: number, y: number) => {
    const idx = y * w + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    if (looksLikeCanvasBg(idx)) {
      isBg[idx] = 1;
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < w; x++) {
    enqueue(x, 0);
    enqueue(x, h - 1);
  }
  for (let y = 1; y < h - 1; y++) {
    enqueue(0, y);
    enqueue(w - 1, y);
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % w;
    const y = (idx - x) / w;

    if (x > 0) enqueue(x - 1, y);
    if (x < w - 1) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y < h - 1) enqueue(x, y + 1);
  }

  // Also strip isolated stray specks (small connected foreground islands < 0.25% of foreground)
  const compVisited = new Uint8Array(totalPixels);
  const compQueue = new Int32Array(totalPixels);
  const components: { pixels: number[] }[] = [];

  for (let i = 0; i < totalPixels; i++) {
    if (isBg[i] || compVisited[i]) continue;
    let cHead = 0;
    let cTail = 0;
    compVisited[i] = 1;
    compQueue[cTail++] = i;
    const pixels: number[] = [];

    while (cHead < cTail) {
      const curr = compQueue[cHead++];
      pixels.push(curr);
      const cx = curr % w;
      const cy = (curr - cx) / w;
      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < w - 1 ? curr + 1 : -1,
        cy > 0 ? curr - w : -1,
        cy < h - 1 ? curr + w : -1,
      ];
      for (const n of neighbors) {
        if (n >= 0 && !isBg[n] && !compVisited[n]) {
          compVisited[n] = 1;
          compQueue[cTail++] = n;
        }
      }
    }
    components.push({ pixels });
  }

  let largestSize = 0;
  for (const c of components) {
    if (c.pixels.length > largestSize) largestSize = c.pixels.length;
  }

  const speckThreshold = Math.max(80, Math.floor(largestSize * 0.025));
  for (const c of components) {
    if (c.pixels.length < speckThreshold) {
      for (const pIdx of c.pixels) {
        isBg[pIdx] = 1;
      }
    }
  }

  // Apply alpha + soft 1px edge cleanup and compute tight bounding box
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const p = idx * 4;
      if (isBg[idx]) {
        data[p + 3] = 0;
      } else {
        // Check if adjacent to background to softly anti-alias bright fringe
        const adjBg =
          (x > 0 && isBg[idx - 1]) ||
          (x < w - 1 && isBg[idx + 1]) ||
          (y > 0 && isBg[idx - w]) ||
          (y < h - 1 && isBg[idx + w]);

        if (adjBg) {
          const lum = (data[p] + data[p + 1] + data[p + 2]) / 3;
          if (lum > 195) {
            data[p + 3] = Math.round(data[p + 3] * 0.45);
          }
        }

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return rawUrl;
  }

  ctx.putImageData(imgData, 0, 0);

  // Crop into a uniform square sticker canvas with die-cut white outline rim
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const outSize = 460;
  const padding = 28;
  const fitScale = Math.min((outSize - padding * 2) / cropW, (outSize - padding * 2) / cropH);
  const drawW = Math.round(cropW * fitScale);
  const drawH = Math.round(cropH * fitScale);
  const drawX = Math.round((outSize - drawW) / 2);
  const drawY = Math.round((outSize - drawH) / 2);

  // Create isolated cropped canvas first
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = outSize;
  cropCanvas.height = outSize;
  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) return rawUrl;

  cropCtx.drawImage(workCanvas, minX, minY, cropW, cropH, drawX, drawY, drawW, drawH);

  // Build crisp die-cut sticker silhouette (outer paper lip + bold white sticker border) behind the pet
  const outCanvas = document.createElement('canvas');
  outCanvas.width = outSize;
  outCanvas.height = outSize;
  const outCtx = outCanvas.getContext('2d');
  if (!outCtx) return rawUrl;

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = outSize;
  maskCanvas.height = outSize;
  const maskCtx = maskCanvas.getContext('2d');
  if (maskCtx) {
    // First pass: crisp warm-kraft outer die-cut edge lip (12.5px)
    maskCtx.drawImage(cropCanvas, 0, 0);
    maskCtx.globalCompositeOperation = 'source-in';
    maskCtx.fillStyle = '#CFC2B0';
    maskCtx.fillRect(0, 0, outSize, outSize);

    const steps = 24;
    const edgeRadius = 12.5;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      outCtx.drawImage(
        maskCanvas,
        Math.cos(angle) * edgeRadius,
        Math.sin(angle) * edgeRadius,
      );
    }

    // Second pass: thick bright matte sticker vinyl/paper border (11px)
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.clearRect(0, 0, outSize, outSize);
    maskCtx.drawImage(cropCanvas, 0, 0);
    maskCtx.globalCompositeOperation = 'source-in';
    maskCtx.fillStyle = '#FFFDF9';
    maskCtx.fillRect(0, 0, outSize, outSize);

    const outlineRadius = 11;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      outCtx.drawImage(
        maskCanvas,
        Math.cos(angle) * outlineRadius,
        Math.sin(angle) * outlineRadius,
      );
    }
    outCtx.drawImage(maskCanvas, 0, 0);
  }

  outCtx.drawImage(cropCanvas, 0, 0);
  return outCanvas.toDataURL('image/png');
}

export async function getProcessedPetSticker(petId: PetId, rawAsset: string): Promise<string> {
  const cached = processedCache.get(petId);
  if (cached) return cached;

  const existingPromise = inFlightPromises.get(petId);
  if (existingPromise) return existingPromise;

  const promise = extractStickerDataUrl(rawAsset)
    .then((dataUrl) => {
      processedCache.set(petId, dataUrl);
      inFlightPromises.delete(petId);
      return dataUrl;
    })
    .catch(() => {
      inFlightPromises.delete(petId);
      return rawAsset;
    });

  inFlightPromises.set(petId, promise);
  return promise;
}

export function preloadAllPetStickers(): Promise<Record<PetId, string>> {
  return Promise.all(
    PET_CATALOG.map(async (pet) => {
      const url = await getProcessedPetSticker(pet.id, pet.rawAsset);
      return [pet.id, url] as const;
    }),
  ).then((entries) => Object.fromEntries(entries) as Record<PetId, string>);
}
