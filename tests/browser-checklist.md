# Browser QA

## Ten new nutrients and the Essentials section — 23 October 2026

Added folate, vitamin C, vitamin A (Vitamins); iodine, selenium (Minerals); copper (Metals); phosphorus (Electrolytes); and a new fifth section, Essentials (omega-3, choline, fibre). Tested in the in-app browser at 375 px.

- **Every new check-in, by real tile clicks** (male 30–44): all 1s → 1/10 (no callout, no Amazon), all 3s → 6/10, all 5s → 10/10. Ten distinct questions each time. Amazon section appears from 5/10 for folate, vitamin C, omega-3, choline and fibre, and never for vitamin A, iodine, selenium, copper or phosphorus.
- An early Vitamin C all-5s reading of "2" was the score count-up mid-animation. A recheck (female 45–59) read meter `aria-valuenow` 10 and showed "For a woman aged 45–59: 75 mg a day."
- **Own callouts:** fibre at 6/10 shows the gentle "Fibre has no blood test…" with the constipation detail. Omega-3 at 10/10 shows "Please talk to a doctor or dietitian… blood thinner". Vitamin C keeps the standard blood-test callout.
- **Learn:** all ten guides render with their sections, reference tables and sources, and no horizontal overflow. Fibre shows WHO food-group chips instead of a gram table.
- **Layout:** the check-in hub lists five sections (Essentials in lavender, 3 checks). The home icon row shows five circles. The Essentials page uses its tint. `#/shop/for/vitamin-a` shows the upper-limit caution.
- **Icons:** 10 new icons drawn and checked at 24 and 64 px. Carrot, nut, coin, bone, citrus and softgel were redrawn after the first look.
- No console errors.
- **Not tested:** the new nutrients with a saved account, which still has no live Supabase. Old browsers and real devices are untested as before.

## Random screen changes (5A–5D) — 22 October 2026

The owner found the colour wipe repetitive, so screen changes now rotate randomly through push, fade and zoom, sheet, and colour wipe.

- **Rotation:** 40 consecutive screen changes gave sheet 11, fade 11, wipe 10, push 8, with 0 repeats in a row. There was always exactly one frozen copy of the old screen, never a duplicate ID, and none left after 2 s.
- **Frames** (stepped by pausing the Web Animations):
  - Push: the new screen goes from 327 px to 0 while the old goes to −114 px and fades out.
  - Fade: the old screen is gone by 220 ms; the new one fades and zooms in from 160 ms.
  - Sheet: the new screen rises from 568 px; the old one fades from 60%.
  - Wipe: the old screen stays until the colour fully covers it; the new screen appears at ~250 ms.
- **Screenshots mid-motion confirmed all four.**
- **Bugs found and fixed:**
  1. The copy was positioned from main's visual box, so during rapid clicks it inherited a running transform. It now uses layout position. Verified: 95 px during rapid clicks; −805 px from a scrolled page, clipped so it doesn't cover the header.
  2. A colour curtain still sweeping from the previous change could cover the next one. Every change now cancels it.
  3. Copied cards' own animationend events removed the copy early. It now reacts only to its own animation.
  4. The copy was a cloned `<main>`, so the `main.tr-*` rules made it `position: relative` and dropped it at the bottom of the page. It is now a plain div.
- **Colours:** the copy keeps the old page's colours (e.g. iron coral) while the new page uses its own.
- **Quiz:** no transition or copy between questions 1–9 (watched via MutationObserver). Leaving question 10 for the result transitions. The score count-up and screen-reader text are unaffected (3/10, three segments).
- No console errors and no horizontal overflow. Reduced motion: no copy, curtain or transition (CSS hides `.screen-ghost`; JavaScript skips the transition).

## Animations — 22 October 2026

Owner's picks: 1A, 2D, 3D, 4A, 5D, 6D, 7A. Checked in in-app Chromium against the local server. Timing was inspected by pausing and stepping the Web Animations (the test pane throttles timers to about one per second while in the background).

- **1A:** each hero circle has `heroPop` (delays 0/120/240/360 ms) and then an endless `heroBob`.
- **2D:** cards get `growIn`, staggered 70 ms within each list and offset by 260 ms after a wipe (Learn list 260/330/400 ms). The class is removed afterwards, so the hover lift still works.
- **5D:** clicking a link to another screen runs the wipe in that screen's accent colour (yellow on home and shop). Stepped frames:
  - 0 ms: content hidden, colour off-screen left;
  - 250 ms: colour fully across, content still hidden;
  - 280 ms: content shown under full colour;
  - 400 ms: the colour leaves to the right;
  - 559 ms: the colour is gone.

  Focus is on the new heading. Question → next question in the same check-in: no wipe (checked by watching the DOM).
- **3D:** the tapped tile runs `tileJelly` (420 ms), shows as pressed, and the next question follows.
- **4A:** the result starts at "0", with no segments and the band label waiting, while `.sr-only` already reads "Score 7 out of 10" and `aria-valuenow` is 7. Recorded steps: 0/0 → 1/1 → … → 10/10, then the band stamps in. Leaving mid-count leaves no errors or stray updates.
- **6D:** on Learn (iron), the lists below the screen are hidden until reached, then their lines slide in with 90 ms steps. The list inside the closed Medicines panel is left alone. After scrolling through, 0 lines remain hidden. In a background pane where scroll reports never arrive, nothing is hidden: all 31 lines stayed visible. That was a bug in the first version, now fixed.
- **7A:** with a real mouse hover on a category card: `transform: translate(-3px, -3px)` and `box-shadow: 4px 4px 0 #111`; visually confirmed.
- **Reduced motion** (simulated via `matchMedia`):
  - no wipe, no jelly and no grow-in;
  - the quiz advances in about 250 ms;
  - the result shows 6/10 with 6 segments immediately;
  - no Learn list is ever hidden.
- No console errors. All test suites pass.

Not verified: the real OS "reduce motion" setting (the CSS fallback rules), Safari/Firefox, phones, and how smooth it feels on low-end devices.

## Best sellers, About you and Learn — 22 October 2026

In-app Chromium against the local HTTP server at 375 px, real clicks. Reference data is from the NIH ODS fact sheets (WHO for sodium) read the same day.

- **Home:** "Our best sellers." shows exactly four products (first four, none ticked), no category chips, then "Shop all products". Menu: Shop · Check-in · Learn (plus the account button when accounts are on); fits at 375 px.
- **About you:**
  - Starting any check-in without a profile redirects to About you.
  - Each validation message appears: no sex, no age, "Under 18" (turned away with advice), pregnancy and menopause unanswered for women.
  - The women-only questions show and hide with the sex choice, and the pregnancy note appears at once on "Yes".
  - Changing the profile clears earlier answers and prefills the form.
  - The quiz says "Answering as a woman aged 30–44. Change".
- **Questions by profile:** women see heavy periods, men and "prefer not to say" see the regular-painkiller question, and each sees exactly 10. A man aged 18–29 answering all 5s on B12/D/calcium scored 9/10 (age adds no risk); B6/iron/zinc/potassium/sodium scored 10/10. A man aged 75+ answering all 1s on B12 scored 2/10 with "Age" as the driver. A woman after menopause scored 2/10 on calcium with "After menopause · Age".
- **Personal reference (result and Learn):** all 135 combinations (3 sexes × 5 age groups × 9 nutrients) show a sentence and a highlighted "You" row, with no repeated amounts. A pregnant profile shows the pregnancy note on the result.
- **Regression:** 36 runs (all 9 nutrients × all-1s and all-5s, male 18–29 and a postmenopausal woman 45–59): 0 label problems, correct score messages, callouts and Learn plus shop links on every result.
- **Shop link at every score:** Vitamin D at 1/10 showed "Browse Vitamin D in the Supl shop" with no big shopping section; at 10/10 the big section sat above "Food comes first". With no matching product it says "Browse the Supl shop".
- **Learn:** the list shows 9 nutrients in 4 groups. All 9 guides rendered with every section (facts, what it does, reference table, foods with veg/non-veg markers, Indian foods, risks and signs, too much, medicines, measurement, sources), with no overflow and no "undefined". Sodium shows "Where sodium hides" instead of an amounts table. The jump bar scrolls to and opens sections, landing below the sticky bar (smooth scrolling doesn't animate in the test browser; there is an instant fallback).
- **Accounts (mock backend):** Google round trip from a result restored the result and profile, and the saved check-in carried sex, age group and menopause. Privacy page and consent version (2026-10-22) updated.
- Fixed during testing: repeated amounts in the personal reference ("1,200 mg a day; 1,200 mg a day"), ambiguous wording for "prefer not to say", and collapsible sections hiding under the sticky bar.
- **Automated:** 16 scoring, 7 summary and 11 account tests, validator and 10 new regressions (profile counts, Learn consistency, age groups, bestSeller) pass. All MEDICAL-REVIEW strings match the data.

Not verified: clinical correctness of the new questions and Learn text, real Supabase, other browsers and devices, `file://` mode. Screenshots in the test browser tile and duplicate the page, so long pages were inspected by shifting the layout.

## Question rebuild — 22 October 2026

Why: the owner saw results always between 5 and 10 with the same subtitle. Measured cause: protective questions were reversed, so answers cancelled out. Answering every question with the same number scored 5 or 6 for almost every nutrient.

What changed: all 90 questions were rewritten from the NIH ODS risk groups and medication interactions (MedlinePlus for sodium), and every question now runs the same way. Each answer has its own label, each score 1–10 has its own message, and a "What raised your score most" line was added.

In-app Chromium, local HTTP server, real clicks:
- **All 9 nutrients × answering all 1s through all 5s (45 runs):** scores were exactly 1, 3, 6, 8 and 10. Each showed its own score message. Every question showed its 5 correct labels and accessible names ("Answer 3 out of 5: …").
  - Scores 1 and 3: no callout and no shopping.
  - Score 6: the gentle callout for B12, the prominent one for the eight high-caution nutrients.
  - Scores 8 and 10: prominent callout. Shopping always sat above "Food comes first".
- **In-between scores (vitamin D, mixed answers):** 2, 4, 5, 7 and 9 each showed the matching band, message and top answers.
- The longest labels ("Under once a year", "Never / N/A") wrap under their tiles with no horizontal overflow at 375 px. The About text describes the new method.
- A fresh tab across quiz, result, shop, About and account showed no console errors. (A 403 in an older tab came from the NIH website's bot check during research, not from Supl.)
- Automated: 16 scoring tests (including "every nutrient reaches every score 1–10", "same answers give 1/3/6/8/10" and "realistic answer patterns hit all three bands"), 7 summary, 11 account, validator and regressions all pass. All 182 MEDICAL-REVIEW strings match the data.

Note: purely random, independent tapping still averages towards the middle. That is expected from any average and is honest. Consistent real-world answer patterns now spread across 1–10.

Not verified: clinical validity of the new questions and weights (needs the clinical reviewer), other browsers and devices, file:// mode.

## Shop-first home and accounts — 21 October 2026

In-app Chromium, local HTTP server, 375 px. Accounts were exercised against `tests/mock.html` (an in-memory stand-in with the same interface as `js/account.js`), **not a live Supabase project**.

**Real `index.html` (accounts off, the current state)**
- Home is shop-first: hero "Supplements, made clearer", the shop chips and 4 featured products, Shop all, then "Not sure? Check first." with the four check-in categories.
- Nav order: Shop · Check-in, with the account button hidden. `#/check` shows the check-in hub; the category back link returns to `#/check`.
- `#/account` says accounts aren't switched on yet. Results have no save panel. `#/privacy` renders. `localStorage` stayed empty. No overflow, no console errors.

**Mock accounts (`tests/mock.html`)**
- A Vitamin D 10/10 result showed the save panel after guidance and before the actions.
- Sign in to save: a wrong password gave a friendly error; the correct password returned to the same result. Saving without ticking consent was refused with a message; with consent it saved, then showed "Saved" and View my check-ins.
- Saved magnesium 10, iron 10, zinc 6 and calcium 1 (the consent box was not shown again). Retake cleared the saved state.
- Summary listed Iron (get tested first, no shop link), Magnesium and Vitamin D (shop links), and Zinc 6 (no shop products, so no link). It showed the multivitamin note (4 areas), with calcium under Lower scores. History listed 5 items.
- Deleting one check-in left 4. Export returned the account, profile and 4 check-ins. The withdraw confirmation step led to "Nothing saved yet" and saving off. Sign-out reset the nav to "Sign in".
- Google round trip from a B12 5/10 result: the page left and returned, the one-time code was removed from the URL, the parked answers were restored and removed from sessionStorage, and the new Google user saw the consent box. Google users get no Change password option.
- Create account:
  - a short password, a missing 18+ tick, an existing email and an invalid email each gave a clear message;
  - a normal email showed "confirm your email";
  - an "instant" email signed in straight away.
- Change password: a mismatch was caught, then the update succeeded. Delete account went through its confirmation step, led to "Account deleted", and the user was removed. Forgot password showed a neutral "if an account exists" message.
- An invalid or expired link showed "That didn't work" with a sign-in button, and the code was stripped from the URL.
- Fixed during testing: the "Check-in" nav label wrapped when the account button appeared (nav text icons are now hidden under 420 px), and the signed-in account icon was invisible on the account page.

**Automated:** 11 scoring, 7 summary and 11 account-client tests pass (fake fetch: request shapes, PKCE S256, token refresh, sign-out on refresh failure, consent upsert, RPCs, friendly errors). The validator now rejects a pasted service_role/secret key, a half-configured backend, a non-https URL and invalid summary rules.

**Not verified:** a live Supabase project, `backend/supabase-setup.sql` executed on Postgres, real Google OAuth, real email delivery, file:// mode, other browsers and devices.

## Icons added — 21 October 2026

In-app Chromium against the local HTTP server at 375 px.

- Home: a row of four category icons (capsule, crystal, ingot, drop) on the category colours. Category cards and the shop banner show a circular icon badge. Header Check-in / Shop and the footer About link have icons.
- Nutrient cards show their own icons: fish, sun, chickpea bowl, almond, milk, leaf, shield, potato, salt shaker. The banana was replaced because at small size it read as a moon, then as a phone handset.
- Shop: icons on the chips and the sort label. Product placeholders show the product, nutrient or category icon (the electrolyte mix uses a drop rather than the potassium potato).
- Result page: stethoscope in the doctor callout, a capsule on "Before you supplement", a bag on the Amazon button, the nutrient icon on "See … in the Supl shop", chart and leaf on the guidance headings, a book on References, plus retake, grid and home icons on the actions. About section headings have icons.
- Answer tiles: 0 icons (intentional). No horizontal overflow on home, category, quiz, shop, product and About. No console errors.
- Validator rejects an unknown icon name. All scoring, validator and regression checks pass.
- Note: the local Python server let the browser reuse cached data files, so new `icon` fields didn't appear until a cache-bypassing reload. Missing icons fell back gracefully (no errors).

## Shop added — 21 October 2026

In-app Chromium against the local HTTP server, at 375 px and at desktop width.

- The header shows Check-in / Shop with `aria-current` on the active section. Home shows the shop card (6 products) below the category grid.
- `#/shop`: 6 example products in a 2-column grid with a badge, the size, the price and a struck-through MRP with "% off". The sort menu gave correct orders for low to high (299...549), high to low, Newest (D3 first, multivitamin last) and Featured. Sorting re-renders only the grid.
- The Minerals chip showed only magnesium and calcium, marked the chip current, and switched to the green theme colour.
- `#/p/example-electrolyte-mix`: shows the price "₹299 was ₹349 14% off" plus both the potassium and sodium cautions, then Buy on Amazon (`_blank`, `sponsored noopener noreferrer`), then one disclosure directly below. Check-in buttons go to potassium and sodium.
- `#/shop/for/magnesium` lists magnesium with its caution. `#/shop/for/iron` shows the empty state. An unknown product, an unknown shop category and an unknown nutrient filter each returned Home.
- Results: Magnesium 10/10 and Sodium 6/10 showed the Amazon button plus "See ... in the Supl shop", with the disclosure last and the whole section above "Food comes first". Vitamin B6 6/10 (no shop product) showed only Amazon. Magnesium 1/10 showed no shopping section.
- No horizontal overflow at 375 px on home, shop and product. At desktop width the column stays at 480 px. No console errors.
- Validator rejects a duplicate product, an unknown shop category, a non-numeric price, an MRP below the price, a non-https buy link, an unknown nutrient, an image path outside the site and a missing image file.

Not covered: a real product photo (no images supplied yet), `file://` mode, other browsers and devices.

## v1 completion pass — 20 October 2026

Chromium-based in-app browser against the local HTTP server, driven by real clicks on the rendered tiles. Node checks ran on Node 24 (VS Code's bundled runtime with `ELECTRON_RUN_AS_NODE=1`; no Node install or packages).

- **All nine nutrients** completed at Low, Moderate (all 3s) and High: 27 runs. Each question had exactly five tiles. Results were 1/10 Low, 6/10 Moderate and 10/10 High, with ten meter segments filled to the score.
- Low: no doctor callout and no shopping section. Moderate: B12 showed the gentle line; all eight high-caution nutrients showed the prominent callout. High: prominent callout everywhere.
- Every shopping section sat above “Start with understanding / Food comes first”. Each upper-limit caution was immediately above its buttons, and the disclosure immediately below. All links used `_blank` and `sponsored noopener noreferrer`. When shopping was hidden, the caution still appeared once (after guidance). No result text contained “deficient” or “you lack”.
- **Fixed:** refreshing mid-quiz cleared the answers but kept the old question number in history, so a later quiz Back could stall on the same question. The quiz now rewrites its history entry to the question it actually shows. Verified: answered 3 iron questions, reloaded (question 1, history step 0), answered once, and quiz Back returned to question 1 with its answer kept.
- **Fixed:** the big score used `aria-label` on a paragraph (not reliably announced). It now has visually hidden text, “Score N out of 10”, and the visible number is hidden from assistive technology. Appearance unchanged (screenshot checked at 375 px).
- Card labels are now generated from the data (`01 … 04`, `01 / 10 questions`) instead of hard-coded.
- Keyboard Enter on a focused tile selected it and advanced. The heading received focus, and the live region announced “Question 2 of 10…”.
- Result deep link without answers → question 1. Unknown and malformed routes → Home. About rendered.
- `localStorage`, `sessionStorage` and cookies were empty. The only network requests were the local CSS/JS/data files plus an inline `data:` texture.
- No horizontal overflow at 375 px or 430 px (home, quiz, result, About). Theme colour followed the category.
- Console: no errors, only the nine expected placeholder-tag warnings per page load.
- The data/medical inventory sync check passed: all 182 intake, caution, guidance, food, question and source strings in the data appear verbatim in `MEDICAL-REVIEW.md`.

Not covered in this pass: `file://` double-click mode (the in-app browser cannot open file URLs), the 1280 px desktop column, Safari/Firefox, physical phones, a real screen reader and the OS reduced-motion setting.

## Corrected scales verified — 20 October 2026

- Each of the ten questions now has five answer tiles (1–5), matching its visible scale, endpoint labels and accessible button labels. The final result uses a 1–10 score, ten meter segments and an accessible maximum of 10.
- Magnesium, vitamin B12 and sodium each completed at 1/10 (Low) and 10/10 (High). Every question in these runs had exactly five choices. Low results omitted the doctor callout and shopping section; High results displayed both.
- Magnesium and vitamin B12 also completed at 6/10 (Moderate) using all 3s. Magnesium displayed the prominent clinical callout; B12 displayed the gentle line.
- Every tested shopping section remained above “Start with understanding / Food comes first.” Magnesium and sodium cautions remained immediately above their Amazon buttons. Sodium linked only to a generic electrolyte drink mix search.
- Affiliate links retained `_blank`, `sponsored noopener noreferrer`, and disclosure directly below the buttons.
- Browser Back and quiz Back retained an answer of 3; keyboard Enter selected it and advanced. Retake allowed new answers; reloading the sodium result returned to question 1.
- About explains the 1–5 input scale, 1–10 result scale and Low 1–4 / Moderate 5–7 / High 8–10 bands.
- No horizontal overflow at 375 px and no browser console errors. Saved `supl-quiz-scale.png` and `supl-result-scale.png`.
- All 11 scoring tests, the data validator and validator regression checks passed. Tests cover every reachable final score, all band boundaries, rejection of answers above 5 and rejection of five-point result bands.

## Earlier update — 20 October 2026 (scales superseded)

- Results now use five meter segments and a 1–5 score, including the visible denominator, accessible meter maximum, live announcement and About explanation. Quiz inputs remain 1–10.
- Iron completed at 1/5 (Low), 3/5 (Moderate) and 5/5 (High). Low hid shopping links and the doctor callout; Moderate and High displayed the prominent clinical callout.
- Vitamin B12 completed at 3/5 (Moderate), with the gentle clinical callout.
- In every tested result with links, the whole affiliate section was above “Start with understanding / Food comes first.” Iron's upper-limit caution stayed immediately above its Amazon button.
- Links still use `_blank` and `sponsored noopener noreferrer`. The disclosure remains directly below the buttons.
- No horizontal overflow at 375 px and no browser console errors. Saved the shopping/guidance layout in `supl-result-update.png`.
- All scoring tests and data validation passed, including rejection of old ten-point result bands and affiliate thresholds above five.

## Original build verification — 19 October 2026

Verified in the available Chromium-based in-app browser against the local static HTTP server. The app uses no build tools or test packages.

The results below describe the original version with ten answer choices and ten-point results. Current quiz answers use 1–5, and shopping appears above food guidance.

### Completed checks

- Home, all four category routes, all nine quiz routes and About rendered.
- All nine result deep links without answers redirected to their own question 1.
- Unknown route returned Home.
- Vitamin B12, magnesium and sodium each completed with low (1/10) and high (10/10) answers. Low: zero affiliate buttons, zero doctor callouts. High: one affiliate button and one prominent doctor callout.
- Vitamin B12 Moderate (6/10): gentle blood-test line, affiliate button visible.
- Iron Moderate (6/10): prominent doctor callout, affiliate button visible.
- High sodium: generic electrolyte-drink-mix search only; sodium and potassium caution text visible; caution directly before buttons.
- Affiliate links: `_blank` and `sponsored noopener noreferrer`; no shopping links clicked during testing.
- Retake cleared previous answers; high results could be replaced by low results and vice versa.
- Browser Back returned to question 1 with its previous answer selected. Quiz Back also retained a keyboard-entered answer of 7.
- Keyboard Enter selected an answer and advanced. Question heading received focus; the live region changed.
- Reloading a completed sodium result cleared answers and returned to sodium question 1.
- At 375, 430 and 1280 px: no horizontal overflow, ten tiles, desktop column capped at 480 px. The 375 px browser had a vertical scrollbar; tile size was 56 × 60 px. Larger layouts exceeded the minimum.
- Category meta theme colour changed, including electrolyte blue `#91bafa`.
- No browser console errors. Nine expected placeholder-tag warnings.
- Home, quiz and results visually inspected. Mobile home screenshot saved as `supl-mobile.png`.
- Automated colour validation: accent/body text contrast Vitamins 14.69:1, Minerals 13.31:1, Metals 6.97:1, Electrolytes 9.54:1. Muted text against every tint exceeded 4.5:1.

## Reproduce manually

1. Open `index.html` or serve the folder. Resize to 375 px.
2. Choose any nutrient. Answering the same number to every question gives: all 1s → 1/10, all 2s → 3/10, all 3s → 6/10, all 4s → 8/10, all 5s → 10/10 (questions rebuilt 22 October 2026; older sequences below are superseded).
3. Mix answers to reach the in-between scores. Check that each score shows its own message and the "What raised your score most" line.
4. For a moderate result, answer 3 for every question (6/10). Compare the B12 and magnesium clinical callouts and confirm shopping appears above food guidance.
5. Use both Back controls, keyboard input, Retake, Pick another nutrient and Home. Refresh a result and confirm it cannot survive without answers.
6. Check `#/about`, a malformed route, all categories, and direct result URLs. Change viewport to 430 px and desktop.
7. With browser developer tools, confirm there are no outbound answer requests, no storage entries, clear focus rings and no animation under reduced-motion preference.

## Verification limits

The browser tool forbids `file://` URLs. This was not bypassed. File-mode compatibility was checked structurally (relative assets, classic scripts, no modules, fetch or local JSON); double-click mode still needs a live check in the owner's normal browser. Safari, Firefox, a physical mobile device, an actual screen reader and the OS reduced-motion setting were not live-tested. No public static-host deployment or real affiliate attribution was tested. These checks verify implementation behavior, not medical validity.
