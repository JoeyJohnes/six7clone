'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// ─── Ticker data ─────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  'n8n', 'Claude Code', 'Zapier', 'Make', 'OpenAI', 'Anthropic', 'LangChain', 'Skool',
  'Cursor', 'Perplexity', 'Midjourney', 'Replit',
];

function TickerRow({ dir }: { dir: 'left' | 'right' }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden py-1">
      <div
        className={dir === 'left' ? 'ticker-left' : 'ticker-right'}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center" style={{ fontFamily: 'var(--font-roboto-mono)' }}>
            <span className="text-[12px] font-semibold uppercase tracking-[2px] text-[rgba(240,242,245,0.45)] px-5 whitespace-nowrap">
              {item}
            </span>
            <span style={{ color: 'rgba(44,169,225,0.35)', fontSize: '16px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Services data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'ИИ-агент для клиентов',
    desc: 'Отвечает на вопросы, записывает, напоминает. Работает в Telegram 24/7 — без вас.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ca9e1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="10" r="1.5" />
        <circle cx="8" cy="10" r="1.5" />
        <circle cx="16" cy="10" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Документооборот и рассылки',
    desc: 'Договоры, акты, уведомления — генерируются и уходят автоматически. Одному или сразу всем.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ca9e1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'База данных и аналитика',
    desc: 'Всё, что собирается от клиентов — заявки, ответы, действия — складывается в базу. Видите картину целиком.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ca9e1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Сайт, который работает',
    desc: 'Не визитка, а инструмент. С первого дня подключён к автоматизации.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ca9e1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

// ─── Scroll math ──────────────────────────────────────────────────────────────

// Page = 4000vh CSS = 40 full screens. SCROLL_DRIVER_VH=40 → maxScroll=39×innerHeight.
// Centers every 5 screens. SPREAD=4 → 100px scroll moves card 25px (visible). 80 frames/card.
const SPREAD = 4;

function buildCenters(vh: number): number[] {
  return [
    0  * vh,   // Hero     (screen 0)
    5  * vh,   // About    (screen 5)
    10 * vh,   // Awards   (screen 10)
    15 * vh,   // Services (screen 15)
    20 * vh,   // Plus     (screen 20)
    25 * vh,   // CTA      (screen 25)
  ];
}

// translateY in px: card enters from +vh (below), centers at 0, exits at -vh (above)
function cardTY(scrollY: number, center: number, vh: number): number {
  return -(scrollY - center) / SPREAD;
}

// Opacity: fully visible within 0.4vh of center, fully gone beyond 0.7vh.
// This ensures adjacent cards (5vh apart) don't both show at page load.
function cardOpacity(ty: number, vh: number): number {
  const abs = Math.abs(ty);
  if (abs >= vh * 0.7) return 0;
  if (abs > vh * 0.4) return 1 - (abs - vh * 0.4) / (vh * 0.3);
  return 1;
}

// ─── Card 1: Hero ─────────────────────────────────────────────────────────────

function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = cardRef.current;
      if (!el) return;
      const scrolled = window.scrollY > 30;
      el.style.background    = scrolled ? 'rgba(12,15,24,0.06)' : 'rgba(12,15,24,0.6)';
      el.style.backdropFilter       = scrolled ? 'blur(2px)' : 'blur(20px)';
      (el.style as CSSStyleDeclaration & { WebkitBackdropFilter: string }).WebkitBackdropFilter =
        scrolled ? 'blur(2px)' : 'blur(20px)';
      el.style.borderColor   = scrolled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-4xl mx-auto rounded-3xl flex flex-col items-center text-center px-5 md:px-20 py-8 md:py-14"
      style={{
        background: 'rgba(12,15,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
        style={{ background: 'rgba(44,169,225,0.15)', border: '1px solid rgba(44,169,225,0.3)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2ca9e1]" />
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#2ca9e1]"
          style={{ fontFamily: 'var(--font-roboto-mono)' }}>
          Автоматизация бизнеса
        </span>
      </div>

      {/* H1 */}
      <h1
        className="mb-5 leading-none"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(40px, 6.5vw, 90px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
        }}
      >
        <span className="text-white block">Оцифровка</span>
        <span className="block" style={{ color: '#2ca9e1' }}>вашего бизнеса</span>
      </h1>

      {/* Subtext */}
      <p className="text-[#f0f2f5] text-lg mb-8 max-w-xl leading-relaxed">
        Делаю так, чтобы ваш сайт реально продавал.
        Автоматизирую всё: от записи до оплаты.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Link
          href="https://t.me/sashakets"
          target="_blank"
          rel="noopener"
          className="px-8 py-4 rounded-full text-white text-[13px] font-semibold uppercase tracking-widest transition-all hover:brightness-110"
          style={{ background: '#2ca9e1', fontFamily: 'var(--font-roboto-mono)' }}
        >
          Написать в Telegram →
        </Link>
      </div>

      {/* Stats bar */}
      <div
        className="w-full max-w-lg mx-auto rounded-2xl grid grid-cols-3 text-center"
        style={{
          background: 'rgba(12,15,24,0.5)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {[
          { value: '3 года', label: 'в ИИ' },
          { value: '3 дня',  label: 'среднее время запуска' },
          { value: '24/7',   label: 'ИИ-агент работает' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-4"
            style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <span className="text-2xl font-bold text-[#2ca9e1]"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}>
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#c5c8cc] mt-1"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 2: About ────────────────────────────────────────────────────────────

function AboutCard() {
  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl px-5 md:px-12 py-8 md:py-12"
      style={{
        background: 'rgba(12,15,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-[13px] font-medium uppercase tracking-[3px] text-[#8a8f98] mb-5"
        style={{ fontFamily: 'var(--font-roboto-mono)' }}>
        — О нас
      </p>
      <h2
        className="mb-6 leading-none"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(34px, 4.5vw, 68px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
        }}
      >
        <span className="text-white">ИИ-автоматизация</span>
        <br />
        <span style={{ color: '#2ca9e1' }}>для каждого</span>
      </h2>
      <p className="text-lg text-[rgba(240,242,245,0.85)] max-w-2xl mb-10 leading-relaxed">
        Наша миссия — дать каждому, независимо от опыта, чёткий путь от нуля до
        работающих ИИ-автоматизаций, которые решают реальные задачи бизнеса.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { value: 'Рутина съедает время',  label: '', desc: 'Одни и те же задачи каждый день — заявки, ответы, документы', color: '#2ca9e1', size: '20px' },
          { value: 'Клиенты не ждут',       label: '', desc: 'Пока отвечаешь вручную — человек уже ушёл к конкуренту',      color: '#f39237', size: '20px' },
          { value: 'Запуск за 3 дня',       label: '', desc: 'Описываешь задачу — получаешь готовую систему',                color: '#2ca9e1', size: '20px' },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(12,15,24,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="font-bold mb-2"
              style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: card.size, color: card.color }}>
              {card.value}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[#f0f2f5] mb-1"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}>
              {card.label}
            </div>
            <div className="text-sm text-[#8a8f98]">{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Logo ticker */}
      <div className="overflow-hidden">
        <TickerRow dir="left" />
        <TickerRow dir="right" />
      </div>
    </div>
  );
}

// ─── Card 3: Awards ───────────────────────────────────────────────────────────

function AwardsCard() {
  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl px-5 md:px-12 py-8 md:py-12"
      style={{
        background: 'rgba(12,15,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-[13px] font-medium uppercase tracking-[3px] text-[#8a8f98] mb-5"
        style={{ fontFamily: 'var(--font-roboto-mono)' }}>
        — Как это работает
      </p>
      <h2
        className="mb-5 leading-none"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(32px, 4vw, 62px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
        }}
      >
        <span className="text-white">Три шага — и система </span>
        <span style={{ color: '#2ca9e1' }}>работает без вас</span>
      </h2>
      <p className="text-[#8a8f98] max-w-2xl mb-8 leading-relaxed" style={{ fontSize: '16px' }}>
        Никакого долгого внедрения. От разговора до работающей автоматизации — за несколько дней.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            step: 'Шаг 1',
            title: 'Разбираем задачу',
            desc: 'Смотрим где теряется время и клиенты. Находим одну конкретную точку роста.',
            color: '#2ca9e1',
          },
          {
            step: 'Шаг 2',
            title: 'Строим систему',
            desc: 'Автоматизация и ИИ-агент под вашу задачу. Без лишнего — только то, что нужно.',
            color: '#2ca9e1',
          },
          {
            step: 'Шаг 3',
            title: 'Запускаем',
            desc: 'Вы занимаетесь бизнесом — система работает сама. Напоминания, ответы, документы.',
            color: '#f39237',
          },
        ].map((s) => (
          <div
            key={s.step}
            className="flex flex-col gap-3 py-7 px-6"
            style={{
              background: 'rgba(12,15,24,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-roboto-mono)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color }}>
              {s.step}
            </span>
            <span style={{ fontFamily: 'var(--font-roboto-mono)', fontWeight: 700, fontSize: '16px', color: '#ffffff' }}>
              {s.title}
            </span>
            <span style={{ fontSize: '13px', color: '#8a8f98', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 4: Services ─────────────────────────────────────────────────────────

function ServicesCard() {
  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl px-5 md:px-10 py-6 md:py-8"
      style={{
        background: 'rgba(12,15,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-[13px] font-medium uppercase tracking-[3px] text-[#8a8f98] mb-4"
        style={{ fontFamily: 'var(--font-roboto-mono)' }}>
        — Что входит
      </p>
      <h2
        className="mb-6 leading-tight"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(24px, 3vw, 46px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
        }}
      >
        <span className="text-white">Автоматизация </span>
        <span style={{ color: '#2ca9e1' }}>под вашу задачу</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="flex flex-col gap-3"
            style={{
              background: 'rgba(12,15,24,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '18px 20px',
            }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(44,169,225,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <span style={{
              fontFamily: 'var(--font-roboto-mono)', fontWeight: 600,
              fontSize: '13px', textTransform: 'uppercase', color: '#ffffff',
            }}>
              {s.title}
            </span>
            <p style={{ fontSize: '13px', color: '#8a8f98', lineHeight: 1.6, margin: 0 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 5: Case study ───────────────────────────────────────────────────────

function CaseCard() {
  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl px-5 md:px-12 py-8 md:py-12"
      style={{
        background: 'rgba(12,15,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-[13px] font-medium uppercase tracking-[3px] text-[#8a8f98] mb-5"
        style={{ fontFamily: 'var(--font-roboto-mono)' }}>
        — Кейс
      </p>

      <h2
        className="mb-3 leading-tight"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(30px, 4vw, 58px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
        }}
      >
        <span className="text-white block">Kwitansi</span>
        <span className="block" style={{ color: '#2ca9e1' }}>сервис для арендодателей</span>
      </h2>

      <p className="max-w-xl mb-10 leading-relaxed" style={{ fontSize: '16px', color: '#8a8f98' }}>
        Арендодатели тратили больше часа на каждый акт приёма-передачи. Теперь — 30 секунд.
      </p>

      {/* Steps: задача → решение → результат */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {[
          {
            label: 'Задача',
            color: '#8a8f98',
            text: 'Каждый акт — вручную: данные, подписи, отправка. От 15 минут до нескольких часов, если нужна печать и доставка.',
          },
          {
            label: 'Решение',
            color: '#2ca9e1',
            text: 'Система берёт данные из базы, заполняет шаблон и отправляет арендатору автоматически.',
          },
          {
            label: 'Результат',
            color: '#f39237',
            text: '0 ручной работы. Акт готов за 30 секунд. Арендатор получает документ сразу.',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-3 py-7 px-6"
            style={{
              background: 'rgba(12,15,24,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-roboto-mono)', fontWeight: 700,
              fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: s.color,
            }}>
              {s.label}
            </span>
            <span style={{ fontSize: '13px', color: '#c5c8cc', lineHeight: 1.6 }}>{s.text}</span>
          </div>
        ))}
      </div>

      <Link
        href="https://t.me/sashakets"
        target="_blank"
        rel="noopener"
        className="transition-all hover:brightness-110"
        style={{
          display: 'inline-block',
          background: '#2ca9e1', color: '#ffffff',
          borderRadius: '9999px', padding: '14px 32px',
          fontFamily: 'var(--font-roboto-mono)', fontWeight: 600,
          fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none',
        }}
      >
        Хочу такой же →
      </Link>
    </div>
  );
}

// ─── Card 6: CTA ──────────────────────────────────────────────────────────────

function CTACard() {
  return (
    <div
      className="w-full max-w-xl mx-auto flex flex-col items-center text-center gap-5 py-8 md:py-14 px-5 md:px-10"
      style={{
        background: 'rgba(12,15,24,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
      }}
    >
      {/* Logo / globe icon */}
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, #2ca9e1 0%, #1a6fa0 50%, #0a2a40 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 32px rgba(44,169,225,0.35)',
        flexShrink: 0,
      }}>
        {/* Try to load logo; falls back to text */}
        <Image
          src="/images/six7-logo.png"
          alt="Six7"
          width={72}
          height={72}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Label */}
      <span className="text-[12px] font-medium uppercase tracking-[3px] text-[#8a8f98]"
        style={{ fontFamily: 'var(--font-roboto-mono)' }}>
        — Готовы к автоматизации?
      </span>

      {/* H2 */}
      <h2
        className="leading-tight"
        style={{
          fontFamily: 'var(--font-roboto-mono)',
          fontSize: 'clamp(28px, 3.5vw, 52px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
        }}
      >
        <span className="text-white block">ИИ работает,</span>
        <span className="block" style={{ color: '#2ca9e1' }}>пока вы отдыхаете.</span>
      </h2>

      <p className="max-w-sm leading-relaxed" style={{ fontSize: '16px', color: '#8a8f98' }}>
        Напишите — запустим автоматизацию за 3 дня.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="https://t.me/sashakets"
          target="_blank"
          rel="noopener"
          className="transition-all hover:brightness-110 text-center"
          style={{
            display: 'block',
            background: '#2ca9e1', color: '#ffffff',
            borderRadius: '9999px', padding: '14px 40px',
            fontFamily: 'var(--font-roboto-mono)', fontWeight: 600,
            fontSize: '13px', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          ✈ Написать в Telegram →
        </Link>
        <Link
          href="https://t.me/+CUuzE04xtpU2ZGY0"
          target="_blank"
          rel="noopener"
          className="transition-all hover:bg-white/10 text-center"
          style={{
            display: 'block',
            background: 'transparent', color: '#ffffff',
            borderRadius: '9999px', padding: '14px 40px',
            fontFamily: 'var(--font-roboto-mono)', fontWeight: 600,
            fontSize: '13px', textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.2)',
            textDecoration: 'none',
          }}
        >
          Следить за новостями
        </Link>
      </div>
    </div>
  );
}

// ─── Card registry ────────────────────────────────────────────────────────────

const CARDS = [HeroCard, AboutCard, AwardsCard, ServicesCard, CaseCard, CTACard];

// ─── Main scroll journey ──────────────────────────────────────────────────────

export function ScrollJourney() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>(Array(CARDS.length).fill(null));
  const tiltRefs = useRef<(HTMLDivElement | null)[]>(Array(CARDS.length).fill(null));
  const centersRef = useRef<number[]>([]);
  const tyRefs = useRef<number[]>(Array(CARDS.length).fill(0));

  useEffect(() => {
    const refresh = () => {
      centersRef.current = buildCenters(window.innerHeight);
    };
    refresh();

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      centersRef.current.forEach((center, i) => {
        const el   = containerRefs.current[i];
        const tilt = tiltRefs.current[i];
        if (!el || !tilt) return;

        const ty = cardTY(y, center, vh);
        const op = cardOpacity(ty, vh);
        tyRefs.current[i] = ty;

        el.style.opacity       = String(op);
        el.style.pointerEvents = op > 0.05 ? 'auto' : 'none';
        tilt.style.transform   = `perspective(1200px) translateY(${ty.toFixed(1)}px)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { refresh(); onScroll(); });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const tilt = tiltRefs.current[i];
    if (!tilt) return;
    const rect = tilt.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const ty = tyRefs.current[i] ?? 0;
    tilt.style.transform  = `perspective(1200px) translateY(${ty.toFixed(1)}px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg)`;
    tilt.style.transition = 'transform 0.08s ease';
  };

  const handleMouseLeave = (i: number) => {
    const tilt = tiltRefs.current[i];
    if (!tilt) return;
    const ty = tyRefs.current[i] ?? 0;
    tilt.style.transform  = `perspective(1200px) translateY(${ty.toFixed(1)}px) rotateX(0deg) rotateY(0deg)`;
    tilt.style.transition = 'transform 0.5s ease';
  };

  return (
    <>
      {/* 2600vh CSS = 26 full screens. maxScroll=25×vh = last card center → stops exactly centered. */}
      <div style={{ height: '2600vh' }} aria-hidden="true" />

      {/* Fixed card overlays */}
      {CARDS.map((Card, i) => (
        <div
          key={i}
          ref={el => { containerRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            inset: 0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            zIndex:         10,
            opacity:        i === 0 ? 1 : 0,
            pointerEvents:  i === 0 ? 'auto' : 'none',
            // account for navbar height + small vertical padding
            padding: '72px 20px 20px',
          }}
          onMouseMove={e => handleMouseMove(e, i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <div
            ref={el => { tiltRefs.current[i] = el; }}
            style={{ width: '100%', maxWidth: '1024px', transformStyle: 'preserve-3d' }}
          >
            <Card />
          </div>
        </div>
      ))}
    </>
  );
}
