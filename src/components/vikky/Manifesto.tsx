import { TextReveal } from "./effects";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-caramel" /> Why Vikky
        </p>
        <TextReveal
          className="font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.12] text-foam"
          text="Most apps hand over the answer. Vikky shows the working, one small step at a time, until your child finds it on their own."
        />
      </div>
    </section>
  );
}
