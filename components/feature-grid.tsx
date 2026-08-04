"use client";

import {
  Plane,
  Building2,
  TrainFront,
} from "lucide-react";

import FeatureCard from "./feature-card";


export default function FeatureGrid() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">

        
            <FeatureCard
                href="/flight"
                icon={<Plane size={34} />}
                title="Flight Status"
                description="Check live flight status, terminal and departure gate."
            />
      

      <FeatureCard
        href="/services"
        icon={<Building2 size={34} />}
        title="Airport Services"
        description="Find restaurants, lounges, attractions and facilities."
      />

      <FeatureCard
        href="/transport"
        icon={<TrainFront size={34} />}
        title="Transportation"
        description="Explore MRT, taxi, buses and ride-hailing options."
      />

    </section>
  );
}