// Interactive Web Audio Sound Synthesizer
// Provides modern interactive audio feedback (car unlock chirp, engine hum, phone vibration buzz)
// Zero external mp3 dependencies, works instantly in browser with master volume control

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Double chirp (Keyless entry car unlock)
  playCarChirp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const playPulse = (startTime: number, freq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.3, startTime + 0.05);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.08);
      };

      playPulse(now, 1850);
      playPulse(now + 0.09, 2150);
    } catch {
      // Ignore audio policy errors
    }
  }

  // Smooth Engine Rumble / Throttle Purr
  playEnginePurr() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      osc.frequency.linearRampToValueAtTime(65, now + 0.6);

      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(32, now);
      sub.frequency.linearRampToValueAtTime(50, now + 0.3);
      sub.frequency.linearRampToValueAtTime(35, now + 0.6);

      // Low pass filter to keep it deep and pleasant
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.65);
      sub.stop(now + 0.65);
    } catch {
      // Ignore audio errors
    }
  }

  // Phone Buzzing / Haptic Notification simulation
  playPhoneBuzz() {
    // Hardware vibration if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 40, 60]);
      } catch {
        // Continue to audio fallback
      }
    }

    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const playBuzzPulse = (start: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Dual low frequencies to mimic mobile vibration motor
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, start);
        osc.frequency.linearRampToValueAtTime(125, start + 0.08);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.1);
      };

      playBuzzPulse(now);
      playBuzzPulse(now + 0.12);
    } catch {
      // Ignore audio errors
    }
  }

  // Subtle tactile tap / click feedback
  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundFX();
