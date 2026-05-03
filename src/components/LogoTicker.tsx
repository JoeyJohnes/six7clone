const ITEMS = ['n8n', 'Claude Code', 'Zapier', 'Make', 'OpenAI', 'Anthropic', 'LangChain', 'Skool'];

function TickerRow({ direction }: { direction: 'left' | 'right' }) {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={direction === 'left' ? 'ticker-left' : 'ticker-right'}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center" style={{ fontFamily: 'var(--font-roboto-mono)' }}>
            <span className="text-[13px] font-semibold uppercase tracking-[2px] text-[rgba(240,242,245,0.5)] px-6 whitespace-nowrap">
              {item}
            </span>
            <span style={{ color: 'rgba(44,169,225,0.4)', fontSize: '18px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoTicker() {
  return (
    <div className="relative z-10 py-8 overflow-hidden">
      <TickerRow direction="left" />
      <TickerRow direction="right" />
      <TickerRow direction="left" />
      <TickerRow direction="right" />
    </div>
  );
}
