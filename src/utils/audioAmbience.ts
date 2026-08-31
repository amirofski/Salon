// Web Audio API ambient lounge generator for luxury salon immersion
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscNodes: (OscillatorNode | GainNode)[] = [];
let isPlaying = false;

export function toggleAudioAmbience(): boolean {
  if (typeof window === 'undefined') return false;

  if (isPlaying) {
    stopAudioAmbience();
    return false;
  } else {
    startAudioAmbience();
    return true;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export function startAudioAmbience() {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3); // Soft ambient volume
    masterGain.connect(audioCtx.destination);

    // Warm chords: Root (D3=146.83Hz), Fifth (A3=220Hz), Ninth (E4=329.63Hz), Major 7th (C#4=277.18Hz)
    const frequencies = [146.83, 220.0, 277.18, 329.63, 440.0];
    
    oscNodes = [];

    frequencies.forEach((freq, idx) => {
      if (!audioCtx || !masterGain) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Gentle frequency LFO for warm breathing movement
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.02, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      // Pan voices across stereo spectrum
      if (panner) {
        panner.pan.setValueAtTime((idx - 2) * 0.35, audioCtx.currentTime);
        gain.connect(panner);
        panner.connect(masterGain);
      } else {
        gain.connect(masterGain);
      }

      gain.gain.setValueAtTime(0.12 / frequencies.length, audioCtx.currentTime);
      osc.connect(gain);
      osc.start();

      oscNodes.push(osc, gain, lfo, lfoGain);
    });

    isPlaying = true;
  } catch (err) {
    console.warn('Audio context initialization postponed until user interaction:', err);
  }
}

export function stopAudioAmbience() {
  if (!audioCtx || !masterGain) {
    isPlaying = false;
    return;
  }

  try {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      oscNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof node.stop === 'function') {
            node.stop();
          }
          node.disconnect();
        } catch (e) {
          // ignore
        }
      });
      oscNodes = [];
      isPlaying = false;
    }, 1300);
  } catch (err) {
    isPlaying = false;
  }
}
