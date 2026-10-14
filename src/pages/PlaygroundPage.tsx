import { useEffect, useMemo } from "react";
import { playgroundPieces } from "../data/playground";
import { usePlaygroundCanvas } from "../hooks/usePlaygroundCanvas";
import "../styles/playground.css";

const modulo = (value: number, by: number) => ((value % by) + by) % by;

export default function PlaygroundPage() {
  const { canvas, size, view, dragging, handlers } = usePlaygroundCanvas();
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  const tiles = useMemo(() => {
    const list = [];
    const startCol = Math.floor(-view.x / view.scale / 480) - 1,
      endCol = Math.ceil((size.width - view.x) / view.scale / 480);
    const startRow = Math.floor(-view.y / view.scale / 580) - 1,
      endRow = Math.ceil((size.height - view.y) / view.scale / 580);
    for (let row = startRow; row <= endRow; row++)
      for (let col = startCol; col <= endCol; col++) {
        list.push({
          key: `${row}:${col}`,
          piece: playgroundPieces[modulo(row * 4 + col, playgroundPieces.length)],
          x: col * 480,
          y: row * 580 + (modulo(col, 2) ? 35 : 0),
          angle: (modulo(col * 3 + row, 5) - 2) * 0.8,
        });
      }
    return list;
  }, [view, size]);

  return (
    <div className="playground-shell">
      <h1 className="sr-only">Playground</h1>
      <p className="sr-only" id="canvas-instructions">
        Drag or scroll to explore these 16 original image concepts on a repeating
        canvas. Pinch or Ctrl-scroll to zoom. With the canvas focused, use arrow
        keys to move, plus and minus to zoom, and zero to reset.
      </p>
      <div
        ref={canvas}
        className={`play-canvas${dragging ? " is-dragging" : ""}`}
        tabIndex={0}
        role="region"
        aria-label="Infinite design canvas"
        aria-describedby="canvas-instructions"
        {...handlers}
        style={{
          backgroundPosition: `${view.x}px ${view.y}px`,
          backgroundSize: `${28 * view.scale}px ${28 * view.scale}px`,
        }}
      >
        {/* Expose each concept once below, rather than repeating it to screen readers. */}
        <div
          className="play-plane"
          aria-hidden="true"
          style={{ transform: `translate3d(${view.x}px,${view.y}px,0) scale(${view.scale})` }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.key}
              className={`play-tile${tile.piece.category === "Artwork" ? " is-artwork" : ""}`}
              style={{ left: tile.x, top: tile.y, rotate: `${tile.angle}deg` }}
            >
              <img
                src={tile.piece.image}
                alt=""
                width="800"
                height={tile.piece.category === "Artwork" ? 800 : 940}
                draggable={false}
                decoding="async"
              />
            </div>
          ))}
        </div>
        <div className="play-canvas-vignette" aria-hidden="true" />
        <ul className="sr-only" aria-label="Original design concepts">
          {playgroundPieces.map((piece) => (
            <li key={piece.id}>{piece.title}. {piece.alt} {piece.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
