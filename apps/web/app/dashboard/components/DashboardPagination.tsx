"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  itemLabel?: string;
}

export function DashboardPagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  className = "",
  itemLabel = "items",
}: DashboardPaginationProps) {
  if (totalItems <= 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] text-xs text-[var(--text-secondary)] shadow-xs select-none ${className}`}
    >
      {/* Left side: Rows per page selector (Firebase style) */}
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--text-muted)] font-medium">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] font-semibold text-xs focus:outline-none focus:border-[var(--brand-orange)] cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right side: Item counter and Previous / Next navigation buttons */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-[var(--text-main)] text-xs">
          {startItem} &ndash; {endItem}{" "}
          <span className="text-[var(--text-muted)] font-normal">of {totalItems}</span>
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-semibold px-2 text-[var(--text-muted)]">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
