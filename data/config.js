(function (root) {
  "use strict";
  var S = root.SUPL = root.SUPL || {};
  S.nutrients = S.nutrients || [];
  S.config = {
    // Result bands cover 1–10. Individual quiz answers use 1–5.
    bands: [
      { id: "low", label: "Low", min: 1, max: 4 },
      { id: "moderate", label: "Moderate", min: 5, max: 7 },
      { id: "high", label: "High", min: 8, max: 10 }
    ],
    // Every check-in shows exactly this many questions (the validator checks it for every profile).
    questionsPerCheck: 10,
    // "About you" age groups (adults only). Their order matches the automatic age factor: 1st = lowest concern.
    ageGroups: [
      { id: "18-29", label: "18–29", min: 18, max: 29 },
      { id: "30-44", label: "30–44", min: 30, max: 44 },
      { id: "45-59", label: "45–59", min: 45, max: 59 },
      { id: "60-74", label: "60–74", min: 60, max: 74 },
      { id: "75-plus", label: "75 and over", min: 75, max: 120 }
    ],
    affiliateMinScore: 5,
    // Long enough for the chosen tile's jelly wobble to be seen (250 ms when reduced motion is on).
    advanceDelayMs: 420,
    // Answer scales. Every question runs the same way: the first label (1) is no concern,
    // the last label (5) is the most concern. Each question names one scale.
    scales: {
      often: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
      oftenNA: ["Never / N/A", "Rarely", "Sometimes", "Often", "Always"],
      days: ["Never", "Rarely", "Some days", "Most days", "Every day"],
      share: ["None", "A little", "About half", "Most", "All"],
      yesno: ["No", "Probably not", "Not sure", "Probably", "Yes"],
      tone: ["Very light", "Light", "Medium", "Dark", "Very dark"],
      variety: ["Very varied", "Varied", "Somewhat", "Limited", "Very limited"],
      donate: ["Never", "Under once a year", "Once a year", "2–3 a year", "4+ a year"]
    },
    copy: {
      tagline: "Quick supplement risk check.",
      disclaimer: "For awareness only. Not a diagnosis or medical advice.",
      limitation: "This questionnaire cannot measure nutrient levels. Its score is unvalidated, not a clinical probability. A low score cannot rule out low levels.",
      moderateCallout: "A blood test is the only way to confirm.",
      highCallout: "Please see a doctor or get a blood test before starting any supplement.",
      testContext: "A clinician can decide which tests are useful and interpret them with your symptoms and diet. Blood tests do not always reflect the body's nutrient stores.",
      reference: "General healthy-adult daily reference, not a supplement dose. Needs vary by age and life stage. Upper limits are not intake targets.",
      safety: "If symptoms persist or worry you, speak to a clinician regardless of your score. For severe or sudden symptoms, seek urgent medical care.",
      // One message per final score. Bands (above) still decide callouts and shopping links.
      interpretations: {
        1: "Your answers don’t match the usual risk factors for low levels. That can’t rule them out, but nothing here stands out.",
        2: "Your answers match very few of the usual risk factors for low levels. A low score can’t rule them out.",
        3: "Your answers match a few minor risk factors. Overall that suggests a lower likelihood of low levels, though it can’t rule them out.",
        4: "Some of your answers match common risk factors, but most don’t. That suggests a lower likelihood of low levels; keep an eye on any symptoms that persist.",
        5: "Your answers show a mix of risk factors. That suggests a possible higher likelihood of low levels; a clinical assessment can help.",
        6: "Several of your answers match common risk factors. That suggests a possible higher likelihood of low levels; a clinical assessment can help.",
        7: "Many of your answers match common risk factors. That suggests a higher likelihood of low levels that is worth discussing with a clinician.",
        8: "Most of your answers match common risk factors. That suggests a higher likelihood of low levels; a clinical assessment is the next step.",
        9: "Nearly all of your answers match common risk factors. That suggests a higher likelihood of low levels; please arrange a clinical assessment.",
        10: "Your answers match the common risk factors very strongly. That suggests a higher likelihood of low levels; please see a clinician before considering any supplement."
      },
      aboutYou: {
        intro: "Needs differ by sex and age, and some questions depend on them. This stays in this tab only: it is not saved unless you choose to save a check-in.",
        pregnancy: "This check isn’t designed for pregnancy or breastfeeding, when needs change. Please talk to your clinician about supplements. You can continue to learn, but the result won’t reflect pregnancy.",
        under18: "Supl is designed for adults aged 18 and over. For anyone younger, please talk to a doctor or other clinician about nutrition and supplements."
      },
      driversIntro: "What raised your score most:",
      driversNone: "None of your answers raised the score much."
    }
  };
}(typeof window !== "undefined" ? window : globalThis));
