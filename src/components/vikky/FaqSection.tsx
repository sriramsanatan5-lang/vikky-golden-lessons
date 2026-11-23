import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "./content";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./effects";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="questions" className="border-y border-line bg-sugar-deep py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-caramel" /> Questions
          </p>
          <SplitHeading text="Questions parents ask" italic={["parents"]} className="mt-3 text-5xl font-medium text-foam sm:text-6xl" />
        </div>
        <ul>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <li className="group relative border-t border-line last:border-b">
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px origin-left bg-caramel transition-transform duration-700 ${isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                  <button
                    className="flex w-full cursor-pointer items-center gap-5 py-7 text-left sm:gap-8"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={`w-8 shrink-0 font-display text-sm transition-colors ${isOpen ? "text-caramel" : "text-foam-dim"}`}>0{i + 1}</span>
                    <span className="flex-1 font-display text-2xl text-foam transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={`grid size-11 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen ? "border-caramel bg-caramel text-espresso" : "border-line-strong text-foam group-hover:border-foam/60"
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
                        <p className="max-w-2xl pb-8 pl-13 text-lg text-foam-dim sm:pl-16">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
