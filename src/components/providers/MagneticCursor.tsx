"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft dual-ring cursor — terracotta outer ring + forest core. */
export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 32, stiffness: 480, mass: 0.35 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFine) return;
    setVisible(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input, textarea, select { cursor: none; }
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-terracotta/80"
          animate={{
            width: hovering ? 44 : pressed ? 18 : 28,
            height: hovering ? 44 : pressed ? 18 : 28,
            opacity: hovering ? 1 : 0.85,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest"
          animate={{
            width: hovering ? 6 : pressed ? 10 : 8,
            height: hovering ? 6 : pressed ? 10 : 8,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
