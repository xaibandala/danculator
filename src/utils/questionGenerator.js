const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const OPERATIONS = {
  addition: {
    symbol: '+',
    make: (lvl) => {
      const a = randInt(lvl.addSubMin, lvl.addSubMax);
      const b = randInt(lvl.addSubMin, lvl.addSubMax);
      return { a, b, answer: a + b };
    },
  },
  subtraction: {
    symbol: '−',
    make: (lvl) => {
      let a = randInt(lvl.addSubMin, lvl.addSubMax);
      let b = randInt(lvl.addSubMin, lvl.addSubMax);
      if (!lvl.allowNegative && b > a) [a, b] = [b, a];
      return { a, b, answer: a - b };
    },
  },
  multiplication: {
    symbol: '×',
    make: (lvl) => {
      const a = randInt(lvl.mulDivMin, lvl.mulDivMax);
      const b = randInt(lvl.mulDivMin, lvl.mulDivMax);
      return { a, b, answer: a * b };
    },
  },
  division: {
    symbol: '÷',
    // Built backwards from the answer so the result is always a whole number.
    make: (lvl) => {
      const divisor = randInt(Math.max(2, lvl.mulDivMin), Math.max(2, lvl.mulDivMax));
      const quotient = randInt(lvl.mulDivMin, lvl.mulDivMax);
      return { a: divisor * quotient, b: divisor, answer: quotient };
    },
  },
};

/**
 * Generates `count` random questions.
 * Every enabled operation appears (as evenly as possible) and duplicates are avoided.
 */
export function generateQuestions(count, level, enabledOperations) {
  let ops = Object.keys(OPERATIONS).filter((op) => enabledOperations?.[op]);
  if (ops.length === 0) ops = ['addition'];

  const opSequence = shuffle(Array.from({ length: count }, (_, i) => ops[i % ops.length]));
  const seen = new Set();

  return opSequence.map((operation, i) => {
    const { symbol, make } = OPERATIONS[operation];
    let q = make(level);
    for (let tries = 0; tries < 25 && seen.has(`${q.a}${symbol}${q.b}`); tries++) {
      q = make(level);
    }
    seen.add(`${q.a}${symbol}${q.b}`);

    return {
      id: `${Date.now()}-${i}`,
      operation,
      symbol,
      a: q.a,
      b: q.b,
      text: `${q.a} ${symbol} ${q.b}`,
      answer: q.answer,
    };
  });
}

/** Parses user input into a number, or returns null if it isn't one. */
export function parseAnswer(raw) {
  const cleaned = String(raw).trim().replace(/[−–]/g, '-').replace(/\s+/g, '');
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  return Number(cleaned);
}
