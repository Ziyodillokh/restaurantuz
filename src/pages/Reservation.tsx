import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { saveReservation, useBranches, useDishes, useSettings } from "@/lib/store";
import { formatSom } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Minus,
  Plus,
  Calendar,
  Users,
  MapPin,
  Phone,
  User,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const times: string[] = [];
for (let h = 12; h <= 23; h++) {
  times.push(`${String(h).padStart(2, "0")}:00`);
  if (h !== 23) times.push(`${String(h).padStart(2, "0")}:30`);
}

const FALLBACK_DISH_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80";

export default function Reservation() {
  const loc = useLocation();
  const nav = useNavigate();
  const branches = useBranches();
  const dishes = useDishes();
  const settings = useSettings();
  const initialDish = (loc.state as any)?.dish as string | undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [date, setDate] = useState(() =>
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [branchId, setBranchId] = useState(branches[0]?.id || "");
  const [note, setNote] = useState("");
  const [preorderIds, setPreorderIds] = useState<string[]>(initialDish ? [initialDish] : []);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const preorderDishes = useMemo(
    () => preorderIds.map((id) => dishes.find((d) => d.id === id)).filter(Boolean) as typeof dishes,
    [preorderIds, dishes]
  );

  const removePreorder = (id: string) =>
    setPreorderIds((prev) => prev.filter((x) => x !== id));

  const formatPhone = (v: string) => {
    let d = v.replace(/\D/g, "");
    if (!d.startsWith("998")) d = "998" + d.replace(/^998/, "");
    d = d.slice(0, 12);
    const p = d.slice(3);
    let out = "+998";
    if (p.length) out += " " + p.slice(0, 2);
    if (p.length > 2) out += " " + p.slice(2, 5);
    if (p.length > 5) out += " " + p.slice(5, 7);
    if (p.length > 7) out += " " + p.slice(7, 9);
    return out;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Iltimos, ismingizni kiriting");
    if (phone.replace(/\D/g, "").length < 12) return toast.error("Telefon raqam to'liq emas");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const r = saveReservation({
      name: name.trim(),
      phone,
      date,
      time,
      guests,
      branchId,
      note,
      preorder: preorderIds,
    });
    setSubmitting(false);
    setSuccess({ id: r.id });
  };

  return (
    <Layout>
      <section className="relative min-h-screen pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="relative max-w-[1400px] mx-auto container-px grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
                className="h-full w-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/4252097/4252097-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-gold text-xs tracking-[0.4em]">— TAJRIBA</div>
                <h2 className="font-display text-4xl text-cream mt-3">
                  Sizni stol kutmoqda
                </h2>
                <p className="font-serif italic text-cream/70 mt-3">
                  {settings.tagline}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-dark p-8 md:p-10"
          >
            {success ? (
              <div className="text-center py-10">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/15 grid place-items-center mb-6">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-cream">Bronlandi!</h2>
                <p className="text-cream/70 mt-3">Tez orada siz bilan bog'lanamiz.</p>
                <div className="mt-8 inline-block border border-gold/40 px-6 py-3">
                  <div className="text-[10px] tracking-[0.3em] text-gold">BRON RAQAMI</div>
                  <div className="font-accent text-2xl text-cream mt-1">{success.id}</div>
                </div>
                <div className="mt-8 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSuccess(null);
                      setName("");
                      setPhone("+998 ");
                      setPreorderIds([]);
                    }}
                    className="px-6 py-3 border border-cream/40 text-cream text-xs uppercase tracking-[0.2em]"
                  >
                    Yana band qilish
                  </button>
                  <button
                    onClick={() => nav("/")}
                    className="px-6 py-3 bg-primary text-cream text-xs uppercase tracking-[0.2em]"
                  >
                    Bosh sahifa
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-gold text-xs tracking-[0.4em] mb-2">— BRON</div>
                <h1 className="font-display text-3xl md:text-4xl text-cream">
                  Stol band qilish
                </h1>
                <div className="gold-divider w-16 my-5" />

                <form onSubmit={submit} className="space-y-5">
                  <Field icon={<User className="h-4 w-4" />} label="Ism-familiya">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Bobur Karimov"
                      className="input"
                    />
                  </Field>
                  <Field icon={<Phone className="h-4 w-4" />} label="Telefon raqam">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      type="tel"
                      className="input"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field icon={<Calendar className="h-4 w-4" />} label="Sana">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input"
                      />
                    </Field>
                    <Field label="Vaqt">
                      <select value={time} onChange={(e) => setTime(e.target.value)} className="input">
                        {times.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field icon={<Users className="h-4 w-4" />} label="Mehmonlar">
                      <div className="input flex items-center justify-between !py-1">
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="h-8 w-8 grid place-items-center hover:text-primary"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-accent text-xl text-cream">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(12, g + 1))}
                          className="h-8 w-8 grid place-items-center hover:text-primary"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </Field>
                    <Field icon={<MapPin className="h-4 w-4" />} label="Filial">
                      <select
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        className="input"
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    icon={<MessageSquare className="h-4 w-4" />}
                    label="Qo'shimcha izoh (ixtiyoriy)"
                  >
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Tug'ilgan kun, alergiya, VIP xona..."
                      className="input resize-none"
                    />
                  </Field>

                  <AnimatePresence>
                    {preorderDishes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-5 rounded-sm">
                          <div className="flex items-center gap-2 text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Oldindan tanlangan
                          </div>
                          <div className="space-y-3">
                            {preorderDishes.map((d) => (
                              <div
                                key={d.id}
                                className="flex items-center gap-4 p-3 bg-background/40 border border-border hover:border-gold/40 transition-colors group"
                              >
                                <div className="w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-muted">
                                  <img
                                    src={d.image || FALLBACK_DISH_IMG}
                                    alt={d.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      const img = e.currentTarget as HTMLImageElement;
                                      if (img.dataset.fb !== "1") {
                                        img.dataset.fb = "1";
                                        img.src = FALLBACK_DISH_IMG;
                                      }
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-base text-cream truncate">
                                    {d.name}
                                  </div>
                                  {d.weight && (
                                    <div className="text-[10px] tracking-[0.25em] text-cream/50 uppercase mt-0.5">
                                      {d.weight}
                                    </div>
                                  )}
                                  <div className="font-accent text-primary mt-1">
                                    {formatSom(d.price)}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removePreorder(d.id)}
                                  className="h-9 w-9 shrink-0 grid place-items-center text-cream/40 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                                  title="O'chirish"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-sm">
                            <span className="text-cream/60">Jami taomlar:</span>
                            <span className="font-accent text-gold text-lg">
                              {formatSom(preorderDishes.reduce((s, d) => s + d.price, 0))}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary text-cream uppercase tracking-[0.3em] text-xs hover:bg-ember hover:shadow-ember transition-all disabled:opacity-60"
                  >
                    {submitting ? "Yuborilmoqda..." : "STOLNI BAND QILISH"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

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
    </Layout>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
