import type { Dish } from "@/data/menu";

export const categoryOrder = [
  "starter",
  "soup",
  "salad",
  "premium",
  "classic",
  "burger",
  "garnish",
  "sauce",
  "drink",
  "dessert",
] as const;

export type CategoryKey = typeof categoryOrder[number];

export const categoryLabels: Record<CategoryKey, string> = {
  starter: "STARTERLAR",
  soup: "SHO'RVALAR",
  salad: "SALATLAR",
  premium: "PREMIUM STEYKLAR",
  classic: "KLASSIK STEYKLAR",
  burger: "BURGERLAR",
  garnish: "GARNIRLAR",
  sauce: "SOUSLAR",
  drink: "ICHIMLIKLAR",
  dessert: "SHIRINLIKLAR",
};

export const categorySubtitle: Record<CategoryKey, string> = {
  starter: "Aperitiv & yengil boshlovchi taomlar",
  soup: "Issiq, boy va to'yimli sho'rvalar",
  salad: "Yangi va mavsumiy salatlar",
  premium: "Eng yuqori darajadagi marmar go'shti",
  classic: "Steyk klassikasi — har doim mukammal",
  burger: "Wagyu va premium kotletlar",
  garnish: "Mukammal hamrohlar",
  sauce: "Steykingizga teginish",
  drink: "Tetiklantiruvchi tanlovlar",
  dessert: "Shirin yakun",
};

export type PageContent =
  | { kind: "cover" }
  | { kind: "intro" }
  | { kind: "section-cover"; category: CategoryKey }
  | {
      kind: "section";
      category: CategoryKey;
      title: string;
      items: Dish[];
      pageNum: number;
      totalPages: number;
    }
  | { kind: "back" };

// how many dishes fit on one book page by category — tuned so no overflow on 540×745
const perPage: Record<CategoryKey, number> = {
  starter: 3,
  soup: 3,
  salad: 3,
  premium: 2,
  classic: 3,
  burger: 3,
  garnish: 4,
  sauce: 4,
  drink: 4,
  dessert: 3,
};

export function buildPages(dishes: Dish[]): PageContent[] {
  const pages: PageContent[] = [{ kind: "cover" }, { kind: "intro" }];

  for (const c of categoryOrder) {
    const items = dishes.filter((d) => d.category === c);
    if (items.length === 0) continue;

    pages.push({ kind: "section-cover", category: c });

    const size = perPage[c];
    const chunks: Dish[][] = [];
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));

    chunks.forEach((chunk, idx) =>
      pages.push({
        kind: "section",
        category: c,
        title: categoryLabels[c],
        items: chunk,
        pageNum: idx + 1,
        totalPages: chunks.length,
      })
    );
  }

  pages.push({ kind: "back" });
  if (pages.length % 2) pages.push({ kind: "back" });
  return pages;
}
