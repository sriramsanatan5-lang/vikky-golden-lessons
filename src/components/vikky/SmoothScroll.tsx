import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type Lenis from "lenis";

type ScrollTo = (target: string | number, offset?: number) => void;
const ScrollCtx = createContext<ScrollTo>(() => {});

export function useScrollTo() {
  return useContext(ScrollCtx);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let cancelled = false;
    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.95,
      });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target, offset = -72) => {
    let top: number;
    if (typeof target === "number") top = target;
    else {
      const el = document.getElementById(target);
      if (!el) return;
      top = el.getBoundingClientRect().top + window.scrollY + offset;
    }
    if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.3 });
    else window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <ScrollCtx.Provider value={scrollTo}>
      <ScrollProgress />
      {children}
    </ScrollCtx.Provider>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}
