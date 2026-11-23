import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "./content";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="questions" className="border-y border-hairline bg-sand/45 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Questions
          </p>
          <h2 className="mt-3 text-4xl font-medium text-ink sm:text-6xl">Questions parents ask</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="surface divide-y divide-hairline overflow-hidden rounded-3xl">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-xl text-ink sm:text-2xl">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen ? "border-gold-deep/40 bg-gold text-ink" : "border-hairline text-ink"
                      }`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 170, damping: 26 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl px-6 pb-7 text-ink-soft sm:px-8">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
