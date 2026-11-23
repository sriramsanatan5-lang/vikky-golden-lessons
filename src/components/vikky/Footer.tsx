import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { CreatureStrip } from "./Creatures";
import { NAV } from "./content";
import { useScrollTo } from "./SmoothScroll";

export function Footer() {
  const scrollTo = useScrollTo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-sugar-deep pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-foam-dim">A tutor that teaches, not tells. Made for families in India.</p>
          </div>
          <div>
            <p className="eyebrow">How it works</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="cursor-pointer text-foam transition-colors hover:text-caramel">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Sign in</p>
            <ul className="mt-4 space-y-2.5">
              {["Parent sign in", "Child sign in"].map((l) => (
                <li key={l}>
                  <button onClick={() => scrollTo("start")} className="cursor-pointer text-foam transition-colors hover:text-caramel">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="grid size-14 cursor-pointer place-items-center self-start rounded-full border border-line-strong text-foam transition-colors hover:border-caramel hover:bg-caramel hover:text-espresso"
          >
            <ArrowUp className="size-5" />
          </button>
        </div>

        <div className="mx-5 mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-sm text-foam-dim sm:mx-8">
          <span>© 2026 Vikky Bruhh</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-foam">Privacy policy</a>
            <a href="#" className="hover:text-foam">Terms and conditions</a>
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <CreatureStrip />
      </div>
      <motion.div
        aria-hidden
        style={{ y: wordY, opacity: wordOpacity }}
        className="pointer-events-none select-none text-center font-display text-[27vw] font-bold leading-[0.74] text-sugar-raised -mb-[3vw]"
      >
        Vikky
      </motion.div>

    </footer>
  );
}
