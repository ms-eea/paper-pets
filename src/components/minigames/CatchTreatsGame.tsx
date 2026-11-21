import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Coins, Heart, Pause, Play, RotateCcw, X } from 'lucide-react';
import { PET_BY_ID } from '../../data/catalog';
import { PetId } from '../../types/game';
import { sound } from '../../utils/sound';

interface Props {
  petId: PetId;
  petName: string;
  stickerSrc?: string;
  onComplete: (coinsEarned: number, score: number) => void;
  onExit: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  vy: number;
  kind: 'apple' | 'cupcake' | 'star' | 'boot';
  rot: number;
  vRot: number;
}

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const W = 720;
const H = 480;

export const CatchTreatsGame: React.FC<Props> = ({
  petId,
  petName,
  stickerSrc,
  onComplete,
  onExit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchSteerRef = useRef<-1 | 0 | 1>(0);
  const [phase, setPhase] = useState<'PLAYING' | 'PAUSED' | 'SUMMARY'>('PLAYING');
  const [hudState, setHudState] = useState({ score: 0, coins: 0, lives: 3, timeLeft: 40 });
  const [runId, setRunId] = useState(0);
  const rewardClaimedRef = useRef(false);

  useEffect(() => {
    rewardClaimedRef.current = false;
  }, [runId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const petDef = PET_BY_ID[petId];
    const petImg = new Image();
    petImg.src = stickerSrc || petDef.rawAsset;

    const heldKeys = new Set<string>();
    let pointerTargetX: number | null = null;
    let activePointerId: number | null = null;
    let playerX = W / 2;
    const playerY = H - 62;
    const playerW = 86;

    let score = 0;
    let coins = 0;
    let lives = 3;
    let timeLeft = 40;
    let spawnTimer = 0.35;
    let nextId = 1;
    let shakeTime = 0;
    let hitFlash = 0;
    let ended = false;
    let isPaused = false;

    const items: FallingItem[] = [];
    const particles: CanvasParticle[] = [];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!ended) {
          isPaused = !isPaused;
          setPhase(isPaused ? 'PAUSED' : 'PLAYING');
        }
        return;
      }
      heldKeys.add(e.key.toLowerCase());
    };
    const onKeyUp = (e: KeyboardEvent) => heldKeys.delete(e.key.toLowerCase());
    const onBlur = () => {
      heldKeys.clear();
      touchSteerRef.current = 0;
      activePointerId = null;
    };

    const updatePointer = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0) return;
      const relX = ((clientX - rect.left) / rect.width) * W;
      pointerTargetX = Math.min(W - 46, Math.max(46, relX));
    };

    const onPointerDown = (e: PointerEvent) => {
      activePointerId = e.pointerId;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unsupported
      }
      updatePointer(e.clientX);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (activePointerId === e.pointerId || e.pointerType === 'mouse') {
        updatePointer(e.clientX);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (activePointerId === e.pointerId) {
        activePointerId = null;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    let lastTime = performance.now();
    let hudSyncAccum = 0;
    let rafId = 0;

    const spawnBurst = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        particles.push({
          x,
          y,
          vx: Math.cos(ang) * (70 + Math.random() * 65),
          vy: Math.sin(ang) * (70 + Math.random() * 65) - 30,
          life: 0.45,
          color,
          size: 5 + Math.random() * 4,
        });
      }
    };

    const drawItem = (it: FallingItem) => {
      ctx.save();
      ctx.translate(it.x, it.y);
      ctx.rotate(it.rot);

      if (it.kind === 'apple') {
        ctx.fillStyle = '#D95D39';
        ctx.strokeStyle = '#FFFDF8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 2, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#3B8A77';
        ctx.beginPath();
        ctx.ellipse(5, -15, 7, 4, -0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (it.kind === 'cupcake') {
        ctx.fillStyle = '#E09F3E';
        ctx.strokeStyle = '#FFFDF8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-14, 2);
        ctx.lineTo(14, 2);
        ctx.lineTo(10, 18);
        ctx.lineTo(-10, 18);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#E89EB0';
        ctx.beginPath();
        ctx.arc(0, -3, 14, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
      } else if (it.kind === 'star') {
        ctx.fillStyle = '#F2CC66';
        ctx.strokeStyle = '#3D312A';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? 18 : 8;
          const a = (i * Math.PI) / 5 - Math.PI / 2;
          if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        // Muddy boot hazard
        ctx.fillStyle = '#5C4A3E';
        ctx.strokeStyle = '#FFFDF8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-10, -16, 16, 28, 4);
        ctx.roundRect(-10, 4, 24, 12, 5);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    const tick = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      // Sync pause state from React ref? Instead read DOM/dataset or keep local flag synced:
      const pausedAttr = canvas.dataset.paused === 'true';
      isPaused = pausedAttr;

      if (!isPaused && !ended) {
        timeLeft = Math.max(0, timeLeft - dt);
        if (timeLeft <= 0 || lives <= 0) {
          ended = true;
          setHudState({ score, coins, lives, timeLeft: 0 });
          setPhase('SUMMARY');
          if (!rewardClaimedRef.current) {
            rewardClaimedRef.current = true;
            sound.playSuccess();
            onComplete(coins, score);
          }
        }

        // Player movement (keyboard, mobile thumb pads, or touch/mouse drag)
        const moveLeft =
          heldKeys.has('arrowleft') || heldKeys.has('a') || touchSteerRef.current === -1;
        const moveRight =
          heldKeys.has('arrowright') || heldKeys.has('d') || touchSteerRef.current === 1;
        const speed = 430;
        if (moveLeft) {
          playerX -= speed * dt;
          pointerTargetX = null;
        }
        if (moveRight) {
          playerX += speed * dt;
          pointerTargetX = null;
        }
        if (pointerTargetX !== null && !moveLeft && !moveRight) {
          playerX += (pointerTargetX - playerX) * Math.min(1, dt * 16);
        }
        playerX = Math.min(W - 46, Math.max(46, playerX));

        // Spawn items with gentle difficulty ramp
        const elapsed = 40 - timeLeft;
        const spawnInterval = Math.max(0.38, 0.88 - elapsed * 0.01);
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawnTimer = spawnInterval;
          const roll = Math.random();
          const kind: FallingItem['kind'] =
            roll < 0.22 ? 'boot' : roll < 0.36 ? 'star' : roll < 0.68 ? 'cupcake' : 'apple';
          items.push({
            id: nextId++,
            x: 40 + Math.random() * (W - 80),
            y: -26,
            vy: 155 + elapsed * 3.5 + Math.random() * 55,
            kind,
            rot: (Math.random() - 0.5) * 0.4,
            vRot: (Math.random() - 0.5) * 1.4,
          });
        }

        // Update items & collisions
        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i];
          it.y += it.vy * dt;
          it.rot += it.vRot * dt;

          const hitPlayer =
            Math.abs(it.x - playerX) < playerW * 0.48 && Math.abs(it.y - playerY) < 42;

          if (hitPlayer) {
            if (it.kind === 'boot') {
              lives = Math.max(0, lives - 1);
              shakeTime = 0.22;
              hitFlash = 0.16;
              sound.playError();
              spawnBurst(it.x, it.y, '#7F6A58');
            } else {
              const pts = it.kind === 'star' ? 25 : 10;
              const gain = it.kind === 'star' ? 4 : it.kind === 'cupcake' ? 2 : 1;
              score += pts;
              coins += gain;
              sound.playCoin();
              spawnBurst(it.x, it.y, it.kind === 'star' ? '#F2CC66' : '#D95D39');
            }
            items.splice(i, 1);
            continue;
          }

          if (it.y > H + 30) {
            items.splice(i, 1);
          }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt;
          if (p.life <= 0) particles.splice(i, 1);
        }

        if (shakeTime > 0) shakeTime = Math.max(0, shakeTime - dt);
        if (hitFlash > 0) hitFlash = Math.max(0, hitFlash - dt);

        hudSyncAccum += dt;
        if (hudSyncAccum >= 0.12) {
          hudSyncAccum = 0;
          setHudState({ score, coins, lives, timeLeft: Math.ceil(timeLeft) });
        }
      }

      // Draw Paper Meadow Arena
      ctx.save();
      if (shakeTime > 0) {
        ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
      }

      ctx.fillStyle = '#DDEEF2';
      ctx.fillRect(0, 0, W, H);

      // Paper sun & hills
      ctx.fillStyle = '#F4C24D';
      ctx.beginPath();
      ctx.arc(620, 74, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#82B686';
      ctx.beginPath();
      ctx.moveTo(0, 385);
      ctx.quadraticCurveTo(220, 335, 440, 380);
      ctx.quadraticCurveTo(600, 410, W, 365);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#69A271';
      ctx.fillRect(0, H - 56, W, 56);

      // Draw falling items
      for (const it of items) {
        drawItem(it);
      }

      // Draw Pet Sticker
      ctx.save();
      ctx.fillStyle = 'rgba(61, 49, 42, 0.2)';
      ctx.beginPath();
      ctx.ellipse(playerX, playerY + 38, 34, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      if (petImg.complete && petImg.naturalWidth > 0) {
        ctx.drawImage(petImg, playerX - playerW / 2, playerY - playerW / 2, playerW, playerW);
      } else {
        ctx.fillStyle = '#D95D39';
        ctx.beginPath();
        ctx.arc(playerX, playerY, 28, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw particles
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life * 2);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (hitFlash > 0) {
        ctx.fillStyle = `rgba(217, 93, 57, ${hitFlash * 2})`;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.restore();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, [petId, stickerSrc, runId, onComplete]);

  const handleRestart = () => {
    setHudState({ score: 0, coins: 0, lives: 3, timeLeft: 40 });
    setPhase('PLAYING');
    setRunId((r) => r + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D312A]/60 flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-3xl max-h-[94dvh] paper-card rounded-2xl overflow-hidden flex flex-col">
        {/* Top Game HUD */}
        <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F3EBDD] border-b border-[#D6C4AC] flex flex-wrap items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#3D312A] truncate">
              Catch the Treats · {petName}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6E5D52]">
              Move mouse cursor, use A/D, or drag/tap Left &amp; Right
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < hudState.lives
                      ? 'text-[#D95D39] fill-[#D95D39]'
                      : 'text-[#C9B396]'
                  }`}
                />
              ))}
            </div>
            <div className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC]">
              {hudState.timeLeft}s
            </div>
            <div className="font-mono-num text-xs font-bold text-[#3D312A] bg-[#FBF7F0] px-2.5 py-1 rounded border border-[#D6C4AC] flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#D99B26]" />
              {hudState.coins}
            </div>
            {phase !== 'SUMMARY' && (
              <button
                type="button"
                onClick={() => setPhase((p) => (p === 'PAUSED' ? 'PLAYING' : 'PAUSED'))}
                aria-label={phase === 'PAUSED' ? 'Resume game' : 'Pause game'}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
              >
                {phase === 'PAUSED' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={onExit}
              aria-label="Exit mini-game"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg hover:bg-[#E8DCC8] flex items-center justify-center text-[#3D312A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Always-Visible Compact Instructions Banner */}
        <div className="px-3.5 py-1.5 bg-[#FBF7F0] border-b border-[#D6C4AC] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-[#3D312A] shrink-0">
          <span>
            <strong className="text-[#2F7D6D]">Catch:</strong> Apple +1 · Cupcake +2 · Star +4
          </span>
          <span aria-hidden="true" className="text-[#CEB99C]">|</span>
          <span>
            <strong className="text-[#B83B1D]">Dodge:</strong> Muddy Boot (-1 Life)
          </span>
          <span aria-hidden="true" className="text-[#CEB99C] hidden sm:inline">|</span>
          <span className="text-[#6E5D52]">
            <strong>Move:</strong> Hover mouse, A/D, or Touch
          </span>
        </div>

        {/* Isolated Canvas Viewport */}
        <div className="relative bg-[#DDEEF2] flex-1 min-h-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            data-paused={phase !== 'PLAYING' ? 'true' : 'false'}
            className="w-full h-auto block touch-none md:cursor-ew-resize"
          />

          {phase === 'PAUSED' && (
            <div className="absolute inset-0 bg-[#3D312A]/45 flex flex-col items-center justify-center p-6">
              <div className="paper-card rounded-2xl p-6 text-center max-w-xs w-full space-y-3">
                <h4 className="font-display text-2xl font-bold text-[#3D312A]">Paused</h4>
                <button
                  type="button"
                  onClick={() => setPhase('PLAYING')}
                  className="w-full py-2.5 rounded-xl bg-[#2F7D6D] text-white font-bold text-sm cursor-pointer"
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="w-full py-2 rounded-xl bg-[#F3EBDD] border border-[#D6C4AC] text-[#3D312A] font-semibold text-sm cursor-pointer"
                >
                  Back to Room
                </button>
              </div>
            </div>
          )}

          {phase === 'SUMMARY' && (
            <div className="absolute inset-0 bg-[#3D312A]/45 flex flex-col items-center justify-center p-6">
              <div className="paper-card rounded-2xl p-6 text-center max-w-sm w-full space-y-4">
                <h4 className="font-display text-2xl font-bold text-[#3D312A]">Round Complete!</h4>
                <div className="paper-card-kraft rounded-xl p-4 flex justify-around">
                  <div>
                    <div className="text-xs text-[#6E5D52]">Score</div>
                    <div className="font-mono-num text-xl font-bold text-[#3D312A]">
                      {hudState.score}
                    </div>
                  </div>
                  <div className="w-px bg-[#D6C4AC]" />
                  <div>
                    <div className="text-xs text-[#6E5D52]">Coins Earned</div>
                    <div className="font-mono-num text-xl font-bold text-[#D99B26] flex items-center justify-center gap-1">
                      +{hudState.coins}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#2F7D6D] hover:bg-[#256659] text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>
                  <button
                    type="button"
                    onClick={onExit}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#F3EBDD] hover:bg-[#E8DCC8] border border-[#D6C4AC] text-[#3D312A] font-semibold text-sm cursor-pointer whitespace-nowrap"
                  >
                    Back to Room
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Touch Steering Pads (< md) */}
        <div className="md:hidden grid grid-cols-2 gap-2.5 p-2.5 bg-[#F3EBDD] border-t border-[#D6C4AC] shrink-0">
          <button
            type="button"
            onPointerDown={() => {
              touchSteerRef.current = -1;
            }}
            onPointerUp={() => {
              if (touchSteerRef.current === -1) touchSteerRef.current = 0;
            }}
            onPointerLeave={() => {
              if (touchSteerRef.current === -1) touchSteerRef.current = 0;
            }}
            onPointerCancel={() => {
              if (touchSteerRef.current === -1) touchSteerRef.current = 0;
            }}
            className="min-h-[50px] rounded-xl bg-[#FBF7F0] active:bg-[#E8DCC8] border-2 border-[#CEB99C] text-[#3D312A] font-bold text-sm flex items-center justify-center gap-1.5 touch-none select-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Move Left</span>
          </button>
          <button
            type="button"
            onPointerDown={() => {
              touchSteerRef.current = 1;
            }}
            onPointerUp={() => {
              if (touchSteerRef.current === 1) touchSteerRef.current = 0;
            }}
            onPointerLeave={() => {
              if (touchSteerRef.current === 1) touchSteerRef.current = 0;
            }}
            onPointerCancel={() => {
              if (touchSteerRef.current === 1) touchSteerRef.current = 0;
            }}
            className="min-h-[50px] rounded-xl bg-[#FBF7F0] active:bg-[#E8DCC8] border-2 border-[#CEB99C] text-[#3D312A] font-bold text-sm flex items-center justify-center gap-1.5 touch-none select-none cursor-pointer"
          >
            <span>Move Right</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
