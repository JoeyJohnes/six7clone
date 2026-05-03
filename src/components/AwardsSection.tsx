export function AwardsSection() {
  const chips = [
    '4 Consecutive Quarter Wins',
    'Top 5 Ranking Every Quarter',
    '100K+ Communities Competing',
  ];

  const cards = [
    {
      title: '🏆 Q3 Skool Games — Winner',
      subtitle: 'Founder Nate Herk at the awards ceremony',
    },
    {
      title: '⚡ Leaderboard — 4 Quarters Running',
      subtitle: 'Consistent top-5 ranking against 100K+ communities',
    },
  ];

  return (
    <section
      id="awards"
      className="relative z-10 w-full py-24 px-4"
      style={{
        background: 'rgba(6,8,16,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
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
          🏆 PROVEN TRACK RECORD
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
          <span className="text-white">4X SKOOL GAMES </span>
          <span style={{ color: '#f39237' }}>WINNER</span>
        </h2>

        {/* Description */}
        <p
          className="max-w-2xl"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '16px',
            color: '#8a8f98',
            lineHeight: 1.7,
          }}
        >
          AI Automation Society has been recognized as a top community on Skool
          for 4 consecutive quarters, competing against hundreds of thousands of
          communities worldwide and consistently ranking in the top 5.
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-3 justify-center">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-6 py-3 rounded-full"
              style={{
                background: 'rgba(12,15,24,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                fontFamily: 'var(--font-roboto-mono)',
                fontWeight: 600,
                fontSize: '14px',
                color: '#ffffff',
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Showcase Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center justify-center py-12 px-8 gap-3"
              style={{
                background: 'rgba(12,15,24,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#ffffff',
                }}
              >
                {card.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '14px',
                  color: '#8a8f98',
                }}
              >
                {card.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
