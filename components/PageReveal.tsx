"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RevealLoader = dynamic(() => import("@/components/ui/reveal-loader"), {
  ssr: false,
});

const SESSION_KEY = "3dwellness-revealed";

export default function PageReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1400] pointer-events-none">
      <RevealLoader
        text="3DWE"
        textSize="clamp(48px, 10vw, 110px)"
        textColor="#F7F8F3"
        bgColors={["#1A1A14", "#333333"]}
        angle={135}
        staggerOrder="center-out"
        movementDirection="top-down"
        textFadeDelay={0.4}
        className="!fixed !inset-0 !pointer-events-auto"
        onComplete={() => {
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* ignore */
          }
          setShow(false);
        }}
      />
    </div>
  );
}
