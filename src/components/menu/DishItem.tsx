import { Link } from "react-router-dom";
import { Flame, Sparkles, Star } from "lucide-react";
import type { Dish } from "@/data/menu";
import { formatSom } from "@/data/menu";

const badgeMap: Record<NonNullable<Dish["badge"]>, { label: string; icon: any; cls: string }> = {
  chef: { label: "Chef's Pick", icon: Sparkles, cls: "bg-[hsl(38_50%_40%)] text-[hsl(36_40%_95%)]" },
  signature: { label: "Signature", icon: Star, cls: "bg-[hsl(351_70%_35%)] text-[hsl(36_40%_95%)]" },
  new: { label: "Yangi", icon: Sparkles, cls: "bg-[hsl(150_45%_30%)] text-[hsl(36_40%_95%)]" },
  spicy: { label: "Achchiq", icon: Flame, cls: "bg-[hsl(15_75%_45%)] text-[hsl(36_40%_95%)]" },
};

export default function DishItem({ d, compact = false }: { d: Dish; compact?: boolean }) {
  const Badge = d.badge ? badgeMap[d.badge] : null;
  return (
    <div className="flex gap-4 py-3 border-b border-dashed border-[hsl(28_25%_55%)]/35 last:border-0 group">
      {d.image ? (
        <div className="relative shrink-0">
          <div
            className={`${compact ? "w-16 h-16" : "w-20 h-20 md:w-24 md:h-24"} overflow-hidden rounded-full ring-1 ring-[hsl(20_40%_15%)]/20`}
            style={{
              boxShadow:
                "0 0 0 2px hsl(36 30% 92%), 0 0 0 3px hsl(38 55% 45%), 0 8px 18px -8px hsl(20 40% 10% / 0.5)",
            }}
          >
            <img
              src={d.image}
              alt={d.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      ) : (
        <div className={`${compact ? "w-10 h-16" : "w-12 h-20 md:h-24"} shrink-0 grid place-items-center`}>
          <div className="text-[hsl(38_50%_38%)] text-2xl">❦</div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <h3 className="font-display text-lg md:text-xl text-[hsl(20_40%_15%)] leading-tight truncate">
            {d.name}
          </h3>
          {Badge && (
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[8px] tracking-[0.18em] uppercase ${Badge.cls}`}
            >
              <Badge.icon className="h-2.5 w-2.5" />
              {Badge.label}
            </span>
          )}
        </div>

        {/* Dotted leader between name and price */}
        <div className="flex items-end gap-2 -mt-0.5 mb-1">
          <span
            aria-hidden
            className="flex-1 mb-1.5 border-b border-dotted border-[hsl(28_30%_45%)]/50"
          />
          <span className="price-tag text-base md:text-lg whitespace-nowrap">
            {formatSom(d.price)}
          </span>
        </div>

        <p className="font-serif-alt italic text-[13px] md:text-sm text-[hsl(20_25%_30%)] leading-snug line-clamp-2">
          {d.desc}
        </p>

        <div className="mt-1.5 flex items-center justify-between">
          {d.weight ? (
            <span className="text-[10px] tracking-[0.25em] text-[hsl(20_20%_40%)]">
              {d.weight}
            </span>
          ) : (
            <span />
          )}
          <Link
            to="/bron"
            state={{ dish: d.id }}
            className="text-[9px] uppercase tracking-[0.25em] text-[hsl(351_70%_35%)] border-b border-[hsl(351_70%_35%)]/40 hover:border-[hsl(351_70%_35%)] transition-colors"
          >
            Buyurtma →
          </Link>
        </div>
      </div>
    </div>
  );
}
