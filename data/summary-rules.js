// OWNER / CLINICAL REVIEWER: rules for the "Your summary" panel on the account page.
// The summary never prescribes, never gives doses and never says someone is deficient.
// It lists the user's most recent saved check-ins and points to existing shop sections.
(function (S) {
  "use strict";
  S.summaryRules = {
    // Areas at or above this latest score are listed as "worth a closer look".
    minScore: 5,
    // Check-ins older than this are ignored, so the summary reflects recent answers.
    maxAgeDays: 180,
    // Nutrients where self-supplementing is riskier: the summary says "get tested first"
    // and shows no shop link, whatever the score.
    testFirst: ["iron", "vitamin-a", "iodine", "selenium", "copper", "phosphorus"],
    // When this many areas qualify, also offer general multivitamin browsing.
    multivitamin: { minAreas: 3, shopCategory: "everyday" }
  };
}(window.SUPL));
