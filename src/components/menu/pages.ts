// Category metadata for the menu (used by both the public menu and admin).
export const categoryOrder = [
  "palov",
  "kabob",
  "milliy",
  "shorva",
  "salat",
  "non",
  "ichimlik",
  "shirinlik",
] as const;

export type CategoryKey = typeof categoryOrder[number];

export const categoryLabels: Record<CategoryKey, string> = {
  palov: "Palov",
  kabob: "Kaboblar",
  milliy: "Milliy taomlar",
  shorva: "Sho'rvalar",
  salat: "Salatlar",
  non: "Non & Patir",
  ichimlik: "Ichimliklar",
  shirinlik: "Shirinliklar",
};

export const categorySubtitle: Record<CategoryKey, string> = {
  palov: "Toshkent, Samarqand, Buxoro — har bir mintaqaning o'z qatlami.",
  kabob: "Ko'mirda pishirilgan, ziravorlangan, suyak ustida hidli.",
  milliy: "Manti, somsa, lag'mon, dimlama — uy ta'mining barchasi.",
  shorva: "Mastava, qo'y sho'rva, mosh xo'rda — issiq va to'yimli.",
  salat: "Yangi sabzavotlar va klassik aralashmalar.",
  non: "Tandir oloviga yopilgan obi non, patir, qatlama.",
  ichimlik: "Ko'k choy, ayron, kompot va yangi siqilgan sharbatlar.",
  shirinlik: "Chak-chak, halvo, navvot — choy bilan birga.",
};
