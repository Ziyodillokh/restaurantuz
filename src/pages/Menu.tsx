import { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, List } from "lucide-react";
import Layout from "@/components/site/Layout";
import BookPage, { HardPage } from "@/components/menu/BookPage";
import DishItem from "@/components/menu/DishItem";
import {
  buildPages,
  categoryLabels,
  categoryOrder,
  categorySubtitle,
  type CategoryKey,
} from "@/components/menu/pages";
import { useDishes, useSettings } from "@/lib/store";
import type { Dish } from "@/data/menu";
import { useIsMobile } from "@/hooks/use-mobile";

/* ────────────────────── DESKTOP BOOK ────────────────────── */
function DesktopBook({ dishes }: { dishes: Dish[] }) {
  const pages = useMemo(() => buildPages(dishes), [dishes]);
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 520, h: 720 });
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Reserve space for header, TOC button, page counter & gutters.
      const availW = Math.min(vw - 220, 1200); // leave room for side arrows + padding
      const availH = vh - 260;

      // Keep a portrait page aspect ratio of ~1:1.38 — target height, then derive width.
      let h = Math.min(availH, 800);
      let w = h / 1.38;
      // Two-page spread must fit horizontally
      if (w * 2 > availW) {
        w = availW / 2;
        h = w * 1.38;
      }
      w = Math.max(Math.min(w, 540), 360);
      h = Math.max(Math.min(h, 800), 520);
      setSize({ w, h });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goToCategory = (cat: CategoryKey) => {
    const idx = pages.findIndex((p) => p.kind === "section-cover" && p.category === cat);
    if (idx >= 0) bookRef.current?.pageFlip()?.flip(idx);
    setShowToc(false);
  };

  const availableCats = useMemo(
    () =>
      categoryOrder.filter((c) =>
        pages.some((p) => p.kind === "section-cover" && p.category === c)
      ),
    [pages]
  );

  return (
    <div className="relative">
      {/* TOC button */}
      <button
        onClick={() => setShowToc((v) => !v)}
        className="absolute -top-14 right-0 inline-flex items-center gap-2 text-cream/70 hover:text-primary transition-colors text-xs tracking-[0.3em] z-30"
      >
        <List className="h-4 w-4" /> KATEGORIYALAR
      </button>

      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-2 right-0 z-30 glass-dark rounded-md p-3 min-w-[240px] border border-accent/20"
          >
            <div className="text-[10px] tracking-[0.3em] text-accent mb-2 px-2">
              — MUNDARIJA —
            </div>
            {availableCats.map((c) => (
              <button
                key={c}
                onClick={() => goToCategory(c)}
                className="w-full text-left px-3 py-2 text-cream/80 hover:text-primary hover:bg-white/5 rounded text-sm font-display"
              >
                {categoryLabels[c]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center items-center">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="hidden lg:grid place-items-center h-12 w-12 mr-6 rounded-full border border-cream/30 text-cream hover:border-primary hover:text-primary transition-all hover:scale-110 shrink-0"
          aria-label="Oldingi"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Book stack illusion behind */}
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-sm"
            style={{
              background: "hsl(20 40% 8%)",
              transform: "translate(8px, 8px)",
              filter: "blur(2px)",
              opacity: 0.6,
            }}
          />
          <div className="shadow-deep">
            {/* @ts-ignore */}
            <HTMLFlipBook
              ref={bookRef}
              width={size.w}
              height={size.h}
              size="fixed"
              minWidth={360}
              maxWidth={600}
              minHeight={520}
              maxHeight={900}
              drawShadow
              flippingTime={900}
              showCover={true}
              mobileScrollSupport={false}
              onFlip={(e: any) => setPage(e.data)}
              className=""
              style={{}}
              startPage={0}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.7}
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
            >
              {pages.map((p, idx) => renderPage(p, idx))}
            </HTMLFlipBook>
          </div>
        </div>

        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="hidden lg:grid place-items-center h-12 w-12 ml-6 rounded-full border border-cream/30 text-cream hover:border-primary hover:text-primary transition-all hover:scale-110 shrink-0"
          aria-label="Keyingi"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Page progress */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-3 text-cream/60 text-[11px] tracking-[0.4em]">
          <span>{String(page + 1).padStart(2, "0")}</span>
          <span className="block w-32 h-px bg-cream/20 relative">
            <span
              className="absolute left-0 top-0 h-px bg-primary transition-all duration-500"
              style={{ width: `${((page + 1) / pages.length) * 100}%` }}
            />
          </span>
          <span>{String(pages.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Page renderer (shared) ────────────── */
function renderPage(p: ReturnType<typeof buildPages>[number], idx: number) {
  const side: "left" | "right" = idx % 2 === 0 ? "right" : "left";

  if (p.kind === "cover") {
    return (
      <HardPage key={idx}>
        <div className="text-center leather-frame p-10 md:p-12 relative">
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-[hsl(38_55%_55%)]/40 pointer-events-none" />
          <div className="text-[10px] tracking-[0.6em] gold-foil">EST · 2014</div>
          <div className="font-display text-4xl md:text-5xl mt-6 gold-foil">ZIYODULLO</div>
          <div className="font-display text-4xl md:text-5xl gold-foil">RESTAURANT</div>
          <div className="my-6 h-px w-24 bg-[hsl(38_55%_55%)] mx-auto" />
          <div className="font-accent text-2xl tracking-[0.4em] gold-foil">— MENYU —</div>
          <div className="mt-8 text-[9px] tracking-[0.5em] text-[hsl(38_45%_60%)]">
            HANDCRAFTED · OPEN FIRE
          </div>
        </div>
      </HardPage>
    );
  }

  if (p.kind === "back") {
    return (
      <HardPage key={idx}>
        <div className="text-center">
          <div className="font-display text-3xl gold-foil">Tashrifingiz uchun</div>
          <div className="font-display italic text-4xl mt-1 gold-foil">rahmat.</div>
          <div className="my-6 h-px w-20 bg-[hsl(38_55%_55%)] mx-auto" />
          <div className="font-accent text-sm tracking-[0.5em] gold-foil">
            +998 71 200 14 14
          </div>
          <div className="mt-6 text-[9px] tracking-[0.5em] text-[hsl(38_45%_60%)]">
            ZIYODULLO-RESTAURANT.UZ
          </div>
        </div>
      </HardPage>
    );
  }

  if (p.kind === "intro") {
    return (
      <BookPage key={idx} side={side} variant="aged">
        <div className="h-full flex flex-col justify-center text-center">
          <div className="font-accent text-xs tracking-[0.5em] text-[hsl(351_70%_35%)]">
            XUSH KELIBSIZ
          </div>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-[hsl(20_40%_15%)]">
            Ziyodullo Restaurant Menyusi
          </h2>
          <div className="ornament ornament-aged my-6 mx-8" />
          <p className="font-serif-alt italic text-base md:text-lg max-w-md mx-auto leading-relaxed text-[hsl(20_30%_25%)]">
            "Har bir bo'lakda — 10 yillik mahorat, olov sadosi va Argentina,
            AQSH, Avstraliyaning eng yaxshi marmar go'shtidan tajriba."
          </p>
          <div className="mt-10 text-[10px] tracking-[0.4em] text-[hsl(20_30%_30%)]">
            — OSHPAZ ZIYODULLO —
          </div>
        </div>
      </BookPage>
    );
  }

  if (p.kind === "section-cover") {
    return (
      <BookPage key={idx} side={side} variant="aged">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="text-[10px] tracking-[0.5em] text-[hsl(38_50%_38%)]">— BO'LIM —</div>
          <h2 className="font-display text-4xl md:text-5xl mt-6 text-[hsl(20_40%_15%)] leading-tight">
            {categoryLabels[p.category]}
          </h2>
          <div className="ornament ornament-aged my-6 w-3/4" />
          <p className="font-serif-alt italic text-base text-[hsl(20_30%_30%)] max-w-xs">
            {categorySubtitle[p.category]}
          </p>
        </div>
      </BookPage>
    );
  }

  // Content section
  return (
    <BookPage key={idx} side={side}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-accent text-[11px] tracking-[0.4em] text-[hsl(351_70%_35%)]">
          {p.title}
        </div>
        <div className="text-[9px] tracking-[0.3em] text-[hsl(20_25%_40%)]">
          {p.pageNum}/{p.totalPages}
        </div>
      </div>
      <div className="ornament mb-3" />
      <div className="flex-1 overflow-hidden">
        {p.items.map((d) => (
          <DishItem key={d.id} d={d} />
        ))}
      </div>
      <div className="text-center text-[9px] tracking-[0.4em] text-[hsl(20_25%_40%)] mt-2">
        — ZIYODULLO RESTAURANT —
      </div>
    </BookPage>
  );
}

/* ────────────────────── MOBILE EXPERIENCE ────────────────────── */
function MobileMenu({ dishes }: { dishes: Dish[] }) {
  const grouped = useMemo(
    () =>
      categoryOrder
        .map((c) => ({ key: c, items: dishes.filter((d) => d.category === c) }))
        .filter((g) => g.items.length > 0),
    [dishes]
  );
  const [active, setActive] = useState<CategoryKey>(grouped[0]?.key || "premium");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (c: CategoryKey) => {
    const el = sectionRefs.current[c];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (const g of grouped) {
        const el = sectionRefs.current[g.key];
        if (!el) continue;
        if (el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(g.key);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [grouped]);

  return (
    <div>
      {/* Decorative cover */}
      <div className="texture-leather rounded-sm p-6 mb-6 leather-frame">
        <div className="text-center">
          <div className="text-[9px] tracking-[0.5em] gold-foil">EST · 2014</div>
          <div className="font-display text-3xl mt-2 gold-foil">ZIYODULLO RESTAURANT</div>
          <div className="my-3 h-px w-16 bg-[hsl(38_55%_55%)] mx-auto" />
          <div className="font-accent tracking-[0.4em] gold-foil">— MENYU —</div>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div className="sticky top-16 z-20 -mx-6 px-6 py-3 bg-background/95 backdrop-blur-md border-y border-cream/10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {grouped.map((g) => (
            <button
              key={g.key}
              onClick={() => scrollTo(g.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase transition-all ${
                active === g.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 text-cream/70 hover:text-cream"
              }`}
            >
              {categoryLabels[g.key]}
            </button>
          ))}
        </div>
      </div>

      {/* Sections rendered as paper "leaves" */}
      <div className="space-y-6 mt-6">
        {grouped.map((g) => (
          <div
            key={g.key}
            ref={(el) => (sectionRefs.current[g.key] = el)}
            className="texture-paper rounded-sm shadow-deep relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(225deg, hsl(28 35% 75%) 0%, hsl(28 35% 75%) 50%, transparent 50%)",
              }}
            />
            <div className="p-5 text-[hsl(20_30%_15%)]">
              <div className="text-center">
                <div className="text-[10px] tracking-[0.5em] text-[hsl(38_50%_38%)]">
                  — BO'LIM —
                </div>
                <h2 className="font-display text-2xl mt-1 text-[hsl(20_40%_15%)]">
                  {categoryLabels[g.key]}
                </h2>
                <p className="font-serif-alt italic text-xs text-[hsl(20_30%_30%)] mt-1">
                  {categorySubtitle[g.key]}
                </p>
                <div className="ornament my-4" />
              </div>
              <div>
                {g.items.map((d) => (
                  <DishItem key={d.id} d={d} compact />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 mb-4 text-cream/50 text-[10px] tracking-[0.4em]">
        — TASHRIFINGIZ UCHUN RAHMAT —
      </div>
    </div>
  );
}

/* ────────────────────── PAGE WRAPPER ────────────────────── */
export default function MenuPage() {
  const isMobile = useIsMobile();
  const dishes = useDishes();
  const settings = useSettings();

  return (
    <Layout>
      <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover blur-md scale-110"
          />
          <div className="absolute inset-0 bg-background/90" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top, hsl(351 86% 42% / 0.15), transparent 60%)",
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto container-px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 text-accent text-[11px] tracking-[0.5em] mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              MENYU KITOBI
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-cream">
              {settings.name}{" "}
              <span className="italic text-gradient-ember">qadr-qiymatlari</span>
            </h1>
            <p className="mt-3 text-cream/55 text-sm">
              {isMobile
                ? "Pastga aylantiring · Tepadagi yorliqlardan tezkor o'ting"
                : "Sahifani varaqlash uchun bosing yoki ← → tugmalardan foydalaning"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {isMobile ? <MobileMenu dishes={dishes} /> : <DesktopBook dishes={dishes} />}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
