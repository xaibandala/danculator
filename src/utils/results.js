import quizConfig from '../config/quizConfig';

/** Picks the result message for a score, based on `quizConfig.results`. */
export function getResult(score, total, results = quizConfig.results) {
  const percent = total > 0 ? (score * 100) / total : 0;
  const sorted = [...results].sort((a, b) => b.minPercent - a.minPercent);
  return sorted.find((r) => percent >= r.minPercent) ?? sorted[sorted.length - 1];
}
