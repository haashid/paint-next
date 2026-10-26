"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, Minimize2, Sparkles } from "lucide-react";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 480;

const beats = [
  { id: 1, label: "Exterior", fullLabel: "The Exterior", range: [0, 0.2] },
  { id: 2, label: "Entrance", fullLabel: "The Entrance", range: [0.2, 0.4] },
  { id: 3, label: "Prep", fullLabel: "Restoration", range: [0.4, 0.6] },
  { id: 4, label: "Craft", fullLabel: "Craft in Motion", range: [0.6, 0.8] },
  { id: 5, label: "Finish", fullLabel: "Flawless Finish", range: [0.8, 1.0] },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineBarRef = useRef<HTMLDivElement>(null);

  // References for overlay elements to update opacity directly without React re-renders
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);
  const beat4Ref = useRef<HTMLDivElement>(null);
  const beat5Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeBeat, setActiveBeat] = useState(1);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  // Fit mode on mobile: 'fit' keeps entire 16:9 video uncropped with ambient backdrop, 'fill' covers screen
  const [fitMode, setFitMode] = useState<"fit" | "fill">("fill");
  const [isMobile, setIsMobile] = useState(false);

  // Image cache array
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);
  const fitModeRef = useRef<"fit" | "fill">("fill");

  // Keep fitModeRef in sync
  useEffect(() => {
    fitModeRef.current = fitMode;
  }, [fitMode]);

  // Helper to format frame path: frame_0001.jpg
  const getFramePath = (index: number) => {
    const pad = String(index).padStart(4, "0");
    return `/frames/frame_${pad}.jpg`;
  };

  // Draw a frame onto the canvas with adaptive mobile 'fit' or 'fill'
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

    ctx.clearRect(0, 0, cw, ch);

    const isPortraitPhone = cw < ch;
    const currentMode = fitModeRef.current;

    if (isPortraitPhone && currentMode === "fit") {
      // 1. Draw ambient softly-blurred background so portrait phones have zero harsh letterboxing
      const bgScale = Math.max(cw / iw, ch / ih);
      const bgSw = cw / bgScale;
      const bgSh = ch / bgScale;
      const bgSx = (iw - bgSw) / 2;
      const bgSy = (ih - bgSh) / 2;

      ctx.save();
      ctx.filter = "blur(20px) brightness(0.45)";
      ctx.drawImage(img, bgSx, bgSy, bgSw, bgSh, 0, 0, cw, ch);
      ctx.restore();

      // 2. Draw the 100% complete, uncropped 16:9 video centered crisply
      // Allow max 95% width, max 55% height to leave room for editorial text and timeline
      const targetScale = Math.min((cw * 0.96) / iw, (ch * 0.52) / ih);
      const dw = iw * targetScale;
      const dh = ih * targetScale;
      const dx = (cw - dw) / 2;
      // Position slightly above center to balance bottom timeline and touch controls
      const dy = (ch - dh) / 2 - ch * 0.04;

      // Draw subtle shadow and rounded clip around the video stage
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
      ctx.restore();
    } else {
      // Full bleed cover (desktop, landscape, or mobile 'fill' mode)
      const scale = Math.max(cw / iw, ch / ih);
      const sw = cw / scale;
      const sh = ch / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) / 2;

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }
  }, []);

  // Resize canvas to match window resolution (optimized DPR for mobile battery & smoothness)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    // On portrait mobile, default to 'fit' so the user sees 100% of the house transformation
    if (mobile && window.innerWidth < window.innerHeight) {
      setFitMode("fit");
    }

    // Limit DPR on mobile to 1.5 to guarantee solid 60-120fps performance on iPhones/Android
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Preload initial frames immediately, then lazily preload the rest in background chunks
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

    // 2. Preload first 30 frames eagerly for instant initial interaction
    for (let i = 2; i <= 30; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      imagesRef.current[i] = img;
    }

    // 3. Preload all remaining frames in gentle chunks
    let nextChunkStart = 31;
    const chunkSize = 25;

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
        setTimeout(loadNextChunk, 45);
      }
    };

    const timer = setTimeout(loadNextChunk, 80);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(timer);
    };
  }, [resizeCanvas, drawFrame]);

  // Smooth lerp loop with requestAnimationFrame for fluid 60-120fps motion
  useEffect(() => {
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (Math.abs(target - current) > 0.08) {
        // Smooth lerp factor (0.35 gives crisp responsiveness without stutter)
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
      beat1Ref.current.style.transform = `translate3d(0, ${-(progress * 50).toFixed(1)}px, 0)`;
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
        scrub: 0.4,
        onUpdate: (self) => {
          updateOverlays(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [updateOverlays]);

  // Jump smoothly to a specific phase
  const jumpToPhase = useCallback(
    (phaseId: number) => {
      if (!containerRef.current) return;
      const progress = (phaseId - 1) * 0.2 + 0.05;
      const container = containerRef.current;
      const scrollDistance = container.offsetHeight - window.innerHeight;
      const targetScroll = container.offsetTop + scrollDistance * progress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    },
    []
  );

  // Direct touch scrubbing on the timeline bar
  const handleTimelineScrub = (clientX: number) => {
    if (!timelineBarRef.current) return;
    const rect = timelineBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const progress = x / rect.width;
    updateOverlays(progress);

    if (containerRef.current) {
      const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = containerRef.current.offsetTop + scrollDistance * progress;
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  };

  // Touch swipe scrubbing on the video canvas for phones
  const touchStartXRef = useRef<number | null>(null);
  const touchStartFrameRef = useRef<number>(1);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartFrameRef.current = targetFrameRef.current;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    // Every 1.5 pixels swiped shifts 1 frame
    const frameShift = Math.round(deltaX / 1.5);
    const newFrame = Math.max(1, Math.min(TOTAL_FRAMES, touchStartFrameRef.current + frameShift));
    targetFrameRef.current = newFrame;
    const progress = (newFrame - 1) / (TOTAL_FRAMES - 1);
    updateOverlays(progress);
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  // Toggle between uncropped 'fit' and edge-to-edge 'fill'
  const toggleFitMode = () => {
    const nextMode = fitMode === "fit" ? "fill" : "fit";
    setFitMode(nextMode);
    fitModeRef.current = nextMode;
    drawFrame(Math.round(currentFrameRef.current));
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[220vh] bg-[#F6F3ED]"
      aria-label="ColorNest Transformation Journey"
    >
      {/* Sticky Fullscreen Canvas Viewport using 100dvh for zero mobile address bar jump */}
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#151714]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Crisp HTML5 Canvas rendering video frames with natural brightness */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        />

        {/* Subtle architectural legibility vignette (lightweight, never darkening the core video) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

        {/* ---------------------------------------------------- */}
        {/* Floating Phone Controls: Fit/Fill Framing Toggle     */}
        {/* ---------------------------------------------------- */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center">
          {/* Mobile Fit/Fill Mode Toggle */}
          <button
            type="button"
            onClick={toggleFitMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20 hover:bg-black/75 transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label={fitMode === "fit" ? "Switch to Fill Screen" : "Switch to Full View"}
            title={fitMode === "fit" ? "Switch to Fill Screen" : "Switch to Full View"}
          >
            {fitMode === "fit" ? (
              <>
                <Maximize2 size={13} className="text-[#C65F43]" />
                <span className="text-[11px] font-sans">Fill</span>
              </>
            ) : (
              <>
                <Minimize2 size={13} className="text-[#C65F43]" />
                <span className="text-[11px] font-sans">Full View</span>
              </>
            )}
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 1 — The exterior (0 — 20%)                      */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat1Ref}
          className="absolute inset-0 z-20 flex flex-col justify-end lg:justify-center px-5 sm:px-12 lg:px-24 pb-28 sm:pb-32 lg:pb-0 pointer-events-auto"
        >
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white/90 text-xs font-mono uppercase tracking-widest border border-white/15 mb-3">
              <Sparkles size={12} className="text-[#C65F43]" />
              Architectural Transformation
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal text-white leading-[1.1] tracking-tight mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Your Home.
              <br />
              <span className="italic font-normal text-[#FAF8F5]">
                Reimagined.
              </span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-[#F6F3ED] font-light leading-relaxed mb-6 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Professional painting. Remarkable transformations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                href="#quote"
                onClick={() => {
                  document
                    .getElementById("quote")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="primary"
                size="md"
                showArrow
                className="w-full sm:w-auto justify-center text-center py-3"
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
                size="md"
                className="w-full sm:w-auto justify-center text-center py-3 text-white border-white/30 bg-black/20 backdrop-blur-sm"
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
          className="absolute inset-0 z-20 flex items-end justify-start px-5 sm:px-16 lg:px-24 pb-28 sm:pb-32"
        >
          <div className="max-w-xl bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-sm border border-white/10 sm:border-none">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65F43] block mb-1">
              Phase 02 · Threshold
            </span>
            <p className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              Every great transformation begins at home.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 3 — The unfinished interior (40% — 60%)         */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat3Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex items-end justify-start px-5 sm:px-16 lg:px-24 pb-28 sm:pb-32"
        >
          <div className="max-w-xl bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-sm border border-white/10 sm:border-none">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65F43] block mb-1">
              Phase 03 · Restoration
            </span>
            <p className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              Every wall deserves a fresh start.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 4 — The painter at work (60% — 80%)             */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat4Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex items-end justify-start px-5 sm:px-16 lg:px-24 pb-28 sm:pb-32"
        >
          <div className="max-w-xl bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3.5 sm:p-0 rounded-sm border border-white/10 sm:border-none">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65F43] block mb-1">
              Phase 04 · Artisanship
            </span>
            <p className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              Crafted with care. Finished to perfection.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BEAT 5 — The finished interior (80% — 100%)          */}
        {/* ---------------------------------------------------- */}
        <div
          ref={beat5Ref}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="absolute inset-0 z-20 flex flex-col justify-end lg:justify-center items-start lg:items-center text-left lg:text-center px-5 sm:px-12 lg:px-24 pb-28 sm:pb-32 lg:pb-0"
        >
          <div className="max-w-2xl bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-sm border border-white/10 sm:border-none">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65F43] block mb-2">
              Phase 05 · Complete Reveal
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-6xl text-white font-normal leading-tight mb-4 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
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
                size="md"
                showArrow
                className="w-full sm:w-auto justify-center"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Responsive Phone & Desktop Timeline Bar              */}
        {/* ---------------------------------------------------- */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 right-3 sm:left-12 sm:right-12 z-30 flex flex-col gap-2 pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]">
          {/* Interactive touch scrub track */}
          <div
            ref={timelineBarRef}
            onClick={(e) => handleTimelineScrub(e.clientX)}
            className="w-full h-3 sm:h-2 py-1 flex items-center cursor-pointer group select-none"
            title="Drag or tap to scrub video"
          >
            <div className="w-full h-1.5 sm:h-1 bg-white/25 rounded-full overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="h-full bg-[#C65F43] transition-all duration-75 relative rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          {/* Beat navigation buttons: Fully visible & interactive on phone and desktop */}
          <div className="flex items-center justify-between text-white/80 text-xs font-mono gap-2">
            {/* Scrollable pill container on mobile phones */}
            <div className="flex items-center gap-1.5 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
              {beats.map((beat) => (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => jumpToPhase(beat.id)}
                  className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full transition-all text-nowrap cursor-pointer ${
                    activeBeat === beat.id
                      ? "bg-white/20 text-white font-semibold border border-white/30"
                      : "text-white/55 hover:text-white/90 hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeBeat === beat.id ? "bg-[#C65F43]" : "bg-white/40"
                    }`}
                  />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">
                    {beat.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="shrink-0 flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest pl-2">
              <span className="hidden md:inline">Scroll or Swipe to Scrub</span>
              <span className="md:hidden text-[#C65F43] font-mono">0{activeBeat}/05</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
