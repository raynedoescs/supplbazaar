(function (S) {
  "use strict";
  S.nutrients.push({
    id: "magnesium", ageWeight: 1, name: "Magnesium", icon: "almond", category: "minerals",
    summary: "Magnesium supports your muscles, nerves and energy-making processes.",
    foodSources: ["Pumpkin seeds", "Almonds", "Spinach", "Black beans", "Whole grains"],
    typicalIntake: "US RDA: men 19–30, 400 mg/day; men 31+, 420 mg/day; women 19–30, 310 mg/day; women 31+, 320 mg/day.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 350 mg/day from supplements and medicines only, excluding magnesium naturally in food. Excess can cause diarrhoea; very high amounts can affect the heart. Kidney problems increase the risk.",
    guidanceNote: "Low intake does not necessarily mean a low blood level. Blood magnesium alone does not reliably reflect total body stores.",
    sources: [{ label: "NIH ODS · Magnesium", url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" }],
    questions: [
      { id: "mg-gut", text: "Have you been diagnosed with Crohn’s disease, coeliac disease or another condition that causes long-term diarrhoea, or had bowel surgery?", scale: "yesno", topic: "Bowel condition", weight: 3, reverse: false, kind: "medical" },
      { id: "mg-diabetes", text: "Do you have type 2 diabetes?", scale: "yesno", topic: "Type 2 diabetes", weight: 2, reverse: false, kind: "medical" },
      { id: "mg-alcohol", text: "How often do you drink alcohol heavily, for example 5 or more drinks in one day?", scale: "often", topic: "Heavy drinking", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "mg-acid", text: "How often do you take medicine for acid reflux or heartburn, such as omeprazole or pantoprazole?", scale: "days", topic: "Acid-reducing medicine", weight: 2, reverse: false, kind: "medical" },
      { id: "mg-diuretic", text: "How often do you take water tablets (diuretics), such as furosemide or hydrochlorothiazide?", scale: "days", topic: "Water tablets", weight: 2, reverse: false, kind: "medical" },
      { id: "mg-food", text: "How often do you go a whole day without nuts, seeds, beans, leafy greens or whole grains?", scale: "days", topic: "Days without magnesium foods", weight: 2, reverse: false, kind: "diet" },
      { id: "mg-tingle", text: "How often do you notice numbness or tingling in your hands or feet?", scale: "often", topic: "Numbness or tingling", weight: 1, reverse: false, kind: "symptom" },
      { id: "mg-cramps", text: "How often do you get muscle cramps or twitches?", scale: "often", topic: "Muscle cramps", weight: 1, reverse: false, kind: "symptom" },
      { id: "mg-appetite", text: "How often do you lose your appetite or feel sick to your stomach?", scale: "often", topic: "Poor appetite or nausea", weight: 1, reverse: false, kind: "symptom" },
      { id: "mg-tired", text: "How often do you feel unusually tired or weak?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "calcium", ageWeight: 1, menopauseWeight: 2, name: "Calcium", icon: "milk", category: "minerals",
    summary: "Calcium builds bones and teeth and helps muscles and nerves work.",
    foodSources: ["Milk and yogurt", "Calcium-fortified soy drink", "Calcium-set tofu", "Sardines with bones", "Kale"],
    typicalIntake: "US RDA: adults 19–50 and men 51–70, 1,000 mg/day; women 51–70 and all adults 71+, 1,200 mg/day.",
    cautionLevel: "high",
    upperLimitNote: "US upper limit from all sources: 2,500 mg/day for adults 19–50; 2,000 mg/day for adults 51+. Excess supplemental calcium may increase kidney-stone risk. These limits are not targets.",
    guidanceNote: "Low calcium intake can affect bones without obvious symptoms. Blood calcium is tightly regulated and does not measure dietary adequacy or bone stores. A clinician may need other assessments.",
    sources: [{ label: "NIH ODS · Calcium", url: "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/" }],
    questions: [
      { id: "ca-dairy", text: "How often do you go a whole day without milk, yogurt, cheese or a calcium-fortified alternative?", scale: "days", topic: "Days without dairy or alternatives", weight: 3, reverse: false, kind: "diet" },
      { id: "ca-avoid", text: "Do you avoid dairy, for example because of lactose intolerance, allergy or a vegan diet?", scale: "yesno", topic: "Avoiding dairy", weight: 2, reverse: false, kind: "diet" },
      { id: "ca-plantmilk", text: "If you drink plant milks, how often do you choose ones without added calcium?", scale: "oftenNA", topic: "Unfortified plant milk", weight: 1, reverse: false, kind: "diet" },
      { id: "ca-other", text: "How often do you go a whole day without other calcium foods, such as calcium-set tofu, ragi, kale or sardines with bones?", scale: "days", topic: "Days without other calcium foods", weight: 1, reverse: false, kind: "diet" },
      { id: "ca-bones", text: "Has a doctor told you that you have low bone density (osteopenia or osteoporosis)?", scale: "yesno", topic: "Low bone density", weight: 2, reverse: false, kind: "medical" },
      { id: "ca-indoors", text: "How often do you spend almost all daylight hours indoors? Vitamin D from sunlight helps you absorb calcium.", scale: "days", topic: "Little daylight", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "ca-tingle", text: "How often do you notice tingling in your fingers or numbness around your mouth?", scale: "often", topic: "Tingling or numbness", weight: 1, reverse: false, kind: "symptom" },
      { id: "ca-cramps", text: "How often do your muscles cramp or tighten involuntarily?", scale: "often", topic: "Muscle cramps", weight: 1, reverse: false, kind: "symptom" },
      { id: "ca-fracture", text: "Have you ever broken a bone from a minor fall or bump?", scale: "yesno", topic: "Bone broken in a minor fall", weight: 2, reverse: false, kind: "medical" },
      { id: "ca-steroid", text: "Do you take steroid tablets such as prednisolone for more than a few weeks at a time?", scale: "yesno", topic: "Long-term steroid tablets", weight: 2, reverse: false, kind: "medical" }
    ]
  }, {
    id: "iodine", name: "Iodine", icon: "wave", category: "minerals",
    summary: "Iodine is needed to make thyroid hormones, which control your metabolism.",
    foodSources: ["Iodised salt (instead of regular salt, not more)", "Milk and yogurt", "Eggs", "Fish such as cod", "Seaweed"],
    typicalIntake: "US RDA: 150 micrograms (mcg) per day for adults 19+.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 1,100 mcg a day from all sources. Too much iodine can cause the same thyroid problems as too little (goitre, an underactive or overactive thyroid). This limit is not a target.",
    guidanceNote: "If you use salt, choose iodised salt instead of regular salt; this is not a reason to use more salt. WHO advises adults to keep salt under 5 g a day. Rock salt and some sea salts are not iodised.",
    sources: [{ label: "NIH ODS · Iodine", url: "https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/" }, { label: "WHO · Salt reduction", url: "https://www.who.int/news-room/fact-sheets/detail/salt-reduction" }],
    questions: [
      { id: "io-salt", text: "How much of the salt you use at home is not iodised (for example rock salt, sea salt or pink salt)?", scale: "share", topic: "Salt without iodine", weight: 3, reverse: false, kind: "diet" },
      { id: "io-dairy", text: "How often do you go a whole day without milk, yogurt, eggs or seafood?", scale: "days", topic: "Days without iodine foods", weight: 2, reverse: false, kind: "diet" },
      { id: "io-plant", text: "How much of your diet is plant-based, without dairy, eggs or seafood?", scale: "share", topic: "Plant-based diet", weight: 2, reverse: false, kind: "diet" },
      { id: "io-region", text: "Do you live in a hilly or mountainous area, or one known for goitre?", scale: "yesno", topic: "Low-iodine area", weight: 1, reverse: false, kind: "background" },
      { id: "io-goitrogen", text: "How often do you eat large amounts of raw cabbage-family vegetables, soy or cassava?", scale: "often", topic: "Lots of soy or raw cabbage family", weight: 1, reverse: false, kind: "diet" },
      { id: "io-neck", text: "Have you noticed a swelling at the front of your neck?", scale: "yesno", topic: "Neck swelling", weight: 2, reverse: false, kind: "symptom" },
      { id: "io-thyroid", text: "Has a doctor told you that your thyroid is underactive?", scale: "yesno", topic: "Underactive thyroid", weight: 2, reverse: false, kind: "medical" },
      { id: "io-cold", text: "How often do you feel cold when others around you don’t?", scale: "often", topic: "Feeling cold", weight: 1, reverse: false, kind: "symptom" },
      { id: "io-tired", text: "How often do you feel unusually tired or sluggish?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" },
      { id: "io-skin", text: "How often is your skin unusually dry?", scale: "often", topic: "Dry skin", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "selenium", name: "Selenium", icon: "nut", category: "minerals",
    summary: "Selenium helps your thyroid work and protects cells from damage.",
    foodSources: ["Brazil nuts (very high: one or two is plenty)", "Fish such as tuna and sardines", "Eggs", "Chicken and meat", "Pasta and grains"],
    typicalIntake: "US RDA: 55 micrograms (mcg) per day for adults 19+.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 400 mcg a day from all sources. Too much causes hair and nail loss, garlic-smelling breath, a metallic taste, rashes and nerve problems. Just 1 ounce of Brazil nuts (6–8 nuts) can contain 544 mcg, more than the upper limit. This limit is not a target.",
    guidanceNote: "Selenium in plant foods depends on the soil they were grown in. Low selenium rarely causes illness on its own, and because too much is harmful, testing comes before any supplement.",
    quizNote: "Low selenium rarely causes symptoms on its own, so most of these questions are about diet and medical risk factors.",
    sources: [{ label: "NIH ODS · Selenium", url: "https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/" }],
    questions: [
      { id: "se-dialysis", text: "Are you on kidney dialysis?", scale: "yesno", topic: "Kidney dialysis", weight: 3, reverse: false, kind: "medical" },
      { id: "se-hiv", text: "Are you living with HIV?", scale: "yesno", topic: "HIV", weight: 3, reverse: false, kind: "medical" },
      { id: "se-plant", text: "How much of your diet is plant-based, without meat, fish, eggs or dairy?", scale: "share", topic: "Plant-based diet", weight: 2, reverse: false, kind: "diet" },
      { id: "se-food", text: "How often do you go a whole day without fish, seafood, eggs, meat or chicken?", scale: "days", topic: "Days without selenium foods", weight: 2, reverse: false, kind: "diet" },
      { id: "se-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "se-absorb", text: "Have you been diagnosed with a condition that affects how you absorb food, such as Crohn’s or coeliac disease?", scale: "yesno", topic: "Absorption condition", weight: 2, reverse: false, kind: "medical" },
      { id: "se-tired", text: "How often do you feel unusually tired?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" },
      { id: "se-infections", text: "How often do you catch infections such as colds or chest infections?", scale: "often", topic: "Frequent infections", weight: 1, reverse: false, kind: "symptom" },
      { id: "se-muscles", text: "How often do your muscles feel weaker than usual?", scale: "often", topic: "Muscle weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "se-joints", text: "How often do your joints feel stiff or painful?", scale: "often", topic: "Joint stiffness or pain", weight: 1, reverse: false, kind: "symptom" }
    ]
  });
}(window.SUPL));
