import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} max-w-3xl ${className}`}>
      {label && (
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className={`w-2 h-2 rounded-full ${
              isDark ? "bg-[#C65F43]" : "bg-[#C65F43]"
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-xs font-semibold tracking-[0.2em] uppercase ${
              isDark ? "text-[#D8D1C5]" : "text-[#7A7265]"
            }`}
          >
            {label}
          </span>
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tight ${
          isDark ? "text-[#FAF8F5]" : "text-[#20231F]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg font-light leading-relaxed ${
            isDark ? "text-[#D8D1C5]" : "text-[#5A5750]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
