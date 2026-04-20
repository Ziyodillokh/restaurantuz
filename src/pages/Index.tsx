import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import SignatureGrid from "@/components/site/SignatureGrid";
import BranchesSection from "@/components/site/BranchesSection";
import CTABanner from "@/components/site/CTABanner";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <SignatureGrid />
      <CTABanner />
      <BranchesSection />
    </Layout>
  );
};

export default Index;
