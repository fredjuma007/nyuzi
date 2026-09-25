import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

export function Logo({ className = "", showIcon = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group shrink-0 ${className}`}>
      {showIcon && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#facc15] to-[#f56220] flex items-center justify-center shadow-md shadow-[#f56220]/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      )}
      <span className="font-bold text-base sm:text-lg tracking-tight flex items-center whitespace-nowrap">
        <span className="text-[#f56220]">Nyuzi</span>
        <span className="text-[var(--text-main)]">Yap</span>
      </span>
    </Link>
  );
}
