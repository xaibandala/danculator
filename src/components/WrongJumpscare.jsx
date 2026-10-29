import { useEffect, useRef, useState } from 'react';
import quizConfig from '../config/quizConfig';
import { getAnimationSettings } from '../utils/theme';
import { playSound } from '../utils/sound';
import ReactionImage from './ReactionImage';
import './WrongJumpscare.css';

/**
 * The dramatic wrong-answer reaction. Runs through four phases:
 *   darken → zoom → shake → settled
 * Timings come from `quizConfig.animation.jumpscare`.
 * With reduced motion it skips straight to `settled`.
 */
export default function WrongJumpscare({ question, givenAnswer, isLastQuestion, reducedMotion, onNext }) {
  const { reactions, text } = quizConfig;
  const reaction = reactions.wrong;
  const { jumpscare: timing } = getAnimationSettings();
  const [phase, setPhase] = useState(reducedMotion ? 'settled' : 'darken');
  const nextRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('settled');
      return undefined;
    }
    const zoomAt = timing.darkenMs;
    const shakeAt = zoomAt + timing.zoomMs;
    const settleAt = shakeAt + timing.shakeMs;
    const timers = [
      setTimeout(() => setPhase('zoom'), zoomAt),
      setTimeout(() => setPhase('shake'), shakeAt),
      setTimeout(() => setPhase('settled'), settleAt),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, timing.darkenMs, timing.zoomMs, timing.shakeMs]);

  // Sound lands with the zoom (or right away with reduced motion).
  useEffect(() => {
    let stop = null;
    const timer = setTimeout(() => {
      stop = playSound('wrong');
    }, reducedMotion ? 0 : timing.darkenMs);
    return () => {
      clearTimeout(timer);
      stop?.();
    };
  }, [reducedMotion, timing.darkenMs]);

  useEffect(() => {
    if (phase === 'settled') nextRef.current?.focus();
  }, [phase]);

  return (
    <div
      className={`overlay jumpscare jumpscare--${phase}`}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="wrong-title"
      aria-describedby={phase === 'settled' ? 'wrong-details' : undefined}
    >
      {phase !== 'darken' && (
        <div className="jumpscare__popup">
          <div className="jumpscare__shaker">
            <ReactionImage
              className="jumpscare__image"
              src={reaction.image}
              fallbackEmoji={reaction.fallbackEmoji}
              alt={reaction.imageAlt}
            />
            <h2 id="wrong-title" className="jumpscare__title">
              {reaction.title}
            </h2>
          </div>

          {phase === 'settled' && (
            <div id="wrong-details" className="jumpscare__details">
              <p className="jumpscare__given">
                {reaction.yourAnswerLabel}: <strong>{givenAnswer}</strong>
              </p>
              <p className="jumpscare__correct">
                {reaction.correctAnswerLabel}
                <span className="jumpscare__equation">
                  {question.text} = <strong>{question.answer}</strong>
                </span>
              </p>
              <button ref={nextRef} type="button" className="btn btn--danger btn--big" onClick={onNext}>
                {isLastQuestion ? text.finishButton : text.nextButton}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
