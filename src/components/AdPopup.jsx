import { useEffect, useRef, useState } from 'react';
import quizConfig from '../config/quizConfig';
import './AdPopup.css';

/** A parody "mobile game ad" break. Skippable after a short countdown. */
export default function AdPopup({ onClose }) {
  const ad = quizConfig.ads;
  const [secondsLeft, setSecondsLeft] = useState(Math.max(0, Math.ceil(ad.skipDelaySeconds ?? 0)));
  const [pranked, setPranked] = useState(false);
  const dialogRef = useRef(null);
  const continueRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (pranked) continueRef.current?.focus();
  }, [pranked]);

  const colors = {
    '--ad-bg': ad.colors.background,
    '--ad-text': ad.colors.text,
    '--ad-accent': ad.colors.accent,
    '--ad-button': ad.colors.button,
  };

  return (
    <div className="overlay overlay--ad" role="dialog" aria-modal="true" aria-labelledby="ad-headline">
      <div ref={dialogRef} className="ad" style={colors} tabIndex={-1}>
        <div className="ad__topbar">
          <span className="ad__label">{ad.label}</span>
          <span className="ad__sponsored">{ad.sponsored}</span>
          <button type="button" className="ad__skip" onClick={onClose} disabled={secondsLeft > 0}>
            {secondsLeft > 0 ? ad.skipCountdown.replace('{s}', secondsLeft) : ad.skipButton}
          </button>
        </div>

        <p className="ad__badge">{ad.badge}</p>
        <h2 id="ad-headline" className="ad__headline">
          {ad.headline}
        </h2>

        {pranked ? (
          <div className="ad__response">
            <p>{ad.ctaResponse}</p>
            <button ref={continueRef} type="button" className="btn btn--big" onClick={onClose}>
              {ad.continueButton}
            </button>
          </div>
        ) : (
          <>
            <p className="ad__body">{ad.body}</p>
            <ul className="ad__bullets">
              {ad.bullets.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>
            <p className="ad__prompt">{ad.ctaPrompt}</p>
            <button type="button" className="ad__cta" onClick={() => setPranked(true)}>
              “{ad.ctaButton}”
            </button>
            <p className="ad__warning">{ad.warning}</p>
          </>
        )}
      </div>
    </div>
  );
}
