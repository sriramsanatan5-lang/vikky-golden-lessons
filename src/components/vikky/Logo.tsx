export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid size-8 place-items-center rounded-full bg-foam text-sugar">
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
          <path d="M5 7 L12 18.5 L19 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="5.2" r="1.7" className="fill-caramel-deep" />
        </svg>
      </span>
      <span className="font-display text-2xl font-semibold text-foam">Vikky</span>
    </span>
  );
}
