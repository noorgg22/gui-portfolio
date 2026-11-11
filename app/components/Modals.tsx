'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Resume Modal ───────────────────────────────────────────────── */

function ResumeModalContent({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex flex-col"
      style={{ background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <span className="font-semibold text-sm text-[#e8e2d4]">
          Guilherme Trindade — CV
        </span>
        <div className="flex items-center gap-3">
          <a
            href="/Guilherme_Trindade_CV.pdf"
            download
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#cbff57] text-[#080808] transition-all hover:brightness-110"
          >
            Download
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/Guilherme_Trindade_CV.pdf"
          className="w-full h-full border-none"
          title="CV"
        />
      </div>
    </motion.div>
  );
}

/* ── Thesis Modal ───────────────────────────────────────────────── */

function ThesisModalContent({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,8,8,0.88)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#101010] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#cbff57]">
            Master&apos;s Thesis
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <p className="text-sm font-medium mb-5 leading-snug text-[#e8e2d4]">
          Multiomic Integration of Monoglyceride Responses in Adipose Tissue Macrophages
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/noorgg22/Masters_Thesis_Multiomic_MG_Macrophage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all"
          >
            <span className="text-sm font-medium text-[#e8e2d4]">View on GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5756" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
          <a
            href="/thesis.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all"
          >
            <span className="text-sm font-medium text-[#e8e2d4]">Open PDF</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5756" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Exported wrapper components ────────────────────────────────── */

export function ResumeButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8e2d4]/12 text-[#e8e2d4] text-sm font-medium hover:border-[#e8e2d4]/30 hover:bg-white/5 transition-all"
      >
        View CV
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </button>
      <AnimatePresence>
        {open && <ResumeModalContent onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function ThesisButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group block w-full text-left rounded-2xl p-6 md:p-8 border border-white/8 hover:border-white/20 bg-white/[0.02] transition-all"
      >
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-[#cbff57] text-[#080808]">
                Master&apos;s Thesis
              </span>
              <span className="text-[11px] text-[#5a5756]">NYU &middot; 2025</span>
            </div>
            <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg md:text-xl mb-3 leading-snug tracking-tight text-[#e8e2d4]">
              Multiomic Integration of Monoglyceride Responses in Adipose Tissue Macrophages
            </h3>
            <p className="text-sm font-light leading-relaxed mb-5 text-[#5a5756]">
              Multi-omic analysis — transcriptomics, lipidomics, spatial lipidomics — to understand
              how monoglyceride signaling shapes macrophage behavior in adipose tissue. Built custom
              bioinformatics pipelines for data integration and visualization from scratch.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Transcriptomics', 'Lipidomics', 'Spatial Omics', 'R', 'Python', 'DESeq2'].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold px-3 py-1 rounded-full border border-white/9 text-[#5a5756]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#5a5756] group-hover:bg-white group-hover:border-white transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {open && <ThesisModalContent onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
