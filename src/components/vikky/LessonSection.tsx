import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ChevronsDown, Star } from "lucide-react";
import { LESSON_STEPS } from "./content";
import { useScrollTo } from "./SmoothScroll";

const spring = { type: "spring", stiffness: 120, damping: 20 } as const;

export function LessonSection() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const s = Math.min(LESSON_STEPS.length - 1, Math.max(0, Math.floor(p * LESSON_STEPS.length * 0.999)));
    setStep((prev) => (prev === s ? prev : s));
  });

  const jumpTo = (i: number) => {
    setStep(i);
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    scrollTo(top + range * ((i + 0.5) / LESSON_STEPS.length), 0);
  };

  return (
    <section id="lesson" ref={ref} className="relative h-[520vh] border-y border-hairline bg-sand/45">
      <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> One question, five steps
            </p>
            <h2 className="mt-3 text-4xl font-medium text-ink sm:text-5xl lg:text-6xl">Watch one lesson</h2>
            <p className="mt-4 hidden max-w-md text-lg text-ink-soft sm:block">
              Scroll to see how Vikky teaches a single question. The answer only comes at the end.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 lg:mt-8" role="tablist" aria-label="Lesson steps">
              {LESSON_STEPS.map((s, i) => {
                const on = i === step;
                const done = i < step;
                return (
                  <button
                    key={s.name}
                    role="tab"
                    aria-selected={on}
                    onClick={() => jumpTo(i)}
                    className={`relative cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors sm:px-4 sm:py-2 ${
                      on
                        ? "border-gold-deep/40 text-ink"
                        : done
                          ? "border-bronze/30 bg-paper text-ink"
                          : "border-hairline bg-paper/50 text-muted-foreground hover:text-ink"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="step-pill"
                        className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold"
                        transition={spring}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      <span className="tabular-nums opacity-60">{i + 1}</span> {s.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 hidden h-[2px] w-full max-w-md overflow-hidden rounded-full bg-hairline lg:block">
              <motion.div className="h-full origin-left bg-gold" style={{ scaleX: bar }} />
            </div>

            <AnimatePresence>
              {step === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 hidden items-center gap-2 text-sm font-medium text-bronze lg:flex"
                >
                  <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    <ChevronsDown className="size-4" />
                  </motion.span>
                  Scroll to open the lesson
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Laptop step={step} />
        </div>
      </div>
    </section>
  );
}

function Laptop({ step }: { step: number }) {
  const s = LESSON_STEPS[step] ?? LESSON_STEPS[0];
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* lid */}
      <div className="rounded-t-[1.6rem] rounded-b-md bg-bezel p-2 shadow-lift sm:p-3">
        <div className="relative overflow-hidden rounded-xl bg-screen sm:rounded-2xl">
          {/* app bar */}
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm">
            <span className="font-display text-base font-semibold text-ink sm:text-lg">Vikky</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-semibold text-ink">Ravi</span>
              <span className="rounded-full bg-sand px-2.5 py-0.5 font-semibold text-ink">Maths</span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative size-2 rounded-full bg-gold" />
                </span>
                Ready
              </span>
            </div>
          </div>

          <div className="px-4 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-xl text-ink sm:text-3xl">What is 1/2 + 1/4?</p>
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-widest text-bronze">
                Step {step + 1} / 5
              </span>
            </div>

            <FractionStage step={step} />

            <div className="mt-3 min-h-[5.5rem] sm:mt-5 sm:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="rounded-md bg-gold-wash px-2 py-0.5 text-xs font-bold text-ink">
                      {s.name}
                    </span>
                    {s.fractions.map((f) => (
                      <span
                        key={f}
                        className="rounded-md border border-hairline px-2 py-0.5 text-xs font-semibold tabular-nums text-ink-soft"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-ink sm:text-base">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* base */}
      <div className="relative mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-2xl bg-gradient-to-b from-bronze-soft to-bronze shadow-soft sm:h-4">
        <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-bronze/50" />
      </div>
    </div>
  );
}

/** The two-row fraction diagram. Pieces are positioned in % of the bar width. */
function FractionStage({ step }: { step: number }) {
  const showB = step >= 1 && step <= 2;
  const quartersA = step >= 2;
  const merged = step >= 3;
  const star = step === 4;
  const labelA = step <= 1 ? "1/2" : step === 2 ? "2/4" : step === 3 ? "?/4" : "3/4";

  // Row geometry (px)
  const rowH = 44;
  const gap = 28;
  const pieceGap = quartersA ? 3 : 0;

  return (
    <div className="relative mt-4 sm:mt-6">
      <div className="relative pr-14 sm:pr-20" style={{ height: rowH * 2 + gap }}>
        <div className="relative h-full">
          {/* Row A frame */}
          <div
            className={`absolute inset-x-0 top-0 rounded-xl border-2 transition-colors duration-500 ${
              star ? "border-gold" : "border-bronze/40"
            }`}
            style={{ height: rowH }}
          >
            {/* dividers */}
            <Divider at={50} visible />
            <Divider at={25} visible={quartersA} dashed={step === 2} />
            <Divider at={75} visible={quartersA} />
          </div>

          {/* Row B frame */}
          <motion.div
            className="absolute inset-x-0 rounded-xl border-2 border-bronze/40"
            style={{ top: rowH + gap, height: rowH }}
            animate={{ opacity: showB ? 1 : 0, y: showB ? 0 : 10 }}
            transition={spring}
          >
            <Divider at={25} visible />
            <Divider at={50} visible />
            <Divider at={75} visible />
          </motion.div>

          {/* coloured pieces */}
          <Piece left={0} width={25} top={0} h={rowH} gapPx={pieceGap} show tone={star ? "star" : "gold"} />
          <Piece left={25} width={25} top={0} h={rowH} gapPx={pieceGap} show tone={star ? "star" : "gold"} />
          <motion.div
            className="absolute"
            initial={false}
            animate={{
              left: merged ? "50%" : "0%",
              top: merged ? 0 : rowH + gap,
              opacity: step >= 1 ? 1 : 0,
              scale: step >= 1 ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            style={{ width: "25%", height: rowH }}
          >
            <div
              className={`absolute inset-[5px] rounded-lg ${
                star ? "bg-gold-gradient shadow-gold" : step >= 3 ? "bg-gold-deep" : "bg-gold"
              }`}
            />
          </motion.div>

          {/* question mark in empty slot */}
          <AnimatePresence>
            {step === 3 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute grid place-items-center font-display text-2xl text-bronze"
                style={{ left: "75%", width: "25%", top: 0, height: rowH }}
              >
                ?
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* labels */}
        <FractionLabel top={0} h={rowH} text={labelA} highlight={star} />
        <AnimatePresence>
          {showB && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <FractionLabel top={rowH + gap} h={rowH} text="1/4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* star reveal */}
      <AnimatePresence>
        {star && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
            className="absolute right-0 top-[calc(44px+14px)] flex items-center gap-2 rounded-full border border-gold-deep/30 bg-gold-wash px-3 py-1.5 text-sm font-bold text-ink shadow-gold sm:top-[calc(44px+10px)]"
          >
            <Star className="size-5 fill-gold text-gold-deep" />
            Star earned
            {[0, 1, 2, 3].map((k) => (
              <motion.span
                key={k}
                className="absolute size-1.5 rounded-full bg-gold"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: [0, Math.cos((k * Math.PI) / 2 + 0.6) * 40],
                  y: [0, Math.sin((k * Math.PI) / 2 + 0.6) * 30],
                  opacity: [1, 0],
                }}
                transition={{ duration: 0.9, delay: 0.15 }}
                style={{ left: 18, top: 14 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Divider({ at, visible, dashed = false }: { at: number; visible: boolean; dashed?: boolean }) {
  return (
    <motion.span
      className={`absolute inset-y-1 w-0 border-l-2 ${dashed ? "border-dashed border-ink" : "border-bronze/40"}`}
      style={{ left: `${at}%` }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scaleY: visible ? 1 : 0 }}
      transition={{ duration: 0.45 }}
    />
  );
}

function Piece({
  left,
  width,
  top,
  h,
  gapPx,
  show,
  tone,
}: {
  left: number;
  width: number;
  top: number;
  h: number;
  gapPx: number;
  show: boolean;
  tone: "gold" | "star";
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${left}%`, width: `${width}%`, top, height: h }}
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
    >
      <motion.div
        className={`absolute inset-y-[5px] rounded-lg ${tone === "star" ? "bg-gold-gradient shadow-gold" : "bg-gold"}`}
        initial={false}
        animate={{ left: 5 + gapPx, right: 5 + gapPx }}
        transition={spring}
      />
    </motion.div>
  );
}

function FractionLabel({ top, h, text, highlight = false }: { top: number; h: number; text: string; highlight?: boolean }) {
  const [n, d] = text.split("/");
  return (
    <div className="absolute right-0 flex w-12 items-center justify-center sm:w-16" style={{ top, height: h }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`flex flex-col items-center font-display leading-none tabular-nums ${
            highlight ? "text-gold-deep" : "text-ink"
          }`}
        >
          <span className="text-lg sm:text-xl">{n}</span>
          <span className="my-0.5 h-[2px] w-5 bg-current" />
          <span className="text-lg sm:text-xl">{d}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
