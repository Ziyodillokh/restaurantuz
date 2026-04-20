import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dishes, formatSom } from "@/data/menu";

const featured = dishes.filter(d => d.category === "premium");

export default function SignatureGrid() {
  return (
    <section className="py-24 md:py-32 bg-gradient-dark relative">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-gold text-xs tracking-[0.4em] mb-4">— SIGNATURE STEYKLAR</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream">
            Bizning <span className="italic text-gradient-ember">ifrat</span>imiz
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {featured.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative overflow-hidden border border-border hover:border-primary/60 transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-gold font-accent text-sm tracking-[0.3em]">{d.weight}</div>
                <h3 className="font-display text-2xl md:text-3xl text-cream mt-1">{d.name}</h3>
                <p className="text-cream/70 text-sm font-serif italic mt-2 line-clamp-2">{d.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="font-accent text-xl text-primary">{formatSom(d.price)}</div>
                  <Link to="/bron" state={{ dish: d.id }} className="text-xs uppercase tracking-[0.2em] text-cream/80 hover:text-primary border-b border-cream/30 hover:border-primary pb-0.5">
                    Buyurtma
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/menyu"
            className="inline-flex items-center px-10 py-4 border border-gold/60 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-background transition-all"
          >
            To'liq menyuni ochish
          </Link>
        </div>
      </div>
    </section>
  );
}
