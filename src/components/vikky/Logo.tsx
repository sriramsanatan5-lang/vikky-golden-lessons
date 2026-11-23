export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid size-8 place-items-center rounded-xl bg-ink text-gold shadow-soft">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            d="M4 6.5 L12 19 L20 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="5" r="1.6" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-2xl font-semibold text-ink">Vikky</span>
    </span>
  );
}
