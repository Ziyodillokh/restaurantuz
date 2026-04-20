import Layout from "@/components/site/Layout";
import BranchesSection from "@/components/site/BranchesSection";

export default function BranchesPage() {
  return (
    <Layout>
      <section className="relative pt-32 pb-10">
        <div className="container-px max-w-[1400px] mx-auto text-center">
          <div className="text-gold text-xs tracking-[0.4em] mb-4">— FILIALLAR</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream">
            Sizga <span className="italic text-gradient-ember">yaqin</span>
          </h1>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">4 ta shahar, 4 ta unutilmas tajriba. O'zingizga eng qulay manzilni tanlang.</p>
        </div>
      </section>
      <BranchesSection />
    </Layout>
  );
}
