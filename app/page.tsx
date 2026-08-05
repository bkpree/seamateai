import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeatureGrid from "@/components/feature-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <Hero />

      <FeatureGrid />

    </main>
  );
}