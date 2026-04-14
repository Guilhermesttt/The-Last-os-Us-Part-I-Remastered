import { useState } from "react";
import { playSFX } from "./utils/audio";
import TrueFocus from "./Components/ReactBits/TrueFocus";

interface Section {
  id: string;
  label: string;
  tag: string;
}

const sections: Section[] = [
  { id: "overview", label: "Visão Geral", tag: "01" },
  { id: "fungus", label: "O Cordyceps", tag: "02" },
  { id: "world", label: "O Mundo", tag: "03" },
  { id: "joel", label: "Joel Miller", tag: "04" },
  { id: "ellie", label: "Ellie Williams", tag: "05" },
];

const content: Record<string, React.ReactNode> = {
  overview: (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <TrueFocus
        sentence="ENDURE AND SURVIVE"
        focusColor="#ffffff"
        className="mb-2"
      />
      <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">
        O lema de quem não tem mais nada a perder.
      </p>

      <div className="h-px bg-white/10" />

      <div className="space-y-6 text-white/60 leading-loose text-sm text-justify max-h-[45vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
        <p>
          Em um mundo devastado pela pandemia do fungo Cordyceps,{" "}
          <em>The Last of Us</em> nos transporta para o ano de 2033 — duas
          décadas após o início do caos que transformou a civilização. O fungo,
          que originalmente afetava apenas insetos, sofreu uma mutação
          devastadora, ganhando a capacidade de infectar e controlar cérebros
          humanos.
        </p>
        <p>
          A magnitude da tragédia é assustadora: aproximadamente 60% da
          população global sucumbiu à Infecção Cerebral do Cordyceps (ICC). As
          cidades outrora movimentadas tornaram-se ruínas, enquanto os
          sobreviventes lutam diariamente pela própria existência.
        </p>
        <p>
          Neste cenário desolador, Joel e Ellie cruzam seus caminhos em uma
          jornada que mudará o destino do que restou da humanidade.
        </p>
      </div>
    </div>
  ),

  fungus: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          Agente Etiológico
        </p>
        <h2 className="text-white text-2xl font-bold tracking-[0.15em] uppercase">
          Ophiocordyceps Unilateralis
        </h2>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-2 gap-6">
        {[
          { label: "Infectados Globais", value: "~60%" },
          { label: "Anos de Propagação", value: "20+" },
          { label: "Estágios de Infecção", value: "04" },
          { label: "Cura Conhecida", value: "NENHUMA" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-white/10 p-5 bg-black/20"
          >
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-2">
              {stat.label}
            </p>
            <p className="text-white text-xl font-bold tracking-widest">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-white/50 text-sm leading-loose max-h-[25vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        <p>
          O fungo entra pelo sistema respiratório e coloniza progressivamente o
          sistema nervoso central. Em questão de dias, o hospedeiro perde
          autonomia e se torna um vetor agressivo de contágio. Não existe
          tratamento conhecido.
        </p>
      </div>
    </div>
  ),

  world: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          Contexto Global
        </p>
        <h2 className="text-white text-2xl font-bold tracking-[0.15em] uppercase">
          O Mundo Pós-Pandemia
        </h2>
      </div>

      <div className="h-px bg-white/10" />

      <div className="space-y-4">
        {[
          {
            title: "Zonas de Quarentena",
            desc: "Áreas urbanas controladas pelo FEDRA com regime militar. A lei marcial é absoluta.",
          },
          {
            title: "As Vaga-Lumes (Fireflies)",
            desc: "Grupo de resistência que busca uma cura. Operações clandestinas em todo o país.",
          },
          {
            title: "Zonas de Exclusão",
            desc: "Territórios abandonados dominados por infectados e grupos de sobreviventes hostis.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 border-l border-white/10 pl-5 py-2"
          >
            <div>
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase mb-1">
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

  joel: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-end gap-6">
        <div>
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
            Protagonista
          </p>
          <h2 className="text-white text-3xl font-bold tracking-[0.1em] uppercase">
            Joel Miller
          </h2>
          <p className="text-white/30 text-xs tracking-widest mt-1 uppercase">
            Sobrevivente • Contrabandista
          </p>
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Idade", value: "56" },
          { label: "Origem", value: "Texas" },
          { label: "Status", value: "Ativo" },
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

      <p className="text-white/50 text-sm leading-loose">
        Endurecido por décadas de perda e sobrevivência brutal, Joel carrega o
        peso de escolhas impossíveis. Antes um pai amoroso, o colapso da
        civilização moldou nele um homem implacável — capaz de qualquer coisa
        para sobreviver.
      </p>
    </div>
  ),

  ellie: (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2">
          Protagonista
        </p>
        <h2 className="text-white text-3xl font-bold tracking-[0.1em] uppercase">
          Ellie Williams
        </h2>
        <p className="text-white/30 text-xs tracking-widest mt-1 uppercase">
          Imune • Esperança da Humanidade
        </p>
      </div>

      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Idade", value: "14" },
          { label: "Origem", value: "Boston QZ" },
          { label: "Condição", value: "Imune" },
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

      <p className="text-white/50 text-sm leading-loose">
        A primeira pessoa conhecida a ser naturalmente imune ao Cordyceps.
        Nascida após o colapso, Ellie só conheceu o mundo como ele é agora — mas
        carrega uma curiosidade e humanidade raras neste novo mundo. Sua
        imunidade pode ser a chave para uma cura.
      </p>
    </div>
  ),
};

export default function History() {
  const [active, setActive] = useState("overview");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl flex gap-0 animate-in fade-in duration-700 min-h-[60vh]">
      {/* ── Lateral Menu ── */}
      <nav className="flex flex-col min-w-[220px] border-r border-white/10 pr-0">
        {/* Header */}
        <div className="pb-6 mb-2">
          <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase mb-1">
            Capítulo
          </p>
          <h1 className="text-white text-sm font-bold tracking-[0.3em] uppercase">
            A História
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
              {/* Tag numérica */}
              <span
                className={`
                text-[9px] tracking-[0.3em] font-mono transition-colors duration-200 w-5 text-right
                ${isActive || isHovered ? "text-white/40" : "text-white/15"}
              `}
              >
                {section.tag}
              </span>

              {/* Label */}
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
