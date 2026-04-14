import { useEffect, useState } from "react";
import Logo_TLOU_branca from "../public/Logo_TLOU_branca.png";

/**
 * Interface define as 'Props' (propriedades) que este componente recebe.
 * Em TypeScript, isso nos ajuda a evitar erros, garantindo que quem usa o componente
 * passe a função 'onFinished'.
 */
interface LoadingScreenProps {
  onFinished: () => void; // Uma função que não recebe nada e não retorna nada
}

function Loading_Screen({ onFinished }: LoadingScreenProps) {
  // O 'useState' cria variáveis que o React observa. Se o valor mudar, a tela atualiza.
  const [showLogo, setShowLogo] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);

  /**
   * O 'useEffect' lida com "efeitos colaterais" (coisas que acontecem fora do fluxo normal do HTML).
   * Este primeiro useEffect roda apenas UMA vez quando o componente nasce na tela (devido ao [] vazio).
   */
  useEffect(() => {
    // Controla o surgimento e sumiço da logo da Naughty Dog / TLOU
    setTimeout(() => setShowLogo(true), 1800);
    setTimeout(() => setHideLogo(true), 8000);

    // Começa a fazer a tela preta sumir (fade out)
    setTimeout(() => setFadeScreen(true), 10000);

    // Avisa o componente pai (App.tsx) que pode remover este componente da memória
    setTimeout(() => {
      onFinished();
    }, 12000); // 12s dá tempo de terminar a animação de fade (10s + 1.5s de CSS)
  }, [onFinished]);

  /**
   * Este segundo useEffect bloqueia cliques e teclas.
   * Ele observa o estado 'fadeScreen'. Quando a tela começar a sumir, ele desbloqueia a interação.
   */
  useEffect(() => {
    // Se a animação de sumir já começou, não bloqueamos mais nada
    if (fadeScreen) return;

    const handleInteraction = (e: Event) => {
      e.stopImmediatePropagation();
      e.preventDefault();
    };

    // Bloqueia no nível mais alto do navegador (Capture Phase: true)
    window.addEventListener("mousedown", handleInteraction, true);
    window.addEventListener("keydown", handleInteraction, true);
    window.addEventListener("click", handleInteraction, true);

    // FUNÇÃO DE LIMPEZA (Cleanup): Fundamental para não deixar "lixo" na memória
    return () => {
      window.removeEventListener("mousedown", handleInteraction, true);
      window.removeEventListener("keydown", handleInteraction, true);
      window.removeEventListener("click", handleInteraction, true);
    };
  }, [fadeScreen]); // Re-executa sempre que o fadeScreen mudar

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black transition-opacity duration-1500 ${
        fadeScreen ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={Logo_TLOU_branca}
        alt="Logo TLOU"
        className={`max-w-sm transition-all duration-1000 ${
          showLogo && !hideLogo ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default Loading_Screen;
