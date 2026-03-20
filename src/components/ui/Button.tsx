"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "teal";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantMap: Record<Variant, string> = {
  primary:   "bg-terra text-white hover:bg-terra-700 focus-visible:outline-terra",
  secondary: "bg-navy text-white hover:bg-navy-700 focus-visible:outline-navy",
  teal:      "bg-teal text-white hover:bg-teal-700 focus-visible:outline-teal",
  outline:   "border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:outline-navy",
  ghost:     "text-navy hover:bg-navy/10 focus-visible:outline-navy",
};

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
