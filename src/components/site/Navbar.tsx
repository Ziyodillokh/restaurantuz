import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/store";
import Brandmark from "./Brandmark";

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
  const settings = useSettings();

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
          ? "bg-background/90 backdrop-blur-xl border-b border-accent/15 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-px max-w-[1500px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Brandmark variant="compact" className="group-hover:opacity-90 transition-opacity" />
          <div className="hidden sm:block leading-none">
            <div className="text-[9px] tracking-[0.45em] text-accent/80 mt-0.5 uppercase">
              {settings.tagline.split(".")[0]}
            </div>
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
                  "link-underline text-[12px] tracking-[0.3em] uppercase transition-colors",
                  active ? "text-accent is-active" : "text-cream/85 hover:text-cream"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/bron"
          className="hidden lg:inline-flex items-center px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] bg-accent text-accent-foreground hover:bg-cream transition-all"
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
          "lg:hidden fixed inset-y-0 left-0 w-[82%] max-w-sm bg-background border-r border-accent/15 z-40 transition-transform duration-500",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-10 px-8">
          <Brandmark />
        </div>
        <div className="mt-8 px-8 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-2xl text-cream hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="gold-divider my-4" />
          <Link
            to="/bron"
            className="bg-accent text-accent-foreground py-3 text-center uppercase tracking-[0.3em] text-xs"
          >
            Stol band qilish
          </Link>
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="text-accent text-sm tracking-[0.2em]"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
