"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Retail pin cursor — terracotta diamond + lagging ring + outer pulse.
 * Hidden on touch and reduced-motion.
 */
export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const primary = { damping: 26, stiffness: 560, mass: 0.22 };
  const x = useSpring(cursorX, primary);
  const y = useSpring(cursorY, primary);

  const lag = { damping: 20, stiffness: 160, mass: 0.6 };
  const lagX = useSpring(cursorX, lag);
  const lagY = useSpring(cursorY, lag);

  const outer = { damping: 18, stiffness: 90, mass: 0.8 };
  const outerX = useSpring(cursorX, outer);
  const outerY = useSpring(cursorY, outer);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFine) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor]"
        )
      ) {
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
          body,
          a,
          button,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-terracotta/20"
          animate={{
            width: hovering ? 72 : 48,
            height: hovering ? 72 : 48,
            opacity: hovering ? 0.5 : 0.25,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-terracotta/50"
          animate={{
            width: hovering ? 56 : pressed ? 24 : 36,
            height: hovering ? 56 : pressed ? 24 : 36,
            opacity: hovering ? 0.95 : 0.5,
            borderColor: hovering
              ? "rgba(217, 95, 67, 0.85)"
              : "rgba(217, 95, 67, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: pressed ? 0.7 : hovering ? 1.25 : 1,
            rotate: hovering ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 440, damping: 20 }}
        >
          <div
            className="h-3.5 w-3.5 rotate-45 rounded-[2px] bg-terracotta"
            style={{
              boxShadow: hovering
                ? "0 0 22px rgba(217,95,67,0.85), 0 0 40px rgba(217,95,67,0.35)"
                : "0 0 12px rgba(217,95,67,0.5)",
            }}
          />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-forest" />
        </motion.div>
      </motion.div>
    </>
  );
}
