import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./Magnetic";
import { TILES } from "./PictureTiles";
import { Reveal } from "./Reveal";
import { SplitHeading, TiltCard, VelocityMarquee } from "./effects";

export function StartSection() {
  return (
    <section id="start" className="relative overflow-hidden pb-44 pt-28 sm:pb-60 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-4 opacity-80">
        <VelocityMarquee baseSpeed={30}>
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k} className="whitespace-nowrap pr-10 font-display text-[14vw] font-bold leading-none text-outline">
              Start tonight ✦
            </span>
          ))}
        </VelocityMarquee>
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-caramel" /> Ready when you are
          </p>
          <SplitHeading text="Start tonight" italic={["tonight"]} className="mt-3 text-6xl font-medium text-foam sm:text-8xl" />
          <Reveal>
            <p className="mt-6 max-w-lg text-lg text-foam-dim">
              Parents sign up in a minute and add each child. Children sign in with a PIN or a picture password you set.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Button variant="accent" size="xl">
                  Start as a parent <ArrowUpRight />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="quiet" size="xl">
                  Child sign in
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <TiltCard max={6}>
            <PicturePassword />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function PicturePassword() {
  const [picked, setPicked] = useState<number[]>([]);
  const done = picked.length === 3;
  const toggle = (i: number) =>
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length >= 3 ? p : [...p, i]));

  return (
    <div className="foam-card mx-auto w-full max-w-md rounded-[2.25rem] p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-espresso">Child sign in</span>
        <span className="rounded-full bg-sugar px-3 py-1 text-xs font-semibold text-foam">Picture password</span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <motion.span
          animate={done ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-caramel font-display text-2xl text-espresso"
        >
          M
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.p
            key={done ? "done" : "ask"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="font-display text-2xl leading-tight text-espresso"
          >
            {done ? "Lovely, Meera. You're in!" : "Hi Meera. Tap your 3 pictures."}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2" aria-hidden>
        {[0, 1, 2].map((k) => (
          <span key={k} className="h-1.5 flex-1 overflow-hidden rounded-full bg-espresso/15">
            <motion.span
              className="block h-full origin-left bg-caramel-deep"
              animate={{ scaleX: k < picked.length ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            />
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {TILES.map(({ name, Art }, i) => {
          const order = picked.indexOf(i);
          const on = order >= 0;
          return (
            <motion.button
              key={name}
              type="button"
              aria-pressed={on}
              aria-label={name}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.88 }}
              whileHover={{ y: -3 }}
              animate={on ? { scale: [1, 1.1, 0.97, 1], y: [0, -6, 0, 0] } : { scale: 1, y: 0 }}
              transition={on ? { duration: 0.45, ease: "easeOut" } : { type: "spring", stiffness: 400, damping: 18 }}
              className={`relative aspect-square cursor-pointer rounded-2xl border-2 p-4 text-espresso transition-colors ${
                on ? "border-caramel-deep bg-caramel-wash shadow-caramel" : "border-foam-line bg-foam-soft hover:border-espresso/30"
              }`}
            >
              <Art />
              <AnimatePresence>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-sugar text-xs font-bold text-caramel"
                  >
                    {order + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-espresso-soft">
        <span>{done ? "Opening Meera's lessons…" : `${picked.length} of 3 chosen`}</span>
        {picked.length > 0 && (
          <button onClick={() => setPicked([])} className="flex cursor-pointer items-center gap-1 font-semibold hover:text-espresso">
            <RotateCcw className="size-3.5" /> Start again
          </button>
        )}
      </div>
    </div>
  );
}
