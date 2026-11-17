/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-[#0B7A57] z-10 rounded-xl px-4 py-1">
              <span className="text-white text-sm font-medium">Off the court</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What I bring to a team</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              The stuff that doesn&apos;t fit on a transcript but shapes how I work.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
                )}
                {hackathon.title && (
                  <h3 className="font-semibold leading-none">{hackathon.title}</h3>
                )}
                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {/* Links omitted for this section */}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
