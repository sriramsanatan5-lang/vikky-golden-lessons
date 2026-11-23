/* Hand-drawn style picture-password tiles. Strokes use currentColor; fills use palette tokens. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function SunTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <circle cx="32" cy="32" r="11" className="fill-gold" {...S} fill={undefined} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={32 + Math.cos(a) * 17} y1={32 + Math.sin(a) * 17} x2={32 + Math.cos(a) * 24} y2={32 + Math.sin(a) * 24} {...S} />;
      })}
    </svg>
  );
}
export function BookTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <path d="M10 18c8-3 15-2 22 3v28c-7-5-14-6-22-3z" className="fill-paper" {...S} fill={undefined} />
      <path d="M54 18c-8-3-15-2-22 3v28c7-5 14-6 22-3z" className="fill-gold-wash" {...S} fill={undefined} />
      <path d="M38 27c4-1.5 8-1.5 11 0M38 34c4-1.5 8-1.5 11 0" {...S} strokeWidth={1.8} />
    </svg>
  );
}
export function FoxTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <path d="M14 14l8 14h20l8-14-6 22c-2 8-8 14-12 14s-10-6-12-14z" className="fill-gold" {...S} fill={undefined} />
      <path d="M24 38c3 3 5 4 8 4s5-1 8-4c-2 7-5 10-8 10s-6-3-8-10z" className="fill-paper" {...S} fill={undefined} />
      <circle cx="25" cy="33" r="1.8" fill="currentColor" />
      <circle cx="39" cy="33" r="1.8" fill="currentColor" />
      <circle cx="32" cy="44" r="1.6" fill="currentColor" />
    </svg>
  );
}
export function BoatTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <path d="M32 10v28M32 12l14 22H32" className="fill-paper" {...S} fill={undefined} />
      <path d="M32 16L20 34h12" className="fill-gold-wash" {...S} fill={undefined} />
      <path d="M12 40h40l-6 9H18z" className="fill-bronze" {...S} fill={undefined} />
      <path d="M8 54c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2" {...S} strokeWidth={1.8} />
    </svg>
  );
}
export function StarTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <path d="M32 9l6.8 14 15.2 2.2-11 10.7 2.6 15.1L32 43.8 18.4 51l2.6-15.1-11-10.7L25.2 23z" className="fill-gold" {...S} fill={undefined} />
    </svg>
  );
}
export function TreeTile() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <path d="M32 40v14M26 54h12" {...S} />
      <path d="M32 8c-9 0-15 7-15 14-4 2-6 6-6 10 0 6 5 10 11 10h20c6 0 11-4 11-10 0-4-2-8-6-10 0-7-6-14-15-14z" className="fill-bronze-soft" {...S} fill={undefined} />
      <circle cx="24" cy="28" r="2" className="fill-gold" />
      <circle cx="38" cy="22" r="2" className="fill-gold" />
      <circle cx="40" cy="34" r="2" className="fill-gold" />
    </svg>
  );
}

export const TILES = [
  { name: "Sun", Art: SunTile },
  { name: "Book", Art: BookTile },
  { name: "Fox", Art: FoxTile },
  { name: "Boat", Art: BoatTile },
  { name: "Star", Art: StarTile },
  { name: "Tree", Art: TreeTile },
] as const;
