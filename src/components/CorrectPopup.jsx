import { useEffect, useRef } from 'react';
import quizConfig from '../config/quizConfig';
import { getAnimationSettings } from '../utils/theme';
import { playSound } from '../utils/sound';
import ReactionImage from './ReactionImage';
import Confetti from './Confetti';
import './CorrectPopup.css';

export default function CorrectPopup({ isLastQuestion, reducedMotion, onNext }) {
  const { reactions, text, theme } = quizConfig;
  const reaction = reactions.correct;
  const { correct: anim } = getAnimationSettings();
  const nextRef = useRef(null);

  useEffect(() => playSound('correct'), []);

  // Focus "Next" only after the pop-in, so a held-down Enter can't skip the celebration.
  useEffect(() => {
    const timer = setTimeout(() => nextRef.current?.focus(), reducedMotion ? 0 : anim.popInMs);
    return () => clearTimeout(timer);
  }, [reducedMotion, anim.popInMs]);

  return (
    <div className="overlay overlay--correct" role="dialog" aria-modal="true" aria-labelledby="correct-title">
      <div className="popup popup--correct">
        <ReactionImage
          className="popup__image--bounce"
          src={reaction.image}
          fallbackEmoji={reaction.fallbackEmoji}
          alt={reaction.imageAlt}
        />
        <h2 id="correct-title" className="popup__title">
          {reaction.title}
        </h2>
        <p className="popup__subtitle">{reaction.subtitle}</p>
        <button ref={nextRef} type="button" className="btn btn--success btn--big" onClick={onNext}>
          {isLastQuestion ? text.finishButton : text.nextButton}
        </button>
      </div>

      {!reducedMotion && anim.confettiPieces > 0 && (
        <Confetti count={anim.confettiPieces} colors={theme.confettiColors} fallMs={anim.confettiFallMs} />
      )}
    </div>
  );
}
