import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Bosh sahifa" },
  { to: "/menyu", label: "Menyu" },
  { to: "/bron", label: "Bron" },
  { to: "/biz-haqimizda", label: "Biz haqimizda" },
  { to: "/filiallar", label: "Filiallar" },
  { to: "/aloqa", label: "Aloqa" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || loc.pathname !== "/"
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-px max-w-[1400px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Flame className="h-6 w-6 text-primary group-hover:animate-flicker" />
          <div className="leading-none">
            <div className="font-display text-xl tracking-wider text-cream">
              KUDDUS<span className="text-primary"> STEAK</span>
            </div>
            <div className="text-[9px] tracking-[0.3em] text-gold mt-0.5">EST · 2014</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-sm tracking-wide uppercase transition-colors relative",
                  active ? "text-primary" : "text-cream/80 hover:text-cream"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/bron"
          className="hidden lg:inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-[0.2em] bg-primary text-cream hover:bg-ember transition-all hover:shadow-ember"
        >
          Stol Band Qilish
        </Link>

        <button
          aria-label="Menu"
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile slide-in */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 w-[80%] max-w-sm bg-background border-r border-border z-40 transition-transform duration-500",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-24 px-8 flex flex-col gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-2xl text-cream hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="gold-divider my-4" />
          <Link to="/bron" className="bg-primary text-cream py-3 text-center uppercase tracking-widest text-sm">
            Stol band qilish
          </Link>
          <a href="tel:+998712001414" className="text-gold text-sm tracking-wider">+998 71 200 14 14</a>
        </div>
      </div>
    </header>
  );
}
