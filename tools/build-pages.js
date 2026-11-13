"use strict";
// Writes the search-friendly static pages from the same data the app uses:
//   learn/index.html, learn/<nutrientId>/index.html, sitemap.xml and robots.txt.
// The app itself lives behind "#/" addresses, which search engines treat as one page; these pages give every
// guide its own address, title and description. They need no JavaScript and link back into the app.
//
// Run after changing nutrient or Learn data:   node tools/build-pages.js
// tests/pages.test.js fails when the files on disk are out of date.
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const loadData = require(path.join(root, "tests", "load-data.js"));

const esc = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clip = (text, max) => text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.]$/, "") + "…";

function build() {
  const { data: S } = loadData();
  const site = S.config.siteUrl;
  if (!/^https:\/\/.+\/$/.test(site || "")) throw new Error("config.siteUrl must be an https URL ending in /");
  const icon = name => S.icon(name);
  const copy = S.config.copy;
  const categories = S.categories.slice().sort((a, b) => a.order - b.order);
  const guides = S.nutrients.filter(n => S.learn && S.learn[n.id]);
  const files = {};

  // Shared page shell. `up` is the relative path back to the site root ("../" or "../../").
  const page = ({ up, url, title, description, category, body }) => `<!doctype html>
<html lang="en"${category ? ` style="--accent:${esc(category.accent)};--tint:${esc(category.tint)};--on-accent:${esc(category.onAccent)}"` : ""}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="${esc(category ? category.accent : "#ffffff")}">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(url)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Supl">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(site)}images/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="referrer" content="no-referrer">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23ffe34b'/%3E%3Ctext x='32' y='47' text-anchor='middle' font-family='Arial,sans-serif' font-weight='900' font-size='48' fill='%23111'%3Es%3C/text%3E%3C/svg%3E">
  <link rel="stylesheet" href="${up}css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="shell">
    <header class="site-header">
      <a class="wordmark" href="${up}index.html" aria-label="Supl home">Supl<span aria-hidden="true">.</span></a>
      <nav class="site-nav" aria-label="Main">
        <a href="${up}index.html#/shop">${icon("bag")}Shop</a>
        <a href="${up}index.html#/check">${icon("check")}Check-in</a>
        <a href="${up}learn/index.html" aria-current="page">${icon("book")}Learn</a>
      </nav>
    </header>
    <main id="main">
${body}
    </main>
    <footer class="site-footer"><span>Small check. Better questions.</span><span class="footer-links"><a href="${up}index.html#/about">${icon("info")}About</a><a href="${up}index.html#/contact">${icon("mail")}Contact</a><a href="${up}index.html#/terms">${icon("book")}Terms</a><a href="${up}index.html#/privacy">${icon("lock")}Privacy</a></span></footer>
  </div>
</body>
</html>
`;

  const chips = items => `<ul class="chip-list">${items.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const bullets = items => `<ul class="learn-bullets">${items.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const dot = veg => veg ? '<span class="diet-dot veg" role="img" aria-label="Vegetarian"></span>' : '<span class="diet-dot nonveg" role="img" aria-label="Not vegetarian"></span>';
  const who = r => r.ages === "Adults" ? "Adults" : (r.sex === "female" ? "Women" : r.sex === "male" ? "Men" : "Everyone") + " · " + r.ages + (/^\d+–\d+$/.test(r.ages) ? " years" : "");
  const sources = n => (n.sources || []).filter(s => /^https:\/\//.test(s.url)).map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗<span class="sr-only"> (opens a new tab)</span></a></li>`).join("");

  // One guide per nutrient. The markup mirrors learnScreen() in js/app.js, minus the personal "You" row.
  for (const n of guides) {
    const L = S.learn[n.id];
    const c = categories.find(x => x.id === n.category);
    const up = "../../";
    const foods = L.foods && L.foods.length
      ? `<ul class="food-rows">${L.foods.map(f => `<li><span class="food-name">${dot(f.veg)}<span>${esc(f.food)}<small>${esc(f.serving)}</small></span></span><b>${esc(f.amount)}</b></li>`).join("")}</ul><p class="legend"><span>${dot(true)} Vegetarian (includes dairy)</span><span>${dot(false)} Meat, fish or egg</span></p>`
      : chips(L.limitFoods || []);
    const jump = [["does", "What it does"], ["needs", "How much"], ["foods", "Foods"], ["low", "Low levels"], ["high", "Too much"], ["meds", "Medicines"], ["test", "Testing"]]
      .map(a => `<a class="jump" href="#L-${a[0]}">${a[1]}</a>`).join("");
    const body = `      <a class="back" href="${up}learn/index.html"><span aria-hidden="true">←</span> All nutrients</a>
      <article class="learn learn-detail">
        <header class="learn-hero"><span class="icon-badge lg">${icon(n.icon)}</span><p class="eyebrow">${esc(c.name)}</p><h1>${esc(n.name)}</h1>
          <p class="learn-tagline">${esc(L.tagline)}</p><p class="learn-what">${esc(L.whatItIs)}</p></header>
        <div class="learn-facts">${L.keyFacts.map(f => `<div class="fact"><span>${esc(f.label)}</span><b>${esc(f.value)}</b></div>`).join("")}</div>
        <nav class="learn-jump" aria-label="On this page">${jump}</nav>
        <section class="learn-section" id="L-does"><h2>${icon("sun")}What it does</h2><ul class="learn-does">${L.does.map(d => `<li><b>${esc(d.title)}</b><span>${esc(d.text)}</span></li>`).join("")}</ul></section>
        <section class="learn-section" id="L-needs"><h2>${icon("chart")}How much you need</h2>
          <table class="learn-table"><thead><tr><th scope="col">Who</th><th scope="col">Daily reference</th></tr></thead><tbody>${L.needs.rows.map(r => `<tr><th scope="row">${esc(who(r))}</th><td>${esc(r.amount)}</td></tr>`).join("")}</tbody></table>
          <p class="small-note">${esc(L.needs.note)}</p><p class="small-note">${esc(copy.reference)}</p></section>
        <section class="learn-section" id="L-foods"><h2>${icon("leaf")}${esc(L.foodsHeading || "Best food sources")}</h2>${foods}${L.indianFoods && L.indianFoods.length ? `<h3>Common in Indian kitchens</h3>${chips(L.indianFoods)}${L.indianNote ? `<p class="small-note">${esc(L.indianNote)}</p>` : ""}` : ""}${L.foodTip ? `<p class="learn-tip">${esc(L.foodTip)}</p>` : ""}</section>
        <section class="learn-section" id="L-low"><h2>${icon("info")}Who is more at risk, and signs of low levels</h2><h3>Who is more at risk</h3>${bullets(L.atRisk)}<h3>Signs that can go with low levels</h3>${bullets(L.lowSigns)}${L.lowSignsNote ? `<p class="learn-tip">${esc(L.lowSignsNote)}</p>` : ""}</section>
        <section class="learn-section" id="L-high"><h2>${icon("shield")}Too much</h2><p>${esc(L.tooMuch)}</p></section>
        <section class="learn-section" id="L-meds"><h2>${icon("capsule")}Medicines that can interact</h2><ul class="learn-does">${L.interactions.map(m => `<li><b>${esc(m.name)}</b><span>${esc(m.text)}</span></li>`).join("")}</ul><p class="small-note">Never stop or change a medicine because of what you read here. Ask your doctor or pharmacist.</p></section>
        <section class="learn-section" id="L-test"><h2>${icon("flask")}How it is measured</h2><p>${esc(L.testing)}</p><p class="small-note">${esc(n.testContext || copy.testContext)}</p></section>
        <section class="learn-section" id="L-sources"><h2>${icon("book")}Sources</h2><ul class="learn-sources">${sources(n)}</ul><p class="small-note">Written in plain language from these sources. Values are US and WHO references and have not yet been checked against India’s ICMR-NIN guidance.</p></section>
        <div class="learn-cta"><a class="button primary" href="${up}index.html#/q/${esc(n.id)}"><span class="button-label">${icon("check")}<span>Take the free ${esc(n.name)} check-in</span></span><span aria-hidden="true">→</span></a>
          <a class="button secondary" href="${up}learn/index.html"><span class="button-label">${icon("book")}<span>All nutrient guides</span></span><span aria-hidden="true">→</span></a></div>
        <p class="small-note learn-note">${esc(copy.safety)} Learning guides are general information, not medical advice.</p>
      </article>`;
    files[`learn/${n.id}/index.html`] = page({
      up, url: `${site}learn/${n.id}/`, category: c,
      title: `${n.name}: what it does, foods, daily needs and signs of low levels · Supl`,
      description: clip(`${n.summary} ${L.whatItIs}`, 158), body
    });
  }

  // Library index.
  const groups = categories.map(c => {
    const items = guides.filter(n => n.category === c.id);
    if (!items.length) return "";
    return `        <section class="learn-group" aria-label="${esc(c.name)}"><h2 class="learn-group-title">${esc(c.name)}</h2>${items.map(n =>
      `<a class="learn-link-card" href="${esc(n.id)}/index.html" style="--card-accent:${esc(c.accent)}"><span class="icon-badge">${icon(n.icon)}</span><span class="learn-link-text"><b>${esc(n.name)}</b><span>${esc(S.learn[n.id].tagline)}</span></span><span class="learn-chevron" aria-hidden="true">›</span></a>`).join("")}</section>`;
  }).join("\n");
  files["learn/index.html"] = page({
    up: "../", url: `${site}learn/`, category: null,
    title: "Nutrient guides: vitamins, minerals and more in plain language · Supl",
    description: `Plain-language guides to ${guides.length} nutrients: what each one does, how much you need, the best foods, signs of low levels and what to watch for.`,
    body: `      <div class="learn"><section class="learn-intro"><p class="eyebrow">Library</p><h1>Learn what each nutrient actually is.</h1>
        <p>Plain-language guides built from public-health sources: what it does, how much you need, the best foods, signs of low levels, what to watch for and more.</p></section>
${groups}
        <p class="small-note learn-note">Learning guides are general information, not medical advice.</p></div>`
  });

  const urls = [site, `${site}learn/`, ...guides.map(n => `${site}learn/${n.id}/`)];
  files["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${esc(u)}</loc></url>`).join("\n")}\n</urlset>\n`;
  files["robots.txt"] = `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`;
  return files;
}

if (require.main === module) {
  const files = build();
  for (const [file, text] of Object.entries(files)) {
    const full = path.join(root, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, text);
  }
  console.log("Wrote " + Object.keys(files).length + " files (static Learn pages, sitemap.xml, robots.txt).");
}
module.exports = build;
