import {
  Plane
} from "lucide-react";

import FeatureCard from "./feature-card";


export default function FeatureGrid() {
  return (
    <section className="mx-auto flex max-w-6xl justify-center px-6 pb-20">
      <div className="w-full max-w-md">
        <FeatureCard
          href="/flight"
          icon={<Plane size={34} />}
          title="Flight Status"
          description="Check live flight status, terminal, gate, and baggage information."
        />
      </div>
    </section>
  );
}