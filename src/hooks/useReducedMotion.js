import { useEffect, useState } from 'react';
import quizConfig from '../config/quizConfig';

const QUERY = '(prefers-reduced-motion: reduce)';

/** True when the user prefers reduced motion (and the config says to respect it). */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia?.(QUERY);
    if (!mql) return undefined;
    const onChange = (event) => setPrefersReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return quizConfig.accessibility.respectReducedMotion && prefersReduced;
}
