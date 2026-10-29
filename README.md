# 🧮 Danculator

The world's most dramatic math quiz. Answer 10 random math questions. Get one right and there's a genius celebration with confetti. Get one wrong and you get a (funny, not scary) jumpscare.

Built with **React + Vite + plain CSS**. No backend, no extra libraries.

## Run it

```bash
npm install
npm run dev       # start the dev server, then open the printed URL
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Customize everything in `src/config/quizConfig.js`

All images, text, colors, animation settings, difficulty and sound live in that one file, so you don't need to touch the quiz logic.

| What you want to change | Where in `quizConfig.js` |
| --- | --- |
| Number of questions | `totalQuestions` |
| Difficulty (`'easy'`, `'medium'`, `'hard'`) | `difficulty`, ranges in `difficultyLevels` |
| Which operations appear | `operations` |
| Correct / wrong images | `reactions.correct.image`, `reactions.wrong.image` |
| Emoji shown when an image is missing | `reactions.*.fallbackEmoji` |
| Popup messages | `reactions.*.title`, `subtitle`, labels |
| Buttons, welcome text, hints | `text` |
| Final result messages | `results` (percent thresholds) |
| Sticker on the results screen | `results[].image` (currently on "BIG BRAIN ENERGY!" and "DID YOU EVEN TRY?!" only) |
| Fake ad break (on/off, when, text, colors, skip timer) | `ads` |
| Background and colors | `theme` |
| Speed of every animation | `animation.durationScale` (2 = slower, 0.5 = faster) |
| Jumpscare drama | `animation.jumpscare.intensity` (0 = gentle, 2 = max) and the individual timings |
| Confetti amount | `animation.correct.confettiPieces` |
| Sound on/off and volume | `sound.enabled`, `sound.volume` |
| Custom sound files | `sound.files.correct` / `sound.files.wrong` (e.g. `'/sounds/boo.mp3'` in `public/sounds/`) |
| Respect "reduce motion" | `accessibility.respectReducedMotion` |

### Replacing the reaction images

Drop your images into `public/images/`:

- `public/images/correct.webp`: correct-answer popup (Big Brain Energy sticker), also shown on the 7–9 results screen
- `public/images/wrong.webp`: wrong-answer jumpscare (officer "Stop!" sticker), also shown on the 0-score results screen

Use the same file names, or put any file name you like in `quizConfig.js` (PNGs, GIFs, JPGs and SVGs work too). If an image is missing or fails to load, the configured emoji is shown instead.

## The wrong-answer jumpscare sequence

1. The background darkens briefly (a smooth fade, no flashing)
2. The reaction image zooms into the center
3. Huge red text appears: **"STOP! YOUR ANSWER IS WRONG! 😭"**
4. A short screen-shake
5. It settles into a normal popup with the correct answer and a Next button

Players whose system is set to reduce motion skip the zoom, shake and confetti. They go straight to the settled popup.

## Project structure

```
src/
  config/quizConfig.js        ← customize here
  hooks/useQuiz.js            ← quiz state machine (scoring, progress, duplicate-submit guard)
  hooks/useReducedMotion.js
  utils/questionGenerator.js  ← random questions (division always has whole-number answers)
  utils/results.js            ← picks the result message
  utils/theme.js              ← turns config into CSS variables
  utils/sound.js              ← soft built-in synth sounds, or your own files
  components/                 ← Welcome, Quiz, ProgressBar, CorrectPopup, Confetti,
                                WrongJumpscare, ResultsScreen, ReactionImage
public/images/                ← reaction images
```
