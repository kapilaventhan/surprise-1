// Romantic Web Audio Synthesizer for ambient piano lullaby
class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volumeNode: GainNode | null = null;
  private timerId: number | null = null;
  private noteIndex: number = 0;

  // Soft romantic melody notes in Hz (Pentatonic / Major scale C5, D5, E5, G5, A5, C6)
  private melody = [
    523.25, 659.25, 783.99, 880.00, 1046.50, // C5, E5, G5, A5, C6
    880.00, 783.99, 659.25, 587.33, 523.25, // A5, G5, E5, D5, C5
    659.25, 783.99, 1046.50, 1174.66, 1046.50, // E5, G5, C6, D6, C6
    880.00, 783.99, 659.25, 523.25          // A5, G5, E5, C5
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = 0.3; // Gentle default volume
      this.volumeNode.connect(this.ctx.destination);
    }
  }

  public play() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) { // val between 0 and 1
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.volumeNode) return;

    const freq = this.melody[this.noteIndex % this.melody.length];
    this.noteIndex++;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm triangle/sine hybrid sound for soft romantic piano feel
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.15, now + 0.1); // Soft attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // Gentle decay

    osc.connect(noteGain);
    noteGain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 2.0);

    // Rhythm delay (varies for natural human feel)
    const delay = (this.noteIndex % 4 === 0) ? 900 : 450;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, delay);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticSynth = new RomanticAudioSynth();
