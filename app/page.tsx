import Image from 'next/image';
import MobileNav from './components/MobileNav';
import ScrollFade from './components/ScrollFade';
import CopyEmail from './components/CopyEmail';
import { ResumeButton, ThesisButton } from './components/Modals';

/* ── Nav ───────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#research', label: 'Research' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/6 bg-[#080808]/80 backdrop-blur-lg">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="font-[family-name:var(--font-syne)] font-bold text-sm text-[#5a5756]">
          GT<span className="text-[#cbff57]">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold tracking-[0.12em] uppercase text-[#5a5756] hover:text-[#e8e2d4] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

/* ── Featured Work Cards ───────────────────────────────────────── */

const FEATURED = [
  {
    name: 'OmicsHonesty',
    desc: 'An open-source AI eval (UK AISI Inspect framework) that tests whether LLMs honestly report null results, impossible requests, and silent pipeline failures in bioinformatics — instead of inventing findings.',
    status: 'In progress',
    statusColor: 'text-amber-400',
    tags: ['Python', 'Inspect AI', 'AI Safety', 'Bioinformatics'],
    url: 'https://github.com/noorgg22/omics-honesty',
  },
  {
    name: 'BioAgent',
    desc: 'An agentic bioinformatics workbench — describe an RNA-seq analysis in plain English, and a Claude-powered agent plans and executes the full pipeline: differential expression, volcano plot, PCA, pathway enrichment, and PubMed search.',
    status: 'Live',
    statusColor: 'text-emerald-400',
    tags: ['Claude AI', 'FastAPI', 'Python', 'React', 'TypeScript'],
    url: 'https://frontend-theta-ten-29.vercel.app',
  },
  {
    name: 'Seatd',
    desc: 'AI SMS front desk for salons and barbershops — bookings, reminders, missed-call recovery, and Google reviews. 8 production n8n workflows with Claude, Twilio, and Stripe billing.',
    status: 'Live \u00b7 Paying customers',
    statusColor: 'text-emerald-400',
    tags: ['Claude AI', 'Twilio', 'Stripe', 'n8n'],
    url: 'https://seatd-deploy.vercel.app',
  },
];

function FeaturedCard({
  name,
  desc,
  status,
  statusColor,
  tags,
  url,
}: (typeof FEATURED)[number]) {
  return (
    <ScrollFade>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-white/8 hover:border-white/20 bg-white/[0.02] p-6 md:p-8 transition-all"
      >
        {/* TODO(gui): add screenshot/image for this project card */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl md:text-2xl tracking-tight text-[#e8e2d4]">
            {name}
          </h3>
          <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#5a5756] group-hover:bg-[#cbff57] group-hover:border-[#cbff57] group-hover:text-[#080808] transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[#5a5756] mb-4">{desc}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-[10px] font-bold ${statusColor}`}>
            ● {status}
          </span>
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full border border-white/8 text-[#5a5756]"
            >
              {t}
            </span>
          ))}
        </div>
      </a>
    </ScrollFade>
  );
}

/* ── Experience Timeline ───────────────────────────────────────── */

const TIMELINE = [
  {
    title: 'AI Safety Evaluation Contractor',
    subtitle: 'Biology Expert & Generalist',
    org: 'Mercor',
    date: 'Aug 2026 – present',
  },
  {
    title: 'Graduate Researcher',
    subtitle: 'Alem\u00e1n Lab',
    org: 'NYU Langone Health',
    date: 'Mar 2024 – Sep 2025',
  },
  {
    title: 'PhD in Bioinformatics & Computational Biology',
    subtitle: 'GPA 4.0',
    org: 'George Mason University',
    date: 'Jan 2026 – present',
  },
  {
    title: 'M.S. in Quantitative & Computational Biology',
    subtitle: null,
    org: 'New York University',
    date: '2025',
  },
  {
    title: 'B.S. in Biological Sciences',
    subtitle: null,
    org: 'University of Delaware',
    date: null,
  },
];

/* ── More Projects ─────────────────────────────────────────────── */

const MORE_PROJECTS = [
  {
    name: 'LeHoopIQ',
    desc: 'NBA analytics dashboard — live scores, standings, rosters, and deep player profiles.',
    url: 'https://lehoopiq.vercel.app',
  },
  {
    name: "World Cup '26",
    desc: 'Real-time tournament tracker for the 2026 FIFA World Cup.',
    url: 'https://worldcup-site.vercel.app',
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Nav />

      <main className="max-w-[1100px] mx-auto px-6">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section id="hero" className="pt-16 md:pt-28 pb-20 md:pb-28 border-b border-white/6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="flex-1">
              <ScrollFade>
                <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-4xl md:text-6xl tracking-[-0.04em] leading-[0.95] text-[#e8e2d4] mb-5">
                  Gui Trindade
                </h1>
              </ScrollFade>
              <ScrollFade delay={0.05}>
                <p className="text-lg md:text-xl leading-relaxed text-[#e8e2d4]/80 mb-2 max-w-lg">
                  Bioinformatics PhD student building honest, useful AI for biology.
                </p>
              </ScrollFade>
              <ScrollFade delay={0.1}>
                <p className="text-sm text-[#5a5756] mb-8">
                  PhD student at George Mason &middot; NYC &middot; AI evaluation contractor at Mercor
                </p>
              </ScrollFade>

              <ScrollFade delay={0.15}>
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <a
                    href="/Guilherme_Trindade_CV.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#cbff57] text-[#080808] text-sm font-semibold hover:brightness-110 transition-all"
                  >
                    Download CV
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </a>
                  <a
                    href="https://github.com/noorgg22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/gui-trindade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:gui.becker.trindade@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
                  >
                    Email
                  </a>
                </div>
              </ScrollFade>

              <ScrollFade delay={0.2}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-xs text-[#5a5756]">
                    Open to roles in AI evaluation, applied AI and computational biology
                  </span>
                </div>
              </ScrollFade>
            </div>

            <ScrollFade delay={0.1} className="flex-shrink-0">
              <div className="rounded-2xl overflow-hidden relative border border-white/8" style={{ width: 240, height: 320 }}>
                <Image
                  src="/gui-portrait.jpg"
                  alt="Gui Trindade"
                  width={240}
                  height={320}
                  className="object-cover object-[center_20%] w-full h-full"
                  priority
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.45) 0%, transparent 50%)' }}
                />
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* ── Featured Work ────────────────────────────────────── */}
        <section id="work" className="py-16 md:py-24 border-b border-white/6">
          <ScrollFade className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              Featured Work
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl md:text-4xl tracking-tight text-[#e8e2d4]">
              What I&apos;m building.
            </h2>
          </ScrollFade>
          <div className="flex flex-col gap-5">
            {FEATURED.map((p) => (
              <FeaturedCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* ── Experience Timeline ──────────────────────────────── */}
        <section id="experience" className="py-16 md:py-24 border-b border-white/6">
          <ScrollFade className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              Experience
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl md:text-4xl tracking-tight text-[#e8e2d4]">
              Where I&apos;ve been.
            </h2>
          </ScrollFade>
          <div className="flex flex-col">
            {TIMELINE.map((item, i) => (
              <ScrollFade key={i} delay={i * 0.05}>
                <div className="flex items-start gap-6 py-5 border-b border-white/6 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-semibold text-[#e8e2d4] mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#5a5756]">
                      {item.org}
                      {item.subtitle && <span> &middot; {item.subtitle}</span>}
                    </p>
                  </div>
                  {item.date && (
                    <span className="text-xs text-[#5a5756] flex-shrink-0 pt-0.5 tabular-nums">
                      {item.date}
                    </span>
                  )}
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* ── Research ─────────────────────────────────────────── */}
        <section id="research" className="py-16 md:py-24 border-b border-white/6">
          <ScrollFade className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              Research
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl md:text-4xl tracking-tight text-[#e8e2d4]">
              The science side.
            </h2>
          </ScrollFade>

          <ThesisButton />

          <ScrollFade delay={0.1} className="mt-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-[#cbff57] text-[#cbff57] bg-[#cbff57]/10">
                  Conference
                </span>
                <span className="text-[11px] text-[#5a5756]">ObesityWeek 2024</span>
              </div>
              <p className="text-sm text-[#5a5756] leading-relaxed">
                Poster presentation on monoglyceride-driven macrophage responses in adipose tissue, integrating transcriptomic and lipidomic datasets.
              </p>
            </div>
          </ScrollFade>
        </section>

        {/* ── More Projects ────────────────────────────────────── */}
        <section id="projects" className="py-16 md:py-24 border-b border-white/6">
          <ScrollFade className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              More Projects
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl md:text-4xl tracking-tight text-[#e8e2d4]">
              Side builds.
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MORE_PROJECTS.map((p) => (
              <ScrollFade key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-white/8 hover:border-white/20 bg-white/[0.02] p-6 transition-all h-full"
                >
                  {/* TODO(gui): add screenshot/image for this project card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg tracking-tight text-[#e8e2d4]">
                      {p.name}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#5a5756] group-hover:bg-[#cbff57] group-hover:border-[#cbff57] group-hover:text-[#080808] transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </div>
                  </div>
                  <p className="text-sm text-[#5a5756] leading-relaxed">{p.desc}</p>
                </a>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="py-16 md:py-24 border-b border-white/6">
          <ScrollFade className="mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              About
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-2xl md:text-4xl tracking-tight text-[#e8e2d4]">
              Who I am.
            </h2>
          </ScrollFade>

          <ScrollFade delay={0.05}>
            <div className="max-w-2xl space-y-5 text-sm md:text-[15px] leading-[1.85] text-[#e8e2d4]/75">
              <p>
                I was born in S&atilde;o Paulo and grew up in the United States. Biology and sports were the two constants — I played everything I could get my hands on, and the habit of tracking stats never left. Over time biology pulled me deeper into the analytical side, and I realized I cared more about finding patterns in data than memorizing facts. I studied biology at the University of Delaware, then moved to NYU for a master&apos;s in computational biology, where I spent over a year in an obesity research lab at NYU Langone, building reproducible pipelines for RNA-seq analysis and integrating transcriptomic, lipidomic, and spatial data for my thesis.
              </p>
              <p>
                Now I&apos;m a PhD student in Bioinformatics and Computational Biology at George Mason University, and I build software on the side because I like making things. Seatd, BioAgent, LeHoopIQ, the World Cup tracker — whatever the subject, the instinct is the same. I&apos;m based in New York City.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade delay={0.1} className="mt-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#5a5756]">
              <span>NYC</span>
              <span className="text-white/10">|</span>
              <span>Born in S&atilde;o Paulo</span>
              <span className="text-white/10">|</span>
              <span>PhD Student</span>
            </div>
          </ScrollFade>

          <ScrollFade delay={0.15} className="mt-6">
            <ResumeButton />
          </ScrollFade>
        </section>
      </main>

      {/* ── Contact Footer ───────────────────────────────────── */}
      <footer id="contact" className="border-t border-white/6">
        <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
          <ScrollFade>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57] mb-3">
              Contact
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-5xl tracking-[-0.03em] text-[#e8e2d4] mb-8">
              Let&apos;s talk.
            </h2>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <CopyEmail />
              <a
                href="https://linkedin.com/in/gui-trindade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/noorgg22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
              >
                GitHub
              </a>
              <a
                href="/Guilherme_Trindade_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 text-[#e8e2d4] text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Download CV
              </a>
            </div>
          </ScrollFade>

          <div className="flex items-center justify-between pt-8 border-t border-white/6">
            <span className="font-[family-name:var(--font-syne)] font-bold text-sm text-[#5a5756]">
              GT<span className="text-[#cbff57]">.</span>
            </span>
            <p className="text-[11px] text-[#5a5756]">
              &copy; 2026 Gui Trindade. Built with Next.js.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
