import { useEffect, useRef, useState } from "react";
import React from "react";
import VideoFullScreen from "./VideoFullScreen";
import History from "./History";
import Left_Behind from "./Left_Behind";
import Options from "./Options";
import Loading_Screen from "./Loading_Screen";
import Main_loading from "./Main_loading";
import { playSFX, registerMusicAudio } from "./utils/audio";
import Characters from "./Characters";
import QuitConfirm from "./Components/QuitConfirm";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Controle de estágios: 'initial' -> 'intro' -> 'menu'
  const [gameStage, setGameStage] = useState<"initial" | "intro" | "menu">(
    "initial",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverId, setHoverId] = useState(1);
  const [currentPage, setCurrentPage] = useState("menu");
  const [isExiting, setIsExiting] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Inicializa o áudio principal
  useEffect(() => {
    const audio = new Audio("./Audio/Main_menu.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;
    registerMusicAudio(audio);

    return () => audio.pause();
  }, []);

  // 1. Efeito para capturar teclado/clique na tela "Pressione para iniciar"
  useEffect(() => {
    const handleAction = () => {
      if (gameStage === "menu" && !isMenuOpen) {
        setIsMenuOpen(true);
        playSFX("menu_open.mp3"); // Som de abertura impactante
      }
    };

    window.addEventListener("keydown", handleAction);
    window.addEventListener("mousedown", handleAction);

    return () => {
      window.removeEventListener("keydown", handleAction);
      window.removeEventListener("mousedown", handleAction);
    };
  }, [gameStage, isMenuOpen]);

  // Lógica de saida gradual
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        window.close();
        if (!window.closed) {
          window.location.href = "about:blank";
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isExiting]);

  const handleStartGame = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    setGameStage("intro");
  };

  // Mapeamento das páginas internas do menu
  const PAGES: Record<string, React.ReactNode> = {
    History: <History />,
    Left_Behind: <Left_Behind />,
    Options: <Options />,
    CHARACTERS: <Characters />,
  };

  const subText = [
    {
      id: 1,
      title: "THE LAST OF US",
      text: "Entenda a história de Joel e Ellie",
      page: "History",
    },
    {
      id: 2,
      title: "LEFT BEHIND",
      text: "Descubra o passado de Ellie",
      page: "Left_Behind",
    },
    {
      id: 3,
      title: "CONFIGURAÇÕES",
      text: "Ajuste as configurações",
      page: "Options",
    },
    {
      id: 4,
      title: "PERSONAGENS",
      text: "Conheça Joel, Ellie e outros",
      page: "CHARACTERS",
    },
    { id: 5, title: "SAIR DO JOGO", text: "Sair do jogo" },
  ];

  return (
    <>
      {/* 1. TELA DE LOADING INICIAL (Com botão Iniciar) */}
      {gameStage === "initial" && <Main_loading onStart={handleStartGame} />}

      {/* 2. TELA DE LOADING DE 19s (Intro do jogo) */}
      {gameStage === "intro" && (
        <Loading_Screen onFinished={() => setGameStage("menu")} />
      )}

      <VideoFullScreen />

      <div className="relative z-10 min-h-screen flex items-center justify-start pl-24">
        {/* Overlay para cobrir a tela inteira quando em sub-páginas */}
        {currentPage !== "menu" && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-0 animate-in fade-in duration-700" />
        )}
        {/* Só mostra o conteúdo do menu se o estágio for 'menu' */}
        {gameStage === "menu" &&
          (!isMenuOpen ? (
            <div
              onMouseEnter={() => playSFX("Hover Sound.wav")}
              className="w-full flex justify-start cursor-pointer"
            >
              <h3 className="text-white/80 text-xl font-light tracking-[0.3em] animate-pulse animate-fade-in-up uppercase select-none">
                Pressione para iniciar
              </h3>
            </div>
          ) : currentPage === "menu" ? (
            <div className="flex flex-col gap-12 animate-in fade-in duration-1000 slide-in-from-left-8">
              <nav
                className="flex flex-col gap-4"
                onMouseLeave={() => setHoverId(0)}
              >
                {subText.map((item) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => {
                      if (hoverId !== item.id) {
                        setHoverId(item.id);
                        playSFX("Hover Sound.wav");
                      }
                    }}
                    onClick={() => {
                      playSFX("Click Sound.wav");
                      if (item.page) setCurrentPage(item.page);
                      else if (item.title === "SAIR DO JOGO")
                        setShowQuitConfirm(true);
                    }}
                    className={`text-left text-lg font-medium tracking-[0.2em] transition-all duration-300 px-8 py-3 border flex flex-col min-w-[320px] ${hoverId === item.id ? "bg-black/40 border-white/20 text-white" : "bg-transparent border-transparent text-white/50"}`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
              <div className="max-w-xs h-12">
                <p
                  className="text-white/40 text-sm font-light leading-relaxed animate-in fade-in duration-500"
                  key={hoverId}
                >
                  {subText.find((item) => item.id === hoverId)?.text}
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up duration-700 w-full max-w-4xl">
              {PAGES[currentPage] || (
                <div className="text-white/50 italic uppercase text-xl">
                  Conteúdo não encontrado
                </div>
              )}
              <button
                onMouseEnter={() => playSFX("Hover Sound.wav")}
                onClick={() => {
                  playSFX("Back Sound.wav");
                  setCurrentPage("menu");
                }}
                className="mt-12 group flex items-center gap-3 text-white/30 hover:text-white transition-all uppercase text-sm tracking-[0.2em] font-medium"
              >
                <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
                Voltar ao Menu
              </button>
            </div>
          ))}

        {/* Footer com créditos */}
        <footer className="fixed bottom-8 right-24 text-white/20 text-[10px] tracking-[0.2em] uppercase font-light">
          <p>© 2026 • DESENVOLVIDO POR GUILHERME SANT'ANA</p>
        </footer>

        {/* Camada de Fade out para sair do jogo */}
        <div
          className={`fixed inset-0 bg-black z-100 transition-opacity duration-3000 pointer-events-none ${isExiting ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {showQuitConfirm && (
        <QuitConfirm
          onConfirm={() => {
            setShowQuitConfirm(false);
            setIsExiting(true);
          }}
          onCancel={() => {
            setShowQuitConfirm(false);
          }}
        />
      )}
    </>
  );
}

export default App;
