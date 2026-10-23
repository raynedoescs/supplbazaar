(function (root) {
  "use strict";
  // Pure rule-based summary of saved check-ins. No storage, network or randomness.
  // checkins: [{ nutrient_id, score, band, created_at }] in any order.
  // Returns areas worth a closer look (latest score >= rules.minScore), lower areas,
  // and whether general multivitamin browsing should be offered.
  function summarize(checkins, nutrients, rules, now) {
    var nowMs = now instanceof Date ? now.getTime() : Number(now);
    var maxAgeMs = rules.maxAgeDays * 24 * 60 * 60 * 1000;
    var known = {};
    (nutrients || []).forEach(function (n) { known[n.id] = n; });
    var latest = {};
    var stale = 0;
    (checkins || []).slice().sort(function (a, b) { return Date.parse(b.created_at) - Date.parse(a.created_at); }).forEach(function (c) {
      if (!known[c.nutrient_id] || latest[c.nutrient_id]) return;
      var age = nowMs - Date.parse(c.created_at);
      if (!(age <= maxAgeMs)) { stale += 1; latest[c.nutrient_id] = false; return; }
      latest[c.nutrient_id] = c;
    });
    var recent = Object.keys(latest).filter(function (id) { return latest[id]; }).map(function (id) {
      var c = latest[id];
      return { nutrientId: id, name: known[id].name, score: c.score, band: c.band, date: c.created_at,
        testFirst: (rules.testFirst || []).indexOf(id) !== -1 };
    }).sort(function (a, b) { return b.score - a.score || a.name.localeCompare(b.name); });
    var areas = recent.filter(function (a) { return a.score >= rules.minScore; });
    var lower = recent.filter(function (a) { return a.score < rules.minScore; });
    var multi = rules.multivitamin && areas.length >= rules.multivitamin.minAreas;
    return { areas: areas, lower: lower, multivitamin: !!multi, staleNutrients: stale };
  }

  var api = { summarize: summarize };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.SUPL = root.SUPL || {}; root.SUPL.summary = api; }
}(typeof window !== "undefined" ? window : globalThis));
