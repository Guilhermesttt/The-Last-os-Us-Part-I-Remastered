import { playSFX, setSFXVolume, setMusicVolume } from "./utils/audio";
import { useState, useCallback } from "react";

/* ── Thin TLOU-style slider ───────────────────────────────────── */
interface TLOUSliderProps {
  value: number;
  onChange: (v: number) => void;
}

const TLOUSlider = ({ value, onChange }: TLOUSliderProps) => (
  <div className="relative flex items-center w-full h-[3px] group">
    {/* track */}
    <div className="absolute inset-0 bg-white/15 rounded-none" />
    {/* fill */}
    <div
      className="absolute left-0 top-0 h-full bg-white/75 rounded-none transition-none"
      style={{ width: `${value}%` }}
    />
    {/* thumb */}
    <div
      className="absolute w-[10px] h-[10px] bg-white rounded-full -translate-x-1/2 shadow-[0_0_4px_rgba(255,255,255,0.4)]"
      style={{ left: `${value}%` }}
    />
    {/* invisible range input for interaction */}
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
);

/* ── Volume row ───────────────────────────────────────────────── */
interface VolumeRowProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  description: string;
}

const VolumeRow = ({ label, value, onChange, description }: VolumeRowProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-6">
      {/* label */}
      <span className="text-white/55 text-[11px] tracking-[0.3em] uppercase w-44 shrink-0">
        {label}
      </span>
      {/* numeric value */}
      <span className="text-white/80 font-mono text-sm tracking-widest w-10 text-right shrink-0">
        {value}
      </span>
      {/* slider */}
      <div className="flex-1">
        <TLOUSlider value={value} onChange={onChange} />
      </div>
    </div>
    <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase pl-0 leading-loose">
      {description}
    </p>
  </div>
);

/* ── Options page ─────────────────────────────────────────────── */
const Options = () => {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [musicVol, setMusicVol] = useState(50);
  const [sfxVol, setSfxVol] = useState(60);

  const handleMusicChange = useCallback((v: number) => {
    setMusicVol(v);
    setMusicVolume(v / 100);
  }, []);

  const handleSFXChange = useCallback((v: number) => {
    setSfxVol(v);
    setSFXVolume(v / 100);
  }, []);

  const menuItems = ["Controles", "Vídeo", "HUD", "Interface", "Dificuldade", "Áudio"];

  return (
    <div className="animate-in fade-in zoom-in duration-700 p-12 border-l border-white/5 flex gap-32 items-start">

      {/* ── Lista de opções ── */}
      <div className="flex flex-col w-72">
        <h1
          onMouseEnter={() => playSFX("Hover Sound.wav")}
          className="text-4xl font-bold text-white mb-10 uppercase tracking-widest cursor-default w-fit pointer-events-auto"
        >
          Configurações
        </h1>

        {menuItems.map((opt) => (
          <div
            key={opt}
            onMouseEnter={() => playSFX("Hover Sound.wav")}
            onClick={() => {
              playSFX("Click Sound.wav");
              setActiveOption(opt === activeOption ? null : opt);
            }}
            className={`flex items-center px-6 py-4 border transition-all duration-300 cursor-pointer
              ${
                activeOption === opt
                  ? "border-white/20 bg-black/40 text-white"
                  : "border-transparent hover:bg-black/40 hover:border-white/20 text-white/50 hover:text-white"
              }`}
          >
            <span className="text-xl uppercase tracking-widest">{opt}</span>
          </div>
        ))}
      </div>

      {/* ── Painel Áudio ── */}
      {activeOption === "Áudio" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 min-w-[480px]">

          {/* Header */}
          <div className="flex flex-col gap-1 mb-8">
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
              Configuração
            </p>
            <h2 className="text-white text-3xl font-bold tracking-[0.15em] uppercase">
              Áudio
            </h2>
          </div>

          {/* Section: VOLUMES */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white/30 text-[10px] tracking-[0.45em] uppercase shrink-0">
                Volumes
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="flex flex-col gap-8">
              <VolumeRow
                label="Volume da Música"
                value={musicVol}
                onChange={handleMusicChange}
                description="Ajusta o volume da trilha sonora durante o jogo"
              />

              <div className="h-px bg-white/5" />

              <VolumeRow
                label="Efeitos Sonoros"
                value={sfxVol}
                onChange={handleSFXChange}
                description="Ajusta o volume dos sons de interface e botões"
              />
            </div>
          </div>

        </div>
      )}

      {/* ── Painel placeholder ── */}
      {activeOption && activeOption !== "Áudio" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 min-w-[480px]">
          <div className="flex flex-col gap-1 mb-8">
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
              Configuração
            </p>
            <h2 className="text-white text-3xl font-bold tracking-[0.15em] uppercase">
              {activeOption}
            </h2>
          </div>
          <div className="h-px bg-white/10 mb-8" />
          <p className="text-white/20 text-sm tracking-widest uppercase">
            Em breve...
          </p>
        </div>
      )}
    </div>
  );
};

export default Options;
