(function (S) {
  "use strict";
  S.nutrients.push({
    id: "potassium", name: "Potassium", icon: "potato", category: "electrolytes",
    summary: "Potassium helps your nerves, muscles and fluid balance work normally.",
    foodSources: ["Potatoes", "Lentils", "Kidney beans", "Bananas", "Yogurt"],
    typicalIntake: "US adequate intake (AI): adult men 19+, 3,400 mg/day; adult women 19+, 2,600 mg/day. An AI is a population reference, not a supplement dose.",
    cautionLevel: "high",
    upperLimitNote: "No US upper limit has been established for potassium in healthy adults. That does not mean unlimited amounts are safe. Potassium supplements are not suitable for everyone, particularly with kidney problems or some medicines; excess can dangerously affect the heart.",
    guidanceNote: "A low dietary intake is different from a low blood potassium level. Fluid losses can matter. Most people already get enough sodium from food; this result is not a reason to add salt or use an electrolyte mix. Ask a clinician before supplementing.",
    quizNote: "Fluid loss and cramps have many causes. This quiz cannot identify an electrolyte imbalance.",
    affiliateNote: "Optional browsing, not a recommendation to use a product. Drink mixes vary in sodium and potassium; a clinician can advise whether one is suitable.",
    sources: [{ label: "NIH ODS · Potassium", url: "https://ods.od.nih.gov/factsheets/Potassium-Consumer/" }, { label: "WHO · Sodium reduction", url: "https://www.who.int/news-room/fact-sheets/detail/salt-reduction" }],
    questions: [
      { id: "k-ibd", text: "Have you been diagnosed with Crohn’s disease or ulcerative colitis?", scale: "yesno", topic: "Inflammatory bowel disease", weight: 3, reverse: false, kind: "medical" },
      { id: "k-diuretic", text: "How often do you take water tablets (diuretics), such as furosemide or hydrochlorothiazide?", scale: "days", topic: "Water tablets", weight: 3, reverse: false, kind: "medical" },
      { id: "k-laxative", text: "How often do you take laxatives?", scale: "often", topic: "Laxatives", weight: 2, reverse: false, kind: "medical" },
      { id: "k-loss", text: "How often have you had vomiting or watery diarrhoea in recent weeks?", scale: "often", topic: "Vomiting or diarrhoea", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "k-produce", text: "How often do you go a whole day without fruit or vegetables?", scale: "days", topic: "Days without fruit or veg", weight: 2, reverse: false, kind: "diet" },
      { id: "k-beans", text: "How often do you go a whole day without beans, lentils, potatoes or yogurt?", scale: "days", topic: "Days without other potassium foods", weight: 1, reverse: false, kind: "diet" },
      { id: "k-sweat", text: "How often do you sweat heavily for a long time?", scale: "often", topic: "Heavy sweating", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "k-weak", text: "How often do your muscles feel weaker than usual?", scale: "often", topic: "Muscle weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "k-cramps", text: "How often do you get muscle cramps?", scale: "often", topic: "Muscle cramps", weight: 1, reverse: false, kind: "symptom" },
      { id: "k-bowel", text: "How often are your bowel movements harder to pass than usual?", scale: "often", topic: "Constipation", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "sodium", name: "Sodium", icon: "salt", category: "electrolytes",
    summary: "Sodium helps regulate fluid balance and supports nerves and muscles.",
    foodSources: ["Bread", "Cheese", "Packaged soups", "Pickles", "Table salt already used in cooking"],
    foodSourcesLabel: "Common sources — not foods to increase",
    typicalIntake: "WHO adult reduction guideline: less than 2,000 mg sodium/day, equivalent to less than 5 g salt/day from all sources. This is a limit to stay below, not a minimum or a supplementation target.",
    cautionLevel: "high",
    upperLimitNote: "Most people already get enough sodium from food, often too much. Excess sodium raises blood pressure. Do not add salt or take salt tablets because of this score. Potassium-containing electrolyte supplements are not suitable for everyone.",
    guidanceNote: "Low blood sodium is a water-balance issue, not simply a sign of eating too little salt. Heavy sweating, fluid loss or excessive water intake can matter, but this quiz cannot distinguish them. Never use this result to guide salt supplementation.",
    quizNote: "Most people already get enough sodium. These questions explore fluid loss, medicines, health conditions and nonspecific symptoms, not a need for more salt.",
    affiliateNote: "Optional browsing only. A drink mix is not a treatment for low blood sodium. Ask a clinician whether any electrolyte product is appropriate.",
    sources: [{ label: "WHO · Sodium reduction", url: "https://www.who.int/news-room/fact-sheets/detail/salt-reduction" }, { label: "NHS · Salt in your diet", url: "https://www.nhs.uk/live-well/eat-well/food-types/salt-in-your-diet/" }, { label: "MedlinePlus · Low blood sodium", url: "https://medlineplus.gov/ency/article/000394.htm" }],
    questions: [
      { id: "na-water", text: "During long, sweaty activity, how often do you drink large amounts of plain water beyond your thirst?", scale: "oftenNA", topic: "Drinking beyond thirst", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "na-sweat", text: "How often do you sweat heavily for a long time?", scale: "often", topic: "Heavy sweating", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "na-loss", text: "How often have you had vomiting or watery diarrhoea in recent weeks?", scale: "often", topic: "Vomiting or diarrhoea", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "na-diuretic", text: "How often do you take water tablets (diuretics), such as hydrochlorothiazide or furosemide?", scale: "days", topic: "Water tablets", weight: 3, reverse: false, kind: "medical" },
      { id: "na-condition", text: "Have you been diagnosed with heart failure, kidney disease or liver cirrhosis?", scale: "yesno", topic: "Heart, kidney or liver condition", weight: 3, reverse: false, kind: "medical" },
      { id: "na-headache", text: "How often do you get headaches?", scale: "often", topic: "Headaches", weight: 1, reverse: false, kind: "symptom" },
      { id: "na-appetite", text: "How often do you lose your appetite or feel sick to your stomach?", scale: "often", topic: "Poor appetite or nausea", weight: 1, reverse: false, kind: "symptom" },
      { id: "na-cramps", text: "How often do you get muscle cramps, spasms or weakness?", scale: "often", topic: "Muscle cramps or weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "na-confused", text: "How often do you feel confused, restless or unusually irritable?", scale: "often", topic: "Confusion or irritability", weight: 1, reverse: false, kind: "symptom" },
      { id: "na-tired", text: "How often do you feel unusually tired?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "phosphorus", name: "Phosphorus", icon: "bone", category: "electrolytes",
    summary: "Phosphorus builds bones and teeth and helps your cells store and use energy.",
    foodSources: ["Milk, yogurt and cheese", "Lentils and kidney beans", "Fish and chicken", "Nuts such as cashews", "Brown rice and oats"],
    typicalIntake: "US RDA: 700 mg per day for adults 19+.",
    cautionLevel: "high",
    upperLimitNote: "US upper limit from all sources: 4,000 mg a day for adults 19–70 and 3,000 mg a day for adults 71+. High intakes rarely harm healthy people, but people with kidney disease often need to limit phosphorus. These limits are not targets.",
    guidanceNote: "Low phosphorus is almost never caused by diet alone; it usually comes from medical conditions, heavy drinking, long-term antacid use or severe under-eating. It needs a clinician’s assessment, not a supplement.",
    quizNote: "Low phosphorus is rarely about diet. These questions look at medicines, health conditions and periods of very low eating.",
    sources: [{ label: "NIH ODS · Phosphorus", url: "https://ods.od.nih.gov/factsheets/Phosphorus-HealthProfessional/" }],
    questions: [
      { id: "ph-antacid", text: "How often do you take antacids for heartburn or indigestion, such as aluminium hydroxide or calcium carbonate tablets?", scale: "days", topic: "Regular antacids", weight: 3, reverse: false, kind: "medical" },
      { id: "ph-alcohol", text: "How often do you drink alcohol heavily, for example 5 or more drinks in one day?", scale: "often", topic: "Heavy drinking", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "ph-undereat", text: "How often have you eaten much less than usual for a long time, for example during illness or very strict dieting?", scale: "often", topic: "Long periods of under-eating", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "ph-lowweight", text: "Has a doctor told you that your weight is too low, or have you had an eating disorder?", scale: "yesno", topic: "Low body weight", weight: 2, reverse: false, kind: "medical" },
      { id: "ph-chew", text: "How often do you have trouble chewing or swallowing food?", scale: "often", topic: "Trouble chewing or swallowing", weight: 2, reverse: false, kind: "symptom" },
      { id: "ph-condition", text: "Has a doctor told you that you have COPD, liver cirrhosis or an overactive parathyroid gland, or are you being treated for cancer?", scale: "yesno", topic: "Long-term medical condition", weight: 2, reverse: false, kind: "medical" },
      { id: "ph-protein", text: "How often do you go a whole day without dairy, meat, fish, eggs, lentils or beans?", scale: "days", topic: "Days without phosphorus foods", weight: 1, reverse: false, kind: "diet" },
      { id: "ph-weak", text: "How often do your thigh or shoulder muscles feel weaker than usual?", scale: "often", topic: "Muscle weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "ph-bones", text: "How often do you notice an ache in your bones?", scale: "often", topic: "Bone ache", weight: 1, reverse: false, kind: "symptom" },
      { id: "ph-tingle", text: "How often do you notice numbness or tingling, or feel unusually confused?", scale: "often", topic: "Tingling or confusion", weight: 1, reverse: false, kind: "symptom" }
    ]
  });
}(window.SUPL));
