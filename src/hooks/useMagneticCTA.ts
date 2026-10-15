import { useEffect, useRef } from "react";

/** Move only the decorative surface: the link's hit target stays still. */
export function useMagneticCTA() {
  const target = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = target.current;
    const surface = link?.querySelector<HTMLElement>("[data-magnetic-surface]");
    if (!link || !surface) return;
    const allowed = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      surface.style.removeProperty("--magnet-x");
      surface.style.removeProperty("--magnet-y");
    };
    const move = (event: PointerEvent) => {
      if (!allowed.matches || event.pointerType !== "mouse") return;
      const bounds = link.getBoundingClientRect();
      x = Math.max(-4, Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * 0.07));
      y = Math.max(-3, Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * 0.1));
      if (!frame) frame = requestAnimationFrame(() => {
        surface.style.setProperty("--magnet-x", `${x}px`);
        surface.style.setProperty("--magnet-y", `${y}px`);
        frame = 0;
      });
    };
    link.addEventListener("pointermove", move);
    link.addEventListener("pointerleave", reset);
    link.addEventListener("pointercancel", reset);
    link.addEventListener("blur", reset);
    document.addEventListener("keydown", reset);
    allowed.addEventListener("change", reset);
    return () => {
      reset();
      link.removeEventListener("pointermove", move);
      link.removeEventListener("pointerleave", reset);
      link.removeEventListener("pointercancel", reset);
      link.removeEventListener("blur", reset);
      document.removeEventListener("keydown", reset);
      allowed.removeEventListener("change", reset);
    };
  }, []);

  return target;
}
