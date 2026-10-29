import { useCallback, useReducer } from 'react';
import quizConfig from '../config/quizConfig';
import { generateQuestions } from '../utils/questionGenerator';

const initialState = {
  status: 'welcome', // 'welcome' | 'answering' | 'correct' | 'wrong' | 'ad' | 'finished'
  questions: [],
  index: 0,
  score: 0,
  lastAnswer: null,
  history: [],
  adAfter: [], // question numbers (1-based) followed by an ad break
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...initialState, status: 'answering', questions: action.questions, adAfter: action.adAfter };

    case 'SUBMIT': {
      // Ignoring anything but 'answering' makes double-clicks / Enter spam harmless.
      if (state.status !== 'answering') return state;
      const question = state.questions[state.index];
      const isCorrect = action.answer === question.answer;
      return {
        ...state,
        status: isCorrect ? 'correct' : 'wrong',
        score: state.score + (isCorrect ? 1 : 0),
        lastAnswer: action.answer,
        history: [...state.history, { question, given: action.answer, isCorrect }],
      };
    }

    case 'NEXT': {
      if (state.status !== 'correct' && state.status !== 'wrong') return state;
      if (state.index + 1 >= state.questions.length) return { ...state, status: 'finished' };
      if (state.adAfter.includes(state.index + 1)) return { ...state, status: 'ad' };
      return { ...state, status: 'answering', index: state.index + 1, lastAnswer: null };
    }

    case 'CLOSE_AD':
      if (state.status !== 'ad') return state;
      return { ...state, status: 'answering', index: state.index + 1, lastAnswer: null };

    default:
      return state;
  }
}

function getLevel(config) {
  return config.difficultyLevels[config.difficulty] ?? Object.values(config.difficultyLevels)[0];
}

export function useQuiz(config = quizConfig) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Questions are generated here (not in the reducer) so the reducer stays pure.
  const start = useCallback(() => {
    const count = Math.max(1, Math.floor(config.totalQuestions));
    dispatch({
      type: 'START',
      questions: generateQuestions(count, getLevel(config), config.operations),
      adAfter: config.ads?.enabled ? (config.ads.showAfterQuestions ?? []) : [],
    });
  }, [config]);

  const submit = useCallback((answer) => dispatch({ type: 'SUBMIT', answer }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const closeAd = useCallback(() => dispatch({ type: 'CLOSE_AD' }), []);

  const total = state.questions.length;

  return {
    ...state,
    total,
    currentQuestion: state.questions[state.index] ?? null,
    isLastQuestion: state.index + 1 >= total,
    answeredCount: state.history.length,
    level: getLevel(config),
    start,
    submit,
    next,
    closeAd,
  };
}
