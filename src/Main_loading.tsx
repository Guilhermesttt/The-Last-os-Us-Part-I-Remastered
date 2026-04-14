import { useState, useEffect } from "react";
import Grainient from "./Components/Gradient";

import { playSFX } from "./utils/audio";

interface MainMenuLoadingProps {
  onStart: () => void;
}

const Main_loading = ({ onStart }: MainMenuLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simula o carregamento dos assets do jogo
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Fundo com efeito Grainient */}
      <div className="absolute inset-0 opacity-60">
        <Grainient
          color1="#223022"
          color2="#2b352a"
          color3="#5C4635"
          timeSpeed={0.2}
          blendSoftness={0.4}
          grainAmount={0.15}
          grainAnimated={true}
          contrast={1.4}
          zoom={0.8}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1
          onMouseEnter={() => playSFX("Hover Sound.wav")}
          className="text-white text-5xl font-bold tracking-[0.4em] mb-4 cursor-default w-fit pointer-events-auto"
        >
          THE LAST OF US
        </h1>

        {!isLoaded ? (
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : (
          <button
            onMouseEnter={() => playSFX("Hover Sound.wav")}
            onClick={() => {
              playSFX("Click Sound.wav");
              onStart();
            }}
            className="animate-fade-in-up px-16 py-4 border border-white/10 text-white/80 tracking-[0.4em] hover:bg-black/40 hover:border-white/40 hover:text-white transition-all duration-300 uppercase text-xs font-medium"
          >
            Iniciar Jornada
          </button>
        )}
      </div>
    </div>
  );
};

export default Main_loading;
