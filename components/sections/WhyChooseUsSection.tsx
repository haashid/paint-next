"use client";

import React from "react";
import { ShieldCheck, Sparkles, Paintbrush, Clock } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

interface Principle {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string;
  icon: React.ElementType;
}

const principles: Principle[] = [
  {
    id: "prep",
    number: "01",
    title: "Quality Preparation",
    description:
      "Every surface receives the preparation needed for a professional finish.",
    details:
      "A flawless topcoat is only as durable as the substrate beneath it. We meticulously wash, scrape, spackle, sand, and prime every square inch before paint touches the surface.",
    icon: ShieldCheck,
  },
  {
    id: "detail",
    number: "02",
    title: "Attention to Detail",
    description: "Clean edges, consistent coverage, and careful execution.",
    details:
      "From razor-sharp cutting lines along historic crown moldings to uniform roller stipple with zero lap marks, our craftsmen adhere to uncompromised architectural tolerances.",
    icon: Sparkles,
  },
  {
    id: "materials",
    number: "03",
    title: "Quality Materials",
    description:
      "Appropriate paints and finishes selected for the surface and project.",
    details:
      "We exclusively specify premium low-VOC architectural coatings formulated with durable pigments and high solids, ensuring authentic color depth and scrub resistance.",
    icon: Paintbrush,
  },
  {
    id: "service",
    number: "04",
    title: "Reliable Service",
    description:
      "Clear communication and a professional approach from start to finish.",
    details:
      "We maintain prompt scheduling, respect your living space with complete dust-containment barriers, conduct daily clean-ups, and provide transparent written scopes.",
    icon: Clock,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      className="relative w-full bg-[#F6F3ED] text-[#20231F] py-24 sm:py-32 px-6 sm:px-12 lg:px-24 border-b border-[#D8D1C5]"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal delay={0} direction="up">
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              label="OUR FOUNDATION"
              title="More Than Just a Fresh Coat of Paint."
              subtitle="The difference between ordinary painting and architectural transformation lies in the unseen discipline of preparation, material integrity, and patient craftsmanship."
            />
          </div>
        </Reveal>

        {/* 4 Architectural Principles Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal
                key={principle.id}
                delay={index * 120}
                direction="up"
                className="flex"
              >
                <div className="group flex flex-col justify-between w-full p-8 bg-[#FAF8F5] border border-[#D8D1C5] rounded-sm transition-all duration-300 hover:border-[#C65F43] hover:-translate-y-2 hover:shadow-xl">
                  <div>
                    {/* Top Bar with Number and Icon */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D8D1C5]/60">
                      <span className="font-mono text-xs text-[#7A7265] tracking-widest uppercase">
                        [{principle.number}]
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#F6F3ED] border border-[#D8D1C5] flex items-center justify-center text-[#20231F] group-hover:text-[#C65F43] group-hover:border-[#C65F43] group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-[#20231F] font-normal mb-3 group-hover:text-[#C65F43] transition-colors">
                      {principle.title}
                    </h3>

                    <p className="text-sm font-medium text-[#20231F] leading-snug mb-4">
                      {principle.description}
                    </p>

                    <p className="text-xs text-[#5A5750] font-light leading-relaxed">
                      {principle.details}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#D8D1C5]/40 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65F43] transition-transform duration-300 group-hover:scale-150" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7265]">
                      Strict Craft Protocol
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
