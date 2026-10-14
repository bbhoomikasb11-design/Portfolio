import { useCallback, useEffect, useMemo, useState } from "react";
import { playgroundPieces } from "../data/playground";
import type { PlaygroundCategory } from "../data/playground";
import { usePlaygroundCanvas } from "../hooks/usePlaygroundCanvas";
import Icon from "../components/playground/PlaygroundIcon";
import ImageViewer from "../components/playground/ImageViewer";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/playground.css";

const modulo = (value: number, by: number) => ((value % by) + by) % by;
export default function PlaygroundPage() {
  const [mode, setMode] = useState<"canvas" | "gallery">("canvas");
  const [filter, setFilter] = useState<"All" | PlaygroundCategory>("All");
  const [shuffle, setShuffle] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const open = useCallback((id: string) => setSelected(id), []);
  const { canvas, size, view, dragging, reset, zoom, stop, handlers } =
    usePlaygroundCanvas(open, mode === "canvas");
  const pieces = useMemo(
    () =>
      playgroundPieces.filter(
        (piece) => filter === "All" || piece.category === filter,
      ),
    [filter],
  );
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  useEffect(() => {
    if (selected) stop();
  }, [selected, stop]);
  const tiles = useMemo(() => {
    const list = [];
    const startCol = Math.floor(-view.x / view.scale / 480) - 1,
      endCol = Math.ceil((size.width - view.x) / view.scale / 480);
    const startRow = Math.floor(-view.y / view.scale / 580) - 1,
      endRow = Math.ceil((size.height - view.y) / view.scale / 580);
    for (let row = startRow; row <= endRow; row++)
      for (let col = startCol; col <= endCol; col++) {
        const piece = pieces[modulo(row * 4 + col + shuffle, pieces.length)];
        const x = col * 480,
          y = row * 580 + (modulo(col, 2) ? 35 : 0);
        const visible =
          x * view.scale + view.x < size.width &&
          (x + 420) * view.scale + view.x > 0 &&
          y * view.scale + view.y < size.height &&
          (y + 540) * view.scale + view.y > 0;
        list.push({
          key: `${row}:${col}`,
          piece,
          x,
          y,
          angle: (modulo(col * 3 + row, 5) - 2) * 0.8,
          visible,
        });
      }
    return list;
  }, [pieces, shuffle, view, size]);
  const changeFilter = (next: typeof filter) => {
    setFilter(next);
    setShuffle(0);
    reset();
  };
  return (
    <div className="playground-shell">
      <div className="play-workspace">
        <header className="play-topbar">
          <div className="play-title">
            <p className="eyebrow">BHOOMIKA.S / A SPACE TO EXPERIMENT</p>
            <h1>
              The playground<span>.</span>
            </h1>
          </div>
          <div className="play-view-toggle" aria-label="Gallery view">
            <button
              aria-pressed={mode === "canvas"}
              onClick={() => setMode("canvas")}
            >
              <Icon name="move" />
              <span>Canvas</span>
            </button>
            <button
              aria-pressed={mode === "gallery"}
              onClick={() => setMode("gallery")}
            >
              <Icon name="grid" />
              <span>Gallery</span>
            </button>
          </div>
        </header>
        <div className="play-filterbar">
          <div className="play-filters" aria-label="Filter designs">
            {(["All", "Interfaces", "Posters", "Artwork"] as const).map(
              (category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => changeFilter(category)}
                >
                  {category}
                  <span>
                    {category === "All"
                      ? playgroundPieces.length
                      : playgroundPieces.filter((p) => p.category === category)
                          .length}
                  </span>
                </button>
              ),
            )}
          </div>
          <span className="play-original-note">
            Original concepts. Just for the joy of it.
          </span>
        </div>
        {mode === "canvas" ? (
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
            <div
              className="play-plane"
              style={{
                transform: `translate3d(${view.x}px,${view.y}px,0) scale(${view.scale})`,
              }}
            >
              {tiles.map((tile) => (
                <button
                  key={tile.key}
                  className={`play-tile${tile.piece.category === "Artwork" ? " is-artwork" : ""}`}
                  data-piece={tile.piece.id}
                  tabIndex={-1}
                  aria-hidden={!tile.visible}
                  aria-label={`Preview ${tile.piece.title}`}
                  style={{
                    left: tile.x,
                    top: tile.y,
                    rotate: `${tile.angle}deg`,
                  }}
                  onClick={(event) => {
                    if (event.detail === 0) open(tile.piece.id);
                  }}
                >
                  <img
                    src={tile.piece.image}
                    alt=""
                    width="800"
                    height={tile.piece.category === "Artwork" ? 800 : 940}
                    draggable={false}
                    decoding="async"
                  />
                  <span className="play-tile-label">
                    <span>{tile.piece.title}</span>
                    <span>{tile.piece.category}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="play-canvas-vignette" aria-hidden="true" />
          </div>
        ) : (
          <div
            className="play-gallery"
            role="region"
            aria-label="Design gallery"
            tabIndex={0}
          >
            <p className="sr-only">
              {pieces.length} original designs. Select a design for a larger
              image.
            </p>
            {pieces.map((piece) => (
              <button
                className="play-gallery-card"
                key={piece.id}
                onClick={() => open(piece.id)}
                aria-label={`Preview ${piece.title}`}
              >
                <img
                  src={piece.image}
                  alt={piece.alt}
                  width="800"
                  height={piece.category === "Artwork" ? 800 : 940}
                  loading="lazy"
                />
                <span>
                  <strong>{piece.title}</strong>
                  <span>{piece.category}</span>
                </span>
              </button>
            ))}
          </div>
        )}
        <footer className="play-bottom-bar">
          <p id="canvas-instructions">
            {mode === "canvas" ? (
              <>
                Drag to wander <span>·</span> Scroll to move <span>·</span>{" "}
                Click to look closer
              </>
            ) : (
              <>
                {pieces.length} original image studies <span>·</span> Click to
                look closer
              </>
            )}
          </p>
          <div className="play-tools">
            <ThemeToggle />
            <span className="play-tool-divider" />
            {mode === "canvas" && (
              <>
                <button
                  className="play-icon-button"
                  aria-label="Zoom out"
                  disabled={view.scale <= 0.451}
                  onClick={() => zoom(view.scale - 0.15)}
                >
                  <Icon name="minus" />
                </button>
                <output className="play-zoom" aria-label="Canvas zoom">
                  {Math.round(view.scale * 100)}%
                </output>
                <button
                  className="play-icon-button"
                  aria-label="Zoom in"
                  disabled={view.scale >= 1.599}
                  onClick={() => zoom(view.scale + 0.15)}
                >
                  <Icon name="plus" />
                </button>
                <span className="play-tool-divider" />
                <button
                  className="play-icon-button"
                  aria-label="Reset canvas view"
                  onClick={reset}
                >
                  <Icon name="reset" />
                </button>
                <button
                  className="play-icon-button"
                  aria-label="Shuffle designs"
                  onClick={() => {
                    setShuffle((s) => s + 5);
                    reset();
                  }}
                >
                  <Icon name="shuffle" />
                </button>
              </>
            )}
            <details className="play-help">
              <summary aria-label="How to explore">
                <Icon name="help" />
              </summary>
              <div>
                <h2>A little room for play.</h2>
                <p>
                  {pieces.length} original studies repeat across an endless
                  canvas. These are image concepts, not live products or client
                  work.
                </p>
                <p>
                  <b>Mouse:</b> drag or scroll to move. Ctrl + scroll to zoom.
                </p>
                <p>
                  <b>Touch:</b> drag with one finger; pinch to zoom.
                </p>
                <p>
                  <b>Keyboard:</b> focus the canvas and use arrow keys, + / −
                  and 0 to reset. Choose Gallery to browse every image with Tab
                  and Enter.
                </p>
                <p>
                  <b>Preview:</b> use ← / → for the next image; Escape to close.
                  Blue clay and ribbon artwork were generated with AI.
                </p>
              </div>
            </details>
          </div>
        </footer>
        <span className="sr-only" role="status">
          {pieces.length} {filter === "All" ? "original" : filter.toLowerCase()}{" "}
          designs in {mode} view
        </span>
      </div>
      {selected && (
        <ImageViewer
          pieces={pieces}
          selected={selected}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
