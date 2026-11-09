'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    // Respect user's accessibility motion preference
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // "Not too much": fast, organic, responsive 0.85s duration with 1:1 wheel multiplier.
    // syncTouch: false ensures mobile & touch devices keep native 120Hz ProMotion touch momentum.
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      autoResize: true,
    });

    // Attach to global window for debugging or modal interaction if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    // Smooth anchor navigation for all in-page links (#tarifs, #planning, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) return;

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        // 80px offset accommodates the fixed navbar
        lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 0.85 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(reqId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
