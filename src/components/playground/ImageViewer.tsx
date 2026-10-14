import { useEffect, useRef, useState } from "react";
import type { PlaygroundPiece } from "../../data/playground";
import Icon from "./PlaygroundIcon";

export default function ImageViewer({
  pieces,
  selected,
  onSelect,
  onClose,
}: {
  pieces: PlaygroundPiece[];
  selected: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const backdrop = useRef(false);
  const [actual, setActual] = useState(false);
  const index = pieces.findIndex((piece) => piece.id === selected);
  const piece = pieces[index];
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  useEffect(() => {
    setActual(false);
    scroll.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    onClose();
  };
  const next = (direction: number) =>
    onSelect(pieces[(index + direction + pieces.length) % pieces.length].id);
  const outside = (
    event:
      | React.PointerEvent<HTMLDialogElement>
      | React.MouseEvent<HTMLDialogElement>,
  ) => {
    const r = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    );
  };
  return (
    <dialog
      ref={dialog}
      className="play-viewer"
      aria-labelledby="viewer-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onPointerDown={(event) => {
        backdrop.current = outside(event);
      }}
      onClick={(event) => {
        if (backdrop.current && outside(event)) close();
        backdrop.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          next(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next(1);
        }
        if (event.key === "Tab") {
          const stops = event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex="0"]',
          );
          const first = stops[0],
            last = stops[stops.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }}
    >
      <header className="play-viewer-heading">
        <div>
          <p className="eyebrow">{piece.category} / ORIGINAL CONCEPT</p>
          <h2 id="viewer-title">{piece.title}</h2>
        </div>
        <button
          className="play-icon-button"
          aria-label="Close image preview"
          onClick={close}
        >
          <Icon name="close" />
        </button>
      </header>
      <div
        ref={scroll}
        className={`play-viewer-image${actual ? " is-actual" : ""}`}
        tabIndex={0}
        role="region"
        aria-label="Design image"
      >
        <img key={piece.id} src={piece.image} alt={piece.alt} />
      </div>
      <p className="play-viewer-caption">{piece.description}</p>
      <footer className="play-viewer-footer">
        <button
          className="play-icon-button"
          aria-label="Previous image"
          onClick={() => next(-1)}
        >
          <Icon name="left" />
        </button>
        <span role="status">
          {index + 1} / {pieces.length}
        </span>
        <button
          className="play-icon-button"
          aria-label="Next image"
          onClick={() => next(1)}
        >
          <Icon name="right" />
        </button>
        <button
          className="play-size-toggle"
          aria-pressed={actual}
          onClick={() => setActual(!actual)}
        >
          {actual ? "Fit image" : "Enlarge image"}
        </button>
      </footer>
    </dialog>
  );
}
