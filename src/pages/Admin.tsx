import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  Crown,
  Home,
  Calendar,
  Utensils,
  ListOrdered,
  Building2,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Lock,
  Check,
  X,
  Trash2,
  Plus,
  Search,
  ImagePlus,
  Save,
  Download,
  Upload,
  RotateCcw,
  Eye,
  EyeOff,
  Users as UsersIcon,
  StickyNote,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Reservation,
  getReservations,
  updateReservation,
  deleteReservation,
  useDishes,
  saveDishes,
  useBranches,
  saveBranches,
  useSettings,
  saveSettings,
  getDishes,
  getBranches,
  getSettings,
  getTables,
  useTables,
  saveTables,
  resetTables,
  resetDishes,
  resetBranches,
  useReservations,
  SiteSettings,
  Table as TableT,
} from "@/lib/store";
import { formatSom, Dish, Branch } from "@/data/menu";
import { categoryLabels, categoryOrder, type CategoryKey } from "@/components/menu/pages";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AUTH_KEY = "zr.v2.admin.auth";

function useAuth() {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const login = (u: string, p: string) => {
    if (u === "admin" && p === "imron2024") {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };
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
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(u, p)) setErr("Noto'g'ri login yoki parol");
  };
  return (
    <div className="min-h-screen grid place-items-center bg-background relative overflow-hidden p-6">
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=80"
          className="h-full w-full object-cover blur-md"
          alt=""
        />
      </div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="relative glass-dark p-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-3 mb-8">
          <Crown className="h-7 w-7 text-accent" />
          <div>
            <div className="font-display text-2xl gold-foil">IMRON</div>
            <div className="text-[10px] tracking-[0.3em] text-accent/80">ADMIN PANEL</div>
          </div>
        </Link>
        <div className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Login</label>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Parol</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="w-full bg-input border border-border text-cream px-4 py-3 pr-12 focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-primary"
                aria-label="Parolni ko'rsatish"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {err && <div className="text-destructive text-sm">{err}</div>}
          <button className="w-full py-4 bg-primary text-cream uppercase tracking-[0.3em] text-xs hover:bg-ember hover:shadow-ember transition-all flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> Kirish
          </button>
          <p className="text-xs text-cream/40 text-center">Demo: admin / imron2024</p>
        </div>
      </motion.form>
    </div>
  );
}

const navItems = [
  { to: "/admin", label: "Bosh sahifa", icon: Home, end: true },
  { to: "/admin/bronlar", label: "Bronlar", icon: Calendar },
  { to: "/admin/buyurtmalar", label: "Stol xaritasi", icon: ListOrdered },
  { to: "/admin/menyu", label: "Menyu", icon: Utensils },
  { to: "/admin/filiallar", label: "Filiallar", icon: Building2 },
  { to: "/admin/statistika", label: "Statistika", icon: BarChart3 },
  { to: "/admin/sozlamalar", label: "Sozlamalar", icon: SettingsIcon },
];

function Shell({ onLogout }: { onLogout: () => void }) {
  const loc = useLocation();
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [loc.pathname]);

  return (
    <div className="min-h-screen flex bg-background text-cream">
      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col z-40",
          "fixed lg:static inset-y-0 left-0 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Link to="/" className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <Crown className="h-6 w-6 text-accent" />
          <div className="leading-tight">
            <div className="font-display text-xl gold-foil">IMRON</div>
            <div className="text-[9px] tracking-[0.3em] text-accent/80">RESTORAN · ADMIN</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((it) => {
            const active = it.end ? loc.pathname === it.to : loc.pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors",
                  active
                    ? "bg-primary/15 text-primary border-l-2 border-primary"
                    : "text-cream/70 hover:bg-sidebar-accent hover:text-cream"
                )}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            onLogout();
            nav("/");
          }}
          className="m-3 px-4 py-3 text-sm flex items-center gap-3 text-cream/70 hover:bg-sidebar-accent rounded"
        >
          <LogOut className="h-4 w-4" /> Chiqish
        </button>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className="flex-1 overflow-x-hidden min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-10 w-10 grid place-items-center border border-border rounded"
            aria-label="Menyu"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <div className="font-display text-base gold-foil">IMRON · ADMIN</div>
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="bronlar" element={<Bookings />} />
          <Route path="buyurtmalar" element={<Orders />} />
          <Route path="menyu" element={<MenuAdmin />} />
          <Route path="filiallar" element={<BranchesAdmin />} />
          <Route path="statistika" element={<Stats />} />
          <Route path="sozlamalar" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
}

function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 md:px-8 pt-8 pb-4 border-b border-border flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-gold text-[10px] tracking-[0.4em]">— ADMIN</div>
        <h1 className="font-display text-2xl md:text-3xl text-cream mt-1">{title}</h1>
        {sub && <p className="text-cream/60 text-sm mt-1">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  hint,
}: {
  label: string;
  value: string;
  accent?: boolean;
  hint?: string;
}) {
  return (
    <div
      className={cn(
        "p-5 md:p-6 border",
        accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"
      )}
    >
      <div className="text-[10px] tracking-[0.3em] text-cream/60 uppercase">{label}</div>
      <div className={cn("font-accent text-3xl md:text-4xl mt-3", accent ? "text-primary" : "text-cream")}>
        {value}
      </div>
      {hint && <div className="text-xs text-cream/50 mt-2">{hint}</div>}
    </div>
  );
}

/* ─────────────────────── DASHBOARD ─────────────────────── */
function Dashboard() {
  const reservations = useReservations();
  const dishes = useDishes();
  const branches = useBranches();

  const today = new Date().toISOString().slice(0, 10);
  const todayList = reservations.filter((r) => r.date === today);
  const pending = reservations.filter((r) => r.status === "yangi").length;
  const confirmed = reservations.filter((r) => r.status === "tasdiqlangan");
  const avgCheck = 450000;
  const todayRevenue = confirmed.filter((r) => r.date === today).reduce((s, r) => s + r.guests * avgCheck, 0);
  const totalGuests = todayList.reduce((s, r) => s + r.guests, 0);

  const chart = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
    const day = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"][new Date(d).getDay()];
    return { day, bron: reservations.filter((r) => r.date === d).length };
  });

  return (
    <>
      <PageHeader title="Bosh sahifa" sub="Bugungi faoliyat ko'rinishi" />
      <div className="p-6 md:p-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <Stat label="Bugungi bronlar" value={String(todayList.length)} accent hint={`${totalGuests} mehmon`} />
          <Stat label="Kutilayotgan" value={String(pending)} hint="tasdiq kerak" />
          <Stat label="Bugungi tushum (taxminiy)" value={formatSom(todayRevenue)} />
          <Stat
            label="Umumiy ma'lumot"
            value={`${dishes.length} · ${branches.length}`}
            hint="taom · filial"
          />
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
                  <YAxis stroke="hsl(0 0% 50%)" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)" }} />
                  <Line
                    type="monotone"
                    dataKey="bron"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="font-display text-xl text-cream mb-4">Oxirgi faoliyat</h3>
            <ul className="space-y-3 text-sm max-h-80 overflow-y-auto pr-1">
              {reservations.slice(0, 10).map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-cream truncate">{r.name}</div>
                    <div className="text-xs text-cream/50">
                      {r.date} · {r.time} · {r.guests} meh.
                    </div>
                  </div>
                  <StatusBadge s={r.status} />
                </li>
              ))}
              {reservations.length === 0 && (
                <li className="text-cream/50 text-center py-6">Bronlar yo'q</li>
              )}
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
  return (
    <span className={cn("text-[10px] uppercase tracking-[0.2em] border px-2 py-1 whitespace-nowrap", map[s])}>
      {label[s]}
    </span>
  );
}

/* ─────────────────────── TABLE HELPERS ─────────────────────── */
function isTableBusy(
  reservations: Reservation[],
  tableId: string,
  date: string,
  time: string,
  excludeResId?: string
) {
  return reservations.some(
    (r) =>
      r.id !== excludeResId &&
      r.tableId === tableId &&
      r.date === date &&
      r.time === time &&
      r.status === "tasdiqlangan"
  );
}

function freeTablesForRes(tables: TableT[], reservations: Reservation[], res: Reservation) {
  return tables.filter(
    (t) =>
      t.branchId === res.branchId &&
      !isTableBusy(reservations, t.id, res.date, res.time, res.id)
  );
}

/* ─────────────────────── BOOKINGS ─────────────────────── */
function Bookings() {
  const branches = useBranches();
  const tables = useTables();
  const list = useReservations();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [branch, setBranch] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [confirming, setConfirming] = useState<Reservation | null>(null);

  const filtered = list.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (branch === "all" || r.branchId === branch) &&
      (dateFilter === "" || r.date === dateFilter) &&
      (q === "" || r.name.toLowerCase().includes(q.toLowerCase()) || r.phone.includes(q))
  );

  const cancel = (r: Reservation) => {
    updateReservation(r.id, { status: "bekor", tableId: undefined });
    toast.success("Bron bekor qilindi");
  };

  const reopen = (r: Reservation) => {
    updateReservation(r.id, { status: "yangi", tableId: undefined });
    toast.success("Bron qayta ochildi");
  };

  const del = (id: string) => {
    if (!confirm("Ushbu bronni o'chirishni tasdiqlaysizmi?")) return;
    deleteReservation(id);
    toast.success("O'chirildi");
  };

  const confirmBooking = (tableId: string) => {
    if (!confirming) return;
    updateReservation(confirming.id, { status: "tasdiqlangan", tableId });
    toast.success(
      `Bron tasdiqlandi — ${tables.find((t) => t.id === tableId)?.name || ""}`
    );
    setConfirming(null);
  };

  return (
    <>
      <PageHeader
        title="Bronlar"
        sub={`Jami: ${list.length} · Ko'rsatilmoqda: ${filtered.length}`}
      />
      <div className="p-6 md:p-8 space-y-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ism yoki telefon..."
              className="w-full bg-input border border-border text-cream pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-input border border-border text-cream px-4 py-2.5 text-sm"
          >
            <option value="all">Barcha statuslar</option>
            <option value="yangi">Yangi</option>
            <option value="tasdiqlangan">Tasdiqlangan</option>
            <option value="bekor">Bekor</option>
          </select>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="bg-input border border-border text-cream px-4 py-2.5 text-sm"
          >
            <option value="all">Barcha filiallar</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-input border border-border text-cream px-4 py-2.5 text-sm"
          />
          {(status !== "all" || branch !== "all" || dateFilter || q) && (
            <button
              onClick={() => {
                setStatus("all");
                setBranch("all");
                setDateFilter("");
                setQ("");
              }}
              className="text-cream/60 hover:text-primary text-xs underline"
            >
              Tozalash
            </button>
          )}
        </div>

        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead className="bg-muted/40 text-cream/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Mijoz</th>
                <th className="text-left p-3 hidden md:table-cell">Telefon</th>
                <th className="text-left p-3">Sana</th>
                <th className="text-left p-3 hidden lg:table-cell">Filial</th>
                <th className="text-left p-3">Meh.</th>
                <th className="text-left p-3">Stol</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const table = tables.find((t) => t.id === r.tableId);
                return (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                    <td className="p-3">
                      <div className="text-cream">{r.name}</div>
                      <div className="text-xs text-cream/50">{r.id}</div>
                    </td>
                    <td className="p-3 hidden md:table-cell text-cream/70">{r.phone}</td>
                    <td className="p-3 text-cream/80">
                      {r.date}
                      <div className="text-xs text-cream/50">{r.time}</div>
                    </td>
                    <td className="p-3 hidden lg:table-cell text-cream/70">
                      {branches.find((b) => b.id === r.branchId)?.name || "—"}
                    </td>
                    <td className="p-3 text-cream font-accent">{r.guests}</td>
                    <td className="p-3">
                      {table ? (
                        <span className="text-gold text-xs tracking-[0.15em] uppercase">
                          {table.name}
                        </span>
                      ) : (
                        <span className="text-cream/30 text-xs">—</span>
                      )}
                    </td>
                    <td className="p-3">
                      <StatusBadge s={r.status} />
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        {r.status === "yangi" && (
                          <button
                            onClick={() => setConfirming(r)}
                            className="h-8 w-8 grid place-items-center hover:bg-primary/15 hover:text-primary rounded"
                            title="Tasdiqlash va stol biriktirish"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        {r.status === "tasdiqlangan" && (
                          <button
                            onClick={() => setConfirming(r)}
                            className="h-8 w-8 grid place-items-center hover:bg-gold/15 hover:text-gold rounded"
                            title="Stolni o'zgartirish"
                          >
                            <UsersIcon className="h-4 w-4" />
                          </button>
                        )}
                        {r.status !== "bekor" && (
                          <button
                            onClick={() => cancel(r)}
                            className="h-8 w-8 grid place-items-center hover:bg-destructive/15 hover:text-destructive rounded"
                            title="Bekor qilish"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                        {r.status === "bekor" && (
                          <button
                            onClick={() => reopen(r)}
                            className="h-8 w-8 grid place-items-center hover:bg-gold/15 hover:text-gold rounded"
                            title="Qayta ochish"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => del(r.id)}
                          className="h-8 w-8 grid place-items-center hover:bg-destructive/15 hover:text-destructive rounded"
                          title="O'chirish"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-cream/50">
                    Hech narsa topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirming && (
        <AssignTableModal
          reservation={confirming}
          tables={tables}
          reservations={list}
          branches={branches}
          onClose={() => setConfirming(null)}
          onAssign={confirmBooking}
        />
      )}
    </>
  );
}

function AssignTableModal({
  reservation,
  tables,
  reservations,
  branches,
  onClose,
  onAssign,
}: {
  reservation: Reservation;
  tables: TableT[];
  reservations: Reservation[];
  branches: Branch[];
  onClose: () => void;
  onAssign: (tableId: string) => void;
}) {
  const branchName = branches.find((b) => b.id === reservation.branchId)?.name || "—";
  const branchTables = tables.filter((t) => t.branchId === reservation.branchId);
  const freeTables = freeTablesForRes(tables, reservations, reservation);
  const [selected, setSelected] = useState<string>(reservation.tableId || "");

  return (
    <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4 overflow-y-auto">
      <div className="bg-card border border-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em]">— STOL BIRIKTIRISH</div>
            <h2 className="font-display text-xl text-cream mt-1">{reservation.name}</h2>
            <div className="text-xs text-cream/60 mt-1">
              {branchName} · {reservation.date} · {reservation.time} · {reservation.guests} mehmon
            </div>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center hover:bg-muted rounded">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {branchTables.length === 0 ? (
            <div className="flex items-start gap-3 p-4 border border-destructive/30 bg-destructive/5 text-cream/80 text-sm">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                Bu filialda hali stollar qo'shilmagan. Avval "Stol xaritasi" sahifasiga o'tib, stollarni qo'shing.
              </div>
            </div>
          ) : (
            <>
              <div className="text-xs text-cream/60 mb-3">
                Mavjud: {freeTables.length}/{branchTables.length} stol
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {branchTables.map((t) => {
                  const busy = !freeTables.includes(t);
                  const isSelected = selected === t.id;
                  const fitsGuests = t.capacity == null || t.capacity >= reservation.guests;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      disabled={busy}
                      onClick={() => setSelected(t.id)}
                      className={cn(
                        "text-left p-4 border transition-all",
                        busy
                          ? "border-border/60 bg-muted/30 opacity-50 cursor-not-allowed"
                          : isSelected
                          ? "border-primary bg-primary/10 shadow-ember"
                          : "border-border hover:border-primary/60 hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-display text-lg text-cream">{t.name}</div>
                        {isSelected && !busy && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                        {busy && (
                          <span className="text-[9px] tracking-[0.2em] uppercase text-destructive">
                            band
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-cream/60">
                        {t.capacity != null && (
                          <span className="flex items-center gap-1">
                            <UsersIcon className="h-3 w-3" /> {t.capacity} kishi
                          </span>
                        )}
                        {!fitsGuests && !busy && (
                          <span className="text-gold flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> kichik
                          </span>
                        )}
                      </div>
                      {t.note && (
                        <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gold/80">
                          {t.note}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="p-5 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-border text-cream/80 text-xs uppercase tracking-[0.2em] hover:bg-muted"
          >
            Bekor
          </button>
          <button
            onClick={() => {
              if (!selected) {
                toast.error("Stolni tanlang");
                return;
              }
              onAssign(selected);
            }}
            disabled={!selected}
            className={cn(
              "px-5 py-2.5 text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all",
              selected
                ? "bg-primary text-cream hover:bg-ember"
                : "bg-muted text-cream/40 cursor-not-allowed"
            )}
          >
            <Check className="h-3.5 w-3.5" /> Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── STOL XARITASI ─────────────────────── */
function Orders() {
  const branches = useBranches();
  const tables = useTables();
  const reservations = useReservations();

  const [branchId, setBranchId] = useState<string>(branches[0]?.id || "");
  const [editing, setEditing] = useState<TableT | null>(null);
  const [detail, setDetail] = useState<{ table: TableT; res?: Reservation } | null>(null);

  useEffect(() => {
    if (!branchId && branches[0]) setBranchId(branches[0].id);
  }, [branches, branchId]);

  const today = new Date().toISOString().slice(0, 10);
  const branchTables = useMemo(
    () => tables.filter((t) => t.branchId === branchId),
    [tables, branchId]
  );

  const todayRes = useMemo(
    () =>
      reservations.filter(
        (r) =>
          r.date === today &&
          r.branchId === branchId &&
          r.status === "tasdiqlangan"
      ),
    [reservations, branchId, today]
  );

  const busyCount = branchTables.filter((t) => todayRes.some((r) => r.tableId === t.id)).length;
  const freeCount = branchTables.length - busyCount;

  const add = () => {
    if (!branchId) {
      toast.error("Avval filialni tanlang");
      return;
    }
    const next = branchTables.length + 1;
    const t: TableT = {
      id: `${branchId}-t-${Date.now()}`,
      branchId,
      name: `Stol ${next}`,
      capacity: 4,
      note: "",
    };
    saveTables([...tables, t]);
    setEditing(t);
  };

  const del = (id: string) => {
    if (!confirm("Stolni o'chirishni tasdiqlaysizmi?")) return;
    // Also unassign any reservations using this table
    const res = getReservations();
    res.forEach((r) => {
      if (r.tableId === id) updateReservation(r.id, { tableId: undefined });
    });
    saveTables(tables.filter((t) => t.id !== id));
    toast.success("O'chirildi");
  };

  const saveEdit = (t: TableT) => {
    const exists = tables.some((x) => x.id === t.id);
    saveTables(exists ? tables.map((x) => (x.id === t.id ? t : x)) : [...tables, t]);
    toast.success("Saqlandi");
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Stol xaritasi"
        sub={`${branchTables.length} stol · Bugun: ${busyCount} band / ${freeCount} bo'sh`}
        action={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                if (confirm("Stollarni boshlang'ich holatiga qaytarasizmi?")) {
                  resetTables();
                  toast.success("Stollar qayta tiklandi");
                }
              }}
              className="px-4 py-2.5 border border-border text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Qayta tiklash
            </button>
            <button
              onClick={add}
              className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-ember"
            >
              <Plus className="h-4 w-4" /> Yangi stol
            </button>
          </div>
        }
      />
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="bg-input border border-border text-cream px-4 py-2.5 text-sm"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 text-[10px] uppercase tracking-[0.25em] items-center">
            <span className="flex items-center gap-1.5 text-cream/60">
              <span className="h-2 w-2 rounded-full bg-primary" /> band
            </span>
            <span className="flex items-center gap-1.5 text-cream/60">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/50" /> bo'sh
            </span>
          </div>
        </div>

        {branchTables.length === 0 ? (
          <div className="text-center text-cream/50 py-16 border border-dashed border-border">
            Bu filialda hali stollar yo'q. "Yangi stol" tugmasi orqali qo'shing.
          </div>
        ) : (
          <div className="border border-border bg-card p-5 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {branchTables.map((t) => {
                const res = todayRes.find((r) => r.tableId === t.id);
                const busy = !!res;
                return (
                  <button
                    key={t.id}
                    onClick={() => setDetail({ table: t, res })}
                    className={cn(
                      "relative border-2 p-4 transition-all hover:scale-[1.03] text-left group",
                      busy
                        ? "border-primary/70 bg-primary/10 text-primary"
                        : "border-border/80 bg-muted/20 text-cream/80 hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-display text-lg leading-tight">{t.name}</div>
                      <span
                        className={cn(
                          "text-[9px] tracking-[0.25em] uppercase",
                          busy ? "text-primary" : "text-cream/40"
                        )}
                      >
                        {busy ? "band" : "bo'sh"}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-cream/50 flex items-center gap-2 flex-wrap">
                      {t.capacity != null && (
                        <span className="inline-flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" /> {t.capacity}
                        </span>
                      )}
                      {t.note && (
                        <span className="inline-flex items-center gap-1 text-gold/80">
                          <StickyNote className="h-3 w-3" /> {t.note}
                        </span>
                      )}
                    </div>
                    {res && (
                      <div className="mt-3 pt-2 border-t border-primary/20 text-[11px] leading-relaxed">
                        <div className="text-cream font-medium truncate">{res.name}</div>
                        <div className="text-cream/60 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {res.time} · {res.guests} meh.
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditing(t);
                        }}
                        className="h-6 w-6 grid place-items-center bg-background/80 text-cream/80 hover:text-primary rounded cursor-pointer"
                        title="Tahrirlash"
                      >
                        <SettingsIcon className="h-3 w-3" />
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          del(t.id);
                        }}
                        className="h-6 w-6 grid place-items-center bg-background/80 text-cream/80 hover:text-destructive rounded cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-xs text-cream/50 text-center">
          Stol holati bugungi tasdiqlangan bronlardan avtomatik olinadi.
        </div>
      </div>

      {editing && (
        <TableEditor table={editing} onClose={() => setEditing(null)} onSave={saveEdit} />
      )}
      {detail && (
        <TableDetail
          table={detail.table}
          res={detail.res}
          branchName={branches.find((b) => b.id === detail.table.branchId)?.name || ""}
          onClose={() => setDetail(null)}
          onEdit={() => {
            setEditing(detail.table);
            setDetail(null);
          }}
          onDelete={() => {
            del(detail.table.id);
            setDetail(null);
          }}
        />
      )}
    </>
  );
}

function TableEditor({
  table,
  onClose,
  onSave,
}: {
  table: TableT;
  onClose: () => void;
  onSave: (t: TableT) => void;
}) {
  const [t, setT] = useState<TableT>(table);
  const set = <K extends keyof TableT>(k: K, v: TableT[K]) => setT((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4 overflow-y-auto">
      <div className="bg-card border border-border w-full max-w-md my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em]">— STOL TAHRIRI</div>
            <h2 className="font-display text-xl text-cream mt-1">{t.name || "Yangi stol"}</h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center hover:bg-muted rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Stol nomi
            </label>
            <input
              value={t.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Stol 1"
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Sig'imi (nechta kishi)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={t.capacity ?? ""}
              onChange={(e) =>
                set("capacity", e.target.value === "" ? undefined : Number(e.target.value))
              }
              placeholder="4"
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary font-accent"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Izoh (ixtiyoriy)
            </label>
            <input
              value={t.note || ""}
              onChange={(e) => set("note", e.target.value)}
              placeholder="VIP xona, terrassa, deraza yonida..."
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="p-5 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-border text-cream/80 text-xs uppercase tracking-[0.2em] hover:bg-muted"
          >
            Bekor
          </button>
          <button
            onClick={() => {
              if (!t.name.trim()) {
                toast.error("Stol nomini kiriting");
                return;
              }
              onSave(t);
            }}
            className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] hover:bg-ember flex items-center gap-2"
          >
            <Save className="h-3.5 w-3.5" /> Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

function TableDetail({
  table,
  res,
  branchName,
  onClose,
  onEdit,
  onDelete,
}: {
  table: TableT;
  res?: Reservation;
  branchName: string;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4 overflow-y-auto">
      <div className="bg-card border border-border w-full max-w-md my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em]">— {branchName.toUpperCase()}</div>
            <h2 className="font-display text-2xl text-cream mt-1">{table.name}</h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center hover:bg-muted rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {table.capacity != null && (
              <div className="p-3 border border-border">
                <div className="text-[10px] tracking-[0.3em] text-cream/50 uppercase">Sig'im</div>
                <div className="font-accent text-2xl text-cream mt-1">{table.capacity}</div>
              </div>
            )}
            <div className="p-3 border border-border">
              <div className="text-[10px] tracking-[0.3em] text-cream/50 uppercase">Holat</div>
              <div
                className={cn(
                  "font-accent text-xl mt-1",
                  res ? "text-primary" : "text-cream/60"
                )}
              >
                {res ? "BAND" : "BO'SH"}
              </div>
            </div>
          </div>
          {table.note && (
            <div className="p-3 border border-gold/30 bg-gold/5">
              <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Izoh</div>
              <div className="text-sm text-cream/80 mt-1">{table.note}</div>
            </div>
          )}
          {res ? (
            <div className="p-4 border border-primary/30 bg-primary/5 space-y-2">
              <div className="text-[10px] tracking-[0.3em] text-primary uppercase">
                Bugungi bron
              </div>
              <div className="font-display text-lg text-cream">{res.name}</div>
              <div className="text-sm text-cream/70 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {res.time}
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="h-3 w-3" /> {res.guests}
                </span>
              </div>
              <div className="text-xs text-cream/60">{res.phone}</div>
              {res.note && (
                <div className="text-xs italic text-cream/60 border-l-2 border-gold/40 pl-3 mt-2">
                  {res.note}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-border text-center text-cream/50 text-sm">
              Bugun bu stol bo'sh
            </div>
          )}
        </div>
        <div className="p-5 border-t border-border flex justify-between gap-3">
          <button
            onClick={onDelete}
            className="px-4 py-2.5 border border-destructive/40 text-destructive text-xs uppercase tracking-[0.2em] hover:bg-destructive/10 flex items-center gap-2"
          >
            <Trash2 className="h-3.5 w-3.5" /> O'chirish
          </button>
          <button
            onClick={onEdit}
            className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] hover:bg-ember flex items-center gap-2"
          >
            <SettingsIcon className="h-3.5 w-3.5" /> Tahrirlash
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── MENU ADMIN ─────────────────────── */
function MenuAdmin() {
  const list = useDishes();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [editing, setEditing] = useState<Dish | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (d) =>
          (cat === "all" || d.category === cat) &&
          (q === "" || d.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [list, q, cat]
  );

  const add = () => {
    const d: Dish = {
      id: "dish-" + Date.now(),
      name: "Yangi taom",
      price: 100000,
      desc: "Ta'rifni kiriting...",
      category: "palov",
      image: "",
      weight: "",
    };
    saveDishes([d, ...list]);
    setEditing(d);
  };

  const del = (id: string) => {
    if (!confirm("Ushbu taomni o'chirishni tasdiqlaysizmi?")) return;
    saveDishes(list.filter((d) => d.id !== id));
    toast.success("Taom o'chirildi");
  };

  const duplicate = (d: Dish) => {
    const copy: Dish = { ...d, id: "dish-" + Date.now(), name: d.name + " (nusxa)" };
    saveDishes([copy, ...list]);
    toast.success("Nusxa qo'shildi");
  };

  const saveEdit = (d: Dish) => {
    saveDishes(list.map((x) => (x.id === d.id ? d : x)));
    toast.success("Saqlandi");
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Menyu boshqaruvi"
        sub={`${list.length} ta taom · Ko'rsatilmoqda: ${filtered.length}`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm("Menyuni boshlang'ich holatiga qaytarasizmi? Barcha o'zgarishlar yo'qoladi.")) {
                  resetDishes();
                  toast.success("Menyu qayta tiklandi");
                }
              }}
              className="px-4 py-2.5 border border-border text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-muted"
              title="Standart menyuga qaytarish"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Qayta tiklash
            </button>
            <button
              onClick={add}
              className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-ember"
            >
              <Plus className="h-4 w-4" /> Yangi qo'shish
            </button>
          </div>
        }
      />
      <div className="p-6 md:p-8 space-y-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Taom nomidan izlash..."
              className="w-full bg-input border border-border text-cream pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="bg-input border border-border text-cream px-4 py-2.5 text-sm"
          >
            <option value="all">Barcha kategoriyalar</option>
            {categoryOrder.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <div key={d.id} className="border border-border bg-card overflow-hidden flex flex-col">
              <div className="h-44 bg-[hsl(0_0%_10%)] relative overflow-hidden">
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-gold/30 text-5xl">❦</div>
                )}
                {d.badge && (
                  <div className="absolute top-2 left-2 px-2 py-1 text-[9px] tracking-[0.2em] uppercase bg-primary/90 text-cream">
                    {d.badge === "chef"
                      ? "Chef's"
                      : d.badge === "signature"
                      ? "Signature"
                      : d.badge === "new"
                      ? "Yangi"
                      : "Achchiq"}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg text-cream line-clamp-1">{d.name}</h3>
                  <div className="font-accent text-primary text-sm whitespace-nowrap">
                    {formatSom(d.price)}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mt-1">
                  {categoryLabels[d.category as CategoryKey]}
                  {d.weight && <span className="text-cream/40"> · {d.weight}</span>}
                </div>
                <p className="text-cream/60 text-sm mt-2 line-clamp-2 flex-1">{d.desc}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing(d)}
                    className="flex-1 py-2 text-xs uppercase tracking-[0.2em] bg-primary/15 text-primary hover:bg-primary hover:text-cream transition-all"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => duplicate(d)}
                    className="h-9 w-9 grid place-items-center border border-border text-cream/70 hover:text-primary hover:border-primary"
                    title="Nusxalash"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => del(d.id)}
                    className="h-9 w-9 grid place-items-center border border-border text-cream/70 hover:text-destructive hover:border-destructive"
                    title="O'chirish"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-cream/50 py-16 border border-dashed border-border">
              Hech narsa topilmadi
            </div>
          )}
        </div>
      </div>

      {editing && <DishEditor dish={editing} onClose={() => setEditing(null)} onSave={saveEdit} />}
    </>
  );
}

/* Image picker: URL or file upload (converts to data URL). */
function ImageField({
  value,
  onChange,
  aspect = "aspect-[4/3]",
}: {
  value: string;
  onChange: (v: string) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    if (f.size > 3 * 1024 * 1024) {
      toast.error("Rasm hajmi 3MB dan oshmasligi kerak");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(f);
  };

  return (
    <div className="space-y-2">
      <div
        className={cn("relative border border-border bg-[hsl(0_0%_10%)] overflow-hidden", aspect)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
      >
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 h-8 w-8 grid place-items-center bg-background/80 text-cream hover:text-destructive rounded"
              title="O'chirish"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-full w-full grid place-items-center text-cream/50 hover:text-primary"
          >
            <div className="text-center">
              <ImagePlus className="h-8 w-8 mx-auto" />
              <div className="text-xs mt-2 tracking-[0.2em] uppercase">Rasm tanlang</div>
              <div className="text-[10px] mt-1 text-cream/40">yoki fayl sudrab qo'ying</div>
            </div>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Yoki rasm URL manzili"
          className="flex-1 bg-input border border-border text-cream/80 px-3 py-2 text-xs focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-3 py-2 border border-border text-cream/70 hover:text-primary text-xs flex items-center gap-1"
        >
          <Upload className="h-3 w-3" /> Fayl
        </button>
      </div>
    </div>
  );
}

function DishEditor({
  dish,
  onClose,
  onSave,
}: {
  dish: Dish;
  onClose: () => void;
  onSave: (d: Dish) => void;
}) {
  const [d, setD] = useState<Dish>(dish);

  const set = <K extends keyof Dish>(k: K, v: Dish[K]) => setD((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4 overflow-y-auto">
      <div className="bg-card border border-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em]">— TAOM TAHRIRI</div>
            <h2 className="font-display text-xl text-cream mt-1">{d.name || "Yangi taom"}</h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center hover:bg-muted rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          <ImageField value={d.image} onChange={(v) => set("image", v)} aspect="aspect-video" />

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Taom nomi
            </label>
            <input
              value={d.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Ta'rif
            </label>
            <textarea
              value={d.desc}
              onChange={(e) => set("desc", e.target.value)}
              rows={3}
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Narx (so'm)
              </label>
              <input
                type="number"
                value={d.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary font-accent"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Vazn / o'lcham
              </label>
              <input
                value={d.weight || ""}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="300g"
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Kategoriya
              </label>
              <select
                value={d.category}
                onChange={(e) => set("category", e.target.value as Dish["category"])}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              >
                {categoryOrder.map((c) => (
                  <option key={c} value={c}>
                    {categoryLabels[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Belgi (ixtiyoriy)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { v: undefined, l: "Yo'q" },
                { v: "chef", l: "Chef's Pick" },
                { v: "signature", l: "Signature" },
                { v: "new", l: "Yangi" },
                { v: "spicy", l: "Achchiq" },
              ].map((b) => (
                <button
                  key={String(b.v)}
                  type="button"
                  onClick={() => set("badge", b.v as Dish["badge"])}
                  className={cn(
                    "px-3 py-2 text-xs uppercase tracking-[0.2em] border transition-all",
                    d.badge === b.v
                      ? "bg-primary border-primary text-cream"
                      : "bg-transparent border-border text-cream/70 hover:border-primary"
                  )}
                >
                  {b.l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-border text-cream/80 text-xs uppercase tracking-[0.2em] hover:bg-muted"
          >
            Bekor
          </button>
          <button
            onClick={() => {
              if (!d.name.trim()) {
                toast.error("Taom nomini kiriting");
                return;
              }
              onSave(d);
            }}
            className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] hover:bg-ember flex items-center gap-2"
          >
            <Save className="h-3.5 w-3.5" /> Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── BRANCHES ADMIN ─────────────────────── */
function BranchesAdmin() {
  const list = useBranches();
  const [editing, setEditing] = useState<Branch | null>(null);

  const add = () => {
    const b: Branch = {
      id: "branch-" + Date.now(),
      name: "Yangi filial",
      city: "Toshkent",
      address: "Manzil...",
      phone: "+998 71 000 00 00",
      coords: [41.3, 69.28],
      image: "",
    };
    saveBranches([...list, b]);
    setEditing(b);
  };

  const del = (id: string) => {
    if (!confirm("Filialni o'chirishni tasdiqlaysizmi?")) return;
    saveBranches(list.filter((b) => b.id !== id));
    toast.success("O'chirildi");
  };

  const saveEdit = (b: Branch) => {
    const exists = list.some((x) => x.id === b.id);
    saveBranches(exists ? list.map((x) => (x.id === b.id ? b : x)) : [...list, b]);
    toast.success("Saqlandi");
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Filiallar"
        sub={`${list.length} ta filial`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm("Filiallarni boshlang'ich holatiga qaytarasizmi?")) {
                  resetBranches();
                  toast.success("Filiallar qayta tiklandi");
                }
              }}
              className="px-4 py-2.5 border border-border text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Qayta tiklash
            </button>
            <button
              onClick={add}
              className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-ember"
            >
              <Plus className="h-4 w-4" /> Yangi filial
            </button>
          </div>
        }
      />
      <div className="p-6 md:p-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((b) => (
          <div key={b.id} className="border border-border bg-card overflow-hidden flex flex-col">
            <div className="h-40 bg-[hsl(0_0%_10%)] relative overflow-hidden">
              {b.image ? (
                <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center text-gold/30 text-5xl">❦</div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl text-cream">{b.name}</h3>
              <div className="text-xs text-gold tracking-[0.25em] uppercase mt-1">{b.city}</div>
              <div className="text-sm text-cream/70 mt-3">{b.address}</div>
              <div className="text-sm text-cream/70 mt-1">{b.phone}</div>
              <div className="text-xs text-cream/40 mt-1">
                {b.coords[0].toFixed(4)}, {b.coords[1].toFixed(4)}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditing(b)}
                  className="flex-1 py-2 text-xs uppercase tracking-[0.2em] bg-primary/15 text-primary hover:bg-primary hover:text-cream transition-all"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => del(b.id)}
                  className="h-9 w-9 grid place-items-center border border-border text-cream/70 hover:text-destructive hover:border-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full text-center text-cream/50 py-16 border border-dashed border-border">
            Filiallar mavjud emas
          </div>
        )}
      </div>

      {editing && <BranchEditor branch={editing} onClose={() => setEditing(null)} onSave={saveEdit} />}
    </>
  );
}

function BranchEditor({
  branch,
  onClose,
  onSave,
}: {
  branch: Branch;
  onClose: () => void;
  onSave: (b: Branch) => void;
}) {
  const [b, setB] = useState<Branch>(branch);
  const set = <K extends keyof Branch>(k: K, v: Branch[K]) => setB((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4 overflow-y-auto">
      <div className="bg-card border border-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em]">— FILIAL TAHRIRI</div>
            <h2 className="font-display text-xl text-cream mt-1">{b.name || "Yangi filial"}</h2>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center hover:bg-muted rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          <ImageField value={b.image} onChange={(v) => set("image", v)} aspect="aspect-video" />

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Filial nomi
              </label>
              <input
                value={b.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Shahar
              </label>
              <input
                value={b.city}
                onChange={(e) => set("city", e.target.value)}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Manzil
            </label>
            <input
              value={b.address}
              onChange={(e) => set("address", e.target.value)}
              className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Telefon
              </label>
              <input
                value={b.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Kenglik (lat)
              </label>
              <input
                type="number"
                step="0.0001"
                value={b.coords[0]}
                onChange={(e) => set("coords", [Number(e.target.value), b.coords[1]])}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
                Uzunlik (lon)
              </label>
              <input
                type="number"
                step="0.0001"
                value={b.coords[1]}
                onChange={(e) => set("coords", [b.coords[0], Number(e.target.value)])}
                className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-border text-cream/80 text-xs uppercase tracking-[0.2em] hover:bg-muted"
          >
            Bekor
          </button>
          <button
            onClick={() => {
              if (!b.name.trim()) {
                toast.error("Filial nomini kiriting");
                return;
              }
              onSave(b);
            }}
            className="px-5 py-2.5 bg-primary text-cream text-xs uppercase tracking-[0.2em] hover:bg-ember flex items-center gap-2"
          >
            <Save className="h-3.5 w-3.5" /> Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── STATS ─────────────────────── */
function Stats() {
  const reservations = useReservations();
  const branches = useBranches();

  // Group by month over the past 12 months
  const now = new Date();
  const monthly = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const count = reservations.filter((r) => r.date.startsWith(key)).length;
    return { m: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"][d.getMonth()], v: count };
  });

  const byBranch = branches.map((b) => ({
    name: b.name.replace(" filiali", ""),
    v: reservations.filter((r) => r.branchId === b.id && r.status !== "bekor").length,
  }));

  const byStatus = {
    yangi: reservations.filter((r) => r.status === "yangi").length,
    tasdiqlangan: reservations.filter((r) => r.status === "tasdiqlangan").length,
    bekor: reservations.filter((r) => r.status === "bekor").length,
  };

  return (
    <>
      <PageHeader title="Statistika" sub="Yillik ko'rsatkichlar" />
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Yangi" value={String(byStatus.yangi)} />
          <Stat label="Tasdiqlangan" value={String(byStatus.tasdiqlangan)} accent />
          <Stat label="Bekor qilingan" value={String(byStatus.bekor)} />
        </div>

        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-xl text-cream mb-1">Oylik bronlar</h3>
          <p className="text-xs text-cream/50 mb-4">Oxirgi 12 oy</p>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid stroke="hsl(0 0% 15%)" vertical={false} />
                <XAxis dataKey="m" stroke="hsl(0 0% 50%)" fontSize={12} />
                <YAxis stroke="hsl(0 0% 50%)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)" }} />
                <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-xl text-cream mb-1">Filiallar bo'yicha</h3>
          <p className="text-xs text-cream/50 mb-4">Faol bronlar</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={byBranch}>
                <CartesianGrid stroke="hsl(0 0% 15%)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(0 0% 50%)" fontSize={11} />
                <YAxis stroke="hsl(0 0% 50%)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 20%)" }} />
                <Bar dataKey="v" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────── SETTINGS ─────────────────────── */
function SettingsPage() {
  const initial = useSettings();
  const [s, setS] = useState<SiteSettings>(initial);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setS(initial);
    setDirty(false);
  }, [initial]);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => {
    setS((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  const save = () => {
    saveSettings(s);
    toast.success("Sozlamalar saqlandi");
    setDirty(false);
  };

  const exportData = () => {
    const data = {
      settings: getSettings(),
      dishes: getDishes(),
      branches: getBranches(),
      tables: getTables(),
      reservations: getReservations(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `imron-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Ma'lumotlar yuklab olindi");
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data.settings) saveSettings(data.settings);
        if (Array.isArray(data.dishes)) saveDishes(data.dishes);
        if (Array.isArray(data.branches)) saveBranches(data.branches);
        if (Array.isArray(data.tables)) saveTables(data.tables);
        toast.success("Ma'lumotlar yuklandi");
      } catch {
        toast.error("Faylni o'qib bo'lmadi");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <PageHeader
        title="Sozlamalar"
        sub="Restoran va saytning asosiy ma'lumotlari"
        action={
          <button
            onClick={save}
            disabled={!dirty}
            className={cn(
              "px-5 py-2.5 text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all",
              dirty ? "bg-primary text-cream hover:bg-ember" : "bg-muted text-cream/40 cursor-not-allowed"
            )}
          >
            <Save className="h-3.5 w-3.5" /> Saqlash
          </button>
        }
      />
      <div className="p-6 md:p-8 max-w-4xl space-y-6">
        <Section title="Asosiy ma'lumotlar">
          <Grid>
            <Field label="Restoran nomi">
              <input
                value={s.name}
                onChange={(e) => set("name", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Slogan">
              <input
                value={s.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        <Section title="Aloqa">
          <Grid>
            <Field label="Telefon">
              <input value={s.phone} onChange={(e) => set("phone", e.target.value)} className="input" />
            </Field>
            <Field label="Email">
              <input value={s.email} onChange={(e) => set("email", e.target.value)} className="input" />
            </Field>
            <Field label="Manzil">
              <input value={s.address} onChange={(e) => set("address", e.target.value)} className="input" />
            </Field>
            <Field label="Ish vaqti">
              <input value={s.hours} onChange={(e) => set("hours", e.target.value)} className="input" />
            </Field>
          </Grid>
        </Section>

        <Section title="Ijtimoiy tarmoqlar">
          <Grid>
            <Field label="Instagram URL">
              <input
                value={s.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Telegram URL">
              <input
                value={s.telegram}
                onChange={(e) => set("telegram", e.target.value)}
                className="input"
              />
            </Field>
          </Grid>
        </Section>

        <Section title="Bosh sahifa banneri">
          <Grid>
            <Field label="Sarlavha">
              <input
                value={s.heroTitle}
                onChange={(e) => set("heroTitle", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Tavsif">
              <textarea
                value={s.heroSubtitle}
                onChange={(e) => set("heroSubtitle", e.target.value)}
                rows={2}
                className="input resize-none"
              />
            </Field>
          </Grid>
          <div className="mt-4">
            <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
              Fon rasmi (video fallback)
            </label>
            <ImageField value={s.heroPoster} onChange={(v) => set("heroPoster", v)} aspect="aspect-video" />
          </div>
        </Section>

        <Section title="Ma'lumotlarni zahiralash">
          <p className="text-sm text-cream/60 mb-4">
            Menyu, filiallar, sozlamalar va bronlarni JSON faylga yuklab oling yoki qayta yuklang.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportData}
              className="px-5 py-2.5 border border-border text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:border-primary hover:text-primary"
            >
              <Download className="h-3.5 w-3.5" /> Yuklab olish
            </button>
            <label className="px-5 py-2.5 border border-border text-cream text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:border-primary hover:text-primary cursor-pointer">
              <Upload className="h-3.5 w-3.5" /> Yuklash
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importData(f);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </Section>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: hsl(var(--input));
          border: 1px solid hsl(var(--border));
          color: hsl(var(--cream));
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .input:focus { outline: none; border-color: hsl(var(--primary)); }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card p-6">
      <h3 className="font-display text-xl text-cream mb-5">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">
        {label}
      </label>
      {children}
    </div>
  );
}
