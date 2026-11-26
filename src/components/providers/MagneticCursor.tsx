"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Retail pin cursor — sharp terracotta diamond + soft lagging ring.
 * Feels like a map pin / wayfinding marker, not a design-studio blob.
 * Hidden on touch and reduced-motion.
 */
export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Primary (snappy) spring for the diamond
  const primary = { damping: 28, stiffness: 520, mass: 0.28 };
  const x = useSpring(cursorX, primary);
  const y = useSpring(cursorY, primary);

  // Softer lag spring for the outer ring
  const lag = { damping: 22, stiffness: 180, mass: 0.55 };
  const lagX = useSpring(cursorX, lag);
  const lagY = useSpring(cursorY, lag);

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
          [role="button"],
          input,
          textarea,
          select {
            cursor: none;
          }
        }
      `}</style>

      {/* Lagging soft ring */}
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
          className="rounded-full border border-terracotta/40"
          animate={{
            width: hovering ? 52 : pressed ? 22 : 34,
            height: hovering ? 52 : pressed ? 22 : 34,
            opacity: hovering ? 0.9 : 0.45,
            borderColor: hovering
              ? "rgba(217, 95, 67, 0.7)"
              : "rgba(217, 95, 67, 0.35)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
        />
      </motion.div>

      {/* Sharp diamond / pin core */}
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
            scale: pressed ? 0.75 : hovering ? 1.15 : 1,
            rotate: hovering ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
        >
          {/* Diamond shape via rotated square */}
          <div
            className="h-3 w-3 rotate-45 rounded-[2px] bg-terracotta shadow-[0_0_12px_rgba(217,95,67,0.55)]"
            style={{
              boxShadow: hovering
                ? "0 0 18px rgba(217,95,67,0.7)"
                : "0 0 10px rgba(217,95,67,0.4)",
            }}
          />
          {/* Tiny forest centre dot */}
          <div className="absolute h-1 w-1 rounded-full bg-forest" />
        </motion.div>
      </motion.div>
    </>
  );
}
