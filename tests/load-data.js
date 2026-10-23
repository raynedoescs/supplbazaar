"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");

// Use exactly the data scripts included by index.html; no duplicated registry.
function loadData() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const files = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
  const warnings = [];
  const context = vm.createContext({ console: { warn: text => warnings.push(text) } });
  context.window = context;
  for (const file of files.filter(file => file.startsWith("data/") || file === "js/icons.js")) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return { data: context.SUPL, warnings, files, root };
}
module.exports = loadData;
