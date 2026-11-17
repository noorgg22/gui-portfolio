import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";

export const DATA = {
  name: "Gui Trindade",
  initials: "GT",
  url: "https://gui-portfolio-tau.vercel.app",
  location: "New York, NY",
  locationLink: "https://www.google.com/maps/place/newyork",
  description:
    "I build AI for biology and test where it breaks. Bioinformatics PhD student in NYC.",
  summary:
    "Bioinformatics PhD student at George Mason and M.S. in Quantitative & Computational Biology from NYU. I evaluate frontier AI models as a biology expert for Mercor, build tools scientists actually use, and founded a small business with paying customers. Born in São Paulo, grew up in Michigan and outside Philly. Former top college referee for the big games, which taught me to lead a room and own my calls.",
  avatarUrl: "/gui-portrait.jpg",
  skills: [
    { name: "Python", icon: Python },
    { name: "R" },
    { name: "TypeScript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "FastAPI" },
    { name: "SQL" },
    { name: "Claude API" },
    { name: "Inspect AI" },
    { name: "DESeq2" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "gui.becker.trindade@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/noorgg22",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/gui-trindade/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:gui.becker.trindade@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Mercor",
      href: "https://mercor.com",
      badges: [],
      location: "Remote",
      title: "AI Evaluation, Biology Expert & Generalist",
      logoUrl: "/logos/mercor.png",
      start: "Aug 2026",
      end: "Present",
      description:
        "Test frontier AI models on real scientific work and document where they fail. Design adversarial prompts, grade model outputs against structured rubrics, and classify conversations for policy-relevant risk signals.",
    },
    {
      company: "NYU Langone Health",
      href: "https://nyulangone.org",
      badges: [],
      location: "New York, NY",
      title: "Graduate Researcher, Alemán Lab",
      logoUrl: "/logos/nyu-langone.png",
      start: "Mar 2024",
      end: "Sep 2025",
      description:
        "Built a reproducible RNA-seq and lipidomics pipeline that became my master's thesis and an ObesityWeek 2024 poster. Integrated transcriptomic, lipidomic, and spatial data to study macrophage responses in obese adipose tissue.",
    },
    {
      company: "Seatd",
      href: "https://seatd-deploy.vercel.app",
      badges: [],
      location: "New York, NY",
      title: "Founder",
      logoUrl: "/logos/seatd.svg",
      start: "2026",
      end: "Present",
      description:
        "AI text-message front desk for salons and barbershops. Bookings, reminders, missed-call recovery, and Google reviews. Two shops pay for it.",
    },
  ],
  education: [
    {
      school: "George Mason University",
      href: "https://gmu.edu",
      degree: "PhD, Bioinformatics & Computational Biology (GPA 4.0)",
      logoUrl: "/logos/gmu.png",
      start: "2026",
      end: "Present",
    },
    {
      school: "New York University",
      href: "https://nyu.edu",
      degree: "M.S. Quantitative & Computational Biology",
      logoUrl: "/logos/nyu.png",
      start: "2023",
      end: "2025",
    },
    {
      school: "University of Delaware",
      href: "https://udel.edu",
      degree: "B.S. Biological Sciences",
      logoUrl: "/logos/udel.png",
      start: "2019",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "OmicsHonesty",
      href: "https://github.com/noorgg22/omics-honesty",
      dates: "2026 – present",
      active: true,
      description:
        "Open benchmark (Inspect AI) testing whether AI models stay honest with biological data: null results, impossible requests, silent pipeline failures.",
      technologies: [
        "Python",
        "Inspect AI",
        "AI Safety",
        "Bioinformatics",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/noorgg22/omics-honesty",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/omicshonesty.png",
      video: "",
    },
    {
      title: "BioAgent",
      href: "https://frontend-theta-ten-29.vercel.app",
      dates: "2026",
      active: true,
      description:
        "Describe an RNA-seq analysis in plain English and an AI agent runs the pipeline: differential expression, volcano plot, PCA, pathway enrichment, PubMed search. Members of my lab started using it after seeing it work on my data.",
      technologies: [
        "Claude AI",
        "FastAPI",
        "Python",
        "React",
        "TypeScript",
      ],
      links: [
        {
          type: "Website",
          href: "https://frontend-theta-ten-29.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/noorgg22/bioagent",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/bioagent.png",
      video: "",
    },
    {
      title: "Seatd",
      href: "https://seatd-deploy.vercel.app",
      dates: "2025 – present",
      active: true,
      description:
        "AI SMS front desk for salons and barbershops: bookings, reminders, missed-call recovery, reviews. Two paying shops.",
      technologies: [
        "Claude AI",
        "Twilio",
        "Stripe",
        "n8n",
      ],
      links: [
        {
          type: "Website",
          href: "https://seatd-deploy.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/seatd.png",
      video: "",
    },
    {
      title: "LeHoopIQ",
      href: "https://lehoopiq.vercel.app",
      dates: "2025",
      active: true,
      description:
        "NBA analytics dashboard with live scores, standings, rosters, and deep player profiles.",
      technologies: [
        "React",
        "TypeScript",
        "ESPN API",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://lehoopiq.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/lehoopiq.png",
      video: "",
    },
    {
      title: "World Cup '26",
      href: "https://worldcup-site.vercel.app",
      dates: "2026",
      active: true,
      description:
        "Real-time tournament tracker for the 2026 FIFA World Cup.",
      technologies: [
        "React",
        "TypeScript",
        "Sports API",
      ],
      links: [
        {
          type: "Website",
          href: "https://worldcup-site.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/worldcup.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "I make the call",
      dates: "",
      location: "",
      description:
        "Top referee for my college's biggest games, eight-hour shifts, packed gyms, real pressure.",
      image: "",
      links: [],
    },
    {
      title: "I own the result",
      dates: "",
      location: "",
      description:
        "I don't run from accountability; if something I own goes wrong, I'm the first to say so and fix it.",
      image: "",
      links: [],
    },
    {
      title: "I bring people in",
      dates: "",
      location: "",
      description:
        "I'm at my best on a team, and sports are how I connect with almost anyone.",
      image: "",
      links: [],
    },
  ],
} as const;
