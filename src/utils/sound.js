import quizConfig from '../config/quizConfig';

const noop = () => {};
const MAX_VOLUME = 0.5;

// Built-in sounds: soft triangle-wave notes with gentle fade-in/out (never a sudden blast).
const SYNTH_SOUNDS = {
  // Rising C–E–G "ta-da!"
  correct: [
    { freq: 523.25, start: 0, dur: 0.14 },
    { freq: 659.25, start: 0.11, dur: 0.14 },
    { freq: 783.99, start: 0.22, dur: 0.32 },
  ],
  // Descending "wah-wah-wah-waaah" sad trombone
  wrong: [
    { freq: 392.0, start: 0, dur: 0.3, slideTo: 380 },
    { freq: 370.0, start: 0.32, dur: 0.3, slideTo: 358 },
    { freq: 349.23, start: 0.64, dur: 0.3, slideTo: 338 },
    { freq: 329.63, start: 0.96, dur: 0.75, slideTo: 300, vibrato: true },
  ],
};

let audioContext = null;

function getAudioContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioContext) audioContext = new Ctx();
  if (audioContext.state === 'suspended') audioContext.resume().catch(noop);
  return audioContext;
}

function playSynth(notes, volume) {
  const ctx = getAudioContext();
  if (!ctx) return noop;

  const now = ctx.currentTime + 0.02;
  const nodes = notes.map(({ freq, start, dur, slideTo, vibrato }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t0 = now + start;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.linearRampToValueAtTime(slideTo, t0 + dur);

    let lfo = null;
    if (vibrato) {
      lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 6;
      lfoGain.gain.value = 8;
      lfo.connect(lfoGain).connect(osc.frequency);
      lfo.start(t0);
      lfo.stop(t0 + dur + 0.05);
    }

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
    return { osc, lfo };
  });

  return () => {
    nodes.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        lfo?.stop();
      } catch {
        // already stopped
      }
    });
  };
}

/**
 * Plays a reaction sound ('correct' | 'wrong') if sound is enabled.
 * Returns a function that stops it (handy as a useEffect cleanup).
 */
export function playSound(name, config = quizConfig) {
  const { sound } = config;
  if (!sound?.enabled || typeof window === 'undefined') return noop;

  const volume = Math.min(MAX_VOLUME, Math.max(0.0001, sound.volume ?? 0.2));
  const file = sound.files?.[name];

  if (file) {
    const audio = new Audio(file);
    audio.volume = volume;
    audio.play().catch(noop);
    return () => audio.pause();
  }

  const notes = SYNTH_SOUNDS[name];
  return notes ? playSynth(notes, volume) : noop;
}
