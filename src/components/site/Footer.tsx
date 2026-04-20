import { Link } from "react-router-dom";
import { Instagram, Send, Facebook, Music2, Flame, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[hsl(0_0%_3%)] text-cream/80 border-t border-border/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-ember" />
      <div className="container-px max-w-[1400px] mx-auto py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <div className="font-display text-2xl tracking-wider text-cream">
              KUDDUS<span className="text-primary"> STEAK</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-serif italic text-cream/60 max-w-[260px]">
            "Olovda tug'ilgan ta'm. 2014-yildan beri har bir bo'lak — san'at asari."
          </p>
          <div className="mt-6 text-[10px] tracking-[0.3em] text-gold">EST · 2014</div>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.2em] text-gold mb-5">TEZKOR HAVOLALAR</h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-primary transition-colors" to="/menyu">Menyu</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/bron">Stol band qilish</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/filiallar">Filiallar</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/biz-haqimizda">Biz haqimizda</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.2em] text-gold mb-5">ALOQA</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <a href="tel:+998712001414">+998 71 200 14 14</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@kuddus-steak.uz</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Toshkent, Amir Temur 107</li>
            <li className="text-cream/60">Har kuni 11:00 — 00:00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.2em] text-gold mb-5">IJTIMOIY TARMOQLAR</h4>
          <div className="flex gap-3">
            {[Instagram, Send, Facebook, Music2].map((Ic, i) => (
              <a key={i} href="#" aria-label="social"
                className="h-10 w-10 grid place-items-center border border-border hover:border-primary hover:text-primary transition-all">
                <Ic className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-cream/50">@kuddussteak</p>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-px max-w-[1400px] mx-auto py-5 flex flex-col md:flex-row justify-between items-center text-xs text-cream/50 gap-2">
          <div>© 2026 Kuddus Steak. Barcha huquqlar himoyalangan.</div>
          <div>Premium steakhouse · Toshkent · Samarqand · Buxoro</div>
        </div>
      </div>
    </footer>
  );
}
