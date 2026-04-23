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
      <section className="relative pt-36 pb-12 text-center container-px">
        <div className="text-accent text-xs tracking-[0.5em] mb-4 uppercase">— Biz haqimizda</div>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
          Asrlar an'anasi,{" "}
          <span className="italic text-gradient-gold">qirol dasturxoni</span>
        </h1>
        <div className="gold-divider w-24 mx-auto mt-6" />
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
