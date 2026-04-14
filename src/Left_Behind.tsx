import { useState } from "react";
import { playSFX } from "./utils/audio";
import TiltedCard from "./Components/ReactBits/TiltedCard";

interface Section {
  id: string;
  label: string;
  tag: string;
}

const sections: Section[] = [
  { id: "overview", label: "Visão Geral", tag: "01" },
  { id: "riley", label: "Riley Abel", tag: "02" },
  { id: "mall", label: "O Shopping", tag: "03" },
  { id: "memories", label: "Memórias", tag: "04" },
];

const photos = [
  {
    src: "/Characters/Ellie e Riley.webp",
    caption: "Ellie & Riley",
  },
  {
    src: "/Characters/The Mall.webp",
    caption: "The Mall",
  },
  {
    src: "/Characters/Riley.webp",
    caption: "Innocence",
  },
  {
    src: "/Characters/Ellie.webp",
    caption: "Memories",
  },
];

const content: Record<string, React.ReactNode> = {
  overview: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          DLC • 2014
        </p>
        <h2 className="text-white text-2xl font-bold tracking-[0.15em] uppercase">
          Left Behind
        </h2>
      </div>

      <div className="h-px bg-white/10" />

      <blockquote className="border-l-2 border-white/20 pl-5">
        <p className="text-white/40 text-sm italic leading-relaxed tracking-wide">
          "Riley... don't go."
        </p>
      </blockquote>

      <div className="space-y-5 text-white/50 text-sm leading-loose max-h-[38vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        <p>
          Left Behind intercala duas narrativas distintas: o presente de Ellie,
          enquanto ela busca suprimentos médicos para salvar Joel gravemente
          ferido em um shopping abandonado no Colorado, e seu passado com Riley
          Abel — sua melhor amiga.
        </p>
        <p>
          Três semanas antes de conhecer Joel, Ellie é surpreendida pelo retorno
          de Riley, que havia desaparecido para se juntar aos Vagalumes. As duas
          embarcam em uma última aventura noturna, redescobrindo a amizade em
          meio ao mundo devastado.
        </p>
        <p>
          É uma história de amor, perda e o momento exato em que a infância de
          Ellie termina abruptamente.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { label: "Ano de Lançamento", value: "2014" },
          { label: "Duração Média", value: "~3h" },
          { label: "Plataforma", value: "PS4/PS5/PC" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-white/10 p-4 bg-black/20 text-center"
          >
            <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase mb-1">
              {s.label}
            </p>
            <p className="text-white text-sm font-bold tracking-widest">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),

  riley: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Foto + Bio */}
      <div className="flex gap-10 items-start">
        <div className="shrink-0">
          <TiltedCard
            imageSrc="/Characters/Riley.webp"
            altText="Riley Abel"
            caption="Vagalume"
          />
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
            Personagem Central
          </p>
          <h2 className="text-white text-3xl font-bold tracking-widest uppercase">
            Riley Abel
          </h2>
          <p className="text-white/30 text-xs tracking-widest uppercase">
            Vagalume • Melhor Amiga
          </p>
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Vínculo", value: "Amiga" },
          { label: "Facção", value: "Vagalumes" },
          { label: "Status", value: "???" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-white/10 p-4 bg-black/20 text-center"
          >
            <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase mb-1">
              {s.label}
            </p>
            <p className="text-white text-sm font-bold tracking-widest">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[
          {
            title: "A Partida",
            desc: "Riley desapareceu sem aviso para se juntar aos Vagalumes, deixando Ellie para trás.",
          },
          {
            title: "O Retorno",
            desc: "Semanas depois, Riley volta clandestinamente para uma última noite com Ellie.",
          },
          {
            title: "A Promessa",
            desc: "As duas fazem uma escolha devastadora juntas no fim da noite — e nunca mais serão as mesmas.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 border-l border-white/10 pl-5 py-2"
          >
            <div>
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1">
                {item.title}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  mall: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          Cenário
        </p>
        <h2 className="text-white text-2xl font-bold tracking-[0.15em] uppercase">
          O Shopping Abandonado
        </h2>
      </div>

      <div className="h-px bg-white/10" />

      <div className="space-y-4">
        {[
          {
            tag: "01",
            title: "Loja de Halloween",
            desc: "Máscaras, fantasias e um momento de leveza rara num mundo destruído.",
          },
          {
            tag: "02",
            title: "Fliperama",
            desc: "Jogos de arcade funcionando na escuridão — um lampejo do mundo antigo.",
          },
          {
            tag: "03",
            title: "Carrossel",
            desc: "O coração emocional da noite. Um momento de paz antes do inevitável.",
          },
          {
            tag: "04",
            title: "Loja de Animais",
            desc: "Um encontro inesperado que alivia a tensão entre as duas.",
          },
        ].map((item) => (
          <div key={item.tag} className="flex gap-5 items-start">
            <span className="text-white/15 font-mono text-[10px] tracking-widest pt-0.5 w-5">
              {item.tag}
            </span>
            <div className="flex-1 border-b border-white/5 pb-4">
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1">
                {item.title}
              </p>
              <p className="text-white/35 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  memories: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          Galeria
        </p>
        <h2 className="text-white text-2xl font-bold tracking-[0.15em] uppercase">
          Memórias
        </h2>
      </div>

      <div className="h-px bg-white/10" />

      <div className="flex flex-wrap gap-5 justify-start items-start pt-2">
        {photos.map((photo, index) => (
          <TiltedCard
            key={index}
            imageSrc={photo.src}
            caption={photo.caption}
            className="w-58"
          />
        ))}
      </div>

      <blockquote className="border-l-2 border-white/15 pl-5 mt-4">
        <p className="text-white/30 text-xs italic leading-relaxed tracking-widest uppercase">
          "Eu escolho ficar." — Riley Abel
        </p>
      </blockquote>
    </div>
  ),
};

export default function Left_Behind() {
  const [active, setActive] = useState("overview");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl flex gap-0 animate-in fade-in duration-700 min-h-[60vh]">
      {/* ── Lateral Menu ── */}
      <nav className="flex flex-col min-w-[220px] border-r border-white/10 pr-0">
        <div className="pb-6 mb-2">
          <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase mb-1">
            DLC
          </p>
          <h1 className="text-white text-sm font-bold tracking-[0.3em] uppercase">
            Left Behind
          </h1>
        </div>

        <div className="h-px bg-white/10 mb-4" />

        {sections.map((section) => {
          const isActive = active === section.id;
          const isHovered = hovered === section.id;

          return (
            <button
              key={section.id}
              onMouseEnter={() => {
                setHovered(section.id);
                if (!isActive) playSFX("Hover Sound.wav");
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (!isActive) {
                  playSFX("Click Sound.wav");
                  setActive(section.id);
                }
              }}
              className={`
                group relative flex items-center gap-4 py-4 pr-6 text-left
                transition-all duration-200
                ${isActive ? "border-r-2 border-white" : "border-r-2 border-transparent"}
              `}
            >
              <span
                className={`
                text-[9px] tracking-[0.3em] font-mono transition-colors duration-200 w-5 text-right
                ${isActive || isHovered ? "text-white/40" : "text-white/15"}
              `}
              >
                {section.tag}
              </span>

              <span
                className={`
                text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200
                ${isActive ? "text-white" : isHovered ? "text-white/70" : "text-white/30"}
              `}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Content Area ── */}
      <div className="flex-1 pl-12 pt-1">{content[active]}</div>
    </div>
  );
}
