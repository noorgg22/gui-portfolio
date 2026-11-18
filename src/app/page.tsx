/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import ResearchSection from "@/components/section/research-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-bold sm:text-5xl lg:text-[64px] font-[family-name:var(--font-display)]"
                yOffset={8}
                text={`${DATA.name}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <a
                    href="/Guilherme_Trindade_CV.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-[#0B7A57] px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#096B4B]"
                  >
                    Download CV
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </a>
                  <a
                    href="https://github.com/noorgg22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gui-trindade/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    LinkedIn
                  </a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>{education.start} - {education.end}</span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills & Tools</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            {/* TODO(gui): confirm and add any skills I'm missing */}
            <Accordion type="single" collapsible defaultValue="bioinformatics" className="w-full">
              <AccordionItem value="bioinformatics">
                <AccordionTrigger className="text-sm font-semibold">Bioinformatics</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["RNA-seq", "Differential expression (DESeq2)", "Lipidomics", "Multi-omics integration", "Spatial omics", "Pathway enrichment"].map((s) => (
                      <span key={s} className="border rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ai">
                <AccordionTrigger className="text-sm font-semibold">AI & Evaluation</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["LLM evaluation", "AI agents", "Claude API", "Inspect AI", "Red-teaming"].map((s) => (
                      <span key={s} className="border rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="languages">
                <AccordionTrigger className="text-sm font-semibold">Languages</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Python", "R", "SQL", "TypeScript"].map((s) => (
                      <span key={s} className="border rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="web">
                <AccordionTrigger className="text-sm font-semibold">Web & Product</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["React", "Next.js", "FastAPI", "n8n", "Twilio", "Stripe", "Vercel", "Git"].map((s) => (
                      <span key={s} className="border rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="research">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <ResearchSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
