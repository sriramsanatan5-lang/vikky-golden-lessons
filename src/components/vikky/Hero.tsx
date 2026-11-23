import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./Magnetic";
import { QUESTION_CARDS } from "./content";
import { useScrollTo } from "./SmoothScroll";
import { RotatingBadge, SplitHeading, VelocityMarquee } from "./effects";

const CALLOUTS = [
  { label: "Explains in steps", side: "left", top: "22%" },
  { label: "Draws it out", side: "right", top: "52%" },
  { label: "Answer comes last", side: "left", top: "66%" },
] as const;

export function Hero() {
  const scrollTo = useScrollTo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const bigScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const deckY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-sugar-glow pt-32 sm:pt-36">
      {/* giant outlined wordmark */}
      <motion.div
        aria-hidden
        style={{ y: bigY, scale: bigScale }}
        className="pointer-events-none absolute inset-x-0 top-[38%] select-none text-center font-display text-[30vw] font-bold leading-none text-outline"
      >
        VIKKY
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-xs font-semibold text-foam"
        >
          <Sparkles className="size-3.5 text-caramel" /> For children aged 3 to 16
        </motion.span>
        <SplitHeading
          as="h1"
          text="A tutor that teaches, not tells"
          italic={["teaches,"]}
          delay={0.1}
          className="mt-6 text-[clamp(2.8rem,8.4vw,7.4rem)] font-medium text-foam"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-lg text-foam-dim sm:text-xl"
        >
          Vikky helps children aged 3 to 16 with schoolwork. It explains in steps and pictures, then lets
          your child find the answer.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Button variant="accent" size="xl" onClick={() => scrollTo("start")}>
              Start as a parent
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="quiet" size="xl" onClick={() => scrollTo("lesson")}>
              <Play className="fill-current" /> Watch a lesson
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* deck stage */}
      <motion.div style={{ y: deckY }} className="relative mx-auto mt-16 h-[26rem] max-w-5xl px-5 sm:h-[30rem] sm:px-8">
        {/* orbit rings */}
        <div aria-hidden className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line sm:size-[46rem]" />
        <div aria-hidden className="absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line sm:size-[32rem]" />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 sm:size-[32rem]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel shadow-caramel" />
        </motion.div>

        <RotatingBadge
          text="shows the working · teaches not tells · "
          className="absolute right-2 -top-6 hidden size-36 md:grid lg:right-12"
        >
          <span className="grid size-16 place-items-center rounded-full bg-caramel font-display text-xl font-semibold text-espresso">
            3–16
          </span>
        </RotatingBadge>

        {CALLOUTS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: c.side === "left" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.7 }}
            className={`absolute hidden items-center gap-3 lg:flex ${c.side === "left" ? "left-0 flex-row" : "right-0 flex-row-reverse"}`}
            style={{ top: c.top }}
          >
            <span className="glass rounded-full px-4 py-2 text-sm font-medium text-foam">{c.label}</span>
            <span className="h-px w-24 bg-gradient-to-r from-line-strong to-transparent" />
            <span className="size-2 rounded-full bg-caramel" />
          </motion.div>
        ))}

        <QuestionDeck />
      </motion.div>

      <button
        onClick={() => scrollTo("manifesto")}
        className="relative mx-auto mb-10 mt-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-foam-dim hover:text-foam"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="size-4" />
        </motion.span>
        Scroll
      </button>

      <QuestionMarquee />
    </section>
  );
}

function QuestionDeck() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = QUESTION_CARDS.length;
  const { scrollY } = useScroll();
  const smoothV = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 });
  const tilt = useTransform(smoothV, [-2000, 0, 2000], [6, 0, -6], { clamp: true });

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 2800);
    return () => clearInterval(t);
  }, [paused, total]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: tilt }}
      className="absolute left-1/2 top-1/2 h-60 w-[min(26rem,88vw)] -translate-x-1/2 -translate-y-1/2 [perspective:1200px] sm:h-64"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {QUESTION_CARDS.map((c, i) => {
        const pos = (i - active + total) % total;
        const isExit = pos === total - 1;
        const visible = pos <= 3 || isExit;
        return (
          <motion.button
            key={c.q}
            type="button"
            aria-label={`Next question. Showing: ${c.subject}, age ${c.age}: ${c.q}`}
            onClick={() => setActive((a) => (a + 1) % total)}
            className="foam-card absolute inset-0 flex cursor-pointer flex-col justify-between rounded-[2rem] p-6 text-left sm:p-7"
            initial={false}
            animate={
              isExit
                ? { x: "-80%", y: -40, rotate: -16, scale: 0.9, opacity: 0, zIndex: 20 }
                : {
                    x: 0,
                    y: -pos * 20,
                    rotate: pos === 0 ? -2 : pos % 2 ? 3 : -4,
                    scale: 1 - pos * 0.06,
                    opacity: visible ? 1 - pos * 0.22 : 0,
                    zIndex: 10 - pos,
                  }
            }
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            tabIndex={pos === 0 ? 0 : -1}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sugar px-3 py-1 text-xs font-semibold text-foam">{c.subject}</span>
              <span className="text-xs font-bold tracking-widest text-espresso-soft">AGE {c.age}</span>
            </div>
            <p className="font-display text-[1.65rem] leading-tight text-espresso sm:text-3xl">{c.q}</p>
            <div className="flex items-center justify-between text-xs text-espresso-soft">
              <span className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-caramel-deep" /> Vikky is listening
              </span>
              <span className="tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function QuestionMarquee() {
  return (
    <div className="relative border-y border-line bg-sugar-deep/60 py-5">
      <VelocityMarquee baseSpeed={50} className="mask-fade-x">
        {QUESTION_CARDS.map((c) => (
          <span key={c.q} className="flex items-center gap-5 pr-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
              {c.subject} · {c.age}
            </span>
            <span className="whitespace-nowrap font-display text-2xl text-foam sm:text-3xl">{c.q}</span>
            <span className="text-caramel" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}
