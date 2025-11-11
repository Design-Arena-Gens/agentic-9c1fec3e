"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  id: number;
  label: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  paragraphs?: string[];
  image: {
    src: string;
    alt: string;
    credit?: string;
  };
  accent: string;
  stats?: { label: string; value: string }[];
  footerNote?: string;
};

const slides: Slide[] = [
  {
    id: 0,
    label: "Executive Pitch",
    title: "Eco Vibe Bottles",
    subtitle:
      "Smart, self-cleaning hydration inspired by LARQ—built for the conscious, on-the-go professional.",
    bullets: [
      "UV-C LED technology neutralizes 99.99% of bio-contaminants in 60 seconds",
      "Modular filters and NFC-enabled hydration insights via the Eco Vibe app",
      "Carbon-neutral supply chain and upcycled aluminum construction",
    ],
    image: {
      src: "/images/hero-bottle.jpg",
      alt: "Eco Vibe bottle hero photograph",
      credit: "Photo by Unsplash contributor",
    },
    accent:
      "from-blue-500/80 via-emerald-400/70 to-sky-300/90 dark:from-emerald-500/40 dark:via-blue-400/30 dark:to-slate-500/40",
    footerNote: "Confidential pitch deck — Eco Vibe Labs, November 2024",
  },
  {
    id: 1,
    label: "Market Signal",
    title: "Why Hydration Needs a Reset",
    subtitle:
      "The premium reusable bottle category is projected to reach $3.1B by 2028, yet hygiene and taste remain top customer pain points.",
    bullets: [
      "71% of premium bottle users worry about bacteria buildup after 48 hours of use.",
      "Urban professionals are buying an average of 3.4 reusable bottles per year in search of better UX.",
      "LARQ proved the appetite for UV purification; Eco Vibe layers in personalization and sustainability.",
    ],
    stats: [
      { label: "TAM", value: "$3.1B" },
      { label: "SAM", value: "$620M" },
      { label: "Projected CAGR", value: "15.2%" },
    ],
    image: {
      src: "/images/market-insights.jpg",
      alt: "Market data visual charts",
      credit: "Photo by Pexels contributor",
    },
    accent: "from-purple-500/70 via-blue-500/60 to-cyan-400/70",
    footerNote: "Source: Grand View Research, Eco Vibe consumer interviews (n=212)",
  },
  {
    id: 2,
    label: "Product Vision",
    title: "Designed for Modern Rituals",
    subtitle:
      "A sculpted 3D form factor with tactile soft-touch finish and customizable light halo celebrating every hydration milestone.",
    paragraphs: [
      "Dual-wall vacuum insulation keeps beverages at optimal temperature for 24h cold / 12h hot while ActivePure™ UV-C cleans the interior.",
      "Magnetic top module swaps between sip straw, pour spout, and tumbler lid; embedded sensors sync with our mobile app.",
    ],
    bullets: [
      "Three finishes: Arctic Pearl, Obsidian, Aurora",
      "Integrated wireless charging base doubles as a minimalist nightstand accent",
      "Ambient 3D light ring pulses when the UV cycle completes",
    ],
    image: {
      src: "/images/3d-bottle.jpg",
      alt: "3D render of a designer bottle",
      credit: "Photo by Pexels contributor",
    },
    accent: "from-emerald-500/70 via-lime-400/60 to-amber-300/70",
  },
  {
    id: 3,
    label: "How It Works",
    title: "Inspired by LARQ, Elevated by Eco Vibe",
    subtitle:
      "Layered purification gives customers confidence in any setting—from the studio to remote trails.",
    bullets: [
      "UV-C LED Core: Eliminates pathogens with a 278 nm wavelength pulse every four hours.",
      "PureFlow Filter Dock: Pressurized carbon + nano-silver filter for on-demand refills.",
      "Eco Vibe App: Adaptive algorithms nudge intake goals, track minerals, and reward reuse habits.",
    ],
    image: {
      src: "/images/uv-tech.jpg",
      alt: "UV technology visualization",
      credit: "Photo by Pexels contributor",
    },
    stats: [
      { label: "Neutralization", value: "99.99%" },
      { label: "Cycle Time", value: "60 sec" },
      { label: "Battery Life", value: "30 days" },
    ],
    accent: "from-teal-500/70 via-cyan-400/70 to-blue-500/60",
  },
  {
    id: 4,
    label: "Business Model",
    title: "Premium Hardware + High-Margin Services",
    subtitle:
      "A hybrid model blends direct-to-consumer sales, smart accessories, and carbon credit partnerships.",
    bullets: [
      "Hardware MSRP $149 with 58% blended gross margin at scale.",
      "Subscription modules: filter cartridges ($19/qtr) and app insights ($4.99/mo).",
      "B2B wellness bundles for co-working spaces, boutique gyms, and hospitality.",
    ],
    stats: [
      { label: "Year 1 Revenue", value: "$4.6M" },
      { label: "Year 2", value: "$12.8M" },
      { label: "Year 3", value: "$28.4M" },
    ],
    image: {
      src: "/images/lifestyle.jpg",
      alt: "Professionals using smart bottles",
      credit: "Photo by Pexels contributor",
    },
    accent: "from-slate-800/80 via-zinc-700/60 to-emerald-500/60",
    footerNote: "Financial model assumes 32% attach rate on consumables by Year 3",
  },
  {
    id: 5,
    label: "Go-To-Market",
    title: "Momentum Engine",
    subtitle:
      "Launch anchors around urban wellness trendsetters, sustainability advocates, and strategic LARQ alumni advisors.",
    bullets: [
      "Phase 1 (Q2-Q3 2025): Invite-only beta with 1,000 eco-conscious professionals; pop-up hydration labs.",
      "Phase 2: Retail collabs with REI flagship, Apple Store Today at Apple wellness experiences.",
      "Phase 3: Corporate wellness integrations (Salesforce, Patagonia HQ) leveraging ESG reporting APIs.",
    ],
    stats: [
      { label: "Projected CAC", value: "$68" },
      { label: "Payback", value: "2.1 months" },
      { label: "Referral Rate", value: "31%" },
    ],
    image: {
      src: "/images/hero-bottle.jpg",
      alt: "Eco vibe bottle displayed in lifestyle setting",
    },
    accent: "from-indigo-500/70 via-purple-500/60 to-rose-400/70",
  },
  {
    id: 6,
    label: "Sustainability Impact",
    title: "Measuring the Ripple Effect",
    subtitle:
      "Eco Vibe bottles are manufactured with 83% recycled aluminum and offset with regenerative ocean plastic removal.",
    bullets: [
      "Each bottle displaces ~1,460 single-use plastics annually based on user beta data.",
      "Partnership with 4ocean funds removal of 1 lb of ocean waste per unit sold.",
      "Lifecycle assessment targets cradle-to-gate carbon neutrality by 2026.",
    ],
    stats: [
      { label: "Waste Diverted", value: "2.1M lbs" },
      { label: "CO₂ Offset", value: "18k tons" },
      { label: "Recycled Content", value: "83%" },
    ],
    image: {
      src: "/images/market-insights.jpg",
      alt: "Ocean wave sustainability imagery",
    },
    accent: "from-emerald-500/70 via-teal-500/60 to-blue-500/60",
  },
  {
    id: 7,
    label: "Roadmap",
    title: "Build, Scale, Expand",
    subtitle:
      "A disciplined 24-month roadmap ensures reliable hardware, compelling software, and irresistible brand gravity.",
    bullets: [
      "Q1 2025: Finalize tooling, UL certification, and LARQ alumni advisory council.",
      "Q3 2025: App v1.0 launch, hydration streak gamification, and Apple Health integration.",
      "2026: Expand to EU & APAC micro-factories with localized materials sourcing.",
    ],
    stats: [
      { label: "Beta Users", value: "1k" },
      { label: "Units Shipped", value: "85k" },
      { label: "NPS Target", value: "70+" },
    ],
    image: {
      src: "/images/lifestyle.jpg",
      alt: "Team collaborating over product roadmap",
    },
    accent: "from-amber-500/70 via-orange-500/60 to-rose-500/60",
  },
  {
    id: 8,
    label: "Closing",
    title: "Join the Eco Vibe Movement",
    subtitle:
      "Seeking $4.5M Seed to accelerate manufacturing, deepen software intelligence, and own the premium hydration category.",
    bullets: [
      "Manufacturing scale-up with Fair Trade certified partners in Portugal and Taiwan.",
      "Expand Eco Vibe OS personalization and partnership API for wellness platforms.",
      "Deliver net-positive hydration experience that makes sustainability aspirational.",
    ],
    image: {
      src: "/images/hero-bottle.jpg",
      alt: "Eco Vibe bottle hero closing visual",
    },
    accent: "from-sky-500/70 via-emerald-500/60 to-indigo-500/60",
    footerNote: "Contact: founders@ecovibelabs.com | Data Room: link available upon request",
  },
];

const transitionVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -18, filter: "blur(6px)", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
} as const;

const imageVariants = {
  initial: { opacity: 0, scale: 1.03, rotate: 1.5 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, rotate: -2, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } },
} as const;

const autoplayIntervalMs = 12000;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const currentSlide = useMemo(() => slides[index], [index]);

  const goTo = useCallback(
    (next: number) => {
      const total = slides.length;
      const wrapped = (next + total) % total;
      setIndex(wrapped);
    },
    [setIndex],
  );

  useEffect(() => {
    if (!isAutoplaying) {
      return;
    }

    const id = window.setInterval(() => {
      goTo(index + 1);
    }, autoplayIntervalMs);

    return () => window.clearInterval(id);
  }, [goTo, index, isAutoplaying]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        goTo(index + 1);
        setIsAutoplaying(false);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        goTo(index - 1);
        setIsAutoplaying(false);
      }
      if (event.key === " ") {
        event.preventDefault();
        setIsAutoplaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [goTo, index]);

  const handleNavClick = useCallback(
    (direction: "prev" | "next") => {
      setIsAutoplaying(false);
      goTo(direction === "next" ? index + 1 : index - 1);
    },
    [goTo, index],
  );

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-20 inset-y-24 rounded-3xl border border-white/5 bg-gradient-to-br from-white/4 via-white/2 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-8 pt-12 sm:px-10 md:px-16 lg:px-24">
        <header className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-white/80">
              Eco Vibe Labs
            </span>
            <span className="text-sm text-white/60">Inspired by LARQ innovation</span>
          </div>
          <div className="hidden items-center gap-2 text-xs uppercase text-white/60 sm:flex">
            <div className="flex h-2 w-2 items-center justify-center rounded-full bg-emerald-400" />
            Live Pitch Mode
          </div>
        </header>

        <section className="mt-10 flex flex-1 flex-col gap-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-10 md:p-16">
          <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`label-${currentSlide.id}`}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.42em] text-white/70"
                  >
                    <span className="inline-flex h-2 w-8 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400" />
                    {currentSlide.label}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${currentSlide.id}`}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  >
                    {currentSlide.title}
                  </motion.h1>
                </AnimatePresence>
                {currentSlide.subtitle ? (
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`subtitle-${currentSlide.id}`}
                      variants={transitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                  </AnimatePresence>
                ) : null}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentSlide.id}`}
                  variants={transitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6 text-sm text-white/80 sm:text-base"
                >
                  {currentSlide.paragraphs?.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {currentSlide.bullets ? (
                    <ul className="grid gap-3">
                      {currentSlide.bullets.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {currentSlide.footerNote ? (
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`footer-${currentSlide.id}`}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-xs uppercase tracking-widest text-white/60"
                  >
                    {currentSlide.footerNote}
                  </motion.p>
                </AnimatePresence>
              ) : null}
            </div>

            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br p-1">
              <div className={`absolute inset-0 -z-10 blur-3xl bg-gradient-to-br ${currentSlide.accent}`} />
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-slate-900/70 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${currentSlide.id}`}
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative flex-1"
                  >
                    <Image
                      src={currentSlide.image.src}
                      alt={currentSlide.image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                      <div className="flex items-center justify-between gap-4 text-xs text-white/70">
                        <span>{currentSlide.image.alt}</span>
                        {currentSlide.image.credit ? <span>{currentSlide.image.credit}</span> : null}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {currentSlide.stats ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`stats-${currentSlide.id}`}
                      variants={transitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="grid grid-cols-3 gap-3 border-t border-white/5 bg-black/30 p-4 text-sm text-white/80 backdrop-blur"
                    >
                      {currentSlide.stats.map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-white/5 px-3 py-2 text-center">
                          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                          <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="border-t border-white/5 bg-black/30 p-4 text-xs uppercase tracking-[0.4em] text-white/60 backdrop-blur">
                    Eco Vibe Bottles — Hydration, reimagined.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-6 pb-4 text-xs text-white/70 sm:text-sm">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
              onClick={() => handleNavClick("prev")}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
              onClick={() => handleNavClick("next")}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.4em] transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
              onClick={() => setIsAutoplaying((prev) => !prev)}
              aria-label={isAutoplaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isAutoplaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAutoplaying ? "Pause" : "Play"}
            </button>
          </div>

          <div className="flex min-w-[160px] flex-1 items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-400 to-indigo-400 transition-all duration-500"
                style={{ width: `${((index + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="w-28 text-right font-mono text-xs tracking-widest text-white/60">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
