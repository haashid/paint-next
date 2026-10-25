"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "ColorNest approached our home with the precision of architectural restorers. The way they prepared the uneven plaster walls and edged along our historic crown molding made the spaces feel renewed without losing their character.",
    author: "E. Vance & M. Vance",
    role: "Homeowners",
    project: "Oakridge Residence Interior",
  },
  {
    id: "t2",
    quote:
      "As an interior designer, my biggest anxiety is how paint will execute in reality versus swatch boards. ColorNest's color sampling discipline and crisp lines between different dark wall finishes gave our design complete justice.",
    author: "Claire Hastings",
    role: "Principal Interior Architect",
    project: "Studio Koir Design Suite",
  },
  {
    id: "t3",
    quote:
      "From daily dust containment to the final walkthrough under raking inspection lights, their team proved that professional painting is an architectural craft rather than a hasty contractor job.",
    author: "David L.",
    role: "Residential Client",
    project: "Bel-Air Facade Restoration",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative w-full bg-[#FAF8F5] text-[#20231F] py-24 sm:py-32 px-6 sm:px-12 lg:px-24 border-b border-[#D8D1C5]">
      <div className="max-w-7xl mx-auto">
        <Reveal delay={0} direction="up">
          <div className="mb-16 sm:mb-20">
            <SectionHeading
              label="CLIENT PERSPECTIVES"
              title="The Impact of Meticulous Work."
              subtitle="Reflections on our collaborative process, craftsmanship discipline, and the enduring quality of our architectural finishes."
            />
          </div>
        </Reveal>

        {/* Editorial Quotation Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 150}
              direction="up"
              className="flex"
            >
              <div className="group flex flex-col justify-between w-full p-8 sm:p-10 bg-[#F6F3ED] border border-[#D8D1C5] rounded-sm relative hover:border-[#C65F43] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                {/* Refined Serif Quotation Mark */}
                <span
                  className="font-serif text-6xl text-[#C65F43]/30 leading-none select-none block mb-2 transition-transform duration-300 group-hover:scale-115 group-hover:text-[#C65F43]/60"
                  aria-hidden="true"
                >
                  “
                </span>

                <p className="font-serif text-lg sm:text-xl text-[#20231F] font-normal leading-relaxed mb-8 flex-1">
                  {item.quote}
                </p>

                <div className="pt-6 border-t border-[#D8D1C5]/60">
                  <p className="font-medium text-sm text-[#20231F]">
                    {item.author}
                  </p>
                  <p className="text-xs text-[#7A7265] mt-0.5">
                    {item.role} · <span className="italic">{item.project}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xs text-[#7A7265] mt-12 font-light">
          * Representative project reflections provided for demonstration purposes. We treat every client’s residence and privacy with strict confidentiality.
        </p>
      </div>
    </section>
  );
}
