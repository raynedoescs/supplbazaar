"use strict";
const assert = require("node:assert/strict");
const { summarize } = require("../js/summary.js");
const { data } = require("./load-data.js")();
const rules = data.summaryRules;
const now = new Date("2026-10-21T12:00:00Z");
const daysAgo = d => new Date(now.getTime() - d * 86400000).toISOString();
const row = (nutrient_id, score, age = 1) => ({ nutrient_id, score, band: score <= 4 ? "low" : score <= 7 ? "moderate" : "high", created_at: daysAgo(age) });
let passed = 0;
function test(name, run) { run(); passed++; console.log("PASS " + name); }

test("uses only the latest check-in per nutrient", () => {
  const s = summarize([row("vitamin-d", 9, 10), row("vitamin-d", 3, 2)], data.nutrients, rules, now);
  assert.equal(s.areas.length, 0);
  assert.deepEqual(s.lower.map(a => a.score), [3]);
});
test("areas at or above minScore are listed highest first", () => {
  const s = summarize([row("vitamin-b12", 6), row("vitamin-d", 9), row("zinc", 5), row("calcium", 4)], data.nutrients, rules, now);
  assert.deepEqual(s.areas.map(a => a.nutrientId), ["vitamin-d", "vitamin-b12", "zinc"]);
  assert.deepEqual(s.lower.map(a => a.nutrientId), ["calcium"]);
});
test("test-first nutrients are flagged and never lose that flag", () => {
  const s = summarize([row("iron", 10), row("magnesium", 8)], data.nutrients, rules, now);
  assert.equal(s.areas.find(a => a.nutrientId === "iron").testFirst, true);
  assert.equal(s.areas.find(a => a.nutrientId === "magnesium").testFirst, false);
});
test("multivitamin browsing is offered only from the configured number of areas", () => {
  const two = summarize([row("vitamin-d", 8), row("zinc", 8)], data.nutrients, rules, now);
  assert.equal(two.multivitamin, false);
  const three = summarize([row("vitamin-d", 8), row("zinc", 8), row("calcium", 5)], data.nutrients, rules, now);
  assert.equal(three.multivitamin, true);
});
test("old check-ins are excluded and counted", () => {
  const s = summarize([row("vitamin-d", 9, rules.maxAgeDays + 1), row("zinc", 7, 3)], data.nutrients, rules, now);
  assert.deepEqual(s.areas.map(a => a.nutrientId), ["zinc"]);
  assert.equal(s.staleNutrients, 1);
});
test("unknown nutrients and empty input are ignored safely", () => {
  assert.deepEqual(summarize([row("unobtainium", 10)], data.nutrients, rules, now), { areas: [], lower: [], multivitamin: false, staleNutrients: 0 });
  assert.deepEqual(summarize([], data.nutrients, rules, now).areas, []);
  assert.deepEqual(summarize(undefined, data.nutrients, rules, now).areas, []);
});
test("input is not mutated", () => {
  const input = Object.freeze([Object.freeze(row("zinc", 7, 1)), Object.freeze(row("zinc", 2, 5))]);
  summarize(input, data.nutrients, rules, now);
  assert.equal(input[0].score, 7);
});
console.log(`\n${passed} summary tests passed.`);
