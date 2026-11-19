"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

/**
 * Animaster-style media parallax — subtle scroll-linked image movement.
 */
export default function ParallaxMedia({
  children,
  className,
  speed = 0.15,
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !mediaRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        mediaRef.current,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [speed] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("am-parallax-media relative overflow-hidden", className)}
    >
      <div ref={mediaRef} className="relative h-full w-full scale-110">
        {children}
      </div>
    </div>
  );
}
