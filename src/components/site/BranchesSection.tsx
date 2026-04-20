import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { branches } from "@/data/menu";

export default function BranchesSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.4em] mb-4">— FILIALLARIMIZ</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream">
            Bizni <span className="italic text-gradient-ember">toping</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {branches.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex gap-5 p-5 border border-border hover:border-primary/60 hover:shadow-ember/30 hover:-translate-y-1 transition-all bg-card"
              >
                <div className="w-28 h-28 shrink-0 overflow-hidden">
                  <img src={b.image} alt={b.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-cream">{b.name}</h3>
                  <div className="mt-2 space-y-1.5 text-sm text-cream/70">
                    <div className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" /> {b.address}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary shrink-0" /> Har kuni 11:00 — 00:00</div>
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-3.5 w-3.5 text-primary shrink-0" /> {b.phone}</a>
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${b.coords[0]},${b.coords[1]}`}
                    target="_blank" rel="noreferrer"
                    className="inline-block mt-3 text-xs uppercase tracking-[0.2em] text-gold border-b border-gold/50 hover:border-gold pb-0.5"
                  >
                    Yo'l ko'rsatish →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder (dark styled) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[500px] border border-border overflow-hidden bg-[hsl(0_0%_8%)]"
          >
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=64.0%2C39.0%2C70.5%2C42.0&layer=mapnik"
              className="absolute inset-0 w-full h-full grayscale contrast-[1.2] opacity-80"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background/60 via-transparent to-background/60 mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 right-4 glass-dark p-4 text-xs text-cream/70">
              Manzilni Google Maps'da ko'rish uchun yuqoridagi "Yo'l ko'rsatish" tugmasini bosing.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
