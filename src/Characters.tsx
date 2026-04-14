import { useState } from "react";
import { playSFX } from "./utils/audio";
import TiltedCard from "./Components/ReactBits/TiltedCard";
import SpotlightCard from "./Components/ReactBits/SpotlightCard";
import SplitText from "./Components/ReactBits/SplitText";
import BlurText from "./Components/ReactBits/BlurText";

interface Character {
  id: string;
  tag: string;
  name: string;
  role: string;
  faction: string;
  status: string;
  location: string;
  description: string;
  quote: string;
  image: string;
  stats: { label: string; value: string }[];
}

const characters: Character[] = [
  {
    id: "joel",
    tag: "01",
    name: "Joel Miller",
    role: "Protagonista",
    faction: "Independente",
    status: "Ativo",
    location: "Boston QZ",
    description:
      "Endurecido por décadas de perda e sobrevivência brutal, Joel carrega o peso de escolhas impossíveis. Antes um pai amoroso, o colapso da civilização moldou nele um homem implacável — capaz de qualquer coisa para proteger quem ama.",
    quote: "You have no idea what loss is.",
    image: "/Characters/Joel.webp",
    stats: [
      { label: "Idade", value: "56" },
      { label: "Origem", value: "Texas" },
      { label: "Função", value: "Contrabando" },
      { label: "Condição", value: "Saudável" },
    ],
  },
  {
    id: "ellie",
    tag: "02",
    name: "Ellie Williams",
    role: "Protagonista",
    faction: "Vagalumes",
    status: "Imune",
    location: "Boston QZ",
    description:
      "A primeira pessoa conhecida a ser naturalmente imune ao Cordyceps. Nascida após o colapso, Ellie só conheceu o mundo como ele é — mas carrega uma curiosidade e humanidade raras. Sua imunidade pode ser a chave para uma cura.",
    quote: "I guess no matter how hard you try, you can't escape your past.",
    image: "/Characters/Ellie.webp",
    stats: [
      { label: "Idade", value: "14" },
      { label: "Origem", value: "Boston QZ" },
      { label: "Função", value: "Sobrevivente" },
      { label: "Condição", value: "Imune" },
    ],
  },
  {
    id: "tess",
    tag: "03",
    name: "Tess",
    role: "Aliada",
    faction: "Independente",
    status: "Ativa",
    location: "Boston QZ",
    description:
      "Parceira de Joel no contrabando, Tess é conhecida por sua inteligência e sangue-frio. Ela é o cérebro por trás de muitas de suas operações e carrega um senso de dever que vai além da simples sobrevivência.",
    quote: "Swear to me that you'll get her there.",
    image: "/Characters/Tess.webp",
    stats: [
      { label: "Vínculo", value: "Joel" },
      { label: "Origem", value: "Desconhecida" },
      { label: "Função", value: "Contrabando" },
      { label: "Condição", value: "???" },
    ],
  },
  {
    id: "bill",
    tag: "04",
    name: "Bill",
    role: "Aliado",
    faction: "Independente",
    status: "Isolado",
    location: "Lincoln, MA",
    description:
      "Um sobrevivente paranoico que vive em uma cidade repleta de armadilhas. Ele deve um favor a Joel e ajuda a dupla a conseguir um veículo. Sua brutalidade esconde uma lealdade surpreendente.",
    quote: "I'm a lot of things, but I ain't a killer.",
    image: "/Characters/Bill.webp",
    stats: [
      { label: "Vínculo", value: "Joel" },
      { label: "Origem", value: "Lincoln MA" },
      { label: "Função", value: "Armadilhas" },
      { label: "Condição", value: "Isolado" },
    ],
  },
];

export default function Characters() {
  const [activeId, setActiveId] = useState("joel");
  const [hovered, setHovered] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const char = characters.find((c) => c.id === activeId)!;

  const handleSelect = (id: string) => {
    if (id !== activeId) {
      playSFX("Click Sound.wav");
      setActiveId(id);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <div className="w-full max-w-5xl flex gap-0 animate-in fade-in duration-700 min-h-[60vh]">
      {/* ── Lateral Menu ── */}
      <nav className="flex flex-col min-w-[220px] border-r border-white/10">
        <div className="pb-6 mb-2">
          <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase mb-1">
            Elenco
          </p>
          <h1 className="text-white text-sm font-bold tracking-[0.3em] uppercase">
            Personagens
          </h1>
        </div>

        <div className="h-px bg-white/10 mb-4" />

        {characters.map((c) => {
          const isActive = activeId === c.id;
          const isHovered = hovered === c.id;

          return (
            <button
              key={c.id}
              onMouseEnter={() => {
                setHovered(c.id);
                if (!isActive) playSFX("Hover Sound.wav");
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(c.id)}
              className={`
                relative flex items-center gap-4 py-4 pr-6 text-left transition-all duration-200
                ${isActive ? "border-r-2 border-white" : "border-r-2 border-transparent"}
              `}
            >
              <span
                className={`
                text-[9px] tracking-[0.3em] font-mono w-5 text-right transition-colors duration-200
                ${isActive || isHovered ? "text-white/40" : "text-white/15"}
              `}
              >
                {c.tag}
              </span>
              <div className="flex flex-col">
                <span
                  className={`
                  text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200
                  ${isActive ? "text-white" : isHovered ? "text-white/70" : "text-white/30"}
                `}
                >
                  {c.name.split(" ")[0]}
                </span>
                <span
                  className={`
                  text-[9px] tracking-[0.2em] uppercase transition-colors duration-200
                  ${isActive ? "text-white/30" : "text-white/15"}
                `}
                >
                  {c.role}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* ── Content Area ── */}
      <div
        key={animKey}
        className="flex-1 pl-10 pt-1 animate-in fade-in slide-in-from-right-4 duration-500"
      >
        <div className="flex gap-10 items-start">
          {/* Retrato */}
          <div className="shrink-0">
            <TiltedCard
              imageSrc={char.image}
              altText={char.name}
              caption={char.role}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3 flex-1 pt-1">
            <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase">
              {char.role}
            </p>

            <SplitText
              text={char.name}
              className="text-white text-2xl font-bold tracking-[0.15em] uppercase"
              delay={40}
              textAlign="left"
            />

            <BlurText
              text={`"${char.quote}"`}
              className="text-white/30 text-xs italic tracking-wide leading-relaxed"
              delay={20}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-7" />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-7">
          {char.stats.map((s) => (
            <SpotlightCard
              key={s.label}
              className="p-4 text-center"
              spotlightColor="rgba(255,255,255,0.04)"
            >
              <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-1">
                {s.label}
              </p>
              <p className="text-white text-sm font-bold tracking-widest">
                {s.value}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Descrição */}
        <p className="text-white/45 text-sm leading-loose max-w-xl">
          {char.description}
        </p>
      </div>
    </div>
  );
}
