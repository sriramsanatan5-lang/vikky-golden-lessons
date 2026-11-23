import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./Magnetic";
import { TILES } from "./PictureTiles";
import { Reveal } from "./Reveal";

export function StartSection() {
  return (
    <section id="start" className="relative overflow-hidden py-24 sm:py-32">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Ready when you are
          </p>
          <h2 className="mt-3 text-5xl font-medium text-ink sm:text-7xl">Start tonight</h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            Parents sign up in a minute and add each child. Children sign in with a PIN or a picture
            password you set.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button variant="accent" size="xl">
                Start as a parent
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="quiet" size="xl">
                Child sign in
              </Button>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <PicturePassword />
        </Reveal>
      </div>
    </section>
  );
}

function PicturePassword() {
  const [picked, setPicked] = useState<number[]>([]);
  const done = picked.length === 3;

  const toggle = (i: number) => {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length >= 3 ? p : [...p, i]));
  };

  return (
    <div className="surface-lift mx-auto w-full max-w-md rounded-4xl p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">Child sign in</span>
        <span className="rounded-full border border-hairline bg-sand/60 px-3 py-1 text-xs font-semibold text-ink-soft">
          Picture password
        </span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-2xl bg-gold-wash font-display text-2xl text-ink">
          M
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={done ? "done" : "ask"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="font-display text-2xl leading-tight text-ink"
          >
            {done ? "Lovely, Meera. You're in!" : "Hi Meera. Tap your 3 pictures."}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2" aria-hidden>
        {[0, 1, 2].map((k) => (
          <motion.span
            key={k}
            className="h-1.5 flex-1 rounded-full"
            animate={{ backgroundColor: k < picked.length ? "var(--gold)" : "var(--hairline)" }}
          />
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
              animate={on ? { scale: [1, 1.1, 0.97, 1], y: [0, -6, 0, 0] } : { scale: 1, y: 0 }}
              transition={on ? { duration: 0.45, ease: "easeOut" } : { type: "spring", stiffness: 400, damping: 18 }}
              className={`relative aspect-square cursor-pointer rounded-2xl border-2 p-4 text-ink transition-colors ${
                on ? "border-gold bg-gold-wash shadow-gold" : "border-hairline bg-cream hover:border-bronze/40"
              }`}
            >
              <Art />
              <span className="sr-only">{name}</span>
              <AnimatePresence>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-gold"
                  >
                    {order + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{done ? "Opening Meera's lessons…" : `${picked.length} of 3 chosen`}</span>
        {picked.length > 0 && (
          <button onClick={() => setPicked([])} className="flex cursor-pointer items-center gap-1 font-semibold text-ink-soft hover:text-ink">
            <RotateCcw className="size-3.5" /> Start again
          </button>
        )}
      </div>
    </div>
  );
}
