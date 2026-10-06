"use client";

import React from "react";

interface CommentContentProps {
  content: string;
  className?: string;
  compact?: boolean;
}

export function CommentContent({
  content,
  className = "",
  compact = false,
}: CommentContentProps) {
  if (!content) return null;

  // Regex to detect markdown image/GIF: ![alt](url)
  const imageRegex = /!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;

  const images: { alt: string; url: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({ alt: match[1] || "GIF", url: match[2] });
  }

  // Text with image markdown stripped
  const textOnly = content.replace(imageRegex, "").trim();

  return (
    <div className={`space-y-2 min-w-0 ${className}`}>
      {textOnly && (
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed break-words [overflow-wrap:anywhere]">
          {textOnly}
        </p>
      )}

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-0.5">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card-subtle)] shadow-xs ${
                compact
                  ? "max-w-[160px] max-h-[110px]"
                  : "max-w-[220px] max-h-[150px]"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-black/70 text-white backdrop-blur-xs">
                {img.alt || "GIF"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
