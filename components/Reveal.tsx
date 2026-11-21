import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Box, { BoxProps } from "@mui/material/Box";

type RevealProps = BoxProps & {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
};

export function Reveal({ children, delay = 0, y = 28, x = 0, once = true, sx, ...boxProps }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <Box
      component={motion.div}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={sx}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

type RevealImageProps = {
  src: string;
  alt: string;
  delay?: number;
  sx?: BoxProps["sx"];
};

export function RevealImage({ src, alt, delay = 0, sx }: RevealImageProps) {
  const reduce = useReducedMotion();
  return (
    <Box
      component={motion.div}
      initial={reduce ? false : { opacity: 0, scale: 1.04 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 3,
        ...((sx as object) || {}),
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}

export function useHeroEnter(delay = 0) {
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t = window.setTimeout(() => setReady(true), reduce ? 0 : delay);
    return () => window.clearTimeout(t);
  }, [delay, reduce]);
  return ready;
}
