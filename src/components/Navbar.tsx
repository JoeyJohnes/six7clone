'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Card centers: screen 1=About, 2=Awards(How), 3=Services — multiply by innerHeight
const links = [
  { label: 'Услуги',        screen: 15 },
  { label: 'Автоматизация', screen: 10 },
  { label: 'О нас',         screen: 5  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'linear-gradient(to right, rgba(44,169,225,0.85) 0%, rgba(6,8,16,0.75) 55%)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image src="/images/six7-logo.png" alt="Six7" width={120} height={38} className="h-[38px] w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => window.scrollTo({ top: l.screen * window.innerHeight, behavior: 'smooth' })}
                className="text-[13px] font-medium uppercase tracking-widest text-[rgba(240,242,245,0.8)] hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
                style={{ fontFamily: 'var(--font-roboto-mono)' }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <Link
          href="https://t.me/sashakets"
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:brightness-110"
          style={{ background: '#2ca9e1', fontFamily: 'var(--font-roboto-mono)' }}
        >
          Написать в Telegram
        </Link>

        <button className="md:hidden text-white p-2" aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
