import Layout from "@/components/site/Layout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useSettings } from "@/lib/store";

export default function ContactPage() {
  const s = useSettings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !msg) return toast.error("Iltimos, maydonlarni to'ldiring");
    toast.success("Xabaringiz yuborildi! Tez orada javob beramiz.");
    setName(""); setEmail(""); setMsg("");
  };

  return (
    <Layout>
      <section className="relative pt-32 pb-20 min-h-screen">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-gold text-xs tracking-[0.4em] mb-4">— ALOQA</div>
            <h1 className="font-display text-5xl md:text-6xl text-cream">
              Biz bilan <span className="italic text-gradient-ember">bog'laning</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Telefon", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
                { icon: Mail, title: "Email", value: s.email, href: `mailto:${s.email}` },
                { icon: MapPin, title: "Bosh ofis", value: s.address },
                { icon: Clock, title: "Ish vaqti", value: s.hours },
              ].map((it, i) => (
                <div key={i} className="glass-dark p-6 flex items-start gap-4 hover:border-primary/40 transition-colors">
                  <div className="h-12 w-12 grid place-items-center bg-primary/15 text-primary shrink-0">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] text-gold uppercase">{it.title}</div>
                    {it.href ? <a href={it.href} className="font-display text-xl text-cream hover:text-primary">{it.value}</a> : <div className="font-display text-xl text-cream">{it.value}</div>}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="glass-dark p-8 space-y-5">
              <h2 className="font-display text-2xl text-cream">Xabar qoldiring</h2>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Ism</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Email yoki telefon</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2 block">Xabar</label>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} className="w-full bg-input border border-border text-cream px-4 py-3 focus:outline-none focus:border-primary resize-none" />
              </div>
              <button className="w-full py-4 bg-primary text-cream uppercase tracking-[0.3em] text-xs hover:bg-ember hover:shadow-ember transition-all flex items-center justify-center gap-2">
                <Send className="h-4 w-4" /> Yuborish
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
