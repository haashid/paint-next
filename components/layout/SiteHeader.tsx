"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#quote" },
];

export default function SiteHeader() {
  // isPastHero determines whether we have exited the pinned cinematic hero
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // The hero is exited when its bottom is near the top of the viewport
        setIsPastHero(heroRect.bottom <= 120);
      }

      // Track active section for indicator
      const sections = ["hero", "services", "portfolio", "why-us", "quote"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isPastHero
            ? "bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#D8D1C5]/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3.5"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="ColorNest Painting Solutions - Back to top"
          >
            {/* Architectural Paint Nest Symbol */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <span
                className={`absolute inset-0 rounded-xs transition-colors duration-300 ${
                  isPastHero
                    ? "border border-[#20231F]/30 group-hover:border-[#C65F43]"
                    : "border border-white/40 group-hover:border-white"
                }`}
              />
              <span
                className={`w-3.5 h-3.5 rounded-[1px] transition-all duration-300 transform group-hover:rotate-45 ${
                  isPastHero
                    ? "bg-[#C65F43]"
                    : "bg-[#C65F43] group-hover:bg-white"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${
                  isPastHero ? "text-[#20231F]" : "text-white"
                }`}
              >
                ColorNest
              </span>
              <span
                className={`text-[9px] font-sans tracking-[0.25em] uppercase -mt-1 font-medium transition-colors duration-300 ${
                  isPastHero ? "text-[#7A7265]" : "text-white/70"
                }`}
              >
                Painting Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm tracking-wide font-medium transition-colors duration-200 relative py-1 ${
                    isPastHero
                      ? isActive
                        ? "text-[#C65F43]"
                        : "text-[#20231F] hover:text-[#C65F43]"
                      : isActive
                      ? "text-white font-semibold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-colors ${
                        isPastHero ? "bg-[#C65F43]" : "bg-white"
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                href="#quote"
                onClick={() => {
                  const el = document.getElementById("quote");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="primary"
                size="sm"
                showArrow
              >
                Get a Free Quote
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-sm transition-colors focus-visible:outline-2 ${
                isPastHero
                  ? "text-[#20231F] hover:bg-[#D8D1C5]/30 focus-visible:outline-[#20231F]"
                  : "text-white hover:bg-white/10 focus-visible:outline-white"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#20231F]/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[82%] max-w-sm bg-[#FAF8F5] border-l border-[#D8D1C5] shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#D8D1C5]/60 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#C65F43] rounded-xs" />
                <span className="font-serif text-lg text-[#20231F]">
                  ColorNest
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#20231F] hover:bg-[#D8D1C5]/40 rounded-sm"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-serif text-2xl text-[#20231F] hover:text-[#C65F43] transition-colors py-1 flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C65F43]"
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#D8D1C5]/60 flex flex-col gap-4">
            <Button
              href="#quote"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("quote")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="primary"
              size="md"
              showArrow
              className="w-full justify-center"
            >
              Get a Free Quote
            </Button>
            <p className="text-xs text-[#7A7265] text-center tracking-wide">
              Architectural & residential painting crafted with precision.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
