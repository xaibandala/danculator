import quizConfig from '../config/quizConfig';

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));

/** Resolves animation settings: applies `durationScale` and jumpscare `intensity`. */
export function getAnimationSettings(config = quizConfig) {
  const { animation } = config;
  const scale = Math.max(0.1, animation.durationScale ?? 1);
  const ms = (value) => Math.round(value * scale);
  const js = animation.jumpscare;
  const intensity = clamp(js.intensity ?? 1, 0, 2);

  return {
    progressBarMs: ms(animation.progressBarMs),
    questionPopMs: ms(animation.questionPopMs),
    correct: {
      popInMs: ms(animation.correct.popInMs),
      bounceMs: ms(animation.correct.bounceMs),
      confettiPieces: Math.round(clamp(animation.correct.confettiPieces, 0, 300)),
      confettiFallMs: ms(animation.correct.confettiFallMs),
    },
    jumpscare: {
      darkenMs: ms(js.darkenMs),
      zoomMs: ms(js.zoomMs),
      shakeMs: ms(js.shakeMs),
      settleMs: ms(js.settleMs),
      darkenOpacity: clamp(js.darkenOpacity, 0, 1),
      settledOpacity: clamp(js.settledOpacity, 0, 1),
      zoomFromScale: clamp(js.zoomFromScale, 0, 1),
      zoomOvershootScale: 1 + (Math.max(1, js.zoomOvershootScale) - 1) * intensity,
      // Capped so the shake always stays playful, never nauseating.
      shakeDistancePx: Math.min(24, js.shakeDistancePx * intensity),
      shakeRotateDeg: Math.min(6, js.shakeRotateDeg * intensity),
    },
  };
}

/** Converts the theme + animation config into CSS custom properties for the app root. */
export function getThemeVariables(config = quizConfig) {
  const t = config.theme;
  const a = getAnimationSettings(config);

  return {
    '--bg-gradient': t.backgroundGradient,
    '--card-bg': t.cardBackground,
    '--text-color': t.textColor,
    '--muted-text': t.mutedText,
    '--primary': t.primary,
    '--primary-hover': t.primaryHover,
    '--primary-dark': t.primaryDark,
    '--accent': t.accent,
    '--success': t.success,
    '--success-dark': t.successDark,
    '--success-bg': t.successBackground,
    '--danger': t.danger,
    '--danger-dark': t.dangerDark,
    '--danger-bg': t.dangerBackground,
    '--jumpscare-backdrop': t.jumpscareBackdrop,
    '--correct-backdrop': t.correctBackdrop,
    '--font-family': t.fontFamily,

    '--progress-ms': `${a.progressBarMs}ms`,
    '--question-pop-ms': `${a.questionPopMs}ms`,
    '--correct-pop-ms': `${a.correct.popInMs}ms`,
    '--correct-bounce-ms': `${a.correct.bounceMs}ms`,

    '--js-darken-ms': `${a.jumpscare.darkenMs}ms`,
    '--js-zoom-ms': `${a.jumpscare.zoomMs}ms`,
    '--js-shake-ms': `${a.jumpscare.shakeMs}ms`,
    '--js-settle-ms': `${a.jumpscare.settleMs}ms`,
    '--js-darken-opacity': a.jumpscare.darkenOpacity,
    '--js-settled-opacity': a.jumpscare.settledOpacity,
    '--js-zoom-from': a.jumpscare.zoomFromScale,
    '--js-zoom-overshoot': a.jumpscare.zoomOvershootScale,
    '--js-shake-distance': `${a.jumpscare.shakeDistancePx}px`,
    '--js-shake-rotate': `${a.jumpscare.shakeRotateDeg}deg`,
  };
}
