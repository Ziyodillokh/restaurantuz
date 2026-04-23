import { Link } from "react-router-dom";
import { Instagram, Send, Facebook, Music2, MapPin, Phone, Mail } from "lucide-react";
import { useSettings } from "@/lib/store";
import Brandmark from "./Brandmark";

export default function Footer() {
  const s = useSettings();
  return (
    <footer className="relative bg-[hsl(0_0%_3%)] text-cream/80 border-t border-accent/15">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-gold" />
      <div className="container-px max-w-[1500px] mx-auto py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Brandmark />
          <p className="mt-5 text-sm font-serif-alt italic text-cream/60 max-w-[280px]">
            "{s.tagline}"
          </p>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.3em] text-accent mb-5 uppercase">
            Tezkor havolalar
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-accent transition-colors" to="/menyu">Menyu</Link></li>
            <li><Link className="hover:text-accent transition-colors" to="/bron">Stol band qilish</Link></li>
            <li><Link className="hover:text-accent transition-colors" to="/filiallar">Filiallar</Link></li>
            <li><Link className="hover:text-accent transition-colors" to="/biz-haqimizda">Biz haqimizda</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.3em] text-accent mb-5 uppercase">Aloqa</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-accent">{s.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href={`mailto:${s.email}`} className="hover:text-accent">{s.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-accent mt-0.5" /> {s.address}
            </li>
            <li className="text-cream/60">{s.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-accent text-sm tracking-[0.3em] text-accent mb-5 uppercase">
            Ijtimoiy tarmoqlar
          </h4>
          <div className="flex gap-3">
            {[
              { href: s.instagram || "#", icon: Instagram, label: "Instagram" },
              { href: s.telegram || "#", icon: Send, label: "Telegram" },
              { href: "#", icon: Facebook, label: "Facebook" },
              { href: "#", icon: Music2, label: "TikTok" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center border border-border hover:border-accent hover:text-accent transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-cream/50">@imron.restoran</p>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-px max-w-[1500px] mx-auto py-5 flex flex-col md:flex-row justify-between items-center text-xs text-cream/50 gap-2">
          <div>© {new Date().getFullYear()} {s.name}. Barcha huquqlar himoyalangan.</div>
          <div>An'anaviy o'zbek restorani · Toshkent · Samarqand · Buxoro</div>
        </div>
      </div>
    </footer>
  );
}
