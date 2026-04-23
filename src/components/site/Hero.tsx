import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSettings } from "@/lib/store";
import Brandmark from "./Brandmark";

export default function Hero() {
  const s = useSettings();
  const titleParts = s.heroTitle.trim().split(" ");
  const titleHead = titleParts.slice(0, -1).join(" ");
  const titleTail = titleParts.slice(-1)[0] || "";

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Image background — palov hero */}
      <img
        src={s.heroPoster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        poster={s.heroPoster}
      >
        <source
          src="https://videos.pexels.com/video-files/4252097/4252097-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(0_0%_0%/0.7)_100%)]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <Brandmark variant="medallion" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-accent text-[11px] md:text-xs tracking-[0.55em] mt-6 uppercase"
        >
          — Premium o'zbek restorani —
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] max-w-5xl mt-4"
        >
          {titleHead}{" "}
          <span className="italic text-gradient-gold">{titleTail}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-6 max-w-xl text-base md:text-lg text-cream/80 font-serif-alt italic"
        >
          {s.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/bron"
            className="px-8 py-4 bg-accent text-accent-foreground uppercase tracking-[0.3em] text-xs hover:bg-cream transition-all hover:scale-[1.02]"
          >
            Stol Band Qilish
          </Link>
          <Link
            to="/menyu"
            className="px-8 py-4 border border-cream/60 text-cream uppercase tracking-[0.3em] text-xs hover:border-accent hover:text-accent transition-all"
          >
            Menyuni Ko'rish
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">Pastga</span>
        <div className="h-10 w-px bg-cream/30 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-3 bg-accent animate-scroll-down" />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
