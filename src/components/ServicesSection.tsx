const services = [
  {
    title: 'Courses & Training',
    desc: 'Structured learning paths for n8n, Claude Code, and modern AI tools — from beginner to advanced, master automation step by step.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2ca9e1"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Community Forum',
    desc: 'Connect with 300K+ members, get help, share wins, and collaborate on projects. Never automate alone again.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2ca9e1"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Live Workshops',
    desc: 'Regular expert-led sessions to keep you at the cutting edge of AI automation. Learn directly from practitioners.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2ca9e1"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.702a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
      </svg>
    ),
  },
  {
    title: 'Tools & Templates',
    desc: 'Ready-to-use automation blueprints and exclusive resources. Hit the ground running with proven solutions.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2ca9e1"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 w-full py-24 px-4"
      style={{
        background: 'rgba(6,8,16,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
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
          — WHAT WE OFFER
        </span>

        {/* H2 */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontWeight: 700,
            fontSize: 'clamp(32px,3.5vw,56px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          <span className="text-white">EVERYTHING YOU NEED TO </span>
          <span style={{ color: '#2ca9e1' }}>MASTER AI AUTOMATION</span>
        </h2>

        {/* Cards grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-5"
              style={{
                background: 'rgba(12,15,24,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              {/* Icon wrapper */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(44,169,225,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <span
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                {service.title}
              </span>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '14px',
                  color: '#8a8f98',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
