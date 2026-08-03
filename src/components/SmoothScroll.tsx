"use client";

import Lenis from "lenis";
import { useEffect } from "react";

interface WindowWithLenis extends Window {
  __lenis?: Lenis;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,          // scroll animation duration (higher = slower & smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
      smoothWheel: true,      // smooth mouse wheel
      touchMultiplier: 1.5,   // touch sensitivity
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis globally so Navbar can use it for smooth nav clicks
    (window as WindowWithLenis).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as WindowWithLenis).__lenis;
    };
  }, []);

  return <>{children}</>;
}
