"use client";

import React from "react";
import Reveal from "../ui/Reveal";

export default function TransitionSection() {
  return (
    <section className="relative w-full bg-[#F6F3ED] text-[#20231F] py-24 sm:py-32 px-6 sm:px-12 lg:px-24 border-b border-[#D8D1C5]/60 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated architectural divider */}
        <Reveal delay={0} direction="none">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-[#D8D1C5]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#C65F43]" />
            <span className="w-16 h-px bg-[#D8D1C5]" />
          </div>
        </Reveal>

        <Reveal delay={150} direction="up">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-[#20231F] mb-6">
            Beautiful spaces begin with the right finish.
          </h2>
        </Reveal>

        <Reveal delay={300} direction="up">
          <p className="text-lg sm:text-xl text-[#5A5750] font-light leading-relaxed max-w-2xl mx-auto">
            From careful preparation to the final coat, every detail matters.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
