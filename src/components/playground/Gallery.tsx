import { useEffect, useRef, useState } from 'react';
import { playgroundPieces, type PlaygroundPiece } from '../../data/playground';
import './gallery.css';

const curatedIds = ['daily-bread', 'room-sixteen', 'stillwater', 'queue-desk'];
const pieces = [...curatedIds.map(id => playgroundPieces.find(piece => piece.id === id)!), ...playgroundPieces.filter(piece => !curatedIds.includes(piece.id))];

export default function Gallery() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(() => matchMedia('(max-width: 700px)').matches ? 2 : 4);
  useEffect(() => {
    const media = matchMedia('(max-width: 700px)');
    const resize = () => { setPageSize(media.matches ? 2 : 4); setPage(0); };
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  const [selected, setSelected] = useState<PlaygroundPiece | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const count = Math.ceil(pieces.length / pageSize);
  const start = page * pageSize;
  const visible = pieces.slice(start, start + pageSize);
  const dismiss = () => { setSelected(null); trigger.current?.focus({ preventScroll: true }); };
  return <>
    <div className="gallery-grid" id="design-studies">{visible.map(piece => <figure key={piece.id} className="gallery-item">
      <button className="gallery-preview" aria-label={`Open design: ${piece.title}`} onClick={event => { trigger.current = event.currentTarget; setSelected(piece); }}>
        <img src={`/images/playground/thumbnails/${piece.id}.webp`} alt={piece.alt} width="600" height="750" loading="lazy" decoding="async" />
        <span className="gallery-open" aria-hidden="true">View full page ↗</span>
      </button>
      <figcaption>{piece.title}</figcaption>
    </figure>)}</div>
    <div className="gallery-pagination"><p aria-live="polite" aria-atomic="true">{start + 1}–{Math.min(start + pageSize, pieces.length)} <span>of {pieces.length} studies</span></p><div><button type="button" className="small-button" aria-controls="design-studies" aria-label="Previous designs" disabled={page === 0} onClick={() => setPage(value => value - 1)}>←<span>Previous</span></button><button type="button" className="small-button" aria-controls="design-studies" aria-label="Next designs" disabled={page === count - 1} onClick={() => setPage(value => value + 1)}><span>Next</span>→</button></div></div>
    {selected && <DesignDialog piece={selected} onDismiss={dismiss} />}
  </>;
}

function DesignDialog({ piece, onDismiss }: { piece: PlaygroundPiece; onDismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => { dialog.current?.close(); onDismiss(); };
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={dialog} className="design-dialog" aria-labelledby="design-title" aria-describedby="design-description" onCancel={event => { event.preventDefault(); close(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  }}>
    <div className="dialog-bar"><div><p className="eyebrow">Original design study</p><h3 id="design-title">{piece.title}</h3></div><button className="small-button" onClick={close} aria-label="Close design preview" autoFocus>Close <span aria-hidden="true">×</span></button></div>
    <p className="dialog-description" id="design-description">{piece.description}</p>
    <img className="design-full-image" src={piece.image} alt={piece.alt} width={piece.width} height={piece.height} decoding="async" />
  </dialog>;
}
