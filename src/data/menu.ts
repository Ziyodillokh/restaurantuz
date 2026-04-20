export type Dish = {
  id: string;
  name: string;
  weight?: string;
  price: number;
  desc: string;
  image: string;
  category:
    | "starter"
    | "salad"
    | "soup"
    | "premium"
    | "classic"
    | "burger"
    | "garnish"
    | "sauce"
    | "drink"
    | "dessert";
  badge?: "chef" | "new" | "spicy" | "signature";
};

export const dishes: Dish[] = [
  // ───────── STARTERS ─────────
  { id: "carpaccio", name: "Beef Carpaccio", weight: "120g", price: 95000, category: "starter", badge: "chef",
    desc: "Yupqa kesilgan xom mol go'shti, ruccola va parmezan bilan.",
    image: "https://images.unsplash.com/photo-1625937329935-287441889369?auto=format&fit=crop&w=900&q=80" },
  { id: "tartare", name: "Steak Tartare", weight: "150g", price: 135000, category: "starter", badge: "signature",
    desc: "Qo'lda chopilgan filey, kapers va bedana tuxumi sarig'i bilan.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=900&q=80" },
  { id: "bruschetta", name: "Truffle Bruschetta", weight: "180g", price: 75000, category: "starter",
    desc: "Qarsillagan non, trufel kremi va mavsumiy qo'ziqorinlar.",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80" },
  { id: "shrimp", name: "Garlic Butter Shrimp", weight: "200g", price: 145000, category: "starter", badge: "spicy",
    desc: "Sariyog'da qovurilgan yirik qisqichbaqalar, sarimsoq va chili.",
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?auto=format&fit=crop&w=900&q=80" },

  // ───────── SOUPS ─────────
  { id: "oxtail", name: "Oxtail Consommé", weight: "350ml", price: 85000, category: "soup", badge: "chef",
    desc: "12 soat qaynatilgan, tiniq va boy ta'mli mol dumi sho'rvasi.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" },
  { id: "mushroom-soup", name: "Wild Mushroom Cream", weight: "300ml", price: 65000, category: "soup",
    desc: "Yovvoyi qo'ziqorinlar va trufel yog'i bilan kremli sho'rva.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80" },
  { id: "tomato-soup", name: "Roasted Tomato Bisque", weight: "300ml", price: 55000, category: "soup",
    desc: "Olovda qovurilgan pomidor, rayhon va qaymoq.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80" },
  { id: "french-onion", name: "French Onion", weight: "350ml", price: 70000, category: "soup",
    desc: "Karamellangan piyoz, gruyere pishloq va qarsildoq grenkalar.",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=80" },

  // ───────── SALADS ─────────
  { id: "caesar", name: "Caesar with Grilled Beef", weight: "280g", price: 95000, category: "salad",
    desc: "Klassik Caesar, ustida nozik kesilgan grill mol go'shti bilan.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80" },
  { id: "burrata", name: "Burrata & Heirloom", weight: "250g", price: 110000, category: "salad", badge: "new",
    desc: "Italyan burrata pishlog'i, rangli pomidorlar va pesto.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80" },
  { id: "beetroot", name: "Beetroot & Goat Cheese", weight: "240g", price: 75000, category: "salad",
    desc: "Pechda pishirilgan lavlagi, echki pishlog'i va yong'oq.",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=900&q=80" },
  { id: "tuna-salad", name: "Seared Tuna Niçoise", weight: "260g", price: 125000, category: "salad", badge: "chef",
    desc: "Yengil qovurilgan tuna, zaytun, kartoshka va loviya.",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=900&q=80" },

  // ───────── PREMIUM STEAKS ─────────
  { id: "ribeye", name: "Ribeye Steyk", weight: "350g", price: 290000, category: "premium", badge: "signature",
    desc: "Marmar naqshli, suvli va yumshoq. Mijozlarimiz tanlovi.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80" },
  { id: "tomahawk", name: "Tomahawk", weight: "1200g", price: 890000, category: "premium", badge: "chef",
    desc: "Ulkan, ta'sirli, ikki kishiga. Haqiqiy steyk festivali.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80" },
  { id: "filet", name: "Filet Mignon", weight: "250g", price: 340000, category: "premium",
    desc: "Eng yumshoq qism. Pichoqsiz kesiladi.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
  { id: "wagyu", name: "Wagyu A5", weight: "200g", price: 1250000, category: "premium", badge: "signature",
    desc: "Yaponiyaning eng yuqori darajali Wagyu — og'izda eriydi.",
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=900&q=80" },
  { id: "dryaged", name: "Dry-Aged Ribeye", weight: "400g", price: 420000, category: "premium", badge: "chef",
    desc: "45 kun quruq yetiltirilgan, chuqur va to'q ta'm.",
    image: "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?auto=format&fit=crop&w=900&q=80" },

  // ───────── CLASSIC STEAKS ─────────
  { id: "tbone", name: "T-Bone", weight: "500g", price: 380000, category: "classic",
    desc: "Ikki ta'm bir bo'lakda — strip va filet.",
    image: "https://images.unsplash.com/photo-1607116176123-1313a988b48f?auto=format&fit=crop&w=900&q=80" },
  { id: "ny-strip", name: "New York Strip", weight: "300g", price: 260000, category: "classic",
    desc: "Klassik nyu-york uslubi, qattiq qovurilgan qobiq.",
    image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?auto=format&fit=crop&w=900&q=80" },
  { id: "picanha", name: "Picanha", weight: "350g", price: 230000, category: "classic", badge: "new",
    desc: "Braziliya uslubidagi premium qovurilma.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80" },
  { id: "sirloin", name: "Sirloin", weight: "300g", price: 210000, category: "classic",
    desc: "Mutanosib yumshoqlik va boy ta'm.",
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=900&q=80" },
  { id: "flank", name: "Flank Steak", weight: "320g", price: 195000, category: "classic",
    desc: "Tolali, ta'mli — chimichurri sousi bilan ajoyib.",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=900&q=80" },
  { id: "skirt", name: "Skirt Steak", weight: "280g", price: 185000, category: "classic", badge: "spicy",
    desc: "Tezda qovuriladi, marinadda boy.",
    image: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?auto=format&fit=crop&w=900&q=80" },

  // ───────── BURGERS ─────────
  { id: "kuddus-burger", name: "Kuddus Signature Burger", weight: "380g", price: 125000, category: "burger", badge: "signature",
    desc: "Ikki qatlam Wagyu kotleti, cheddar, karamellangan piyoz.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { id: "truffle-burger", name: "Truffle Mushroom Burger", weight: "340g", price: 115000, category: "burger",
    desc: "Trufel mayonez, qovurilgan qo'ziqorin va gruyere.",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80" },
  { id: "smash", name: "Double Smash Burger", weight: "320g", price: 95000, category: "burger",
    desc: "Klassik Amerika uslubi, qattiq kuyikkan qirralar.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80" },

  // ───────── GARNISHES ─────────
  { id: "truffle", name: "Truffle Fries", price: 45000, category: "garnish", badge: "chef",
    desc: "Trufel yog'i va parmezan bilan.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80" },
  { id: "fries", name: "Qovurilgan kartoshka", price: 28000, category: "garnish",
    desc: "Tilla rangli, qarsillagan.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80" },
  { id: "veg", name: "Grill sabzavotlar", price: 55000, category: "garnish",
    desc: "Olovda pishirilgan mavsumiy sabzavotlar.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80" },
  { id: "rice", name: "Sarimsoqli guruch", price: 35000, category: "garnish",
    desc: "Yumshoq, hidli, sariyog'da.",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=900&q=80" },
  { id: "mash", name: "Truffle Mashed Potato", price: 48000, category: "garnish",
    desc: "Kremli kartoshka pyure, trufel yog'i bilan.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80" },
  { id: "asparagus", name: "Grilled Asparagus", price: 52000, category: "garnish",
    desc: "Ko'mirda pishirilgan, limon va zaytun yog'i bilan.",
    image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=900&q=80" },
  { id: "spinach", name: "Creamed Spinach", price: 42000, category: "garnish",
    desc: "Kremli ismaloq, mushkat yong'og'i hidi bilan.",
    image: "https://images.unsplash.com/photo-1604908554007-2a737a0b5c3a?auto=format&fit=crop&w=900&q=80" },
  { id: "mac", name: "Truffle Mac & Cheese", price: 58000, category: "garnish", badge: "new",
    desc: "Uch xil pishloq va trufel bilan makaron.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80" },

  // ───────── SAUCES ─────────
  { id: "pepper", name: "Pepper Sous", price: 15000, category: "sauce", desc: "Qora murchli, kremli.", image: "" },
  { id: "chimi", name: "Chimichurri", price: 15000, category: "sauce", desc: "Argentinaning klassik sousi.", image: "" },
  { id: "blue", name: "Blue Cheese", price: 15000, category: "sauce", desc: "Boy, yog'li, pishloq asosida.", image: "" },
  { id: "mush", name: "Mushroom", price: 15000, category: "sauce", desc: "Yovvoyi qo'ziqorinlar bilan.", image: "" },
  { id: "bearnaise", name: "Béarnaise", price: 18000, category: "sauce", desc: "Tarxun va sariyog' asosida fransuz klassikasi.", image: "" },
  { id: "bbq", name: "Smoky BBQ", price: 15000, category: "sauce", desc: "Tutun ta'mli, shirin va achchiq.", image: "" },

  // ───────── DRINKS ─────────
  { id: "fresh", name: "Fresh Juice", price: 35000, category: "drink",
    desc: "Yangi siqilgan, mavsumiy mevalardan.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80" },
  { id: "mock", name: "Signature Mocktail", price: 45000, category: "drink", badge: "signature",
    desc: "Spirtsiz signature kokteyllar.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80" },
  { id: "mors", name: "Mors", price: 25000, category: "drink", desc: "An'anaviy meva ichimligi.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80" },
  { id: "compote", name: "Kompot", price: 22000, category: "drink", desc: "Uy uslubidagi sovuq kompot.",
    image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=900&q=80" },
  { id: "espresso", name: "Espresso", price: 28000, category: "drink", desc: "To'q, italyan uslubidagi qahva.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80" },
  { id: "latte", name: "Vanilla Latte", price: 38000, category: "drink", desc: "Kremli sut va vanil hidi.",
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=900&q=80" },

  // ───────── DESSERTS ─────────
  { id: "fondant", name: "Chocolate Fondant", price: 65000, category: "dessert", badge: "chef",
    desc: "Ichida oqayotgan shokolad bilan.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80" },
  { id: "tira", name: "Tiramisu", price: 60000, category: "dessert",
    desc: "Klassik italyan retsepti.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80" },
  { id: "cheese", name: "Cheesecake", price: 55000, category: "dessert",
    desc: "Nyu-york uslubida, rezavor sousi bilan.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80" },
  { id: "creme", name: "Crème Brûlée", price: 58000, category: "dessert", badge: "signature",
    desc: "Karamellangan shakar qobig'i, vanil kremi.",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80" },
  { id: "icecream", name: "Vanilla Bean Ice Cream", price: 42000, category: "dessert",
    desc: "Uy muzqaymog'i, qaynoq karamel bilan.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80" },
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
