"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Room interior before painting renovation",
  afterAlt = "Room interior after professional painting finish",
  beforeLabel = "Before Preparation",
  afterLabel = "Finished Result",
  initialPosition = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Directly update DOM for instant, lag-free 120fps response
  const setPositionImmediate = useCallback((pos: number) => {
    const clamped = Math.max(0, Math.min(100, pos));
    if (clipRef.current) {
      clipRef.current.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${clamped}%`;
    }
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

      // Use RAF to batch DOM updates
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        setPositionImmediate(percentage);
        setSliderPosition(percentage);
      });
    },
    [setPositionImmediate]
  );

  // Window-level listeners ensure drag NEVER drops or gets stuck
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateFromClientX]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let next = sliderPosition;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next = Math.max(0, sliderPosition - 4);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next = Math.min(100, sliderPosition + 4);
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = 100;
    }

    if (next !== sliderPosition) {
      setPositionImmediate(next);
      setSliderPosition(next);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={`relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-md select-none touch-none cursor-ew-resize border border-[#D8D1C5]/80 shadow-md ${
        isDragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
      role="slider"
      aria-label="Before and after transformation comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {/* After Image (Full width background) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center pointer-events-none select-none"
          priority
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded bg-[#20231F]/80 backdrop-blur-sm text-[#FAF8F5] text-xs font-medium tracking-wider uppercase border border-white/10 shadow-sm pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        ref={clipRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none will-change-[clip-path]"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center pointer-events-none select-none"
          priority
          draggable={false}
        />
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded bg-[#20231F]/80 backdrop-blur-sm text-[#FAF8F5] text-xs font-medium tracking-wider uppercase border border-white/10 shadow-sm pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line & handle */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 pointer-events-none will-change-[left]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#20231F] shadow-xl flex items-center justify-center border border-[#D8D1C5] transition-transform duration-100 ${
            isDragging ? "scale-115 shadow-2xl" : "hover:scale-105"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#20231F]"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#20231F] -ml-1.5"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
            <polyline points="15 18 21 12 15 6" />
          </svg>
        </div>
      </div>

      {/* Instructional hint */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] tracking-wide pointer-events-none shadow-sm">
        Drag or click anywhere to compare
      </div>
    </div>
  );
}
