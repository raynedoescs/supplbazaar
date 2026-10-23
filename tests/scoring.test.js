"use strict";
const assert = require("node:assert/strict");
const { calculate, validateBands, drivers } = require("../js/scoring.js");
const loadData = require("./load-data.js");
const { data } = loadData();
const bands = data.config.bands;
let passed = 0;
function test(name, run) { run(); passed++; console.log("PASS " + name); }
const q = (weight = 1, reverse = false) => ({ weight, reverse });

test("all ones produce the minimum on non-reversed items", () => {
  assert.deepEqual(calculate([q(), q()], [1, 1], bands), { score: 1, band: "low", percent: 0 });
});
test("all fives produce the ten-point hard maximum", () => {
  assert.deepEqual(calculate([q(), q()], [5, 5], bands), { score: 10, band: "high", percent: 100 });
});
test("reversed questions flip both endpoints and midpoint", () => {
  assert.equal(calculate([q(1, true)], [5], bands).score, 1);
  assert.equal(calculate([q(1, true)], [1], bands).score, 10);
  assert.equal(calculate([q(1, true)], [3], bands).score, 6);
  assert.equal(calculate([q(1, true)], [4], bands).score, 3);
});
test("weights materially change the result", () => {
  assert.equal(calculate([q(3), q(1)], [5, 1], bands).score, 8);
  assert.equal(calculate([q(1), q(3)], [5, 1], bands).score, 3);
});
test("all five answer values map to the ten-point result and correct band", () => {
  const scores = [1, 3, 6, 8, 10];
  const labels = ["low", "low", "moderate", "high", "high"];
  for (let answer = 1; answer <= 5; answer++) {
    const result = calculate([q()], [answer], bands);
    assert.equal(result.score, scores[answer - 1]);
    assert.equal(result.band, labels[answer - 1]);
  }
});
test("every result score is reachable and band boundaries are correct", () => {
  const questions = Array.from({ length: 9 }, () => q());
  for (let score = 1; score <= 10; score++) {
    const answers = questions.map((_, i) => i < score - 1 ? 5 : 1);
    const result = calculate(questions, answers, bands);
    assert.equal(result.score, score);
    assert.equal(result.band, score <= 4 ? "low" : score <= 7 ? "moderate" : "high");
  }
});
test("edited thresholds are respected", () => {
  const changed = [{id:"low",label:"Low",min:1,max:3}, {id:"moderate",label:"Moderate",min:4,max:6}, {id:"high",label:"High",min:7,max:10}];
  assert.equal(calculate([q()], [3], changed).band, "moderate");
  assert.equal(calculate([q()], [4], changed).band, "high");
});
test("invalid inputs fail instead of silently producing misleading scores", () => {
  for (const value of [0, 6, 10, 11, 1.5, null, undefined, NaN, Infinity, "5"]) {
    assert.throws(() => calculate([q()], [value], bands));
  }
  assert.throws(() => calculate([], [], bands));
  assert.throws(() => calculate([q()], [], bands));
  assert.throws(() => calculate([q(4)], [3], bands));
  assert.throws(() => calculate([{weight:1}], [3], bands));
  assert.throws(() => validateBands([{id:"low",label:"Low",min:1,max:10}]));
});
test("real nutrient data reaches both extremes with reversal applied", () => {
  for (const n of data.nutrients) {
    assert.equal(calculate(n.questions, n.questions.map(q => q.reverse ? 5 : 1), bands).score, 1, n.id);
    assert.equal(calculate(n.questions, n.questions.map(q => q.reverse ? 1 : 5), bands).score, 10, n.id);
  }
});
test("all two-item combinations stay integer bounded", () => {
  for (let a = 1; a <= 5; a++) for (let b = 1; b <= 5; b++) {
    for (let w = 1; w <= 3; w++) for (const reverse of [true, false]) {
      const result = calculate([q(w, reverse), q(4 - w)], [a, b], bands);
      assert.ok(Number.isInteger(result.score) && result.score >= 1 && result.score <= 10);
      assert.ok(Number.isInteger(result.percent) && result.percent >= 0 && result.percent <= 100);
    }
  }
});
test("calculation does not mutate its arguments", () => {
  const questions = Object.freeze([Object.freeze(q()), Object.freeze(q(3, true))]);
  const answers = Object.freeze([2, 4]);
  calculate(questions, answers, bands);
  assert.deepEqual(answers, [2, 4]);
});
test("every real question runs the same way, so same answers give 1, 3, 6, 8, 10", () => {
  for (const n of data.nutrients) {
    assert.ok(n.questions.every(q => q.reverse === false), n.id);
    const scores = [1, 2, 3, 4, 5].map(a => calculate(n.questions, n.questions.map(() => a), bands).score);
    assert.deepEqual(scores, [1, 3, 6, 8, 10], n.id);
  }
});
test("every nutrient can reach every final score from 1 to 10", () => {
  let seed = 12345;
  const random = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (const n of data.nutrients) {
    const seen = new Set();
    for (let i = 0; i < 20000 && seen.size < 10; i++) {
      // Mix realistic patterns: a base answer with some questions nudged up or down.
      const base = 1 + Math.floor(random() * 5);
      const answers = n.questions.map(() => Math.min(5, Math.max(1, base + Math.floor(random() * 3) - 1)));
      seen.add(calculate(n.questions, answers, bands).score);
    }
    assert.deepEqual([...seen].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n.id);
  }
});
test("random answers are no longer squeezed into the middle band", () => {
  let seed = 99;
  const random = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (const n of data.nutrients) {
    const counts = { low: 0, moderate: 0, high: 0 };
    for (let i = 0; i < 5000; i++) {
      const base = 1 + Math.floor(random() * 5);
      counts[calculate(n.questions, n.questions.map(() => Math.min(5, Math.max(1, base + Math.floor(random() * 3) - 1))), bands).band]++;
    }
    for (const band of ["low", "moderate", "high"]) assert.ok(counts[band] > 750, n.id + " " + band + " " + counts[band]);
  }
});
test("drivers list the biggest contributions at answer 3 or above, largest first", () => {
  const qs = [q(1), q(3), q(2), q(3)];
  assert.deepEqual(drivers(qs, [5, 4, 5, 2]), [1, 2, 0]);
  assert.deepEqual(drivers(qs, [1, 2, 1, 2]), []);
  assert.deepEqual(drivers(qs, [3, 3, 3, 3], 2), [1, 3]);
  assert.deepEqual(drivers([q(2, true)], [1]), [0]);
  assert.throws(() => drivers(qs, [6, 1, 1, 1]));
});
test("every score has its own interpretation with no deficiency wording", () => {
  const texts = new Set();
  for (let score = 1; score <= 10; score++) {
    const t = data.config.copy.interpretations[score];
    assert.ok(typeof t === "string" && t.length > 20, String(score));
    assert.ok(!/deficien|you lack/i.test(t), String(score));
    texts.add(t);
  }
  assert.equal(texts.size, 10);
});
console.log(`\n${passed} scoring tests passed.`);
