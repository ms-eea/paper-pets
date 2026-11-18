class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.09,
    delay = 0,
    slideToFreq?: number,
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideToFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    this.playTone(460, 0.055, 'triangle', 0.06, 0, 380);
  }

  playPop() {
    this.playTone(340, 0.09, 'sine', 0.08, 0, 580);
  }

  playLove() {
    this.playTone(523.25, 0.14, 'sine', 0.08, 0);
    this.playTone(659.25, 0.16, 'sine', 0.08, 0.07);
    this.playTone(783.99, 0.22, 'triangle', 0.07, 0.14);
  }

  playFeed() {
    this.playTone(320, 0.07, 'triangle', 0.08, 0, 420);
    this.playTone(440, 0.09, 'triangle', 0.08, 0.08, 520);
    this.playTone(587.33, 0.14, 'sine', 0.07, 0.16);
  }

  playCoin() {
    this.playTone(987.77, 0.08, 'sine', 0.07, 0);
    this.playTone(1318.51, 0.18, 'sine', 0.07, 0.06);
  }

  playCardFlip() {
    this.playTone(390, 0.06, 'triangle', 0.05, 0, 490);
  }

  playMatch() {
    this.playTone(587.33, 0.11, 'sine', 0.08, 0);
    this.playTone(880, 0.18, 'sine', 0.08, 0.07);
  }

  playError() {
    this.playTone(230, 0.14, 'sawtooth', 0.045, 0, 160);
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.18, 'triangle', 0.075, idx * 0.07);
    });
  }

  private playNoisePuff(duration = 0.28) {
    const ctx = this.getContext();
    if (!ctx) return;

    const sampleCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < sampleCount; i++) {
      channel[i] = (Math.random() * 2 - 1) * (1 - i / sampleCount);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(520, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1350, ctx.currentTime + duration);
    filter.Q.value = 1.6;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }

  playPetTrick(petId: 'rawr' | 'scorch' | 'trot' | 'buddybear' | 'catty' | 'douggie') {
    if (petId === 'rawr') {
      // Cute tiger cub "Rawr!" growl-chirp
      this.playTone(195, 0.14, 'sawtooth', 0.055, 0, 290);
      this.playTone(280, 0.16, 'triangle', 0.075, 0.08, 170);
      this.playTone(430, 0.09, 'sine', 0.055, 0.19, 520);
      return;
    }
    if (petId === 'scorch') {
      // Little flame whoosh & ember pop
      this.playNoisePuff(0.32);
      this.playTone(240, 0.12, 'triangle', 0.06, 0.02, 420);
      this.playTone(680, 0.08, 'sine', 0.045, 0.14, 920);
      return;
    }
    if (petId === 'trot') {
      // Cheerful harvest turkey warble trill
      const warble = [440, 560, 460, 590, 480];
      warble.forEach((f, idx) => {
        this.playTone(f, 0.08, 'triangle', 0.065, idx * 0.055);
      });
      return;
    }
    if (petId === 'buddybear') {
      // Warm cozy bear hug chord swell
      this.playTone(261.63, 0.34, 'sine', 0.06, 0);
      this.playTone(329.63, 0.34, 'sine', 0.05, 0.04);
      this.playTone(392.0, 0.38, 'triangle', 0.045, 0.08);
      return;
    }
    if (petId === 'catty') {
      // Soft purr pulse + bright musical chime
      this.playTone(150, 0.16, 'sine', 0.045, 0, 175);
      this.playTone(659.25, 0.11, 'sine', 0.06, 0.06);
      this.playTone(783.99, 0.12, 'sine', 0.06, 0.14);
      this.playTone(987.77, 0.18, 'triangle', 0.06, 0.22);
      return;
    }
    if (petId === 'douggie') {
      // Playful double puppy "Arf! Arf!" chirp-bark
      this.playTone(340, 0.09, 'triangle', 0.075, 0, 520);
      this.playTone(280, 0.07, 'sine', 0.05, 0.05, 190);
      this.playTone(370, 0.09, 'triangle', 0.075, 0.17, 560);
      this.playTone(300, 0.08, 'sine', 0.05, 0.22, 205);
    }
  }
}

export const sound = new SoundEngine();
