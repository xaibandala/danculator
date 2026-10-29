import { useMemo } from 'react';
import quizConfig from './config/quizConfig';
import { useQuiz } from './hooks/useQuiz';
import { useReducedMotion } from './hooks/useReducedMotion';
import { getThemeVariables } from './utils/theme';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const quiz = useQuiz(quizConfig);
  const reducedMotion = useReducedMotion();
  const themeVariables = useMemo(() => getThemeVariables(quizConfig), []);

  let screen;
  if (quiz.status === 'welcome') {
    screen = <WelcomeScreen level={quiz.level} onStart={quiz.start} />;
  } else if (quiz.status === 'finished') {
    screen = (
      <ResultsScreen
        score={quiz.score}
        total={quiz.total}
        history={quiz.history}
        onPlayAgain={quiz.start}
      />
    );
  } else {
    screen = <QuizScreen quiz={quiz} reducedMotion={reducedMotion} />;
  }

  return (
    <div className={`app${reducedMotion ? ' app--reduced-motion' : ''}`} style={themeVariables}>
      {screen}
    </div>
  );
}
