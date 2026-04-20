// Simple localStorage-backed store for reservations & menu admin
import { dishes as defaultDishes, branches as defaultBranches, Dish } from "@/data/menu";

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string; // yyyy-mm-dd
  time: string;
  guests: number;
  branchId: string;
  note?: string;
  preorder?: string[]; // dish ids
  status: "yangi" | "tasdiqlangan" | "bekor";
  createdAt: number;
};

const RES_KEY = "kuddus.reservations";
const DISH_KEY = "kuddus.dishes";

export function getReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(RES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // seed demo
  const seed = seedReservations();
  localStorage.setItem(RES_KEY, JSON.stringify(seed));
  return seed;
}

export function saveReservation(r: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
  const all = getReservations();
  const full: Reservation = {
    ...r,
    id: "BR" + Math.floor(100000 + Math.random() * 900000),
    createdAt: Date.now(),
    status: "yangi",
  };
  all.unshift(full);
  localStorage.setItem(RES_KEY, JSON.stringify(all));
  return full;
}

export function updateReservation(id: string, patch: Partial<Reservation>) {
  const all = getReservations().map((r) => (r.id === id ? { ...r, ...patch } : r));
  localStorage.setItem(RES_KEY, JSON.stringify(all));
  return all;
}

export function deleteReservation(id: string) {
  const all = getReservations().filter((r) => r.id !== id);
  localStorage.setItem(RES_KEY, JSON.stringify(all));
  return all;
}

export function getDishes(): Dish[] {
  try {
    const raw = localStorage.getItem(DISH_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(DISH_KEY, JSON.stringify(defaultDishes));
  return defaultDishes;
}

export function saveDishes(d: Dish[]) {
  localStorage.setItem(DISH_KEY, JSON.stringify(d));
}

function seedReservations(): Reservation[] {
  const names = ["Bobur Karimov", "Madina Yusupova", "Sanjar Aliyev", "Nigora Tursunova", "Akmal Ergashev",
    "Zulfiya Saidova", "Jasur Rahimov", "Dilnoza Xolmatova", "Otabek Nazarov", "Shahzoda Mirzayeva",
    "Farruh Tojiev", "Kamola Yo'ldosheva", "Rustam Qodirov", "Lola Maxmudova", "Aziz Bekmurodov",
    "Sabina Toshmatova", "Murod Eshonov", "Gulnora Abdullayeva", "Doniyor Saidov", "Malika Po'latova"];
  const branchIds = defaultBranches.map((b) => b.id);
  const statuses: Reservation["status"][] = ["yangi", "tasdiqlangan", "tasdiqlangan", "bekor"];
  const now = Date.now();
  return names.map((n, i) => {
    const d = new Date(now + (i - 5) * 86400000);
    return {
      id: "BR" + (100100 + i),
      name: n,
      phone: "+998 " + (90 + (i % 9)) + " " + String(100 + i * 7).slice(0, 3) + " " + String(10 + i).padStart(2, "0") + " " + String(20 + i).padStart(2, "0"),
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
