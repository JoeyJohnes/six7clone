const features = [
  'Advanced Training Paths',
  'Priority Support Channel',
  'Exclusive Templates',
  'Private Mastermind',
];

export function PlusSection() {
  return (
    <section
      id="plus"
      className="relative z-10 w-full py-24 px-4"
      style={{
        background: 'rgba(6,8,16,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10">
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
          Plus Membership
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
          <span className="text-white">TAKE YOUR AUTOMATION TO </span>
          <span style={{ color: '#2ca9e1' }}>THE NEXT LEVEL</span>
        </h2>

        {/* Description */}
        <p
          className="max-w-xl"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '16px',
            color: '#8a8f98',
            lineHeight: 1.7,
          }}
        >
          Upgrade to AI Automation Society Plus for advanced training, priority
          support, and exclusive resources. Join 3,500+ members taking their
          automation to the next level.
        </p>

        {/* Features 2x2 grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#2ca9e1',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            style={{
              background: '#f39237',
              color: '#060810',
              borderRadius: '9999px',
              padding: '16px 32px',
              fontFamily: 'var(--font-roboto-mono)',
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            JOIN PLUS MEMBERSHIP →
          </button>
          <button
            type="button"
            style={{
              background: 'transparent',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '16px 32px',
              fontFamily: 'var(--font-roboto-mono)',
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
            }}
          >
            SHOP MERCH
          </button>
        </div>
      </div>
    </section>
  );
}
