import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSettings } from "@/lib/store";

export default function Hero() {
  const s = useSettings();
  // Split the hero title so we can emphasize the last word in italic + gradient
  const titleParts = s.heroTitle.trim().split(" ");
  const titleHead = titleParts.slice(0, -1).join(" ");
  const titleTail = titleParts.slice(-1)[0] || "";

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={s.heroPoster}
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-grilling-a-steak-on-the-flame-9275/1080p.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3296229/3296229-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(0_0%_0%/0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gold text-xs md:text-sm tracking-[0.5em] mb-6"
        >
          — EST · 2014 —
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] max-w-5xl"
        >
          {titleHead}{" "}
          <span className="italic text-gradient-ember">{titleTail}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 max-w-xl text-base md:text-lg text-cream/80 font-serif italic"
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
            className="px-8 py-4 bg-primary text-cream uppercase tracking-[0.25em] text-xs hover:bg-ember hover:shadow-ember transition-all hover:scale-[1.03]"
          >
            Stol Band Qilish
          </Link>
          <Link
            to="/menyu"
            className="px-8 py-4 border border-cream/60 text-cream uppercase tracking-[0.25em] text-xs hover:border-cream hover:bg-cream/5 transition-all"
          >
            Menyuni Ko'rish
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">Pastga</span>
        <div className="h-10 w-px bg-cream/30 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-3 bg-primary animate-scroll-down" />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
