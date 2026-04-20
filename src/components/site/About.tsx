import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
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
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="font-accent text-5xl md:text-6xl text-gradient-ember">
      {n}
      {suffix}
    </div>
  );
}

const stats = [
  { v: 10, s: "+", l: "Yillik tajriba" },
  { v: 50, s: "K+", l: "Mamnun mijozlar" },
  { v: 12, s: "", l: "Steyk turlari" },
  { v: 5, s: "★", l: "Reyting" },
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
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&w=900&q=80"
              alt="Oshpaz steykni tutatayotgan holatda"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-cream px-6 py-4 shadow-ember">
            <div className="font-accent text-3xl leading-none">2014</div>
            <div className="text-[10px] tracking-[0.3em] mt-1">SINCE</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="text-gold text-xs tracking-[0.4em] mb-4">— BIZNING HIKOYAMIZ</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
            10 yildan ziyod{" "}
            <span className="italic text-gradient-ember">olov va san'at</span>
          </h2>
          <div className="gold-divider my-8 w-24" />
          <div className="space-y-4 text-cream/75 text-base md:text-lg leading-relaxed">
            <p>
              2014-yilda Toshkent markazida tug'ilgan Kuddus Steak — bugun mamlakatdagi premium steakhouse'lar
              orasida o'zining alohida o'rniga ega. Biz har bir bo'lakni san'at asari deb bilamiz.
            </p>
            <p>
              Faqat eng yuqori navli marmar go'sht, an'anaviy mahorat va zamonaviy texnika uyg'unligi —
              bu bizning falsafamiz. Olov, tutun va vaqt — uchta asosiy ingredient.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="border-t border-border pt-4">
                <Counter to={s.v} suffix={s.s} />
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-cream/60">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
