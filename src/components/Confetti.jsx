import { useState } from 'react';
import './Confetti.css';

const rand = (min, max) => Math.random() * (max - min) + min;

function makePieces(count, colors, fallMs) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      '--x': `${rand(0, 100)}vw`,
      '--drift': `${rand(-18, 18)}vw`,
      '--rot': `${rand(360, 1080) * (Math.random() < 0.5 ? -1 : 1)}deg`,
      '--w': `${rand(7, 13)}px`,
      '--delay': `${rand(0, fallMs * 0.35)}ms`,
      '--duration': `${rand(fallMs * 0.7, fallMs * 1.2)}ms`,
      '--color': colors[i % colors.length],
      '--radius': Math.random() < 0.3 ? '50%' : '2px',
    },
  }));
}

/** Pure-CSS confetti rain. Pieces are randomized once per mount. */
export default function Confetti({ count, colors, fallMs }) {
  const [pieces] = useState(() => makePieces(count, colors, fallMs));

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span key={piece.id} className="confetti__piece" style={piece.style} />
      ))}
    </div>
  );
}
