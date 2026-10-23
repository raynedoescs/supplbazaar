"use strict";
const assert = require("node:assert/strict");
const loadData = require("./load-data.js");
const validate = require("./validate-data.js");
const base = JSON.parse(JSON.stringify(loadData().data));
const clone = () => structuredClone(base);
assert.deepEqual(validate(base).errors, []);
for (const [name, mutate, pattern] of [
  ["affiliate threshold above ten", s => s.config.affiliateMinScore = 11, /affiliate threshold/],
  ["outdated five-point result bands", s => s.config.bands = [
    {id:"low",label:"Low",min:1,max:2},
    {id:"moderate",label:"Moderate",min:3,max:3},
    {id:"high",label:"High",min:4,max:5}
  ], /Bands must cover 1–10/],
  ["question count", s => s.nutrients[0].questions.pop(), /exactly 10/],
  ["unknown category", s => s.nutrients[0].category = "unknown", /unknown category/],
  ["duplicate nutrient", s => s.nutrients.push(s.nutrients[0]), /duplicate id/],
  ["duplicate category", s => s.categories.push(s.categories[0]), /duplicate id/],
  ["duplicate question", s => s.nutrients[1].questions[0].id = s.nutrients[0].questions[0].id, /duplicate id/],
  ["weight too large", s => s.nutrients[0].questions[0].weight = 4, /weight/],
  ["weight too small", s => s.nutrients[0].questions[0].weight = 0, /weight/],
  ["unknown answer scale", s => s.nutrients[0].questions[0].scale = "nope", /unknown scale/],
  ["scale without five labels", s => s.config.scales.often = ["Never", "Always"], /5 distinct labels/],
  ["missing topic", s => s.nutrients[0].questions[0].topic = " ", /missing topic/],
  ["reversed question", s => s.nutrients[0].questions[0].reverse = true, /reverse must be false/],
  ["missing reverse", s => delete s.nutrients[0].questions[0].reverse, /reverse/],
  ["missing interpretation", s => delete s.config.copy.interpretations[7], /interpretation for score 7/],
  ["deficiency wording", s => s.config.copy.interpretations[9] = "You are deficient.", /deficient/],
  ["invalid kind", s => s.nutrients[0].questions[0].kind = "vibes", /invalid kind/],
  ["duplicate product", s => s.products.push(s.products[0]), /Product .*duplicate/],
  ["unknown shop category", s => s.products[0].category = "unknown", /unknown shop category/],
  ["non-numeric price", s => s.products[0].price = "399", /price/],
  ["mrp below price", s => s.products[0].mrp = 1, /mrp/],
  ["insecure buy link", s => s.products[0].buyUrl = "http://example.com", /https/],
  ["unknown product nutrient", s => s.products[0].nutrients = ["unobtainium"], /nutrients/],
  ["image path escaping the site", s => s.products[0].image = "../secret.jpg", /image/],
  ["unknown icon", s => s.nutrients[0].icon = "rocket", /unknown icon/],
  ["service-role key pasted into the public config", s => s.backend.supabaseAnonKey = "x." + Buffer.from(JSON.stringify({ role: "service_role" })).toString("base64url") + ".y", /SECRET/],
  ["new-style secret key", s => s.backend.supabaseAnonKey = "sb_secret_abc", /SECRET/],
  ["half-configured backend", s => s.backend.supabaseUrl = "https://p.supabase.co", /both/],
  ["insecure backend URL", s => { s.backend.supabaseUrl = "http://p.supabase.co"; s.backend.supabaseAnonKey = "k"; }, /https/],
  ["summary rule with unknown nutrient", s => s.summaryRules.testFirst = ["unobtainium"], /testFirst/],
  ["summary rule with unknown shop category", s => s.summaryRules.multivitamin.shopCategory = "nope", /multivitamin/],
  ["a sex-specific variant breaks the ten-question rule", s => s.nutrients.find(n => n.id === "iron").questions.find(q => q.id === "fe-nsaid").audience = "female", /exactly 10 questions for the female profile/],
  ["invalid audience", s => s.nutrients.find(n => n.id === "iron").questions[0].audience = "alien", /audience/],
  ["missing learn entry", s => delete s.learn.iron, /missing Learn entry/],
  ["learn figure not in the reference text", s => s.learn.iron.needs.rows[0].amount = "99 mg a day", /not in typicalIntake/],
  ["learn table with an age gap", s => s.learn.iron.needs.rows = [s.learn.iron.needs.rows[0]], /no needs row/],
  ["learn upper limit disagrees", s => s.learn["vitamin-d"].tooMuch = "The limit is 77 mcg.", /tooMuch figure/],
  ["learn diagnoses the reader", s => s.learn.zinc.whatItIs = "You are deficient in zinc.", /deficient or lacks/],
  ["learn without four key facts", s => s.learn.zinc.keyFacts.pop(), /exactly 4/],
  ["age groups with a gap", s => s.config.ageGroups[2].min = 50, /contiguous/],
  ["best seller not a boolean", s => s.products[0].bestSeller = "yes", /bestSeller/],
  ["missing image file", s => s.products[0].image = "images/products/does-not-exist.jpg", /image file not found/]
]) {
  const changed = clone(); mutate(changed);
  assert.ok(validate(changed).errors.some(e => pattern.test(e)), name);
  console.log("PASS validator rejects " + name);
}
// Test-first nutrients (such as vitamin A) deliberately have no affiliate entry, so count relative to the real data.
const noEntry = s => validate(s).warnings.filter(w => w.includes("no affiliate entry")).length;
const missing = clone(); delete missing.affiliate.links[missing.nutrients[0].id];
assert.equal(validate(missing).errors.length, 0);
assert.equal(noEntry(missing), noEntry(clone()) + 1);
console.log("PASS missing affiliate entry only warns");
