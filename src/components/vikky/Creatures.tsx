import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { animate, motion, useAnimationControls, useMotionValue } from "framer-motion";

type Kind = {
  color: string;
  w: number;
  h: number;
  eyes: 1 | 2 | 3;
  extra: "ears" | "antenna" | "horns" | "tuft" | "none" | "bunny";
  left: string;
};

const KINDS: Kind[] = [
  { color: "var(--creature-1)", w: 96, h: 84, eyes: 2, extra: "ears", left: "4%" },
  { color: "var(--creature-2)", w: 78, h: 96, eyes: 1, extra: "antenna", left: "20%" },
  { color: "var(--creature-3)", w: 110, h: 76, eyes: 3, extra: "none", left: "36%" },
  { color: "var(--creature-4)", w: 84, h: 88, eyes: 2, extra: "horns", left: "54%" },
  { color: "var(--creature-5)", w: 92, h: 80, eyes: 2, extra: "tuft", left: "70%" },
  { color: "var(--creature-6)", w: 76, h: 92, eyes: 2, extra: "bunny", left: "85%" },
];

export function CreatureStrip() {
  const strip = useRef<HTMLDivElement>(null);
  const handles = useRef<(CreatureHandle | null)[]>([]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
        <p className="max-w-xl text-sm text-foam-dim">
          Six fuzzy creatures sit along the bottom of the footer. Drag them around, or click one to make
          it hop.
        </p>
        <button
          onClick={() => handles.current.forEach((h, i) => h?.drop(i * 0.08))}
          className="cursor-pointer rounded-full bg-foam px-4 py-2 text-sm font-semibold text-espresso transition-colors hover:bg-caramel"
        >
          Drop them again
        </button>
      </div>
      <div ref={strip} className="relative mt-4 h-52 overflow-hidden sm:h-56">
        <svg className="absolute size-0" aria-hidden>
          <defs>
            <filter id="vikky-fuzz" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
        {KINDS.map((k, i) => (
          <Creature
            key={i}
            kind={k}
            constraints={strip}
            ref={(h) => {
              handles.current[i] = h;
            }}
          />
        ))}
      </div>
    </div>
  );
}

type CreatureHandle = { drop: (delay: number) => void };

const Creature = forwardRef<
  CreatureHandle,
  { kind: Kind; constraints: React.RefObject<HTMLDivElement | null> }
>(function Creature({ kind, constraints }, ref) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hop = useAnimationControls();
  const [blink, setBlink] = useState(false);
  const dragged = useRef(false);

  useImperativeHandle(ref, () => ({
    drop(delay: number) {
      animate(x, 0, { duration: 0.5, delay, ease: "easeOut" });
      y.set(-260);
      animate(y, 0, { type: "spring", stiffness: 260, damping: 11, mass: 1.1, delay });
    },
  }));

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2000 + Math.random() * 3500);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const doHop = () => {
    setBlink(true);
    setTimeout(() => setBlink(false), 160);
    void hop.start({
      y: [0, -70, 0, -14, 0],
      scaleY: [1, 1.08, 0.86, 1.03, 1],
      scaleX: [1, 0.94, 1.12, 0.98, 1],
      transition: { duration: 0.75, times: [0, 0.35, 0.65, 0.82, 1], ease: "easeOut" },
    });
  };

  return (
    <motion.div
      className="absolute bottom-0 cursor-grab touch-none active:cursor-grabbing"
      style={{ left: kind.left, x, y, width: kind.w }}
      drag
      dragConstraints={constraints}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
      onDragStart={() => (dragged.current = true)}
      onPointerDown={() => (dragged.current = false)}
      onClick={() => {
        if (!dragged.current) doHop();
      }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.08, rotate: -4 }}
      role="button"
      aria-label="Fuzzy creature. Click to make it hop."
    >
      <motion.div animate={hop} style={{ originY: 1 }}>
        <CreatureArt kind={kind} blink={blink} />
      </motion.div>
    </motion.div>
  );
});

function CreatureArt({ kind, blink }: { kind: Kind; blink: boolean }) {
  const { w, h, color, eyes, extra } = kind;
  const vbW = 100;
  const vbH = (h / w) * 100;
  const cy = vbH - vbH * 0.42;
  const rx = 44;
  const ry = vbH * 0.4;
  const eyeY = cy - ry * 0.15;
  const eyeXs = eyes === 1 ? [50] : eyes === 2 ? [36, 64] : [30, 50, 70];
  const eyeR = eyes === 1 ? 13 : eyes === 3 ? 7.5 : 9.5;

  return (
    <svg viewBox={`0 -30 ${vbW} ${vbH + 30}`} width={w} height={h + (30 * w) / 100} className="block overflow-visible">
      {/* extras behind body */}
      <g filter="url(#vikky-fuzz)" fill={color}>
        {extra === "ears" && (
          <>
            <circle cx={22} cy={cy - ry + 4} r={12} />
            <circle cx={78} cy={cy - ry + 4} r={12} />
          </>
        )}
        {extra === "bunny" && (
          <>
            <ellipse cx={34} cy={cy - ry - 10} rx={8} ry={20} />
            <ellipse cx={66} cy={cy - ry - 10} rx={8} ry={20} />
          </>
        )}
        {extra === "tuft" && (
          <path d={`M40 ${cy - ry + 6} Q46 ${cy - ry - 18} 50 ${cy - ry + 2} Q56 ${cy - ry - 22} 60 ${cy - ry + 6}z`} />
        )}
        <ellipse cx={50} cy={cy} rx={rx} ry={ry} />
        {/* feet */}
        <ellipse cx={32} cy={vbH - 4} rx={11} ry={5} />
        <ellipse cx={68} cy={vbH - 4} rx={11} ry={5} />
      </g>
      {extra === "antenna" && (
        <g stroke="var(--espresso)" strokeWidth={2.4} strokeLinecap="round" fill="none">
          <path d={`M50 ${cy - ry + 2} Q48 ${cy - ry - 14} 56 ${cy - ry - 22}`} />
          <circle cx={57} cy={cy - ry - 24} r={4} fill="var(--caramel)" stroke="none" />
        </g>
      )}
      {extra === "horns" && (
        <g fill="var(--foam)" stroke="var(--espresso)" strokeWidth={1.6} strokeLinejoin="round">
          <path d={`M28 ${cy - ry + 10} L22 ${cy - ry - 10} L38 ${cy - ry + 4}z`} />
          <path d={`M72 ${cy - ry + 10} L78 ${cy - ry - 10} L62 ${cy - ry + 4}z`} />
        </g>
      )}
      {/* belly sheen */}
      <ellipse cx={50} cy={cy + ry * 0.35} rx={rx * 0.5} ry={ry * 0.35} fill="var(--foam)" opacity={0.25} />
      {/* eyes */}
      {eyeXs.map((ex) => (
        <g key={ex} transform={`translate(${ex} ${eyeY})`}>
          <motion.g animate={{ scaleY: blink ? 0.08 : 1 }} transition={{ duration: 0.08 }}>
            <ellipse rx={eyeR} ry={eyeR * 1.1} fill="var(--foam)" stroke="var(--espresso)" strokeWidth={1.6} />
            <circle cx={eyeR * 0.15} cy={eyeR * 0.2} r={eyeR * 0.5} fill="var(--espresso)" />
            <circle cx={eyeR * 0.35} cy={-eyeR * 0.1} r={eyeR * 0.16} fill="var(--foam)" />
          </motion.g>
        </g>
      ))}
      {/* mouth */}
      <path
        d={`M${44} ${eyeY + eyeR + 8} Q50 ${eyeY + eyeR + 14} ${56} ${eyeY + eyeR + 8}`}
        stroke="var(--espresso)"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
