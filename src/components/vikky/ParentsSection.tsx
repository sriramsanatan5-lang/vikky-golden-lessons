import { motion } from "framer-motion";
import { Archive, BookCheck, Clock3, Volume2 } from "lucide-react";
import { PARENT_FEATURES, PHOTOS, RECENT_LESSONS, WEEK, formatMinutes } from "./content";
import { Reveal, softSpring } from "./Reveal";

const ICONS = [Clock3, BookCheck, Archive, Volume2];
const MAX = Math.max(...WEEK.map((d) => d.min));
const TOTAL = WEEK.reduce((a, d) => a + d.min, 0);

export function ParentsSection() {
  return (
    <section id="parents" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> For parents
          </p>
          <h2 className="mt-3 text-4xl font-medium text-ink sm:text-6xl">You see every lesson</h2>
          <p className="mt-5 text-lg text-ink-soft">
            Each lesson shows its topic, how it ended and the hints your child needed. Set homework and
            follow it question by question.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <WeekCard />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="surface-lift relative h-full min-h-72 overflow-hidden rounded-3xl p-2.5">
              <div className="relative h-full overflow-hidden rounded-2xl">
                <img
                  src={PHOTOS.blocks}
                  alt="Books, letter blocks and an apple on a wooden desk"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover sepia-[.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <p className="absolute inset-x-5 bottom-5 font-display text-2xl leading-tight text-paper">
                  Every hint, every finish, in one place.
                </p>
              </div>
            </div>
          </Reveal>

          {PARENT_FEATURES.map((f, i) => {
            const Icon = ICONS[i] ?? Clock3;
            return (
              <Reveal key={f.title} delay={0.06 * i} className="lg:col-span-3 xl:col-span-3">
                <article className="surface group h-full rounded-3xl p-7 transition-shadow duration-500 hover:shadow-lift">
                  <span className="grid size-11 place-items-center rounded-2xl border border-hairline bg-sand/60 text-ink transition-colors group-hover:bg-gold-wash">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-medium text-ink">{f.title}</h3>
                  <p className="mt-2 text-ink-soft">{f.text}</p>
                </article>
              </Reveal>
            );
          })}

          <Reveal className="lg:col-span-6">
            <RecentLessons />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WeekCard() {
  return (
    <div className="surface-lift h-full rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-ink">Ravi</span> · this week
            <span className="rounded-full border border-hairline bg-sand/60 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
              Example week
            </span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Study time</p>
          <p className="font-display text-4xl text-ink sm:text-5xl">{formatMinutes(TOTAL)}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2.5 rounded-sm bg-gold" /> minutes studied
        </div>
      </div>

      <div className="mt-8 grid h-48 grid-cols-7 items-end gap-2 border-b border-hairline sm:gap-4">
        {WEEK.map((d, i) => {
          const pct = d.min === 0 ? 0 : (d.min / MAX) * 100;
          return (
            <div key={d.day} className="flex h-full flex-col items-center justify-end gap-2">
              <motion.span
                className="text-xs font-semibold tabular-nums text-ink"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                {d.min}
              </motion.span>
              <div className="relative w-full max-w-12 flex-1">
                {d.min === 0 ? (
                  <div className="hatched absolute inset-x-0 bottom-0 h-2 rounded-t-md" />
                ) : (
                  <motion.div
                    className={`absolute inset-x-0 bottom-0 origin-bottom rounded-t-lg ${
                      d.min === MAX ? "bg-gold-gradient shadow-gold" : "bg-gold"
                    }`}
                    style={{ height: `${pct}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ ...softSpring, delay: 0.1 + i * 0.07 }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground sm:gap-4">
        {WEEK.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}

function RecentLessons() {
  return (
    <div className="surface rounded-3xl p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-ink">Recent lessons</h3>
        <span className="text-sm text-muted-foreground">Ravi · Maths & Science</span>
      </div>
      <ul className="mt-5 divide-y divide-hairline">
        {RECENT_LESSONS.map((l, i) => {
          const understood = l.status === "Understood it";
          return (
            <motion.li
              key={l.topic}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...softSpring, delay: i * 0.08 }}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <span className="font-medium text-ink">{l.topic}</span>
              <span className="flex items-center gap-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 font-semibold ${
                    understood ? "bg-gold-wash text-ink" : "border border-hairline bg-sand/60 text-ink-soft"
                  }`}
                >
                  {l.status}
                </span>
                <span className="w-16 text-right tabular-nums text-muted-foreground">
                  {l.hints} {l.hints === 1 ? "hint" : "hints"}
                </span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
