// ── Global volume levels (0–1) ─────────────────────────────────
export let sfxVolume = 0.6;
export let musicVolume = 0.7;

// Reference to the main background music element, set by App.tsx
export let musicAudioRef: HTMLAudioElement | null = null;

export const registerMusicAudio = (audio: HTMLAudioElement) => {
  musicAudioRef = audio;
};

export const setSFXVolume = (v: number) => {
  sfxVolume = Math.max(0, Math.min(1, v));
};

export const setMusicVolume = (v: number) => {
  musicVolume = Math.max(0, Math.min(1, v));
  if (musicAudioRef) {
    musicAudioRef.volume = musicVolume;
  }
};

export const playSFX = (file: string) => {
  const sfx = new Audio(`./Audio/${file}`);
  sfx.volume = sfxVolume;
  sfx.currentTime = 0;
  sfx.play().catch((err) => {
    console.warn("SFX play failed:", file, err);
  });
};
