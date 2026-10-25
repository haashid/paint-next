"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 480;

const beats = [
  { id: 1, label: "The Exterior", range: [0, 0.2] },
  { id: 2, label: "The Entrance", range: [0.2, 0.4] },
  { id: 3, label: "Restoration", range: [0.4, 0.6] },
  { id: 4, label: "Craft in Motion", range: [0.6, 0.8] },
  { id: 5, label: "The Flawless Finish", range: [0.8, 1.0] },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for overlay elements to update opacity directly without React re-renders
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);
  const beat4Ref = useRef<HTMLDivElement>(null);
  const beat5Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeBeat, setActiveBeat] = useState(1);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Image cache array
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);

  // Helper to format frame path: frame_0001.jpg
  const getFramePath = (index: number) => {
    const pad = String(index).padStart(4, "0");
    return `/frames/frame_${pad}.jpg`;
  };

  // Draw a frame onto the canvas with 'cover' aspect ratio
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    // If target frame not loaded yet, find closest available frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 30; offset++) {
        const prev = imagesRef.current[Math.max(1, frameIndex - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES, frameIndex + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // Resize canvas to match window resolution (full retina / standard crisp)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload initial frames immediately, then lazily preload the rest
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Preload frame 1 immediately and draw it
    const frame1 = new Image();
    frame1.src = getFramePath(1);
    frame1.onload = () => {
      imagesRef.current[1] = frame1;
      setFirstFrameReady(true);
      drawFrame(1);
    };

    // 2. Preload first 40 frames eagerly for instant initial scrolling
    for (let i = 2; i <= 40; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      imagesRef.current[i] = img;
    }

    // 3. Preload all remaining frames in chunks via requestIdleCallback / setTimeout
    let nextChunkStart = 41;
    const chunkSize = 30;

    const loadNextChunk = () => {
      if (nextChunkStart > TOTAL_FRAMES) return;
      const end = Math.min(TOTAL_FRAMES, nextChunkStart + chunkSize);
      for (let i = nextChunkStart; i <= end; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = getFramePath(i);
          imagesRef.current[i] = img;
        }
      }
      nextChunkStart = end + 1;
      if (nextChunkStart <= TOTAL_FRAMES) {
        setTimeout(loadNextChunk, 40);
      }
    };

    const timer = setTimeout(loadNextChunk, 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(timer);
    };
  }, [resizeCanvas, drawFrame]);

  // Smooth lerp loop with requestAnimationFrame for ultra-fluid 60-120fps motion
  useEffect(() => {
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (Math.abs(target - current) > 0.1) {
        // Smooth lerp factor (0.35 gives immediate response without abrupt stepping)
        const next = current + (target - current) * 0.35;
        currentFrameRef.current = next;
        drawFrame(Math.round(next));
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Update text styles cleanly without heavy cards or dark overlays
  const updateOverlays = useCallback((progress: number) => {
    // Map progress (0 to 1) directly to target frame (1 to 480)
    const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    targetFrameRef.current = frame;

    // Progress bar fill
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Beat 1: 0.00 to 0.18
    if (beat1Ref.current) {
      const opacity = progress <= 0.12 ? 1 : progress >= 0.18 ? 0 : 1 - (progress - 0.12) / 0.06;
      beat1Ref.current.style.opacity = opacity.toFixed(3);
      beat1Ref.current.style.transform = `translate3d(0, ${-(progress * 60).toFixed(1)}px, 0)`;
      beat1Ref.current.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
    }

    // Beat 2: 0.20 to 0.38
    if (beat2Ref.current) {
      let opacity = 0;
      if (progress >= 0.2 && progress <= 0.38) {
        if (progress < 0.25) opacity = (progress - 0.2) / 0.05;
        else if (progress <= 0.33) opacity = 1;
        else opacity = 1 - (progress - 0.33) / 0.05;
      }
      beat2Ref.current.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
      beat2Ref.current.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
    }

    // Beat 3: 0.40 to 0.58
    if (beat3Ref.current) {
      let opacity = 0;
      if (progress >= 0.4 && progress <= 0.58) {
        if (progress < 0.45) opacity = (progress - 0.4) / 0.05;
        else if (progress <= 0.53) opacity = 1;
        else opacity = 1 - (progress - 0.53) / 0.05;
      }
      beat3Ref.current.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
      beat3Ref.current.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
    }

    // Beat 4: 0.60 to 0.78
    if (beat4Ref.current) {
      let opacity = 0;
      if (progress >= 0.6 && progress <= 0.78) {
        if (progress < 0.65) opacity = (progress - 0.6) / 0.05;
        else if (progress <= 0.73) opacity = 1;
        else opacity = 1 - (progress - 0.73) / 0.05;
      }
      beat4Ref.current.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
      beat4Ref.current.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
    }

    // Beat 5: 0.80 to 1.00
    if (beat5Ref.current) {
      let opacity = 0;
      if (progress >= 0.8) {
        opacity = progress < 0.86 ? (progress - 0.8) / 0.06 : 1;
      }
      beat5Ref.current.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
      beat5Ref.current.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
    }

    // Discrete phase index
    const beatIndex =
      progress < 0.2
        ? 1
        : progress < 0.4
        ? 2
        : progress < 0.6
        ? 3
        : progress < 0.8
        ? 4
        : 5;
    setActiveBeat(beatIndex);
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          updateOverlays(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [updateOverlays]);

  const jumpToPhase = (phaseId: number) => {
    if (!containerRef.current) return;
    const progress = (phaseId - 1) * 0.2 + 0.05;
    const container = containerRef.current;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + scrollDistance * progress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-[#F6F3ED]"
      aria-label="ColorNest Transformation Journey"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#F6F3ED]">
        {/* Crisp HTML5 Canvas rendering original 480 frames with 100% natural brightness */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Minimal legibility gradient only behind text areas (lightweight, no dark overlay across whole screen) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* ---------------------------------------------------- */}
        {/* BEAT 1 — The exterior (0 — 20%)                      */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat1Ref}
          className="absolute inset-0 z-20 flex flex-col justify-end lg:justify-center px-6 sm:px-12 lg:px-24 pb-28 lg:pb-0 pointer-events-auto"
        >
          <div className="max-w-2xl text-left">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Your Home.
              <br />
              <span className="italic font-normal text-[#FAF8F5]">
                Reimagined.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#F6F3ED] font-light leading-relaxed mb-8 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              Professional painting. Remarkable transformations.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                href="#quote"
                onClick={() => {
                  document
                    .getElementById("quote")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="primary"
                size="lg"
                showArrow
              >
                Get a Free Quote
              </Button>
              <Button
                href="#portfolio"
                onClick={() => {
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                size="lg"
              >
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 2 — The entrance (20% — 40%)                    */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat2Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex items-end justify-start px-6 sm:px-16 lg:px-24 pb-32"
        >
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            Every great transformation begins at home.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 3 — The unfinished interior (40% — 60%)         */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat3Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex items-end justify-start px-6 sm:px-16 lg:px-24 pb-32"
        >
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            Every wall deserves a fresh start.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 4 — The painter at work (60% — 80%)             */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat4Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex items-end justify-start px-6 sm:px-16 lg:px-24 pb-32"
        >
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            Crafted with care. Finished to perfection.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 5 — The finished interior (80% — 100%)          */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat5Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex flex-col justify-end lg:justify-center items-start lg:items-center text-left lg:text-center px-6 sm:px-12 lg:px-24 pb-32 lg:pb-0"
        >
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              A Fresh Perspective.
              <br />
              <span className="italic">A Flawless Finish.</span>
            </h2>

            <div className="flex lg:justify-center">
              <Button
                href="#services"
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="primary"
                size="lg"
                showArrow
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Sleek Minimal Timeline Indicator                     */}
        {/* ---------------------------------------------------- */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-12 z-30 flex flex-col gap-2.5 pointer-events-auto">
          {/* Subtle thin scrub line */}
          <div className="w-full h-[2px] bg-white/25 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#C65F43] transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>

          <div className="flex items-center justify-between text-white/70 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-6">
              {beats.map((beat) => (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => jumpToPhase(beat.id)}
                  className={`flex items-center gap-2 py-0.5 transition-colors duration-200 cursor-pointer ${
                    activeBeat === beat.id
                      ? "text-white font-semibold"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeBeat === beat.id ? "bg-[#C65F43]" : "bg-white/40"
                    }`}
                  />
                  <span className="text-[11px] uppercase tracking-wider">
                    {beat.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="sm:hidden text-white/90 text-xs font-medium">
              <span className="text-[#C65F43]">0{activeBeat} / 05</span> ·{" "}
              {beats[activeBeat - 1].label}
            </div>

            <span className="text-[10px] uppercase tracking-widest text-white/50">
              Scroll to Transform
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
