/**
 * Saudi Royal Majlis Ambient Oud Melody Engine (Web Audio API)
 * Pure zero-static Arabian Maqam Bayati / Nahawand acoustic oud synthesizer
 * with warm hall echo delay and subtle velvet bass foundation.
 */

// Calm traditional Maqam Bayati on D melody sequence (frequency in Hz, duration beat)
const MAJLIS_MELODY = [
  { freq: 293.66, len: 1.4, vel: 0.9 }, // D4 (Qarar)
  { freq: 324.0, len: 0.9, vel: 0.75 }, // E-quarter-flat4 (Bayati)
  { freq: 349.23, len: 1.2, vel: 0.85 }, // F4
  { freq: 392.0, len: 1.6, vel: 0.95 }, // G4 (Nawa)
  { freq: 349.23, len: 0.85, vel: 0.75 }, // F4
  { freq: 324.0, len: 0.95, vel: 0.75 }, // E-quarter-flat4
  { freq: 293.66, len: 2.2, vel: 0.9 }, // D4 rest

  { freq: 392.0, len: 1.1, vel: 0.85 }, // G4
  { freq: 440.0, len: 1.3, vel: 0.9 }, // A4 (Husayni)
  { freq: 466.16, len: 1.0, vel: 0.8 }, // Bb4
  { freq: 440.0, len: 1.5, vel: 0.85 }, // A4
  { freq: 392.0, len: 1.0, vel: 0.8 }, // G4
  { freq: 349.23, len: 1.1, vel: 0.8 }, // F4
  { freq: 324.0, len: 0.9, vel: 0.7 }, // E-quarter-flat4
  { freq: 293.66, len: 2.8, vel: 0.95 }, // D4 resolve

  { freq: 220.0, len: 1.2, vel: 0.7 }, // A3 (low warm bridge)
  { freq: 261.63, len: 1.2, vel: 0.75 }, // C4
  { freq: 324.0, len: 1.1, vel: 0.8 }, // E-quarter-flat4
  { freq: 293.66, len: 2.4, vel: 0.9 }, // D4 home
];

class MajlisAmbianceEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.reverbBus = null;
    this.isPlaying = false;
    this.noteTimer = null;
    this.droneNodes = [];
    this.stepIndex = 0;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  _buildHallDelay(ctx, destination) {
    const input = ctx.createGain();
    input.gain.value = 1;

    // Direct warm path
    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.78;
    input.connect(dryGain);
    dryGain.connect(destination);

    // Stereo-feel dual tap warm Majlis hall reflection
    const delay1 = ctx.createDelay(1.0);
    delay1.delayTime.value = 0.34;
    const delay2 = ctx.createDelay(1.0);
    delay2.delayTime.value = 0.56;

    const dampFilter = ctx.createBiquadFilter();
    dampFilter.type = 'lowpass';
    dampFilter.frequency.value = 1150;

    const fb1 = ctx.createGain();
    fb1.gain.value = 0.28;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.32;

    input.connect(delay1);
    delay1.connect(dampFilter);
    dampFilter.connect(wetGain);
    dampFilter.connect(delay2);
    delay2.connect(fb1);
    fb1.connect(delay1);
    delay2.connect(wetGain);
    wetGain.connect(destination);

    return { input, cleanupNodes: [input, dryGain, delay1, delay2, dampFilter, fb1, wetGain] };
  }

  _pluckOudNote(freq, vel = 0.85, duration = 2.6) {
    if (!this.isPlaying || !this.ctx || !this.reverbBus) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    // Paired double-course Arabian oud strings with micro-detune richness
    const oscPrimary = ctx.createOscillator();
    const oscSympathetic = ctx.createOscillator();
    const oscOvertone = ctx.createOscillator();

    oscPrimary.type = 'triangle';
    oscPrimary.frequency.setValueAtTime(freq, t);

    oscSympathetic.type = 'sawtooth';
    oscSympathetic.frequency.setValueAtTime(freq * 1.0022, t);

    oscOvertone.type = 'sine';
    oscOvertone.frequency.setValueAtTime(freq * 2, t);

    // Acoustic wood-body warm resonance + pluck transient brightness decay
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.Q.value = 1.6;
    bodyFilter.frequency.setValueAtTime(Math.min(freq * 6.5, 2400), t);
    bodyFilter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.4, 280), t + 0.95);

    const g1 = ctx.createGain();
    g1.gain.value = 0.58;
    const g2 = ctx.createGain();
    g2.gain.value = 0.14;
    const g3 = ctx.createGain();
    g3.gain.value = 0.16;

    const env = ctx.createGain();
    const peak = 0.16 * vel;
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(peak, t + 0.018);
    env.gain.exponentialRampToValueAtTime(peak * 0.42, t + 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    oscPrimary.connect(g1);
    oscSympathetic.connect(g2);
    oscOvertone.connect(g3);
    g1.connect(bodyFilter);
    g2.connect(bodyFilter);
    g3.connect(bodyFilter);
    bodyFilter.connect(env);
    env.connect(this.reverbBus);

    oscPrimary.start(t);
    oscSympathetic.start(t);
    oscOvertone.start(t);

    oscPrimary.stop(t + duration + 0.05);
    oscSympathetic.stop(t + duration + 0.05);
    oscOvertone.stop(t + duration + 0.05);
  }

  async start() {
    const ctx = this._ensureContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }

    if (this.isPlaying) return true;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.65, now + 0.7);
    masterGain.connect(ctx.destination);
    this.masterGain = masterGain;

    const hall = this._buildHallDelay(ctx, masterGain);
    this.reverbBus = hall.input;

    // Gentle warm velvet octave drone underneath (pure sine waves, zero static hiss)
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.032, now);
    padGain.connect(masterGain);

    const padOsc1 = ctx.createOscillator();
    padOsc1.type = 'sine';
    padOsc1.frequency.setValueAtTime(146.83, now); // D3

    const padOsc2 = ctx.createOscillator();
    padOsc2.type = 'sine';
    padOsc2.frequency.setValueAtTime(220.0, now); // A3 fifth

    const gPad2 = ctx.createGain();
    gPad2.gain.value = 0.55;

    padOsc1.connect(padGain);
    padOsc2.connect(gPad2);
    gPad2.connect(padGain);
    padOsc1.start(now);
    padOsc2.start(now);

    this.droneNodes = [padOsc1, padOsc2, padGain, gPad2, ...hall.cleanupNodes];
    this.isPlaying = true;
    this.stepIndex = 0;

    const scheduleNext = () => {
      if (!this.isPlaying) return;
      const step = MAJLIS_MELODY[this.stepIndex % MAJLIS_MELODY.length];
      this.stepIndex += 1;

      this._pluckOudNote(step.freq, step.vel, Math.max(2.2, step.len * 1.45));

      this.noteTimer = setTimeout(scheduleNext, step.len * 1150);
    };

    scheduleNext();
    return true;
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.noteTimer) {
      clearTimeout(this.noteTimer);
      this.noteTimer = null;
    }

    const ctx = this.ctx;
    const masterGain = this.masterGain;
    const oldNodes = [...this.droneNodes];
    this.droneNodes = [];
    this.reverbBus = null;
    this.masterGain = null;

    if (ctx && masterGain) {
      const now = ctx.currentTime;
      try {
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value || 0.3, now);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      } catch {
        // Ignore ramp errors
      }

      setTimeout(() => {
        oldNodes.forEach((node) => {
          try {
            if (typeof node.stop === 'function') node.stop();
            node.disconnect();
          } catch {
            // Already stopped
          }
        });
        try {
          masterGain.disconnect();
        } catch {
          // Ignore
        }
      }, 420);
    }
  }
}

export const majlisAudio = new MajlisAmbianceEngine();
