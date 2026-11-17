import { Flag, ShieldCheck, Users } from "lucide-react";

const TRAITS = [
  {
    icon: Flag,
    title: "I make the call.",
    desc: "Top referee for my college's biggest games. I stay calm under pressure and stand by my decisions.",
  },
  {
    icon: ShieldCheck,
    title: "I own the result.",
    desc: "If something I own goes wrong, I'm the first to say so and the first to fix it.",
  },
  {
    icon: Users,
    title: "I bring people in.",
    desc: "I'm at my best on a team, and sports help me connect with almost anyone.",
  },
];

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-[#0B7A57] z-10 rounded-xl px-4 py-1">
              <span className="text-white text-sm font-medium">Beyond the work</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">How I work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TRAITS.map((trait) => (
            <div
              key={trait.title}
              className="rounded-xl border bg-card p-6 flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <trait.icon className="size-5 text-[#0B7A57]" />
              <h3 className="font-semibold text-sm">{trait.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{trait.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
