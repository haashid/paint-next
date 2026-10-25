import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  showArrow = false,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 group cursor-pointer select-none";

  const sizeStyles = {
    sm: "text-xs tracking-wider uppercase px-4 py-2 rounded-sm gap-1.5 h-9",
    md: "text-sm tracking-wide px-6 py-3 rounded-sm gap-2 h-11",
    lg: "text-base tracking-wide px-8 py-3.5 rounded-sm gap-2.5 h-13",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#C65F43] text-white hover:bg-[#B24F35] shadow-sm hover:shadow active:scale-[0.99] focus-visible:outline-[#C65F43]",
    secondary:
      "bg-[#FAF8F5] text-[#20231F] hover:bg-white border border-[#D8D1C5] hover:border-[#20231F] active:scale-[0.99] focus-visible:outline-[#20231F]",
    outline:
      "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 active:scale-[0.99] focus-visible:outline-white",
    ghost:
      "bg-transparent text-[#20231F] hover:bg-[#D8D1C5]/30 focus-visible:outline-[#20231F]",
    dark:
      "bg-[#20231F] text-[#FAF8F5] hover:bg-[#28302A] border border-[#20231F] active:scale-[0.99] focus-visible:outline-[#C65F43]",
  }[variant];

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
