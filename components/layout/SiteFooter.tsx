"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#181A17] text-[#D8D1C5] border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute inset-0 border border-white/30 rounded-xs" />
                <span className="w-3 h-3 bg-[#C65F43] rounded-xs" />
              </div>
              <span className="font-serif text-2xl text-white tracking-tight">
                ColorNest
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A49A8B] font-light leading-relaxed max-w-sm">
              ColorNest Painting Solutions specializes in refined residential transformations, architectural coating systems, and meticulous finish execution.
            </p>

            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#C65F43] bg-white/5 border border-white/10 px-3 py-1 rounded-xs">
                Your Home. Reimagined.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A49A8B]">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-white transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-white transition-colors"
                >
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#why-us"
                  className="hover:text-white transition-colors"
                >
                  Why ColorNest
                </Link>
              </li>
              <li>
                <Link
                  href="#quote"
                  className="hover:text-white transition-colors"
                >
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A49A8B]">
              <li>
                <span className="text-white/80">Interior Wall & Ceiling Coating</span>
              </li>
              <li>
                <span className="text-white/80">Architectural Millwork & Trim</span>
              </li>
              <li>
                <span className="text-white/80">Facade Weatherproofing & Stucco</span>
              </li>
              <li>
                <span className="text-white/80">Commercial Studio & Office Spaces</span>
              </li>
              <li>
                <span className="text-white/80">Custom Color Consultation & Sampling</span>
              </li>
            </ul>
          </div>

          {/* Studio Contact Placeholders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Studio & Service
            </h4>
            <div className="space-y-2 text-xs text-[#A49A8B] font-light">
              <p>Service Area: Regional Metro & Surrounding Counties</p>
              <p>Consultations: Monday — Saturday, by appointment</p>
              <p className="pt-2 text-white/90">
                Inquiries:{" "}
                <Link
                  href="#quote"
                  className="text-[#C65F43] hover:underline"
                >
                  Schedule via online consultation form
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7265] gap-4">
          <p>
            © 2026 ColorNest Painting Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Architectural Finish Standard</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
