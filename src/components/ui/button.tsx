import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "proof" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-xl cursor-pointer transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#090d16] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.985] active:translate-y-[0.5px]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-b from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_16px_-2px_rgba(99,102,241,0.4)] border border-brand-400/40",
      secondary:
        "bg-white hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600/90 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_2px_8px_-2px_rgba(0,0,0,0.5)]",
      outline:
        "border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500/80 bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white shadow-sm",
      ghost:
        "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
      proof:
        "bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_4px_16px_-2px_rgba(16,185,129,0.35)] border border-emerald-400/40",
      danger:
        "bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_16px_-2px_rgba(244,63,94,0.35)] border border-rose-400/30",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
