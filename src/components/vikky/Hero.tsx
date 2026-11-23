import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./Magnetic";
import { PHOTOS, QUESTION_CARDS } from "./content";
import { useScrollTo } from "./SmoothScroll";

const HEADLINE = ["A", "tutor", "that", "teaches,", "not", "tells"];

export function Hero() {
  const scrollTo = useScrollTo();
  return (
    <section className="relative overflow-hidden bg-canvas-glow pb-24 pt-36 sm:pt-40 lg:pb-32">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" /> For children aged 3 to 16
          </motion.p>
          <h1 className="text-[clamp(2.9rem,7vw,5.6rem)] font-medium text-ink">
            {HEADLINE.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className={`inline-block ${w === "teaches," ? "italic text-bronze" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                  {i < HEADLINE.length - 1 ? "\u00a0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-7 max-w-xl text-lg text-ink-soft sm:text-xl"
          >
            Vikky helps children aged 3 to 16 with schoolwork. It explains in steps and pictures, then
            lets your child find the answer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-3"
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
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={() => scrollTo("lesson")}
            className="mt-14 hidden cursor-pointer items-center gap-2 text-sm font-medium text-bronze lg:inline-flex"
          >
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <ArrowDown className="size-4" />
            </motion.span>
            See one lesson, step by step
          </motion.button>
        </div>

        <QuestionDeck />
      </div>
    </section>
  );
}

function QuestionDeck() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = QUESTION_CARDS.length;

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothV = useSpring(velocity, { stiffness: 120, damping: 30 });
  const tilt = useTransform(smoothV, [-2000, 0, 2000], [6, 0, -6], { clamp: true });
  const lift = useTransform(smoothV, [-2000, 0, 2000], [-14, 0, 14], { clamp: true });

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 2800);
    return () => clearInterval(t);
  }, [paused, total]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* framed study-desk photograph */}
      <div className="surface-lift relative aspect-[4/5] overflow-hidden rounded-4xl p-2.5 sm:aspect-[5/5.4]">
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
          <img
            src={PHOTOS.desk}
            alt="Open books on a wooden study desk"
            className="h-full w-full object-cover sepia-[.35] saturate-[.85]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-cream/10" />
        </div>
      </div>

      {/* deck */}
      <motion.div
        style={{ rotate: tilt, y: lift }}
        className="absolute inset-x-5 bottom-8 h-56 sm:inset-x-10 sm:h-60 [perspective:1200px]"
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
              className="surface-lift absolute inset-0 flex cursor-pointer flex-col justify-between rounded-3xl p-6 text-left sm:p-7"
              initial={false}
              animate={
                isExit
                  ? { x: "-70%", y: -30, rotate: -14, scale: 0.92, opacity: 0, zIndex: 20 }
                  : {
                      x: pos * 10,
                      y: -pos * 22,
                      rotate: pos === 0 ? -1.5 : pos % 2 ? 2.5 : -3,
                      rotateX: pos * 4,
                      scale: 1 - pos * 0.055,
                      opacity: visible ? 1 - pos * 0.18 : 0,
                      zIndex: 10 - pos,
                    }
              }
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              tabIndex={pos === 0 ? 0 : -1}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-hairline bg-sand/70 px-3 py-1 text-xs font-semibold text-ink">
                  {c.subject}
                </span>
                <span className="text-xs font-semibold tracking-wider text-bronze">AGE {c.age}</span>
              </div>
              <p className="font-display text-[1.6rem] leading-tight text-ink sm:text-3xl">{c.q}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold" /> Vikky is listening
                </span>
                <span className="tabular-nums">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
