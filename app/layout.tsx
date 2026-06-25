import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne  = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400","700","800"] });

export const metadata: Metadata = {
  title: "Gui Trindade — Bioinformatics & Builder",
  description: "PhD Prospect in Bioinformatics & Computational Biology. Based in NYC. Building at the intersection of biology and technology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
