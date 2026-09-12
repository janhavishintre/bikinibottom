// Web Audio API Sound Synthesizer for Undersea Sound Effects

class SoundFX {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private bgmOscs: OscillatorNode[] = [];
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Underwater bubble popping sound effect
  playBubblePop(pitchMod: number = 1.0) {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = (400 + Math.random() * 300) * pitchMod;
      osc.frequency.setValueAtTime(baseFreq, now);
      // Pitch sweeps upward rapidly like a bursting bubble
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore audio failure
    }
  }

  // Chest unlock / victory golden chime
  playTreasureChime() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);

        const startTime = now + index * 0.07;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Submarine sonar ping
  playSonarPing() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch {
      // Ignore audio failure
    }
  }

  // Tropical Undersea Ambient Lofi Drone / Marimba loop
  toggleBgm(enable: boolean, onStateChange?: (playing: boolean) => void) {
    try {
      const ctx = this.initCtx();
      if (!enable) {
        if (this.bgmGain) {
          this.bgmGain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
          setTimeout(() => {
            this.bgmOscs.forEach(o => {
              try { o.stop(); o.disconnect(); } catch {}
            });
            this.bgmOscs = [];
            this.bgmGain = null;
          }, 300);
        }
        this.isBgmPlaying = false;
        if (onStateChange) onStateChange(false);
        return false;
      }

      // Start gentle tropical ambient chords
      const chordNotes = [261.63, 329.63, 392.00, 523.25]; // C Major
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      this.bgmGain = masterGain;

      this.bgmOscs = chordNotes.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle vibrato LFO
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.5 + i * 0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(3.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(masterGain);
        osc.start();
        return osc;
      });

      this.isBgmPlaying = true;
      if (onStateChange) onStateChange(true);
      return true;
    } catch {
      return false;
    }
  }

  getBgmStatus() {
    return this.isBgmPlaying;
  }
}

export const soundFx = new SoundFX();
