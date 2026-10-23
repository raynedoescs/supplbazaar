# Supl — handoff to Claude Code / Opus

Prepared 20 October 2026. This file preserves the existing project's requirements, decisions and verification status. Read it before making changes, then inspect the actual files. The user's next instructions take priority.

## Start here

Project directory: `C:\Users\rayaa\Downloads\ryan project\ryan project` (earlier handoffs said `C:\Users\user\Documents\ryan project`)

This is an implemented, working first version, not a scaffold to recreate. Continue from the existing files. The most recent requested changes are complete; no specific next feature has been requested yet.

Read these next:

- `README.md`: running, deployment, editing data, assumptions and roadmap.
- `js/app.js`, `js/scoring.js`, `data/config.js`: behavior and scoring.
- `tests/browser-checklist.md`: dated verification and manual reproduction steps.
- `MEDICAL-REVIEW.md`: exact medical reference values, food sources, question inventory and source links.

The owner prefers autonomous work, sensible decisions, brief plain-language updates and finished, verified changes. Record assumptions in the README. Avoid unnecessary questions. Do not infer authorization to implement every roadmap feature or publish a site from this handoff.

## Latest user decisions — preserve these

1. **Initial questionnaire answers run from 1 to 5.**
2. **There are still exactly 10 questions per nutrient.**
3. **The final check-in score runs from 1 to 10, with ten meter segments.**
4. **Eligible Amazon affiliate links appear ABOVE the entire “Start with understanding / Food comes first.” section.**

The user's exact scale correction was: “the final check in should be from 1-10 / the initial diagnosis test should be from 1-5.”

The user used “diagnosis” conversationally; the product must still describe itself as a check-in or screening/awareness tool, not a diagnosis.

An earlier interpretation temporarily made the result 1–5 and retained 1–10 answers. That was corrected. Historical entries in the browser checklist describing that version are explicitly superseded. Do not restore that behavior or the original ten answer tiles.

## Product and scope

Supl is a minimal, bold, mobile-first supplement awareness tool:

Home → category → nutrient → ten questions → final score and general guidance.

**Shop (added 21 October 2026 at the owner's request):** Supl is now also a supplement store. The owner asked for a marketplace section like anugrahanutraceuticals.in/shop, "where i could slowly add products later", matching the existing style. It is a static, data-driven catalogue in `data/products.js` (`S.shop.categories`, `S.products`) with routes `#/shop`, `#/shop/<shopCategoryId>`, `#/shop/for/<nutrientId>` and `#/p/<productId>`. Buy buttons link out (Amazon or any https URL); there is no cart or checkout. Six `sample: true` example products are placeholders to delete before launch. See README "How to add shop products".

**Shop-first home and optional accounts (approved 21 October 2026).** The owner asked for a backend with "logins using user id and password or using google account", saved check-in answers, supplement suggestions, and the shop shown before the check-ins. After reviewing a proposal, they replied "yes approved build". The agreed design:
- **Home and nav:** the home page (`#/`) is shop-first. The check-in hub moved to `#/check`, and the nav order is Shop · Check-in · account icon.
- **Backend:** Supabase (Auth + Postgres with row-level security, Mumbai region recommended). It is accessed by `js/account.js` using fetch only, with no SDK and no build step.
- **Sign-in:** email + password instead of a username (so resets work), plus Google. Accounts are optional, and guests keep the original in-memory behaviour.
- **Saving:** answers are saved only after explicit consent on a result (DPDP-style). Users get export, per-item delete, withdraw-consent and delete-account controls, and there is a privacy page at `#/privacy`.
- **Suggestions:** replaced by a rule-based "Your summary" (`data/summary-rules.js`, `js/summary.js`), with no doses, no "optimal" claims and no AI. Iron is test-first.
- **Status:** accounts are OFF until `data/backend.js` has a Supabase URL and anon key; see `backend/SETUP.md`. No Supabase project, Google OAuth client, SMTP or domain has been supplied. The UI was verified against `tests/mock.html` (an in-memory stand-in), and the client against a fake fetch, but NOT against a live Supabase project. The SQL has not been executed against Postgres yet.

**Best sellers, About you and Learn (approved 22 October 2026).** The owner asked for: (1) the home product section to say "Our best sellers" and show four products then "Shop all products", with a `bestSeller` tick to be set by them later (until then the first four show); (2) a shop link on every result score; (3) a clear "About you" step before the quiz (sex, age, and for women pregnancy and menopause), with an equivalent replacement for sex-specific questions so every person sees exactly ten; (4) a third menu section, Learn, a library of nutrient guides summarising the government fact sheets, in a softer rounded Apple-like style (Learn only; the rest of the site keeps its flat bold look); and result pages that link to Learn instead of government sites (the sources stay at the bottom of each Learn page). The profile is memory-only; sex, age group and menopause are saved with a check-in only after consent. See README "About you and the Learn library".

No analytics, tracking, ads, payments, cart/checkout, PWA/service worker, admin UI or multiple languages. Guest answers live in memory only and are cleared by refresh or closing the tab.

No framework, build step, npm packages or runtime dependencies. Use plain HTML, CSS and vanilla JavaScript with classic script tags. Data attaches to `window.SUPL`. Do not convert to ES modules or fetch local JSON; opening `index.html` directly must remain supported.

The app must also work on ordinary static hosts and under a hosted subdirectory, without server rewrites.

## Files and responsibilities

| File | Purpose |
| --- | --- |
| `index.html` | Semantic shell, inline SVG favicon, local CSS, ordered classic deferred scripts |
| `css/styles.css` | Layout, local fonts, category colors, subtle inline SVG texture, accessible focus/motion styles |
| `js/app.js` | All screens, hash routing, in-memory sessions, question navigation and affiliate rendering |
| `js/icons.js` | Line-icon set (`S.icons`) and `S.icon(name)` helper; loaded before app.js |
| `js/scoring.js` | Pure scoring API; browser namespace and guarded CommonJS export for Node |
| `data/config.js` | Bands, affiliate threshold, advance delay and shared medical/limitation copy |
| `data/categories.js` | Category metadata |
| `data/vitamins.js` | Vitamin B12, vitamin D, vitamin B6, folate, vitamin C, vitamin A |
| `data/minerals.js` | Magnesium, calcium, iodine, selenium |
| `data/metals.js` | Iron, zinc, copper |
| `data/electrolytes.js` | Potassium, sodium, phosphorus |
| `data/essentials.js` | Omega-3, choline, fibre (fifth section) |
| `data/affiliate-links.js` | Quiz-result Amazon URLs, disclosure and placeholder warnings |
| `data/products.js` | Shop categories and products; example-product warnings |
| `data/learn.js` | Learn library entries per nutrient (reference tables checked against `typicalIntake`) |
| `images/products/` | Product photos referenced by `image` |
| `tests/load-data.js` | Loads the data scripts actually registered in index.html using Node's VM |
| `tests/scoring.test.js` | Scoring boundaries, reversals, weights, invalid inputs and immutability |
| `tests/validate-data.js` | Schema/reference validation and color-contrast checks |
| `tests/validate-data.test.js` | Validator rejection and warning regressions |
| `tests/browser-checklist.md` | Manual test instructions and dated browser results |
| `README.md` | Setup, editing instructions, decisions, limitations and roadmap |
| `MEDICAL-REVIEW.md` | Medical-content review inventory |

Screenshots in `tests/`:

- `supl-mobile.png`: original mobile home.
- `supl-quiz-scale.png`: current five-choice quiz.
- `supl-result-scale.png`: current ten-point result.
- `supl-result-update.png`: affiliate section above food guidance.

There is no package.json or build command. No Git metadata exists in the project directory, and the previous Git check reported that this was not a repository. Do not assume a branch, remote or existing commit history.

## Data-driven architecture

There are 5 categories, 19 nutrients and 190 questions (expanded 23 October 2026 at the owner's request: "i like the fifth section with omega 3 and add 2 more nutrient in that section else is approved"; see README "Nutrients and sections"). Each nutrient belongs to exactly one category:

| Category id | Nutrient ids | Accent / tint |
| --- | --- | --- |
| `vitamins` | `vitamin-b12`, `vitamin-d`, `vitamin-b6`, `folate`, `vitamin-c`, `vitamin-a` | `#ffe34b` / `#fffced` |
| `minerals` | `magnesium`, `calcium`, `iodine`, `selenium` | `#b5e6a2` / `#f3faef` |
| `metals` | `iron`, `zinc`, `copper` | `#fa7465` / `#fff4f1` |
| `electrolytes` | `potassium`, `sodium`, `phosphorus` | `#91bafa` / `#f1f6ff` |
| `essentials` | `omega-3`, `choline`, `fibre` | `#c9b8f5` / `#f7f4fe` |

Test-first (no Amazon link, `summaryRules.testFirst`): iron, vitamin A, iodine, selenium, copper, phosphorus. Omega-3, choline and fibre have no routine blood test, so they override the callout via `moderateCallout` / `highCallout` / `testContext`. Thiamin was offered and left out.

All category text uses `#111111`. These names are browsing groups, not mutually exclusive scientific classifications.

Category fields: `id`, `name`, `blurb` (at most six words), `accent`, `tint`, `onAccent`, `order`, optional `icon`. Nutrients, shop categories and products also take an optional `icon` naming a key in `js/icons.js`; the validator rejects unknown names.

Nutrient fields: `id`, `name`, `category`, `summary`, `foodSources` (3–5 items), `typicalIntake`, `cautionLevel` (`standard` or `high`), `upperLimitNote` (string or null), `questions` (exactly 10).

Question fields (rebuilt 22 October 2026 at the owner's request; they had noticed results were always 5–10 with the same subtitle): globally unique `id`, `text`, `scale` (key in `config.scales`; 5 labels shown under the tiles), `topic` (≤36 chars, used in "What raised your score most"), integer `weight` 1–3, `reverse` (must be `false`: 5 always means more concern), and `kind` (`symptom`, `diet`, `lifestyle`, `medical` or `background`). Questions derive from the NIH ODS risk groups and medication interactions (MedlinePlus for sodium); see MEDICAL-REVIEW.md. A question may also have `audience` (`female` or `other`); every profile must still see exactly 10 (validated). Nutrients may set `ageWeight` / `menopauseWeight`, scored automatically from About you and not asked.

Optional supported nutrient fields: `guidanceNote`, `quizNote`, `affiliateNote`, `foodSourcesLabel`, `sources: [{ label, url }]`, `moderateCallout`, `highCallout`, `testContext`.

Adding a nutrient or category must not require new renderer/router branches. Add entries to existing loaded data files. A separate new data file requires registering one classic script tag in index.html; no automatic local-file discovery is possible.

## Scoring contract

`SUPL.scoring` exports `calculate`, `validateBands`, `maxAnswer: 5`, `maxScore: 10`.

For each answer:

1. Validate that it is an integer from 1 to 5.
2. Normalize `r = (answer - 1) / 4`.
3. If `reverse` is true, set `r = 1 - r`.
4. Compute `W = sum(weight * r) / sum(weight)`.
5. Compute `score = round(1 + 9 * W)`, clamped to 1–10.

Return `{ score, band, percent }`, where `band` is the lowercase id and `percent = round(100 * W)`. Percent is an internal questionnaire index, NOT a clinical probability, and is deliberately not displayed.

Current configured bands:

- Low: 1–4.
- Moderate: 5–7.
- High: 8–10.

`affiliateMinScore` is 5. `advanceDelayMs` is 420 (raised from 250 so the answer tile's jelly wobble is visible; 250 ms when reduced motion is on).

No question is reversed: same answers give 1, 3, 6, 8 or 10. `interpretations` in config has one message per score 1–10 (bands still drive callouts and shopping), and `drivers(questions, answers, limit)` lists the top contributing answers (answer 3 or higher). The scoring formula and editorial weights are unvalidated. Do not imply diagnostic accuracy or a numerical probability of deficiency.

## Routing and state

Routes:

- `#/`
- `#/c/<categoryId>`
- `#/q/<nutrientId>`
- `#/r/<nutrientId>`
- `#/about`

Quiz sessions live inside the app closure. Only nutrient id and question position enter history state. Answers never enter URLs, history, logs or analytics. They leave the tab only when a signed-in user who has consented presses Save (POST to Supabase), and are briefly parked in sessionStorage only across a Google sign-in redirect started from a result. Other routes: `#/check`, `#/learn`, `#/learn/<nutrientId>`, `#/about-you[/<nutrientId>]`, `#/account[...]`, `#/privacy`. A quiz route without a profile redirects to About you first.

Each answer highlights its tile, wobbles, and advances after about 420 ms (250 ms with reduced motion). The five answer tiles occupy one row. Progress is question number out of ten. Browser Back and the quiz Back control retain earlier answers. Retake clears that nutrient's session.

Missing/incomplete answers on a result route redirect to that nutrient's first question. Unknown routes return Home. Refresh clears answers. Pending auto-advance is cancelled on navigation; a lock prevents duplicate taps from skipping questions. Scroll restoration is manual to keep previous questions visible.

## Result order and affiliate rules

Current result order:

1. Nutrient name.
2. Big score `N/10`, band and ten-segment meter.
3. Likelihood interpretation.
4. Clinical callout when required.
5. Short explanation of the score's limitations.
6. Eligible affiliate section, including neutral context, any caution directly above the buttons, and disclosure directly below the buttons.
7. “Start with understanding / Food comes first.” guidance: daily reference for the person's own sex and age group, foods, a Learn link and a shop link (the shop link shows at every score; the large shopping section above stays 5/10 and up).
8. If shopping is absent, any nutrient caution appears after guidance.
9. Save panel when accounts are configured (sign-in prompt, consent box, or Save button).
10. Retake, Pick another nutrient, Home, safety copy and disclaimer.

Clinical callouts:

- Low: no callout.
- Moderate with standard caution: “A blood test is the only way to confirm.”
- High, or Moderate with high caution: prominent “Please see a doctor or get a blood test before starting any supplement.”
- Retain the accompanying explanation that a clinician chooses and interprets tests.

B12 is `standard` with no upper-limit note; all other current nutrients, including magnesium, are `high`.

Affiliate links:

- Appear only if score is at least 5 and valid links exist.
- All URLs and Associate disclosure stay in `data/affiliate-links.js`.
- Arrays contain 1–3 `{ label, url }` objects keyed by nutrient id.
- All fourteen current entries still use the intentional `YOUR-TAG-21` placeholder; console/validator warnings are expected. Vitamin A, iodine, selenium, copper and phosphorus deliberately have none.
- Large full-width category-colored buttons; text only, no Amazon logos or product health claims.
- `target="_blank"` and `rel="sponsored noopener noreferrer"`.
- Disclosure: “As an Amazon Associate I earn from qualifying purchases.”
- Potassium and sodium use generic electrolyte drink mix searches only; retain caution that potassium-containing products are not suitable for everyone. Never encourage salt supplementation.
- Owner edits the file and redeploys. Do not add fake client-side authentication or a password-protected “admin” page.

## Health-content boundaries

The app is for adult screening awareness, not diagnosis or medical advice. Never say someone “is deficient” or “lacks” a nutrient. Use higher/lower likelihood wording, with explicit score limitations. A low result cannot rule out low levels.

Do not provide personalized supplement doses. Intake and upper-limit values are general reference information, not instructions or targets. Retain advice for pregnancy, breastfeeding, medical conditions and medication use to discuss supplements with a clinician.

The existing medical inventory uses US NIH ODS references for seventeen nutrients and WHO guidance for sodium and fibre. It has NOT been reconciled with India's ICMR-NIN guidance or independently approved for launch. Source links and every written intake, caution, food list and question are in `MEDICAL-REVIEW.md` and the nutrient data files. Read those instead of inventing or reconstructing values from this summary. Check authoritative sources before changing medical facts.

Question counts remain exactly ten, but symptom/diet/lifestyle mixes sometimes depart from the original suggested proportions to avoid inventing unsupported symptoms. Those decisions are recorded in README.md.

## Design to preserve

Mobile-first, designed around 375–430 px, with a centered column capped at 480 px on desktop. Large heavy local sans headings, system body font, generous space, near-black text, flat category colors and subtle inline SVG dot texture.

No gradients, soft shadows or emoji. **Animations approved by the owner on 22 October 2026** (they chose 1A, 2D, 3D, 4A, 5D, 6D and 7A from live demos, then asked for screen changes to rotate randomly through all four of 5A push, 5B fade and zoom, 5C sheet and 5D colour wipe, never the same twice in a row; see README "Animations"): hero icons pop and bob, cards grow in, answer tiles wobble, the score counts up, a random screen change (push, fade, sheet or colour wipe), list lines reveal on scroll, and on mouse devices cards and buttons lift onto a hard 4 px ink offset block (the one permitted shadow). All motion is skipped under prefers-reduced-motion and never delays content, focus or screen-reader text. **Icons approved by the owner on 21 October 2026** ("approved build it") after they asked for imagery on clickable elements: a single set of hand-drawn line icons in `js/icons.js` (inline SVG, `currentColor`, 24-pixel grid, round caps) on cards, nav, chips, buttons, callouts and About headings, plus a category icon row on Home (five circles since 23 October 2026). No stock photos, and no icons on the 1–5 answer tiles (to avoid biasing answers). Avoid alarming medical imagery such as syringes or blood drops. Real photos are for products only. Local fonts avoid external requests. Category tint applies to category, quiz and result screens; Home stays white. The theme-color meta tag follows the active category.

Preserve semantic controls, visible focus, keyboard operation, live question announcements, tile labels such as “Answer 3 out of 5”, adequate touch targets, reduced-motion rules and accessible result-meter values.

## Run and verify

Open index.html directly, or from the project directory run:

```text
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173`. Python is only a preview convenience. The previous temporary preview server was stopped after testing; start your own if needed.

Development checks, using Node with no package installation:

```text
node tests/scoring.test.js
node tests/validate-data.js
node tests/validate-data.test.js
node tests/summary.test.js
node tests/account.test.js
node --check js/app.js
```

Latest pass, 20 October 2026 (v1 completion): all 9 nutrients × Low/Moderate/High verified by real clicks; added the mid-quiz-refresh history fix and screen-reader text for the score. See the top entry of `tests/browser-checklist.md`. Node is not installed on this machine, so run the checks with VS Code's bundled runtime (`ELECTRON_RUN_AS_NODE=1`; see README). `.claude/launch.json` defines the `supl` preview server (py http.server on 4173).

Earlier verification after the scale correction on 20 October 2026:

- All 11 scoring tests passed, including every reachable final score and band boundary.
- Validator passed 4 categories, 9 nutrients, 90 questions; regression checks passed.
- Nine expected placeholder affiliate warnings; no browser console errors.
- HTTP browser checks at 375 px: B12, magnesium and sodium each reached 1/10 and 10/10 with exactly five answer choices on every question.
- B12 and magnesium reached 6/10 using all 3s; gentle versus prominent callouts were correct.
- Affiliate sections were above food guidance; required cautions were immediately above buttons.
- Browser Back, quiz Back, keyboard Enter, Retake, refresh reset, updated About copy and lack of horizontal overflow were checked.
- The original build additionally checked every route and 375/430/1280 px layouts. Consult dates in the checklist rather than treating historical checks as fresh coverage of a later change.

Quick reproduction:

- A nutrient without an age/menopause factor (B6, iron, zinc, potassium, sodium): answer the same number to all ten questions → 1 gives 1/10, 2 gives 3/10, 3 gives 6/10, 4 gives 8/10, 5 gives 10/10. B12, D, magnesium and calcium add an automatic age factor, so a young adult answering all 5s gets 9/10 and a person aged 75+ answering all 1s gets 2/10.

Verification limits:

- The previous automation browser prohibited file:// URLs. Direct-file support was checked structurally, not by live browser automation. Test double-click mode in an available normal browser without bypassing security restrictions.
- Safari, Firefox, physical mobile devices, an actual screen reader and OS reduced-motion preference were not live-tested.
- Browser QA is recorded manual/tool-driven evidence, not a committed automated browser test suite.
- No public deployment or actual affiliate attribution has been tested.
- Functional tests establish implementation behavior, not medical validity.

## Remaining work and next-session guidance

The latest requested UI changes are complete. First confirm the current state and use the owner's next request to select implementation work. Preserve the architecture and accepted UI unless they ask to change them.

Before launch, the documented remaining work is:

1. Independent clinical review and verification/localization against ICMR-NIN guidance. Do not claim this has already happened.
2. Replace the placeholder Associate tag with the owner's actual tagged links; no real tag has been supplied. Also replace or delete the six example shop products.
3. Direct-file and broader browser/device/accessibility checks.
4. Deploy to a static host when the owner chooses to publish. No host, domain or deployment credentials were supplied.
5. Accounts: the owner creates the Supabase project and (optionally) the Google OAuth client per `backend/SETUP.md`, sets up custom SMTP, fills `data/backend.js` (URL, anon key, privacyOwner, privacyContact), and gets a legal review of the privacy page. Then run the live test list in SETUP.md section 6.

6. Clinical review of the Learn library and the About-you question changes (see MEDICAL-REVIEW.md, "Learn library and About you").

Static deployment uses index.html, css/, js/, data/ and images/, with no build command or SPA rewrites. Exclude tests and internal handoff/review documents from the published bundle if appropriate.

A backend-backed admin panel, cart/checkout, more nutrients and translations are roadmap options, not outstanding requirements. Do not add infrastructure or dependencies merely to continue this project. Never put a Supabase service_role/secret key in any website file (the validator rejects it).

After relevant changes, run the checks, exercise affected browser flows, update the documentation and report what changed, what was verified and what remains unverified.
