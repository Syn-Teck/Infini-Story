import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Backpack,
  BookOpen,
  CirclePause,
  CirclePlay,
  Dice5,
  Heart,
  Menu,
  Send,
  Shield,
  Sparkles,
  Square,
  UserRound,
  Volume2,
} from "lucide-react";
import { demoCharacter, demoInventory, initialMessages } from "./demoState";
import type { StoryMessage, ViewName } from "./types";

const STORAGE_KEY = "infini-story.prototype.messages.v1";

const navItems: Array<{ id: ViewName; label: string; icon: typeof BookOpen }> = [
  { id: "story", label: "Histoire", icon: BookOpen },
  { id: "character", label: "Personnage", icon: UserRound },
  { id: "inventory", label: "Inventaire", icon: Backpack },
  { id: "journal", label: "Journal", icon: Menu },
];

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function randomD20() {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return (value[0] % 20) + 1;
}

function loadMessages(): StoryMessage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as StoryMessage[]) : initialMessages;
  } catch {
    return initialMessages;
  }
}

function App() {
  const [view, setView] = useState<ViewName>("story");
  const [messages, setMessages] = useState<StoryMessage[]>(loadMessages);
  const [draft, setDraft] = useState("");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechPaused, setSpeechPaused] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const lastNarration = useMemo(
    () => [...messages].reverse().find((message) => message.role === "gm"),
    [messages],
  );

  function stopSpeech() {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setSpeechPaused(false);
  }

  function readAloud(message: StoryMessage) {
    if (!("speechSynthesis" in window)) return;
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = "fr-CA";
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  }

  function pauseOrResumeSpeech() {
    if (!window.speechSynthesis) return;
    if (speechPaused) window.speechSynthesis.resume();
    else window.speechSynthesis.pause();
    setSpeechPaused(!speechPaused);
  }

  function submitAction(event: FormEvent) {
    event.preventDefault();
    const action = draft.trim();
    if (!action) return;

    const natural = randomD20();
    const modifier = 2;
    const target = 12;
    const total = natural + modifier;
    const outcome = total >= target ? "Réussite" : "Échec";
    const time = new Intl.DateTimeFormat("fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    const additions: StoryMessage[] = [
      { id: makeId("player"), role: "player", content: action, timestamp: time },
      {
        id: makeId("roll"),
        role: "roll",
        content: "Jet de démonstration",
        timestamp: time,
        roll: { formula: "1d20 + 2", natural, modifier, total, target, outcome },
      },
      {
        id: makeId("gm"),
        role: "gm",
        content:
          outcome === "Réussite"
            ? "L’action réussit dans cette simulation locale. Aucun état canonique n’a été modifié."
            : "L’action échoue dans cette simulation locale. Aucun état canonique n’a été modifié.",
        timestamp: time,
      },
    ];

    setMessages((current) => [...current, ...additions]);
    setDraft("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark"><Sparkles size={20} /></div>
        <div>
          <div className="brand-name">Infini-Story</div>
          <div className="brand-subtitle">Prototype local</div>
        </div>
        <div className="status-pill"><span /> Hors canon</div>
      </header>

      <aside className="sidebar">
        <section className="campaign-card">
          <span className="eyebrow">Campagne active</span>
          <strong>Mode démonstration</strong>
          <small>Aucune aventure chargée</small>
        </section>
        <nav className="side-nav" aria-label="Navigation principale">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button className={view === id ? "active" : ""} key={id} onClick={() => setView(id)}>
              <Icon size={19} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <section className="mini-character">
          <div className="avatar">P</div>
          <div><strong>{demoCharacter.name}</strong><small>{demoCharacter.archetype}</small></div>
          <div className="mini-stats">
            <span><Heart size={15} /> {demoCharacter.hp.current}/{demoCharacter.hp.maximum}</span>
            <span><Shield size={15} /> {demoCharacter.defense}</span>
          </div>
        </section>
      </aside>

      <main className="main-panel">
        {view === "story" ? (
          <StoryView
            messages={messages}
            lastNarration={lastNarration}
            speakingId={speakingId}
            speechPaused={speechPaused}
            draft={draft}
            setDraft={setDraft}
            onSubmit={submitAction}
            onRead={readAloud}
            onPause={pauseOrResumeSpeech}
            onStop={stopSpeech}
          />
        ) : (
          <DetailView view={view} />
        )}
      </main>

      <nav className="bottom-nav" aria-label="Navigation mobile">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button className={view === id ? "active" : ""} key={id} onClick={() => setView(id)}>
            <Icon size={21} /><span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

interface StoryViewProps {
  messages: StoryMessage[];
  lastNarration?: StoryMessage;
  speakingId: string | null;
  speechPaused: boolean;
  draft: string;
  setDraft: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onRead: (message: StoryMessage) => void;
  onPause: () => void;
  onStop: () => void;
}

function StoryView(props: StoryViewProps) {
  const { messages, lastNarration, speakingId, speechPaused, draft, setDraft, onSubmit, onRead, onPause, onStop } = props;
  return (
    <>
      <section className="page-heading">
        <div><span className="eyebrow">Session locale</span><h1>Votre histoire</h1></div>
        {lastNarration && (
          <button className="ghost-button" onClick={() => onRead(lastNarration)}>
            <Volume2 size={18} /> Lire le dernier message
          </button>
        )}
      </section>

      <section className="story-stream" aria-live="polite">
        {messages.map((message) => (
          <article className={`message ${message.role}`} key={message.id}>
            <div className="message-meta">
              <span>{message.role === "gm" ? "Narrateur" : message.role === "player" ? "Vous" : message.role === "roll" ? "Résolution" : "Système"}</span>
              <time>{message.timestamp}</time>
            </div>
            {message.roll ? (
              <div className="roll-result">
                <div className="die"><Dice5 size={25} /><strong>{message.roll.natural}</strong></div>
                <div><span>{message.roll.formula} contre {message.roll.target}</span><strong>{message.roll.total} — {message.roll.outcome}</strong></div>
              </div>
            ) : <p>{message.content}</p>}
            {message.role === "gm" && (
              <div className="speech-controls">
                {speakingId === message.id ? (
                  <>
                    <button onClick={onPause}>{speechPaused ? <CirclePlay size={17} /> : <CirclePause size={17} />}{speechPaused ? "Reprendre" : "Pause"}</button>
                    <button onClick={onStop}><Square size={14} /> Arrêter</button>
                  </>
                ) : <button onClick={() => onRead(message)}><Volume2 size={17} /> Lire à voix haute</button>}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="quick-actions" aria-label="Actions suggérées">
        {["J’observe les environs", "Je vérifie mon équipement", "Je reste prudent"].map((action) => (
          <button key={action} onClick={() => setDraft(action)}>{action}</button>
        ))}
      </section>

      <form className="composer" onSubmit={onSubmit}>
        <label htmlFor="player-action">Que voulez-vous faire?</label>
        <div className="composer-row">
          <textarea id="player-action" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Décrivez votre action…" rows={2} />
          <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Envoyer l’action"><Send size={20} /></button>
        </div>
        <small>Simulation locale : les actions ne modifient aucun fichier canonique.</small>
      </form>
    </>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="stat-card">{icon}<span>{label}</span><strong>{value}</strong></div>;
}

function DetailView({ view }: { view: Exclude<ViewName, "story"> }) {
  if (view === "character") {
    return <section className="detail-page"><span className="eyebrow">Profil de démonstration</span><h1>{demoCharacter.name}</h1><p className="lead">Cette fiche illustre l’interface. Elle n’est reliée à aucune campagne.</p><div className="stats-grid"><StatCard icon={<Heart />} label="Points de vie" value={`${demoCharacter.hp.current} / ${demoCharacter.hp.maximum}`} /><StatCard icon={<Shield />} label="Défense" value={String(demoCharacter.defense)} />{demoCharacter.resources.map((resource) => <StatCard key={resource.name} icon={<Sparkles />} label={resource.name} value={`${resource.current} / ${resource.maximum}`} />)}</div></section>;
  }
  if (view === "inventory") {
    return <section className="detail-page"><span className="eyebrow">Registre local</span><h1>Inventaire</h1><p className="lead">Objets fictifs utilisés uniquement pour valider l’expérience mobile.</p><div className="list-card">{demoInventory.map((item) => <div className="list-row" key={item.name}><div><strong>{item.name}</strong><small>{item.detail}</small></div><span>× {item.quantity}</span></div>)}</div></section>;
  }
  return <section className="detail-page"><span className="eyebrow">Mémoire de campagne</span><h1>Journal</h1><p className="lead">Le journal canonique sera alimenté seulement lorsque le backend, la validation et les checkpoints seront branchés.</p><div className="empty-state"><BookOpen size={34} /><strong>Aucun événement canonique</strong><span>Le prototype ne lance pas la campagne et n’avance pas le World Clock.</span></div></section>;
}

export default App;
