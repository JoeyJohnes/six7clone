export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 py-32 px-6"
      style={{ background: 'rgba(6, 8, 16, 0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[13px] font-medium uppercase tracking-[3px] text-[#8a8f98] mb-6"
          style={{ fontFamily: 'var(--font-roboto-mono)' }}
        >
          — About Us
        </p>
        <h2
          className="mb-8 leading-none"
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: 'clamp(36px, 4vw, 64px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          <span className="text-white">Making AI Automation</span>
          <br />
          <span style={{ color: '#2ca9e1' }}>Accessible</span>
        </h2>
        <p className="text-lg italic text-[rgba(240,242,245,0.85)] max-w-2xl mb-16 leading-relaxed">
          Our mission: to give anyone, regardless of background, a clear path from zero to
          implementing real AI automations that solve real-world problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              value: '330,000+',
              label: 'Community Members',
              desc: 'The largest AI automation community in the world',
              color: '#2ca9e1',
              valueSize: '48px',
            },
            {
              value: '3,500+',
              label: 'Plus Members',
              desc: 'Advanced training and priority support',
              color: '#2ca9e1',
              valueSize: '48px',
            },
            {
              value: 'Expert-Led',
              label: 'Founded by Nate Herk',
              desc: 'Proven expertise in AI automation',
              color: '#f39237',
              valueSize: '36px',
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(12, 15, 24, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
                  fontSize: card.valueSize,
                  color: card.color,
                }}
              >
                {card.value}
              </div>
              <div
                className="text-[11px] font-semibold uppercase tracking-[2px] text-[#f0f2f5] mb-2"
                style={{ fontFamily: 'var(--font-roboto-mono)' }}
              >
                {card.label}
              </div>
              <div className="text-sm text-[#8a8f98]">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
