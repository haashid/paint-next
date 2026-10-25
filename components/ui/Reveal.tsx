"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  direction = "up",
  className = "",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already within viewport immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0";
    }
    switch (direction) {
      case "up":
        return "opacity-0 translate-y-10";
      case "down":
        return "opacity-0 -translate-y-10";
      case "left":
        return "opacity-0 translate-x-10";
      case "right":
        return "opacity-0 -translate-x-10";
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform will-change-transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
