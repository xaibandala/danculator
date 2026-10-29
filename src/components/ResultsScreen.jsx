import quizConfig from '../config/quizConfig';
import { getResult } from '../utils/results';
import ReactionImage from './ReactionImage';
import './ResultsScreen.css';

export default function ResultsScreen({ score, total, history, onPlayAgain }) {
  const { text } = quizConfig;
  const result = getResult(score, total);

  return (
    <main className="card results">
      <p className="results__label">{text.resultsTitle}</p>
      <p className="results__score">
        <span className="results__score-value">{score}</span>
        <span className="results__score-total"> / {total}</span>
      </p>

      {(result.image || result.fallbackEmoji) && (
        <ReactionImage
          className="results__sticker"
          src={result.image}
          fallbackEmoji={result.fallbackEmoji}
          alt={result.imageAlt ?? result.message}
        />
      )}

      <h1 className="results__message">{result.message}</h1>
      {result.comment && <p className="results__comment">{result.comment}</p>}

      <ol className="results__history" aria-label="Your answers">
        {history.map(({ question, given, isCorrect }, i) => (
          <li
            key={question.id}
            className={`results__dot ${isCorrect ? 'results__dot--correct' : 'results__dot--wrong'}`}
            title={`${question.text} = ${question.answer} (you said ${given})`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span aria-hidden="true">{isCorrect ? '✅' : '❌'}</span>
            <span className="visually-hidden">
              {question.text} = {question.answer}, you said {given}: {isCorrect ? 'correct' : 'wrong'}
            </span>
          </li>
        ))}
      </ol>

      <button type="button" className="btn btn--big" onClick={onPlayAgain} autoFocus>
        {text.playAgainButton}
      </button>
    </main>
  );
}
