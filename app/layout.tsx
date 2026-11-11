import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne  = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400","700","800"] });

const SITE_URL = "https://gui-portfolio-tau.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gui Trindade — Bioinformatics PhD & AI Builder",
  description:
    "PhD student in Bioinformatics & Computational Biology at George Mason University. Building honest, useful AI for biology. Based in NYC.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Gui Trindade — Bioinformatics PhD & AI Builder",
    description:
      "PhD student in Bioinformatics & Computational Biology at George Mason University. Building honest, useful AI for biology.",
    url: SITE_URL,
    siteName: "Gui Trindade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gui Trindade — Bioinformatics PhD & AI Builder",
    description:
      "PhD student in Bioinformatics & Computational Biology at George Mason University. Building honest, useful AI for biology.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Guilherme Trindade",
  jobTitle: "PhD Student in Bioinformatics & Computational Biology",
  affiliation: {
    "@type": "Organization",
    name: "George Mason University",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "New York University" },
    { "@type": "CollegeOrUniversity", name: "University of Delaware" },
  ],
  sameAs: [
    "https://linkedin.com/in/gui-trindade",
    "https://github.com/noorgg22",
  ],
  url: SITE_URL,
  email: "gui.becker.trindade@gmail.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
