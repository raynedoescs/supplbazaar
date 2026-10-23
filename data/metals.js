(function (S) {
  "use strict";
  S.nutrients.push({
    id: "iron", name: "Iron", icon: "leaf", category: "metals",
    summary: "Iron helps red blood cells carry oxygen around your body.",
    foodSources: ["Lean meat", "Lentils", "White beans", "Iron-fortified cereals", "Spinach"],
    typicalIntake: "US RDA: men 19–50, 8 mg/day; women 19–50, 18 mg/day; adults 51+, 8 mg/day. These are mixed-diet references; iron from plant foods is less readily absorbed.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 45 mg/day from all sources. Excess iron can cause serious harm; keep iron supplements away from children. Do not start iron based on a quiz result.",
    guidanceNote: "Pairing plant iron sources with vitamin C-containing foods can help absorption. Tiredness has many causes; a clinician can decide whether blood tests are appropriate.",
    sources: [{ label: "NIH ODS · Iron", url: "https://ods.od.nih.gov/factsheets/Iron-Consumer/" }],
    questions: [
      { id: "fe-periods", text: "Do you have heavy periods, for example changing protection every 1–2 hours or bleeding for more than 7 days? Choose No if this doesn’t apply.", scale: "yesno", topic: "Heavy periods", weight: 3, reverse: false, kind: "medical", audience: "female" },
      { id: "fe-nsaid", text: "Do you regularly take aspirin or anti-inflammatory painkillers such as ibuprofen or diclofenac?", scale: "yesno", topic: "Regular painkillers", weight: 2, reverse: false, kind: "medical", audience: "other" },
      { id: "fe-donate", text: "How often do you donate blood?", scale: "donate", topic: "Frequent blood donation", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "fe-gut", text: "Have you been diagnosed with a stomach or bowel condition, such as coeliac disease, Crohn’s disease or ulcers, or had stomach or bowel surgery?", scale: "yesno", topic: "Stomach or bowel condition", weight: 3, reverse: false, kind: "medical" },
      { id: "fe-condition", text: "Are you being treated for heart failure or cancer?", scale: "yesno", topic: "Heart failure or cancer", weight: 2, reverse: false, kind: "medical" },
      { id: "fe-acid", text: "How often do you take medicine for acid reflux or heartburn, such as omeprazole or pantoprazole?", scale: "days", topic: "Acid-reducing medicine", weight: 1, reverse: false, kind: "medical" },
      { id: "fe-plant", text: "How much of your diet is plant-based, without meat, fish or poultry?", scale: "share", topic: "Plant-based diet", weight: 2, reverse: false, kind: "diet" },
      { id: "fe-food", text: "How often do you go a whole day without iron foods, such as meat, fish, beans, lentils or iron-fortified cereals?", scale: "days", topic: "Days without iron foods", weight: 2, reverse: false, kind: "diet" },
      { id: "fe-tired", text: "How often do you feel unusually tired or weak during the day?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" },
      { id: "fe-breath", text: "How often do you get short of breath or notice your heart racing during everyday activity?", scale: "often", topic: "Breathlessness", weight: 1, reverse: false, kind: "symptom" },
      { id: "fe-pica", text: "How often do you crave ice, clay or other things that aren’t food?", scale: "often", topic: "Craving ice or non-food", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "zinc", name: "Zinc", icon: "shield", category: "metals",
    summary: "Zinc supports your immune system, wound healing and sense of taste.",
    foodSources: ["Oysters", "Meat", "Beans", "Pumpkin seeds", "Zinc-fortified cereals"],
    typicalIntake: "US RDA: adult men 19+, 11 mg/day; adult women 19+, 8 mg/day.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 40 mg/day from all sources. Too much zinc over time can lower copper levels and harm nerve and immune function. This limit is not a target.",
    guidanceNote: "Zinc from some plant foods is less readily absorbed. Changes in taste or smell can have many causes and should not be treated as proof of low zinc.",
    sources: [{ label: "NIH ODS · Zinc", url: "https://ods.od.nih.gov/factsheets/Zinc-Consumer/" }],
    questions: [
      { id: "zn-gut", text: "Have you been diagnosed with a bowel condition such as Crohn’s or coeliac disease, or had weight-loss surgery?", scale: "yesno", topic: "Bowel condition or surgery", weight: 3, reverse: false, kind: "medical" },
      { id: "zn-plant", text: "How much of your diet is plant-based, without meat, fish or poultry?", scale: "share", topic: "Plant-based diet", weight: 3, reverse: false, kind: "diet" },
      { id: "zn-alcohol", text: "How often do you drink alcohol heavily, for example 5 or more drinks in one day?", scale: "often", topic: "Heavy drinking", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "zn-diuretic", text: "How often do you take water tablets (diuretics), such as hydrochlorothiazide?", scale: "days", topic: "Water tablets", weight: 1, reverse: false, kind: "medical" },
      { id: "zn-food", text: "How often do you go a whole day without zinc foods, such as meat, shellfish, beans, seeds, dairy or zinc-fortified cereals?", scale: "days", topic: "Days without zinc foods", weight: 2, reverse: false, kind: "diet" },
      { id: "zn-diarrhoea", text: "How often have you had diarrhoea in recent weeks?", scale: "often", topic: "Diarrhoea", weight: 1, reverse: false, kind: "symptom" },
      { id: "zn-taste", text: "How often does your sense of taste or smell seem weaker than usual?", scale: "often", topic: "Weaker taste or smell", weight: 1, reverse: false, kind: "symptom" },
      { id: "zn-healing", text: "How often do small cuts seem slower than usual to heal?", scale: "often", topic: "Slow healing", weight: 1, reverse: false, kind: "symptom" },
      { id: "zn-hair", text: "How often do you notice more hair shedding than usual?", scale: "often", topic: "Hair shedding", weight: 1, reverse: false, kind: "symptom" },
      { id: "zn-appetite", text: "How often is your appetite lower than usual?", scale: "often", topic: "Low appetite", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "copper", name: "Copper", icon: "coin", category: "metals",
    summary: "Copper helps your body make energy, use iron and build connective tissue.",
    foodSources: ["Cashews and sunflower seeds", "Chickpeas and tofu", "Potatoes", "Mushrooms", "Millet and whole-wheat foods"],
    typicalIntake: "US RDA: 900 micrograms (mcg) per day for adults 19+.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 10,000 mcg (10 mg) a day from all sources. Too much copper over time can damage the liver and cause stomach pain, nausea, vomiting and diarrhoea. This limit is not a target.",
    guidanceNote: "High-dose zinc supplements, and heavy use of zinc-containing denture creams, can block copper absorption. Low copper is uncommon, so a clinician’s check comes before any supplement.",
    sources: [{ label: "NIH ODS · Copper", url: "https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/" }],
    questions: [
      { id: "cu-zinc", text: "How often do you take zinc supplements, including zinc lozenges?", scale: "days", topic: "Zinc supplements", weight: 3, reverse: false, kind: "medical" },
      { id: "cu-denture", text: "Do you use denture adhesive cream every day, or more than the packet suggests?", scale: "yesno", topic: "Denture cream", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "cu-celiac", text: "Have you been diagnosed with coeliac disease?", scale: "yesno", topic: "Coeliac disease", weight: 3, reverse: false, kind: "medical" },
      { id: "cu-food", text: "How often do you go a whole day without nuts, seeds, chickpeas, beans, whole grains or mushrooms?", scale: "days", topic: "Days without copper foods", weight: 2, reverse: false, kind: "diet" },
      { id: "cu-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "cu-anaemia", text: "Has a doctor told you that you have anaemia that didn’t improve with iron?", scale: "yesno", topic: "Anaemia not helped by iron", weight: 2, reverse: false, kind: "medical" },
      { id: "cu-balance", text: "How often do you feel unsteady on your feet or notice numbness in your feet?", scale: "often", topic: "Unsteadiness or numbness", weight: 1, reverse: false, kind: "symptom" },
      { id: "cu-infections", text: "How often do you catch infections such as colds or chest infections?", scale: "often", topic: "Frequent infections", weight: 1, reverse: false, kind: "symptom" },
      { id: "cu-tired", text: "How often do you feel unusually tired or weak?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" },
      { id: "cu-colour", text: "Have you noticed your skin or hair becoming lighter in colour?", scale: "yesno", topic: "Lighter skin or hair", weight: 1, reverse: false, kind: "symptom" }
    ]
  });
}(window.SUPL));
