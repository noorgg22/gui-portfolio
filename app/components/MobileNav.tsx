'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
      >
        <span
          className="block h-[2px] w-5 rounded-full bg-[#e8e2d4] transition-transform duration-300"
          style={open ? { transform: 'translateY(3.5px) rotate(45deg)' } : undefined}
        />
        <span
          className="block h-[2px] w-5 rounded-full bg-[#e8e2d4] transition-transform duration-300"
          style={open ? { transform: 'translateY(-3.5px) rotate(-45deg)' } : undefined}
        />
      </button>

      {/* Overlay menu */}
      {open && (
        <div className="fixed inset-0 z-[55] bg-[#080808]/95 backdrop-blur-md flex flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#e8e2d4] hover:text-[#cbff57] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
