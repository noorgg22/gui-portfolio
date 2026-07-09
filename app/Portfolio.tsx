"use client";

import { useState, useEffect, useRef, useCallback, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check, X } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────
const LIME  = "#cbff57";
const BG    = "#080808";
const FG    = "#e8e2d4";
const MUTED = "#5a5756";
const ease  = [0.16, 1, 0.3, 1] as const;

// Scroll container context — fixes whileInView inside overflow-y-auto
const ScrollCtx = createContext<React.RefObject<HTMLDivElement | null>>({ current: null });

// ── Grain ──────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] opacity-[0.032]"
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='250' height='250'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='250' height='250' filter='url(%23n)'/></svg>")`,
        backgroundRepeat: "repeat",
      }} />
  );
}

// ── Animation wrappers (use scroll container as viewport root) ─────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const root = useContext(ScrollCtx);
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-40px", root }}
        transition={{ duration: 0.85, delay, ease }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const root = useContext(ScrollCtx);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", root }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ── Resume Modal ──────────────────────────────────────────────────────────────
function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex flex-col"
      style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(20px)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="font-semibold text-sm" style={{ color: FG }}>Guilherme Trindade — Resume</span>
        <div className="flex items-center gap-3">
          <a href="/resume.pdf" download
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all"
            style={{ background: LIME, color: "#080808" }}>
            Download ↓
          </a>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            <X size={16} />
          </button>
        </div>
      </div>
      {/* PDF viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/resume.pdf"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="Resume"
        />
      </div>
    </motion.div>
  );
}

// ── Contact Modal ──────────────────────────────────────────────────────────────
function ContactModal({ onClose }: { onClose: () => void }) {
  const [ce, setCe] = useState(false);
  const [cp, setCp] = useState(false);
  const copy = (t: string, k: "e" | "p") => {
    navigator.clipboard.writeText(t);
    if (k === "e") { setCe(true); setTimeout(() => setCe(false), 2000); }
    else            { setCp(true); setTimeout(() => setCp(false), 2000); }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(14px)" }}
      onClick={onClose}>
      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101010] p-7"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: LIME }}>Contact</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all">
            <X size={14} />
          </button>
        </div>
        <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl mb-6 leading-tight tracking-tight" style={{ color: LIME }}>
          OPEN TO WORK!
        </h3>
        <div className="flex flex-col gap-3">
          {[
            { label: "Email", val: "gui.becker.trindade@gmail.com", fn: () => copy("gui.becker.trindade@gmail.com", "e"), copied: ce },
            { label: "Phone", val: "+1 (248) 824-3623",              fn: () => copy("+12488243623", "p"),                   copied: cp },
          ].map(item => (
            <button key={item.label} onClick={item.fn}
              className="group flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all text-left">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: MUTED }}>{item.label}</p>
                <p className="text-sm font-medium text-white/85">{item.val}</p>
              </div>
              {item.copied
                ? <Check size={15} className="text-emerald-400 flex-shrink-0" />
                : <Copy size={15} className="text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" />}
            </button>
          ))}
        </div>
        <p className="text-center text-[11px] mt-5" style={{ color: MUTED }}>Click to copy · open to work in biotech & tech</p>
      </motion.div>
    </motion.div>
  );
}

// ── Left Panel ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact",  label: "Contact"  },
];

function LeftPanel({
  active, onContact, onResume, scrollTo,
}: {
  active: string; onContact: () => void; onResume: () => void; scrollTo: (id: string) => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease }}
      className="fixed left-0 top-0 h-screen w-[340px] flex flex-col px-10 py-10 border-r z-[50] overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: BG }}>

      {/* Logo */}
      <span className="font-[family-name:var(--font-syne)] font-bold text-sm" style={{ color: MUTED }}>
        GT<span style={{ color: LIME }}>.</span>
      </span>

      {/* Identity + nav */}
      <div className="flex-1 flex flex-col justify-center py-10">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.04em] leading-[0.9] mb-5"
            style={{ fontSize: "2.55rem", color: FG }}>
            Gui<br/>Trindade
          </h1>
          <p className="text-[12px] font-bold tracking-[0.1em]" style={{ color: LIME }}>
            Bioinformatics × Software × Sports
          </p>
        </div>

        <nav className="flex flex-col">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            const isContact = id === "contact";
            return (
              <button key={id}
                onClick={() => isContact ? onContact() : scrollTo(id)}
                data-cursor
                className="group flex items-center gap-4 py-3 w-full text-left transition-all duration-200">
                <span className="h-px flex-shrink-0 transition-all duration-500"
                  style={{ width: isActive ? 32 : 14, background: isActive ? LIME : "rgba(255,255,255,0.12)" }} />
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase transition-colors duration-200"
                  style={{ color: isActive ? FG : MUTED }}>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-[11px] font-semibold tracking-wide" style={{ color: MUTED }}>
            Open to work · NYC · 2026
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <button onClick={onResume}
            className="text-[11px] font-semibold transition-colors hover:text-white text-left" style={{ color: MUTED }}>
            Resume ↗
          </button>
          <a href="https://linkedin.com/in/gui-trindade" target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold transition-colors hover:text-white" style={{ color: MUTED }}>
            LinkedIn ↗
          </a>
          <a href="https://github.com/noorgg22" target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold transition-colors hover:text-white" style={{ color: MUTED }}>
            GitHub ↗
          </a>
          <button onClick={onContact}
            className="text-[11px] font-semibold transition-colors hover:text-white text-left" style={{ color: MUTED }}>
            Contact ↗
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

// ── Intro ──────────────────────────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="px-16 pt-12 pb-16 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <Reveal>
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-8" style={{ color: MUTED }}>
          <span className="inline-block w-5 h-px mr-3 align-middle" style={{ background: MUTED }} />
          Portfolio · 2026
        </p>
      </Reveal>
      <Reveal delay={0.07}>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", color: FG }}>
          Science<br/>
          <span style={{ WebkitTextStroke: `1.5px rgba(232,226,212,0.3)`, color: "transparent" }}>
            meets code.
          </span>
        </h2>
      </Reveal>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function AboutSection({ onResume }: { onResume: () => void }) {
  return (
    <section id="about" className="px-16 pt-10 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <FadeIn className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: LIME }}>About</p>
        <h2 className="font-[family-name:var(--font-syne)] font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: FG }}>
          Who I am.
        </h2>
      </FadeIn>

      <div className="flex gap-10 items-start">
        {/* Text */}
        <div className="flex-1">
          <FadeIn delay={0.05} className="mb-7">
            <p className="text-[14px] leading-[1.9]" style={{ color: "rgba(232,226,212,0.75)" }}>
              I was born in Brazil and grew up in the United States, in an academic household where curiosity was treated like a full-time pursuit. Sports were the other constant. I played and followed everything I could get my hands on growing up, and the habit of tracking stats and arguing about matchups never really left me. Biology pulled me in early too, and over time pulled me further into the analytical and technical side of it, as I realized I cared more about finding patterns in data than memorizing facts.
            </p>
            <p className="text-[14px] leading-[1.9] mt-4" style={{ color: "rgba(232,226,212,0.75)" }}>
              I moved around growing up, spending time in Michigan and the suburbs of Philadelphia before things settled enough for me to study biology as an undergraduate at the University of Delaware. From there I went to NYU for my master's in computational biology, where I spent over a year as a researcher in an obesity lab at NYU Langone. There I worked with RNA sequencing data end to end, from alignment and filtering through differential expression analysis, and building reproducible pipelines the rest of the lab relied on. That work became my master's thesis, where I integrated transcriptomic, lipidomic, and spatial data to study how macrophages respond to monoglycerides in obese adipose tissue, work I have laid out in more detail under Research. I am now continuing that line of work as a PhD student in Bioinformatics and Computational Biology at George Mason University, while also building software on the side, because I wanted to see if I could.
            </p>
            <p className="text-[14px] leading-[1.9] mt-4" style={{ color: "rgba(232,226,212,0.75)" }}>
              Seatd, an AI front desk tool for small businesses, and LeHoopIQ, an NBA analytics dashboard, both came out of that instinct. So did the World Cup '26 site, one more excuse to build around something I genuinely love watching. Whatever the subject, the instinct behind all three is the same: I like building things.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-6">
            <div className="flex gap-6 text-[13px]" style={{ color: MUTED }}>
              <span>📍 New York City 🇺🇸</span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
              <span>Born in São Paulo 🇧🇷</span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
              <span>PhD Student</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <button onClick={onResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-200 hover:border-white/30 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: FG }}>
              <span className="text-[12px] font-semibold">Resume</span>
              <ArrowUpRight size={13} />
            </button>
          </FadeIn>
        </div>

        {/* Photo */}
        <FadeIn delay={0.08} className="flex-shrink-0">
          <div className="rounded-2xl overflow-hidden relative"
            style={{ width: 240, height: 320, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gui-portrait.jpg" alt="Gui Trindade"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(8,8,8,0.45) 0%, transparent 50%)" }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", name: "Seatd", year: "2025", status: "Live",
    desc: "AI SMS receptionist for salons and barbershops. Handles bookings, reminders, and Google reviews automatically. Real Twilio numbers, real Stripe billing. Zero staff needed.",
    tags: ["Claude AI", "Twilio", "Stripe", "n8n"],
    url: "https://seatd-deploy.vercel.app",
  },
  {
    num: "02", name: "LeHoopIQ", year: "2025", status: "Live",
    desc: "Full NBA analytics dashboard built from scratch because I wanted it. Live scores, league leaders, team rosters, deep player profiles — all on a custom serverless pipeline.",
    tags: ["React", "TypeScript", "ESPN API", "Vercel"],
    url: "https://lehoopiq.vercel.app",
  },
  {
    num: "03", name: "World Cup '26", year: "2026", status: "Live",
    desc: "Real-time tracker for the 2026 FIFA World Cup. Group stages, knockouts, schedules — live from sports APIs. Built for the biggest sporting event in our backyard.",
    tags: ["React", "TypeScript", "Sports API"],
    url: "https://worldcup-site.vercel.app",
  },
  {
    num: "04", name: "BioAgent", year: "2026", status: "Live",
    desc: "Upload RNA-seq count data, ask a question in plain English, and get a full differential expression analysis back — volcano plot, PCA, ranked gene list, pathway enrichment, and supporting literature — all run automatically by an AI agent. Built to show that bioinformatics pipelines that normally take hours of scripting can be driven by a single sentence.",
    tags: ["Claude AI", "FastAPI", "Python", "React", "DESeq2"],
    url: "https://frontend-theta-ten-29.vercel.app",
  },
];

function ProjectRow({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={i * 0.07}>
      <div
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="border-b transition-all duration-300"
        style={{ borderColor: hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.06)" }}>
        <div className="flex items-start justify-between gap-8 py-5">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-4 mb-3 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.18em] tabular-nums" style={{ color: MUTED }}>{p.num}</span>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tight transition-colors duration-200 hover:underline underline-offset-4"
                  style={{ color: hovered ? FG : "rgba(232,226,212,0.6)" }}>
                  {p.name}
                </a>
              ) : (
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tight transition-colors duration-200"
                  style={{ color: hovered ? FG : "rgba(232,226,212,0.6)" }}>
                  {p.name}
                </h3>
              )}
              <span className="text-[10px] font-bold" style={{
                color: p.status === "Live" ? "#4ade80" : p.status === "Building" ? "#fbbf24" : MUTED
              }}>
                ● {p.status}
              </span>
            </div>

            <motion.div
              animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden">
              <p className="text-[13px] leading-relaxed font-light mb-4 max-w-lg" style={{ color: MUTED }}>
                {p.desc}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <span key={t} className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full transition-all duration-300"
                  style={{
                    background: hovered ? "rgba(255,255,255,0.07)" : "transparent",
                    color: hovered ? FG : MUTED,
                    border: `1px solid ${hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.06)"}`,
                  }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
            <span className="text-[11px]" style={{ color: MUTED }}>{p.year}</span>
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  background: hovered ? LIME : "transparent",
                  borderColor: hovered ? LIME : "rgba(255,255,255,0.1)",
                  color: hovered ? "#080808" : MUTED,
                }}>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-16 py-12 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <FadeIn className="mb-14">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: LIME }}>Personal Projects</p>
        <h2 className="font-[family-name:var(--font-syne)] font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: FG }}>
          What I've built.
        </h2>
      </FadeIn>
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {PROJECTS.map((p, i) => <ProjectRow key={p.num} p={p} i={i} />)}
      </div>
    </section>
  );
}

// ── Research ───────────────────────────────────────────────────────────────────
function ResearchSection({ onThesisClick }: { onThesisClick: () => void }) {
  return (
    <section id="research" className="px-16 py-12 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <FadeIn className="mb-14">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: LIME }}>Research</p>
        <h2 className="font-[family-name:var(--font-syne)] font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: FG }}>
          The science side.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <button onClick={onThesisClick}
          className="group block w-full text-left rounded-2xl p-8 border transition-all duration-400 hover:border-white/20 mb-6"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background: LIME, color: "#080808" }}>
                  Master's Thesis
                </span>
                <span className="text-[11px]" style={{ color: MUTED }}>NYU · 2025</span>
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl mb-3 leading-snug tracking-tight" style={{ color: FG }}>
                Multiomic Integration of Monoglyceride Responses<br className="hidden md:block"/>
                in Adipose Tissue Macrophages
              </h3>
              <p className="text-[13px] font-light leading-relaxed mb-5" style={{ color: MUTED }}>
                Multi-omic analysis — transcriptomics, lipidomics, spatial lipidomics — to understand
                how monoglyceride signaling shapes macrophage behavior in adipose tissue. Built custom
                bioinformatics pipelines for data integration and visualization from scratch.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Transcriptomics","Lipidomics","Spatial Omics","R","Python","DESeq2"].map(t => (
                  <span key={t} className="text-[10px] font-semibold px-3 py-1 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.09)", color: MUTED }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: MUTED }}>
              <ArrowUpRight size={16} className="group-hover:text-black transition-colors" />
            </div>
          </div>
        </button>
      </FadeIn>

      <FadeIn delay={0.15}>
        <a href="https://frontend-theta-ten-29.vercel.app" target="_blank" rel="noopener noreferrer"
          className="group block w-full text-left rounded-2xl p-8 border transition-all duration-400 hover:border-white/20 mb-6"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(163,230,53,0.15)", color: LIME, border: `1px solid ${LIME}` }}>
                  Live Tool
                </span>
                <span className="text-[11px]" style={{ color: MUTED }}>2026</span>
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl mb-3 leading-snug tracking-tight" style={{ color: FG }}>
                BioAgent — Agentic Bioinformatics Workbench
              </h3>
              <p className="text-[13px] font-light leading-relaxed mb-5" style={{ color: MUTED }}>
                Upload RNA-seq count data, describe your experiment in plain English, and get a complete
                differential expression analysis back automatically — ranked gene list, volcano plot, PCA,
                KEGG pathway enrichment, and PubMed literature search. Built to demonstrate that
                bioinformatics pipelines that normally take hours of scripting can be driven by a single sentence.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Claude AI", "FastAPI", "Python", "React", "Differential Expression", "Pathway Enrichment"].map(t => (
                  <span key={t} className="text-[10px] font-semibold px-3 py-1 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.09)", color: MUTED }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: MUTED }}>
              <ArrowUpRight size={16} className="group-hover:text-black transition-colors" />
            </div>
          </div>
        </a>
      </FadeIn>

      <div className="grid grid-cols-3 gap-3">
        {[
          ["Genomics",   "RNA-seq · DESeq2 · edgeR · GSEA · scRNA-seq"],
          ["Lipidomics", "LC-MS · lipid annotation · pathway analysis"],
          ["Spatial",    "Spatial transcriptomics · tissue visualization"],
        ].map(([area, tools], i) => (
          <FadeIn key={area} delay={i * 0.07}>
            <div className="rounded-xl p-5 border h-full"
              style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: LIME }}>{area}</p>
              <p className="text-[12px] font-light leading-relaxed" style={{ color: MUTED }}>{tools}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Thesis Modal ───────────────────────────────────────────────────────────────
function ThesisModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(8,8,8,0.88)", backdropFilter: "blur(14px)" }}
      onClick={onClose}>
      <motion.div
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#101010] p-6"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: LIME }}>Master's Thesis</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all">
            <X size={13} />
          </button>
        </div>
        <p className="text-[13px] font-medium mb-5 leading-snug" style={{ color: FG }}>
          Multiomic Integration of Monoglyceride Responses in Adipose Tissue Macrophages
        </p>
        <div className="flex flex-col gap-2">
          <a href="https://github.com/noorgg22/Masters_Thesis_Multiomic_MG_Macrophage"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all">
            <span className="text-[13px] font-medium" style={{ color: FG }}>View on GitHub</span>
            <ArrowUpRight size={14} style={{ color: MUTED }} />
          </a>
          <a href="/thesis.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all">
            <span className="text-[13px] font-medium" style={{ color: FG }}>Open PDF</span>
            <ArrowUpRight size={14} style={{ color: MUTED }} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Contact CTA ────────────────────────────────────────────────────────────────
function ContactSection({ onContact }: { onContact: () => void }) {
  return (
    <section id="contact" className="px-16 py-12">
      <Reveal>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.9] tracking-[-0.04em] mb-12"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: FG }}>
          Let's<br/>
          <span style={{ WebkitTextStroke: `1.5px rgba(232,226,212,0.3)`, color: "transparent" }}>
            talk.
          </span>
        </h2>
      </Reveal>
      <FadeIn delay={0.15}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-t pt-10"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <button onClick={onContact} data-cursor
            className="group flex items-center gap-2 text-[13px] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: LIME, color: "#080808" }}>
            Get in touch <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <p className="text-[13px] font-light" style={{ color: MUTED }}>
            Open to full-time roles in biotech & tech companies.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ── Loader ─────────────────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(iv); setTimeout(onDone, 200); return 100; }
        return Math.min(c + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 50);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center"
      style={{ background: BG }}>
      <motion.p className="font-[family-name:var(--font-syne)] font-extrabold tabular-nums"
        style={{ fontSize: "clamp(4rem, 18vw, 16rem)", color: FG, lineHeight: 1, letterSpacing: "-0.04em" }}>
        {count}
      </motion.p>
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mt-4" style={{ color: MUTED }}>
        Loading
      </p>
    </motion.div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loaded, setLoaded]       = useState(false);
  const [contactOpen, setContact] = useState(false);
  const [thesisOpen, setThesis]   = useState(false);
  const [resumeOpen, setResume]   = useState(false);
  const [active, setActive]       = useState("");
  const scrollRef                 = useRef<HTMLDivElement>(null);
  const openContact               = useCallback(() => setContact(true),  []);
  const closeContact              = useCallback(() => setContact(false), []);
  const openThesis                = useCallback(() => setThesis(true),   []);
  const closeThesis               = useCallback(() => setThesis(false),  []);
  const openResume                = useCallback(() => setResume(true),   []);
  const closeResume               = useCallback(() => setResume(false),  []);

  // Smooth scroll within the container
  const scrollTo = useCallback((id: string) => {
    const el = scrollRef.current?.querySelector(`#${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Active section tracker via IntersectionObserver on the scroll container
  useEffect(() => {
    if (!loaded) return;
    const container = scrollRef.current;
    if (!container) return;
    const sections = Array.from(container.querySelectorAll("section[id]"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { root: container, threshold: 0.35 },
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <ScrollCtx.Provider value={scrollRef}>
      <Grain />

      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && <ContactModal onClose={closeContact} />}
      </AnimatePresence>

      <AnimatePresence>
        {thesisOpen && <ThesisModal onClose={closeThesis} />}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={closeResume} />}
      </AnimatePresence>

      {loaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="flex h-screen overflow-hidden">
          <LeftPanel active={active} onContact={openContact} onResume={openResume} scrollTo={scrollTo} />

          {/* Scrollable right panel */}
          <div ref={scrollRef} className="h-screen overflow-y-auto flex-1" style={{ marginLeft: 340 }}>
            <AboutSection onResume={openResume} />
            <ProjectsSection />
            <ResearchSection onThesisClick={openThesis} />
            <ContactSection onContact={openContact} />
            <footer className="px-16 py-8 border-t flex items-center justify-between"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-[family-name:var(--font-syne)] font-bold text-sm" style={{ color: MUTED }}>
                GT<span style={{ color: LIME }}>.</span>
              </span>
              <p className="text-[11px]" style={{ color: MUTED }}>© 2026 Gui Trindade — Built with Next.js</p>
            </footer>
          </div>
        </motion.div>
      )}
    </ScrollCtx.Provider>
  );
}
