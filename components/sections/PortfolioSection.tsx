"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface ProjectItem {
  id: string;
  title: string;
  category: "interior" | "exterior" | "commercial" | "detail";
  categoryLabel: string;
  location: string;
  finish: string;
  image: string;
  aspect: string;
  palette: string[];
  description: string;
}

const projects: ProjectItem[] = [
  {
    id: "oakridge-estate",
    title: "The Oakridge Residence",
    category: "interior",
    categoryLabel: "Interior Transformation",
    location: "Oakridge Hills",
    finish: "Velvet Eggshell & Satin Millwork",
    image: "/images/service-interior.jpg",
    aspect: "aspect-[4/3]",
    palette: ["#F6F3ED", "#A49A8B", "#FAF8F5", "#20231F"],
    description:
      "A complete floor-to-ceiling restoration of high architectural living spaces. Walls finished in custom warm ivory with muted taupe accents and natural light optimization.",
  },
  {
    id: "bel-air-contemporary",
    title: "The Bel-Air Contemporary",
    category: "exterior",
    categoryLabel: "Exterior Architecture",
    location: "Canyon Ridge",
    finish: "Architectural Elastomeric & Cedar Stain",
    image: "/images/service-exterior.jpg",
    aspect: "aspect-[16/10]",
    palette: ["#20231F", "#FAF8F5", "#C65F43", "#D8D1C5"],
    description:
      "Multi-level facade coating integrating smooth charcoal accent blocks with warm ivory stucco and weather-resistant cedar stain, engineered for long-term UV resistance.",
  },
  {
    id: "studio-koir",
    title: "Studio Koir Creative Offices",
    category: "commercial",
    categoryLabel: "Commercial Interior",
    location: "Design District",
    finish: "Scuff-X Matte Charcoal & Mineral Wash",
    image: "/images/service-commercial.jpg",
    aspect: "aspect-[16/10]",
    palette: ["#28302A", "#D8D1C5", "#20231F", "#F6F3ED"],
    description:
      "Modern agency workspace painted in deep forest charcoal with textured mineral wash feature walls and crisp architectural lines dividing collaborative studio spaces.",
  },
  {
    id: "artisan-millwork",
    title: "Crown & Millwork Precision Detail",
    category: "detail",
    categoryLabel: "Artisan Craftsmanship",
    location: "Bespoke Residence",
    finish: "High-Gloss Trim & Zero-Brushstroke Hand Cut",
    image: "/images/craft-detail.jpg",
    aspect: "aspect-[4/3]",
    palette: ["#FFFFFF", "#F6F3ED", "#D8D1C5"],
    description:
      "Macro-level inspection of hand-brushed crown molding. Illustrates ColorNest's zero-bleed edge tape discipline and immaculate enamel flow.",
  },
  {
    id: "modern-culinary",
    title: "The Culinary Pavilion",
    category: "interior",
    categoryLabel: "Interior Finishes",
    location: "Westwood Terrace",
    finish: "Sage Cabinet Lacquer & Eggshell Walls",
    image: "/images/project-kitchen.jpg",
    aspect: "aspect-[4/3]",
    palette: ["#FAF8F5", "#28302A", "#D8D1C5", "#A49A8B"],
    description:
      "Cabinetry respray and wall transformation pairing soft sage green with warm ivory plaster sheens to balance marble and natural oak.",
  },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="relative w-full bg-[#FAF8F5] text-[#20231F] py-24 sm:py-32 px-6 sm:px-12 lg:px-24 border-b border-[#D8D1C5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal delay={0} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D8D1C5]">
            <SectionHeading
              label="SELECTED PROJECTS"
              title={
                <>
                  Real Transformations.
                  <br />
                  Real Results.
                </>
              }
              subtitle="Explore our curated portfolio of residential and commercial spaces, showcasing the enduring power of precision painting."
            />

            {/* Filter Pills: Horizontal scroll on mobile, wrap on desktop */}
            <div
              className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto no-scrollbar pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap"
              role="tablist"
            >
              {[
                { id: "all", label: "All Projects" },
                { id: "interior", label: "Interiors" },
                { id: "exterior", label: "Exteriors" },
                { id: "commercial", label: "Commercial" },
                { id: "detail", label: "Craft Detail" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xs transition-all cursor-pointer font-medium whitespace-nowrap shrink-0 ${
                    activeFilter === tab.id
                      ? "bg-[#20231F] text-[#FAF8F5] shadow-xs"
                      : "bg-[#F6F3ED] text-[#7A7265] hover:text-[#20231F] border border-[#D8D1C5]/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ==================================================== */}
        {/* SIGNATURE BEFORE / AFTER TRANSFORMATION SPOTLIGHT     */}
        {/* ==================================================== */}
        <Reveal delay={100} direction="up">
          <div className="mb-24 p-6 sm:p-10 bg-[#F6F3ED] border border-[#D8D1C5] rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C65F43] block mb-1">
                  Interactive Case Study
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#20231F] font-normal">
                  Living Space Restoration — Before & After
                </h3>
              </div>
              <p className="text-xs text-[#7A7265] mt-2 md:mt-0 max-w-sm">
                Drag the central divider to witness the transition from weathered plaster to pristine warm ivory.
              </p>
            </div>

            {/* Smooth Draggable Slider */}
            <BeforeAfterSlider
              beforeImage="/images/before-transformation.jpg"
              afterImage="/images/after-transformation.jpg"
              beforeLabel="Before: Scuffed & Worn"
              afterLabel="After: Flawless Warm Ivory"
              initialPosition={50}
            />

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#7A7265] pt-4 border-t border-[#D8D1C5]/60">
              <span>Room Perspective: Living Salon & Entryway Column</span>
              <span>Finishes: Warm Ivory Matte + Satin Super White Trim</span>
            </div>
          </div>
        </Reveal>

        {/* ==================================================== */}
        {/* ASYMMETRICAL EDITORIAL PROJECT GRID                  */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const colSpan =
              idx === 0
                ? "lg:col-span-7"
                : idx === 1
                ? "lg:col-span-5"
                : idx === 2
                ? "lg:col-span-5"
                : idx === 3
                ? "lg:col-span-7"
                : "lg:col-span-12";

            return (
              <Reveal
                key={project.id}
                delay={(idx % 3) * 120}
                direction="up"
                className={`${colSpan} flex`}
              >
                <div
                  className="w-full group cursor-pointer flex flex-col bg-white border border-[#D8D1C5] rounded-sm overflow-hidden hover:border-[#C65F43] hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`relative w-full ${project.aspect} overflow-hidden bg-[#EBE7DF]`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#20231F]/80 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest font-mono rounded-xs border border-white/10">
                      {project.categoryLabel}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#7A7265] mb-2 font-mono uppercase tracking-wider">
                        <span>{project.location}</span>
                        <span>{project.finish.split("&")[0]}</span>
                      </div>

                      <h4 className="font-serif text-2xl text-[#20231F] font-normal group-hover:text-[#C65F43] transition-colors">
                        {project.title}
                      </h4>

                      <p className="mt-2 text-xs sm:text-sm text-[#5A5750] font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Palette Swatches */}
                    <div className="mt-6 pt-4 border-t border-[#D8D1C5]/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#7A7265] mr-1">
                          Palette:
                        </span>
                        {project.palette.map((hex, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs transition-transform duration-200 group-hover:scale-115"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>

                      <span className="text-xs font-medium text-[#C65F43] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                        View Project Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sample Demonstration Notice */}
        <p className="text-center text-xs text-[#7A7265] mt-16 font-light">
          * Illustrative portfolio curation demonstrating ColorNest architectural finishes, surface treatments, and color methodologies.
        </p>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#D8D1C5] rounded-sm shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-6 border-b border-[#D8D1C5]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C65F43]">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="font-serif text-3xl text-[#20231F] font-normal mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 text-[#7A7265] hover:text-[#20231F] hover:bg-[#D8D1C5]/40 rounded-sm cursor-pointer"
                aria-label="Close project modal"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-[#D8D1C5]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-base text-[#5A5750] leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F6F3ED] p-4 rounded-xs border border-[#D8D1C5]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#20231F] block mb-1">
                    Finish Specification
                  </span>
                  <span className="text-sm text-[#5A5750]">
                    {selectedProject.finish}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#20231F] block mb-1">
                    Location & Space Type
                  </span>
                  <span className="text-sm text-[#5A5750]">
                    {selectedProject.location}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#20231F] block mb-2">
                  Architectural Color Swatches
                </span>
                <div className="flex items-center gap-3">
                  {selectedProject.palette.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span
                        className="w-8 h-8 rounded-full border border-black/15 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] font-mono text-[#7A7265]">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8D1C5] flex justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                showArrow
                onClick={() => {
                  setSelectedProject(null);
                  document
                    .getElementById("quote")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Inquire for Similar Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
