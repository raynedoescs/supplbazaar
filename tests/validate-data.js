"use strict";
const loadData = require("./load-data.js");
const { validateBands, maxScore } = require("../js/scoring.js");

function contrast(a, b) {
  function luminance(hex) {
    const rgb = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  }
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}

function validate(S) {
  const errors = [], warnings = [], ratios = [];
  const ids = new Set();
  const text = value => typeof value === "string" && value.trim().length > 0;
  function requireValue(condition, message) { if (!condition) errors.push(message); }
  function unique(id, label) {
    requireValue(typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id), label + ": invalid id");
    requireValue(!ids.has(id), label + ": duplicate id " + id);
    ids.add(id);
  }
  try { validateBands(S.config.bands); } catch (e) { errors.push(e.message); }
  requireValue(Number.isInteger(S.config.affiliateMinScore) && S.config.affiliateMinScore >= 1 && S.config.affiliateMinScore <= maxScore, "Invalid affiliate threshold");
  requireValue(Number.isFinite(S.config.advanceDelayMs) && S.config.advanceDelayMs >= 0, "Invalid advance delay");
  const scales = S.config.scales || {};
  requireValue(Object.keys(scales).length > 0, "Answer scales are required");
  for (const [id, labels] of Object.entries(scales)) {
    requireValue(Array.isArray(labels) && labels.length === 5 && labels.every(text) && new Set(labels).size === 5, "Scale " + id + ": needs 5 distinct labels (1 = least concern, 5 = most)");
  }
  const interp = (S.config.copy && S.config.copy.interpretations) || {};
  for (let score = 1; score <= maxScore; score++) requireValue(text(interp[score]), "Missing interpretation for score " + score);
  for (const key of ["driversIntro", "driversNone"]) requireValue(S.config.copy && text(S.config.copy[key]), "Missing copy." + key);
  const allCopy = Object.values(interp).join(" ");
  requireValue(!/\bdeficien|\byou lack/i.test(allCopy), "Interpretations must not say someone is deficient or lacks a nutrient");
  requireValue(Array.isArray(S.categories) && S.categories.length > 0, "Categories are required");
  requireValue(Array.isArray(S.nutrients) && S.nutrients.length > 0, "Nutrients are required");
  const categories = new Set();
  for (const c of S.categories || []) {
    unique(c.id, "Category"); categories.add(c.id);
    for (const field of ["name", "blurb"]) requireValue(text(c[field]), c.id + ": missing " + field);
    requireValue(text(c.blurb) && c.blurb.trim().split(/\s+/).length <= 6, c.id + ": blurb exceeds six words");
    requireValue(Number.isFinite(c.order), c.id + ": order required");
    for (const key of ["accent", "tint", "onAccent"]) requireValue(/^#[0-9a-f]{6}$/i.test(c[key]), c.id + ": invalid " + key);
    if ([c.accent, c.tint, c.onAccent].every(v => /^#[0-9a-f]{6}$/i.test(v))) {
      const ratio = contrast(c.accent, c.onAccent);
      requireValue(ratio >= 4.5, c.id + ": accent text contrast below 4.5:1");
      requireValue(contrast(c.tint, "#505050") >= 4.5, c.id + ": muted body contrast below 4.5:1");
      ratios.push(c.id + " " + ratio.toFixed(2) + ":1");
    }
  }
  for (const n of S.nutrients || []) {
    unique(n.id, "Nutrient");
    requireValue(categories.has(n.category), n.id + ": unknown category " + n.category);
    for (const field of ["name", "summary", "typicalIntake"]) requireValue(text(n[field]), n.id + ": missing " + field);
    requireValue(["standard", "high"].includes(n.cautionLevel), n.id + ": invalid cautionLevel");
    requireValue(n.upperLimitNote === null || text(n.upperLimitNote), n.id + ": upperLimitNote must be text or null");
    requireValue(n.cautionLevel !== "high" || text(n.upperLimitNote), n.id + ": high caution needs a caution note");
    requireValue(Array.isArray(n.foodSources) && n.foodSources.length >= 3 && n.foodSources.length <= 5 && n.foodSources.every(text), n.id + ": expected 3–5 food sources");
    requireValue(S.config.questionsPerCheck === 10, "config.questionsPerCheck must be 10");
    requireValue(Array.isArray(n.questions), n.id + ": questions required");
    // Whatever the About-you answers, every check-in shows exactly ten questions.
    for (const key of ["female", "other"]) {
      requireValue((n.questions || []).filter(q => !q.audience || q.audience === key).length === 10, n.id + ": expected exactly 10 questions for the " + key + " profile");
    }
    // Optional wording for nutrients without a routine blood test (e.g. fibre).
    for (const field of ["moderateCallout", "highCallout", "testContext"]) requireValue(n[field] === undefined || text(n[field]), n.id + ": " + field + " must be text");
    for (const field of ["ageWeight", "menopauseWeight"]) {
      requireValue(n[field] === undefined || (Number.isInteger(n[field]) && n[field] >= 1 && n[field] <= 3), n.id + ": " + field + " must be an integer 1–3");
    }
    for (const q of n.questions || []) {
      unique(q.id, n.id + " question");
      for (const key of ["text", "topic"]) requireValue(text(q[key]), q.id + ": missing " + key);
      requireValue(text(q.topic) && q.topic.length <= 36, q.id + ": topic must be at most 36 characters");
      requireValue(Object.prototype.hasOwnProperty.call(scales, q.scale), q.id + ": unknown scale " + q.scale);
      requireValue(Number.isInteger(q.weight) && q.weight >= 1 && q.weight <= 3, q.id + ": weight must be 1–3");
      // Every question runs the same way (5 = most concern), so answers can't cancel out.
      requireValue(q.reverse === false, q.id + ": reverse must be false; phrase the question so 5 means most concern");
      requireValue(["symptom", "diet", "lifestyle", "medical", "background"].includes(q.kind), q.id + ": invalid kind");
      requireValue(q.audience === undefined || ["female", "other"].includes(q.audience), q.id + ": audience must be female or other");
    }
    const links = S.affiliate && S.affiliate.links[n.id];
    if (!links || !links.length) warnings.push(n.id + ": no affiliate entry (allowed)");
  }
  requireValue(S.affiliate && text(S.affiliate.disclosure), "Affiliate disclosure required");
  for (const [id, links] of Object.entries(S.affiliate ? S.affiliate.links : {})) {
    requireValue(S.nutrients.some(n => n.id === id), "Affiliate references unknown nutrient " + id);
    requireValue(Array.isArray(links) && links.length >= 1 && links.length <= 3, id + ": expected 1–3 affiliate links");
    for (const link of Array.isArray(links) ? links : []) {
      requireValue(text(link.label), id + ": affiliate label required");
      try {
        const url = new URL(link.url);
        requireValue(url.protocol === "https:" && (url.hostname === "www.amazon.in" || url.hostname === "amazon.in" || url.hostname === "amzn.to"), id + ": expected a secure Amazon India link");
      } catch (_) { errors.push(id + ": malformed affiliate URL"); }
    }
  }
  // Icons are optional, but a named icon must exist in js/icons.js.
  const icons = S.icons || {};
  const items = [...(S.categories || []), ...(S.nutrients || []), ...((S.shop && S.shop.categories) || []), ...(Array.isArray(S.products) ? S.products : [])];
  for (const item of items) requireValue(item.icon === undefined || Object.prototype.hasOwnProperty.call(icons, item.icon), (item.id || "item") + ": unknown icon " + item.icon);
  validateShop(S, { errors, warnings, ratios, requireValue, text });
  validateAccounts(S, { warnings, requireValue, text });
  validateProfileAndLearn(S, { requireValue, text });
  return { errors, warnings, ratios };
}

// About-you age groups and the Learn library (data/learn.js).
function validateProfileAndLearn(S, { requireValue, text }) {
  const groups = S.config.ageGroups;
  requireValue(Array.isArray(groups) && groups.length === 5, "config.ageGroups must list exactly 5 age groups (they map to answers 1–5)");
  let next = 18;
  for (const g of Array.isArray(groups) ? groups : []) {
    requireValue(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(g.id) && text(g.label) && g.min === next && g.max >= g.min, "Age group " + g.id + ": must start at 18 and be contiguous");
    next = g.max + 1;
  }
  const best = (S.products || []).filter(p => p.bestSeller !== undefined && typeof p.bestSeller !== "boolean");
  requireValue(best.length === 0, "Products: bestSeller must be true or false");

  const numbers = value => (String(value).match(/\d[\d,.]*\d|\d/g) || []).map(x => x.replace(/,/g, ""));
  const noClaims = /\byou (are|'re|’re) deficient|\byou lack/i;
  requireValue(S.learn && typeof S.learn === "object", "Learn library (data/learn.js) is required");
  for (const n of S.nutrients || []) {
    const L = S.learn && S.learn[n.id];
    if (!L) { requireValue(false, n.id + ": missing Learn entry"); continue; }
    const id = n.id + " learn";
    for (const key of ["tagline", "whatItIs", "tooMuch", "testing", "foodTip", "lowSignsNote"]) requireValue(text(L[key]), id + ": missing " + key);
    requireValue(Array.isArray(L.keyFacts) && L.keyFacts.length === 4 && L.keyFacts.every(f => text(f.label) && text(f.value)), id + ": keyFacts needs exactly 4 {label, value}");
    requireValue(Array.isArray(L.does) && L.does.length >= 3 && L.does.every(d => text(d.title) && text(d.text)), id + ": does needs at least 3 {title, text}");
    requireValue(Array.isArray(L.atRisk) && L.atRisk.length >= 3 && L.atRisk.every(text), id + ": atRisk needs at least 3 items");
    requireValue(Array.isArray(L.lowSigns) && L.lowSigns.length >= 3 && L.lowSigns.every(text), id + ": lowSigns needs at least 3 items");
    requireValue(Array.isArray(L.interactions) && L.interactions.length >= 1 && L.interactions.every(m => text(m.name) && text(m.text)), id + ": interactions needs {name, text} items");
    requireValue(Array.isArray(L.indianFoods) && L.indianFoods.every(text), id + ": indianFoods must be a list of text");
    const foods = L.foods || [];
    requireValue(foods.length > 0 || (Array.isArray(L.limitFoods) && L.limitFoods.length >= 3), id + ": needs foods or limitFoods");
    requireValue(foods.every(f => text(f.food) && text(f.serving) && text(f.amount) && typeof f.veg === "boolean"), id + ": every food needs food, serving, amount and veg true/false");
    requireValue((n.sources || []).length > 0, n.id + ": Learn pages need at least one source link");
    // Plain-language summaries must not diagnose the reader.
    requireValue(!noClaims.test(JSON.stringify(L)), id + ": must not say the reader is deficient or lacks a nutrient");

    const rows = L.needs && L.needs.rows;
    requireValue(text(L.needs && L.needs.note) && Array.isArray(rows) && rows.length >= 1, id + ": needs.note and needs.rows are required");
    for (const r of Array.isArray(rows) ? rows : []) {
      requireValue(["all", "female", "male"].includes(r.sex) && text(r.ages) && text(r.amount) && Number.isInteger(r.from) && (r.to === null || (Number.isInteger(r.to) && r.to >= r.from)), id + ": invalid needs row " + r.ages);
      // Every figure in the table must also be in the reference text used by the quiz result page.
      for (const num of numbers(r.amount)) requireValue(numbers(n.typicalIntake).includes(num), id + ": needs figure " + num + " is not in typicalIntake");
    }
    // Rows must cover every adult age group for every sex, so the "You" row always exists.
    for (const sex of ["female", "male"]) for (const g of Array.isArray(groups) ? groups : []) {
      const hit = (Array.isArray(rows) ? rows : []).some(r => (r.sex === "all" || r.sex === sex) && r.from <= g.max && (r.to === null || r.to >= g.min));
      requireValue(hit, id + ": no needs row for " + sex + " aged " + g.label);
    }
    // The upper limit shown on Learn must agree with the one on the result page.
    if (n.upperLimitNote) {
      for (const num of numbers(L.tooMuch)) requireValue(numbers(n.upperLimitNote).includes(num), id + ": tooMuch figure " + num + " is not in upperLimitNote");
    }
  }
}

// data/summary-rules.js and data/backend.js.
function validateAccounts(S, { warnings, requireValue, text }) {
  const r = S.summaryRules;
  requireValue(r && Number.isInteger(r.minScore) && r.minScore >= 1 && r.minScore <= maxScore, "Summary rules: minScore must be 1–10");
  requireValue(r && Number.isFinite(r.maxAgeDays) && r.maxAgeDays > 0, "Summary rules: maxAgeDays must be positive");
  requireValue(r && Array.isArray(r.testFirst) && r.testFirst.every(id => (S.nutrients || []).some(n => n.id === id)), "Summary rules: testFirst must list existing nutrient ids");
  requireValue(r && r.multivitamin && Number.isInteger(r.multivitamin.minAreas) && r.multivitamin.minAreas >= 2 &&
    ((S.shop && S.shop.categories) || []).some(c => c.id === r.multivitamin.shopCategory), "Summary rules: multivitamin needs minAreas ≥ 2 and an existing shop category");

  const b = S.backend;
  requireValue(b && typeof b.supabaseUrl === "string" && typeof b.supabaseAnonKey === "string", "Backend config: supabaseUrl and supabaseAnonKey must be strings (empty turns accounts off)");
  if (!b) return;
  requireValue(/^\d{4}-\d{2}-\d{2}$/.test(b.consentVersion || ""), "Backend config: consentVersion must be YYYY-MM-DD");
  const key = b.supabaseAnonKey || "";
  // A secret key in this public file would bypass row-level security for everyone.
  let role = "";
  try { role = JSON.parse(Buffer.from(key.split(".")[1] || "", "base64url").toString("utf8")).role || ""; } catch (_) { role = ""; }
  requireValue(role !== "service_role" && !/^sb_secret_/.test(key), "Backend config: that is a SECRET service key. Remove it now and use the anon/publishable key");
  if (!b.supabaseUrl && !key) { warnings.push("accounts are off: data/backend.js has no Supabase project yet"); return; }
  requireValue(b.supabaseUrl && key, "Backend config: fill in both supabaseUrl and supabaseAnonKey, or neither");
  try { requireValue(new URL(b.supabaseUrl).protocol === "https:", "Backend config: supabaseUrl must use https"); }
  catch (_) { requireValue(false, "Backend config: supabaseUrl is not a valid URL"); }
  if (!text(b.privacyOwner) || !text(b.privacyContact)) warnings.push("privacy page: fill in privacyOwner and privacyContact in data/backend.js before launch");
}

// Shop data lives in data/products.js. Shop category and product ids use their own namespaces.
function validateShop(S, { requireValue, text }) {
  if (!S.shop && !S.products) return;
  const categoryIds = new Set(), productIds = new Set();
  const slug = id => typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
  requireValue(S.shop && Array.isArray(S.shop.categories) && S.shop.categories.length > 0, "Shop categories are required");
  for (const c of (S.shop && S.shop.categories) || []) {
    requireValue(slug(c.id) && !categoryIds.has(c.id), "Shop category: invalid or duplicate id " + c.id);
    categoryIds.add(c.id);
    requireValue(text(c.name), "Shop category " + c.id + ": missing name");
    requireValue(Number.isFinite(c.order), "Shop category " + c.id + ": order required");
    const hex = ["accent", "tint", "onAccent"].every(key => /^#[0-9a-f]{6}$/i.test(c[key]));
    requireValue(hex, "Shop category " + c.id + ": invalid colours");
    if (hex) {
      requireValue(contrast(c.accent, c.onAccent) >= 4.5 && contrast(c.accent, "#111111") >= 4.5, "Shop category " + c.id + ": text contrast below 4.5:1");
      requireValue(contrast(c.tint, "#505050") >= 4.5, "Shop category " + c.id + ": muted body contrast below 4.5:1");
    }
  }
  requireValue(Array.isArray(S.products), "S.products must be a list");
  for (const p of Array.isArray(S.products) ? S.products : []) {
    const label = "Product " + (p && p.id);
    requireValue(slug(p.id) && !productIds.has(p.id), label + ": invalid or duplicate id");
    productIds.add(p.id);
    requireValue(text(p.name), label + ": missing name");
    requireValue(categoryIds.has(p.category), label + ": unknown shop category " + p.category);
    requireValue(Number.isFinite(p.price) && p.price > 0, label + ": price must be a positive number");
    requireValue(p.mrp === undefined || (Number.isFinite(p.mrp) && p.mrp >= p.price), label + ": mrp must be a number at least the price");
    for (const key of ["size", "badge", "description", "buyLabel", "imageAlt"]) requireValue(p[key] === undefined || text(p[key]), label + ": " + key + " must be text");
    requireValue(p.highlights === undefined || (Array.isArray(p.highlights) && p.highlights.every(text)), label + ": highlights must be a list of text");
    requireValue(p.nutrients === undefined || (Array.isArray(p.nutrients) && p.nutrients.every(id => (S.nutrients || []).some(n => n.id === id))), label + ": nutrients must list existing nutrient ids");
    requireValue(p.added === undefined || /^\d{4}-\d{2}-\d{2}$/.test(p.added), label + ": added must be YYYY-MM-DD");
    requireValue(p.image === undefined || (typeof p.image === "string" && (/^https:\/\//.test(p.image) || (/^[\w\-./]+$/.test(p.image) && !p.image.includes("..") && !p.image.startsWith("/")))), label + ": image must be a relative path such as images/products/name.jpg or an https URL");
    if (typeof p.image === "string" && !/^https:\/\//.test(p.image) && !p.image.includes("..")) {
      requireValue(require("node:fs").existsSync(require("node:path").resolve(__dirname, "..", p.image)), label + ": image file not found: " + p.image);
    }
    try { requireValue(new URL(p.buyUrl).protocol === "https:", label + ": buyUrl must use https"); }
    catch (_) { requireValue(false, label + ": malformed buyUrl"); }
  }
}

if (require.main === module) {
  const { data, warnings: placeholders } = loadData();
  const result = validate(data);
  [...placeholders, ...result.warnings].forEach(w => console.warn("WARNING " + w));
  result.errors.forEach(error => console.error("ERROR " + error));
  if (result.errors.length) process.exitCode = 1;
  else {
    console.log(`PASS ${data.categories.length} categories, ${data.nutrients.length} nutrients, ${data.nutrients.length * data.config.questionsPerCheck} questions shown per check-in (${data.nutrients.reduce((sum,n) => sum + n.questions.length,0)} defined, including sex-specific variants).`);
    console.log("Accent/body text contrast: " + result.ratios.join(", "));
  }
}
module.exports = validate;
