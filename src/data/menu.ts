export type Dish = {
  id: string;
  name: string;
  weight?: string;
  price: number;
  desc: string;
  image: string;
  category: "premium" | "classic" | "garnish" | "sauce" | "drink" | "dessert";
};

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=80`;

export const dishes: Dish[] = [
  // Premium
  { id: "ribeye", name: "Ribeye Steyk", weight: "350g", price: 290000, desc: "Marmar naqshli, suvli va yumshoq. Mijozlarimiz tanlovi.", category: "premium",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80" },
  { id: "tomahawk", name: "Tomahawk", weight: "1200g", price: 890000, desc: "Ulkan, ta'sirli, ikki kishiga. Haqiqiy steyk festivali.", category: "premium",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80" },
  { id: "filet", name: "Filet Mignon", weight: "250g", price: 340000, desc: "Eng yumshoq qism. Pichoqsiz kesiladi.", category: "premium",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },

  // Classic
  { id: "tbone", name: "T-Bone", weight: "500g", price: 380000, desc: "Ikki ta'm bir bo'lakda — strip va filet.", category: "classic",
    image: "https://images.unsplash.com/photo-1607116176123-1313a988b48f?auto=format&fit=crop&w=900&q=80" },
  { id: "ny-strip", name: "New York Strip", weight: "300g", price: 260000, desc: "Klassik nyu-york uslubi, qattiq qovurilgan qobiq.", category: "classic",
    image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?auto=format&fit=crop&w=900&q=80" },
  { id: "picanha", name: "Picanha", weight: "350g", price: 230000, desc: "Braziliya uslubidagi premium qovurilma.", category: "classic",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80" },
  { id: "sirloin", name: "Sirloin", weight: "300g", price: 210000, desc: "Mutanosib yumshoqlik va boy ta'm.", category: "classic",
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=900&q=80" },

  // Garnir
  { id: "truffle", name: "Truffle Fries", price: 45000, desc: "Trufel yog'i va parmezan bilan.", category: "garnish",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80" },
  { id: "fries", name: "Qovurilgan kartoshka", price: 28000, desc: "Tilla rangli, qarsillagan.", category: "garnish",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80" },
  { id: "veg", name: "Grill sabzavotlar", price: 55000, desc: "Olovda pishirilgan mavsumiy sabzavotlar.", category: "garnish",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80" },
  { id: "rice", name: "Sarimsoqli guruch", price: 35000, desc: "Yumshoq, hidli, sariyog'da.", category: "garnish",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=900&q=80" },

  // Sauces
  { id: "pepper", name: "Pepper Sous", price: 15000, desc: "Qora murchli, kremli.", category: "sauce", image: "" },
  { id: "chimi", name: "Chimichurri", price: 15000, desc: "Argentinaning klassik sousi.", category: "sauce", image: "" },
  { id: "blue", name: "Blue Cheese", price: 15000, desc: "Boy, yog'li, pishloq asosida.", category: "sauce", image: "" },
  { id: "mush", name: "Mushroom", price: 15000, desc: "Yovvoyi qo'ziqorinlar bilan.", category: "sauce", image: "" },

  // Drinks
  { id: "fresh", name: "Fresh Juice", price: 35000, desc: "Yangi siqilgan, mavsumiy mevalardan.", category: "drink",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80" },
  { id: "mock", name: "Mocktail", price: 45000, desc: "Spirtsiz signature kokteyllar.", category: "drink",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80" },
  { id: "mors", name: "Mors", price: 25000, desc: "An'anaviy meva ichimligi.", category: "drink", image: "" },
  { id: "compote", name: "Kompot", price: 22000, desc: "Uy uslubidagi sovuq kompot.", category: "drink", image: "" },

  // Dessert
  { id: "fondant", name: "Chocolate Fondant", price: 65000, desc: "Ichida oqayotgan shokolad bilan.", category: "dessert",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80" },
  { id: "tira", name: "Tiramisu", price: 60000, desc: "Klassik italyan retsepti.", category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80" },
  { id: "cheese", name: "Cheesecake", price: 55000, desc: "Nyu-york uslubida, rezavor sousi bilan.", category: "dessert",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80" },
];

export const branches = [
  { id: "yunusobod", name: "Yunusobod filiali", city: "Toshkent", address: "Amir Temur ko'chasi, 107", phone: "+998 71 200 14 14",
    coords: [41.3614, 69.2873] as [number, number],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80" },
  { id: "chilonzor", name: "Chilonzor filiali", city: "Toshkent", address: "Bunyodkor shoh ko'chasi, 12", phone: "+998 71 200 14 15",
    coords: [41.2825, 69.2042] as [number, number],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" },
  { id: "samarkand", name: "Samarqand filiali", city: "Samarqand", address: "Registon ko'chasi, 45", phone: "+998 66 233 14 14",
    coords: [39.6542, 66.9597] as [number, number],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80" },
  { id: "buxoro", name: "Buxoro filiali", city: "Buxoro", address: "Mustaqillik ko'chasi, 23", phone: "+998 65 222 14 14",
    coords: [39.7681, 64.4556] as [number, number],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80" },
];

export const formatSom = (n: number) =>
  n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
