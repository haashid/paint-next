"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  finishes: string[];
  scope: string;
}

const services: ServiceItem[] = [
  {
    id: "interior",
    number: "01",
    title: "Interior Painting",
    description:
      "Transform your interiors with beautifully applied finishes and careful attention to every detail.",
    image: "/images/service-interior.jpg",
    features: [
      "Plaster & drywall micro-leveling",
      "Precision cut lines along architectural trim",
      "Dust containment & protective masking",
      "Low-VOC & odorless architectural coatings",
    ],
    finishes: ["Velvet Matte", "Subtle Eggshell", "Satin Enamel", "Cabinet Lacquer"],
    scope: "Living spaces, high ceilings, custom millwork, kitchens & fine architectural details.",
  },
  {
    id: "exterior",
    number: "02",
    title: "Exterior Painting",
    description:
      "Protect and refresh your property's exterior with a clean, lasting finish.",
    image: "/images/service-exterior.jpg",
    features: [
      "Comprehensive pressure wash & surface cleaning",
      "Elastomeric masonry caulking & crack sealing",
      "Weather-resistant primer application",
      "UV-inhibiting exterior architectural acrylics",
    ],
    finishes: ["Low-Lustre Stucco", "Satin Wood Cladding", "Matte Architectural Metal", "Deck Preservative"],
    scope: "Stucco, cedar siding, aluminum fascia, entrance doors, perimeter fences & porticos.",
  },
  {
    id: "commercial",
    number: "03",
    title: "Commercial Painting",
    description:
      "Professional painting solutions for offices, retail spaces, and commercial environments.",
    image: "/images/service-commercial.jpg",
    features: [
      "Flexible evening & weekend scheduling",
      "High-traffic scrubbable wall coatings",
      "Bespoke brand palette matching",
      "Strict deadline adherence & minimal disruption",
    ],
    finishes: ["High-Performance Scuff-X", "Acoustic Baffle Coatings", "Industrial Epoxy", "Feature Wall Washes"],
    scope: "Creative agency studios, executive offices, retail flagship boutiques & hospitality interiors.",
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const scrollToQuoteWithService = (serviceTitle: string) => {
    setSelectedService(null);
    const quoteEl = document.getElementById("quote");
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" });
      const selectEl = document.getElementById("service-type") as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = serviceTitle;
        selectEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F6F3ED] text-[#20231F] py-24 sm:py-32 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#D8D1C5]">
            <SectionHeading
              label="WHAT WE DO"
              title="Complete Painting Solutions for Every Space."
              subtitle="Architectural finishes tailored to residential and commercial spaces, backed by disciplined preparation and artisan execution."
            />
            <div className="mt-6 md:mt-0">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7A7265]">
                [03 Core Disciplines]
              </span>
            </div>
          </div>
        </Reveal>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 150}
              direction="up"
              className="flex"
            >
              <article className="group flex flex-col w-full bg-[#FAF8F5] border border-[#D8D1C5] rounded-sm overflow-hidden transition-all duration-300 hover:border-[#C65F43] hover:-translate-y-2 hover:shadow-xl">
                {/* Image Container with smooth hover zoom */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EBE7DF]">
                  <Image
                    src={service.image}
                    alt={`${service.title} by ColorNest Painting Solutions`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#20231F]/80 backdrop-blur-sm text-white text-xs font-mono tracking-wider border border-white/10 rounded-xs">
                    {service.number}
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#20231F] font-normal tracking-tight mb-3 transition-colors duration-200 group-hover:text-[#C65F43]">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#5A5750] font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Highlights list */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-xs text-[#5A5750] flex items-start gap-2.5"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#C65F43] mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-6 border-t border-[#D8D1C5]/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-medium uppercase tracking-wider text-[#20231F] hover:text-[#C65F43] flex items-center gap-1.5 transition-all group-hover:gap-2.5 cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToQuoteWithService(service.title)}
                      className="p-2 rounded-full text-[#20231F] hover:text-[#C65F43] hover:bg-[#D8D1C5]/30 transition-all cursor-pointer"
                      aria-label={`Request quote for ${service.title}`}
                    >
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Service Specification Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-spec-title"
        >
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#D8D1C5] rounded-sm shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-6 border-b border-[#D8D1C5]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C65F43]">
                  Service Detail — {selectedService.number}
                </span>
                <h3
                  id="service-spec-title"
                  className="font-serif text-3xl text-[#20231F] font-normal mt-1"
                >
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="p-2 text-[#7A7265] hover:text-[#20231F] hover:bg-[#D8D1C5]/40 rounded-sm cursor-pointer"
                aria-label="Close specifications modal"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-6 text-[#20231F]">
              <p className="text-base text-[#5A5750] leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#20231F] mb-3">
                  Scope of Application
                </h4>
                <p className="text-sm text-[#5A5750] bg-[#F6F3ED] p-4 rounded-xs border border-[#D8D1C5]">
                  {selectedService.scope}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#20231F] mb-3">
                  Key Preparation & Finishing Protocols
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#5A5750] flex items-center gap-2 p-2.5 bg-white rounded-xs border border-[#D8D1C5]/60"
                    >
                      <CheckCircle2 size={14} className="text-[#C65F43] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#20231F] mb-3">
                  Recommended Sheens & Finishes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.finishes.map((finish, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-[#D8D1C5]/40 text-[#20231F] rounded-full border border-[#D8D1C5]"
                    >
                      {finish}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8D1C5] flex flex-wrap items-center justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedService(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                showArrow
                onClick={() => scrollToQuoteWithService(selectedService.title)}
              >
                Inquire About This Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
