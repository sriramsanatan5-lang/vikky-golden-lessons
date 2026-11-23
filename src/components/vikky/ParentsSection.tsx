import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Archive, BookCheck, Clock3, Lock, Volume2 } from "lucide-react";
import { PARENT_FEATURES, PHOTOS, RECENT_LESSONS, WEEK, formatMinutes } from "./content";
import { Reveal, softSpring } from "./Reveal";
import { CountUp, Parallax, SplitHeading, SpotlightCard } from "./effects";

const ICONS = [Clock3, BookCheck, Archive, Volume2];
const MAX = Math.max(...WEEK.map((d) => d.min));
const TOTAL = WEEK.reduce((a, d) => a + d.min, 0);

export function ParentsSection() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });

  return (
    <section id="parents" className="relative pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-caramel" /> For parents
            </p>
            <SplitHeading text="You see every lesson" className="mt-3 text-5xl font-medium text-foam sm:text-7xl" />
          </div>
          <Reveal>
            <p className="text-lg text-foam-dim">
              Each lesson shows its topic, how it ended and the hints your child needed. Set homework and follow it
              question by question.
            </p>
          </Reveal>
        </div>

        {/* sticky stacking feature cards */}
        <div ref={stack} className="relative mt-10">
          {PARENT_FEATURES.map((f, i) => (
            <StackCard key={f.title} i={i} total={PARENT_FEATURES.length} progress={scrollYProgress} title={f.title} text={f.text} />
          ))}
        </div>

        {/* dashboard */}
        <div className="grid gap-5 pb-28 sm:pb-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <WeekCard />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="relative h-full min-h-80 overflow-hidden rounded-[2rem] border border-line">
              <Parallax offset={50} className="absolute -inset-y-16 inset-x-0">
                <img src={PHOTOS.blocks} alt="Books, letter blocks and an apple on a wooden desk" loading="lazy" className="h-full w-full object-cover sepia-[.45]" />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-sugar-deep via-sugar-deep/30 to-transparent" />
              <p className="absolute inset-x-6 bottom-6 font-display text-3xl leading-tight text-foam">
                Every hint, every finish, <span className="italic text-caramel">in one place.</span>
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-12">
            <RecentLessons />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  i,
  total,
  progress,
  title,
  text,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  text: string;
}) {
  const Icon = ICONS[i] ?? Clock3;
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i - 1) * 0.045]);
  const filter = useTransform(progress, [i / total, 1], ["brightness(1)", `brightness(${1 - (total - i - 1) * 0.08})`]);
  return (
    <div className="sticky top-0 flex h-[78vh] items-start pt-24 sm:h-[82vh] sm:pt-28">
      <motion.article
        style={{ scale, filter, top: i * 26 }}
        className="foam-card relative mx-auto grid w-full origin-top gap-8 overflow-hidden rounded-[2rem] p-7 sm:p-10 md:grid-cols-[1fr_1fr] md:p-12"
      >
        <div className="flex flex-col justify-between gap-8">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-sugar text-caramel">
              <Icon className="size-5" />
            </span>
            <span className="font-display text-5xl text-espresso/15">0{i + 1}</span>
          </div>
          <div>
            <h3 className="text-4xl font-medium text-espresso sm:text-5xl">{title}</h3>
            <p className="mt-4 max-w-md text-lg text-espresso-soft">{text}</p>
          </div>
        </div>
        <div className="grid min-h-52 place-items-center rounded-3xl bg-foam-soft p-6">
          {i === 0 && <HoursVisual />}
          {i === 1 && <HomeworkVisual />}
          {i === 2 && <KeepsVisual />}
          {i === 3 && <VoiceVisual />}
        </div>
      </motion.article>
    </div>
  );
}

function HoursVisual() {
  const hours = ["3", "4", "5", "6", "7", "8"];
  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-6 gap-1.5">
        {hours.map((h, k) => (
          <motion.div
            key={h}
            initial={{ scaleY: 0.3, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...softSpring, delay: k * 0.06 }}
            className={`h-16 origin-bottom rounded-xl ${k >= 1 && k <= 3 ? "bg-caramel" : "hatched bg-foam"}`}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-6 text-center text-xs font-semibold text-espresso-soft">
        {hours.map((h) => (
          <span key={h}>{h} pm</span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-foam px-4 py-3 text-espresso">
        <Lock className="size-4" />
        <span className="flex gap-2">
          {[0, 1, 2, 3].map((d) => (
            <span key={d} className="size-2.5 rounded-full bg-espresso" />
          ))}
        </span>
      </div>
    </div>
  );
}

function HomeworkVisual() {
  const states = ["done", "done", "done", "done", "started", "started", "todo", "todo", "todo", "todo"];
  return (
    <div className="grid w-full max-w-sm grid-cols-5 gap-2.5">
      {states.map((s, k) => (
        <motion.div
          key={k}
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: k * 0.05 }}
          className={`grid aspect-square place-items-center rounded-2xl font-display text-lg ${
            s === "done" ? "bg-sugar text-foam" : s === "started" ? "bg-caramel text-espresso" : "border-2 border-dashed border-espresso/25 text-espresso-soft"
          }`}
        >
          {k + 1}
        </motion.div>
      ))}
    </div>
  );
}

function KeepsVisual() {
  const [on, setOn] = useState([true, true, false]);
  const items = ["Lesson history", "Learning record", "Notes"];
  return (
    <div className="w-full max-w-sm space-y-2.5">
      {items.map((label, k) => (
        <button
          key={label}
          onClick={() => setOn((o) => o.map((v, j) => (j === k ? !v : v)))}
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-foam px-4 py-3.5 text-left font-semibold text-espresso"
          aria-pressed={on[k]}
        >
          {label}
          <span className={`relative h-7 w-12 rounded-full transition-colors ${on[k] ? "bg-caramel" : "bg-espresso/20"}`}>
            <motion.span
              className="absolute top-1 size-5 rounded-full bg-foam shadow-soft"
              animate={{ left: on[k] ? 24 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </span>
        </button>
      ))}
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5">
      <div className="flex h-20 items-center gap-1.5">
        {Array.from({ length: 22 }).map((_, k) => (
          <motion.span
            key={k}
            className="w-1.5 rounded-full bg-sugar"
            animate={{ height: [10, 18 + ((k * 37) % 50), 10] }}
            transition={{ repeat: Infinity, duration: 1 + (k % 5) * 0.18, ease: "easeInOut", delay: k * 0.04 }}
          />
        ))}
      </div>
      <p className="rounded-2xl bg-foam px-4 py-3 text-center text-sm text-espresso">
        "This bar is cut into <span className="rounded bg-caramel px-1">two equal parts</span>."
      </p>
    </div>
  );
}

function WeekCard() {
  return (
    <SpotlightCard className="sugar-card h-full rounded-[2rem]">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-foam-dim">
              <span className="font-semibold text-foam">Ravi</span> · this week
              <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-semibold text-foam-dim">Example week</span>
            </p>
            <p className="mt-3 text-sm text-foam-dim">Study time</p>
            <p className="font-display text-5xl text-foam sm:text-6xl">
              <CountUp to={TOTAL} format={(n) => formatMinutes(Math.round(n))} />
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-foam-dim">
            <span className="size-2.5 rounded-sm bg-caramel" /> minutes studied
          </div>
        </div>

        <div className="mt-8 grid h-48 grid-cols-7 items-end gap-2 border-b border-line sm:gap-4">
          {WEEK.map((d, i) => {
            const pct = d.min === 0 ? 0 : (d.min / MAX) * 100;
            return (
              <div key={d.day} className="flex h-full flex-col items-center justify-end gap-2">
                <motion.span
                  className="text-xs font-semibold tabular-nums text-foam"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  {d.min}
                </motion.span>
                <div className="relative w-full max-w-12 flex-1">
                  {d.min === 0 ? (
                    <div className="absolute inset-x-0 bottom-0 h-1.5 rounded-t-md bg-line-strong" />
                  ) : (
                    <motion.div
                      className={`absolute inset-x-0 bottom-0 origin-bottom rounded-t-xl ${d.min === MAX ? "bg-caramel-gradient shadow-caramel" : "bg-caramel/85"}`}
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
        <div className="mt-2 grid grid-cols-7 gap-2 text-center text-xs font-medium text-foam-dim sm:gap-4">
          {WEEK.map((d) => (
            <span key={d.day}>{d.day}</span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

function RecentLessons() {
  return (
    <div className="foam-card rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-3xl font-medium text-espresso">Recent lessons</h3>
        <span className="text-sm text-espresso-soft">Ravi · Maths & Science</span>
      </div>
      <ul className="mt-4">
        {RECENT_LESSONS.map((l, i) => {
          const understood = l.status === "Understood it";
          return (
            <motion.li
              key={l.topic}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...softSpring, delay: i * 0.08 }}
              className="group relative flex flex-wrap items-center justify-between gap-3 overflow-hidden border-t border-foam-line py-5"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-foam-soft transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative flex items-center gap-4">
                <span className="font-display text-sm text-espresso-soft">0{i + 1}</span>
                <span className="font-display text-xl text-espresso sm:text-2xl">{l.topic}</span>
              </span>
              <span className="relative flex items-center gap-3 text-sm">
                <span className={`rounded-full px-3 py-1 font-semibold ${understood ? "bg-sugar text-foam" : "bg-caramel text-espresso"}`}>{l.status}</span>
                <span className="w-16 text-right tabular-nums text-espresso-soft">
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
