/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Link from "next/link";

const TAGS = [
  "Transcriptomics",
  "Lipidomics",
  "Spatial omics",
  "R",
  "Python",
  "DESeq2",
];

export default function ResearchSection() {
  return (
    <section id="research" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-[#0B7A57] z-10 rounded-xl px-4 py-1">
              <span className="text-white text-sm font-medium">Research</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">The science side</h2>
        </div>

        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden border-b">
            <img
              src="/research/thesis-cover.png"
              alt="Thesis cover page"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-[#0B7A57] text-white text-xs">
                Presented at ObesityWeek 2024
              </Badge>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-lg leading-snug">
              Multi-Omic Integration of Monoglyceride Response in Adipose Tissue Macrophages in Obesity
            </h3>
            <p className="text-sm text-muted-foreground">
              M.S. Thesis &middot; NYU &middot; Laboratory of Translational Obesity Research (Dr. Jos&eacute; Alem&aacute;n) &middot; 2025
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I integrated spatial lipidomics (MALDI imaging), bulk lipidomics (LC-MS) and RNA-seq to see how lipids like arachidonic acid and 2-AG reshape inflammatory macrophages in obese fat tissue. I built the analysis pipelines from scratch.
            </p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="border rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0B7A57] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#096B4B] w-fit"
            >
              Read the thesis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
