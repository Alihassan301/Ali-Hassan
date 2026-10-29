import React, { ReactNode } from "react";

interface AccentProps {
  children: ReactNode;
  className?: string;
}

/** Editorial DM Serif italic accent used inside large Clash Display headings. */
export function Accent({ children, className = "text-cobalt" }: AccentProps) {
  return <span className={`font-serif font-normal italic tracking-[-0.01em] ${className}`}>{children}</span>;
}