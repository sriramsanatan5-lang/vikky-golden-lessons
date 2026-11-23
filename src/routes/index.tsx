import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/vikky/SmoothScroll";
import { Header } from "@/components/vikky/Header";
import { Hero } from "@/components/vikky/Hero";
import { Manifesto } from "@/components/vikky/Manifesto";
import { LessonSection } from "@/components/vikky/LessonSection";
import { ParentsSection } from "@/components/vikky/ParentsSection";
import { FaqSection } from "@/components/vikky/FaqSection";
import { StartSection } from "@/components/vikky/StartSection";
import { Footer } from "@/components/vikky/Footer";

const TITLE = "Vikky Bruhh: the tutor that shows the working";
const DESC =
  "Vikky helps children aged 3 to 16 with schoolwork. It explains in steps and pictures, then lets your child find the answer.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <LessonSection />
        <ParentsSection />
        <FaqSection />
        <StartSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
