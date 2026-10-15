import { playgroundLayout } from "../data/playground";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent } from "react";

export interface CanvasView { x: number; y: number; scale: number }
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const startingView = (width: number): CanvasView => ({
  x: width < 600 ? 28 : 58,
  y: width < 600 ? 28 : 38,
  scale: width < 600 ? Math.max(0.3, (width - 56) / playgroundLayout.tileWidth) : 0.9,
});

/** One frame loop handles the target, eased position and release momentum. */
export function usePlaygroundCanvas() {
  const canvas = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1000, height: 800 });
  const [view, setView] = useState<CanvasView>(startingView(1000));
  const target = useRef(view);
  const displayed = useRef(view);
  const frame = useRef(0);
  const lastFrame = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });
  const drift = useRef(0);
  const reduced = useRef(matchMedia("(prefers-reduced-motion: reduce)").matches);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ startX: 0, startY: 0, x: 0, y: 0, time: 0, vx: 0, vy: 0, moved: false, pinched: false });
  const pinch = useRef<{ distance: number; x: number; y: number; view: CanvasView } | null>(null);
  const [dragging, setDragging] = useState(false);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    lastFrame.current = 0;
    velocity.current = { x: 0, y: 0 };
    drift.current = 0;
    canvas.current?.style.setProperty("--play-drift", "0deg");
  }, []);

  const animate = useCallback(function tick(now: number) {
    const dt = lastFrame.current ? Math.min(32, now - lastFrame.current) : 16;
    lastFrame.current = now;
    const v = velocity.current;
    const decay = Math.exp(-dt / 170);
    v.x *= decay;
    v.y *= decay;
    target.current = { ...target.current, x: target.current.x + v.x * dt, y: target.current.y + v.y * dt };
    const old = displayed.current;
    const goal = target.current;
    const ease = 1 - Math.exp(-dt / 65);
    const next = {
      x: old.x + (goal.x - old.x) * ease,
      y: old.y + (goal.y - old.y) * ease,
      scale: old.scale + (goal.scale - old.scale) * ease,
    };
    const lean = clamp((next.x - old.x) / dt * 0.45, -1.1, 1.1);
    drift.current += (lean - drift.current) * (1 - Math.exp(-dt / 100));
    canvas.current?.style.setProperty("--play-drift", `${drift.current.toFixed(3)}deg`);
    displayed.current = next;
    setView(next);
    if (Math.hypot(goal.x - next.x, goal.y - next.y) > 0.06 || Math.abs(goal.scale - next.scale) > 0.0001 || Math.hypot(v.x, v.y) > 0.003 || Math.abs(drift.current) > 0.01) {
      frame.current = requestAnimationFrame(tick);
    } else {
      displayed.current = goal;
      setView(goal);
      frame.current = 0;
      lastFrame.current = 0;
      canvas.current?.style.setProperty("--play-drift", "0deg");
    }
  }, []);

  const update = useCallback((next: CanvasView, immediate = false) => {
    target.current = next;
    if (immediate || reduced.current) {
      stop();
      displayed.current = next;
      setView(next);
    } else if (!frame.current) frame.current = requestAnimationFrame(animate);
  }, [animate, stop]);

  const reset = useCallback(() => {
    stop();
    update(startingView(canvas.current?.clientWidth || 1000), true);
  }, [stop, update]);

  useLayoutEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let first = true;
    const observer = new ResizeObserver(() => {
      const width = element.clientWidth, height = element.clientHeight;
      setSize({ width, height });
      if (first) { update(startingView(width), true); first = false; }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [update]);

  const zoom = useCallback((scale: number, point?: { x: number; y: number }, immediate = false) => {
    velocity.current = { x: 0, y: 0 };
    const old = target.current;
    const next = clamp(scale, 0.3, 2.2);
    const center = point || { x: (canvas.current?.clientWidth || 1000) / 2, y: (canvas.current?.clientHeight || 800) / 2 };
    update({ scale: next, x: center.x - (center.x - old.x) * next / old.scale, y: center.y - (center.y - old.y) * next / old.scale }, immediate);
  }, [update]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      velocity.current = { x: 0, y: 0 };
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
      if (event.ctrlKey || event.metaKey) {
        const bounds = element.getBoundingClientRect();
        zoom(target.current.scale * Math.exp(-event.deltaY * 0.008), { x: event.clientX - bounds.left, y: event.clientY - bounds.top });
      } else update({ ...target.current, x: target.current.x - event.deltaX * unit, y: target.current.y - event.deltaY * unit });
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => { element.removeEventListener("wheel", wheel); stop(); };
  }, [stop, update, zoom]);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      reduced.current = media.matches;
      if (media.matches) { const current = displayed.current; stop(); update(current, true); }
    };
    const visibility = () => {
      if (document.hidden) { const current = displayed.current; stop(); target.current = current; }
    };
    media.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); stop(); };
  }, [stop, update]);

  const point = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const current = displayed.current;
    stop();
    target.current = current;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = point(event);
    pointers.current.set(event.pointerId, p);
    if (pointers.current.size === 1) {
      gesture.current = { startX: p.x, startY: p.y, x: p.x, y: p.y, time: performance.now(), vx: 0, vy: 0, moved: false, pinched: false };
      setDragging(true);
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, view: { ...displayed.current } };
      gesture.current.pinched = true;
      gesture.current.moved = true;
    }
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const p = point(event);
    pointers.current.set(event.pointerId, p);
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()], start = pinch.current;
      const scale = clamp(start.view.scale * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, start.distance), 0.3, 2.2);
      update({ scale, x: (a.x + b.x) / 2 - (start.x - start.view.x) * scale / start.view.scale, y: (a.y + b.y) / 2 - (start.y - start.view.y) * scale / start.view.scale }, true);
      return;
    }
    const g = gesture.current, now = performance.now(), dt = Math.max(8, now - g.time);
    const dx = p.x - g.x, dy = p.y - g.y;
    if (Math.hypot(p.x - g.startX, p.y - g.startY) > 5) g.moved = true;
    if (g.moved) update({ ...target.current, x: target.current.x + dx, y: target.current.y + dy });
    // Blend samples so release does not depend on one noisy pointer event.
    g.vx = g.vx * 0.4 + clamp(dx / dt, -2.5, 2.5) * 0.6;
    g.vy = g.vy * 0.4 + clamp(dy / dt, -2.5, 2.5) * 0.6;
    g.x = p.x; g.y = p.y; g.time = now;
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pinch.current = null;
    if (pointers.current.size) {
      const p = [...pointers.current.values()][0];
      gesture.current.x = p.x; gesture.current.y = p.y; gesture.current.time = performance.now();
      gesture.current.vx = 0; gesture.current.vy = 0;
      return;
    }
    setDragging(false);
    const g = gesture.current;
    if (event.type === "pointercancel") { const current = displayed.current; stop(); update(current, true); return; }
    if (!g.moved || reduced.current || g.pinched || performance.now() - g.time > 100) return;
    velocity.current = { x: g.vx, y: g.vy };
    if (!frame.current) frame.current = requestAnimationFrame(animate);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const directions: Record<string, [number, number]> = { ArrowLeft: [120, 0], ArrowRight: [-120, 0], ArrowUp: [0, 120], ArrowDown: [0, -120] };
    if (event.key in directions) {
      event.preventDefault(); velocity.current = { x: 0, y: 0 };
      const [x, y] = directions[event.key];
      update({ ...target.current, x: target.current.x + x, y: target.current.y + y });
    }
    if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(target.current.scale + 0.1); }
    if (event.key === "-") { event.preventDefault(); zoom(target.current.scale - 0.1); }
    if (event.key === "0") { event.preventDefault(); reset(); }
  };
  return { canvas, size, view, dragging, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onKeyDown } };
}
