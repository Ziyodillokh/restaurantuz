import Layout from "@/components/site/Layout";
import About from "@/components/site/About";
import { motion } from "framer-motion";

const team = [
  { name: "Kuddus Aka", role: "Bosh oshpaz va asoschi", img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80" },
  { name: "Sardor Karimov", role: "Grill master", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80" },
  { name: "Aziza Yusupova", role: "Sommelier", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80" },
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grid place-items-center text-center container-px">
          <div>
            <div className="text-gold text-xs tracking-[0.4em] mb-4">— BIZ HAQIMIZDA</div>
            <h1 className="font-display text-5xl md:text-7xl text-cream">
              Olov ortida{" "}
              <span className="italic text-gradient-ember">tarix</span>
            </h1>
          </div>
        </div>
      </section>

      <About />

      <section className="py-24 bg-gradient-dark">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.4em] mb-4">— BIZNING JAMOA</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream">Olov ortidagi <span className="italic text-gradient-ember">san'atkorlar</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden border border-border">
                  <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <h3 className="font-display text-2xl text-cream mt-5">{m.name}</h3>
                <div className="text-gold text-xs tracking-[0.3em] mt-1 uppercase">{m.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
