"use strict";
// The static search pages must match the data. Run `node tools/build-pages.js` after editing nutrients or Learn.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const files = require(path.join(root, "tools", "build-pages.js"))();
const loadData = require("./load-data.js");
const { data } = loadData();

const names = Object.keys(files);
assert.equal(names.filter(f => /^learn\/[^/]+\/index\.html$/.test(f)).length, data.nutrients.length);
console.log("PASS one static guide per nutrient (" + data.nutrients.length + ")");

for (const [file, text] of Object.entries(files)) {
  const full = path.join(root, file);
  assert.ok(fs.existsSync(full), file + " is missing: run node tools/build-pages.js");
  assert.equal(fs.readFileSync(full, "utf8").replace(/\r\n/g, "\n"), text, file + " is out of date: run node tools/build-pages.js");
}
console.log("PASS " + names.length + " generated files match the data");

for (const [file, text] of Object.entries(files).filter(([f]) => f.endsWith(".html"))) {
  assert.equal((text.match(/<title>/g) || []).length, 1, file + ": one title");
  assert.equal((text.match(/<h1[ >]/g) || []).length, 1, file + ": one h1");
  const description = /<meta name="description" content="([^"]*)"/.exec(text)[1];
  assert.ok(description.length >= 50 && description.length <= 170, file + ": description length " + description.length);
  assert.ok(text.includes('<link rel="canonical" href="' + data.config.siteUrl), file + ": canonical");
  assert.ok(!/<script/i.test(text), file + ": static pages carry no scripts");
  assert.ok(!/\byou (are|'re|’re) deficient|\byou lack/i.test(text), file + ": no diagnostic wording");
  // Every local link must point at a file that exists.
  for (const m of text.matchAll(/(?:href|src)="([^"#:]+)(?:#[^"]*)?"/g)) {
    const target = path.join(root, path.dirname(file), m[1]);
    assert.ok(fs.existsSync(target), file + ": broken link " + m[1]);
  }
}
console.log("PASS titles, descriptions, canonicals and local links are valid");
assert.ok(files["sitemap.xml"].includes(data.config.siteUrl + "learn/iron/"));
assert.ok(fs.existsSync(path.join(root, "images", "og.png")), "images/og.png is missing");
console.log("PASS sitemap and share image exist");
