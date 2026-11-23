import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Magnetic } from "./Magnetic";
import { NAV } from "./content";
import { useScrollTo } from "./SmoothScroll";

export function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(v > 40);
    setHidden(v > 600 && v > prev + 2 && !open);
    if (v < prev - 2) setHidden(false);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <motion.div
        animate={{ paddingTop: compact ? 8 : 14, paddingBottom: compact ? 8 : 14, maxWidth: compact ? 1080 : 1320 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className={`mx-auto flex items-center justify-between gap-4 rounded-full border px-3 pl-4 transition-colors duration-500 sm:px-4 sm:pl-5 ${
          compact ? "glass shadow-soft" : "border-transparent"
        }`}
      >
        <button onClick={() => scrollTo(0)} aria-label="Vikky, back to top" className="cursor-pointer">
          <Logo />
        </button>

        <nav className="hidden items-center lg:flex" aria-label="Main" onMouseLeave={() => setHover(null)}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onClick={() => go(n.id)}
              className="relative cursor-pointer px-4 py-2 text-sm font-medium text-foam-dim transition-colors hover:text-foam"
            >
              {hover === n.id && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-foam/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <Button variant="nav" size="pill" onClick={() => go("start")}>
            Child sign in
          </Button>
          <Magnetic>
            <Button variant="quiet" size="pill" onClick={() => go("start")}>
              Sign in
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="accent" size="pill" onClick={() => go("start")}>
              Start as a parent
            </Button>
          </Magnetic>
        </div>

        <Button
          variant="quiet"
          size="icon"
          className="rounded-full md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass mx-auto mt-2 flex max-w-md flex-col gap-1 rounded-3xl p-3 md:hidden"
          >
            {NAV.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className="cursor-pointer rounded-2xl px-4 py-3 text-left font-display text-2xl text-foam hover:bg-foam/10"
                onClick={() => go(n.id)}
              >
                {n.label}
              </motion.button>
            ))}
            <div className="my-1 h-px bg-line" />
            <Button variant="nav" size="pill" onClick={() => go("start")}>
              Child sign in
            </Button>
            <Button variant="quiet" size="pill" onClick={() => go("start")}>
              Sign in
            </Button>
            <Button variant="accent" size="pill" onClick={() => go("start")}>
              Start as a parent
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
