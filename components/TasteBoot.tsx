"use client";

import { useEffect } from "react";

/** Mount taste runtime after React hydration so nav/forms bind to the live DOM. */
export default function TasteBoot() {
  useEffect(() => {
    const sources = [
      "/assets/system.js",
      "/assets/motion/motion.js",
      "/assets/layout/layout.js",
    ];
    for (const src of sources) {
      if (document.querySelector(`script[data-taste="${src}"]`)) continue;
      const s = document.createElement("script");
      s.type = "module";
      s.src = src;
      s.dataset.taste = src;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}
