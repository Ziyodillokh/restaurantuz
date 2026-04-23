export type Dish = {
  id: string;
  name: string;
  weight?: string;
  price: number;
  desc: string;
  image: string;
  category:
    | "palov"
    | "kabob"
    | "milliy"
    | "shorva"
    | "salat"
    | "non"
    | "ichimlik"
    | "shirinlik";
  badge?: "chef" | "new" | "spicy" | "signature";
};

export type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  coords: [number, number];
  image: string;
};

/* Authentic Uzbek menu — wide variety, no steak focus.
   Images chosen from Unsplash for the closest visual match. */
export const dishes: Dish[] = [
  // ───────── PALOV (rice / pilaf) ─────────
  {
    id: "toy-palov",
    name: "To'y palov",
    weight: "450g",
    price: 75000,
    category: "palov",
    badge: "signature",
    desc: "Toshkent uslubidagi an'anaviy to'y oshi — qo'y go'shti, sariq sabzi va devzira guruchi.",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "samarqand-palov",
    name: "Samarqand palovi",
    weight: "450g",
    price: 72000,
    category: "palov",
    badge: "chef",
    desc: "Qatlam-qatlam tortib uzatiladigan asl Samarqand uslubi, mol go'shti va ko'k mosh bilan.",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "buxoro-palov",
    name: "Buxoro oshi",
    weight: "450g",
    price: 78000,
    category: "palov",
    desc: "Mayiz, no'xat va zarchava bilan, nafis va shirin Buxoro uslubi.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qovurma-palov",
    name: "Qovurma palov",
    weight: "420g",
    price: 68000,
    category: "palov",
    desc: "Qovurilgan go'sht va sabzili klassik uy oshi.",
    image: "https://images.unsplash.com/photo-1604908554049-29bbf94f7d68?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── KABOBLAR ─────────
  {
    id: "qoy-kabob",
    name: "Qo'y kabob",
    weight: "2 sixcha",
    price: 65000,
    category: "kabob",
    badge: "signature",
    desc: "Ko'mirda pishirilgan yumshoq qo'y kaboblari, piyoz va sumak bilan.",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tovuq-kabob",
    name: "Tovuq kabob",
    weight: "2 sixcha",
    price: 55000,
    category: "kabob",
    desc: "Marinadda muzlatilgan tovuq filey, limon va achchiq qalampir bilan.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qiyma-kabob",
    name: "Qiyma kabob (lyula)",
    weight: "2 sixcha",
    price: 58000,
    category: "kabob",
    badge: "chef",
    desc: "Ziravorlar bilan qorishtirilgan qo'y qiymasi — chuqur ta'm, hidli tutun.",
    image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "jigar-kabob",
    name: "Jigar kabob",
    weight: "2 sixcha",
    price: 60000,
    category: "kabob",
    desc: "Bug'doy yog'ida o'rab pishirilgan mol jigari, ichida suvli, tashida qarsildoq.",
    image: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qovurga",
    name: "Qovurg'a kabob",
    weight: "350g",
    price: 95000,
    category: "kabob",
    badge: "spicy",
    desc: "Qo'y qovurg'asi — sekin pishirilgan, ziravorlangan, suyak ustida.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "baliq-kabob",
    name: "Baliq kabob",
    weight: "300g",
    price: 85000,
    category: "kabob",
    desc: "Ko'mirda pishirilgan oqcha baliq, limon va ko'katlar bilan.",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── MILLIY TAOMLAR ─────────
  {
    id: "manti",
    name: "Manti",
    weight: "5 dona",
    price: 48000,
    category: "milliy",
    badge: "signature",
    desc: "Bug'da pishirilgan, qo'y go'shti va piyoz bilan to'ldirilgan klassika.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "chuchvara",
    name: "Chuchvara",
    weight: "1 porsiya",
    price: 38000,
    category: "milliy",
    desc: "Qaynoq sho'rvada, mayda tutilgan chuchvaralar — uy ta'mi.",
    image: "https://images.unsplash.com/photo-1547308283-b941ed8d1080?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "somsa-tandir",
    name: "Tandir somsa",
    weight: "1 dona",
    price: 18000,
    category: "milliy",
    badge: "chef",
    desc: "Tandirda pishirilgan, qo'y go'shti va dumba yog'i bilan.",
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qovoq-somsa",
    name: "Qovoq somsa",
    weight: "1 dona",
    price: 14000,
    category: "milliy",
    desc: "Shirin qovoq va piyoz bilan, mayda samarqand uslubi.",
    image: "https://images.unsplash.com/photo-1601979031925-9e2bc1f3f8ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "norin",
    name: "Norin",
    weight: "350g",
    price: 65000,
    category: "milliy",
    desc: "Qo'l xamiridan kesilgan ingichka un, qaynatilgan go'sht va piyoz bilan.",
    image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lagman-uyguir",
    name: "Quyma lag'mon",
    weight: "400g",
    price: 55000,
    category: "milliy",
    badge: "spicy",
    desc: "Qo'lda cho'zilgan lag'mon, mol go'shti, qalampir va achchiq qaytarma bilan.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dimlama",
    name: "Dimlama",
    weight: "500g",
    price: 72000,
    category: "milliy",
    desc: "Sabzavot va go'shtning qatlamli dimlanishi — yumshoq, hidli, sokin.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hanim",
    name: "Hanim",
    weight: "350g",
    price: 52000,
    category: "milliy",
    desc: "Yupqa rulet xamir, kartoshka va piyoz bilan — bug'da pishirilgan.",
    image: "https://images.unsplash.com/photo-1625938145744-e380515399b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tuxum-barak",
    name: "Tuxum barak",
    weight: "5 dona",
    price: 42000,
    category: "milliy",
    desc: "Suzma va tuxum bilan to'ldirilgan, qo'lda yopilgan an'anaviy taom.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── SHO'RVALAR ─────────
  {
    id: "mastava",
    name: "Mastava",
    weight: "350ml",
    price: 32000,
    category: "shorva",
    desc: "Guruch, mol go'shti va sabzavotlardan tayyorlangan klassik milliy sho'rva.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "shorva-qoy",
    name: "Qo'y sho'rva",
    weight: "400ml",
    price: 45000,
    category: "shorva",
    badge: "chef",
    desc: "Qo'y go'shti va kartoshka — to'q, tiniq va isituvchi.",
    image: "https://images.unsplash.com/photo-1620703388557-fcd1e7385c81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lagmon-shorva",
    name: "Sho'rli lag'mon",
    weight: "450ml",
    price: 48000,
    category: "shorva",
    desc: "Qaynoq qaytarma sho'rva ichida cho'zilgan lag'mon — uyg'ur uslubi.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "moshxorda",
    name: "Mosh xo'rda",
    weight: "350ml",
    price: 30000,
    category: "shorva",
    desc: "Mosh, guruch va sabzavotlardan tayyorlangan to'yimli sho'rva.",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "norinli-shorva",
    name: "Mampar",
    weight: "400ml",
    price: 42000,
    category: "shorva",
    desc: "Mayda kvadrat xamir parchalari, go'sht va sabzavot bilan.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── SALATLAR ─────────
  {
    id: "achichuk",
    name: "Achchiq-chuchuk",
    weight: "200g",
    price: 22000,
    category: "salat",
    desc: "Yangi pomidor, piyoz va qalampir — palovning klassik hamrohi.",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "andijon",
    name: "Andijon salatasi",
    weight: "220g",
    price: 35000,
    category: "salat",
    badge: "new",
    desc: "Pomidor, bodring, ko'k piyoz va achchiq qalampir — sodda va yangi.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tashkent",
    name: "Toshkent salatasi",
    weight: "240g",
    price: 48000,
    category: "salat",
    badge: "chef",
    desc: "Qaynatilgan til, qovurilgan piyoz va xitoy karam aralashmasi.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "olivye",
    name: "Olivye",
    weight: "230g",
    price: 38000,
    category: "salat",
    desc: "An'anaviy retsept bo'yicha kolbasa, kartoshka va sabzi bilan.",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vinegret",
    name: "Vinegret",
    weight: "230g",
    price: 32000,
    category: "salat",
    desc: "Lavlagi, kartoshka, sabzi va tuzlangan bodring — uy uslubida.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yaponcha",
    name: "Yaponcha salat",
    weight: "240g",
    price: 52000,
    category: "salat",
    desc: "Tovuq, qo'ziqorin, sariq pishloq va majonez bilan.",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── NON & PATIR ─────────
  {
    id: "obi-non",
    name: "Obi non",
    weight: "1 dona",
    price: 8000,
    category: "non",
    badge: "signature",
    desc: "Tandir oloviga yopiladigan an'anaviy oq non.",
    image: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "patir",
    name: "Patir non",
    weight: "1 dona",
    price: 12000,
    category: "non",
    desc: "Sariyog' va sutda qorilgan, qatlamli — sof Buxoro patiri.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qatlama",
    name: "Qatlama",
    weight: "1 dona",
    price: 15000,
    category: "non",
    desc: "Qatlam-qatlam yog'li xamir — non bilan shirinlik orasi.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kulcha",
    name: "Kulcha",
    weight: "1 dona",
    price: 10000,
    category: "non",
    desc: "Mayda, qalin chetli — choy va palov uchun ideal.",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── ICHIMLIKLAR ─────────
  {
    id: "kok-choy",
    name: "Ko'k choy",
    weight: "choynak",
    price: 15000,
    category: "ichimlik",
    badge: "signature",
    desc: "Toza yashil choy — har bir suhbatning poydevori.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "qora-choy",
    name: "Qora choy",
    weight: "choynak",
    price: 15000,
    category: "ichimlik",
    desc: "Qaymoqli, bo'yali — qish kunlari uchun.",
    image: "https://images.unsplash.com/photo-1597318236503-94b04d68b39d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ayron",
    name: "Ayron",
    weight: "300ml",
    price: 18000,
    category: "ichimlik",
    desc: "Sovuq qatiq ichimligi — palovga eng yaxshi hamroh.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kompot",
    name: "Kompot",
    weight: "300ml",
    price: 16000,
    category: "ichimlik",
    desc: "Mavsumiy mevalardan uy uslubidagi sovuq kompot.",
    image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fresh",
    name: "Yangi siqilgan sharbat",
    weight: "300ml",
    price: 32000,
    category: "ichimlik",
    badge: "new",
    desc: "Apelsin, sabzi, anor — mavsumga qarab.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "limonad",
    name: "Uy limonadi",
    weight: "400ml",
    price: 28000,
    category: "ichimlik",
    desc: "Yangi limon, na'matak va asal bilan.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "espresso",
    name: "Espresso",
    weight: "60ml",
    price: 25000,
    category: "ichimlik",
    desc: "To'q, nafis italyan uslubidagi qahva.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1200&q=80",
  },

  // ───────── SHIRINLIKLAR ─────────
  {
    id: "chak-chak",
    name: "Chak-chak",
    weight: "200g",
    price: 38000,
    category: "shirinlik",
    badge: "signature",
    desc: "Asalga botirilgan mayda xamir — to'y dasturxonidan.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "halva",
    name: "Tahin halvosi",
    weight: "150g",
    price: 32000,
    category: "shirinlik",
    desc: "Kunjut va asaldan an'anaviy uslubda.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "navvot",
    name: "Navvot va parvarda",
    weight: "200g",
    price: 28000,
    category: "shirinlik",
    desc: "Choy yonida — qadimiy o'zbek tahliliy shirinligi.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "muzqaymoq",
    name: "Sutli muzqaymoq",
    weight: "150g",
    price: 35000,
    category: "shirinlik",
    desc: "Uy retsepti — vanil, fistadan tanlov.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "meva-tarelka",
    name: "Mevali laganda",
    weight: "500g",
    price: 65000,
    category: "shirinlik",
    badge: "chef",
    desc: "Mavsumiy mevalar to'plami — qovun, tarvuz, uzum, anor.",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80",
  },
];

export const branches: Branch[] = [
  {
    id: "yunusobod",
    name: "Imron Yunusobod",
    city: "Toshkent",
    address: "Amir Temur ko'chasi, 107",
    phone: "+998 71 200 14 14",
    coords: [41.3614, 69.2873],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "chilonzor",
    name: "Imron Chilonzor",
    city: "Toshkent",
    address: "Bunyodkor shoh ko'chasi, 12",
    phone: "+998 71 200 14 15",
    coords: [41.2825, 69.2042],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "samarkand",
    name: "Imron Samarqand",
    city: "Samarqand",
    address: "Registon ko'chasi, 45",
    phone: "+998 66 233 14 14",
    coords: [39.6542, 66.9597],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "buxoro",
    name: "Imron Buxoro",
    city: "Buxoro",
    address: "Mustaqillik ko'chasi, 23",
    phone: "+998 65 222 14 14",
    coords: [39.7681, 64.4556],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  },
];

export const formatSom = (n: number) =>
  n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
