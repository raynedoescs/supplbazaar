(function (S) {
  "use strict";
  // Essentials: nutrients outside the vitamin/mineral groups. Weights are editorial choices, not clinically validated predictors.
  S.nutrients.push({
    id: "omega-3", name: "Omega-3", icon: "softgel", category: "essentials",
    summary: "Omega-3 fats are part of every cell and support your heart, brain and eyes.",
    foodSources: ["Oily fish such as salmon and sardines", "Flaxseed (alsi) and chia seeds", "Walnuts", "Canola and soybean oil"],
    typicalIntake: "US Adequate Intake for ALA (the plant omega-3): adult men 19+, 1.6 g/day; adult women 19+, 1.1 g/day. No intake target is set for EPA and DHA, the omega-3s in fish.",
    cautionLevel: "high",
    upperLimitNote: "No US upper limit is set. High doses of EPA and DHA (2 g a day or more) might increase bleeding time, which matters with blood thinners such as warfarin; Europe’s food-safety authority considers up to about 5 g a day of EPA and DHA from supplements safe long-term. Ask a clinician before combining omega-3 supplements with blood thinners.",
    guidanceNote: "True omega-3 deficiency is very rare in healthy people. Plant foods provide ALA; oily fish provides EPA and DHA, which the body makes only in small amounts from ALA.",
    quizNote: "True omega-3 deficiency is very rare. This check looks at how much omega-3 you are likely to eat.",
    moderateCallout: "There is no routine blood test for omega-3. A clinician or dietitian can look at your diet.",
    highCallout: "Please talk to a doctor or dietitian before starting any supplement, especially if you take a blood thinner.",
    testContext: "Omega-3 levels can be measured, but there are no agreed cut-offs. A clinician looks at your diet, health and medicines together.",
    sources: [{ label: "NIH ODS · Omega-3 fatty acids", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" }],
    questions: [
      { id: "o3-fish", text: "How often do you go a whole week without eating oily fish, such as salmon, sardines, mackerel or herring?", scale: "often", topic: "Little oily fish", weight: 3, reverse: false, kind: "diet" },
      { id: "o3-ala", text: "How often do you go a whole day without plant omega-3 sources such as flaxseed, chia seeds, walnuts, or canola or soybean oil?", scale: "days", topic: "Days without plant omega-3", weight: 2, reverse: false, kind: "diet" },
      { id: "o3-plant", text: "How much of your diet is plant-based, without fish or seafood?", scale: "share", topic: "No fish or seafood", weight: 2, reverse: false, kind: "diet" },
      { id: "o3-lowfat", text: "How often do you follow a very low-fat diet?", scale: "often", topic: "Very low-fat diet", weight: 2, reverse: false, kind: "diet" },
      { id: "o3-absorb", text: "Have you been diagnosed with a condition that affects fat absorption, such as Crohn’s or coeliac disease, cystic fibrosis, or a pancreas or liver condition?", scale: "yesno", topic: "Fat absorption condition", weight: 2, reverse: false, kind: "medical" },
      { id: "o3-shellfish", text: "How often do you go a whole week without any fish or shellfish at all?", scale: "often", topic: "No fish or shellfish", weight: 1, reverse: false, kind: "diet" },
      { id: "o3-nuts", text: "How often do you go a whole day without nuts or seeds?", scale: "days", topic: "Days without nuts or seeds", weight: 1, reverse: false, kind: "diet" },
      { id: "o3-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "o3-meals", text: "How often does your routine leave you missing meals?", scale: "often", topic: "Missed meals", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "o3-skin", text: "How often is your skin rough, dry and scaly, or itchy and inflamed?", scale: "often", topic: "Rough, scaly skin", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "choline", name: "Choline", icon: "egg", category: "essentials",
    summary: "Choline helps build cell membranes and make a key brain messenger.",
    foodSources: ["Eggs", "Fish and chicken", "Soybeans", "Kidney beans (rajma)", "Milk and yogurt"],
    typicalIntake: "US Adequate Intake: adult men 19+, 550 mg/day; adult women 19+, 425 mg/day.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 3,500 mg a day from all sources. Too much can cause a fishy body odour, vomiting, heavy sweating, low blood pressure and liver toxicity. This limit is not a target.",
    guidanceNote: "Most people eat less choline than the reference, but true deficiency is rare in healthy men and non-pregnant women because the body also makes some. Eggs are one of the richest everyday sources.",
    quizNote: "True choline deficiency is rare in healthy people. This check mostly looks at how much choline you are likely to eat.",
    moderateCallout: "There is no simple routine test for choline. A clinician or dietitian can look at your diet.",
    highCallout: "Please talk to a doctor or dietitian before starting any supplement.",
    testContext: "A clinician looks at your diet and, where relevant, liver tests.",
    sources: [{ label: "NIH ODS · Choline", url: "https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/" }],
    questions: [
      { id: "ch-eggs", text: "How often do you go a whole day without eggs, meat, fish or chicken?", scale: "days", topic: "Days without eggs, meat or fish", weight: 3, reverse: false, kind: "diet" },
      { id: "ch-plant", text: "How much of your diet is plant-based, without meat, fish, eggs or dairy?", scale: "share", topic: "Plant-based diet", weight: 2, reverse: false, kind: "diet" },
      { id: "ch-soy", text: "How often do you go a whole day without soybeans, milk, yogurt or paneer?", scale: "days", topic: "Days without soy or dairy", weight: 1, reverse: false, kind: "diet" },
      { id: "ch-beans", text: "How often do you go a whole day without beans, potatoes or whole grains?", scale: "days", topic: "Days without beans or grains", weight: 1, reverse: false, kind: "diet" },
      { id: "ch-access", text: "How often are eggs, meat, fish or dairy too expensive or hard to get for you?", scale: "often", topic: "Hard to get these foods", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "ch-liver", text: "Has a doctor told you that you have fatty liver that is not caused by alcohol?", scale: "yesno", topic: "Fatty liver", weight: 2, reverse: false, kind: "medical" },
      { id: "ch-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "ch-meals", text: "How often does your routine leave you missing meals?", scale: "often", topic: "Missed meals", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "ch-muscle", text: "How often do your muscles ache or feel weaker than usual?", scale: "often", topic: "Muscle aches or weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "ch-tired", text: "How often do you feel unusually tired?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "fibre", name: "Fibre", icon: "grain", category: "essentials",
    summary: "Fibre keeps digestion regular and is found in plant foods.",
    foodSources: ["Pulses: dal, chana, rajma", "Whole grains: atta, oats, millets", "Vegetables", "Whole fruit", "Nuts and seeds"],
    typicalIntake: "WHO: at least 25 g of naturally occurring dietary fibre a day for everyone over 10, plus at least 400 g of fruit and vegetables.",
    cautionLevel: "standard",
    upperLimitNote: null,
    guidanceNote: "Increase fibre gradually and drink enough fluid as you do. Whole foods are the best sources; fibre supplements are not a substitute for them.",
    quizNote: "Fibre isn’t measured by a blood test. This check looks at how much fibre you are likely to eat and how your digestion feels.",
    moderateCallout: "Fibre has no blood test. A clinician or dietitian can look at your diet and digestion.",
    highCallout: "Please talk to a doctor or dietitian before starting a fibre supplement.",
    testContext: "Constipation has many causes, including fluids, activity and medicines. See a clinician about blood in your stools, weight loss or a lasting change in bowel habit.",
    affiliateNote: "Optional browsing, not a recommendation. Fibre supplements are not a substitute for fibre-rich foods; take them with plenty of water and at a different time from medicines.",
    sources: [{ label: "WHO · Healthy diet", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" }],
    questions: [
      { id: "fb-veg", text: "How often do you go a whole day without vegetables or fruit?", scale: "days", topic: "Days without fruit or veg", weight: 3, reverse: false, kind: "diet" },
      { id: "fb-pulses", text: "How often do you go a whole day without dal, beans, chana or other pulses?", scale: "days", topic: "Days without pulses", weight: 2, reverse: false, kind: "diet" },
      { id: "fb-refined", text: "How much of the grain you eat is refined (white rice, maida, white bread) rather than whole grain?", scale: "share", topic: "Mostly refined grains", weight: 2, reverse: false, kind: "diet" },
      { id: "fb-processed", text: "How often do your meals come from packaged foods, fast food or ready meals?", scale: "often", topic: "Processed or fast food", weight: 2, reverse: false, kind: "diet" },
      { id: "fb-nuts", text: "How often do you go a whole day without nuts or seeds?", scale: "days", topic: "Days without nuts or seeds", weight: 1, reverse: false, kind: "diet" },
      { id: "fb-juice", text: "When you have fruit, how often is it juice rather than whole fruit?", scale: "oftenNA", topic: "Juice instead of whole fruit", weight: 1, reverse: false, kind: "diet" },
      { id: "fb-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "fb-meals", text: "How often does your routine leave you missing meals?", scale: "often", topic: "Missed meals", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "fb-hard", text: "How often are your bowel movements hard or difficult to pass?", scale: "often", topic: "Hard stools", weight: 2, reverse: false, kind: "symptom" },
      { id: "fb-rare", text: "How often do you go 3 or more days without a bowel movement?", scale: "often", topic: "Infrequent bowel movements", weight: 1, reverse: false, kind: "symptom" }
    ]
  });
}(window.SUPL));
