import { useEffect, useRef, useState } from "react";
import React from "react";
import VideoFullScreen from "./VideoFullScreen";
import History from "./History";
import Left_Behind from "./Left_Behind";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hoverId, setHoverId] = useState(1);
  const [currentPage, setCurrentPage] = useState('menu');

  const subText = [
    {
      id: 1,
      title: 'THE LAST OF US', text: 'Entenda a história de Joel e Ellie',
      page: 'History',
    },

    {
      id: 2,
      title: 'LEFT BEHIND',
      text: 'Descubra o passado de Ellie',
      page: 'Left_Behind',
    },

    {
      id: 3,
      title: 'OPTIONS',
      text: 'Ajuste as configurações de acordo com sua preferência',
      page: 'Options',
    },

    {
      id: 4,
      title: 'EXTRAS',
      text: 'Conteúdo Adicional'
    },

    {
      id: 5,
      title: 'QUIT TO DESKTOP',
      text: 'Sair do jogo'
    },
  ];

  useEffect(() => {
    const audio = new Audio("/Audio/Main_menu.mp3");
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;

    const handleAction = () => {
      if (audio.paused) {
        audio.play().catch(console.error);
      }

      if (isMenuOpen) return

      setIsMenuOpen(true);
    };

    document.addEventListener("keydown", handleAction);
    document.addEventListener("mousedown", handleAction);

    return () => {
      document.removeEventListener("keydown", handleAction);
      document.removeEventListener("mousedown", handleAction);
      audio.pause();
    };
  }, [isMenuOpen]);

  return (
    <>
      <VideoFullScreen />
      <div className="relative z-10 min-h-screen flex items-center justify-start pl-24">
        {!isMenuOpen ? (
          <div className="w-full flex justify-start">
            <h3 className="text-white/80 text-xl font-light tracking-[0.3em] animate-pulse uppercase select-none">
              Pressione qualquer tecla
            </h3>
          </div>
        ) : (
          // 2. SE FOR 'menu', mostra o menu. SENÃO, mostra o History.
          currentPage === 'menu' ? (
            <div className="flex flex-col gap-12 animate-in fade-in duration-1000 slide-in-from-left-8">
              <nav className="flex flex-col gap-4">
                {subText.map((item) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => setHoverId(item.id)}
                    onClick={() => setCurrentPage(item.page)} // Muda para 'History' ou mantém 'menu'
                    className={`text-left text-lg font-medium tracking-widest transition-all hover:scale-105 active:scale-95 group flex flex-col ${hoverId === item.id ? 'text-white' : 'text-white/50'
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
              <div className="max-w-xs h-12">
                <p className="text-white/40 text-sm font-light leading-relaxed animate-in fade-in duration-500" key={hoverId}>
                  {subText.find(item => item.id === hoverId)?.text}
                </p>
              </div>
            </div>
          ) : (
            // AQUI APARECE O HISTORY
            <div className="animate-in fade-in duration-700">
              <History />
              <button
                onClick={() => setCurrentPage('menu')}
                className="mt-8 text-white/30 hover:text-white transition-colors uppercase text-xs tracking-widest"
              >
                Voltar ao Menu
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
export default App;  
