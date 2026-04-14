import { useEffect } from "react";
import { playSFX } from "../utils/audio";
import { motion } from "framer-motion";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function QuitConfirm({ onConfirm, onCancel }: Props) {
  // Suporte a teclado: Enter = Confirmar, Escape = Cancelar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        playSFX("Click Sound.wav");
        onConfirm();
      }
      if (e.key === "Escape") {
        playSFX("Back Sound.wav");
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onConfirm, onCancel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0.5, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-[800px] bg-black/95 border-y border-white/5 py-12 px-12 flex flex-col gap-10 shadow-2xl relative"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-xl font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              Sair do jogo
            </h2>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>
          <p className="text-white/40 text-lg tracking-widest font-light pl-1">
            Você tem certeza que deseja sair do jogo?
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Buttons Section */}
        <div className="flex justify-end items-center gap-8 pr-4">
          <button
            onMouseEnter={() => playSFX("Hover Sound.wav")}
            onClick={() => {
              playSFX("Click Sound.wav");
              onConfirm();
            }}
            className="group relative px-6 py-2 transition-all duration-200 outline-none"
          >
            <span className="text-white/40 group-hover:text-white text-lg font-medium tracking-[0.2em] uppercase transition-colors">
              Sim
            </span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-200" />
          </button>

          <button
            onMouseEnter={() => playSFX("Hover Sound.wav")}
            onClick={() => {
              playSFX("Back Sound.wav");
              onCancel();
            }}
            className="group relative px-6 py-2 transition-all duration-200 outline-none"
          >
            <span className="text-white/40 group-hover:text-white text-lg font-medium tracking-[0.2em] uppercase transition-colors">
              Não
            </span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-200" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
