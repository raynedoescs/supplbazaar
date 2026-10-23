(function (root) {
  "use strict";
  // Quiz answers and final scores deliberately use different scales.
  var maxAnswer = 5;
  var maxScore = 10;

  // Pure functions: no browser state, storage, network, or changes to inputs.
  function validateBands(bands) {
    if (!Array.isArray(bands) || bands.length !== 3) throw new Error("Three scoring bands are required.");
    var next = 1;
    var names = ["low", "moderate", "high"];
    bands.forEach(function (band, i) {
      if (band.id !== names[i] || !band.label || band.min !== next ||
          !Number.isInteger(band.max) || band.max < band.min || band.max > maxScore) {
        throw new Error("Bands must cover 1–10 in low, moderate, high order.");
      }
      next = band.max + 1;
    });
    if (next !== maxScore + 1) throw new Error("Bands must cover 1–10.");
  }

  function calculate(questions, answers, bands) {
    validateBands(bands);
    if (!Array.isArray(questions) || !questions.length || !Array.isArray(answers) || answers.length !== questions.length) {
      throw new Error("Every question needs one answer.");
    }
    var total = 0;
    var weights = 0;
    questions.forEach(function (q, i) {
      var answer = answers[i];
      if (!Number.isInteger(answer) || answer < 1 || answer > maxAnswer) throw new Error("Answers must be integers from 1 to 5.");
      if (!Number.isInteger(q.weight) || q.weight < 1 || q.weight > 3 || typeof q.reverse !== "boolean") {
        throw new Error("Each question needs a weight from 1–3 and a boolean reverse flag.");
      }
      var risk = (answer - 1) / (maxAnswer - 1);
      if (q.reverse) risk = 1 - risk;
      total += q.weight * risk;
      weights += q.weight;
    });
    var weighted = total / weights;
    // Convert the weighted answer index into a ten-point result.
    var score = Math.max(1, Math.min(maxScore, Math.round(1 + (maxScore - 1) * weighted)));
    var band = bands.find(function (item) { return score >= item.min && score <= item.max; });
    // percent is the normalized questionnaire index, NEVER a medical probability.
    return { score: score, band: band.id, percent: Math.max(0, Math.min(100, Math.round(weighted * 100))) };
  }

  // Indices of the answers that added most to the score (answer 3 or higher on the risk
  // direction), largest contribution first. Ties keep question order. Used for the
  // "What raised your score most" line; it explains the arithmetic, not a diagnosis.
  function drivers(questions, answers, limit) {
    var items = [];
    questions.forEach(function (q, i) {
      var answer = answers[i];
      if (!Number.isInteger(answer) || answer < 1 || answer > maxAnswer) throw new Error("Answers must be integers from 1 to 5.");
      var risk = (answer - 1) / (maxAnswer - 1);
      if (q.reverse) risk = 1 - risk;
      if (risk >= 0.5) items.push({ index: i, contribution: q.weight * risk });
    });
    items.sort(function (a, b) { return b.contribution - a.contribution || a.index - b.index; });
    return items.slice(0, limit === undefined ? 3 : limit).map(function (item) { return item.index; });
  }

  var api = { calculate: calculate, validateBands: validateBands, drivers: drivers, maxAnswer: maxAnswer, maxScore: maxScore };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.SUPL = root.SUPL || {}; root.SUPL.scoring = api; }
}(typeof window !== "undefined" ? window : globalThis));
