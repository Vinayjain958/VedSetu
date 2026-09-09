// Vedic Web Audio Synthesizer for "Jai Dev Jai Dev" Ganesh Aarti & Temple Atmosphere

interface Note {
  freq: number;
  duration: number; // in beats
  lyrics: string;
  hindiLyrics: string;
}

// Frequencies for C4 base (Sa = C4 = 261.63Hz)
const E4 = 329.63;
const G4 = 392.00;
const A4 = 440.00;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;

// "Jai Dev Jai Dev Jai Mangal Murti" Melodic Structure
export const AARTI_MELODY: Note[] = [
  // Sukh karta dukh harta varta vighnachi
  { freq: G4, duration: 0.6, lyrics: "Sukh-kar-ta", hindiLyrics: "सुखकर्ता" },
  { freq: G4, duration: 0.6, lyrics: "Dukh-har-ta", hindiLyrics: "दुःखहर्ता" },
  { freq: A4, duration: 0.6, lyrics: "Var-ta", hindiLyrics: "वार्ता" },
  { freq: G4, duration: 0.6, lyrics: "Vigh-na-chi", hindiLyrics: "विघ्नाची" },
  
  // Nurvi purvi prem krupa jayachi
  { freq: E4, duration: 0.6, lyrics: "Nur-vi", hindiLyrics: "नुरवी" },
  { freq: G4, duration: 0.6, lyrics: "Pur-vi", hindiLyrics: "पुरवी" },
  { freq: A4, duration: 0.6, lyrics: "Prem", hindiLyrics: "प्रेम" },
  { freq: G4, duration: 0.8, lyrics: "Kru-pa Ja-ya-chi", hindiLyrics: "कृपा जयाची" },

  // Sarvangi sundar uti shendurachi
  { freq: C5, duration: 0.6, lyrics: "Sar-van-gi", hindiLyrics: "सर्वांगी" },
  { freq: C5, duration: 0.6, lyrics: "Sun-dar", hindiLyrics: "सुंदर" },
  { freq: D5, duration: 0.6, lyrics: "U-ti", hindiLyrics: "उटी" },
  { freq: C5, duration: 0.6, lyrics: "Shen-du-ra-chi", hindiLyrics: "शेंदुराची" },

  // Kanthi jhalake maal muktaphalanchi
  { freq: A4, duration: 0.6, lyrics: "Kan-thi", hindiLyrics: "कंठी" },
  { freq: C5, duration: 0.6, lyrics: "Jhal-ke", hindiLyrics: "झळके" },
  { freq: D5, duration: 0.6, lyrics: "Maal", hindiLyrics: "माळ" },
  { freq: C5, duration: 0.8, lyrics: "Muk-ta-pha-lan-chi", hindiLyrics: "मुक्ताफळांची" },

  // CHORUS: Jai Dev Jai Dev Jai Mangal Murti
  { freq: G4, duration: 0.7, lyrics: "JAI DEV", hindiLyrics: "जय देव" },
  { freq: G4, duration: 0.7, lyrics: "JAI DEV", hindiLyrics: "जय देव" },
  { freq: C5, duration: 0.6, lyrics: "JAI", hindiLyrics: "जय" },
  { freq: D5, duration: 0.6, lyrics: "MAN-GAL", hindiLyrics: "मंगल" },
  { freq: E5, duration: 1.0, lyrics: "MUR-TI", hindiLyrics: "मूर्ति" },

  // Darshan matre man kamana purti
  { freq: D5, duration: 0.6, lyrics: "Dar-shan", hindiLyrics: "दर्शन" },
  { freq: C5, duration: 0.6, lyrics: "Ma-tre", hindiLyrics: "मात्रे" },
  { freq: A4, duration: 0.6, lyrics: "Man Ka-ma-na", hindiLyrics: "मन कामना" },
  { freq: G4, duration: 0.8, lyrics: "PUR-TI", hindiLyrics: "पूर्ती" },

  // Jai Dev Jai Dev
  { freq: A4, duration: 0.7, lyrics: "JAI DEV", hindiLyrics: "जय देव" },
  { freq: G4, duration: 1.2, lyrics: "JAI DEV", hindiLyrics: "जय देव ॥" },
];

export class VedicAartiEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;
  private onNoteChange?: (note: Note, index: number) => void;
  private onStateChange?: (isPlaying: boolean) => void;

  constructor(
    onNoteChange?: (note: Note, index: number) => void,
    onStateChange?: (isPlaying: boolean) => void
  ) {
    this.onNoteChange = onNoteChange;
    this.onStateChange = onStateChange;
  }

  private initAudio() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Play a metallic resonant temple bell chime (Ghanti)
  public playTempleBell(pitchMultiplier = 1.0) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Metallic harmonics for temple bronze ghanti
    const partials = [
      { freq: 1480 * pitchMultiplier, gain: 0.3, decay: 1.8 },
      { freq: 2200 * pitchMultiplier, gain: 0.2, decay: 1.2 },
      { freq: 2950 * pitchMultiplier, gain: 0.15, decay: 0.9 },
      { freq: 4100 * pitchMultiplier, gain: 0.1, decay: 0.6 },
    ];

    partials.forEach(({ freq, gain, decay }) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      g.gain.setValueAtTime(gain, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  // Play Kartal / Manjira rhythmic click
  public playManjira() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200, now);
    osc.frequency.exponentialRampToValueAtTime(2800, now + 0.15);

    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Play a harmonium / devotional reed note
  private playMelodyNote(freq: number, durationSec: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Rich Harmonium timbre using dual oscillators (Sawtooth + Sine)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Harmonium warm filtered reed sound
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight chorus detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.linearRampToValueAtTime(1800, now + 0.1);
    filter.frequency.exponentialRampToValueAtTime(1000, now + durationSec);

    // Envelope (soft attack, sustained, smooth release)
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.25, now + 0.06);
    noteGain.gain.setValueAtTime(0.22, now + durationSec - 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec);
    osc2.stop(now + durationSec);
  }

  // Start the background Tanpura drone
  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.12, now + 2.0);
    this.droneGain.connect(this.masterGain);

    // Root C3 (130.81Hz) + Pa G3 (196Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(130.81, now);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(196.00, now);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(350, now);

    this.droneOsc1.connect(droneFilter);
    this.droneOsc2.connect(droneFilter);
    droneFilter.connect(this.droneGain);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
  }

  // Stop Tanpura drone
  private stopTanpuraDrone() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneGain?.disconnect();
        } catch {
          // ignore already stopped
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
      }, 500);
    }
  }

  // Sequencer loop for the Aarti
  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const note = AARTI_MELODY[this.currentNoteIndex];
    const beatDuration = note.duration * 0.95; // seconds
    
    // Play note
    this.playMelodyNote(note.freq, beatDuration);

    // Rhythmic kartal / temple bell on key beats
    if (this.currentNoteIndex % 2 === 0) {
      this.playManjira();
    }
    if (
      note.lyrics === "JAI DEV" || 
      note.lyrics === "MUR-TI" || 
      note.lyrics === "PUR-TI" ||
      this.currentNoteIndex === 0
    ) {
      this.playTempleBell(note.freq > 500 ? 1.2 : 1.0);
    }

    // Trigger UI updates for live lyrics
    if (this.onNoteChange) {
      this.onNoteChange(note, this.currentNoteIndex);
    }

    // Step to next note
    this.currentNoteIndex = (this.currentNoteIndex + 1) % AARTI_MELODY.length;

    // Schedule next beat
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, beatDuration * 1000);
  }

  // Public Start / Stop
  public start() {
    this.initAudio();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startTanpuraDrone();
    this.playTempleBell(0.85); // opening deep temple bell chime
    
    setTimeout(() => {
      this.playTempleBell(1.15);
      this.scheduleNextNote();
    }, 400);

    if (this.onStateChange) {
      this.onStateChange(true);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.stopTanpuraDrone();
    if (this.onStateChange) {
      this.onStateChange(false);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
