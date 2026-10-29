/**
 * ============================================================
 *  DANCULATOR — QUIZ CONFIGURATION
 * ============================================================
 *  Everything you're likely to customize lives in this file:
 *  images, popup text, colors, animation timings, jumpscare
 *  intensity, difficulty, number of questions, result messages
 *  and sound. Components read from here, so you never need to
 *  touch the quiz logic to restyle or re-meme the game.
 *
 *  Images: put your files in `public/images/` and reference them
 *  as '/images/your-file.png'. If an image is missing or fails to
 *  load, the matching `fallbackEmoji` is shown instead.
 * ============================================================
 */

const quizConfig = {
  // ---------------------------------------------------------------
  // GENERAL
  // ---------------------------------------------------------------

  /** How many questions per round. */
  totalQuestions: 10,

  /** Which preset from `difficultyLevels` to use: 'easy' | 'medium' | 'hard' */
  difficulty: 'easy',

  /** Toggle which operations can appear. At least one must be true. */
  operations: {
    addition: true,
    subtraction: true,
    multiplication: true,
    division: true,
  },

  /**
   * Number ranges per difficulty.
   *  - addSubMin / addSubMax: operand range for + and −
   *  - mulDivMin / mulDivMax: operand range for × and ÷ (division always
   *    produces a whole-number answer)
   *  - allowNegative: let subtraction produce negative answers
   */
  difficultyLevels: {
    easy: { label: 'Easy', addSubMin: 1, addSubMax: 20, mulDivMin: 1, mulDivMax: 10, allowNegative: false },
    medium: { label: 'Medium', addSubMin: 10, addSubMax: 100, mulDivMin: 2, mulDivMax: 12, allowNegative: false },
    hard: { label: 'Hard', addSubMin: 25, addSubMax: 500, mulDivMin: 3, mulDivMax: 25, allowNegative: true },
  },

  // ---------------------------------------------------------------
  // TEXT
  // ---------------------------------------------------------------
  text: {
    appTitle: 'DANCULATOR',
    appEmoji: '🧮',
    tagline: "The world's most dramatic math quiz.",
    welcomeRules: [
      'Answer the math question. Easy, right? 🤓',
      'Get it right → a genius celebration 🎉',
      'Get it wrong → prepare yourself… 😱',
    ],
    startButton: "LET'S GOOO! 🚀",
    questionLabel: 'Question',
    questionOf: 'of',
    scoreLabel: 'Score',
    answerPlaceholder: 'Your answer…',
    answerAriaLabel: 'Your answer',
    submitButton: 'Submit',
    invalidAnswerHint: 'Type a number first, bestie 🤨',
    nextButton: 'Next Question ➡️',
    finishButton: 'See My Results 🏁',
    resultsTitle: 'FINAL SCORE',
    playAgainButton: 'Play Again 🔁',
  },

  // ---------------------------------------------------------------
  // REACTIONS (popups)
  // ---------------------------------------------------------------
  reactions: {
    correct: {
      image: '/images/correct.webp',
      fallbackEmoji: '🥳',
      imageAlt: 'Big Brain Energy sticker',
      title: "CORRECT! YOU'RE A GENIUS! 🎉",
      subtitle: '+1 point. Big brain move.',
    },
    wrong: {
      image: '/images/wrong.webp',
      fallbackEmoji: '😱',
      imageAlt: 'Traffic officer sticker: "Stop! Your answer is wrong"',
      title: 'STOP! YOUR ANSWER IS WRONG! 😭',
      yourAnswerLabel: 'You said',
      correctAnswerLabel: 'The correct answer was',
    },
  },

  // ---------------------------------------------------------------
  // RESULT MESSAGES
  // ---------------------------------------------------------------
  /**
   * The first entry whose `minPercent` the player's score reaches wins.
   * Percent-based so it still works if you change `totalQuestions`.
   * With 10 questions: 10 → 100%, 7–9 → 70%+, 4–6 → 40%+, 1–3 → >0%, 0 → 0%.
   *
   * Optional per result: `image` (a sticker shown on the results screen),
   * `imageAlt`, and `fallbackEmoji` (shown if the image is missing).
   */
  results: [
    { minPercent: 100, message: 'MATH GOD! 🧠👑', comment: 'Flawless. Calculators fear you.' },
    {
      minPercent: 70,
      message: 'BIG BRAIN ENERGY! 🔥',
      comment: 'Your teacher would be proud. Probably.',
      image: '/images/correct.webp',
      imageAlt: 'Big Brain Energy sticker',
      fallbackEmoji: '🧠',
    },
    { minPercent: 40, message: 'NOT BAD! 😎', comment: 'Respectable. Mid, but respectable.' },
    { minPercent: 1, message: 'BRO, WHAT HAPPENED?! 😭', comment: 'The numbers were right there…' },
    {
      minPercent: 0,
      message: 'DID YOU EVEN TRY?! 💀',
      comment: 'Zero. Zilch. Nada. Legendary, honestly.',
      image: '/images/wrong.webp',
      imageAlt: 'Traffic officer sticker: "Stop! Your answer is wrong"',
      fallbackEmoji: '💀',
    },
  ],

  // ---------------------------------------------------------------
  // FAKE AD BREAK
  // ---------------------------------------------------------------
  ads: {
    enabled: true,
    /** Question numbers after which the ad pops up (1 = after the first question). */
    showAfterQuestions: [1],
    /** Seconds before the "Skip Ad" button can be clicked. */
    skipDelaySeconds: 3,

    label: 'AD',
    sponsored: 'Sponsored',
    skipCountdown: 'Skip in {s}…',
    skipButton: 'Skip Ad ⏭',

    badge: '📢 SPECIAL OFFER!',
    headline: 'GUSTO MO BANG LUMAKI ANG IYONG TITI? 😳',
    body: 'May bagong Male Enhancement Program kami para sa mga lalaking gustong “mag-level up.” 😂',
    bullets: ['Confidential', 'No appointment needed', 'Limited slots only', '₱99 initial consultation'],
    ctaPrompt: 'Para ma-check kung eligible ka, reply:',
    ctaButton: 'GUSTO KO',
    warning: '⚠️ Warning: Posibleng lumaki ang kumpiyansa kaysa sa actual result. 😂',

    /** Shown after the player clicks the CTA button. */
    ctaResponse: '😂 Na-prank ka! Walang ganyan dito. Math muna bago kumpiyansa.',
    continueButton: 'Balik sa Math ➡️',

    colors: {
      background: '#fde047',
      text: '#1c1917',
      accent: '#dc2626',
      button: '#16a34a',
    },
  },

  // ---------------------------------------------------------------
  // THEME / COLORS
  // ---------------------------------------------------------------
  theme: {
    backgroundGradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%)',
    cardBackground: '#ffffff',
    textColor: '#2e1065',
    mutedText: '#6b6394',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    primaryDark: '#4c1d95',
    accent: '#f59e0b',
    success: '#22c55e',
    successDark: '#15803d',
    successBackground: '#f0fdf4',
    danger: '#ef4444',
    dangerDark: '#991b1b',
    dangerBackground: '#fff1f2',
    /** Color the screen darkens to during the jumpscare. */
    jumpscareBackdrop: '#12001f',
    /** Tint behind the "correct" popup. */
    correctBackdrop: '#052e16',
    confettiColors: ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#facc15', '#14b8a6'],
    fontFamily: "'Baloo 2', 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
  },

  // ---------------------------------------------------------------
  // ANIMATIONS
  // ---------------------------------------------------------------
  animation: {
    /** Global speed multiplier for every duration below. 2 = twice as slow, 0.5 = twice as fast. */
    durationScale: 1,

    progressBarMs: 600,
    questionPopMs: 450,

    correct: {
      popInMs: 450,
      bounceMs: 900,
      confettiPieces: 80,
      confettiFallMs: 2600,
    },

    jumpscare: {
      /** 0 = gentle, 1 = default drama, 2 = maximum drama (capped for comfort). */
      intensity: 1,
      /** Step 1: how long the background takes to darken. */
      darkenMs: 220,
      /** How dark the screen gets (0–1) during the jumpscare. */
      darkenOpacity: 0.82,
      /** How dark it stays once the popup settles (0–1). */
      settledOpacity: 0.6,
      /** Step 2: the image zooms in. */
      zoomMs: 280,
      zoomFromScale: 0.1,
      zoomOvershootScale: 1.2,
      /** Step 4: the screen-shake. */
      shakeMs: 500,
      shakeDistancePx: 14,
      shakeRotateDeg: 3,
      /** Step 5: shrinking into a normal popup. */
      settleMs: 450,
    },
  },

  // ---------------------------------------------------------------
  // SOUND
  // ---------------------------------------------------------------
  sound: {
    enabled: true,
    /** 0–1. Capped at 0.5 so nothing is ever startlingly loud. */
    volume: 0.2,
    /**
     * Optional audio files (e.g. '/sounds/correct.mp3' placed in public/sounds/).
     * Leave as null to use the built-in soft synth sounds.
     */
    files: {
      correct: null,
      wrong: null,
    },
  },

  // ---------------------------------------------------------------
  // ACCESSIBILITY
  // ---------------------------------------------------------------
  accessibility: {
    /** When true, users with "reduce motion" enabled get no zoom, shake or confetti. */
    respectReducedMotion: true,
  },
};

export default quizConfig;
