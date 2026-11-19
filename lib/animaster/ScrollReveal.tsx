"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Animaster-style scroll entrance — GSAP ScrollTrigger fade/slide reveal.
 * Inspired by Animaster Lib scroll animation patterns (not a paid pack import).
 */
export default function ScrollReveal({
  children,
  className,
  y = 48,
  delay = 0,
  duration = 1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [y, delay, duration, once] }
  );

  return (
    <div ref={ref} className={cn("am-reveal-root", className)}>
      {children}
    </div>
  );
}
