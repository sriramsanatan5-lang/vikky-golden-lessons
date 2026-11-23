import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Magnetic } from "./Magnetic";
import { NAV } from "./content";
import { useScrollTo } from "./SmoothScroll";

export function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 40));

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.div
        animate={{
          paddingTop: compact ? 8 : 14,
          paddingBottom: compact ? 8 : 14,
          maxWidth: compact ? 1120 : 1280,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className={`mx-auto flex items-center justify-between gap-4 rounded-2xl border px-4 backdrop-blur-md transition-colors duration-500 sm:px-5 ${
          compact ? "border-hairline bg-paper/75 shadow-soft" : "border-transparent bg-cream/40"
        }`}
      >
        <button onClick={() => scrollTo(0)} aria-label="Vikky, back to top" className="cursor-pointer">
          <Logo />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Button key={n.id} variant="nav" size="pill" onClick={() => go(n.id)}>
              {n.label}
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Magnetic>
            <Button variant="nav" size="pill" onClick={() => go("start")}>
              Child sign in
            </Button>
          </Magnetic>
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
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </motion.div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface mx-auto mt-2 flex max-w-md flex-col gap-1 rounded-2xl p-3 md:hidden"
        >
          {NAV.map((n) => (
            <Button key={n.id} variant="nav" size="pill" className="justify-start" onClick={() => go(n.id)}>
              {n.label}
            </Button>
          ))}
          <div className="my-1 h-px bg-hairline" />
          <Button variant="nav" size="pill" className="justify-start" onClick={() => go("start")}>
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
    </header>
  );
}
