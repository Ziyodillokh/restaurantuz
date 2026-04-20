import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Layout from "@/components/site/Layout";
import { dishes, formatSom } from "@/data/menu";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const categoryLabels: Record<string, string> = {
  premium: "PREMIUM STEYKLAR",
  classic: "KLASSIK STEYKLAR",
  garnish: "GARNIRLAR",
  sauce: "SOUSLAR",
  drink: "ICHIMLIKLAR",
  dessert: "SHIRINLIKLAR",
};

type PageContent =
  | { kind: "cover" }
  | { kind: "intro" }
  | { kind: "section"; title: string; items: typeof dishes }
  | { kind: "back" };

function buildPages(): PageContent[] {
  const pages: PageContent[] = [{ kind: "cover" }, { kind: "intro" }];
  const cats: Array<keyof typeof categoryLabels> = ["premium", "classic", "garnish", "sauce", "drink", "dessert"];
  for (const c of cats) {
    const items = dishes.filter((d) => d.category === c);
    // chunk by 3 (premium, classic) or 4 (others)
    const size = c === "premium" || c === "classic" ? 3 : 4;
    for (let i = 0; i < items.length; i += size) {
      pages.push({ kind: "section", title: categoryLabels[c], items: items.slice(i, i + size) });
    }
  }
  pages.push({ kind: "back" });
  // ensure even number of pages for nice spread
  if (pages.length % 2) pages.push({ kind: "back" });
  return pages;
}

const Page = ({ children, side = "right" }: { children: React.ReactNode; side?: "left" | "right" }) => (
  <div
    className="texture-paper h-full w-full overflow-hidden relative"
    style={{
      boxShadow:
        side === "right"
          ? "inset 24px 0 30px -24px rgba(0,0,0,0.5)"
          : "inset -24px 0 30px -24px rgba(0,0,0,0.5)",
    }}
  >
    <div className="absolute inset-0 p-8 md:p-10 text-[hsl(20_30%_15%)]">{children}</div>
  </div>
);

const DishItem = ({ d }: { d: typeof dishes[number] }) => (
  <div className="flex gap-4 py-4 border-b border-[hsl(20_20%_70%)]/40 last:border-0">
    {d.image && (
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-full border-2 border-[hsl(38_39%_50%)] shadow-md">
        <img src={d.image} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-xl md:text-2xl text-[hsl(20_30%_18%)] truncate">{d.name}</h3>
        <span className="font-accent text-base md:text-lg text-[hsl(351_70%_38%)] whitespace-nowrap">
          {formatSom(d.price)}
        </span>
      </div>
      <p className="font-serif italic text-sm text-[hsl(20_15%_35%)] mt-1 line-clamp-2">{d.desc}</p>
      <div className="mt-1.5 flex items-center justify-between">
        {d.weight && <span className="text-xs tracking-[0.2em] text-[hsl(20_15%_45%)]">{d.weight}</span>}
        <Link
          to="/bron"
          state={{ dish: d.id }}
          className="text-[10px] uppercase tracking-[0.2em] text-[hsl(351_70%_38%)] border-b border-[hsl(351_70%_38%)]/40 hover:border-[hsl(351_70%_38%)]"
        >
          Buyurtma →
        </Link>
      </div>
    </div>
  </div>
);

export default function MenuPage() {
  const pages = buildPages();
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 500, h: 680 });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      if (vw < 768) {
        setSize({ w: Math.min(vw - 32, 380), h: Math.min(window.innerHeight - 220, 600) });
      } else {
        const w = Math.min(vw / 2 - 60, 540);
        setSize({ w, h: w * 1.35 });
      }
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

  return (
    <Layout>
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover blur-md scale-110"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>

        <div className="relative max-w-[1400px] mx-auto container-px">
          <div className="text-center mb-10">
            <div className="text-gold text-xs tracking-[0.4em] mb-3">— MENYU</div>
            <h1 className="font-display text-4xl md:text-6xl text-cream">
              Bizning <span className="italic text-gradient-ember">qadr-qiymatlarimiz</span>
            </h1>
            <p className="mt-3 text-cream/60 text-sm">Sahifani varaqlash uchun bosing yoki ← → tugmalardan foydalaning</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <button
              onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
              className="hidden md:grid place-items-center h-12 w-12 mr-4 rounded-full border border-cream/30 text-cream hover:border-primary hover:text-primary transition-colors"
              aria-label="Oldingi"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="shadow-deep">
              {/* @ts-ignore - lib types not perfect */}
              <HTMLFlipBook
                ref={bookRef}
                width={size.w}
                height={size.h}
                size="fixed"
                minWidth={300}
                maxWidth={600}
                minHeight={400}
                maxHeight={900}
                drawShadow
                flippingTime={800}
                showCover={false}
                mobileScrollSupport
                onFlip={(e: any) => setPage(e.data)}
                className=""
                style={{}}
                startPage={0}
                usePortrait
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.6}
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
              >
                {pages.map((p, idx) => {
                  const side: "left" | "right" = idx % 2 === 0 ? "right" : "left";
                  if (p.kind === "cover")
                    return (
                      <div key={idx} className="texture-leather h-full w-full grid place-items-center text-[hsl(38_50%_70%)] p-8">
                        <div className="text-center border-2 border-[hsl(38_39%_55%)] p-10">
                          <div className="text-[10px] tracking-[0.5em]">EST · 2014</div>
                          <div className="font-display text-3xl md:text-4xl mt-6">KUDDUS</div>
                          <div className="font-display text-3xl md:text-4xl">STEAK</div>
                          <div className="my-6 h-px w-20 bg-[hsl(38_39%_55%)] mx-auto" />
                          <div className="font-accent text-xl tracking-[0.3em]">— MENYU —</div>
                        </div>
                      </div>
                    );
                  if (p.kind === "intro")
                    return (
                      <Page key={idx} side={side}>
                        <div className="h-full flex flex-col justify-center text-center">
                          <div className="font-accent text-xs tracking-[0.4em] text-[hsl(351_70%_38%)]">XUSH KELIBSIZ</div>
                          <h2 className="font-display text-3xl md:text-4xl mt-4">Kuddus Steak Menyusi</h2>
                          <div className="my-6 h-px w-20 bg-[hsl(38_39%_50%)] mx-auto" />
                          <p className="font-serif italic text-base md:text-lg max-w-md mx-auto leading-relaxed">
                            "Har bir bo'lakda — 10 yillik mahorat, olov sadosi va Argentina, AQSH, Avstraliyaning eng
                            yaxshi marmar go'shtidan tayyorlangan tajriba."
                          </p>
                          <div className="mt-10 text-[10px] tracking-[0.3em]">— OSHPAZ KUDDUS —</div>
                        </div>
                      </Page>
                    );
                  if (p.kind === "back")
                    return (
                      <div key={idx} className="texture-leather h-full w-full grid place-items-center text-[hsl(38_50%_70%)] p-8">
                        <div className="text-center">
                          <div className="font-display text-2xl">Tashrifingiz uchun</div>
                          <div className="font-display italic text-3xl mt-1">rahmat.</div>
                          <div className="my-6 h-px w-16 bg-[hsl(38_39%_55%)] mx-auto" />
                          <div className="font-accent text-xs tracking-[0.4em]">+998 71 200 14 14</div>
                        </div>
                      </div>
                    );
                  return (
                    <Page key={idx} side={side}>
                      <div className="font-accent text-xs tracking-[0.4em] text-[hsl(351_70%_38%)]">
                        {p.title}
                      </div>
                      <div className="h-px w-full bg-[hsl(38_39%_50%)]/50 my-3" />
                      <div className="space-y-1">
                        {p.items.map((d) => (
                          <DishItem key={d.id} d={d} />
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] tracking-[0.3em] text-[hsl(20_15%_45%)]">
                        — KUDDUS STEAK —
                      </div>
                    </Page>
                  );
                })}
              </HTMLFlipBook>
            </div>

            <button
              onClick={() => bookRef.current?.pageFlip()?.flipNext()}
              className="hidden md:grid place-items-center h-12 w-12 ml-4 rounded-full border border-cream/30 text-cream hover:border-primary hover:text-primary transition-colors"
              aria-label="Keyingi"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          <div className="text-center mt-8 text-cream/60 text-xs tracking-[0.3em]">
            {page + 1} / {pages.length}
          </div>
        </div>
      </section>
    </Layout>
  );
}
