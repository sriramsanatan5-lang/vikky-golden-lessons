import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Headline whose words rise out of a mask when scrolled into view. */
export function SplitHeading({
  text,
  className = "",
  italic = [],
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  italic?: string[];
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${italic.includes(w) ? "italic text-caramel" : ""}`}
            variants={{ hidden: { y: "115%", rotate: 4 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.95, delay: delay + i * 0.07, ease }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Words light up one by one as the block scrolls through the viewport. */
export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span aria-hidden style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Infinite marquee that speeds up and skews with scroll velocity. */
export function VelocityMarquee({
  children,
  baseSpeed = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  baseSpeed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const factor = useTransform(v, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skew = useTransform(v, [-2000, 0, 2000], [8, 0, -8], { clamp: true });
  const dir = useRef(reverse ? -1 : 1);
  const track = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const width = (track.current?.scrollWidth ?? 0) / 2;
    if (!width) return;
    const f = factor.get();
    if (f < 0) dir.current = reverse ? 1 : -1;
    else if (f > 0) dir.current = reverse ? -1 : 1;
    let next = x.get() - dir.current * (baseSpeed * (delta / 1000)) * (1 + Math.abs(f));
    if (next <= -width) next += width;
    if (next > 0) next -= width;
    x.set(next);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div ref={track} className="flex w-max" style={{ x, skewX: skew }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/** Card with a soft caramel spotlight that follows the pointer. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, oklch(0.771 0.12 73 / 0.16), transparent 65%)`;
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-300);
        my.set(-300);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: bg }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/** 3D tilt that follows the pointer. */
export function TiltCard({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  return (
    <div className="[perspective:1200px]">
      <motion.div
        className={className}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Number that counts up once it scrolls into view. */
export function CountUp({ to, format = (n) => String(Math.round(n)), className = "" }: { to: number; format?: (n: number) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {format(val)}
    </span>
  );
}

/** Circular text badge that spins slowly and reacts to scroll. */
export function RotatingBadge({ text, className = "", children }: { text: string; className?: string; children?: ReactNode }) {
  const { scrollY } = useScroll();
  const spin = useTransform(scrollY, (v) => v * 0.15);
  const chars = text.split("");
  return (
    <div className={`grid place-items-center ${className || "relative"}`}>
      <motion.div style={{ rotate: spin }} className="absolute inset-0">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 200 200" className="size-full">
            <defs>
              <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text className="fill-foam text-[15px] font-bold uppercase tracking-[0.32em]" style={{ fontFamily: "var(--font-sans)" }}>
              <textPath href="#badge-circle">{chars.join("")}</textPath>
            </text>
          </svg>
        </div>
      </motion.div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Parallax helper: moves its children against the scroll. */
export function Parallax({ children, offset = 80, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
