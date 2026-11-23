import { Logo } from "./Logo";
import { CreatureStrip } from "./Creatures";
import { NAV } from "./content";
import { useScrollTo } from "./SmoothScroll";

export function Footer() {
  const scrollTo = useScrollTo();
  return (
    <footer className="border-t border-hairline bg-sand/60 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-ink-soft">
              A tutor that teaches, not tells. Made for families in India.
            </p>
          </div>
          <div>
            <p className="eyebrow">How it works</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="cursor-pointer text-ink hover:text-bronze">
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
                  <button onClick={() => scrollTo("start")} className="cursor-pointer text-ink hover:text-bronze">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-5 mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-hairline py-6 text-sm text-muted-foreground sm:mx-8">
          <span>© 2026 Vikky Bruhh</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-ink">Privacy policy</a>
            <a href="#" className="hover:text-ink">Terms and conditions</a>
          </span>
        </div>

        <CreatureStrip />
      </div>
    </footer>
  );
}
