import VideoFullScreen from "./src/VideoFullScreen";

function App() {
  return (
    <>
      <VideoFullScreen />

      {/* Seu conteúdo fica por cima do vídeo */}
      <div className="relative z-10 min-h-screen">
        {/* Aqui vai seu header, textos, botões, etc. */}
        <h1 className="text-white text-5xl">Bem-vindo ao The Last of Us</h1>
      </div>
    </>
  );
}
