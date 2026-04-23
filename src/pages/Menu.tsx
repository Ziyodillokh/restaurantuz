import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Search, Crown } from "lucide-react";
import Layout from "@/components/site/Layout";
import { useDishes, useSettings } from "@/lib/store";
import { formatSom, type Dish } from "@/data/menu";
import {
  categoryLabels,
  categoryOrder,
  categorySubtitle,
  type CategoryKey,
} from "@/components/menu/pages";
import { cn } from "@/lib/utils";

const FALLBACK =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80";

const badgeStyles: Record<NonNullable<Dish["badge"]>, { label: string; cls: string }> = {
  signature: { label: "Signature", cls: "bg-primary/90 text-primary-foreground" },
  chef: { label: "Chef's Pick", cls: "bg-accent/95 text-accent-foreground" },
  new: { label: "Yangi", cls: "bg-cream/95 text-background" },
  spicy: { label: "Achchiq", cls: "bg-ruby/90 text-cream" },
};

/* ──────────────── Image with graceful fallback ──────────────── */
function FoodImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src || FALLBACK}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        if (img.dataset.fb !== "1") {
          img.dataset.fb = "1";
          img.src = FALLBACK;
        }
      }}
    />
  );
}

/* ──────────────── Editorial mosaic card ──────────────── */
function DishCard({
  dish,
  onOpen,
  size = "regular",
}: {
  dish: Dish;
  onOpen: () => void;
  size?: "regular" | "tall" | "wide";
}) {
  const aspect =
    size === "tall" ? "aspect-[4/5] md:aspect-[3/4]" : size === "wide" ? "aspect-[16/10]" : "aspect-[4/5]";
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "group relative overflow-hidden bg-card text-left w-full",
        "border border-border/60 hover:border-accent/60 transition-all duration-500"
      )}
    >
      <div className={cn("relative overflow-hidden", aspect)}>
        <FoodImg
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        {/* Badge */}
        {dish.badge && (
          <span
            className={cn(
              "absolute top-4 left-4 px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase",
              badgeStyles[dish.badge].cls
            )}
          >
            {badgeStyles[dish.badge].label}
          </span>
        )}
        {/* Top-right gold dot — hover hint */}
        <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="text-[10px] tracking-[0.35em] text-accent uppercase mb-1.5">
          {categoryLabels[dish.category as CategoryKey]}
          {dish.weight ? ` · ${dish.weight}` : ""}
        </div>
        <h3 className="font-display text-2xl md:text-[26px] text-cream leading-tight">
          {dish.name}
        </h3>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="font-serif-alt italic text-cream/70 text-sm line-clamp-2 max-w-[80%]">
            {dish.desc}
          </p>
          <div className="font-accent text-cream text-lg whitespace-nowrap">
            {formatSom(dish.price)}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ──────────────── Lightbox ──────────────── */
function Lightbox({
  dishes,
  index,
  onClose,
  onIndex,
}: {
  dishes: Dish[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const dish = dishes[index];

  const next = useCallback(
    () => onIndex((index + 1) % dishes.length),
    [index, dishes.length, onIndex]
  );
  const prev = useCallback(
    () => onIndex((index - 1 + dishes.length) % dishes.length),
    [index, dishes.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  if (!dish) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-md"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 h-11 w-11 grid place-items-center text-cream/80 hover:text-accent border border-cream/20 hover:border-accent rounded-full transition-colors"
        aria-label="Yopish"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-10 text-cream/60 text-[11px] tracking-[0.4em]">
        {String(index + 1).padStart(2, "0")} / {String(dishes.length).padStart(2, "0")}
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Oldingi"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 md:h-14 md:w-14 grid place-items-center text-cream/70 hover:text-accent border border-cream/15 hover:border-accent rounded-full transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Keyingi"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 md:h-14 md:w-14 grid place-items-center text-cream/70 hover:text-accent border border-cream/15 hover:border-accent rounded-full transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="h-full w-full grid lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          key={dish.id + "-img"}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[55vh] lg:h-full min-h-[300px]"
        >
          <FoodImg
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 lg:bg-gradient-to-r" />
        </motion.div>

        <motion.div
          key={dish.id + "-info"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center p-8 md:p-12 lg:p-16 max-w-2xl"
        >
          <div className="text-[10px] tracking-[0.5em] text-accent uppercase">
            {categoryLabels[dish.category as CategoryKey]}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-3 leading-[1.05]">
            {dish.name}
          </h2>
          <div className="gold-divider my-6 w-20" />
          <p className="font-serif-alt italic text-lg md:text-xl text-cream/80 leading-relaxed">
            {dish.desc}
          </p>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              {dish.weight && (
                <div className="text-[10px] tracking-[0.35em] text-cream/50 uppercase">
                  Hajm
                </div>
              )}
              <div className="font-display text-2xl text-cream mt-1">{dish.weight || ""}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.35em] text-cream/50 uppercase">Narx</div>
              <div className="font-accent text-4xl text-accent mt-1">
                {formatSom(dish.price)}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/bron"
              state={{ dish: dish.id }}
              onClick={onClose}
              className="px-7 py-4 bg-primary text-primary-foreground uppercase tracking-[0.3em] text-xs hover:bg-ruby hover:royal-glow transition-all"
            >
              Stol band qilib buyurtma
            </Link>
            <button
              onClick={onClose}
              className="px-7 py-4 border border-cream/30 text-cream uppercase tracking-[0.3em] text-xs hover:border-accent hover:text-accent transition-colors"
            >
              Menyuga qaytish
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ──────────────── Page ──────────────── */
export default function MenuPage() {
  const dishes = useDishes();
  const settings = useSettings();
  const [active, setActive] = useState<"all" | CategoryKey>("all");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const availableCats = useMemo(
    () => categoryOrder.filter((c) => dishes.some((d) => d.category === c)),
    [dishes]
  );

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      if (active !== "all" && d.category !== active) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!d.name.toLowerCase().includes(q) && !d.desc.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [dishes, active, query]);

  // Mosaic sizing pattern: every 7th = wide, every 5th = tall
  const sizeFor = (i: number): "regular" | "tall" | "wide" => {
    if (i % 11 === 3) return "wide";
    if (i % 7 === 0) return "tall";
    return "regular";
  };

  return (
    <Layout>
      <section className="pt-28 pb-24 relative">
        {/* Atmospheric backdrop */}
        <div className="absolute inset-0 pointer-events-none pattern-royal opacity-90" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(var(--primary) / 0.18), transparent 60%)",
          }}
        />

        <div className="relative max-w-[1500px] mx-auto container-px">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-accent text-[11px] tracking-[0.5em] uppercase">
              <Crown className="h-3.5 w-3.5" />
              {settings.name} · Menyu
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream mt-5 leading-[1.05]">
              Milliy{" "}
              <span className="italic text-gradient-gold">dasturxon</span>
            </h1>
            <div className="gold-divider w-24 mx-auto mt-6" />
            <p className="mt-6 font-serif-alt italic text-cream/70 text-lg md:text-xl">
              Palovdan tortib chak-chakkacha — har bir taom uy ta'mi va asrlar an'anasi bilan.
            </p>
          </motion.header>

          {/* Filter bar — sticky on all screens, prominent on mobile */}
          <div className="sticky top-[64px] lg:top-[80px] z-30 mt-10 md:mt-12 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 py-3 md:py-4 bg-background/92 backdrop-blur-xl border-y border-accent/15">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
              <div className="relative w-full lg:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Taom qidirish…"
                  className="w-full bg-input border border-border text-cream placeholder:text-cream/40 pl-10 pr-3 py-3 lg:py-2.5 text-sm focus:outline-none focus:border-accent rounded-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 lg:flex-1 snap-x snap-mandatory">
                <CatPill active={active === "all"} onClick={() => setActive("all")}>
                  Barchasi · {dishes.length}
                </CatPill>
                {availableCats.map((c) => {
                  const count = dishes.filter((d) => d.category === c).length;
                  return (
                    <CatPill key={c} active={active === c} onClick={() => setActive(c)}>
                      {categoryLabels[c]} · {count}
                    </CatPill>
                  );
                })}
              </div>

              <div className="hidden lg:block text-[10px] tracking-[0.3em] text-cream/40 uppercase whitespace-nowrap">
                {filtered.length} taom
              </div>
            </div>
          </div>

          {/* Active section description (when not "all") */}
          {active !== "all" && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl text-cream">
                {categoryLabels[active]}
              </h2>
              <p className="mt-2 font-serif-alt italic text-cream/60 max-w-xl mx-auto px-6">
                {categorySubtitle[active]}
              </p>
              <div className="md:hidden mt-3 text-[10px] tracking-[0.4em] text-accent uppercase">
                {filtered.length} taom
              </div>
            </motion.div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-20 text-center text-cream/60 border border-dashed border-border py-20">
              Hech narsa topilmadi. Boshqa kategoriyani sinab ko'ring.
            </div>
          ) : (
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
              {filtered.map((d, i) => (
                <DishCard
                  key={d.id}
                  dish={d}
                  size={sizeFor(i)}
                  onOpen={() => setOpenIndex(i)}
                />
              ))}
            </div>
          )}

          {/* Footer note */}
          <div className="mt-20 text-center text-cream/40 text-[10px] tracking-[0.5em] uppercase">
            — {settings.name} —
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            dishes={filtered}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onIndex={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}

function CatPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "snap-start shrink-0 px-4 md:px-5 py-2.5 md:py-2 text-[11px] tracking-[0.25em] uppercase transition-all border whitespace-nowrap",
        active
          ? "bg-gradient-to-b from-[hsl(35_60%_38%)] to-[hsl(35_55%_28%)] text-cream border-accent shadow-[0_4px_18px_-6px_hsl(var(--accent)/0.4)]"
          : "bg-card/40 text-cream/70 border-border hover:border-accent/60 hover:text-cream"
      )}
    >
      {children}
    </button>
  );
}
