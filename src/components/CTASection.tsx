import Image from 'next/image';

export function CTASection() {
  return (
    <section className="relative z-10 w-full py-24 px-4 flex items-center justify-center">
      <div
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8 py-16 px-8"
        style={{
          background: 'rgba(12,15,24,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
        }}
      >
        {/* Logo */}
        <Image
          src="/images/AIS-Logo.png"
          alt="AI Automation Society Logo"
          width={80}
          height={80}
          style={{ height: '80px', width: 'auto' }}
        />

        {/* Label */}
        <span
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#8a8f98',
          }}
        >
          — READY WHEN YOU ARE
        </span>

        {/* H2 */}
        <h2
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontWeight: 700,
            fontSize: 'clamp(32px,3.5vw,56px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          <span className="text-white">JOIN THE </span>
          <span style={{ color: '#2ca9e1' }}>MOVEMENT</span>
        </h2>

        {/* Description */}
        <p
          className="max-w-md"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '16px',
            color: '#8a8f98',
            lineHeight: 1.7,
          }}
        >
          330,000+ innovators are building real businesses with n8n, Claude
          Code, and cutting-edge AI. Your seat is free.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          style={{
            background: '#2ca9e1',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '16px 40px',
            fontFamily: 'var(--font-roboto-mono)',
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          JOIN FREE COMMUNITY →
        </button>
      </div>
    </section>
  );
}
