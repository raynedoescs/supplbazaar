(function (S) {
  "use strict";
  // Weights are editorial choices, not clinically validated predictors.
  S.nutrients.push({
    id: "vitamin-b12", ageWeight: 2, name: "Vitamin B12", icon: "fish", category: "vitamins",
    summary: "Vitamin B12 helps your nerves work and your body make red blood cells.",
    foodSources: ["Fish", "Eggs", "Milk and yogurt", "B12-fortified cereals", "B12-fortified nutritional yeast"],
    typicalIntake: "US RDA: 2.4 micrograms (mcg) per day for adults 19+.",
    cautionLevel: "standard", upperLimitNote: null,
    guidanceNote: "Check labels on fortified foods; unfortified plant foods are not reliable B12 sources. Persistent symptoms deserve a clinical assessment, even with a low score.",
    sources: [{ label: "NIH ODS · Vitamin B12", url: "https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/" }],
    questions: [
      { id: "b12-plant", text: "How much of your diet is plant-based, without meat, fish, eggs or dairy?", scale: "share", topic: "Plant-based diet", weight: 3, reverse: false, kind: "diet" },
      { id: "b12-food", text: "How often do you go a whole day without fish, meat, eggs, dairy or B12-fortified foods?", scale: "days", topic: "Days without B12 foods", weight: 3, reverse: false, kind: "diet" },
      { id: "b12-acid", text: "How often do you take medicine for acid reflux or heartburn, such as omeprazole, pantoprazole or famotidine?", scale: "days", topic: "Acid-reducing medicine", weight: 3, reverse: false, kind: "medical" },
      { id: "b12-metformin", text: "Do you take metformin, a common diabetes medicine?", scale: "yesno", topic: "Metformin", weight: 3, reverse: false, kind: "medical" },
      { id: "b12-gut", text: "Have you been diagnosed with pernicious anaemia, atrophic gastritis, coeliac or Crohn’s disease, or had stomach or bowel surgery?", scale: "yesno", topic: "Stomach or bowel condition", weight: 3, reverse: false, kind: "medical" },
      { id: "b12-hpylori", text: "Have you ever been told you have an H. pylori stomach infection or long-term gastritis?", scale: "yesno", topic: "Stomach infection or gastritis", weight: 2, reverse: false, kind: "medical" },
      { id: "b12-tingle", text: "How often do you notice pins and needles or numbness in your hands or feet?", scale: "often", topic: "Pins and needles", weight: 2, reverse: false, kind: "symptom" },
      { id: "b12-tongue", text: "How often does your tongue feel sore or look unusually red and smooth?", scale: "often", topic: "Sore tongue", weight: 1, reverse: false, kind: "symptom" },
      { id: "b12-memory", text: "How often do you find it harder than usual to remember or concentrate?", scale: "often", topic: "Memory or focus", weight: 1, reverse: false, kind: "symptom" },
      { id: "b12-tired", text: "How often do you feel unusually tired or weak during the day?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "vitamin-d", ageWeight: 2, name: "Vitamin D", icon: "sun", category: "vitamins",
    summary: "Vitamin D helps your body absorb calcium and supports bones and muscles.",
    foodSources: ["Salmon", "Trout", "Egg yolks", "Vitamin D-fortified milk or plant drinks", "UV-exposed mushrooms"],
    typicalIntake: "US RDA: ages 19–70, 15 mcg (600 IU) per day; ages 71+, 20 mcg (800 IU) per day.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 100 mcg (4,000 IU) per day from all sources. Too much supplemental vitamin D can raise blood calcium and damage kidneys. This limit is not a target.",
    guidanceNote: "Low vitamin D may cause no noticeable symptoms. Sun exposure varies with season and skin coverage; this quiz does not recommend extra sun or changing sun protection. Check fortification labels.",
    sources: [{ label: "NIH ODS · Vitamin D", url: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/" }],
    questions: [
      { id: "d-indoors", text: "How often do you spend almost all daylight hours indoors?", scale: "days", topic: "Little daylight", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "d-covered", text: "When you are outdoors in daylight, how much of your skin is usually covered by clothing?", scale: "share", topic: "Skin usually covered", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "d-skin", text: "Which best describes your natural skin tone? Darker skin makes less vitamin D from the same sunlight.", scale: "tone", topic: "Skin tone", weight: 1, reverse: false, kind: "background" },
      { id: "d-food", text: "How often do you go a whole day without oily fish, egg yolks, UV-exposed mushrooms or vitamin D-fortified foods?", scale: "days", topic: "Days without vitamin D foods", weight: 2, reverse: false, kind: "diet" },
      { id: "d-fat", text: "Have you been diagnosed with a condition that affects fat absorption, such as coeliac disease, Crohn’s disease, cystic fibrosis or liver disease?", scale: "yesno", topic: "Fat absorption condition", weight: 3, reverse: false, kind: "medical" },
      { id: "d-weight", text: "Have you had weight-loss surgery, or has a doctor told you your weight is in the obese range?", scale: "yesno", topic: "Weight-loss surgery or obesity", weight: 2, reverse: false, kind: "medical" },
      { id: "d-meds", text: "Do you regularly take steroid tablets such as prednisolone, a weight-loss medicine such as orlistat, or a thiazide-type water tablet?", scale: "yesno", topic: "Medicines that affect vitamin D", weight: 2, reverse: false, kind: "medical" },
      { id: "d-bones", text: "How often do you notice a deep ache in your bones?", scale: "often", topic: "Bone ache", weight: 1, reverse: false, kind: "symptom" },
      { id: "d-muscles", text: "How often do your muscles feel weaker than usual?", scale: "often", topic: "Muscle weakness", weight: 1, reverse: false, kind: "symptom" },
      { id: "d-aches", text: "How often do your muscles ache without an obvious reason?", scale: "often", topic: "Muscle aches", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "vitamin-b6", name: "Vitamin B6", icon: "bowl", category: "vitamins",
    summary: "Vitamin B6 helps your body use food energy and supports nerve function.",
    foodSources: ["Chickpeas", "Fish", "Poultry", "Potatoes", "Bananas"],
    typicalIntake: "US RDA: ages 19–50, 1.3 mg per day; ages 51+, 1.7 mg for men and 1.5 mg for women per day.",
    cautionLevel: "high",
    upperLimitNote: "Long-term excess supplemental B6 can damage nerves. The US adult upper limit is 100 mg/day from all sources; EFSA set a much lower adult limit of 12 mg/day in 2023. Neither is a recommended dose. Discuss supplements with a clinician.",
    guidanceNote: "Low B6 on its own is uncommon. Skin and mouth changes have many possible causes and do not establish a nutrient problem.",
    sources: [{ label: "NIH ODS · Vitamin B6", url: "https://ods.od.nih.gov/factsheets/VitaminB6-Consumer/" }],
    questions: [
      { id: "b6-kidney", text: "Has a doctor told you that your kidneys don’t work as well as they should, or are you on dialysis?", scale: "yesno", topic: "Kidney condition", weight: 3, reverse: false, kind: "medical" },
      { id: "b6-autoimmune", text: "Do you have rheumatoid arthritis or another autoimmune condition?", scale: "yesno", topic: "Autoimmune condition", weight: 2, reverse: false, kind: "medical" },
      { id: "b6-alcohol", text: "How often do you drink alcohol heavily, for example 5 or more drinks in one day?", scale: "often", topic: "Heavy drinking", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "b6-meds", text: "Do you regularly take medicine for epilepsy or seizures, theophylline for breathing, or cycloserine for tuberculosis?", scale: "yesno", topic: "Medicines that affect B6", weight: 2, reverse: false, kind: "medical" },
      { id: "b6-food", text: "How often do you go a whole day without B6 foods such as chickpeas, fish, poultry, potatoes or bananas?", scale: "days", topic: "Days without B6 foods", weight: 2, reverse: false, kind: "diet" },
      { id: "b6-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "b6-lips", text: "How often do you notice cracks at the corners of your mouth?", scale: "often", topic: "Cracked mouth corners", weight: 1, reverse: false, kind: "symptom" },
      { id: "b6-tongue", text: "How often does your tongue feel swollen or sore?", scale: "often", topic: "Sore tongue", weight: 1, reverse: false, kind: "symptom" },
      { id: "b6-rash", text: "How often do you notice an itchy, scaly skin rash?", scale: "often", topic: "Scaly rash", weight: 1, reverse: false, kind: "symptom" },
      { id: "b6-mood", text: "How often do you feel unusually low, irritable or confused?", scale: "often", topic: "Low mood or confusion", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "folate", name: "Folate", icon: "sprout", category: "vitamins",
    summary: "Folate (vitamin B9) helps your body make DNA and healthy red blood cells.",
    foodSources: ["Leafy greens such as spinach", "Black-eyed peas (lobia) and other beans", "Lentils (dal)", "Asparagus and broccoli", "Folate-fortified cereals"],
    typicalIntake: "US RDA: 400 mcg DFE (dietary folate equivalents) per day for adults 19+.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 1,000 mcg a day of folic acid from supplements and fortified foods (natural food folate is not limited). High folic acid can hide the anaemia of low vitamin B12 while nerve damage continues. This limit is not a target.",
    guidanceNote: "Low folate and low vitamin B12 cause the same kind of anaemia, so it is worth taking the B12 check too. Folate needs rise before and during pregnancy; anyone who could become pregnant should ask a clinician about folic acid.",
    sources: [{ label: "NIH ODS · Folate", url: "https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/" }],
    questions: [
      { id: "fo-greens", text: "How often do you go a whole day without leafy greens, beans, lentils, peas or folate-fortified foods?", scale: "days", topic: "Days without folate foods", weight: 3, reverse: false, kind: "diet" },
      { id: "fo-alcohol", text: "How often do you drink alcohol heavily, for example 5 or more drinks in one day?", scale: "often", topic: "Heavy drinking", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "fo-absorb", text: "Have you been diagnosed with coeliac disease, Crohn’s disease, ulcerative colitis or another condition that affects how you absorb food?", scale: "yesno", topic: "Absorption condition", weight: 2, reverse: false, kind: "medical" },
      { id: "fo-meds", text: "Do you regularly take methotrexate, sulfasalazine or a medicine for epilepsy or seizures?", scale: "yesno", topic: "Medicines that affect folate", weight: 2, reverse: false, kind: "medical" },
      { id: "fo-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "fo-meals", text: "How often does your routine leave you missing meals?", scale: "often", topic: "Missed meals", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "fo-tired", text: "How often do you feel unusually tired or weak?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" },
      { id: "fo-breath", text: "How often do you get short of breath or notice your heart racing during everyday activity?", scale: "often", topic: "Breathlessness or palpitations", weight: 1, reverse: false, kind: "symptom" },
      { id: "fo-mouth", text: "How often do you get a sore tongue or mouth ulcers?", scale: "often", topic: "Sore tongue or mouth ulcers", weight: 1, reverse: false, kind: "symptom" },
      { id: "fo-focus", text: "How often do you find it hard to concentrate or feel unusually irritable?", scale: "often", topic: "Poor focus or irritability", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "vitamin-c", name: "Vitamin C", icon: "citrus", category: "vitamins",
    summary: "Vitamin C helps your body make collagen, heal wounds and absorb plant iron.",
    foodSources: ["Citrus fruit such as oranges", "Amla and guava", "Red and green peppers (capsicum)", "Broccoli", "Strawberries and kiwifruit"],
    typicalIntake: "US RDA: adult men 19+, 90 mg/day; adult women 19+, 75 mg/day. People who smoke need 35 mg/day more.",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 2,000 mg a day from all sources. Large doses can cause diarrhoea, nausea and stomach cramps. This limit is not a target.",
    guidanceNote: "Fresh fruit and vegetables are the easiest sources; cooking and storage reduce vitamin C. Eating vitamin C foods with plant-based meals also helps you absorb iron.",
    sources: [{ label: "NIH ODS · Vitamin C", url: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" }],
    questions: [
      { id: "vc-fruitveg", text: "How often do you go a whole day without any fruit or vegetables?", scale: "days", topic: "Days without fruit or veg", weight: 3, reverse: false, kind: "diet" },
      { id: "vc-rich", text: "How often do you go a whole day without vitamin C foods such as citrus fruit, amla, guava, peppers, tomatoes or broccoli?", scale: "days", topic: "Days without vitamin C foods", weight: 2, reverse: false, kind: "diet" },
      { id: "vc-smoke", text: "How often do you smoke?", scale: "days", topic: "Smoking", weight: 3, reverse: false, kind: "lifestyle" },
      { id: "vc-secondhand", text: "How often are you around other people’s tobacco smoke?", scale: "days", topic: "Second-hand smoke", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "vc-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 2, reverse: false, kind: "diet" },
      { id: "vc-kidney", text: "Are you on kidney dialysis, or being treated for cancer?", scale: "yesno", topic: "Dialysis or cancer treatment", weight: 2, reverse: false, kind: "medical" },
      { id: "vc-absorb", text: "Have you been diagnosed with a condition that affects how you absorb food, such as Crohn’s disease?", scale: "yesno", topic: "Absorption condition", weight: 1, reverse: false, kind: "medical" },
      { id: "vc-bruise", text: "How often do you bruise easily or notice tiny red or purple spots on your skin?", scale: "often", topic: "Easy bruising", weight: 1, reverse: false, kind: "symptom" },
      { id: "vc-healing", text: "How often do small cuts seem slower than usual to heal?", scale: "often", topic: "Slow healing", weight: 1, reverse: false, kind: "symptom" },
      { id: "vc-tired", text: "How often do you feel unusually tired or run down?", scale: "often", topic: "Tiredness", weight: 1, reverse: false, kind: "symptom" }
    ]
  }, {
    id: "vitamin-a", name: "Vitamin A", icon: "carrot", category: "vitamins",
    summary: "Vitamin A supports your eyesight, immune system and healthy growth of cells.",
    foodSources: ["Carrots", "Sweet potato", "Spinach and other dark leafy greens", "Mango", "Eggs and milk"],
    typicalIntake: "US RDA: adult men 19+, 900 mcg RAE/day; adult women 19+, 700 mcg RAE/day (RAE: retinol activity equivalents).",
    cautionLevel: "high",
    upperLimitNote: "US adult upper limit: 3,000 mcg a day of preformed vitamin A (retinol, from animal foods and supplements); beta-carotene from plants does not count. Too much preformed vitamin A can damage the liver and cause birth defects, so anyone who is or could become pregnant should not take vitamin A supplements without medical advice. This limit is not a target.",
    guidanceNote: "Orange and dark-green vegetables and fruit provide beta-carotene, which the body turns into vitamin A as needed. Do not start vitamin A supplements because of a check-in score.",
    sources: [{ label: "NIH ODS · Vitamin A", url: "https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/" }],
    questions: [
      { id: "va-orange", text: "How often do you go a whole day without orange or dark-green vegetables and fruit, such as carrots, sweet potato, spinach, pumpkin or mango?", scale: "days", topic: "Days without orange or green foods", weight: 3, reverse: false, kind: "diet" },
      { id: "va-animal", text: "How often do you go a whole day without eggs, milk, cheese or fish?", scale: "days", topic: "Days without animal sources", weight: 2, reverse: false, kind: "diet" },
      { id: "va-access", text: "How often are fresh vegetables, fruit, eggs or dairy too expensive or hard to get for you?", scale: "often", topic: "Hard to get these foods", weight: 2, reverse: false, kind: "lifestyle" },
      { id: "va-absorb", text: "Have you been diagnosed with coeliac disease, Crohn’s disease, cystic fibrosis or a pancreas condition?", scale: "yesno", topic: "Absorption condition", weight: 3, reverse: false, kind: "medical" },
      { id: "va-variety", text: "How varied are the foods you eat across a usual week?", scale: "variety", topic: "Limited variety", weight: 1, reverse: false, kind: "diet" },
      { id: "va-meals", text: "How often does your routine leave you missing meals?", scale: "often", topic: "Missed meals", weight: 1, reverse: false, kind: "lifestyle" },
      { id: "va-night", text: "How often do you find it hard to see in dim light or at night?", scale: "often", topic: "Poor night vision", weight: 2, reverse: false, kind: "symptom" },
      { id: "va-dryeyes", text: "How often do your eyes feel very dry?", scale: "often", topic: "Dry eyes", weight: 1, reverse: false, kind: "symptom" },
      { id: "va-infections", text: "How often do you catch infections such as colds or chest infections?", scale: "often", topic: "Frequent infections", weight: 1, reverse: false, kind: "symptom" },
      { id: "va-skin", text: "How often is your skin unusually dry or rough?", scale: "often", topic: "Dry or rough skin", weight: 1, reverse: false, kind: "symptom" }
    ]
  });
}(window.SUPL));
