"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticHover from "@/lib/animaster/MagneticHover";
import { cn } from "@/lib/utils";

type HoverCtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Skiper/Vengeance-inspired interactive CTA with Animaster magnetic hover. */
export default function HoverCta({ href, children, className }: HoverCtaProps) {
  return (
    <MagneticHover>
      <Link
        href={href}
        className={cn(
          "group relative inline-flex w-auto cursor-pointer items-center overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-[#B5C94D] px-10 py-3 font-poppins text-[16px] font-normal text-[#1A1A14] no-underline transition-colors duration-300",
          "hover:border-[#B5C94D]",
          className
        )}
      >
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#1A1A14] transition-all duration-300 group-hover:scale-[100.8]" />
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </span>
        <span className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          <span>{children}</span>
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </MagneticHover>
  );
}
