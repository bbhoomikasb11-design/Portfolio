import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent } from "react";
export interface CanvasView {
  x: number;
  y: number;
  scale: number;
}
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function usePlaygroundCanvas(
  onOpen: (id: string) => void,
  enabled: boolean,
) {
  const canvas = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1000, height: 800 });
  const [view, setView] = useState<CanvasView>({ x: 200, y: 90, scale: 0.85 });
  const current = useRef(view);
  const frame = useRef(0);
  const inertia = useRef(0);
  const reduced = useRef(
    matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    time: 0,
    vx: 0,
    vy: 0,
    moved: false,
    id: "",
    pinched: false,
  });
  const pinch = useRef<{
    distance: number;
    cx: number;
    cy: number;
    view: CanvasView;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const update = useCallback((next: CanvasView) => {
    current.current = next;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setView(current.current));
  }, []);
  const stop = useCallback(() => {
    cancelAnimationFrame(inertia.current);
  }, []);
  const reset = useCallback(() => {
    stop();
    const width = canvas.current?.clientWidth || size.width;
    const height = canvas.current?.clientHeight || size.height;
    const scale = width < 600 ? 0.65 : 0.9;
    update({
      x: (width - 420 * scale) / 2,
      y: (height - 500 * scale) / 2,
      scale,
    });
  }, [size.width, size.height, stop, update]);
  useLayoutEffect(() => {
    if (!enabled || !canvas.current) return;
    const element = canvas.current;
    let first = true;
    const observer = new ResizeObserver(() => {
      const width = element.clientWidth,
        height = element.clientHeight;
      setSize({ width, height });
      if (first) {
        const scale = width < 600 ? 0.65 : 0.9;
        update({
          x: (width - 420 * scale) / 2,
          y: (height - 500 * scale) / 2,
          scale,
        });
        first = false;
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, update]);
  const zoom = useCallback(
    (scale: number, point?: { x: number; y: number }) => {
      stop();
      const old = current.current;
      const next = clamp(scale, 0.45, 1.6);
      const center = point || {
        x: (canvas.current?.clientWidth || size.width) / 2,
        y: (canvas.current?.clientHeight || size.height) / 2,
      };
      update({
        scale: next,
        x: center.x - ((center.x - old.x) * next) / old.scale,
        y: center.y - ((center.y - old.y) * next) / old.scale,
      });
    },
    [size, stop, update],
  );
  useEffect(() => {
    if (!enabled || !canvas.current) return;
    const element = canvas.current;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      stop();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientHeight
            : 1;
      if (event.ctrlKey || event.metaKey) {
        const bounds = element.getBoundingClientRect();
        zoom(current.current.scale * Math.exp(-event.deltaY * 0.008), {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
      } else
        update({
          ...current.current,
          x: current.current.x - event.deltaX * unit,
          y: current.current.y - event.deltaY * unit,
        });
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", wheel);
      stop();
    };
  }, [enabled, stop, update, zoom]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      reduced.current = media.matches;
      if (media.matches) stop();
    };
    media.addEventListener("change", change);
    return () => {
      media.removeEventListener("change", change);
      cancelAnimationFrame(frame.current);
      stop();
    };
  }, [stop]);
  const point = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    stop();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = point(event);
    pointers.current.set(event.pointerId, p);
    if (pointers.current.size === 1) {
      const tile = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-piece]",
      );
      gesture.current = {
        x: p.x,
        y: p.y,
        lastX: p.x,
        lastY: p.y,
        time: performance.now(),
        vx: 0,
        vy: 0,
        moved: false,
        id: tile?.dataset.piece || "",
        pinched: false,
      };
      setDragging(true);
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2,
        view: { ...current.current },
      };
      gesture.current.pinched = true;
      gesture.current.moved = true;
    }
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const p = point(event);
    pointers.current.set(event.pointerId, p);
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()],
        start = pinch.current;
      const scale = clamp(
        (start.view.scale * Math.hypot(a.x - b.x, a.y - b.y)) /
          Math.max(1, start.distance),
        0.45,
        1.6,
      );
      update({
        scale,
        x:
          (a.x + b.x) / 2 -
          ((start.cx - start.view.x) * scale) / start.view.scale,
        y:
          (a.y + b.y) / 2 -
          ((start.cy - start.view.y) * scale) / start.view.scale,
      });
      return;
    }
    const g = gesture.current,
      now = performance.now(),
      dt = Math.max(8, now - g.time);
    const dx = p.x - g.lastX,
      dy = p.y - g.lastY;
    if (Math.hypot(p.x - g.x, p.y - g.y) > 6) g.moved = true;
    if (g.moved)
      update({
        ...current.current,
        x: current.current.x + dx,
        y: current.current.y + dy,
      });
    g.vx = clamp((dx / dt) * 16, -25, 25);
    g.vy = clamp((dy / dt) * 16, -25, 25);
    g.lastX = p.x;
    g.lastY = p.y;
    g.time = now;
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    pinch.current = null;
    if (pointers.current.size) {
      const p = [...pointers.current.values()][0];
      gesture.current.lastX = p.x;
      gesture.current.lastY = p.y;
      return;
    }
    setDragging(false);
    const g = gesture.current;
    if (event.type === "pointercancel") return;
    if (!g.moved && !g.pinched && g.id) {
      onOpen(g.id);
      return;
    }
    if (reduced.current || g.pinched || performance.now() - g.time > 90) return;
    let vx = g.vx,
      vy = g.vy,
      last = performance.now();
    const glide = (now: number) => {
      const dt = Math.min(32, now - last) / 16;
      last = now;
      vx *= Math.pow(0.9, dt);
      vy *= Math.pow(0.9, dt);
      update({
        ...current.current,
        x: current.current.x + vx * dt,
        y: current.current.y + vy * dt,
      });
      if (Math.hypot(vx, vy) > 0.25)
        inertia.current = requestAnimationFrame(glide);
    };
    inertia.current = requestAnimationFrame(glide);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [100, 0],
      ArrowRight: [-100, 0],
      ArrowUp: [0, 100],
      ArrowDown: [0, -100],
    };
    if (event.key in directions) {
      event.preventDefault();
      stop();
      const [x, y] = directions[event.key];
      update({
        ...current.current,
        x: current.current.x + x,
        y: current.current.y + y,
      });
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoom(current.current.scale + 0.1);
    }
    if (event.key === "-") {
      event.preventDefault();
      zoom(current.current.scale - 0.1);
    }
    if (event.key === "0") {
      event.preventDefault();
      reset();
    }
  };
  return {
    canvas,
    size,
    view,
    dragging,
    reset,
    zoom,
    stop,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onKeyDown,
    },
  };
}
