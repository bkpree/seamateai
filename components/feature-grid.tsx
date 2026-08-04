"use client";

import {
  Plane
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

    </section>
  );
}