'use client';

import { useState, useCallback } from 'react';

export default function CopyEmail({
  email = 'gui.becker.trindade@gmail.com',
  className = '',
}: {
  email?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [email]);

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8e2d4]/12 text-[#e8e2d4] text-sm font-medium hover:border-[#e8e2d4]/30 hover:bg-white/5 transition-all ${className}`}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          {email}
        </>
      )}
    </button>
  );
}
