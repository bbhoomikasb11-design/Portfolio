import { useEffect, useMemo } from "react";
import { playgroundLayout, playgroundPieces } from "../data/playground";
import { usePlaygroundCanvas } from "../hooks/usePlaygroundCanvas";
import { PlaygroundCard } from "../components/playground/PlaygroundCard";
import "../styles/playground.css";

const modulo = (value: number, by: number) => ((value % by) + by) % by;
const offsets = [0, 160, -95, 240];

export default function PlaygroundPage() {
  const { canvas, size, view, dragging, handlers } = usePlaygroundCanvas();
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = old; };
  }, []);

  const tiles = useMemo(() => {
    const { columnStep, tileWidth, gap, rim } = playgroundLayout;
    const list = [];
    // Overscan includes each tilted frame's corners, not an entire long page.
    const top = -view.y / view.scale - 100;
    const bottom = (size.height - view.y) / view.scale + 100;
    const startCol = Math.floor((-view.x / view.scale - 80) / columnStep);
    const endCol = Math.ceil(((size.width - view.x) / view.scale + 80) / columnStep);
    for (let col = startCol; col <= endCol; col++) {
      let totalHeight = 0;
      const column = playgroundPieces.map((_, index) => {
        // A stride coprime to 14 keeps every study in every repeating column.
        const piece = playgroundPieces[modulo(index * 3 + col, playgroundPieces.length)];
        const height = (tileWidth - rim * 2) * piece.height / piece.width + rim * 2;
        const entry = { piece, height, y: totalHeight, angle: [-1.6, 1.3, -0.9, 1.8][modulo(index + col, 4)] };
        totalHeight += height + gap;
        return entry;
      });
      const offset = offsets[modulo(col, offsets.length)];
      const firstCycle = Math.floor((top - offset) / totalHeight);
      const lastCycle = Math.floor((bottom - offset) / totalHeight);
      for (let cycle = firstCycle; cycle <= lastCycle; cycle++) {
        for (let index = 0; index < column.length; index++) {
          const item = column[index];
          const y = offset + cycle * totalHeight + item.y;
          if (y + item.height < top || y > bottom) continue;
          list.push({ ...item, key: `${col}:${cycle}:${index}`, x: col * columnStep, y });
        }
      }
    }
    return list;
  }, [view, size]);

  return (
    <div className="playground-shell">
      <h1 className="sr-only">Playground</h1>
      <p className="sr-only" id="canvas-instructions">
        Drag or scroll to explore {playgroundPieces.length} original landing-page and interface studies on a repeating canvas.
        Pinch or Ctrl-scroll to zoom. With the canvas focused, use arrow keys to move,
        plus and minus to zoom, and zero to reset. Images do not open links or popups.
      </p>
      <div ref={canvas} className={`play-canvas${dragging ? " is-dragging" : ""}`} tabIndex={0} role="region" aria-label="Infinite design canvas" aria-describedby="canvas-instructions" {...handlers}
        style={{ backgroundPosition: `${view.x}px ${view.y}px`, backgroundSize: `${32 * view.scale}px ${32 * view.scale}px` }}>
        <div className="play-plane" aria-hidden="true" style={{ transform: `translate3d(${view.x}px,${view.y}px,0) scale(${view.scale})` }}>
          {tiles.map(tile => <PlaygroundCard key={tile.key} piece={tile.piece} x={tile.x} y={tile.y} angle={tile.angle} height={tile.height} width={playgroundLayout.tileWidth} canvas={canvas} />)}
        </div>
        <div className="play-canvas-vignette" aria-hidden="true" />
        <ul className="sr-only" aria-label="Original design concepts">
          {playgroundPieces.map(piece => <li key={piece.id}>{piece.title}. {piece.alt} {piece.description}</li>)}
        </ul>
      </div>
    </div>
  );
}
