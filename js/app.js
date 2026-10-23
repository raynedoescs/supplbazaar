(function (S) {
  "use strict";
  var main = document.getElementById("main");
  var announcer = document.getElementById("announcer");
  var theme = document.querySelector('meta[name="theme-color"]');
  var copy = S.config.copy;
  // Answers never enter URLs, browser history, storage, logs, or requests.
  var sessions = Object.create(null);
  var active = null;
  var advanceTimer = null;
  var locked = false;
  var renderToken = 0;
  // Browser scroll restoration can otherwise hide the top of a previous question.
  if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

  function escape(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function nutrientById(id) { return S.nutrients.find(function (n) { return n.id === id; }); }
  function categoryById(id) { return S.categories.find(function (c) { return c.id === id; }); }
  // "About you" answers (sex, age group, pregnancy, menopause). Memory only, like quiz answers.
  var profile = null;
  function sexKey() { return profile && profile.sex === "female" ? "female" : "other"; }
  function ageGroup() { return profile ? S.config.ageGroups[profile.ageIndex] : null; }
  // The questions this person sees: every check-in has exactly config.questionsPerCheck of them.
  function questionsFor(n) {
    var key = sexKey();
    return n.questions.filter(function (q) { return !q.audience || q.audience === key; });
  }
  // Questions plus the factors taken straight from "About you" (age; menopause for women).
  function scoredItems(n) {
    var items = questionsFor(n).map(function (q) { return { weight: q.weight, reverse: false, topic: q.topic }; });
    var answers = sessions[n.id].answers.slice();
    if (profile && n.ageWeight) { items.push({ weight: n.ageWeight, reverse: false, topic: "Age" }); answers.push(profile.ageIndex + 1); }
    if (profile && profile.sex === "female" && n.menopauseWeight) { items.push({ weight: n.menopauseWeight, reverse: false, topic: "After menopause" }); answers.push(profile.menopause ? 5 : 1); }
    return { items: items, answers: answers };
  }
  function scoreFor(n) {
    var scored = scoredItems(n);
    scored.result = S.scoring.calculate(scored.items, scored.answers, S.config.bands);
    return scored;
  }
  function sessionFor(n) {
    if (!sessions[n.id]) sessions[n.id] = { answers: Array(questionsFor(n).length).fill(null) };
    return sessions[n.id];
  }
  function completed(n) {
    var session = sessions[n.id];
    return session && session.answers.length === questionsFor(n).length && session.answers.every(function (a) { return Number.isInteger(a) && a >= 1 && a <= S.scoring.maxAnswer; });
  }
  function safeUrl(url) {
    try { return new URL(url).protocol === "https:" ? url : ""; } catch (_) { return ""; }
  }
  function products() { return S.products || []; }
  function shopCategories() { return ((S.shop && S.shop.categories) || []).slice().sort(function (a, b) { return a.order - b.order; }); }
  function shopCategoryById(id) { return shopCategories().find(function (c) { return c.id === id; }); }
  function productById(id) { return products().find(function (p) { return p.id === id; }); }
  function productsFor(nutrientId) { return products().filter(function (p) { return (p.nutrients || []).indexOf(nutrientId) !== -1 && safeUrl(p.buyUrl); }); }
  function isAmazon(url) {
    try { return /(^|\.)amazon\.in$|^amzn\.to$/.test(new URL(url).hostname); } catch (_) { return false; }
  }
  function money(value) {
    return Number.isFinite(value) ? "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : "";
  }
  // Product photos are local files (images/products/...) or https URLs; anything else shows the placeholder.
  function safeImage(path) {
    if (typeof path !== "string") return "";
    if (/^https:\/\//.test(path)) return safeUrl(path);
    return /^[\w\-./]+$/.test(path) && path.indexOf("..") === -1 && path.charAt(0) !== "/" ? path : "";
  }
  function setTheme(category) {
    var root = document.documentElement;
    root.style.setProperty("--accent", category ? category.accent : "#ffe34b");
    root.style.setProperty("--tint", category ? category.tint : "#ffffff");
    root.style.setProperty("--on-accent", category ? category.onAccent : "#111111");
    theme.content = category ? category.accent : "#ffffff";
  }
  function icon(name, className) { return S.icon ? S.icon(name, className) : ""; }
  // Wraps an icon and its text so flex buttons keep the trailing arrow at the edge.
  function label(name, text) { return '<span class="button-label">' + icon(name) + '<span>' + text + '</span></span>'; }
  function iconBadge(name) { return name && S.icons && S.icons[name] ? '<span class="icon-badge">' + icon(name) + '</span>' : ""; }
  function pad(number) { return number < 10 ? "0" + number : String(number); }
  function arrow() { return '<span class="arrow" aria-hidden="true">↗</span>'; }
  function backLink(hash, label) { return '<a class="back" href="' + hash + '"><span aria-hidden="true">←</span> ' + escape(label) + '</a>'; }
  function navigate(hash, state, replace) {
    window.history[replace ? "replaceState" : "pushState"](state || null, "", hash);
    render();
  }
  // ---- Motion ----
  // Owner-approved animations (22 October 2026): 1A hero pop and bob, 2D cards grow in, 3D answer tile jelly,
  // 4A score count-up, 5 screen changes (5A push, 5B fade and zoom, 5C sheet from below, 5D colour wipe, picked
  // at random and never the same twice in a row), 6D list lines in turn, 7A hover lift (CSS).
  // All of it is decorative: content, focus and screen-reader text are in place immediately, and nothing
  // runs when the visitor's device asks for reduced motion.
  var CARD_SELECTOR = ".category-card, .nutrient-card, .product-card, .shop-banner, .learn-link-card, .fact";
  var LINE_GROUPS = ".learn-does, .learn-bullets, .food-rows, .learn-table tbody, .food-list, .product-highlights, .history-list, .summary-list";
  // How long each screen change keeps the new screen out of view (entrance animations wait this long).
  var TRANSITIONS = { push: 200, fade: 300, sheet: 220, wipe: 260 };
  var WIPE_HIDE_MS = TRANSITIONS.wipe;
  var pendingTransition = false;
  var lastTransition = "";
  var currentEnter = 0;
  var lastPath = null;
  var oldTheme = null; // the leaving screen's colours, so its frozen copy keeps them
  var scoreTimer = null;
  var ghost = null;
  var shell = document.querySelector(".shell");
  var header = document.querySelector(".site-header");
  var wipeEl = document.createElement("div");
  wipeEl.className = "screen-wipe";
  wipeEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(wipeEl);
  wipeEl.addEventListener("animationend", function () { wipeEl.classList.remove("go"); });
  function motionOK() { return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  function pickTransition() {
    var options = Object.keys(TRANSITIONS).filter(function (name) { return name !== lastTransition; });
    lastTransition = options[Math.floor(Math.random() * options.length)];
    return lastTransition;
  }
  function removeGhost() { if (ghost) { ghost.remove(); ghost = null; } }
  // A frozen, non-interactive copy of the leaving screen, kept exactly where it was on screen.
  function makeGhost(name) {
    removeGhost();
    // Layout position, not getBoundingClientRect: if the last screen change is still running, main is
    // mid-transform and its visual box would put the copy in the wrong place.
    var rect = { top: main.offsetTop - window.scrollY, left: main.offsetLeft - window.scrollX, width: main.offsetWidth };
    // A plain div holding copies of main's children (a copied <main> would match the main.tr-* rules).
    ghost = document.createElement("div");
    Array.prototype.forEach.call(main.childNodes, function (node) { ghost.appendChild(node.cloneNode(true)); });
    ghost.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
    ghost.className = "screen-ghost tr-" + name;
    ghost.setAttribute("aria-hidden", "true");
    ghost.inert = true;
    ghost.style.top = rect.top + "px";
    ghost.style.left = rect.left + "px";
    ghost.style.width = rect.width + "px";
    // Never paint over the header, which is back at the top of the new screen.
    var headerBottom = header ? header.offsetTop + header.offsetHeight : 0;
    ghost.style.clipPath = "inset(" + Math.max(0, headerBottom - rect.top) + "px 0 0 0)";
    if (oldTheme) Object.keys(oldTheme).forEach(function (k) { if (oldTheme[k]) ghost.style.setProperty(k, oldTheme[k]); });
    // Only the copy's own exit animation ends it; its copied cards fire animationend events of their own.
    ghost.addEventListener("animationend", function (event) { if (event.target === event.currentTarget) removeGhost(); });
    window.setTimeout(function (g) { if (ghost === g) removeGhost(); }, 1500, ghost); // in case animations never run
    document.body.appendChild(ghost);
  }
  function startTransition(name) {
    Object.keys(TRANSITIONS).forEach(function (k) { main.classList.remove("tr-" + k); });
    void main.offsetWidth; // restart if a transition is already running
    main.classList.add("tr-" + name);
    shell.classList.add("transitioning");
    // A colour curtain still sweeping from the previous change must not cover this one.
    wipeEl.classList.remove("go");
    if (name === "wipe") {
      void wipeEl.offsetWidth;
      wipeEl.classList.add("go");
    }
  }
  var TRANSITION_ENDS = ["pushIn", "fadeZoomIn", "sheetUp", "wipeContent"];
  main.addEventListener("animationend", function (event) {
    if (event.target !== main || TRANSITION_ENDS.indexOf(event.animationName) === -1) return;
    Object.keys(TRANSITIONS).forEach(function (k) { main.classList.remove("tr-" + k); });
    shell.classList.remove("transitioning");
  });
  // A list is only hidden once the browser has reported it is entirely below the screen, so nothing can
  // stay invisible if these reports never arrive. On screen at the start, a list is animated only while
  // the colour wipe still covers it (otherwise it would flicker); otherwise it simply stays as it is.
  function coveredByWipe() {
    var a = main.classList.contains("tr-wipe") && main.getAnimations && main.getAnimations().find(function (x) { return x.animationName === "wipeContent"; });
    return !!a && (a.currentTime || 0) < WIPE_HIDE_MS - 30;
  }
  var revealer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var group = entry.target;
      if (entry.isIntersecting) {
        revealer.unobserve(group);
        if (group.classList.contains("reveal")) group.classList.add("in");
        else if (coveredByWipe()) { group.classList.add("reveal"); window.setTimeout(function () { group.classList.add("in"); }, WIPE_HIDE_MS); }
      } else if (!group.classList.contains("reveal") && entry.boundingClientRect.top >= window.innerHeight) {
        group.classList.add("reveal");
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0 }) : null;
  // Cards grow in one after another; list lines slide in, in turn, when they scroll into view.
  function enhance(scope) {
    if (!scope || !motionOK()) return;
    var counts = [];
    scope.querySelectorAll(CARD_SELECTOR).forEach(function (el) {
      var entry = counts.find(function (c) { return c.parent === el.parentElement; });
      if (!entry) { entry = { parent: el.parentElement, i: 0 }; counts.push(entry); }
      el.style.setProperty("--i", String(Math.min(entry.i, 7)));
      entry.i += 1;
      el.classList.add("pop-in");
    });
    if (!revealer) return;
    scope.querySelectorAll(LINE_GROUPS).forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) { child.style.setProperty("--i", String(Math.min(i, 10))); });
      revealer.observe(group);
    });
  }
  // A card keeps its grow-in transform while the animation holds, which would block the hover lift.
  main.addEventListener("animationend", function (event) {
    if (event.animationName === "growIn") event.target.classList.remove("pop-in");
  });
  // The visible number counts up and the meter fills segment by segment; the band label then stamps in.
  // The screen-reader text and the meter's aria values already hold the final score.
  function animateScore(score) {
    var num = main.querySelector(".score-num");
    var steps = main.querySelectorAll(".meter-step");
    var band = main.querySelector(".band-label");
    if (!num || !band || !motionOK()) return;
    num.textContent = "0";
    steps.forEach(function (step) { step.classList.remove("filled"); });
    band.classList.add("band-wait");
    var shown = 0;
    var stepMs = Math.max(55, Math.round(650 / score));
    var tick = function () {
      shown += 1;
      num.textContent = String(shown);
      if (steps[shown - 1]) steps[shown - 1].classList.add("filled");
      if (shown < score) { scoreTimer = window.setTimeout(tick, stepMs); return; }
      band.classList.remove("band-wait");
      band.classList.add("band-stamp");
    };
    scoreTimer = window.setTimeout(tick, currentEnter + 120);
  }
  // The jelly wobble needs a moment to be seen before the next question appears.
  function answerDelay() { return motionOK() ? S.config.advanceDelayMs : Math.min(250, S.config.advanceDelayMs); }

  function show(html, title, announcement, focusId) {
    var transition = pendingTransition && motionOK() ? pickTransition() : "";
    pendingTransition = false;
    if (transition) makeGhost(transition);
    main.innerHTML = html;
    // Entrance animations wait until the screen change has brought the new screen into view.
    currentEnter = transition ? TRANSITIONS[transition] : 0;
    main.style.setProperty("--enter", currentEnter + "ms");
    if (transition) startTransition(transition);
    document.title = title + " · Supl";
    announcer.textContent = announcement || title;
    window.scrollTo(0, 0);
    var focus = document.getElementById(focusId || "screen-title");
    if (focus) focus.focus({ preventScroll: true });
    enhance(main);
  }
  function sourceLinks(n) {
    return (n.sources || []).map(function (source) {
      var url = safeUrl(source.url);
      return url ? '<li><a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + escape(source.label) + ' ↗<span class="sr-only"> (opens a new tab)</span></a></li>' : "";
    }).join("");
  }

  function categoryCards() {
    return S.categories.slice().sort(function (a, b) { return a.order - b.order; }).map(function (c, i) {
      var count = S.nutrients.filter(function (n) { return n.category === c.id; }).length;
      return '<a class="category-card" href="#/c/' + escape(c.id) + '" style="--card-accent:' + escape(c.accent) + ';--card-ink:' + escape(c.onAccent) + '">' +
        '<div class="card-top">' + iconBadge(c.icon) + '<span class="card-count">' + pad(i + 1) + ' · ' + count + ' checks</span></div>' +
        '<div class="card-title-row"><h2>' + escape(c.name) + '</h2>' + arrow() + '</div><p>' + escape(c.blurb) + '</p></a>';
    }).join("");
  }
  function heroArt() {
    return '<div class="hero-art" aria-hidden="true">' + S.categories.slice().sort(function (a, b) { return a.order - b.order; }).map(function (c, i) {
      return '<span style="--card-accent:' + escape(c.accent) + ';--i:' + i + '">' + icon(c.icon || "capsule") + '</span>';
    }).join("") + '</div>';
  }
  function disclaimerNote() {
    return '<aside class="home-note"><p>Check-ins are for awareness, not a diagnosis. A questionnaire can’t measure your nutrient levels.</p><a class="text-link" href="#/about">' + icon("info") + 'How it works / disclaimer <span aria-hidden="true">↗</span></a></aside>';
  }

  // Home is shop-first: featured products, then the check-ins.
  function home() {
    setTheme(null);
    // Products ticked bestSeller in data/products.js come first; until any is ticked, the first four are shown.
    var live = products().filter(function (p) { return safeUrl(p.buyUrl); });
    var ticked = live.filter(function (p) { return p.bestSeller === true; });
    var featured = (ticked.length ? ticked : live).slice(0, 4);
    show('<section class="home-intro">' + heroArt() + '<p class="eyebrow">Your supplement store</p><h1 id="screen-title" tabindex="-1">Supplements,<br>made clearer.</h1>' +
      '<p class="intro-copy">Vitamins, minerals and everyday essentials in one place, plus free 2-minute check-ins to help you decide what to ask about.</p>' +
      '<div class="micro-row"><span>Free check-ins</span><span>Optional account</span><span>Private by default</span></div></section>' +
      '<section class="home-section" aria-labelledby="featured-title"><div class="section-head"><h2 id="featured-title">Our best sellers.</h2></div>' +
      '<div class="product-grid">' + productCards(featured) + '</div>' +
      '<a class="button primary" href="#/shop">' + label("bag", "Shop all products") + '<span aria-hidden="true">→</span></a></section>' +
      '<section class="home-section" aria-labelledby="check-title"><p class="eyebrow">Free 2-minute check-ins</p><h2 id="check-title">Not sure? Check first.</h2>' +
      '<p class="intro-copy">Ten quick questions about one nutrient. A clearer next step, without a diagnosis.</p>' +
      '<nav class="category-grid" aria-label="Check-in categories">' + categoryCards() + '</nav></section>' +
      disclaimerNote(), "Supplements, made clearer", "Supl home. Shop supplements or take a check-in.");
  }

  function checkHub() {
    setTheme(null);
    show('<section class="home-intro">' + heroArt() + '<p class="eyebrow">A little clarity starts here</p><h1 id="screen-title" tabindex="-1">Quick supplement<br>risk check.</h1>' +
      '<p class="intro-copy">10 quick questions. A clearer next step.<br>Start with a category.</p><div class="micro-row"><span>About 2 minutes</span><span>No sign-up needed</span><span>Private by default</span></div>' +
      (profile ? '<p class="small-note answering-as">Answering as <b>' + escape(profileLabel()) + '</b>. <a href="#/about-you">Change</a></p>' : '') + '</section>' +
      '<nav class="category-grid" aria-label="Nutrient categories">' + categoryCards() + '</nav>' + disclaimerNote(), "Quick supplement risk check", "Choose a category");
  }

  function categoryScreen(c) {
    setTheme(c);
    var nutrients = S.nutrients.filter(function (n) { return n.category === c.id; });
    var list = nutrients.map(function (n, i) {
      return '<a class="nutrient-card" href="#/q/' + escape(n.id) + '"><div class="card-top">' + iconBadge(n.icon) + '<span class="eyebrow">' + pad(i + 1) + ' / ' + S.config.questionsPerCheck + ' questions</span></div>' +
        '<div class="card-title-row"><h2>' + escape(n.name) + '</h2>' + arrow() + '</div><p>' + escape(n.summary) + '</p></a>';
    }).join("");
    show(backLink("#/check", "All categories") + '<section class="page-intro"><p class="eyebrow">Pick your check</p><h1 id="screen-title" tabindex="-1">' + escape(c.name) + '</h1><p>' + escape(c.blurb) + '</p></section>' +
      '<nav class="nutrient-list" aria-label="' + escape(c.name) + '">' + list + '</nav><p class="small-note">Think about your recent weeks and usual routine. Symptoms can have many causes.</p>', c.name, "Choose a nutrient in " + c.name);
  }

  function quizScreen(n) {
    if (!profile) { navigate("#/about-you/" + n.id, null, true); return; }
    setTheme(categoryById(n.category));
    var qs = questionsFor(n);
    var session = sessionFor(n);
    var state = window.history.state;
    var requested = state && state.nutrientId === n.id && Number.isInteger(state.step) ? state.step : 0;
    var firstMissing = session.answers.indexOf(null);
    var index = Math.max(0, Math.min(requested, firstMissing === -1 ? qs.length - 1 : firstMissing));
    var q = qs[index];
    // Keep history in step with the question shown (e.g. after a refresh clears answers),
    // otherwise a later Back can return to a stale step.
    if (requested !== index || !state || state.nutrientId !== n.id) {
      window.history.replaceState({ nutrientId: n.id, step: index }, "", window.location.hash);
    }
    active = { nutrient: n, index: index };
    var maxAnswer = S.scoring.maxAnswer;
    // Every answer has its own label; 1 is always least concern and 5 the most.
    var labels = S.config.scales[q.scale];
    var tiles = Array.from({ length: maxAnswer }, function (_, i) {
      var value = i + 1;
      return '<button class="answer-tile" type="button" data-answer="' + value + '" aria-label="Answer ' + value + ' out of ' + maxAnswer + ': ' + escape(labels[i]) + '" aria-pressed="' + (session.answers[index] === value) + '">' + value + '</button>';
    }).join("");
    var tileLabels = labels.map(function (text) { return '<span>' + escape(text) + '</span>'; }).join("");
    var back = index ? '<button type="button" class="back" data-action="previous"><span aria-hidden="true">←</span> Back</button>' : backLink("#/c/" + n.category, "Back");
    show('<section class="quiz-screen"><div class="quiz-nav">' + back + '<span class="eyebrow">' + escape(n.name) + '</span></div>' +
      '<div class="progress-label"><span>YOUR CHECK-IN</span><span><b>' + (index + 1) + '</b> / ' + qs.length + '</span></div>' +
      '<progress class="quiz-progress" max="' + qs.length + '" value="' + (index + 1) + '" aria-label="Question ' + (index + 1) + ' of ' + qs.length + '"></progress>' +
      '<div class="question-copy"><p class="eyebrow">On a scale of 1–' + maxAnswer + '</p><h1 id="screen-title" tabindex="-1">' + escape(q.text) + '</h1></div>' +
      '<div class="answer-grid" role="group" aria-labelledby="screen-title">' + tiles + '</div>' +
      '<div class="tile-labels" aria-hidden="true">' + tileLabels + '</div>' +
      '<p class="tap-hint">Tap the answer that fits best. You can go back.</p>' +
      (n.quizNote ? '<p class="quiz-note">' + escape(n.quizNote) + '</p>' : '<p class="quiz-note">Think about your recent weeks. There are no right or wrong answers.</p>') +
      profileLine(n) + '<p class="small-note">' + escape(copy.disclaimer) + '</p></section>', n.name + " · Question " + (index + 1), "Question " + (index + 1) + " of " + qs.length + ". " + q.text);
  }

  function driversLine(scored) {
    var top = S.scoring.drivers(scored.items, scored.answers, 3);
    if (!top.length) return '<p class="drivers">' + escape(copy.driversNone) + '</p>';
    return '<p class="drivers"><span>' + escape(copy.driversIntro) + '</span> ' + top.map(function (i) { return '<b>' + escape(scored.items[i].topic) + '</b>'; }).join(" · ") + '</p>';
  }
  function caution(n) {
    return n.upperLimitNote ? '<aside class="caution" aria-label="Supplement caution"><p class="eyebrow eyebrow-icon">' + icon("capsule") + 'Before you supplement</p><p>' + escape(n.upperLimitNote) + '</p></aside>' : "";
  }
  function resultScreen(n) {
    if (!completed(n)) { navigate("#/q/" + n.id, { nutrientId: n.id, step: 0 }, true); return; }
    setTheme(categoryById(n.category));
    var scored = scoreFor(n);
    var result = scored.result;
    var band = S.config.bands.find(function (b) { return b.id === result.band; });
    var prominent = result.band === "high" || (result.band === "moderate" && n.cautionLevel === "high");
    var callout = result.band === "low" ? "" : '<aside class="doctor-callout ' + (prominent ? "prominent" : "gentle") + '" aria-label="Clinical assessment"><span class="callout-mark" aria-hidden="true">' + icon("stethoscope") + '</span><div><p>' + escape(prominent ? n.highCallout || copy.highCallout : n.moderateCallout || copy.moderateCallout) + '</p><p class="callout-detail">' + escape(n.testContext || copy.testContext) + '</p></div></aside>';
    var maxScore = S.scoring.maxScore;
    var meter = Array.from({ length: maxScore }, function (_, i) { return '<span class="meter-step' + (i < result.score ? " filled" : "") + '" aria-hidden="true"></span>'; }).join("");
    var links = ((S.affiliate && S.affiliate.links[n.id]) || []).filter(function (l) { return safeUrl(l.url); });
    var picks = productsFor(n.id);
    var hasAffiliate = result.score >= S.config.affiliateMinScore && (links.length > 0 || picks.length > 0);
    var affiliate = "";
    if (hasAffiliate) {
      affiliate = '<section class="affiliate-section" aria-labelledby="shop-title"><p class="eyebrow">Optional next step</p><h2 id="shop-title">Explore your options.</h2>' +
        '<p>' + escape(n.affiliateNote || "These are shopping links, not a recommendation to start a supplement. Your score does not mean you need to buy anything.") + '</p>' +
        caution(n) +
        '<div class="affiliate-buttons">' + links.map(function (link) {
          return '<a class="button affiliate-button" href="' + escape(link.url) + '" target="_blank" rel="sponsored noopener noreferrer">' + label("bag", escape(link.label)) + '<span aria-hidden="true">↗</span><span class="sr-only"> (opens a new tab)</span></a>';
        }).join("") +
        (picks.length ? '<a class="button secondary" href="#/shop/for/' + escape(n.id) + '">' + label(n.icon || "bag", "See " + escape(n.name) + " in the Supl shop") + '<span aria-hidden="true">→</span></a>' : "") +
        '</div>' + (links.length ? '<p class="disclosure">' + escape(S.affiliate.disclosure) + '</p>' : "") + '</section>';
    }
    show('<section class="result-screen"><p class="eyebrow">Your check-in, complete</p><h1 id="screen-title" tabindex="-1">' + escape(n.name) + '</h1>' +
      '<div class="score-row"><p class="score"><span class="sr-only">Score ' + result.score + ' out of ' + maxScore + '</span><span aria-hidden="true"><span class="score-num">' + result.score + '</span><span class="score-max">/' + maxScore + '</span></span></p><span class="band-label">' + escape(band.label) + '</span></div>' +
      '<div class="score-meter" style="--score-steps:' + maxScore + '" role="meter" aria-label="Questionnaire risk score" aria-valuemin="1" aria-valuemax="' + maxScore + '" aria-valuenow="' + result.score + '" aria-valuetext="' + result.score + ' out of ' + maxScore + ', ' + escape(band.label) + '">' + meter + '</div>' +
      '<div class="meter-labels"><span>1 · Lower</span><span>Higher · ' + maxScore + '</span></div><p class="interpretation">' + escape(copy.interpretations[result.score]) + '</p>' + driversLine(scored) + callout + pregnancyNote() +
      '<p class="score-context">' + escape(copy.limitation) + '</p>' + affiliate +
      '<section class="guidance" aria-labelledby="guidance-title"><p class="eyebrow">Start with understanding</p><h2 id="guidance-title">Food comes first.</h2><p>' + escape(n.summary) + '</p>' +
      '<h3 class="heading-icon">' + icon("chart") + 'Daily reference</h3>' + referenceHtml(n) +
      '<h3 class="heading-icon">' + icon("leaf") + escape(n.foodSourcesLabel || "Food sources") + '</h3><ul class="food-list">' + n.foodSources.map(function (food) { return '<li>' + escape(food) + '</li>'; }).join("") + '</ul>' +
      (n.guidanceNote ? '<p>' + escape(n.guidanceNote) + '</p>' : "") +
      '<div class="guidance-links"><a class="text-link" href="#/learn/' + escape(n.id) + '">' + icon("book") + 'Learn about ' + escape(n.name) + ' <span aria-hidden="true">→</span></a>' +
      '<a class="text-link" href="' + (picks.length ? "#/shop/for/" + escape(n.id) : "#/shop") + '">' + icon("bag") + (picks.length ? 'Browse ' + escape(n.name) + ' in the Supl shop' : 'Browse the Supl shop') + ' <span aria-hidden="true">→</span></a></div></section>' +
      (hasAffiliate ? "" : caution(n)) + savePanelShell() +
      '<nav class="result-actions" aria-label="Next check"><button class="button primary" type="button" data-action="retake" data-nutrient="' + escape(n.id) + '">' + label("retake", "Retake this check") + '</button><a class="button secondary" href="#/c/' + escape(n.category) + '">' + label("grid", "Pick another nutrient") + '<span aria-hidden="true">→</span></a><a class="home-link" href="#/">' + icon("home") + 'Home</a></nav>' +
      '<p class="small-note">' + escape(copy.safety) + '</p><p class="result-disclaimer">' + escape(copy.disclaimer) + '</p></section>', n.name + " result", n.name + ": " + result.score + " out of " + maxScore + ". " + band.label + " questionnaire score.");
    fillSavePanel(n);
    animateScore(result.score);
  }

  // ---- Shop ----
  var shopSort = "featured";
  var shopList = [];
  function productVisual(p, large) {
    var c = shopCategoryById(p.category) || {};
    var image = safeImage(p.image);
    var inner = image ? '<img src="' + escape(image) + '" alt="' + escape(p.imageAlt || p.name) + '"' + (large ? "" : ' loading="lazy"') + '>'
      : '<span class="product-mark">' + icon(productIcon(p)) + '</span>';
    return '<div class="product-visual' + (image ? " has-image" : "") + '" style="--card-accent:' + escape(c.accent || "#ffe34b") + '">' + inner +
      (p.badge ? '<span class="product-badge">' + escape(p.badge) + '</span>' : "") + '</div>';
  }
  function productIcon(p) {
    var linked = (p.nutrients || []).map(nutrientById).filter(Boolean)[0];
    var c = shopCategoryById(p.category);
    return [p.icon, linked && linked.icon, c && c.icon, "bottle"].find(function (name) { return name && S.icons && S.icons[name]; });
  }
  function priceTag(p) {
    var off = Number.isFinite(p.mrp) && p.mrp > p.price ? Math.round(100 * (p.mrp - p.price) / p.mrp) : 0;
    return '<p class="price"><span class="sr-only">Price </span>' + money(p.price) +
      (off ? ' <s><span class="sr-only">was </span>' + money(p.mrp) + '</s> <span class="saving">' + off + '% off</span>' : "") + '</p>';
  }
  function productCards(list) {
    if (!list.length) return '<p class="shop-empty">No products here yet. New products are added regularly.</p>';
    return list.map(function (p) {
      return '<a class="product-card" href="#/p/' + escape(p.id) + '">' + productVisual(p, false) +
        '<div class="product-info"><h2>' + escape(p.name) + '</h2>' + (p.size ? '<p class="product-size">' + escape(p.size) + '</p>' : "") + priceTag(p) + '</div></a>';
    }).join("");
  }
  function sortProducts(list) {
    var sorted = list.slice();
    if (shopSort === "price-low") sorted.sort(function (a, b) { return a.price - b.price; });
    if (shopSort === "price-high") sorted.sort(function (a, b) { return b.price - a.price; });
    if (shopSort === "newest") sorted.sort(function (a, b) { return String(b.added || "").localeCompare(String(a.added || "")); });
    return sorted;
  }
  function shopNote(withDisclosure) {
    var amazon = withDisclosure && products().some(function (p) { return isAmazon(p.buyUrl); });
    return '<aside class="shop-note"><p>Supplements are not a substitute for a varied diet. If you are pregnant, breastfeeding, have a medical condition or take medication, speak to a clinician first. Check labels and never exceed the stated amount.</p>' +
      (amazon ? '<p>' + escape(S.affiliate.disclosure) + '</p>' : "") + '</aside>';
  }
  function shopScreen(filter) {
    // filter: null (all), { category } or { nutrient }
    var list = products().filter(function (p) {
      if (!safeUrl(p.buyUrl)) return false;
      if (filter && filter.category) return p.category === filter.category.id;
      if (filter && filter.nutrient) return (p.nutrients || []).indexOf(filter.nutrient.id) !== -1;
      return true;
    });
    shopList = list;
    var theme = filter && filter.category ? filter.category : filter && filter.nutrient ? categoryById(filter.nutrient.category) : null;
    setTheme(theme);
    var activeId = filter && filter.category ? filter.category.id : filter && filter.nutrient ? null : "all";
    var chips = [{ id: "all", name: "All", href: "#/shop", icon: "grid" }].concat(shopCategories().map(function (c) { return { id: c.id, name: c.name, href: "#/shop/" + c.id, icon: c.icon }; }))
      .map(function (c) { return '<a class="chip" href="' + escape(c.href) + '"' + (c.id === activeId ? ' aria-current="page"' : "") + '>' + icon(c.icon) + escape(c.name) + '</a>'; }).join("");
    var title = filter && filter.category ? filter.category.name : filter && filter.nutrient ? filter.nutrient.name : "The Supl shop.";
    var intro = filter && filter.nutrient
      ? '<p>Products listed for ' + escape(filter.nutrient.name) + '. Your check-in score does not mean you need to buy anything.</p>' + caution(filter.nutrient) +
        '<a class="text-link" href="#/q/' + escape(filter.nutrient.id) + '">' + icon("check") + 'Take the ' + escape(filter.nutrient.name) + ' check-in <span aria-hidden="true">↗</span></a>'
      : '<p>Vitamins, minerals and everyday essentials. Not sure where to start? <a href="#/check">Take a 2-minute check-in</a>.</p>';
    var options = [["featured", "Featured"], ["price-low", "Price: low to high"], ["price-high", "Price: high to low"], ["newest", "Newest"]].map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === shopSort ? " selected" : "") + '>' + o[1] + '</option>';
    }).join("");
    show((filter && filter.nutrient ? backLink("#/shop", "All products") : "") +
      '<section class="shop-screen"><div class="page-intro"><p class="eyebrow">' + (filter ? "The Supl shop" : "Shop supplements") + '</p><h1 id="screen-title" tabindex="-1">' + escape(title) + '</h1>' + intro + '</div>' +
      '<nav class="chip-row" aria-label="Shop categories">' + chips + '</nav>' +
      '<div class="shop-toolbar"><span>' + list.length + (list.length === 1 ? " product" : " products") + '</span><label>' + icon("sort") + 'Sort by <select id="shop-sort">' + options + '</select></label></div>' +
      '<div class="product-grid" id="product-grid">' + productCards(sortProducts(list)) + '</div>' + shopNote(true) + '</section>',
      title.replace(/\.$/, ""), title.replace(/\.$/, "") + ". " + list.length + " products.");
  }
  function productScreen(p) {
    var c = shopCategoryById(p.category);
    setTheme(c || null);
    var linked = (p.nutrients || []).map(nutrientById).filter(Boolean);
    var cautions = linked.filter(function (n) { return n.upperLimitNote; });
    // The same caution can apply to several nutrients (e.g. potassium and sodium); show each note once.
    var seen = {};
    var cautionHtml = cautions.filter(function (n) { if (seen[n.upperLimitNote]) return false; seen[n.upperLimitNote] = true; return true; }).map(caution).join("");
    var url = safeUrl(p.buyUrl);
    var amazon = isAmazon(url);
    show(backLink(c ? "#/shop/" + c.id : "#/shop", c ? c.name : "Shop") +
      '<article class="product-page">' + productVisual(p, true) +
      '<p class="eyebrow">' + escape(c ? c.name : "Shop") + '</p><h1 id="screen-title" tabindex="-1">' + escape(p.name) + '</h1>' +
      (p.size ? '<p class="product-size">' + escape(p.size) + '</p>' : "") + priceTag(p) +
      (p.description ? '<p class="product-description">' + escape(p.description) + '</p>' : "") +
      (p.highlights && p.highlights.length ? '<ul class="product-highlights">' + p.highlights.map(function (h) { return '<li>' + escape(h) + '</li>'; }).join("") + '</ul>' : "") +
      cautionHtml +
      (url ? '<a class="button affiliate-button" href="' + escape(url) + '" target="_blank" rel="' + (amazon ? "sponsored " : "") + 'noopener noreferrer">' +
        label("bag", escape(p.buyLabel || (amazon ? "Buy on Amazon" : "Buy now"))) + '<span aria-hidden="true">↗</span><span class="sr-only"> (opens a new tab)</span></a>' : "") +
      (url && amazon ? '<p class="disclosure">' + escape(S.affiliate.disclosure) + '</p>' : "") +
      (linked.length ? '<div class="product-checks"><p class="eyebrow">Not sure you need it?</p>' + linked.map(function (n) {
        return '<a class="button secondary" href="#/q/' + escape(n.id) + '">' + label(n.icon || "check", "Take the " + escape(n.name) + " check-in") + '<span aria-hidden="true">→</span></a>';
      }).join("") + '</div>' : "") +
      '<p class="small-note">Prices and availability are set by the seller and may change. Supl does not test products.</p>' + shopNote(false) + '</article>',
      p.name, p.name + ". " + money(p.price) + ".");
  }

  // ---- Accounts ----
  // Accounts are optional. Without a configured backend (data/backend.js) none of this appears.
  // Quiz answers leave this tab only when a signed-in user chooses Save, after giving consent.
  var PENDING_KEY = "supl.pendingCheckin";
  var backendCfg = S.backend || {};
  var authNext = null; // nutrient id whose result should be reopened after signing in
  var GOOGLE_G = '<svg class="icon google-g" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function acct() { return S.accountStatus === "on" ? S.account : null; }
  function signedInUser() { var a = acct(); return a ? a.user() : null; }
  function authRedirect(flow) { return window.location.origin + window.location.pathname + "?auth=" + flow; }
  function shortDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }
  function updateAccountNav() {
    var link = document.querySelector(".nav-account");
    if (!link) return;
    link.hidden = S.accountStatus === "off";
    var user = signedInUser();
    link.setAttribute("aria-label", user ? "Your account" : "Sign in");
    link.classList.toggle("signed-in", !!user);
  }
  function setMessage(container, text, kind) {
    var box = container && container.querySelector(".form-message");
    if (!box) return;
    box.className = "form-message" + (kind ? " " + kind : "");
    box.textContent = text || "";
  }
  function setBusy(container, on) {
    container.querySelectorAll("button, input").forEach(function (el) { el.disabled = on; });
    container.setAttribute("aria-busy", String(on));
  }
  function validAnswers(n, answers) {
    return Array.isArray(answers) && answers.length === questionsFor(n).length && answers.every(function (a) { return Number.isInteger(a) && a >= 1 && a <= S.scoring.maxAnswer; });
  }
  // Google sign-in leaves the page, so a just-finished check-in is parked in this tab's
  // sessionStorage for the round trip only, then restored and removed.
  function parkPending(nutrientId) {
    var n = nutrientById(nutrientId);
    if (!n || !completed(n)) return;
    try { window.sessionStorage.setItem(PENDING_KEY, JSON.stringify({ nutrientId: n.id, answers: sessions[n.id].answers, profile: profile })); } catch (_) { /* storage blocked: the result is simply not restored */ }
  }
  function restorePending() {
    var raw = null;
    try { raw = window.sessionStorage.getItem(PENDING_KEY); window.sessionStorage.removeItem(PENDING_KEY); } catch (_) { return null; }
    try {
      var data = JSON.parse(raw);
      var n = data && nutrientById(data.nutrientId);
      var pr = data && data.profile;
      var okProfile = pr && ["female", "male", "other"].indexOf(pr.sex) !== -1 && Number.isInteger(pr.ageIndex) && pr.ageIndex >= 0 && pr.ageIndex < S.config.ageGroups.length;
      if (!n || !okProfile) return null;
      profile = { sex: pr.sex, ageIndex: pr.ageIndex, pregnant: pr.pregnant === true, menopause: pr.menopause === true };
      if (!validAnswers(n, data.answers)) return null;
      sessions[n.id] = { answers: data.answers.slice() };
      return n.id;
    } catch (_) { return null; }
  }
  function afterSignIn() {
    updateAccountNav();
    var n = authNext && nutrientById(authNext);
    authNext = null;
    navigate(n && completed(n) ? "#/r/" + n.id : "#/account", null, true);
  }

  // Runs once at start-up: finishes Google sign-in, email confirmation and password-reset links.
  function handleAuthRedirect() {
    var params = new URLSearchParams(window.location.search);
    var flow = params.get("auth");
    if (!flow) return false;
    var code = params.get("code");
    var problem = params.get("error_description") || params.get("error");
    // Remove the one-time code from the address bar and history straight away.
    window.history.replaceState(null, "", window.location.pathname + "#/account");
    var a = acct();
    if (!a) return false;
    setTheme(null);
    show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">Signing you in…</h1><p class="small-note">This only takes a moment.</p></section>', "Signing in");
    var step = code ? a.exchangeCode(code) : Promise.reject(new Error(problem ? "Sign-in didn’t finish: " + problem + "." : "Sign-in didn’t finish. Please try again."));
    step.then(function () {
      updateAccountNav();
      if (flow === "recovery") { navigate("#/account/password", null, true); return; }
      var pending = restorePending();
      navigate(pending ? "#/r/" + pending : "#/account", null, true);
    }, function (error) {
      try { window.sessionStorage.removeItem(PENDING_KEY); } catch (_) { /* nothing parked */ }
      var hint = flow === "signup" ? " If you just confirmed your email, you can sign in now." : "";
      show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">That didn’t work.</h1><p class="form-message error">' + escape(error.message + hint) + '</p>' +
        '<a class="button primary" href="#/account">' + label("user", "Go to sign in") + '<span aria-hidden="true">→</span></a></section>', "Sign-in problem");
    });
    return true;
  }

  // ---- Result page: save panel ----
  function savePanelShell() {
    return S.accountStatus === "off" ? "" : '<section class="save-panel" id="save-panel" aria-labelledby="save-title"></section>';
  }
  function fillSavePanel(n) {
    var box = document.getElementById("save-panel");
    if (!box) return;
    var head = '<p class="eyebrow eyebrow-icon">' + icon("lock") + 'Your check-ins</p><h2 id="save-title">Keep a history.</h2>';
    var a = acct();
    if (!a) { box.innerHTML = head + '<p>Saving check-ins works on the hosted Supl website, not when this file is opened directly.</p>'; return; }
    var session = sessions[n.id];
    var user = a.user();
    if (!user) {
      box.innerHTML = head + '<p>Create a free account to keep a history of your check-ins and see your summary. Saving is optional.</p>' +
        '<a class="button secondary" href="#/account/save/' + escape(n.id) + '">' + label("user", "Sign in to save") + '<span aria-hidden="true">→</span></a>';
      return;
    }
    if (session.savedId) {
      box.innerHTML = head + '<p class="form-message success">Saved to your check-ins.</p><a class="button secondary" href="#/account">' + label("chart", "View my check-ins") + '<span aria-hidden="true">→</span></a>';
      return;
    }
    var token = renderToken;
    box.innerHTML = head + '<p class="small-note">Checking your account…</p>';
    a.getProfile().then(function (profile) {
      if (token !== renderToken) return;
      var consented = !!(profile && profile.health_consent_at);
      box.innerHTML = head + (consented ? '<p>Save this result to your account. Only you can see it.</p>' :
        '<label class="consent"><input type="checkbox" name="consent"><span>I agree that Supl stores my answers and score from this check-in in my account, so I can see my history and summary. I can delete them at any time. <a href="#/privacy">Privacy policy</a></span></label>') +
        '<p class="form-message" role="alert"></p><button class="button primary" type="button" data-action="save-checkin" data-nutrient="' + escape(n.id) + '">' +
        label("check", consented ? "Save to my check-ins" : "Agree and save") + '</button>';
    }, function (error) {
      if (token !== renderToken) return;
      box.innerHTML = head + '<p class="form-message error">' + escape(error.message) + '</p>' + (error.code === "signed_out" ? '<a class="button secondary" href="#/account/save/' + escape(n.id) + '">' + label("user", "Sign in again") + '</a>' : "");
      updateAccountNav();
    });
  }
  function saveCheckin(button) {
    var n = nutrientById(button.dataset.nutrient);
    var a = acct();
    var box = document.getElementById("save-panel");
    if (!n || !a || !box || !completed(n)) return;
    var consent = box.querySelector('input[name="consent"]');
    if (consent && !consent.checked) { setMessage(box, "Please tick the box to agree first. Saving is optional.", "error"); consent.focus(); return; }
    var scored = scoreFor(n);
    var result = scored.result;
    setBusy(box, true);
    setMessage(box, "Saving…");
    (consent ? a.giveConsent(backendCfg.consentVersion) : Promise.resolve()).then(function () {
      return a.saveCheckin({ nutrientId: n.id, answers: sessions[n.id].answers.slice(), score: result.score, band: result.band, profile: { sex: profile.sex, ageGroup: ageGroup().id, menopause: profile.sex === "female" ? profile.menopause : null } });
    }).then(function (row) {
      sessions[n.id].savedId = (row && row.id) || true;
      fillSavePanel(n);
      announcer.textContent = "Saved to your check-ins.";
    }, function (error) {
      setBusy(box, false);
      setMessage(box, error.message, "error");
    });
  }

  // ---- Account screens ----
  function accountUnavailable() {
    var text = S.accountStatus === "unsupported"
      ? "Sign-in works on the hosted Supl website. It isn’t available when this file is opened directly from your computer."
      : "Accounts aren’t switched on yet. You can still shop and take every check-in without one.";
    show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">Accounts.</h1><p>' + escape(text) + '</p>' +
      '<a class="button primary" href="#/check">' + label("check", "Take a check-in") + '<span aria-hidden="true">→</span></a></section>', "Account");
  }
  function field(name, labelText, type, autocomplete, hint) {
    return '<label class="field"><span>' + labelText + '</span><input name="' + name + '" type="' + type + '" autocomplete="' + autocomplete + '" required' +
      (hint ? ' aria-describedby="' + name + '-hint"' : "") + '></label>' + (hint ? '<p class="field-hint" id="' + name + '-hint">' + hint + '</p>' : "");
  }
  function authScreen(view) {
    var n = authNext && nutrientById(authNext);
    var intro = n && completed(n) ? '<p>Sign in or create an account to save your ' + escape(n.name) + ' check-in.</p>' : '<p>Keep a private history of your check-ins and see a summary. Accounts are optional.</p>';
    var tabs = '<nav class="auth-tabs" aria-label="Account options"><a href="#/account"' + (view === "signin" ? ' aria-current="page"' : "") + '>Sign in</a><a href="#/account/create"' + (view === "create" ? ' aria-current="page"' : "") + '>Create account</a></nav>';
    var google = backendCfg.googleSignIn === false ? "" : '<button class="button google-button" type="button" data-action="google"><span class="button-label">' + GOOGLE_G + '<span>Continue with Google</span></span></button><p class="or"><span>or use email</span></p>';
    var form;
    if (view === "create") {
      form = '<form class="auth-form" data-form="create" novalidate>' + field("email", "Email", "email", "email") +
        field("password", "Password", "password", "new-password", "At least 8 characters.") +
        '<label class="consent"><input type="checkbox" name="adult"><span>I am 18 or older.</span></label>' +
        '<p class="small-note">By creating an account you agree to the <a href="#/privacy">privacy policy</a>. Your check-ins are saved only when you choose to save one.</p>' +
        '<p class="form-message" role="alert"></p><button class="button primary" type="submit">' + label("user", "Create account") + '</button></form>';
    } else if (view === "forgot") {
      form = '<form class="auth-form" data-form="forgot" novalidate>' + field("email", "Email", "email", "email") +
        '<p class="form-message" role="alert"></p><button class="button primary" type="submit">' + label("lock", "Send reset link") + '</button></form>' +
        '<a class="text-link" href="#/account">Back to sign in</a>';
      google = "";
      tabs = "";
    } else {
      form = '<form class="auth-form" data-form="signin" novalidate>' + field("email", "Email", "email", "email") + field("password", "Password", "password", "current-password") +
        '<p class="form-message" role="alert"></p><button class="button primary" type="submit">' + label("user", "Sign in") + '</button></form>' +
        '<a class="text-link" href="#/account/forgot">Forgot your password?</a>';
    }
    var title = view === "create" ? "Create an account." : view === "forgot" ? "Reset your password." : "Sign in.";
    show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">' + title + '</h1>' + intro + tabs + google + form + '</section>',
      title.replace(/\.$/, ""));
  }
  function passwordScreen() {
    show(backLink("#/account", "Your account") + '<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">Choose a new password.</h1>' +
      '<form class="auth-form" data-form="password" novalidate>' + field("password", "New password", "password", "new-password", "At least 8 characters.") +
      field("confirm", "Confirm new password", "password", "new-password") +
      '<p class="form-message" role="alert"></p><button class="button primary" type="submit">' + label("lock", "Save new password") + '</button></form></section>', "New password");
  }
  function handleForm(form) {
    if (form.dataset.form === "about-you") { handleAboutYou(form); return; }
    var a = acct();
    if (!a) return;
    var kind = form.dataset.form;
    var value = function (name) { var el = form.elements[name]; return el ? (el.type === "checkbox" ? el.checked : el.value.trim()) : ""; };
    var email = value("email");
    var password = form.elements.password ? form.elements.password.value : "";
    if ((kind === "signin" || kind === "create" || kind === "forgot") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage(form, "Enter a valid email address.", "error"); form.elements.email.focus(); return; }
    if ((kind === "signin") && !password) { setMessage(form, "Enter your password.", "error"); form.elements.password.focus(); return; }
    if ((kind === "create" || kind === "password") && password.length < 8) { setMessage(form, "Use at least 8 characters for your password.", "error"); form.elements.password.focus(); return; }
    if (kind === "create" && !value("adult")) { setMessage(form, "Accounts are for adults. Please confirm you are 18 or older.", "error"); form.elements.adult.focus(); return; }
    if (kind === "password" && password !== form.elements.confirm.value) { setMessage(form, "The two passwords don’t match.", "error"); form.elements.confirm.focus(); return; }
    setBusy(form, true);
    setMessage(form, kind === "forgot" ? "Sending…" : "Please wait…");
    var done = function (text) { setBusy(form, false); setMessage(form, text, "success"); };
    var fail = function (error) { setBusy(form, false); setMessage(form, error.message, "error"); };
    if (kind === "signin") a.signIn(email, password).then(afterSignIn, fail);
    if (kind === "create") a.signUp(email, password, authRedirect("signup")).then(function (res) {
      if (res.signedIn) afterSignIn();
      else { form.reset(); done("Almost done: we’ve emailed you a link to confirm your address. After confirming, sign in here."); }
    }, fail);
    if (kind === "forgot") a.resetPassword(email, authRedirect("recovery")).then(function () {
      done("If an account exists for that email, a reset link is on its way. Open it in this browser.");
    }, fail);
    if (kind === "password") a.updatePassword(password).then(function () { form.reset(); done("Password updated."); }, fail);
  }

  function dashboard(user) {
    show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">Your check-ins.</h1>' +
      '<p class="account-email">' + icon("user") + escape(user.email || "") + (user.provider === "google" ? " · Google" : "") + '</p>' +
      '<div id="dash-body" aria-live="polite"><p class="small-note">Loading your check-ins…</p></div></section>', "Your check-ins", "Your account. Loading your check-ins.");
    var token = renderToken;
    var a = acct();
    Promise.all([a.getProfile(), a.listCheckins()]).then(function (results) {
      if (token !== renderToken) return;
      document.getElementById("dash-body").innerHTML = dashboardBody(user, results[0], results[1] || []);
      enhance(document.getElementById("dash-body"));
    }, function (error) {
      if (token !== renderToken) return;
      updateAccountNav();
      document.getElementById("dash-body").innerHTML = '<p class="form-message error">' + escape(error.message) + '</p>' +
        (error.code === "signed_out" ? '<a class="button primary" href="#/account">' + label("user", "Sign in") + '</a>' : '<button class="button secondary" type="button" data-action="reload-account">' + label("retake", "Try again") + '</button>');
    });
  }
  function dashboardBody(user, profile, checkins) {
    var consented = !!(profile && profile.health_consent_at);
    var html = "";
    if (!checkins.length) {
      html += '<section class="dash-section"><h2>Nothing saved yet.</h2><p>Finish a check-in, then choose <b>Save to my check-ins</b> on the result. Your history and summary will appear here.</p>' +
        '<a class="button primary" href="#/check">' + label("check", "Take a check-in") + '<span aria-hidden="true">→</span></a></section>';
    } else {
      html += summarySection(checkins) + historySection(checkins);
    }
    html += '<section class="dash-section"><h2 class="heading-icon">' + icon("lock") + 'Your data.</h2>' +
      '<p>' + (consented ? "Saving is on since " + escape(shortDate(profile.health_consent_at)) + ". Only you can see your check-ins." : "Saving is off. Nothing is stored until you choose to save a check-in.") + '</p>' +
      '<p class="form-message" role="alert"></p><div class="dash-actions">' +
      '<button class="button secondary" type="button" data-action="export">' + label("download", "Download my data") + '</button>' +
      (user.provider === "email" ? '<a class="button secondary" href="#/account/password">' + label("lock", "Change password") + '<span aria-hidden="true">→</span></a>' : "") +
      '<button class="button secondary" type="button" data-action="signout">' + label("logout", "Sign out") + '</button>' +
      (consented || checkins.length ? dangerButton("withdraw", "Stop saving and delete my check-ins", "This deletes every saved check-in and turns saving off. Your account stays.", "Yes, delete my check-ins") : "") +
      dangerButton("delete-account", "Delete my account", "This permanently deletes your account and everything saved in it. It can’t be undone.", "Yes, delete everything") +
      '</div><p class="small-note">Read the <a href="#/privacy">privacy policy</a> for how your data is handled.</p></section>';
    return html;
  }
  function dangerButton(action, text, warning, confirmText) {
    return '<div class="danger-zone"><button class="button secondary danger" type="button" data-action="arm" data-arm="' + action + '">' + label("trash", text) + '</button>' +
      '<div class="confirm" id="confirm-' + action + '" hidden><p>' + escape(warning) + '</p><div class="confirm-buttons">' +
      '<button class="button danger-solid" type="button" data-action="' + action + '">' + escape(confirmText) + '</button>' +
      '<button class="button secondary" type="button" data-action="disarm" data-arm="' + action + '">Cancel</button></div></div></div>';
  }
  function summarySection(checkins) {
    var rules = S.summaryRules;
    var sum = S.summary.summarize(checkins, S.nutrients, rules, new Date());
    var item = function (area) {
      var n = nutrientById(area.nutrientId);
      var band = S.config.bands.find(function (b) { return b.id === area.band; });
      var action = area.testFirst
        ? '<p class="summary-action">Get tested before considering a supplement. A clinician can advise.</p>'
        : (productsFor(n.id).length ? '<a class="text-link" href="#/shop/for/' + escape(n.id) + '">' + icon("bag") + 'Browse ' + escape(n.name) + ' in the shop</a>' : "");
      return '<li class="summary-item">' + iconBadge(n.icon) + '<div><p class="summary-name">' + escape(n.name) + ' <span>' + area.score + '/10 · ' + escape(band ? band.label : area.band) + '</span></p>' +
        '<p class="small-note">Checked ' + escape(shortDate(area.date)) + ' · <a href="#/q/' + escape(n.id) + '">Retake</a></p>' + action + '</div></li>';
    };
    var html = '<section class="dash-section"><h2 class="heading-icon">' + icon("chart") + 'Your summary.</h2>' +
      '<p class="small-note">Based on your latest saved check-in for each nutrient from the last ' + rules.maxAgeDays + ' days. It is not a diagnosis or a recommendation to take anything. Talk to a clinician about anything that concerns you, especially if you are pregnant, breastfeeding, have a medical condition or take medication.</p>';
    if (sum.areas.length) {
      html += '<h3>Worth a closer look</h3><ul class="summary-list">' + sum.areas.map(item).join("") + '</ul>';
    } else {
      html += '<p>None of your recent check-ins scored ' + rules.minScore + ' or higher. A lower score can’t rule out low levels; if symptoms persist, speak to a clinician.</p>';
    }
    var multiCat = rules.multivitamin && shopCategoryById(rules.multivitamin.shopCategory);
    if (sum.multivitamin && multiCat) {
      html += '<aside class="multi-note">' + iconBadge(multiCat.icon) + '<div><p><b>Several areas scored ' + rules.minScore + ' or higher.</b> If you’re considering supplements, ask a clinician whether a general multivitamin makes sense for you before combining single nutrients.</p>' +
        '<a class="text-link" href="#/shop/' + escape(multiCat.id) + '">' + icon("bag") + 'Browse ' + escape(multiCat.name) + '</a></div></aside>';
    }
    if (sum.lower.length) {
      html += '<h3>Lower scores</h3><p class="small-note">' + sum.lower.map(function (a) { return escape(a.name) + " " + a.score + "/10"; }).join(" · ") + '</p>';
    }
    if (sum.staleNutrients) html += '<p class="small-note">' + sum.staleNutrients + ' older check-in' + (sum.staleNutrients === 1 ? " is" : "s are") + ' not included. Retake for an up-to-date summary.</p>';
    return html + '</section>';
  }
  function historySection(checkins) {
    var rows = checkins.slice(0, 50).map(function (c) {
      var n = nutrientById(c.nutrient_id);
      var band = S.config.bands.find(function (b) { return b.id === c.band; });
      return '<li class="history-item"><div><p class="summary-name">' + escape(n ? n.name : c.nutrient_id) + ' <span>' + c.score + '/10 · ' + escape(band ? band.label : c.band) + '</span></p>' +
        '<p class="small-note">' + escape(shortDate(c.created_at)) + '</p></div><button class="icon-button" type="button" data-action="delete-checkin" data-id="' + escape(c.id) + '" aria-label="Delete ' + escape(n ? n.name : "this") + ' check-in from ' + escape(shortDate(c.created_at)) + '">' + icon("trash") + '</button></li>';
    }).join("");
    return '<section class="dash-section"><h2 class="heading-icon">' + icon("book") + 'History.</h2><ul class="history-list">' + rows + '</ul>' +
      (checkins.length > 50 ? '<p class="small-note">Showing your 50 most recent check-ins. Download your data to see all of them.</p>' : "") + '</section>';
  }
  function accountAction(button) {
    var a = acct();
    if (!a) return;
    var action = button.dataset.action;
    var section = document.getElementById("dash-body") || main;
    var fail = function (error) { setMessage(section, error.message, "error"); section.querySelectorAll("button").forEach(function (b) { b.disabled = false; }); };
    if (action === "arm" || action === "disarm") {
      var confirmBox = document.getElementById("confirm-" + button.dataset.arm);
      confirmBox.hidden = action === "disarm";
      if (action === "arm") confirmBox.querySelector(".danger-solid").focus();
      return;
    }
    if (action === "reload-account") { render(); return; }
    if (action === "signout") { a.signOut().then(function () { updateAccountNav(); navigate("#/account", null, true); }); return; }
    if (action === "export") {
      button.disabled = true;
      a.exportData().then(function (data) {
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "supl-my-data.json";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
        button.disabled = false;
        setMessage(section, "Your data file has been downloaded.", "success");
      }, fail);
      return;
    }
    button.disabled = true;
    if (action === "delete-checkin") a.deleteCheckin(button.dataset.id).then(function () { announcer.textContent = "Check-in deleted."; render(); }, fail);
    if (action === "withdraw") a.withdrawConsent().then(function () { announcer.textContent = "Saving turned off and check-ins deleted."; render(); }, fail);
    if (action === "delete-account") a.deleteAccount().then(function () {
      Object.keys(sessions).forEach(function (id) { delete sessions[id].savedId; });
      updateAccountNav();
      setTheme(null);
      show('<section class="account-screen"><p class="eyebrow">Your account</p><h1 id="screen-title" tabindex="-1">Account deleted.</h1><p>Your account and everything saved in it have been deleted.</p>' +
        '<a class="button primary" href="#/">' + label("home", "Back to Supl") + '<span aria-hidden="true">→</span></a></section>', "Account deleted");
    }, fail);
  }
  function accountRoute(parts) {
    setTheme(null);
    var a = acct();
    if (!a) { accountUnavailable(); return; }
    var view = parts[1] || "signin";
    if (view === "save") {
      var n = nutrientById(parts[2]);
      if (!n) { navigate("#/account", null, true); return; }
      authNext = n.id;
      view = "signin";
    }
    var user = a.user();
    if (view === "password") { if (user) passwordScreen(); else navigate("#/account", null, true); return; }
    if (user) {
      if (authNext) { afterSignIn(); return; }
      dashboard(user);
      return;
    }
    if (["signin", "create", "forgot"].indexOf(view) === -1) { navigate("#/account", null, true); return; }
    authScreen(view);
  }

  function privacy() {
    setTheme(null);
    var owner = backendCfg.privacyOwner || "[Owner name to be added before launch]";
    var contact = backendCfg.privacyContact ? '<a href="mailto:' + escape(backendCfg.privacyContact) + '">' + escape(backendCfg.privacyContact) + '</a>' : "[contact email to be added before launch]";
    show(backLink("#/", "Home") + '<article class="about"><p class="eyebrow">Privacy policy · version ' + escape(backendCfg.consentVersion || "") + '</p><h1 id="screen-title" tabindex="-1">Your data,<br>your choice.</h1>' +
      '<p class="lead">You can shop and take every check-in without an account. Nothing you answer is stored unless you sign in and choose to save a check-in.</p>' +
      '<h2 class="heading-icon">' + icon("user") + 'Who is responsible.</h2><p>Supl is run by ' + escape(owner) + '. For any privacy question, request or grievance, contact ' + contact + '. We aim to respond within 30 days.</p>' +
      '<h2 class="heading-icon">' + icon("check") + 'Without an account.</h2><p>Check-in answers and your “About you” choices (sex at birth, age group, and for women pregnancy and menopause) stay in this browser tab’s memory and are cleared when you refresh or close it. They are not sent anywhere. Your sort choices in the shop are not stored either.</p>' +
      '<h2 class="heading-icon">' + icon("lock") + 'With an account.</h2><p>We store your email address, how you sign in (email or Google), and the date you agreed to saving. If you sign in with Google, we receive your email address from Google; we do not receive your Google password or contacts.</p>' +
      '<p>When you choose <b>Save</b> on a result, we store that check-in’s ten answers, its score, its band, the date, and the parts of “About you” that shaped it: your sex at birth, your age group and (for women) whether you have been through menopause. We do not store whether you are pregnant or breastfeeding. Answers about symptoms are health-related information, so we only save them with your explicit consent, given in the save box. We use them only to show your history and summary to you. We do not sell your data, use it for advertising, or share it with shops or brands.</p>' +
      '<p>Your sign-in stays active on this device until you sign out (a session token is kept in this browser’s local storage for that purpose only). During Google sign-in, an unsaved result and your “About you” choices are kept in this tab for a moment so they can be restored, then removed.</p>' +
      '<h2 class="heading-icon">' + icon("book") + 'Where it is stored.</h2><p>Account data is stored with our database provider, Supabase, which processes it on our behalf. Access is restricted so that each account can only read its own check-ins.</p>' +
      '<h2 class="heading-icon">' + icon("retake") + 'Your rights.</h2><p>From your account page you can download your data, delete individual check-ins, withdraw consent (which deletes all saved check-ins and stops saving), and delete your account entirely. Deletion is immediate in our database; backups held by our provider expire on their normal schedule. You can also contact us to access, correct or erase your data, or to raise a grievance.</p>' +
      '<h2 class="heading-icon">' + icon("info") + 'Adults only.</h2><p>Accounts are for people aged 18 or older. Supl is an awareness tool, not a medical service, and your saved results are not medical records.</p>' +
      '<h2 class="heading-icon">' + icon("tag") + 'Shops and links.</h2><p>Shop links take you to other websites, such as Amazon, whose own privacy policies apply. We may earn a commission; we never send them your check-ins.</p>' +
      '<p class="small-note">If this policy changes in a way that affects how your data is used, we will ask for your consent again.</p></article>', "Privacy policy", "Privacy policy");
  }

  // ---- About you ----
  // Sex at birth, age group and (for women) pregnancy and menopause. Kept in this tab's memory only. It picks
  // which questions apply, adds age and menopause to the score, and highlights your row in the references.
  function sexWord(sex) { return sex === "female" ? "a woman" : sex === "male" ? "a man" : "an adult"; }
  function profileLabel() {
    var g = ageGroup();
    return g ? sexWord(profile.sex) + " aged " + g.label : "";
  }
  function profileLine(n) {
    return profile ? '<p class="small-note answering-as">Answering as <b>' + escape(profileLabel()) + '</b>. <a href="#/about-you/' + escape(n.id) + '">Change</a></p>' : "";
  }
  function pregnancyNote() {
    return profile && profile.pregnant ? '<aside class="caution" aria-label="Pregnancy and breastfeeding"><p class="eyebrow eyebrow-icon">' + icon("info") + 'Pregnancy and breastfeeding</p><p>' + escape(copy.aboutYou.pregnancy) + '</p></aside>' : "";
  }
  function choice(name, value, text, checked) {
    return '<label class="choice"><input type="radio" name="' + name + '" value="' + value + '"' + (checked ? " checked" : "") + '><span>' + text + '</span></label>';
  }
  function yesNo(name, legend, value) {
    return '<fieldset class="choice-group"><legend>' + legend + '</legend><div class="choice-row">' + choice(name, "no", "No", value === false) + choice(name, "yes", "Yes", value === true) + '</div></fieldset>';
  }
  // target: "" (back to the check-in hub), a nutrient id (go to its quiz) or, with mode "learn", a nutrient's Learn page.
  function aboutYouScreen(nutrientId, mode) {
    setTheme(null);
    var n = nutrientId && nutrientById(nutrientId);
    var p = profile || {};
    var ageId = p.ageIndex !== undefined ? S.config.ageGroups[p.ageIndex].id : "";
    var sexes = '<fieldset class="choice-group"><legend>Sex at birth</legend><div class="choice-row">' +
      choice("sex", "female", "Female", p.sex === "female") + choice("sex", "male", "Male", p.sex === "male") + choice("sex", "other", "Prefer not to say", p.sex === "other") + '</div></fieldset>';
    var ages = '<fieldset class="choice-group"><legend>Age</legend><div class="choice-row">' +
      S.config.ageGroups.map(function (g) { return choice("age", g.id, escape(g.label), ageId === g.id); }).join("") + choice("age", "under18", "Under 18", false) + '</div></fieldset>';
    var female = '<div class="female-only" id="female-only"' + (p.sex === "female" ? "" : " hidden") + '>' +
      yesNo("pregnant", "Are you pregnant or breastfeeding?", p.sex === "female" ? p.pregnant : undefined) +
      '<p class="form-note" id="pregnancy-note"' + (p.pregnant ? "" : " hidden") + '>' + escape(copy.aboutYou.pregnancy) + '</p>' +
      yesNo("menopause", "Have you been through menopause?", p.sex === "female" ? p.menopause : undefined) + '</div>';
    var next = n ? (mode === "learn" ? "learn:" : "quiz:") + n.id : "";
    var button = n ? (mode === "learn" ? "Continue to " + escape(n.name) + " guide" : "Continue to " + escape(n.name)) : "Save and continue";
    var back = n ? backLink(mode === "learn" ? "#/learn/" + n.id : "#/c/" + n.category, "Back") : backLink("#/check", "Check-ins");
    show(back + '<section class="account-screen about-you"><p class="eyebrow">Before you start</p><h1 id="screen-title" tabindex="-1">A little about you.</h1><p>' + escape(copy.aboutYou.intro) + '</p>' +
      '<form class="auth-form" data-form="about-you" data-next="' + escape(next) + '" novalidate>' + sexes + ages + female +
      '<p class="form-message" role="alert"></p><button class="button primary" type="submit">' + label("check", button) + '<span aria-hidden="true">→</span></button></form></section>', "About you", "A little about you. Choose your sex at birth and age group.");
  }
  function handleAboutYou(form) {
    var value = function (name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ""; };
    var sex = value("sex"), age = value("age");
    var ask = function (text, name) { setMessage(form, text, "error"); var el = form.querySelector('input[name="' + name + '"]'); if (el) el.focus(); };
    if (!sex) { ask("Please choose one option for sex at birth.", "sex"); return; }
    if (!age) { ask("Please choose your age group.", "age"); return; }
    if (age === "under18") { ask(copy.aboutYou.under18, "age"); return; }
    if (sex === "female" && !value("pregnant")) { ask("Please say whether you are pregnant or breastfeeding.", "pregnant"); return; }
    if (sex === "female" && !value("menopause")) { ask("Please say whether you have been through menopause.", "menopause"); return; }
    var next = { sex: sex, ageIndex: S.config.ageGroups.findIndex(function (g) { return g.id === age; }), pregnant: sex === "female" && value("pregnant") === "yes", menopause: sex === "female" && value("menopause") === "yes" };
    // A different profile can change which questions apply, so earlier answers are cleared.
    if (profile && JSON.stringify(profile) !== JSON.stringify(next)) sessions = Object.create(null);
    profile = next;
    var target = form.dataset.next || "";
    var id = target.split(":")[1];
    if (target.indexOf("quiz:") === 0) navigate("#/q/" + id, { nutrientId: id, step: 0 });
    else if (target.indexOf("learn:") === 0) navigate("#/learn/" + id);
    else navigate("#/check");
  }

  // ---- Learn ----
  function rowWho(r) {
    if (r.ages === "Adults") return "Adults";
    var sex = r.sex === "female" ? "Women" : r.sex === "male" ? "Men" : "Everyone";
    return sex + " · " + r.ages + (/^\d+–\d+$/.test(r.ages) ? " years" : "");
  }
  function rowFits(r) {
    if (!profile) return false;
    var g = ageGroup();
    var sexOk = r.sex === "all" || profile.sex === "other" || r.sex === profile.sex;
    return sexOk && r.from <= g.max && (r.to === null || r.to >= g.min);
  }
  // The daily-reference sentence for the signed-in profile, taken from the Learn tables.
  function personalReference(n) {
    var L = S.learn && S.learn[n.id];
    if (!L || !profile) return "";
    var rows = L.needs.rows.filter(rowFits);
    if (!rows.length) return "";
    // Without a sex, name who each amount is for. With an age group that spans several bands, name the ages too.
    var bySex = profile.sex === "other" && rows.some(function (r) { return r.sex !== "all"; });
    var spans = rows.filter(function (r, i) { return rows.findIndex(function (x) { return x.ages === r.ages; }) === i; }).length > 1;
    var entries = rows.map(function (r) {
      return { amount: r.amount, ages: spans ? "ages " + r.ages : "", who: bySex ? (r.sex === "female" ? "women" : r.sex === "male" ? "men" : "everyone") : "" };
    });
    // Adjacent age bands can share an amount (e.g. calcium 51–70 and 71+ for women): say it once.
    var unique = [];
    entries.forEach(function (e) { if (!unique.some(function (u) { return u.amount === e.amount && u.who === e.who; })) unique.push(e); });
    var parts = unique.map(function (e) {
      var tags = [e.who, unique.length > 1 || bySex ? e.ages : ""].filter(Boolean);
      return e.amount + (tags.length ? " (" + tags.join(", ") + ")" : "");
    });
    return "For " + profileLabel() + ": " + parts.join("; ") + ".";
  }
  function referenceHtml(n) {
    var mine = personalReference(n);
    var more = S.learn && S.learn[n.id] ? ' <a href="#/learn/' + escape(n.id) + '">See every age group</a>' : "";
    if (!mine) return '<p>' + escape(n.typicalIntake) + '</p><p class="small-note">' + escape(copy.reference) + '</p>';
    return '<p class="your-reference">' + escape(mine) + '</p><p class="small-note">' + escape(copy.reference) + more + '</p>';
  }
  function vegDot(veg) {
    return veg ? '<span class="diet-dot veg" role="img" aria-label="Vegetarian"></span>' : '<span class="diet-dot nonveg" role="img" aria-label="Not vegetarian"></span>';
  }
  function chipList(items) { return '<ul class="chip-list">' + items.map(function (t) { return '<li>' + escape(t) + '</li>'; }).join("") + '</ul>'; }
  function bulletList(items) { return '<ul class="learn-bullets">' + items.map(function (t) { return '<li>' + escape(t) + '</li>'; }).join("") + '</ul>'; }

  function learnList() {
    setTheme(null);
    var groups = S.categories.slice().sort(function (a, b) { return a.order - b.order; }).map(function (c) {
      var items = S.nutrients.filter(function (n) { return n.category === c.id && S.learn && S.learn[n.id]; });
      if (!items.length) return "";
      return '<section class="learn-group" aria-label="' + escape(c.name) + '"><h2 class="learn-group-title">' + escape(c.name) + '</h2>' + items.map(function (n) {
        return '<a class="learn-link-card" href="#/learn/' + escape(n.id) + '" style="--card-accent:' + escape(c.accent) + '">' + iconBadge(n.icon) +
          '<span class="learn-link-text"><b>' + escape(n.name) + '</b><span>' + escape(S.learn[n.id].tagline) + '</span></span><span class="learn-chevron" aria-hidden="true">›</span></a>';
      }).join("") + '</section>';
    }).join("");
    show('<div class="learn"><section class="learn-intro"><p class="eyebrow">Library</p><h1 id="screen-title" tabindex="-1">Learn what each nutrient actually is.</h1>' +
      '<p>Plain-language guides built from public-health sources: what it does, how much you need, the best foods, signs of low levels, what to watch for and more.</p></section>' + groups +
      '<p class="small-note learn-note">Learning guides are general information, not medical advice.</p></div>', "Learn", "Learn what each nutrient actually is. Choose a nutrient.");
  }

  function learnScreen(n) {
    var c = categoryById(n.category);
    setTheme(c);
    var L = S.learn && S.learn[n.id];
    if (!L) {
      show(backLink("#/learn", "All nutrients") + '<div class="learn"><section class="learn-intro"><h1 id="screen-title" tabindex="-1">' + escape(n.name) + '</h1><p>' + escape(n.summary) + '</p><p class="small-note">A full guide for this nutrient is coming soon.</p></section></div>', n.name + " guide");
      return;
    }
    var mine = personalReference(n);
    var needRows = L.needs.rows.map(function (r) {
      return '<tr' + (rowFits(r) ? ' class="you"' : "") + '><th scope="row">' + escape(rowWho(r)) + (rowFits(r) ? ' <span class="you-badge">You</span>' : "") + '</th><td>' + escape(r.amount) + '</td></tr>';
    }).join("");
    var foodBlock;
    if (L.foods && L.foods.length) {
      foodBlock = '<ul class="food-rows">' + L.foods.map(function (f) {
        return '<li><span class="food-name">' + vegDot(f.veg) + '<span>' + escape(f.food) + '<small>' + escape(f.serving) + '</small></span></span><b>' + escape(f.amount) + '</b></li>';
      }).join("") + '</ul><p class="legend"><span>' + vegDot(true) + ' Vegetarian (includes dairy)</span><span>' + vegDot(false) + ' Meat, fish or egg</span></p>';
    } else {
      foodBlock = chipList(L.limitFoods || []);
    }
    var nav = [["does", "What it does"], ["needs", "How much"], ["foods", "Foods"], ["low", "Low levels"], ["high", "Too much"], ["meds", "Medicines"], ["test", "Testing"]]
      .map(function (a) { return '<button type="button" class="jump" data-scroll="L-' + a[0] + '">' + a[1] + '</button>'; }).join("");
    var hasProducts = productsFor(n.id).length > 0;
    show(backLink("#/learn", "All nutrients") + '<article class="learn learn-detail">' +
      '<header class="learn-hero"><span class="icon-badge lg">' + icon(n.icon) + '</span><p class="eyebrow">' + escape(c ? c.name : "Nutrient") + '</p><h1 id="screen-title" tabindex="-1">' + escape(n.name) + '</h1>' +
      '<p class="learn-tagline">' + escape(L.tagline) + '</p><p class="learn-what">' + escape(L.whatItIs) + '</p></header>' +
      '<div class="learn-facts">' + L.keyFacts.map(function (f) { return '<div class="fact"><span>' + escape(f.label) + '</span><b>' + escape(f.value) + '</b></div>'; }).join("") + '</div>' +
      '<nav class="learn-jump" aria-label="On this page">' + nav + '</nav>' +
      '<section class="learn-section" id="L-does"><h2>' + icon("sun") + 'What it does</h2><ul class="learn-does">' + L.does.map(function (d) { return '<li><b>' + escape(d.title) + '</b><span>' + escape(d.text) + '</span></li>'; }).join("") + '</ul></section>' +
      '<section class="learn-section" id="L-needs"><h2>' + icon("chart") + 'How much you need</h2>' +
      (mine ? '<p class="your-reference">' + escape(mine) + '</p>' : '<p class="small-note"><a href="#/about-you/learn/' + escape(n.id) + '">Add your age and sex</a> to highlight your row.</p>') +
      '<table class="learn-table"><thead><tr><th scope="col">Who</th><th scope="col">Daily reference</th></tr></thead><tbody>' + needRows + '</tbody></table>' +
      '<p class="small-note">' + escape(L.needs.note) + '</p><p class="small-note">' + escape(copy.reference) + '</p></section>' +
      '<section class="learn-section" id="L-foods"><h2>' + icon("leaf") + escape(L.foodsHeading || "Best food sources") + '</h2>' + foodBlock +
      (L.indianFoods && L.indianFoods.length ? '<h3>Common in Indian kitchens</h3>' + chipList(L.indianFoods) + (L.indianNote ? '<p class="small-note">' + escape(L.indianNote) + '</p>' : "") : "") +
      (L.foodTip ? '<p class="learn-tip">' + escape(L.foodTip) + '</p>' : "") + '</section>' +
      '<section class="learn-section" id="L-low"><h2>' + icon("info") + 'Who is more at risk, and signs of low levels</h2><h3>Who is more at risk</h3>' + bulletList(L.atRisk) +
      '<h3>Signs that can go with low levels</h3>' + bulletList(L.lowSigns) + (L.lowSignsNote ? '<p class="learn-tip">' + escape(L.lowSignsNote) + '</p>' : "") + '</section>' +
      '<section class="learn-section" id="L-high"><h2>' + icon("shield") + 'Too much</h2><p>' + escape(L.tooMuch) + '</p></section>' +
      '<details class="learn-details" id="L-meds"><summary>' + icon("capsule") + 'Medicines that can interact</summary><ul class="learn-does">' + L.interactions.map(function (m) { return '<li><b>' + escape(m.name) + '</b><span>' + escape(m.text) + '</span></li>'; }).join("") + '</ul><p class="small-note">Never stop or change a medicine because of what you read here. Ask your doctor or pharmacist.</p></details>' +
      '<details class="learn-details" id="L-test"><summary>' + icon("flask") + 'How it is measured</summary><p>' + escape(L.testing) + '</p><p class="small-note">' + escape(copy.testContext) + '</p></details>' +
      '<details class="learn-details" id="L-sources"><summary>' + icon("book") + 'Sources</summary><ul class="learn-sources">' + sourceLinks(n) + '</ul><p class="small-note">Written in plain language from these sources. Values are US and WHO references and have not yet been checked against India’s ICMR-NIN guidance.</p></details>' +
      '<div class="learn-cta"><a class="button primary" href="#/q/' + escape(n.id) + '">' + label("check", "Take the " + escape(n.name) + " check-in") + '<span aria-hidden="true">→</span></a>' +
      '<a class="button secondary" href="' + (hasProducts ? "#/shop/for/" + escape(n.id) : "#/shop") + '">' + label("bag", hasProducts ? "Browse " + escape(n.name) + " in the Supl shop" : "Browse the Supl shop") + '<span aria-hidden="true">→</span></a></div>' +
      '<p class="small-note learn-note">' + escape(copy.safety) + ' Learning guides are general information, not medical advice.</p></article>', n.name + " guide", "Guide to " + n.name + ". " + L.tagline);
  }

  function about() {
    setTheme(null);
    var sources = new Map();
    S.nutrients.forEach(function (n) { (n.sources || []).forEach(function (source) { sources.set(source.url, source); }); });
    show(backLink("#/", "Home") + '<article class="about"><p class="eyebrow">A little context</p><h1 id="screen-title" tabindex="-1">Know what<br>you’re checking.</h1>' +
      '<p class="lead">Supl is a screening and awareness tool for adults. Ten questions can help you think about your diet and decide what to discuss with a clinician.</p>' +
      '<h2 class="heading-icon">' + icon("check") + 'A check-in, not a diagnosis.</h2><p>' + escape(copy.limitation) + '</p><p>Symptoms are often nonspecific, and low levels can exist without symptoms. This is not medical advice and cannot tell you whether to take a supplement.</p>' +
      '<h2 class="heading-icon">' + icon("chart") + 'How the score works.</h2><p>Quiz answers use a 1–' + S.scoring.maxAnswer + ' scale that always runs the same way: 1 means no concern and ' + S.scoring.maxAnswer + ' the most. Answers are combined using editorial weights: risk factors named by public-health sources (such as a plant-based diet, certain medicines or bowel conditions) count more than general symptoms like tiredness. The result shows which answers raised the score most. The result runs from 1 to ' + S.scoring.maxScore + ': ' + S.config.bands.map(function (b) { return escape(b.label) + ' ' + b.min + (b.min === b.max ? '' : '–' + b.max); }).join(', ') + '. These bands and weights have not been clinically validated. The score is not a percentage chance of low levels.</p>' +
      '<h2 class="heading-icon">' + icon("flask") + 'Testing needs context.</h2><p>A questionnaire cannot measure blood nutrient levels; a blood test is needed to measure them. ' + escape(copy.testContext) + '</p>' +
      '<h2 class="heading-icon">' + icon("capsule") + 'Before you supplement.</h2><p>If you are pregnant, breastfeeding, have a medical condition or take medication, speak to a doctor before supplementing. This version is not designed for children. Intake references are general adult information, never personalised dosing instructions.</p><p>' + escape(copy.safety) + '</p>' +
      '<h2 class="heading-icon">' + icon("lock") + 'Your answers, your choice.</h2><p>Without an account, answers live only in this tab’s memory and are cleared when you refresh or close it. With an optional account, a check-in is stored only when you choose Save and agree to it, and you can delete it at any time. There are no cookies, analytics, ads trackers or external font requests.</p><p>On a hosted site, your host receives normal page requests and may keep access logs; quiz answers are never included. If you follow an Amazon or reference link, that website’s privacy policy applies. <a href="#/privacy">Read the privacy policy</a>.</p>' +
      '<h2 class="heading-icon">' + icon("tag") + 'About shopping links.</h2><p>' + escape(S.affiliate.disclosure) + '</p><p>Optional links appear from a score of ' + S.config.affiliateMinScore + '. They do not establish a need for supplements or endorse any product. Supl does not check product quality or availability. Amazon may track activity after you choose to visit it.</p>' +
      '<h2 class="heading-icon">' + icon("bag") + 'About the shop.</h2><p>The Supl shop lists products with links to where you can buy them. Supl does not sell, test or ship products itself, and prices and availability are set by the seller. Product listings are not medical advice, and a check-in score never means you need to buy anything.</p>' +
      '<h2 class="heading-icon">' + icon("book") + 'Where the content comes from.</h2><p>Public-health references inform the food and intake information. They do not endorse this quiz. Values are US NIH ODS references, with a WHO sodium guideline. Review against India’s ICMR-NIN guidance before launch.</p><ul class="reference-list">' + sourceLinks({ sources: Array.from(sources.values()) }) + '</ul>' +
      '<p class="small-note">The category names are navigation groups. Iron, zinc, copper and the electrolytes are also minerals; each nutrient is listed once to keep browsing simple.</p><a class="button primary" href="#/check">' + label("grid", "Choose a category") + '<span aria-hidden="true">→</span></a></article>', "About and disclaimer", "About Supl and its limitations");
  }

  function render() {
    // Cancelling pending advance prevents a delayed click from changing another route.
    window.clearTimeout(advanceTimer);
    window.clearTimeout(scoreTimer);
    locked = false;
    active = null;
    renderToken += 1;
    var parts;
    try { parts = (window.location.hash || "#/").slice(1).split("/").filter(Boolean).map(decodeURIComponent); }
    catch (_) { navigate("#/", null, true); return; }
    // A screen change animates only when the path changes: moving between questions of one check-in doesn't.
    var path = parts.join("/");
    pendingTransition = lastPath !== null && path !== lastPath;
    lastPath = path;
    var rootStyle = document.documentElement.style;
    oldTheme = { "--accent": rootStyle.getPropertyValue("--accent"), "--tint": rootStyle.getPropertyValue("--tint"), "--on-accent": rootStyle.getPropertyValue("--on-accent") };
    var section = parts[0] === "shop" || parts[0] === "p" ? "shop" : parts[0] === "learn" ? "learn" : ["check", "c", "q", "r", "about-you"].indexOf(parts[0]) !== -1 ? "check" : parts[0] === "account" ? "account" : "";
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === section) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    if (!parts.length) { home(); return; }
    if (parts.length === 1 && parts[0] === "check") { checkHub(); return; }
    updateAccountNav();
    if (parts[0] !== "account") authNext = null;
    if (parts.length === 1 && parts[0] === "about") { about(); return; }
    if (parts.length === 1 && parts[0] === "privacy") { privacy(); return; }
    if (parts[0] === "learn") {
      if (parts.length === 1) { learnList(); return; }
      var ln = parts.length === 2 && nutrientById(parts[1]);
      if (ln) { learnScreen(ln); return; }
    }
    if (parts[0] === "about-you") {
      if (parts.length === 1) { aboutYouScreen("", ""); return; }
      var an = parts.length === 2 ? nutrientById(parts[1]) : parts.length === 3 && parts[1] === "learn" ? nutrientById(parts[2]) : null;
      if (an) { aboutYouScreen(an.id, parts.length === 3 ? "learn" : "quiz"); return; }
    }
    if (parts[0] === "account" && parts.length <= 3) { accountRoute(parts); return; }
    if (parts.length === 2 && parts[0] === "c") {
      var c = categoryById(parts[1]);
      if (c) { categoryScreen(c); return; }
    }
    if (parts[0] === "shop") {
      if (parts.length === 1) { shopScreen(null); return; }
      var sc = parts.length === 2 && shopCategoryById(parts[1]);
      if (sc) { shopScreen({ category: sc }); return; }
      var sn = parts.length === 3 && parts[1] === "for" && nutrientById(parts[2]);
      if (sn) { shopScreen({ nutrient: sn }); return; }
    }
    if (parts.length === 2 && parts[0] === "p") {
      var p = productById(parts[1]);
      if (p) { productScreen(p); return; }
    }
    if (parts.length === 2 && (parts[0] === "q" || parts[0] === "r")) {
      var n = nutrientById(parts[1]);
      if (n) { if (parts[0] === "q") quizScreen(n); else resultScreen(n); return; }
    }
    navigate("#/", null, true);
  }

  document.addEventListener("click", function (event) {
    var answerButton = event.target.closest("[data-answer]");
    if (answerButton && active && !locked) {
      locked = true;
      var n = active.nutrient;
      var index = active.index;
      var token = renderToken;
      sessionFor(n).answers[index] = Number(answerButton.dataset.answer);
      main.querySelectorAll("[data-answer]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button === answerButton));
        button.setAttribute("aria-disabled", "true");
      });
      if (motionOK()) answerButton.classList.add("picked");
      advanceTimer = window.setTimeout(function () {
        if (token !== renderToken) return;
        if (index + 1 === questionsFor(n).length) navigate("#/r/" + n.id);
        else navigate("#/q/" + n.id, { nutrientId: n.id, step: index + 1 });
      }, answerDelay());
      return;
    }
    var jump = event.target.closest("[data-scroll]");
    if (jump) {
      var target = document.getElementById(jump.dataset.scroll);
      if (target) {
        if (target.tagName === "DETAILS") target.open = true;
        var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
        // Some browsers ignore smooth scrolling: if the section hasn't arrived, jump to it.
        if (!calm) window.setTimeout(function () { if (document.body.contains(target) && Math.abs(target.getBoundingClientRect().top - 66) > 90) target.scrollIntoView({ behavior: "auto", block: "start" }); }, 900);
      }
      return;
    }
    var action = event.target.closest("[data-action]");
    if (action && action.dataset.action === "previous" && active) {
      // Each next question adds a history entry, so both Back controls agree.
      window.clearTimeout(advanceTimer);
      window.history.back();
      return;
    }
    if (action && action.dataset.action === "retake") {
      delete sessions[action.dataset.nutrient];
      navigate("#/q/" + action.dataset.nutrient, { nutrientId: action.dataset.nutrient, step: 0 });
      return;
    }
    if (action && action.dataset.action === "save-checkin") { saveCheckin(action); return; }
    if (action && action.dataset.action === "google") {
      var a = acct();
      if (!a) return;
      if (authNext) parkPending(authNext);
      action.disabled = true;
      a.googleUrl(authRedirect("google")).then(function (url) { window.location.assign(url); }, function (error) {
        action.disabled = false;
        setMessage(main, error.message, "error");
      });
      return;
    }
    if (action && ["arm", "disarm", "export", "signout", "withdraw", "delete-account", "delete-checkin", "reload-account"].indexOf(action.dataset.action) !== -1) { accountAction(action); return; }
    var link = event.target.closest('a[href^="#/"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      navigate(link.getAttribute("href"));
    }
    var skip = event.target.closest(".skip-link");
    if (skip) { event.preventDefault(); main.focus(); }
  });

  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-form]");
    if (!form) return;
    event.preventDefault();
    handleForm(form);
  });

  // "About you": show the women-only questions, and the pregnancy note, as the choices change.
  document.addEventListener("change", function (event) {
    var input = event.target;
    if (!input.matches || !input.matches('.about-you input[type="radio"]')) return;
    var female = document.getElementById("female-only");
    if (input.name === "sex" && female) female.hidden = input.value !== "female";
    if (input.name === "pregnant") document.getElementById("pregnancy-note").hidden = input.value !== "yes";
  });

  document.addEventListener("change", function (event) {
    if (event.target.id !== "shop-sort") return;
    // Re-sort in place so focus and scroll position stay on the menu.
    shopSort = event.target.value;
    document.getElementById("product-grid").innerHTML = productCards(sortProducts(shopList));
    enhance(document.getElementById("product-grid"));
    announcer.textContent = "Sorted by " + event.target.selectedOptions[0].text + ".";
  });

  // A same-document browser traversal can emit both events; coalesce them.
  var routeQueued = false;
  function queueRoute() {
    if (routeQueued) return;
    routeQueued = true;
    queueMicrotask(function () { routeQueued = false; render(); });
  }
  // Static shell links (header, footer) name their icon in data-icon.
  document.querySelectorAll("[data-icon]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)); });
  window.addEventListener("popstate", queueRoute);
  window.addEventListener("hashchange", queueRoute);
  updateAccountNav();
  if (acct()) acct().onChange(updateAccountNav);
  if (!handleAuthRedirect()) render();
}(window.SUPL));
