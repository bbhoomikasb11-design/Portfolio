import { memo, useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import type { PlaygroundPiece } from "../../data/playground";

interface Props {
  piece: PlaygroundPiece;
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  canvas: RefObject<HTMLDivElement | null>;
}

export const PlaygroundCard = memo(function PlaygroundCard({ piece, x, y, angle, width, height, canvas }: Props) {
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!media.matches) animation = node.animate([
        { transform: "scale(.94)", opacity: 0.65 },
        { transform: "scale(1)", opacity: 1 },
      ], { duration: 460, easing: "cubic-bezier(.16,1,.3,1)" });
      observer.disconnect();
    }, { root: canvas.current, threshold: 0.02 });
    const reduce = () => { if (media.matches) animation?.cancel(); };
    observer.observe(node);
    media.addEventListener("change", reduce);
    return () => { observer.disconnect(); animation?.cancel(); media.removeEventListener("change", reduce); };
  }, [canvas, piece.id]);
  return (
    <div className="play-tile" data-piece={piece.id} style={{ left: x, top: y, width, height, "--tile-tilt": `${angle}deg` } as CSSProperties}>
      <div ref={surface} className="play-card-surface">
        <img src={piece.image} alt="" width={piece.width} height={piece.height} draggable={false} decoding="async" />
      </div>
    </div>
  );
});
