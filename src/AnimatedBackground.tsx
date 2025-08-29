"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    function resize() {
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(DPR, DPR);
    }
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      s: Math.random() * 0.8 + 0.2,
      a: Math.random() * Math.PI * 2,
    }));

    function tick(t: number) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const st of stars) {
        st.a += 0.02 * st.s;
        const alpha = 0.3 + 0.3 * Math.sin(st.a + t * 0.001);
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[-1]"
      aria-hidden
    />
  );
}
