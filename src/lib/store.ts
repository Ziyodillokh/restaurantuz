// localStorage-backed store for reservations, menu, branches & site settings.
// All mutations emit a custom "kuddus:data" event so any open tab/component can live-refresh.
import { useEffect, useState } from "react";
import {
  dishes as defaultDishes,
  branches as defaultBranches,
  Dish,
  Branch,
} from "@/data/menu";

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  branchId: string;
  note?: string;
  preorder?: string[];
  status: "yangi" | "tasdiqlangan" | "bekor";
  createdAt: number;
  tableId?: string; // assigned on confirmation
};

export type Table = {
  id: string;
  branchId: string;
  name: string;       // "Stol 1"
  capacity?: number;  // how many guests it fits
  note?: string;      // optional description
};

export type SiteSettings = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  telegram: string;
  heroPoster: string;
  heroTitle: string;
  heroSubtitle: string;
};

// Keys are namespaced with `v2` so existing tester localStorage from the
// previous "Kuddus Steak" build doesn't shadow the new defaults.
const RES_KEY = "zr.v2.reservations";
const DISH_KEY = "zr.v2.dishes";
const BRANCH_KEY = "zr.v2.branches";
const SETTINGS_KEY = "zr.v2.settings";
const TABLES_KEY = "zr.v2.tables";
const DATA_EVENT = "zr:data";

const defaultSettings: SiteSettings = {
  name: "Ziyodullo Restaurant",
  tagline: "Olovda tug'ilgan ta'm. Har bir bo'lak — san'at asari.",
  phone: "+998 71 200 14 14",
  email: "info@ziyodullo-restaurant.uz",
  address: "Toshkent, Amir Temur 107",
  hours: "Har kuni 11:00 — 00:00",
  instagram: "https://instagram.com/ziyodullo.restaurant",
  telegram: "https://t.me/ziyodullo_restaurant",
  heroPoster:
    "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=80",
  heroTitle: "Olovda Tug'ilgan Ta'm",
  heroSubtitle:
    "O'zbekistondagi eng yaxshi premium steyklar. Har bir bo'lak — san'at asari.",
};

function emit() {
  try {
    window.dispatchEvent(new CustomEvent(DATA_EVENT));
  } catch {}
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

/* ────────────── RESERVATIONS ────────────── */
export function getReservations(): Reservation[] {
  const raw = localStorage.getItem(RES_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  const seed = seedReservations();
  localStorage.setItem(RES_KEY, JSON.stringify(seed));
  return seed;
}

export function saveReservation(
  r: Omit<Reservation, "id" | "createdAt" | "status">
): Reservation {
  const all = getReservations();
  const full: Reservation = {
    ...r,
    id: "BR" + Math.floor(100000 + Math.random() * 900000),
    createdAt: Date.now(),
    status: "yangi",
  };
  all.unshift(full);
  write(RES_KEY, all);
  return full;
}

export function updateReservation(id: string, patch: Partial<Reservation>) {
  const all = getReservations().map((r) => (r.id === id ? { ...r, ...patch } : r));
  write(RES_KEY, all);
  return all;
}

export function deleteReservation(id: string) {
  const all = getReservations().filter((r) => r.id !== id);
  write(RES_KEY, all);
  return all;
}

/* ────────────── DISHES ────────────── */
export function getDishes(): Dish[] {
  const raw = localStorage.getItem(DISH_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  localStorage.setItem(DISH_KEY, JSON.stringify(defaultDishes));
  return defaultDishes;
}

export function saveDishes(d: Dish[]) {
  write(DISH_KEY, d);
}

export function resetDishes() {
  write(DISH_KEY, defaultDishes);
}

/* ────────────── BRANCHES ────────────── */
export function getBranches(): Branch[] {
  const raw = localStorage.getItem(BRANCH_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  localStorage.setItem(BRANCH_KEY, JSON.stringify(defaultBranches));
  return defaultBranches;
}

export function saveBranches(b: Branch[]) {
  write(BRANCH_KEY, b);
}

export function resetBranches() {
  write(BRANCH_KEY, defaultBranches);
}

/* ────────────── TABLES ────────────── */
function defaultTablesFor(branchId: string): Table[] {
  // Seed 8 tables per branch with varied capacities
  const capacities = [2, 2, 4, 4, 4, 6, 6, 8];
  return capacities.map((cap, i) => ({
    id: `${branchId}-t${i + 1}`,
    branchId,
    name: `Stol ${i + 1}`,
    capacity: cap,
    note: i === 7 ? "VIP" : "",
  }));
}

export function getTables(): Table[] {
  const raw = localStorage.getItem(TABLES_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  const seed = getBranches().flatMap((b) => defaultTablesFor(b.id));
  localStorage.setItem(TABLES_KEY, JSON.stringify(seed));
  return seed;
}

export function saveTables(t: Table[]) {
  write(TABLES_KEY, t);
}

export function resetTables() {
  const seed = getBranches().flatMap((b) => defaultTablesFor(b.id));
  write(TABLES_KEY, seed);
}

/* ────────────── SETTINGS ────────────── */
export function getSettings(): SiteSettings {
  const stored = read<Partial<SiteSettings>>(SETTINGS_KEY, {});
  return { ...defaultSettings, ...stored };
}

export function saveSettings(s: Partial<SiteSettings>) {
  const next = { ...getSettings(), ...s };
  write(SETTINGS_KEY, next);
  return next;
}

/* ────────────── LIVE HOOKS ──────────────
   Subscribes to our local data-change event AND cross-tab `storage` events
   so the public site updates the moment an admin saves something. */
function useLive<T>(getter: () => T): T {
  const [value, setValue] = useState<T>(getter);
  useEffect(() => {
    const refresh = () => setValue(getter());
    window.addEventListener(DATA_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DATA_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export const useDishes = () => useLive<Dish[]>(getDishes);
export const useBranches = () => useLive<Branch[]>(getBranches);
export const useSettings = () => useLive<SiteSettings>(getSettings);
export const useTables = () => useLive<Table[]>(getTables);
export const useReservations = () => useLive<Reservation[]>(getReservations);

/* ────────────── SEED ────────────── */
function seedReservations(): Reservation[] {
  const names = [
    "Bobur Karimov",
    "Madina Yusupova",
    "Sanjar Aliyev",
    "Nigora Tursunova",
    "Akmal Ergashev",
    "Zulfiya Saidova",
    "Jasur Rahimov",
    "Dilnoza Xolmatova",
    "Otabek Nazarov",
    "Shahzoda Mirzayeva",
    "Farruh Tojiev",
    "Kamola Yo'ldosheva",
    "Rustam Qodirov",
    "Lola Maxmudova",
    "Aziz Bekmurodov",
    "Sabina Toshmatova",
    "Murod Eshonov",
    "Gulnora Abdullayeva",
    "Doniyor Saidov",
    "Malika Po'latova",
  ];
  const branchIds = defaultBranches.map((b) => b.id);
  const statuses: Reservation["status"][] = [
    "yangi",
    "tasdiqlangan",
    "tasdiqlangan",
    "bekor",
  ];
  const now = Date.now();
  return names.map((n, i) => {
    const d = new Date(now + (i - 5) * 86400000);
    return {
      id: "BR" + (100100 + i),
      name: n,
      phone:
        "+998 " +
        (90 + (i % 9)) +
        " " +
        String(100 + i * 7).slice(0, 3) +
        " " +
        String(10 + i).padStart(2, "0") +
        " " +
        String(20 + i).padStart(2, "0"),
      date: d.toISOString().slice(0, 10),
      time: ["18:00", "19:30", "20:00", "21:00", "13:00"][i % 5],
      guests: 2 + (i % 8),
      branchId: branchIds[i % branchIds.length],
      note: i % 4 === 0 ? "Tug'ilgan kun" : "",
      status: statuses[i % statuses.length],
      createdAt: now - i * 3600_000,
    };
  });
}
