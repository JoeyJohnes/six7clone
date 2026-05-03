'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cardBg = scrolled ? 'rgba(12, 15, 24, 0.08)' : 'rgba(12, 15, 24, 0.6)';
  const cardBlur = scrolled ? 'blur(2px)' : 'blur(20px)';
  const cardBorder = scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.08)';

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
      <div
        className="w-full max-w-4xl mx-auto rounded-3xl flex flex-col items-center text-center px-12 md:px-20 py-16"
        style={{
          background: cardBg,
          backdropFilter: cardBlur,
          WebkitBackdropFilter: cardBlur,
          border: cardBorder,
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(44, 169, 225, 0.15)',
            border: '1px solid rgba(44,169,225,0.3)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ca9e1]" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[2px] text-[#2ca9e1]"
            style={{ fontFamily: 'var(--font-roboto-mono)' }}
          >
            World&apos;s Largest AI Automation Community
          </span>
        </div>

        {/* H1 */}
        <h1
          className="mb-6 leading-none"
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: 'clamp(42px, 6.5vw, 93px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
          }}
        >
          <span className="text-white block">Unleash the</span>
          <span className="block" style={{ color: '#2ca9e1' }}>AI Society</span>
        </h1>

        {/* Subtext */}
        <p className="text-[#f0f2f5] text-lg mb-10 max-w-xl leading-relaxed">
          Join <strong>330,000+</strong> innovators mastering{' '}
          <strong>n8n</strong>, <strong>Claude Code</strong>, and cutting-edge
          AI tools to build real businesses with AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="https://www.skool.com/ai-automation-society"
            className="px-8 py-4 rounded-full text-white text-[13px] font-semibold uppercase tracking-widest transition-all hover:brightness-110"
            style={{ background: '#2ca9e1', fontFamily: 'var(--font-roboto-mono)' }}
          >
            Join Free Community
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 rounded-full text-[#f0f2f5] text-[13px] font-semibold uppercase tracking-widest transition-all hover:bg-white/10"
            style={{
              background: 'rgba(12,15,24,0.75)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'var(--font-roboto-mono)',
            }}
          >
            Explore ↓
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="w-full max-w-lg mx-auto mt-6 rounded-2xl grid grid-cols-3"
        style={{
          background: scrolled ? 'rgba(12, 15, 24, 0.2)' : 'rgba(12, 15, 24, 0.6)',
          backdropFilter: cardBlur,
          WebkitBackdropFilter: cardBlur,
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'background 0.4s ease',
        }}
      >
        {[
          { value: '330K+', label: 'Free Members' },
          { value: '3.5K+', label: 'Plus Members' },
          { value: '#1', label: 'AI Community' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-5"
            style={{
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <span
              className="text-2xl md:text-3xl font-bold text-[#2ca9e1]"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}
            >
              {stat.value}
            </span>
            <span
              className="text-[10px] uppercase tracking-widest text-[#c5c8cc] mt-1"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
