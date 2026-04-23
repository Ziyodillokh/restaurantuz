import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const dur = 1600;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            setN(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="font-accent text-5xl md:text-6xl text-gradient-gold">
      {n}
      {suffix}
    </div>
  );
}

const stats = [
  { v: 25, s: "+", l: "Yillik tajriba" },
  { v: 80, s: "K+", l: "Mamnun mehmonlar" },
  { v: 40, s: "+", l: "Milliy taom" },
  { v: 4, s: "", l: "Filial" },
];

export default function About() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden royal-frame">
            <img
              src="https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=1200&q=80"
              alt="An'anaviy o'zbek palovi"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-accent text-accent-foreground px-6 py-4 royal-glow">
            <div className="font-accent text-3xl leading-none">SINCE</div>
            <div className="text-[10px] tracking-[0.3em] mt-1">DASTURXON USTASI</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="text-accent text-xs tracking-[0.5em] mb-4 uppercase">
            — Bizning hikoyamiz
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
            Asrlar an'anasi,{" "}
            <span className="italic text-gradient-gold">qirol mehmondo'stligi</span>
          </h2>
          <div className="gold-divider my-8 w-24" />
          <div className="space-y-4 text-cream/75 text-base md:text-lg leading-relaxed font-serif-alt">
            <p>
              Imron Restoran — O'zbekistonning eng boy taom an'analarini bir dasturxonga jamlagan
              joy. Bizda Toshkent palovidan tortib Buxoro patiri, Samarqand kabobidan tortib
              Andijon mantilarigacha — har bir mintaqaning o'z ovozi bor.
            </p>
            <p>
              Faqat eng yaxshi mahsulotlar, qadimiy retseptlar va oshpazlarimizning mahorati —
              har bir kelganni mehmon emas, qirol kabi kutib olamiz.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="border-t border-accent/30 pt-4">
                <Counter to={s.v} suffix={s.s} />
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-cream/60">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
