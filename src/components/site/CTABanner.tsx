import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSettings } from "@/lib/store";

export default function CTABanner() {
  const s = useSettings();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative container-px max-w-[1400px] mx-auto"
      >
        <div className="max-w-2xl">
          <div className="text-accent text-xs tracking-[0.5em] mb-4 uppercase">— Tajriba sizni kutmoqda</div>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Bugun kechqurun{" "}
            <span className="italic text-gradient-gold">stol band qiling</span>
          </h2>
          <p className="mt-6 text-cream/75 text-lg max-w-lg font-serif-alt italic">
            An'anaviy palov, ko'mirda pishirilgan kabob va jonli atmosfera — sizni kutmoqda.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/bron"
              className="px-8 py-4 bg-accent text-accent-foreground uppercase tracking-[0.3em] text-xs hover:bg-cream transition-all"
            >
              Hoziroq band qilish
            </Link>
            <a
              href={`tel:${s.phone.replace(/\s/g, "")}`}
              className="px-8 py-4 border border-cream/60 text-cream uppercase tracking-[0.3em] text-xs hover:border-accent hover:text-accent transition-all"
            >
              {s.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
