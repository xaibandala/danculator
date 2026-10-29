import { useEffect, useRef, useState } from 'react';
import quizConfig from '../config/quizConfig';
import { parseAnswer } from '../utils/questionGenerator';
import ProgressBar from './ProgressBar';
import CorrectPopup from './CorrectPopup';
import WrongJumpscare from './WrongJumpscare';
import './QuizScreen.css';

export default function QuizScreen({ quiz, reducedMotion }) {
  const { text } = quizConfig;
  const { currentQuestion, index, total, score, status, lastAnswer, isLastQuestion, answeredCount } = quiz;
  const [input, setInput] = useState('');
  const [hint, setHint] = useState('');
  const inputRef = useRef(null);
  const isAnswering = status === 'answering';

  // Focus the input for every new question.
  useEffect(() => {
    if (status === 'answering') inputRef.current?.focus();
  }, [status, index]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isAnswering) return;

    const answer = parseAnswer(input);
    if (answer === null) {
      setHint(text.invalidAnswerHint);
      inputRef.current?.focus();
      return;
    }
    quiz.submit(answer);
    // Cleared now (not when the next question appears) so nothing typed later gets wiped.
    setInput('');
  }

  if (!currentQuestion) return null;

  return (
    <>
      <main className={`card quiz${isAnswering ? '' : ' quiz--behind'}`} aria-hidden={!isAnswering || undefined}>
        <header className="quiz__header">
          <span className="pill">
            {text.questionLabel} {index + 1} {text.questionOf} {total}
          </span>
          <span className="pill pill--score">
            {text.scoreLabel}:{' '}
            <span key={score} className="quiz__score">
              {score}
            </span>
          </span>
        </header>

        <ProgressBar value={answeredCount} max={total} />

        <div className="quiz__question" aria-live="polite">
          <span key={currentQuestion.id} className="quiz__question-text">
            {currentQuestion.text} <span className="quiz__equals">= ?</span>
          </span>
        </div>

        <form className="quiz__form" onSubmit={handleSubmit} noValidate>
          <input
            ref={inputRef}
            className={`quiz__input${hint ? ' quiz__input--invalid' : ''}`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder={text.answerPlaceholder}
            aria-label={text.answerAriaLabel}
            aria-invalid={!!hint}
            aria-describedby={hint ? 'quiz-hint' : undefined}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (hint) setHint('');
            }}
            disabled={!isAnswering}
          />
          <button type="submit" className="btn" disabled={!isAnswering}>
            {text.submitButton}
          </button>
        </form>

        <p id="quiz-hint" className="quiz__hint" role="status">
          {hint}
        </p>
      </main>

      {status === 'correct' && (
        <CorrectPopup key={index} isLastQuestion={isLastQuestion} reducedMotion={reducedMotion} onNext={quiz.next} />
      )}
      {status === 'wrong' && (
        <WrongJumpscare
          key={index}
          question={currentQuestion}
          givenAnswer={lastAnswer}
          isLastQuestion={isLastQuestion}
          reducedMotion={reducedMotion}
          onNext={quiz.next}
        />
      )}
    </>
  );
}
