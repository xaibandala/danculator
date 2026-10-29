import quizConfig from '../config/quizConfig';
import './WelcomeScreen.css';

export default function WelcomeScreen({ level, onStart }) {
  const { text, totalQuestions } = quizConfig;

  return (
    <main className="card welcome">
      <div className="welcome__emoji" aria-hidden="true">
        {text.appEmoji}
      </div>
      <h1 className="welcome__title">{text.appTitle}</h1>
      <p className="welcome__tagline">{text.tagline}</p>

      <ul className="welcome__rules">
        {text.welcomeRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <p className="welcome__meta">
        <span className="pill">📝 {totalQuestions} questions</span>
        <span className="pill">🎚️ {level?.label ?? quizConfig.difficulty} mode</span>
      </p>

      <button type="button" className="btn btn--big" onClick={onStart} autoFocus>
        {text.startButton}
      </button>
    </main>
  );
}
