# Supl

A mobile-first supplement shop with free 2-minute check-ins. Plain HTML, CSS and JavaScript, with no build step or dependencies. Optional accounts (email/password or Google) can save check-ins with consent, using a hosted Supabase backend; until it is configured the site is fully static, with no accounts, analytics, cookies or stored answers.

## Run it

Double-click `index.html`, or open it in a modern browser. Keep the `css`, `js` and `data` folders beside it. Internet access is not needed for the quiz. Amazon and reference links need an internet connection.

For a local HTTP preview, optionally run `python -m http.server 4173 --bind 127.0.0.1` in this folder, then visit `http://127.0.0.1:4173`. Python is only a preview convenience, not an application dependency.

## Deploy to a static host

Publish the folder containing `index.html`, `css/`, `js/`, `data/` and `images/` to any static host. Select a plain static/no-framework project, no build command, and the project root as the output/publish directory. No environment variables, server functions or SPA rewrite rules are needed. Hash routes also work under a subdirectory.

- Netlify, Vercel or Cloudflare Pages: upload/connect this folder as a static project with the settings above.
- GitHub Pages: commit the files and select the branch/root folder as the Pages source.
- `tests/`, `backend/` (setup SQL and guide), `.claude/` (local preview config), this README, `CLAUDE.md` and `MEDICAL-REVIEW.md` are development/review material. Exclude them from the published files.

Review the health content and replace the affiliate placeholders before a public launch. No deployment has been performed for this local deliverable.

## File map

```text
index.html                  Semantic shell, inline favicon, classic script loading
css/styles.css              Mobile layout, category colours, focus and motion support
js/app.js                   Hash routes, in-memory sessions and all five screens
js/scoring.js               Pure scoring API; also exports for Node
js/icons.js                 Line-icon set used across the site
js/summary.js               Pure rule-based summary of saved check-ins
js/account.js               Supabase Auth + REST client (fetch only); off until configured
data/backend.js             Supabase URL/anon key, consent version, privacy contact (owner edits)
data/summary-rules.js       Editable summary rules (thresholds, test-first nutrients, multivitamin)
backend/supabase-setup.sql  Tables, row-level security and functions to run in Supabase
backend/SETUP.md            Owner's step-by-step setup guide (Supabase, Google, SMTP)
tests/summary.test.js       Summary rule tests
tests/account.test.js       Account client tests against a fake server
tests/mock-account.js       In-memory account stand-in for UI testing (never publish)
tests/make-mock-page.js     Builds tests/mock.html from index.html with the stand-in
data/config.js              Bands, affiliate threshold, delay and shared health copy
data/categories.js          Category definitions
data/vitamins.js            B12, D, B6, folate, vitamin C, vitamin A
data/minerals.js            Magnesium, calcium, iodine, selenium
data/metals.js              Iron, zinc, copper
data/electrolytes.js        Potassium, sodium, phosphorus
data/essentials.js          Omega-3, choline, fibre (fifth section, added 23 October 2026)
data/affiliate-links.js     Quiz-result Amazon URLs and affiliate disclosure
data/products.js            Shop categories and products (the file you edit to add products)
data/learn.js               Learn library: plain-language nutrient guides (numbers from NIH/WHO)
images/products/            Product photos referenced from data/products.js
tests/load-data.js          Loads the same data scripts as index.html for tests
tests/scoring.test.js       Scoring behavior and boundary checks
tests/validate-data.js      Data schema, references and colour-contrast validation
tests/validate-data.test.js Validator failure/warning regression checks
tests/browser-checklist.md Reproducible browser QA and recorded results
tests/supl-mobile.png       Captured mobile home preview
tests/supl-result-update.png Updated shopping section above food guidance
tests/supl-quiz-scale.png   Current five-choice quiz preview
tests/supl-result-scale.png Current ten-point result preview
README.md                   Setup, editing, assumptions and roadmap
MEDICAL-REVIEW.md           Exact reference values, food lists and review notes
```

## Accounts (optional backend)

Accounts let people sign in with **email and password** or **Google**, save check-ins with explicit consent, and see a history and a rule-based summary. They run on **Supabase** (hosted Postgres plus Auth). The website stays static, with no build step and no SDK: `js/account.js` talks to Supabase's documented HTTP endpoints with `fetch`.

- **Switching on:** follow `backend/SETUP.md`, then paste the project URL and anon/publishable key into `data/backend.js`. With those empty (the current state), accounts are off: the account button is hidden, results show no save panel, and `#/account` says accounts aren't switched on yet.
- **Where it works:** https or `http://localhost` only. When `index.html` is opened directly from disk, check-ins still work, but sign-in says it needs the hosted site.
- **Login methods:** email + password (min. 8 characters, email confirmation via Supabase, password reset by email) and Google. Email is used instead of a username so passwords can be reset. Google sign-in, confirmation links and reset links use PKCE: the one-time `?code=` is exchanged and removed from the address bar immediately.
- **Saving check-ins:** only signed-in users who tick the consent box on a result. The consent date and `consentVersion` are stored, and the database refuses check-ins without consent (row-level security). Each saved check-in stores the ten answers, score, band and date. Nothing else.
- **Your data controls (account page):** download (JSON), delete one check-in, "Stop saving and delete my check-ins" (withdraws consent), change password (email accounts), sign out, and delete account (removes the auth user; data cascades).
- **Summary:** `js/summary.js` applies the editable rules in `data/summary-rules.js` to the latest saved check-in per nutrient from the last 180 days:
  - Areas scoring 5/10 or more are listed, linking to that nutrient's shop section when products exist.
  - `testFirst` nutrients (currently iron) say "get tested first" and never link to products.
  - With 3 or more areas, general multivitamin browsing is offered with "ask a clinician" wording.
  - There are no doses, no "optimal" claims and no AI.
- **Browser storage when signed in:** the Supabase session lives in `localStorage` (`supl.session`) until sign-out, plus a short-lived PKCE verifier (`supl.pkce`). During Google sign-in started from a result, that result's answers are parked in this tab's `sessionStorage` (`supl.pendingCheckin`) and removed on return.
- **Privacy page:** `#/privacy` is a plain-language policy. Fill in `privacyOwner` and `privacyContact` in `data/backend.js` before launch, and have it reviewed against India's DPDP Act. It is not legal advice.
- **Testing without Supabase:** run `node tests/make-mock-page.js`, serve the folder and open `/tests/mock.html`. It loads `tests/mock-account.js`, an in-memory stand-in. Seeded login: `test@example.com` / `password1`; emails starting "instant" sign in straight after sign-up. Never publish `tests/`.

## How to add shop products

The shop (`#/shop`) is a static catalogue: a product grid with category chips and sorting (Featured, price, Newest), plus a page per product (`#/p/<productId>`). Each product's **Buy** button opens your link in a new tab: an Amazon affiliate link, a brand's page, or any other https checkout. Supl itself has no cart, payments or order handling. Those would need a payment provider and a backend.

1. Open **`data/products.js`**. Copy one complete product `{ ... }`, paste it into `S.products`, and change every field.
2. Required: `id` (unique, lowercase-hyphenated), `name`, `category` (a shop category id in the same file), `price` (rupees, a number such as `399`), `buyUrl` (https).
3. Optional: `mrp` (struck-through original price; the "% off" is calculated), `size`, `badge` (e.g. "New"), `image`, `imageAlt`, `description`, `highlights` (list), `nutrients` (check-in ids such as `"vitamin-d"`), `buyLabel`, `bestSeller` (true shows it under "Our best sellers" on the home page; see About you and the Learn library), and `added` (`YYYY-MM-DD`, used by the Newest sort). Featured order is list order.
4. Photos: put a square image (about 800 x 800 px, under 200 KB) in `images/products/`, then set `image: "images/products/name.jpg"`. Without a photo, a category-coloured tile with the product's initials is shown.
5. `nutrients` links a product to a check-in. The product page then shows that nutrient's "Before you supplement" caution above the Buy button, plus a "Take the check-in" button. A matching result of 5/10 or more also shows **See <nutrient> in the Supl shop** in its shopping section, above "Food comes first".
6. Amazon links (`amazon.in` / `amzn.to`) get `rel="sponsored"`, a "Buy on Amazon" label and the Associate disclosure automatically. Other links are labelled "Buy now".
7. Shop filter groups live in `S.shop.categories` in the same file. They are separate from the check-in categories, so you can add shop-only groups such as protein without touching the quizzes.
8. Delete the six starter products (`sample: true`, badged "Example") before launch. They warn in the console and validator until removed.
9. Save, run `node tests/validate-data.js`, and redeploy. The validator rejects duplicate ids, unknown categories or nutrients, non-numeric prices, an MRP below the price, non-https links and missing photo files.

Keep product text factual. Do not claim a product treats, cures or prevents a condition: Indian food-safety rules restrict health claims for nutraceuticals, and Supl's own content is awareness only.

## About you and the Learn library

**Best sellers.** The home page shows "Our best sellers" (four products) followed by "Shop all products". Set `bestSeller: true` on a product in `data/products.js` once you know it sells best. Until any product is ticked, the first four products are shown. Only tick products that genuinely sell best: calling something a best seller when it isn't can be a misleading claim under consumer-protection law.

**About you.** Before the first check-in (and from "Change" under the quiz or the check-in hub) people answer: sex at birth (Female / Male / Prefer not to say), an age group (18–29, 30–44, 45–59, 60–74, 75 and over; "Under 18" is politely turned away), and for women whether they are pregnant or breastfeeding (a note says the check isn't designed for that, but they can continue) and whether they have been through menopause. The answers live in memory only (cleared on refresh). They do three things:
- **Pick the questions.** A question can carry `audience: "female"` or `audience: "other"` (men and "prefer not to say"). Every profile still sees exactly ten questions per check-in (the validator checks both). Iron shows heavy periods to women and a regular-painkiller question to everyone else.
- **Add automatic factors to the score.** A nutrient can set `ageWeight` (1–3) and/or `menopauseWeight` (women only). Age maps the group to an answer of 1–5 (18–29 = 1 … 75+ = 5). Menopause is 5 for yes and 1 for no. They appear in "What raised your score most" as "Age" and "After menopause". Same-number answers therefore give 1, 3, 6, 8, 10 only for nutrients without these factors.
- **Personalise the daily reference.** The result page shows "For a woman aged 30–44: 18 mg a day." from the Learn tables.

If a signed-in user saves a check-in, the sex, age group and (for women) menopause are saved with it (not pregnancy). Run the updated `backend/supabase-setup.sql` once more on an existing Supabase project to add those columns.

**Learn library (`#/learn`).** The third menu item opens a list of all nutrients; each opens a guide: what it is, what it does, key facts, a daily-reference table by age and sex (your row highlighted), best food sources with amounts and vegetarian markers, common Indian foods, who is at risk, signs of low levels, too much, medicines that interact, how it is measured and the sources. The result page links to it instead of listing government sites. The style is deliberately softer and more rounded than the rest of the site.
- **Where:** `data/learn.js`, one entry per nutrient id (the field list is at the top of the file). It was written in plain language from the NIH Office of Dietary Supplements fact sheets (WHO for sodium); the numbers are copied from them.
- **Safety net:** the validator requires an entry for every nutrient and checks that every figure in the reference table also appears in the nutrient's `typicalIntake`, that upper limits agree with `upperLimitNote`, that every adult age group and sex has a table row, and that nothing tells the reader they are deficient.
- **Adding a nutrient** therefore also needs a Learn entry. Qualitative "Common in Indian kitchens" lists carry no amounts: have them reviewed.
- Values are US/WHO references, not reconciled with ICMR-NIN guidance.

## Animations

Chosen by the owner on 22 October 2026 from live demos (codes refer to those demos). All are plain CSS plus a little JavaScript (the "Motion" block in `js/app.js` and the end of `css/styles.css`), with no libraries.

| Code | Where | What happens |
| --- | --- | --- |
| 1A | Home and check-in hub | The category circles pop in one after another, then bob gently. |
| 2D | Category, nutrient, product, shop banner, Learn and key-fact cards | Cards grow in, in turn (70 ms apart, at most 8 steps). |
| 3D | Quiz | The tapped answer tile wobbles like jelly; the next question appears after `advanceDelayMs` (420 ms) so the wobble can be seen. |
| 4A | Result | The big number counts up while the ten meter segments fill one by one; the band label then stamps in. |
| 5A–5D | Every change of screen (not between questions of one check-in) | One of four, picked at random and never the same twice in a row: **5A push** (old screen slides left and fades, new one slides in from the right), **5B fade and zoom**, **5C sheet** (new screen rises from below over the old one), **5D colour wipe** (a sweep in the destination's colour). The leaving screen is shown as a frozen, non-interactive copy (`.screen-ghost`) while the new screen is already in place underneath for focus and screen readers. Owner's change on 22 October 2026: the wipe alone felt repetitive. |
| 6D | Learn lists, food chips, reference tables, highlights, account lists | Lines slide in from the left, in turn, as the list scrolls into view. |
| 7A | Cards, buttons and chips, with a mouse | They lift 3 px onto a solid ink block and press back down when clicked. Not shown on touch screens. |

Safety rules built in:
- **Reduced motion:** a visitor whose device asks for reduced motion sees none of this. Content appears instantly, the score shows its final value, and the quiz advances after 250 ms.
- **Score count-up:** only the visible digits animate. The screen-reader text ("Score 7 out of 10") and the meter's values are correct from the first moment.
- **Hidden lists:** a list is hidden for its reveal only after the browser reports it is fully below the screen, so content can never get stuck invisible.
- **Leaving a result mid-count:** the count-up is cancelled when you leave the result.
- **Testing tip:** for automated checks, read `.score .sr-only` (or wait for the count) rather than the big number.

## Icons

Icons are hand-drawn inline SVG line icons in `js/icons.js`: no image files, no icon service and no external requests, so they work offline and from `file://`. They inherit the text colour.

- Categories, nutrients, shop categories and products take an optional `icon` field, e.g. `icon: "sun"`. Available names: check, bag, retake, home, grid, stethoscope, book, sort, info, lock, chart, flask, tag, leaf, capsule, crystal, ingot, drop, bottle, sun, fish, bowl, almond, milk, shield, potato, salt.
- A product without a photo shows its own `icon`, else its first linked nutrient's icon, else its shop category's icon, else a bottle.
- To add an icon, add a new key to `S.icons` with SVG shapes drawn on a 24 × 24 grid (strokes only, matching the existing ones). The validator rejects icon names that don't exist.
- By design there are no icons on the 1–5 answer tiles, so no answer looks "better" than another.

## How to edit affiliate links

1. Open **`data/affiliate-links.js`**. This is the only file containing shopping links and the Associate disclosure.
2. Under `links`, find the nutrient id, such as `"vitamin-b12"`.
3. Replace `YOUR-TAG-21` with your Amazon India Associate tag, or replace the whole URL with your real tagged link. Use HTTPS Amazon India links or an Amazon short link.
4. Keep one to three `{ label, url }` objects per nutrient. Use neutral labels, with no product-specific health claims.
5. Keep potassium and sodium links limited to generic **electrolyte drink mix** searches. Do not use salt-tablet or potassium-pill links. Retain their caution copy.
6. Save, run the validator, and redeploy. A missing nutrient entry only warns; its shopping section is omitted. Placeholder tags also warn in the browser console and validator.

Links appear only when the score is at least `config.affiliateMinScore` (default 5 out of 10) and valid links exist. The shopping section sits above “Start with understanding / Food comes first,” after the clinical callout and score limitations. Links open a new tab with `rel="sponsored noopener noreferrer"`. The disclosure is directly below the buttons, and any upper-limit caution is immediately above them. Shopping links do not influence scores.

“Admin-only” means the owner changes the source file and redeploys. All client code is publicly readable. There is no pretend password gate. A real admin panel needs a backend, authentication and authorization, and is a future option.

## Nutrients and sections (expanded 23 October 2026)

The owner asked for 2–4 more nutrients per section and a fifth section. There are now **5 sections, 19 check-ins and 190 questions**:

| Section | Check-ins |
| --- | --- |
| Vitamins | B12, D, B6, **folate, vitamin C, vitamin A** |
| Minerals | Magnesium, calcium, **iodine, selenium** |
| Metals | Iron, zinc, **copper** |
| Electrolytes | Potassium, sodium, **phosphorus** |
| **Essentials** (new, lavender `#c9b8f5` / `#f7f4fe`) | **Omega-3, choline, fibre** |

Decisions:
- **Essentials** holds nutrients that aren't vitamins or minerals. The owner chose omega-3 and asked for two more; choline and fibre were picked because both have official intake references (omega-6 was rejected: shortfalls are essentially unheard of). Thiamin (B1) was offered as optional and left out; it can be added the same way.
- **Sources.** Every number, risk group and symptom comes from the NIH ODS health-professional fact sheets (WHO Healthy diet for fibre), read on 23 October 2026. Items not named by the source are flagged in `MEDICAL-REVIEW.md` (for example vitamin A dry skin, copper "anaemia not helped by iron", the omega-3 low-fat and plant-only items, fibre juice). Vitamin C has no gum question and copper no weight-loss-surgery question because the NIH pages don't name them.
- **Test-first, no Amazon link:** vitamin A, iodine, selenium, copper and phosphorus (too much is harmful or low levels are usually medical). They are in `summaryRules.testFirst`. Folate, vitamin C, omega-3, choline and fibre (psyllium search) have placeholder Amazon links.
- **No routine blood test** for omega-3, choline or fibre, so these three set their own `moderateCallout`, `highCallout` and `testContext` instead of "A blood test is the only way to confirm." Their quiz notes say the check estimates intake. The shared 1–10 interpretations still say "low levels"; for these three that reads as low intake (flagged for review).
- **Iodine never encourages salt:** the guidance says iodised salt *instead of* regular salt, with WHO's under-5 g limit.
- **Fibre** has no upper limit (`cautionLevel: "standard"`). Its Learn page lists WHO food groups instead of a gram-amount table, because WHO gives no per-food amounts and the US food-source tables were unavailable.
- No new nutrient uses `ageWeight` or sex-specific questions; all men and women see the same ten.
- New icons: sprout, citrus, carrot, wave, nut, coin, bone, softgel, egg, grain.

## How to add a nutrient

1. Copy one complete nutrient object inside a loaded `data/*.js` file's `S.nutrients.push(...)` list. Keep commas between objects.
2. Give it a new lowercase, hyphen-separated `id`. Use an existing category id. Each nutrient is listed exactly once.
3. Fill in `name`, `summary`, three to five `foodSources`, a sourced `typicalIntake`, `cautionLevel` and `upperLimitNote` (text or `null`). High-caution entries must include a caution note.
4. Write **exactly ten** questions, with globally unique question ids. Each needs `text`, `scale` (a key in `config.scales`, whose 5 labels are shown under the tiles), `topic` (a short phrase of at most 36 characters, shown in "What raised your score most"), integer `weight` 1–3, `reverse: false`, and `kind` (`symptom`, `diet`, `lifestyle`, `medical` or `background`). Phrase every question so that **5 always means more concern**. The validator rejects reversed questions, because mixing directions made answers cancel out and pushed almost every result to 5–6/10.
5. Prefer specific diet/exposure context over invented symptoms. Weights are editorial heuristics, not evidence-based likelihood ratios. Independent clinical review is required before launch.
6. Optional fields already supported by the generic renderer: `guidanceNote`, `quizNote`, `affiliateNote`, `foodSourcesLabel`, `sources: [{ label, url }]`, and, for nutrients without a routine blood test, `moderateCallout`, `highCallout` and `testContext` (replace the shared clinical-callout wording).
7. Add its affiliate entry, if desired, and a **Learn entry** in `data/learn.js` (the validator requires one). Questions meant for one group only take `audience: "female"` or `"other"`; make sure every profile still sees exactly ten. Run all tests and update `MEDICAL-REVIEW.md`.

The cards, counts, routes, quiz, results, colours and source lists update from the data. Do not add a nutrient-specific branch in `app.js` or change scoring logic.

## How to add a category

Add a new entry to `S.categories` in `data/categories.js` with `id`, `name`, a blurb of at most six words, six-digit hex `accent`, `tint`, `onAccent`, and numerical `order`. Then add nutrient objects with that category id to **any already-loaded nutrient data file**. The file names are organizational; the `category` field decides where an entry appears. No router, layout or UI edits are needed.

If you prefer a separate file for the new category, create it with the same `S.nutrients.push(...)` wrapper and register its classic script tag in `index.html` before `js/app.js`. That optional file-loading change is necessary because file URLs cannot discover/fetch new data files automatically. Data-only extension in an existing loaded file avoids even this change.

Use the validator to verify text contrast. Set `onAccent` to a colour with at least 4.5:1 contrast against `accent`; body text also needs contrast against `tint`. Keep every nutrient in one group.

## Scoring and routes

`SUPL.scoring.calculate(questions, answers, SUPL.config.bands)` returns `{ score, band, percent }`, where `band` is `low`, `moderate` or `high`.

Each of the ten quiz questions has **1–5 answer choices**. For each question, `r = (answer - 1) / 4`. (The engine still supports `reverse`, but the data never uses it: every question runs the same way.) Calculate `W = sum(weight * r) / sum(weight)`, then round and clamp `1 + 9 * W` to a **1–10 final result**. The scoring API exposes `maxAnswer` for quiz choices and `maxScore` for the result display and meter. `percent` is `round(100 * W)`, a normalized **questionnaire index**, not a percentage probability. It is deliberately not displayed. Invalid/incomplete answers throw rather than producing a misleading score. Answering every question with the same number gives 1, 3, 6, 8 or 10 (for nutrients without an age or menopause factor; with one, the About-you factor is added to the weighted average). Each final score has its own message (`config.copy.interpretations[1–10]`), and `SUPL.scoring.drivers()` names up to three answers (3 or higher) that contributed most, shown as "What raised your score most".

Bands live in `data/config.js`: **Low 1–4, Moderate 5–7, High 8–10**. Keep all three in order, without gaps or overlaps. These are editorial mappings for the ten-point result scale, not clinical thresholds. The same configuration controls interpretation and clinical-callout behavior. High caution uses the prominent callout from Moderate upward; Low never gets a doctor callout.

Routes: `#/` (shop-first home), `#/learn`, `#/learn/<nutrientId>`, `#/about-you[/<nutrientId>]`, `#/check` (check-in hub), `#/account`, `#/account/create`, `#/account/forgot`, `#/account/password`, `#/account/save/<nutrientId>`, `#/privacy`, `#/c/<categoryId>`, `#/q/<nutrientId>`, `#/r/<nutrientId>`, `#/about`, `#/shop`, `#/shop/<shopCategoryId>`, `#/shop/for/<nutrientId>`, `#/p/<productId>`. The shop sort choice lives in memory only. Unknown routes return Home. A result without complete in-memory answers returns to question 1. Refreshing clears answers. Browser history contains only route and question position, never answers. Each question gets a history entry so browser Back and the quiz Back control retain earlier selections. If the requested step is not available (for example after a refresh clears answers), the quiz rewrites the current history entry to the question it actually shows, so Back stays consistent. Auto-advance is cancelled on navigation; rapid duplicate clicks cannot skip questions.

## Test it

Install/use Node only if you want to run development checks. No package installation is needed:

```text
node tests/scoring.test.js
node tests/validate-data.js
node tests/validate-data.test.js
node tests/summary.test.js
node tests/account.test.js
```

`account.test.js` checks the account client's requests against a fake server. It is not a test against a live Supabase project.

No Node install? An installed VS Code includes a Node runtime. In Git Bash: `ELECTRON_RUN_AS_NODE=1 "$LOCALAPPDATA/Programs/Microsoft VS Code/Code.exe" tests/scoring.test.js` (same for the other files). That is how the 20 October 2026 completion pass was run.

The validator exits nonzero for bad data, including question counts, unknown categories, duplicate ids, invalid weights or missing labels. Missing affiliate entries only warn. `tests/browser-checklist.md` records visual and functional checks, including low/high paths for three nutrients, moderate callouts, history, keyboard input, and 375/430 px layouts.

## Assumptions and limitations

- **Adults 19+, general information.** US NIH ODS intake references are used consistently; sodium uses WHO's reduction guideline. They are not represented as India-specific values. Review against ICMR-NIN guidance and obtain clinical review before launch. Pregnancy, lactation, children, medical conditions and medications need separate advice; the quiz does not collect these details.
- **Unvalidated score.** The formula, weights, bands and questions were specified/created for this prototype, not validated for clinical screening. Correlated questions and general food-access proxies can distort results. No sensitivity, specificity, accuracy or individual probability is claimed. A low score cannot rule anything out.
- **Risk-factor-led questions (rebuilt 22 October 2026).** Questions come from the "groups at risk" and medication-interaction sections of the cited NIH ODS fact sheets (MedlinePlus for low blood sodium): diet pattern, medicines (e.g. acid reducers, metformin, diuretics), diagnosed conditions, age, sunlight, blood loss and fluid loss, plus a few symptoms. Weight 3 = a risk group named by the source, 2 = a supporting factor or more specific symptom, 1 = a nonspecific symptom. A person with strong symptoms but no risk factors can still score low, so the safety copy tells anyone with persistent symptoms to see a clinician regardless of score. Pregnancy, infants and children are out of scope. Purely random tapping still averages to the middle; consistent answers now spread across 1–10.
- **Testing is contextual.** The requested callout wording is retained, with an explanation that a clinician selects and interprets tests. A blood test measures a blood concentration; it is not a universal measure of body stores or dietary adequacy, particularly for calcium and magnesium.
- **Caution levels.** Magnesium is also `high`, because excessive supplements can cause harm. B12 is `standard`; its `upperLimitNote` is `null`. “Standard” is not a promise that supplements are suitable for everyone.
- **Sodium is different.** Its daily figure is a reduction limit, not an adequacy minimum. Common sodium food sources are explicitly not recommendations to increase consumption. No answer about avoiding salty food is treated as a reason to add salt. Low blood sodium involves water balance and cannot be self-managed using this score.
- **Local fonts.** A heavy local sans-serif stack keeps the promised privacy and direct-file behavior. No Google Fonts, remote assets, tracking scripts or cookies are used. Rendering varies slightly by installed fonts.
- **Privacy boundary.** Without an account, quiz answers exist only inside the app closure in this tab's memory; they are not in URLs, history state, logs, storage or requests. With an account, a check-in is sent to Supabase only when the user chooses Save after consenting (see Accounts). A static host can still record ordinary page requests, and third-party sites apply their policies after an external link is chosen. “Nothing is sent” refers to quiz answers, not normal web hosting.
- **Limited medical history.** Some questions now ask about age, diagnosed conditions and regular medicines, as named risk factors. They don't replace a clinical history, and the tool never advises changing medication.
- **Browsing taxonomy.** Metals and electrolytes are also minerals scientifically, and phosphorus is grouped with the electrolytes. These five labels are navigation groups, as requested.
- **Shop is a catalogue, not a checkout.** Products link out to wherever they are sold. Prices shown are whatever the owner enters and are not synced with the seller. The desktop layout keeps the existing 480 px column (two products per row) rather than a wide multi-column store layout.
- **Browser caching after updates.** Browsers may keep old copies of `data/*.js` for a while after you redeploy. Netlify, Vercel, Cloudflare Pages and GitHub Pages revalidate quickly. If a change doesn't appear, hard-refresh (Ctrl+Shift+R).
- **No public release.** The build is local. Placeholder Amazon tags remain intentionally. Direct `file://` browser automation was blocked by the test browser's URL policy, so that mode has a static compatibility review but no live browser test. HTTP browser tests passed.

## Roadmap

1. Clinician-led review, Indian reference localization, and a properly validated screening method before any diagnostic-performance claim.
2. More nutrients and categories through data entries; accessibility and cross-browser review with real users.
3. Accounts are built (see Accounts); next would be a live Supabase project, custom email (SMTP), and a legal review of the privacy policy.
4. A real owner admin panel with server-enforced authorization and audited publishing.
5. Optional translations and additional features after the core checks are validated. No admin panel, analytics, payments, cart, PWA or multilingual features are included.
