import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative container-px max-w-[1400px] mx-auto"
      >
        <div className="max-w-2xl">
          <div className="text-gold text-xs tracking-[0.4em] mb-4">— TAJRIBANI BOSHLANG</div>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Bugun kechqurun{" "}
            <span className="italic text-gradient-ember">stol band qiling</span>
          </h2>
          <p className="mt-6 text-cream/70 text-lg max-w-lg font-serif italic">
            Olovda pishirilgan steyk, jonli atmosfera va unutilmas kecha — siz uchun tayyor.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/bron" className="px-8 py-4 bg-primary text-cream uppercase tracking-[0.25em] text-xs hover:bg-ember hover:shadow-ember transition-all">
              Hoziroq band qilish
            </Link>
            <a href="tel:+998712001414" className="px-8 py-4 border border-cream/60 text-cream uppercase tracking-[0.25em] text-xs hover:bg-cream/5">
              +998 71 200 14 14
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
