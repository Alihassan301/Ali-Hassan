import React, { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";
import { RevealText } from "./RevealText";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  id: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({ label, title, id, className = "", titleClassName = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <SectionLabel>{label}</SectionLabel>
      <RevealText
        as="h2"
        id={id}
        className={`mt-6 font-display text-[clamp(2.5rem,6.4vw,6.25rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-graphite ${titleClassName}`}>
        
        {title}
      </RevealText>
    </div>);

}