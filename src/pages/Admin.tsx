import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Flame, Home, Calendar, Utensils, ListOrdered, Building2, BarChart3, Settings, LogOut, Lock, Check, X, Trash2, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Reservation, getReservations, updateReservation, deleteReservation, getDishes, saveDishes } from "@/lib/store";
import { branches, formatSom, Dish } from "@/data/menu";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AUTH_KEY = "kuddus.admin.auth";

function useAuth() {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const login = (u: string, p: string) => {
    if (u === "admin" && p === "kuddus2014") {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); };
  return { authed, login, logout };
}

export default function Admin() {
  const { authed, login, logout } = useAuth();
  if (!authed) return <Login onLogin={login} />;
  return <Shell onLogout={logout} />;
}

function Login({ onLogin }: { onLogin: (u: string, p: string) => boolean }) {
  const [u, setU] = useState("admin");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(u, p)) setErr("Noto'g'ri login yoki parol");
  };
  return (
    <div className="min-h-screen grid place-items-center bg-background relative overflow-hidden p-6">
      <div className="absolute inset-0 opacity-30">
        <img src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=80" className="h-full w-full object-cover blur-md" alt="" />
      </div>
      <motion.form
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="relative glass-dark p-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Flame className="h-7 w-7 text-primary" />
          <div>
            <div className="font-display text-2xl text-cream">KUDDUS<span className="text-primary"> STEAK</span></div>
            <div className="text-[10px] tracking-[0.3em] text-gold">ADMIN PANEL</div>
          </div>
        </Link>
        <div className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Login</label>
            <input value={u} onChange={(e) => setU(e.target.value)} className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Parol</label>
            <input type="password" value={p} onChange={(e) => setP(e.target.value)} className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary" />
          </div>
          {err && <div className="text-destructive text-sm">{err}</div>}
          <button className="w-full py-4 bg-primary text-cream uppercase tracking-[0.3em] text-xs hover:bg-ember hover:shadow-ember transition-all flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> Kirish
          </button>
          <p className="text-xs text-cream/40 text-center">Demo: admin / kuddus2014</p>
        </div>
      </motion.form>
    </div>
  );
}

const navItems = [
  { to: "/admin", label: "Bosh sahifa", icon: Home, end: true },
  { to: "/admin/bronlar", label: "Bronlar", icon: Calendar },
  { to: "/admin/buyurtmalar", label: "Buyurtmalar", icon: ListOrdered },
  { to: "/admin/menyu", label: "Menyu", icon: Utensils },
  { to: "/admin/filiallar", label: "Filiallar", icon: Building2 },
  { to: "/admin/statistika", label: "Statistika", icon: BarChart3 },
  { to: "/admin/sozlamalar", label: "Sozlamalar", icon: Settings },
];

function Shell({ onLogout }: { onLogout: () => void }) {
  const loc = useLocation();
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex bg-background text-cream">
      <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
        <Link to="/" className="flex items-center gap-2 p-6 border-b border-sidebar-border">
          <Flame className="h-6 w-6 text-primary" />
          <div className="leading-tight">
            <div className="font-display text-lg text-cream">KUDDUS<span className="text-primary"> STEAK</span></div>
            <div className="text-[9px] tracking-[0.3em] text-gold">ADMIN</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => {
            const active = it.end ? loc.pathname === it.to : loc.pathname.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to}
                className={cn("flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors",
                  active ? "bg-primary/15 text-primary border-l-2 border-primary" : "text-cream/70 hover:bg-sidebar-accent hover:text-cream")}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => { onLogout(); nav("/"); }} className="m-3 px-4 py-3 text-sm flex items-center gap-3 text-cream/70 hover:bg-sidebar-accent rounded">
          <LogOut className="h-4 w-4" /> Chiqish
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="bronlar" element={<Bookings />} />
          <Route path="buyurtmalar" element={<Orders />} />
          <Route path="menyu" element={<MenuAdmin />} />
          <Route path="filiallar" element={<BranchesAdmin />} />
          <Route path="statistika" element={<Stats />} />
          <Route path="sozlamalar" element={<Sett />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
}

function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-8 pt-8 pb-4 border-b border-border">
      <div className="text-gold text-[10px] tracking-[0.4em]">— ADMIN</div>
      <h1 className="font-display text-3xl text-cream mt-1">{title}</h1>
      {sub && <p className="text-cream/60 text-sm mt-1">{sub}</p>}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("p-6 border", accent ? "border-primary/40 bg-primary/5" : "border-border bg-card")}>
      <div className="text-[10px] tracking-[0.3em] text-cream/60 uppercase">{label}</div>
      <div className={cn("font-accent text-4xl mt-3", accent ? "text-primary" : "text-cream")}>{value}</div>
    </div>
  );
}

function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => setReservations(getReservations()), []);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = reservations.filter((r) => r.date === today).length;
  const pending = reservations.filter((r) => r.status === "yangi").length;
  const revenue = reservations.filter((r) => r.status === "tasdiqlangan").length * 750000;

  // chart
  const chart = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
    return { day: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"][new Date(d).getDay()], bron: reservations.filter((r) => r.date === d).length || Math.floor(Math.random() * 15) + 5 };
  });

  return (
    <>
      <PageHeader title="Bosh sahifa" sub="Bugungi faoliyat ko'rinishi" />
      <div className="p-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Stat label="Bugungi bronlar" value={String(todayCount || 24)} accent />
          <Stat label="Kutilayotgan" value={String(pending)} />
          <Stat label="Bugungi tushum" value={formatSom(revenue || 12450000)} />
          <Stat label="Band stollar" value="16/40" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-border bg-card p-6">
            <h3 className="font-display text-xl text-cream mb-1">Haftalik bronlar</h3>
            <p className="text-xs text-cream/50 mb-4">Oxirgi 7 kun</p>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={chart}>
                  <CartesianGrid stroke="hsl(0 0% 15%)" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(0 0% 50%)" fontSize={12} />
                  <YAxis stroke="hsl(0 0% 50%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)" }} />
                  <Line type="monotone" dataKey="bron" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="font-display text-xl text-cream mb-4">Oxirgi faoliyat</h3>
            <ul className="space-y-3 text-sm">
              {reservations.slice(0, 8).map((r) => (
                <li key={r.id} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                  <div>
                    <div className="text-cream">{r.name}</div>
                    <div className="text-xs text-cream/50">{r.date} · {r.time}</div>
                  </div>
                  <StatusBadge s={r.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ s }: { s: Reservation["status"] }) {
  const map = {
    yangi: "bg-gold/15 text-gold border-gold/40",
    tasdiqlangan: "bg-primary/15 text-primary border-primary/40",
    bekor: "bg-muted text-cream/50 border-border",
  };
  const label = { yangi: "Yangi", tasdiqlangan: "Tasdiqlangan", bekor: "Bekor qilingan" };
  return <span className={cn("text-[10px] uppercase tracking-[0.2em] border px-2 py-1", map[s])}>{label[s]}</span>;
}

function Bookings() {
  const [list, setList] = useState<Reservation[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [branch, setBranch] = useState<string>("all");
  useEffect(() => setList(getReservations()), []);

  const filtered = list.filter((r) =>
    (status === "all" || r.status === status) &&
    (branch === "all" || r.branchId === branch) &&
    (q === "" || r.name.toLowerCase().includes(q.toLowerCase()) || r.phone.includes(q))
  );

  const setS = (id: string, s: Reservation["status"]) => {
    setList(updateReservation(id, { status: s }));
    toast.success("Status yangilandi");
  };
  const del = (id: string) => {
    setList(deleteReservation(id));
    toast.success("O'chirildi");
  };

  return (
    <>
      <PageHeader title="Bronlar" sub={`Jami: ${list.length}`} />
      <div className="p-8 space-y-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ism yoki telefon..." className="w-full bg-input border border-border text-cream pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary text-sm" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-input border border-border text-cream px-4 py-2.5 text-sm">
            <option value="all">Barcha statuslar</option>
            <option value="yangi">Yangi</option>
            <option value="tasdiqlangan">Tasdiqlangan</option>
            <option value="bekor">Bekor</option>
          </select>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="bg-input border border-border text-cream px-4 py-2.5 text-sm">
            <option value="all">Barcha filiallar</option>
            {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-cream/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Mijoz</th>
                <th className="text-left p-3 hidden md:table-cell">Telefon</th>
                <th className="text-left p-3">Sana</th>
                <th className="text-left p-3 hidden lg:table-cell">Filial</th>
                <th className="text-left p-3">Mehmon</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                  <td className="p-3">
                    <div className="text-cream">{r.name}</div>
                    <div className="text-xs text-cream/50">{r.id}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-cream/70">{r.phone}</td>
                  <td className="p-3 text-cream/80">{r.date}<div className="text-xs text-cream/50">{r.time}</div></td>
                  <td className="p-3 hidden lg:table-cell text-cream/70">{branches.find((b) => b.id === r.branchId)?.name}</td>
                  <td className="p-3 text-cream font-accent">{r.guests}</td>
                  <td className="p-3"><StatusBadge s={r.status} /></td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setS(r.id, "tasdiqlangan")} className="h-8 w-8 grid place-items-center hover:bg-primary/15 hover:text-primary" title="Tasdiqlash"><Check className="h-4 w-4" /></button>
                      <button onClick={() => setS(r.id, "bekor")} className="h-8 w-8 grid place-items-center hover:bg-destructive/15 hover:text-destructive" title="Bekor"><X className="h-4 w-4" /></button>
                      <button onClick={() => del(r.id)} className="h-8 w-8 grid place-items-center hover:bg-destructive/15 hover:text-destructive" title="O'chirish"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-cream/50">Hech narsa topilmadi</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Orders() {
  const tables = Array.from({ length: 24 }, (_, i) => ({
    n: i + 1,
    state: (["bo'sh", "band", "kutmoqda", "xizmat"] as const)[(i * 7) % 4],
  }));
  const stateClass = {
    "bo'sh": "border-border text-cream/40",
    "band": "border-primary/60 bg-primary/15 text-primary",
    "kutmoqda": "border-gold/60 bg-gold/15 text-gold",
    "xizmat": "border-ember/60 bg-ember/15 text-ember",
  };
  return (
    <>
      <PageHeader title="Buyurtmalar" sub="Restoran zal ko'rinishi" />
      <div className="p-8">
        <div className="flex gap-4 mb-6 text-xs">
          {(Object.keys(stateClass) as Array<keyof typeof stateClass>).map((k) => (
            <div key={k} className={cn("px-3 py-1.5 border uppercase tracking-wider", stateClass[k])}>{k}</div>
          ))}
        </div>
        <div className="border border-border bg-card p-6 md:p-10">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {tables.map((t) => (
              <button key={t.n} className={cn("aspect-square border-2 grid place-items-center font-accent text-2xl transition-all hover:scale-105", stateClass[t.state])}>
                {t.n}
              </button>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-cream/60">Stol holatini ko'rish va boshqarish uchun bosing</div>
        </div>
      </div>
    </>
  );
}

function MenuAdmin() {
  const [list, setList] = useState<Dish[]>([]);
  useEffect(() => setList(getDishes()), []);
  const update = (id: string, patch: Partial<Dish>) => {
    const next = list.map((d) => d.id === id ? { ...d, ...patch } : d);
    setList(next); saveDishes(next);
  };
  const del = (id: string) => {
    const next = list.filter((d) => d.id !== id);
    setList(next); saveDishes(next); toast.success("Taom o'chirildi");
  };
  const add = () => {
    const d: Dish = { id: "new" + Date.now(), name: "Yangi taom", price: 100000, desc: "Ta'rif...", category: "premium", image: "", weight: "300g" };
    const next = [d, ...list];
    setList(next); saveDishes(next);
  };
  return (
    <>
      <PageHeader title="Menyu boshqaruvi" sub={`${list.length} ta taom`} />
      <div className="p-8 space-y-5">
        <button onClick={add} className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-ember">
          <Plus className="h-4 w-4" /> Yangi qo'shish
        </button>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.map((d) => (
            <div key={d.id} className="border border-border bg-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <input value={d.name} onChange={(e) => update(d.id, { name: e.target.value })}
                  className="font-display text-xl bg-transparent text-cream focus:outline-none focus:border-b focus:border-primary flex-1" />
                <button onClick={() => del(d.id)} className="text-cream/40 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
              <textarea value={d.desc} onChange={(e) => update(d.id, { desc: e.target.value })}
                rows={2} className="w-full text-sm bg-input border border-border text-cream/80 px-3 py-2 focus:outline-none focus:border-primary resize-none" />
              <div className="grid grid-cols-3 gap-2">
                <input value={d.weight || ""} onChange={(e) => update(d.id, { weight: e.target.value })} placeholder="Vazn" className="bg-input border border-border text-cream px-3 py-2 text-sm" />
                <input value={d.price} type="number" onChange={(e) => update(d.id, { price: Number(e.target.value) })} className="bg-input border border-border text-cream px-3 py-2 text-sm font-accent" />
                <select value={d.category} onChange={(e) => update(d.id, { category: e.target.value as Dish["category"] })} className="bg-input border border-border text-cream px-2 py-2 text-sm">
                  <option value="premium">Premium</option>
                  <option value="classic">Klassik</option>
                  <option value="garnish">Garnir</option>
                  <option value="sauce">Sous</option>
                  <option value="drink">Ichimlik</option>
                  <option value="dessert">Shirinlik</option>
                </select>
              </div>
              <input value={d.image} onChange={(e) => update(d.id, { image: e.target.value })} placeholder="Rasm URL" className="w-full bg-input border border-border text-cream/70 px-3 py-2 text-xs" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BranchesAdmin() {
  return (
    <>
      <PageHeader title="Filiallar" />
      <div className="p-8 grid md:grid-cols-2 gap-5">
        {branches.map((b) => (
          <div key={b.id} className="border border-border bg-card overflow-hidden">
            <img src={b.image} alt={b.name} className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-xl text-cream">{b.name}</h3>
              <div className="text-sm text-cream/60 mt-2">{b.address}</div>
              <div className="text-sm text-gold mt-1">{b.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Stats() {
  const data = Array.from({ length: 12 }, (_, i) => ({ m: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"][i], v: Math.floor(Math.random() * 200) + 100 }));
  return (
    <>
      <PageHeader title="Statistika" sub="Yillik ko'rsatkichlar" />
      <div className="p-8">
        <div className="border border-border bg-card p-6">
          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke="hsl(0 0% 15%)" vertical={false} />
                <XAxis dataKey="m" stroke="hsl(0 0% 50%)" fontSize={12} />
                <YAxis stroke="hsl(0 0% 50%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)" }} />
                <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function Sett() {
  return (
    <>
      <PageHeader title="Sozlamalar" />
      <div className="p-8 max-w-2xl space-y-4">
        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-xl text-cream">Restoran nomi</h3>
          <input defaultValue="Kuddus Steak" className="w-full mt-3 bg-input border border-border text-cream px-3 py-2" />
        </div>
        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-xl text-cream">Ish vaqti</h3>
          <input defaultValue="11:00 — 00:00" className="w-full mt-3 bg-input border border-border text-cream px-3 py-2" />
        </div>
      </div>
    </>
  );
}
