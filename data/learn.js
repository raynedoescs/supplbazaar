// Learn library: one entry per nutrient id. Plain-language summaries written from the public sources
// listed on each nutrient (NIH Office of Dietary Supplements fact sheets; WHO and MedlinePlus for sodium).
// All numbers (daily references, upper limits, food amounts) are US/WHO values copied from those sources;
// they have NOT been reconciled with India's ICMR-NIN guidance. The validator checks that the numbers in
// `needs` and `upperLimit` also appear in the nutrient's own `typicalIntake` / `upperLimitNote`.
//
// Fields: tagline, whatItIs, keyFacts [{label,value} x4], does [{title,text}], needs {note, rows}, foods,
// foodsHeading, indianFoods [..], indianNote, atRisk [..], atRiskNote, lowSigns [..], lowSignsNote,
// tooMuch, interactions [{name,text}], testing, foodTip.
// needs.rows: { sex: "female"|"male"|"all", ages: "19–50", from: 19, to: 50 (null = no upper age), amount: "18 mg a day" }
// foods: { food, serving, amount, veg: true if vegetarian incl. dairy; false for meat, fish or egg }
(function (S) {
  "use strict";
  S.learn = {
    "vitamin-b12": {
      tagline: "The nerve and blood vitamin.",
      whatItIs: "Vitamin B12 (also called cobalamin) is a water-soluble vitamin found naturally in animal foods and added to some fortified foods and supplements. Your body cannot make it, so it has to come from what you eat or take.",
      keyFacts: [
        { label: "Daily reference", value: "2.4 mcg" },
        { label: "Upper limit", value: "None set" },
        { label: "Top food sources", value: "Fish, meat, dairy, eggs" },
        { label: "Most at risk", value: "Vegans, older adults, gut conditions" }
      ],
      does: [
        { title: "Healthy nerves", text: "Needed for the development, protective coating and everyday function of your nervous system." },
        { title: "Red blood cells", text: "Needed to make healthy red blood cells. Without enough, the body can make fewer, larger and less effective cells (megaloblastic anaemia)." },
        { title: "DNA and cell building", text: "Helps make DNA, the instructions every new cell needs." }
      ],
      needs: {
        note: "Needs are a little higher during pregnancy and breastfeeding. Ask your clinician.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "2.4 mcg a day" }]
      },
      foods: [
        { food: "Clams, cooked", serving: "3 ounces", amount: "17 mcg", veg: false },
        { food: "Beef liver, pan fried", serving: "3 ounces", amount: "70.7 mcg", veg: false },
        { food: "Nutritional yeast, fortified (check label)", serving: "about ¼ cup", amount: "8.3 to 24 mcg", veg: true },
        { food: "Salmon, Atlantic, cooked", serving: "3 ounces", amount: "2.6 mcg", veg: false },
        { food: "Tuna, light, canned in water", serving: "3 ounces", amount: "2.5 mcg", veg: false },
        { food: "Milk, 2%", serving: "1 cup", amount: "1.3 mcg", veg: true },
        { food: "Yogurt, plain, fat free", serving: "6-ounce container", amount: "1.0 mcg", veg: true },
        { food: "Breakfast cereal, fortified with 25% of the DV", serving: "1 serving", amount: "0.6 mcg", veg: true },
        { food: "Cheddar cheese", serving: "1½ ounces", amount: "0.5 mcg", veg: true },
        { food: "Egg, cooked", serving: "1 large", amount: "0.5 mcg", veg: false }
      ],
      indianFoods: ["Milk", "Dahi (curd)", "Paneer", "Cheese", "Eggs", "Fish", "B12-fortified foods"],
      indianNote: "Plant foods do not naturally contain B12. Anyone who eats no animal foods relies on fortified foods or supplements.",
      atRisk: [
        "Older adults, especially with atrophic gastritis (a stomach-lining condition)",
        "People with pernicious anaemia or other stomach or bowel conditions",
        "People who have had stomach or bowel surgery",
        "People who follow vegetarian or vegan diets",
        "People taking metformin or acid-reducing medicines for a long time"
      ],
      lowSigns: [
        "Fatigue and weakness",
        "Pins and needles or other nerve changes",
        "A sore, swollen or smooth tongue",
        "Palpitations",
        "Anaemia and low blood-cell counts"
      ],
      lowSignsNote: "Signs can take years to appear, and low B12 can exist without any. Do not use this list to diagnose yourself.",
      tooMuch: "No upper limit has been set for vitamin B12, because it is generally considered safe even at high doses. That does not mean extra helps when your levels are already fine.",
      interactions: [
        { name: "Acid-reducing medicines", text: "Proton pump inhibitors (such as omeprazole) and H2 blockers (such as famotidine) can slow the release of B12 from food and, over time, contribute to low levels." },
        { name: "Metformin", text: "This common diabetes medicine can reduce B12 absorption and lower blood B12." }
      ],
      testing: "Usually a blood test for B12. Many labs treat results below 200–250 pg/mL as low. If the result is borderline, a doctor may add a methylmalonic acid (MMA) test.",
      foodTip: "Check labels on fortified foods; unfortified plant foods are not reliable B12 sources."
    },

    "vitamin-d": {
      tagline: "The sunshine vitamin.",
      whatItIs: "Vitamin D is a fat-soluble vitamin. Your skin makes it when sunlight (UVB rays) falls on it, and a few foods and supplements provide it too. Very few foods contain much of it naturally.",
      keyFacts: [
        { label: "Daily reference", value: "15–20 mcg" },
        { label: "Upper limit", value: "100 mcg (4,000 IU)" },
        { label: "Top food sources", value: "Oily fish, fortified milk" },
        { label: "Most at risk", value: "Little sun, dark skin, older age" }
      ],
      does: [
        { title: "Bones and calcium", text: "Helps your body absorb calcium and supports bone strength through life." },
        { title: "Muscles and nerves", text: "Involved in normal muscle and nerve function." },
        { title: "Immune system", text: "Plays a role in how your immune system works." }
      ],
      needs: {
        note: "Sun exposure also contributes, and varies with season, skin colour and clothing. Supl does not recommend changing your sun protection.",
        rows: [
          { sex: "all", ages: "19–70", from: 19, to: 70, amount: "15 mcg (600 IU) a day" },
          { sex: "all", ages: "71 and over", from: 71, to: null, amount: "20 mcg (800 IU) a day" }
        ]
      },
      foods: [
        { food: "Cod liver oil", serving: "1 tablespoon", amount: "34.0 mcg", veg: false },
        { food: "Trout, rainbow, farmed, cooked", serving: "3 ounces", amount: "16.2 mcg", veg: false },
        { food: "Salmon, sockeye, cooked", serving: "3 ounces", amount: "14.2 mcg", veg: false },
        { food: "White mushrooms, sliced, exposed to UV light", serving: "½ cup", amount: "9.2 mcg", veg: true },
        { food: "Milk, 2%, vitamin D fortified", serving: "1 cup", amount: "2.9 mcg", veg: true },
        { food: "Soy, almond or oat milk, vitamin D fortified", serving: "1 cup", amount: "2.5–3.6 mcg", veg: true },
        { food: "Ready-to-eat cereal, fortified with 10% of the DV", serving: "1 serving", amount: "2.0 mcg", veg: true },
        { food: "Egg, scrambled", serving: "1 large", amount: "1.1 mcg", veg: false },
        { food: "Sardines, canned in oil, drained", serving: "2 sardines", amount: "1.2 mcg", veg: false }
      ],
      indianFoods: ["Sunlight on bare skin", "Fortified milk and edible oils (check labels)", "Eggs", "Oily fish"],
      indianNote: "Check labels for vitamin D fortification. Amounts vary by brand.",
      atRisk: [
        "Older adults",
        "People with limited sun exposure, including those who cover most of their skin",
        "People with dark skin, which makes less vitamin D from the same sunlight",
        "People with conditions that limit fat absorption, such as coeliac or Crohn’s disease",
        "People with obesity, or who have had gastric bypass surgery",
        "People who avoid dairy or eat no eggs or fish"
      ],
      lowSigns: [
        "In children: rickets (soft, weak bones)",
        "In adults: osteomalacia (soft bones), with bone pain and muscle weakness",
        "Often no obvious symptoms at all"
      ],
      lowSignsNote: "Low vitamin D frequently causes no noticeable symptoms, which is why a blood test, not a symptom list, is how it is found.",
      tooMuch: "The upper limit for adults is 100 mcg (4,000 IU) a day from all sources. Too much supplemental vitamin D can raise blood calcium and damage the kidneys. Sunlight alone does not cause vitamin D toxicity.",
      interactions: [
        { name: "Orlistat", text: "A weight-loss medicine that reduces fat absorption, and with it vitamin D absorption." },
        { name: "Steroid tablets", text: "Medicines such as prednisolone can reduce calcium absorption and affect how the body uses vitamin D." },
        { name: "Thiazide diuretics", text: "These water tablets can raise blood calcium, and so extra vitamin D needs a clinician’s check." },
        { name: "Statins", text: "Some cholesterol medicines and vitamin D can affect each other. Ask your pharmacist or doctor." }
      ],
      testing: "A blood test for 25-hydroxyvitamin D. Cut-offs differ between labs and guidelines, so a clinician interprets the result.",
      foodTip: "Check fortification labels. Sun exposure varies with season and skin coverage."
    },

    "vitamin-b6": {
      tagline: "The energy and brain vitamin.",
      whatItIs: "Vitamin B6 is a water-soluble vitamin that comes in several forms (such as pyridoxine). It is found in many foods, and low levels on their own are uncommon.",
      keyFacts: [
        { label: "Daily reference", value: "1.3–1.7 mg" },
        { label: "Upper limit", value: "100 mg (US)" },
        { label: "Top food sources", value: "Chickpeas, fish, poultry, potato" },
        { label: "Most at risk", value: "Kidney disease, heavy drinking" }
      ],
      does: [
        { title: "Turning food into energy", text: "Works with enzymes that help your body use protein, carbohydrate and fat." },
        { title: "Brain and nerves", text: "Needed to make the chemical messengers that nerves use to communicate." },
        { title: "Red blood cells", text: "Needed to make haemoglobin, the protein in red blood cells that carries oxygen." }
      ],
      needs: {
        note: "Needs are higher during pregnancy and breastfeeding. Ask your clinician.",
        rows: [
          { sex: "all", ages: "19–50", from: 19, to: 50, amount: "1.3 mg a day" },
          { sex: "female", ages: "51 and over", from: 51, to: null, amount: "1.5 mg a day" },
          { sex: "male", ages: "51 and over", from: 51, to: null, amount: "1.7 mg a day" }
        ]
      },
      foods: [
        { food: "Chickpeas, canned", serving: "1 cup", amount: "1.1 mg", veg: true },
        { food: "Beef liver, pan fried", serving: "3 ounces", amount: "0.9 mg", veg: false },
        { food: "Tuna, yellowfin, fresh, cooked", serving: "3 ounces", amount: "0.9 mg", veg: false },
        { food: "Salmon, sockeye, cooked", serving: "3 ounces", amount: "0.6 mg", veg: false },
        { food: "Chicken breast, roasted", serving: "3 ounces", amount: "0.5 mg", veg: false },
        { food: "Breakfast cereal, fortified with 25% of the DV", serving: "1 serving", amount: "0.4 mg", veg: true },
        { food: "Potatoes, boiled", serving: "1 cup", amount: "0.4 mg", veg: true },
        { food: "Banana", serving: "1 medium", amount: "0.4 mg", veg: true },
        { food: "Bulgur, cooked", serving: "1 cup", amount: "0.2 mg", veg: true }
      ],
      indianFoods: ["Chana (chickpeas)", "Aloo (potato)", "Banana", "Fish", "Chicken", "Fortified cereals"],
      indianNote: "Amounts vary with cooking and variety.",
      atRisk: [
        "People with impaired kidney function, including those on dialysis",
        "People with autoimmune conditions",
        "People with alcohol dependence",
        "People taking certain medicines (see Medicines below)"
      ],
      lowSigns: [
        "Scaly lips and cracks at the corners of the mouth",
        "A swollen, sore tongue",
        "A skin rash",
        "Low mood and confusion",
        "Anaemia and weaker immunity"
      ],
      lowSignsNote: "On its own, B6 deficiency is uncommon. It usually appears together with low levels of other B vitamins, and mild shortfalls can cause no symptoms for months or years.",
      tooMuch: "Long-term excess from supplements can damage nerves. The US upper limit for adults is 100 mg a day from all sources; the European food-safety authority set a much lower adult limit of 12 mg a day in 2023. Neither is a recommended dose.",
      interactions: [
        { name: "Cycloserine", text: "An antibiotic used for tuberculosis, which increases the amount of B6 lost in urine." },
        { name: "Antiepileptic medicines", text: "Some seizure medicines can lower B6 levels." },
        { name: "Theophylline", text: "A breathing medicine that can lower B6 levels." }
      ],
      testing: "A blood test for the active form of B6 is possible but rarely needed. A clinician looks at diet, medicines and other conditions first.",
      foodTip: "Low B6 on its own is uncommon. Skin and mouth changes have many possible causes."
    },

    "magnesium": {
      tagline: "The muscle and energy mineral.",
      whatItIs: "Magnesium is a mineral found in many foods and some medicines such as antacids. It helps run more than 300 reactions in your body.",
      keyFacts: [
        { label: "Daily reference", value: "310–420 mg" },
        { label: "Upper limit", value: "350 mg (supplements only)" },
        { label: "Top food sources", value: "Seeds, nuts, greens, beans" },
        { label: "Most at risk", value: "Gut conditions, diabetes, heavy drinking" }
      ],
      does: [
        { title: "Muscles and nerves", text: "Helps muscles contract and relax and nerves send signals." },
        { title: "Energy and protein", text: "Needed for the reactions that make energy and build proteins." },
        { title: "Blood sugar and blood pressure", text: "Involved in blood sugar control and in regulating blood pressure." },
        { title: "Bones", text: "A structural part of bone, working alongside calcium." }
      ],
      needs: {
        note: "Needs are higher during pregnancy. Ask your clinician.",
        rows: [
          { sex: "male", ages: "19–30", from: 19, to: 30, amount: "400 mg a day" },
          { sex: "male", ages: "31 and over", from: 31, to: null, amount: "420 mg a day" },
          { sex: "female", ages: "19–30", from: 19, to: 30, amount: "310 mg a day" },
          { sex: "female", ages: "31 and over", from: 31, to: null, amount: "320 mg a day" }
        ]
      },
      foods: [
        { food: "Pumpkin seeds, roasted", serving: "1 ounce", amount: "156 mg", veg: true },
        { food: "Chia seeds", serving: "1 ounce", amount: "111 mg", veg: true },
        { food: "Almonds, dry roasted", serving: "1 ounce", amount: "80 mg", veg: true },
        { food: "Spinach, boiled", serving: "½ cup", amount: "78 mg", veg: true },
        { food: "Cashews, dry roasted", serving: "1 ounce", amount: "74 mg", veg: true },
        { food: "Peanuts, oil roasted", serving: "¼ cup", amount: "63 mg", veg: true },
        { food: "Soymilk, plain or vanilla", serving: "1 cup", amount: "61 mg", veg: true },
        { food: "Black beans, cooked", serving: "½ cup", amount: "60 mg", veg: true },
        { food: "Rice, brown, cooked", serving: "½ cup", amount: "42 mg", veg: true }
      ],
      indianFoods: ["Pumpkin seeds", "Almonds and cashews", "Palak (spinach)", "Rajma and other beans", "Whole grains such as oats and brown rice"],
      indianNote: "Amounts vary with variety and cooking.",
      atRisk: [
        "People with bowel conditions such as Crohn’s or coeliac disease, or long-term diarrhoea",
        "People with type 2 diabetes",
        "People with alcohol dependence",
        "Older adults",
        "People taking certain medicines (see Medicines below)"
      ],
      lowSigns: [
        "Early on: loss of appetite, nausea, vomiting, fatigue and weakness",
        "Later: numbness, tingling, muscle cramps and contractions",
        "Severe cases: seizures and abnormal heart rhythms"
      ],
      lowSignsNote: "Symptomatic low magnesium is uncommon in healthy people, because the kidneys limit how much is lost.",
      tooMuch: "The upper limit for adults is 350 mg a day from supplements and medicines only; magnesium naturally in food is not counted. Too much from supplements can cause diarrhoea and cramps, and very high amounts can affect the heart. People with kidney problems are at higher risk.",
      interactions: [
        { name: "Bisphosphonates", text: "Magnesium-rich supplements can reduce absorption of these osteoporosis tablets." },
        { name: "Some antibiotics", text: "Tetracycline and quinolone antibiotics absorb less well alongside magnesium." },
        { name: "Diuretics", text: "Loop and thiazide water tablets increase magnesium loss." },
        { name: "Proton pump inhibitors", text: "Long-term use of acid-reducing medicines can cause low magnesium." }
      ],
      testing: "A blood magnesium test is the usual option, but it does not reliably show your total body stores.",
      foodTip: "Low intake does not necessarily mean a low blood level."
    },

    "calcium": {
      tagline: "The bone and muscle mineral.",
      whatItIs: "Calcium is the most abundant mineral in your body. Most of it forms the structure of your bones and teeth, and a small amount circulates in your blood to help muscles, nerves and blood vessels work.",
      keyFacts: [
        { label: "Daily reference", value: "1,000–1,200 mg" },
        { label: "Upper limit", value: "2,000–2,500 mg" },
        { label: "Top food sources", value: "Dairy, fortified drinks, tofu" },
        { label: "Most at risk", value: "After menopause, no dairy" }
      ],
      does: [
        { title: "Strong bones and teeth", text: "Provides the structure that keeps bones and teeth hard." },
        { title: "Muscles and nerves", text: "Needed for muscles to contract and nerves to carry messages." },
        { title: "Blood vessels and clotting", text: "Helps blood vessels tighten and relax, and helps blood clot." }
      ],
      needs: {
        note: "Needs are higher in some life stages. Ask your clinician.",
        rows: [
          { sex: "all", ages: "19–50", from: 19, to: 50, amount: "1,000 mg a day" },
          { sex: "male", ages: "51–70", from: 51, to: 70, amount: "1,000 mg a day" },
          { sex: "female", ages: "51–70", from: 51, to: 70, amount: "1,200 mg a day" },
          { sex: "all", ages: "71 and over", from: 71, to: null, amount: "1,200 mg a day" }
        ]
      },
      foods: [
        { food: "Yogurt, plain, low fat", serving: "8 ounces", amount: "415 mg", veg: true },
        { food: "Orange juice, calcium fortified", serving: "1 cup", amount: "349 mg", veg: true },
        { food: "Mozzarella, part skim", serving: "1.5 ounces", amount: "333 mg", veg: true },
        { food: "Sardines, canned in oil, with bones", serving: "3 ounces", amount: "325 mg", veg: false },
        { food: "Milk, nonfat", serving: "1 cup", amount: "299 mg", veg: true },
        { food: "Soymilk, calcium fortified", serving: "1 cup", amount: "299 mg", veg: true },
        { food: "Tofu, firm, made with calcium sulfate", serving: "½ cup", amount: "253 mg", veg: true },
        { food: "Salmon, canned, with bones", serving: "3 ounces", amount: "181 mg", veg: false },
        { food: "Soybeans, cooked", serving: "½ cup", amount: "131 mg", veg: true }
      ],
      indianFoods: ["Milk", "Dahi (curd)", "Paneer", "Ragi", "Til (sesame seeds)", "Calcium-set tofu", "Fortified plant milks"],
      indianNote: "Ragi and til are commonly eaten calcium sources. Amounts vary by preparation.",
      atRisk: [
        "Women after menopause, when bone loss speeds up",
        "People who avoid dairy, for example because of lactose intolerance, a milk allergy or a vegan diet",
        "People who get little vitamin D, which is needed to absorb calcium"
      ],
      lowSigns: [
        "Over years: weaker bones (osteoporosis) and a higher risk of fractures",
        "In children: rickets; in adults: osteomalacia (more often from low vitamin D)",
        "Very low blood calcium can cause tingling, numbness and muscle cramps"
      ],
      lowSignsNote: "Low calcium intake usually causes no obvious symptoms until bones weaken. Blood calcium is tightly controlled and stays normal even when intake is low.",
      tooMuch: "The upper limit from all sources is 2,500 mg a day for adults 19–50 and 2,000 mg a day for adults 51 and over. Too much from supplements may increase kidney-stone risk and can cause constipation. These limits are not targets.",
      interactions: [
        { name: "Levothyroxine", text: "Calcium can reduce absorption of this thyroid medicine, so doses are usually spaced apart." },
        { name: "Quinolone antibiotics", text: "Calcium can reduce how much of these antibiotics your body absorbs." },
        { name: "Dolutegravir", text: "Calcium supplements can lower the blood levels of this HIV medicine unless timed with food." },
        { name: "Lithium", text: "Lithium can raise blood calcium, so calcium supplements need a clinician’s check." }
      ],
      testing: "Blood calcium does not show whether you eat enough, because the body keeps it in a narrow range. A clinician may use bone-density scans and other tests to assess bone health.",
      foodTip: "Low calcium intake can affect bones without obvious symptoms."
    },

    "iron": {
      tagline: "The oxygen-carrying mineral.",
      whatItIs: "Iron is a mineral that helps your blood carry oxygen around your body. Food has two kinds: haem iron in meat and fish, which absorbs well, and non-haem iron in plants, which absorbs less well.",
      keyFacts: [
        { label: "Daily reference", value: "8–18 mg" },
        { label: "Upper limit", value: "45 mg" },
        { label: "Top food sources", value: "Beans, lentils, meat, fortified cereals" },
        { label: "Most at risk", value: "Heavy periods, blood donors" }
      ],
      does: [
        { title: "Carries oxygen", text: "A key part of haemoglobin, the red blood cell protein that moves oxygen from your lungs to the rest of your body." },
        { title: "Supports muscles", text: "Part of myoglobin, which supplies oxygen to muscles." },
        { title: "Growth and brain development", text: "Needed for growth, brain development and many cell functions." }
      ],
      needs: {
        note: "Iron needs are higher during pregnancy, and a vegetarian diet may need more because plant iron is absorbed less well. Ask your clinician.",
        rows: [
          { sex: "male", ages: "19–50", from: 19, to: 50, amount: "8 mg a day" },
          { sex: "female", ages: "19–50", from: 19, to: 50, amount: "18 mg a day" },
          { sex: "all", ages: "51 and over", from: 51, to: null, amount: "8 mg a day" }
        ]
      },
      foods: [
        { food: "Breakfast cereal, fortified with 100% of the DV", serving: "1 serving", amount: "18 mg", veg: true },
        { food: "Oysters, cooked", serving: "3 ounces", amount: "8 mg", veg: false },
        { food: "White beans, canned", serving: "1 cup", amount: "8 mg", veg: true },
        { food: "Beef liver, pan fried", serving: "3 ounces", amount: "5 mg", veg: false },
        { food: "Lentils, boiled", serving: "½ cup", amount: "3 mg", veg: true },
        { food: "Spinach, boiled", serving: "½ cup", amount: "3 mg", veg: true },
        { food: "Tofu, firm", serving: "½ cup", amount: "3 mg", veg: true },
        { food: "Dark chocolate, 45–69% cacao", serving: "1 ounce", amount: "2 mg", veg: true },
        { food: "Chickpeas, boiled", serving: "½ cup", amount: "2 mg", veg: true },
        { food: "Kidney beans, canned", serving: "½ cup", amount: "2 mg", veg: true }
      ],
      indianFoods: ["Rajma (kidney beans)", "Chana (chickpeas)", "Dals such as masoor", "Palak (spinach)", "Fortified cereals", "Meat and fish"],
      indianNote: "Vitamin C foods, such as citrus fruit or peppers, eaten with plant-based meals help absorption.",
      atRisk: [
        "Women with heavy periods",
        "Frequent blood donors",
        "People with stomach or bowel conditions, or who have had gut surgery",
        "People with cancer or heart failure",
        "Pregnant women, infants and young children, who have higher needs",
        "People who eat little or no meat, because plant iron is absorbed less well"
      ],
      lowSigns: [
        "Tiredness and weakness",
        "Difficulty concentrating",
        "Feeling unusually cold",
        "Shortness of breath or a racing heart on exertion",
        "Upset stomach",
        "Sometimes cravings for ice or non-food items"
      ],
      lowSignsNote: "Tiredness has many causes. If iron is truly low, a clinician also needs to find out why, such as blood loss or poor absorption.",
      tooMuch: "The upper limit for adults is 45 mg a day from all sources. Too much iron can cause stomach upset and, at high doses, serious harm. Keep iron supplements away from children. Do not start iron based on a quiz result.",
      interactions: [
        { name: "Levodopa", text: "Iron can reduce absorption of this Parkinson’s medicine." },
        { name: "Levothyroxine", text: "Iron can reduce absorption of this thyroid medicine, so doses are usually spaced apart." },
        { name: "Proton pump inhibitors", text: "Acid-reducing medicines can reduce iron absorption." }
      ],
      testing: "Blood tests such as haemoglobin and ferritin (a marker of stored iron). A clinician decides which tests are useful and looks for the cause of low iron.",
      foodTip: "Pairing plant iron sources with vitamin C-containing foods can help absorption."
    },

    "zinc": {
      tagline: "The immune and healing mineral.",
      whatItIs: "Zinc is an essential trace mineral. You need only small amounts, but it is used by hundreds of enzymes throughout the body.",
      keyFacts: [
        { label: "Daily reference", value: "8–11 mg" },
        { label: "Upper limit", value: "40 mg" },
        { label: "Top food sources", value: "Shellfish, meat, seeds, pulses" },
        { label: "Most at risk", value: "Gut conditions, plant-only diets" }
      ],
      does: [
        { title: "Immune function", text: "Helps your immune system work." },
        { title: "Wound healing", text: "Needed for skin repair and wound healing." },
        { title: "Growth and cell building", text: "Used in making DNA and protein and in cell division." },
        { title: "Taste and smell", text: "Needed for a normal sense of taste and smell." }
      ],
      needs: {
        note: "Needs are higher during pregnancy and breastfeeding. Ask your clinician.",
        rows: [
          { sex: "male", ages: "19 and over", from: 19, to: null, amount: "11 mg a day" },
          { sex: "female", ages: "19 and over", from: 19, to: null, amount: "8 mg a day" }
        ]
      },
      foods: [
        { food: "Oysters, Eastern, farmed, raw", serving: "3 ounces", amount: "32 mg", veg: false },
        { food: "Beef, bottom sirloin, roasted", serving: "3 ounces", amount: "3.8 mg", veg: false },
        { food: "Breakfast cereal, fortified with 25% of the DV", serving: "1 serving", amount: "2.8 mg", veg: true },
        { food: "Oats, regular, cooked with water", serving: "1 cup", amount: "2.3 mg", veg: true },
        { food: "Pumpkin seeds, roasted", serving: "1 ounce", amount: "2.2 mg", veg: true },
        { food: "Cheddar cheese", serving: "1.5 ounces", amount: "1.5 mg", veg: true },
        { food: "Shrimp, cooked", serving: "3 ounces", amount: "1.4 mg", veg: false },
        { food: "Lentils, boiled", serving: "½ cup", amount: "1.3 mg", veg: true }
      ],
      indianFoods: ["Pumpkin seeds", "Chana and dals", "Dahi and cheese", "Nuts", "Whole grains", "Meat and fish"],
      indianNote: "Plant foods contain compounds that reduce zinc absorption. Amounts vary.",
      atRisk: [
        "People with bowel conditions, or who have had weight-loss (bariatric) surgery",
        "People who follow vegetarian or vegan diets",
        "People with alcohol use disorder",
        "Pregnant or breastfeeding women, who have higher needs"
      ],
      lowSigns: [
        "Diarrhoea",
        "Hair loss",
        "Slow wound healing and skin changes",
        "Frequent infections",
        "Changes in taste or smell",
        "In children: slower growth"
      ],
      lowSignsNote: "Signs vary by age and have many other causes. Changes in taste or smell should not be treated as proof of low zinc.",
      tooMuch: "The upper limit for adults is 40 mg a day from all sources, including zinc lozenges and cold products. Too much zinc over time can lower copper levels and harm nerve and immune function. This limit is not a target.",
      interactions: [
        { name: "Quinolone and tetracycline antibiotics", text: "Zinc can reduce how much of these antibiotics your body absorbs, so doses are usually spaced apart." },
        { name: "Penicillamine", text: "Zinc can reduce absorption of this medicine." },
        { name: "Diuretics", text: "Some water tablets increase zinc lost in urine." }
      ],
      testing: "No single test shows zinc status reliably. Blood zinc is used, but a clinician also considers diet, symptoms and risk factors.",
      foodTip: "Zinc from some plant foods is less readily absorbed."
    },

    "potassium": {
      tagline: "The fluid-balance electrolyte.",
      whatItIs: "Potassium is an electrolyte, a mineral that carries an electrical charge. It is found in all body tissues, mostly inside your cells, and is plentiful in fruit, vegetables and pulses.",
      keyFacts: [
        { label: "Daily reference", value: "2,600–3,400 mg" },
        { label: "Upper limit", value: "None set (see note)" },
        { label: "Top food sources", value: "Pulses, potatoes, fruit" },
        { label: "Most at risk", value: "Diuretics, vomiting, diarrhoea" }
      ],
      does: [
        { title: "Fluid balance", text: "Works with sodium to keep the right amount of fluid inside and outside your cells." },
        { title: "Nerves and muscles", text: "Needed for nerves to send signals and for muscles, including the heart, to contract." },
        { title: "Blood pressure", text: "Enough potassium alongside less sodium supports healthy blood pressure." }
      ],
      needs: {
        note: "These are Adequate Intakes (population references), not doses.",
        rows: [
          { sex: "male", ages: "19 and over", from: 19, to: null, amount: "3,400 mg a day" },
          { sex: "female", ages: "19 and over", from: 19, to: null, amount: "2,600 mg a day" }
        ]
      },
      foods: [
        { food: "Apricots, dried", serving: "½ cup", amount: "755 mg", veg: true },
        { food: "Lentils, cooked", serving: "1 cup", amount: "731 mg", veg: true },
        { food: "Prunes, dried", serving: "½ cup", amount: "635 mg", veg: true },
        { food: "Potato, baked, flesh only", serving: "1 medium", amount: "610 mg", veg: true },
        { food: "Kidney beans, canned", serving: "1 cup", amount: "607 mg", veg: true },
        { food: "Orange juice", serving: "1 cup", amount: "496 mg", veg: true },
        { food: "Banana", serving: "1 medium", amount: "422 mg", veg: true },
        { food: "Milk, 1%", serving: "1 cup", amount: "366 mg", veg: true },
        { food: "Spinach, raw", serving: "2 cups", amount: "334 mg", veg: true }
      ],
      indianFoods: ["Aloo (potato)", "Banana", "Dals and rajma", "Palak (spinach)", "Dahi", "Fruit and vegetables"],
      indianNote: "Eating a variety of fruit, vegetables and pulses is the usual route to enough.",
      atRisk: [
        "People with inflammatory bowel disease (Crohn’s or ulcerative colitis)",
        "People who use diuretics (water tablets) or laxatives",
        "People with ongoing vomiting or diarrhoea",
        "People with pica (craving non-food items such as clay)"
      ],
      lowSigns: [
        "Mild: constipation, tiredness, muscle weakness and feeling unwell",
        "More serious low potassium can affect the heart’s rhythm",
        "Seek urgent care for palpitations or severe weakness"
      ],
      lowSignsNote: "Low blood potassium is rare in healthy people with normal kidneys, and usually comes from medicines or fluid losses.",
      tooMuch: "No upper limit has been set for healthy adults because the kidneys remove extra potassium. But that does not mean unlimited amounts are safe: with kidney disease or some medicines, high potassium can be dangerous. Potassium supplements and salt substitutes are not suitable for everyone.",
      interactions: [
        { name: "ACE inhibitors and ARBs", text: "These blood-pressure and heart medicines can raise blood potassium." },
        { name: "Potassium-sparing diuretics", text: "These water tablets can raise blood potassium." },
        { name: "Loop and thiazide diuretics", text: "These water tablets increase potassium loss and can lower it." }
      ],
      testing: "A blood test for potassium. Below about 3.6 mmol/L is considered low (hypokalaemia). A clinician interprets it with your medicines and kidney function.",
      foodTip: "A low dietary intake is different from a low blood potassium level. Ask a clinician before supplementing."
    },

    "sodium": {
      tagline: "The salt mineral. Most of us get too much.",
      whatItIs: "Sodium is an electrolyte found in table salt and in many processed foods. Your body needs some, but almost every population eats far more than it needs, and the usual health problem is too much, not too little.",
      keyFacts: [
        { label: "WHO limit for adults", value: "Under 2,000 mg" },
        { label: "Same as salt", value: "Under 5 g (about 1 teaspoon)" },
        { label: "Main sources", value: "Processed foods, bread, sauces" },
        { label: "Most at risk of low blood sodium", value: "Heavy sweating, diuretics, some illnesses" }
      ],
      does: [
        { title: "Fluid and blood volume", text: "Helps maintain the volume of fluid in your blood and around your cells." },
        { title: "Nerves", text: "Helps nerves transmit signals." },
        { title: "Acid-base balance and cells", text: "Helps keep the body’s chemistry balanced so cells work normally." }
      ],
      needs: {
        note: "This is a limit to stay below, not a minimum or a target. Do not add salt or take salt tablets because of a check-in score.",
        rows: [{ sex: "all", ages: "Adults", from: 18, to: null, amount: "less than 2,000 mg sodium a day (less than 5 g salt)" }]
      },
      foods: [],
      foodsHeading: "Where sodium hides",
      limitFoods: ["Bread and bakery items", "Processed meat", "Snack foods", "Sauces and condiments such as soy and fish sauce", "Packaged soups and instant noodles", "Pickles", "Cheese"],
      indianFoods: ["Achaar (pickles)", "Papad", "Namkeen and packaged snacks", "Instant noodles", "Packaged masala mixes"],
      indianNote: "Foods that naturally contain sodium, such as milk, meat and shellfish, contribute less than processed foods. These are things to be mindful of, not foods to increase.",
      atRisk: [
        "Almost everyone, for eating too much (the global average is more than double the WHO limit)",
        "For low blood sodium: people who sweat heavily for long periods while drinking large amounts of plain water",
        "People with ongoing vomiting or diarrhoea",
        "People taking diuretics (water tablets)",
        "People with heart failure, kidney disease or cirrhosis"
      ],
      lowSigns: [
        "Confusion, irritability and restlessness",
        "Headache and fatigue",
        "Loss of appetite, nausea and vomiting",
        "Muscle weakness, spasms or cramps",
        "In severe cases: convulsions"
      ],
      lowSignsNote: "Low blood sodium is mainly a water-balance problem, not a sign of eating too little salt. Sodium deficiency is extremely unlikely in healthy people. Severe or sudden symptoms need urgent medical care.",
      tooMuch: "Too much sodium raises blood pressure, which increases the risk of heart disease, stroke and kidney disease. Most people already get enough, often too much. Do not add salt or take salt tablets because of this score.",
      interactions: [
        { name: "Diuretics (water tablets)", text: "These increase sodium lost in urine and can lower blood sodium." },
        { name: "Salt substitutes", text: "Many contain potassium. They are not suitable for everyone, particularly with kidney problems or some blood-pressure medicines." }
      ],
      testing: "A blood sodium test. Low blood sodium is diagnosed by a clinician, who also looks for the cause.",
      foodTip: "Low blood sodium is a water-balance issue, not simply a sign of eating too little salt."
    },
    "folate": {
      tagline: "The cell-building B vitamin.",
      whatItIs: "Folate is a water-soluble B vitamin (B9). It occurs naturally in food; folic acid is the form added to fortified foods and supplements.",
      keyFacts: [
        { label: "Daily reference", value: "400 mcg DFE" },
        { label: "Upper limit", value: "1,000 mcg folic acid" },
        { label: "Top food sources", value: "Leafy greens, beans, lentils" },
        { label: "Most at risk", value: "Heavy drinking, gut conditions" }
      ],
      does: [
        { title: "Making DNA", text: "Needed to make DNA and for cells to divide." },
        { title: "Red blood cells", text: "Needed to make healthy red blood cells. Without enough, the body makes large, less effective cells (megaloblastic anaemia)." },
        { title: "Protein building blocks", text: "Helps the body process amino acids, the building blocks of protein." }
      ],
      needs: {
        note: "Needs are higher before and during pregnancy (600 mcg DFE in pregnancy). Ask your clinician.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "400 mcg DFE a day" }]
      },
      foods: [
        { food: "Beef liver, braised", serving: "3 ounces", amount: "215 mcg DFE", veg: false },
        { food: "Spinach, boiled", serving: "½ cup", amount: "131 mcg DFE", veg: true },
        { food: "Black-eyed peas (cowpeas), boiled", serving: "½ cup", amount: "105 mcg DFE", veg: true },
        { food: "Breakfast cereal, fortified with 25% of the DV", serving: "1 serving", amount: "100 mcg DFE", veg: true },
        { food: "Asparagus, boiled", serving: "4 spears", amount: "89 mcg DFE", veg: true },
        { food: "Brussels sprouts, frozen, boiled", serving: "½ cup", amount: "78 mcg DFE", veg: true },
        { food: "Lettuce, romaine, shredded", serving: "1 cup", amount: "64 mcg DFE", veg: true },
        { food: "Avocado, raw, sliced", serving: "½ cup", amount: "59 mcg DFE", veg: true },
        { food: "Broccoli, frozen, cooked", serving: "½ cup", amount: "52 mcg DFE", veg: true }
      ],
      indianFoods: ["Palak (spinach)", "Lobia (black-eyed peas)", "Rajma and chana", "Dals", "Fortified cereals"],
      indianNote: "In the US, white rice and pasta are often fortified with folic acid; in India this varies, so check labels.",
      atRisk: [
        "People with alcohol use disorder",
        "People with coeliac disease, inflammatory bowel disease or other conditions that affect absorption",
        "People with a common gene variant (MTHFR) that changes how folate is used",
        "Women who could become pregnant or are pregnant, who need more",
        "People taking certain medicines (see Medicines below)"
      ],
      lowSigns: [
        "Weakness and tiredness",
        "Difficulty concentrating and irritability",
        "Headache",
        "Palpitations and shortness of breath",
        "A sore tongue and mouth ulcers",
        "Megaloblastic anaemia"
      ],
      lowSignsNote: "Low folate on its own is uncommon; it usually comes with poor diet, heavy drinking or absorption problems. The same anaemia can come from low vitamin B12.",
      tooMuch: "The US adult upper limit is 1,000 mcg a day of folic acid from supplements and fortified foods; folate naturally in food is not limited. High folic acid can hide the anaemia of low vitamin B12 while nerve damage continues, which is why B12 is usually checked too. This limit is not a target.",
      interactions: [
        { name: "Methotrexate", text: "This medicine for cancer and some autoimmune conditions works against folate; doctors manage folate alongside it." },
        { name: "Antiepileptic medicines", text: "Some seizure medicines can lower folate, and folate can affect how they work." },
        { name: "Sulfasalazine", text: "This medicine for bowel and joint conditions can reduce folate absorption." }
      ],
      testing: "Blood tests for folate. Because low vitamin B12 causes the same anaemia, a clinician usually checks B12 too.",
      foodTip: "Low folate and low vitamin B12 cause the same kind of anaemia; take the B12 check too."
    },
    "vitamin-c": {
      tagline: "The collagen and healing vitamin.",
      whatItIs: "Vitamin C (ascorbic acid) is a water-soluble vitamin. Unlike most animals, humans cannot make it, so it has to come from food or supplements.",
      keyFacts: [
        { label: "Daily reference", value: "75–90 mg" },
        { label: "Upper limit", value: "2,000 mg" },
        { label: "Top food sources", value: "Citrus, peppers, broccoli" },
        { label: "Most at risk", value: "Smokers, limited diets" }
      ],
      does: [
        { title: "Collagen and healing", text: "Needed to make collagen, the protein that holds skin, blood vessels and other tissues together, and for wounds to heal." },
        { title: "Absorbing plant iron", text: "Helps your body absorb iron from plant foods." },
        { title: "Antioxidant", text: "Helps protect cells from damage and supports the immune system." }
      ],
      needs: {
        note: "People who smoke need 35 mg a day more. Needs are higher in pregnancy and breastfeeding.",
        rows: [{ sex: "male", ages: "19 and over", from: 19, to: null, amount: "90 mg a day" }, { sex: "female", ages: "19 and over", from: 19, to: null, amount: "75 mg a day" }]
      },
      foods: [
        { food: "Red pepper, sweet, raw", serving: "½ cup", amount: "95 mg", veg: true },
        { food: "Orange juice", serving: "¾ cup", amount: "93 mg", veg: true },
        { food: "Orange", serving: "1 medium", amount: "70 mg", veg: true },
        { food: "Kiwifruit", serving: "1 medium", amount: "64 mg", veg: true },
        { food: "Green pepper, sweet, raw", serving: "½ cup", amount: "60 mg", veg: true },
        { food: "Broccoli, cooked", serving: "½ cup", amount: "51 mg", veg: true },
        { food: "Strawberries, fresh, sliced", serving: "½ cup", amount: "49 mg", veg: true },
        { food: "Brussels sprouts, cooked", serving: "½ cup", amount: "48 mg", veg: true },
        { food: "Tomato juice", serving: "¾ cup", amount: "33 mg", veg: true }
      ],
      indianFoods: ["Amla", "Guava", "Oranges and mosambi", "Lemon", "Capsicum", "Tomatoes"],
      indianNote: "Amla and guava are rich, everyday sources. Amounts vary with ripeness and storage.",
      atRisk: [
        "People who smoke, and people around second-hand smoke",
        "People who eat a limited variety of foods",
        "People with absorption problems or some chronic illnesses, including kidney dialysis and some cancers"
      ],
      lowSigns: [
        "Tiredness and feeling run down",
        "Easy bruising and tiny red or purple spots on the skin",
        "Slow wound healing",
        "Joint pain",
        "Rough, bumpy skin and corkscrew-shaped body hairs"
      ],
      lowSignsNote: "Severe deficiency (scurvy) is rare and can appear within a month of eating less than about 10 mg a day. Milder shortfalls are more common.",
      tooMuch: "The US adult upper limit is 2,000 mg a day from all sources. Vitamin C has low toxicity, but large doses can cause diarrhoea, nausea and stomach cramps. This limit is not a target.",
      interactions: [
        { name: "Chemotherapy and radiation", text: "Antioxidant supplements might affect these treatments. Anyone having cancer treatment should ask their oncologist before taking vitamin C." },
        { name: "Statins with niacin", text: "Antioxidant supplements including vitamin C may reduce the benefit of some cholesterol treatment combinations. Ask your doctor." }
      ],
      testing: "A blood test for vitamin C mostly reflects recent intake. A clinician interprets it with your diet and symptoms.",
      foodTip: "Eat fruit and vegetables fresh where you can; cooking and storage reduce vitamin C."
    },
    "vitamin-a": {
      tagline: "The vision vitamin.",
      whatItIs: "Vitamin A is a group of fat-soluble compounds. Preformed vitamin A (retinol) comes from animal foods and supplements; beta-carotene and other carotenoids in plants are turned into vitamin A as the body needs it.",
      keyFacts: [
        { label: "Daily reference", value: "700–900 mcg RAE" },
        { label: "Upper limit", value: "3,000 mcg (preformed)" },
        { label: "Top food sources", value: "Carrots, sweet potato, greens" },
        { label: "Most at risk", value: "Absorption conditions" }
      ],
      does: [
        { title: "Eyesight", text: "An essential part of the pigment in the eye that lets you see in low light." },
        { title: "Immune system", text: "Supports immune function." },
        { title: "Growth and organs", text: "Supports cell growth and the normal formation of the heart, lungs, eyes and other organs." }
      ],
      needs: {
        note: "Needs change in pregnancy and breastfeeding, and too much preformed vitamin A in pregnancy can harm the baby. Ask your clinician.",
        rows: [{ sex: "male", ages: "19 and over", from: 19, to: null, amount: "900 mcg RAE a day" }, { sex: "female", ages: "19 and over", from: 19, to: null, amount: "700 mcg RAE a day" }]
      },
      foods: [
        { food: "Sweet potato, baked in skin", serving: "1 whole", amount: "1,403 mcg RAE", veg: true },
        { food: "Spinach, frozen, boiled", serving: "½ cup", amount: "573 mcg RAE", veg: true },
        { food: "Carrots, raw", serving: "½ cup", amount: "459 mcg RAE", veg: true },
        { food: "Milk, skim, with added vitamins A and D", serving: "1 cup", amount: "149 mcg RAE", veg: true },
        { food: "Cantaloupe, raw", serving: "½ cup", amount: "135 mcg RAE", veg: true },
        { food: "Peppers, sweet, red, raw", serving: "½ cup", amount: "117 mcg RAE", veg: true },
        { food: "Mango, raw", serving: "1 whole", amount: "112 mcg RAE", veg: true },
        { food: "Egg, hard boiled", serving: "1 large", amount: "75 mcg RAE", veg: false },
        { food: "Beef liver, pan fried", serving: "3 ounces", amount: "6,582 mcg RAE", veg: false }
      ],
      indianFoods: ["Gajar (carrots)", "Shakarkand (sweet potato)", "Palak and other greens", "Pumpkin", "Mango", "Eggs and milk"],
      indianNote: "Liver is extremely high in preformed vitamin A; it is best eaten only occasionally, and avoided in pregnancy unless a clinician advises otherwise.",
      atRisk: [
        "People with limited access to animal foods and orange or green produce",
        "People with cystic fibrosis",
        "People with coeliac disease, Crohn’s disease or pancreas conditions that affect fat absorption",
        "Pregnant and breastfeeding women in low-income settings, and young children"
      ],
      lowSigns: [
        "Night blindness: difficulty seeing in low light (usually the first sign)",
        "Very dry eyes, which can damage the cornea if untreated",
        "More frequent infections"
      ],
      lowSignsNote: "Deficiency is rare where diets are varied, but it remains a leading cause of preventable blindness in children worldwide.",
      tooMuch: "The US adult upper limit is 3,000 mcg a day of preformed vitamin A (retinol); beta-carotene from plants does not count. Too much preformed vitamin A can damage the liver and cause birth defects, so anyone who is or could become pregnant should not take vitamin A supplements without medical advice. This limit is not a target.",
      interactions: [
        { name: "Retinoid medicines", text: "Acne and psoriasis medicines such as isotretinoin are related to vitamin A; taking vitamin A supplements with them can cause toxicity." }
      ],
      testing: "Blood retinol. Levels stay normal until liver stores run very low, so a clinician interprets the result with diet and symptoms.",
      foodTip: "Do not start vitamin A supplements because of a check-in score."
    },
    "iodine": {
      tagline: "The thyroid mineral.",
      whatItIs: "Iodine is a trace element found in some foods and added to iodised salt. Your thyroid uses it to make the hormones that regulate metabolism.",
      keyFacts: [
        { label: "Daily reference", value: "150 mcg" },
        { label: "Upper limit", value: "1,100 mcg" },
        { label: "Top food sources", value: "Iodised salt, dairy, seafood" },
        { label: "Most at risk", value: "No iodised salt, plant-only diets" }
      ],
      does: [
        { title: "Thyroid hormones", text: "An essential part of the thyroid hormones T4 and T3." },
        { title: "Metabolism", text: "Thyroid hormones control many of the body’s reactions and its rate of metabolism." },
        { title: "Growth and brain development", text: "Needed for normal growth, bone development and brain development, especially in pregnancy and infancy." }
      ],
      needs: {
        note: "Needs are higher in pregnancy and breastfeeding. Ask your clinician.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "150 mcg a day" }]
      },
      foods: [
        { food: "Cod, baked", serving: "3 ounces", amount: "146 mcg", veg: false },
        { food: "Seaweed, nori, dried, flaked", serving: "2 tablespoons", amount: "116 mcg", veg: true },
        { food: "Oysters, cooked", serving: "3 ounces", amount: "93 mcg", veg: false },
        { food: "Yogurt, Greek, plain, nonfat", serving: "¾ cup", amount: "87 mcg", veg: true },
        { food: "Milk, nonfat", serving: "1 cup", amount: "84 mcg", veg: true },
        { food: "Iodised table salt", serving: "¼ teaspoon", amount: "78 mcg", veg: true },
        { food: "Egg, hard boiled", serving: "1 large", amount: "31 mcg", veg: false },
        { food: "Cheddar cheese", serving: "1 ounce", amount: "14 mcg", veg: true },
        { food: "Shrimp, cooked", serving: "3 ounces", amount: "13 mcg", veg: false }
      ],
      indianFoods: ["Iodised salt (instead of regular salt)", "Milk and dahi", "Paneer", "Eggs", "Fish"],
      indianNote: "India’s salt iodisation programme makes iodised salt the main source for most people. Rock salt (sendha namak) and many speciality salts are not iodised.",
      atRisk: [
        "People who do not use iodised salt",
        "Pregnant women, who need more",
        "Vegans and people who eat few or no dairy products, seafood or eggs",
        "People living where soils are low in iodine, often mountainous areas",
        "People with low iodine who eat a lot of soy, cassava or raw cabbage-family vegetables"
      ],
      lowSigns: [
        "Goitre: a swelling at the front of the neck",
        "Signs of an underactive thyroid, such as tiredness, feeling cold and dry skin",
        "In pregnancy and infancy, harm to the baby’s growth and brain development"
      ],
      lowSignsNote: "Thyroid problems have many causes, and too much iodine can cause the same signs as too little. A clinician checks thyroid function before anything else.",
      tooMuch: "The US adult upper limit is 1,100 mcg a day from all sources. Too much iodine can cause the same thyroid problems as too little, including goitre and an underactive or overactive thyroid. This limit is not a target.",
      interactions: [
        { name: "Antithyroid medicines", text: "Taking iodine with medicines for an overactive thyroid, such as methimazole, can push thyroid levels too low." },
        { name: "ACE inhibitors and potassium-sparing diuretics", text: "Potassium iodide supplements with these blood-pressure medicines can raise blood potassium." }
      ],
      testing: "Urine iodine shows recent intake across a population rather than one person’s status. For individuals, clinicians usually check thyroid function (TSH).",
      foodTip: "Choose iodised salt instead of regular salt, not more salt: WHO advises under 5 g of salt a day."
    },
    "selenium": {
      tagline: "The thyroid-protecting mineral.",
      whatItIs: "Selenium is an essential mineral that forms part of about 25 proteins (selenoproteins). How much is in plant foods depends on the soil they grew in.",
      keyFacts: [
        { label: "Daily reference", value: "55 mcg" },
        { label: "Upper limit", value: "400 mcg" },
        { label: "Top food sources", value: "Brazil nuts, fish, eggs, meat" },
        { label: "Most at risk", value: "Dialysis, HIV, low-selenium regions" }
      ],
      does: [
        { title: "Thyroid hormones", text: "Selenoproteins help the body make and use thyroid hormones." },
        { title: "Protection from damage", text: "Helps protect cells from oxidative damage and infection." },
        { title: "DNA and reproduction", text: "Involved in making DNA and in reproduction." }
      ],
      needs: {
        note: "Needs are slightly higher in pregnancy and breastfeeding. Ask your clinician.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "55 mcg a day" }]
      },
      foods: [
        { food: "Brazil nuts", serving: "1 ounce (6–8 nuts)", amount: "544 mcg", veg: true },
        { food: "Tuna, yellowfin, cooked", serving: "3 ounces", amount: "92 mcg", veg: false },
        { food: "Sardines, canned in oil, with bone", serving: "3 ounces", amount: "45 mcg", veg: false },
        { food: "Shrimp, cooked", serving: "3 ounces", amount: "42 mcg", veg: false },
        { food: "Spaghetti, cooked", serving: "1 cup", amount: "33 mcg", veg: true },
        { food: "Chicken, light meat, roasted", serving: "3 ounces", amount: "22 mcg", veg: false },
        { food: "Cottage cheese, 1% milkfat", serving: "1 cup", amount: "20 mcg", veg: true },
        { food: "Egg, hard boiled", serving: "1 large", amount: "15 mcg", veg: false }
      ],
      indianFoods: ["Fish and seafood", "Eggs", "Chicken", "Whole grains", "Dairy"],
      indianNote: "Amounts in grains and vegetables vary a lot with the soil where they were grown. A single Brazil nut can provide more than a day’s reference.",
      atRisk: [
        "People living in regions with selenium-poor soil",
        "People on kidney dialysis",
        "People living with HIV"
      ],
      lowSigns: [
        "Usually no symptoms on its own",
        "In very low-selenium regions, linked to a heart-muscle disease (Keshan disease) and a joint and bone disease (Kashin-Beck disease)",
        "It may make the effects of low iodine on the thyroid worse"
      ],
      lowSignsNote: "Low selenium mainly matters when another stress, such as an infection or low iodine, is also present.",
      tooMuch: "The US adult upper limit is 400 mcg a day from all sources. Too much causes hair and nail loss, garlic-smelling breath, a metallic taste, rashes and nerve problems. Just 1 ounce of Brazil nuts (6–8 nuts) can contain 544 mcg, more than the upper limit. This limit is not a target.",
      interactions: [
        { name: "Cisplatin", text: "This chemotherapy medicine can lower selenium levels. Anyone having cancer treatment should ask their oncologist before taking selenium." }
      ],
      testing: "Blood or plasma selenium. A clinician interprets it with your diet, health and where you live.",
      foodTip: "Low selenium rarely causes illness on its own, and too much is harmful: get tested before considering a supplement."
    },
    "copper": {
      tagline: "The energy and iron-helping metal.",
      whatItIs: "Copper is an essential mineral. It works as part of enzymes (cuproenzymes), and most copper in the blood is carried by a protein called ceruloplasmin.",
      keyFacts: [
        { label: "Daily reference", value: "900 mcg" },
        { label: "Upper limit", value: "10,000 mcg" },
        { label: "Top food sources", value: "Nuts, seeds, chickpeas, shellfish" },
        { label: "Most at risk", value: "Coeliac disease, high-dose zinc" }
      ],
      does: [
        { title: "Energy", text: "Part of the enzymes that produce energy in cells." },
        { title: "Using iron", text: "Helps the body move and use iron to make red blood cells." },
        { title: "Connective tissue and nerves", text: "Needed to build connective tissue and to make some brain chemical messengers." }
      ],
      needs: {
        note: "Needs are higher in pregnancy and breastfeeding. Ask your clinician.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "900 mcg a day" }]
      },
      foods: [
        { food: "Oysters, cooked", serving: "3 ounces", amount: "4,850 mcg", veg: false },
        { food: "Potatoes, cooked, flesh and skin", serving: "1 medium", amount: "675 mcg", veg: true },
        { food: "Mushrooms, shiitake, cooked", serving: "½ cup", amount: "650 mcg", veg: true },
        { food: "Cashews, dry roasted", serving: "1 ounce", amount: "629 mcg", veg: true },
        { food: "Sunflower seed kernels, toasted", serving: "¼ cup", amount: "615 mcg", veg: true },
        { food: "Dark chocolate, 70–85% cacao", serving: "1 ounce", amount: "501 mcg", veg: true },
        { food: "Tofu, raw, firm", serving: "½ cup", amount: "476 mcg", veg: true },
        { food: "Chickpeas", serving: "½ cup", amount: "289 mcg", veg: true },
        { food: "Millet, cooked", serving: "1 cup", amount: "280 mcg", veg: true }
      ],
      indianFoods: ["Cashews", "Chana and other pulses", "Millets such as bajra", "Potatoes", "Mushrooms", "Sunflower seeds"],
      indianNote: "Most varied diets provide enough copper. Amounts vary by variety and preparation.",
      atRisk: [
        "People with coeliac disease",
        "People who take high-dose zinc supplements or use a lot of zinc-containing denture cream",
        "Children with Menkes disease, a rare genetic condition"
      ],
      lowSigns: [
        "Anaemia",
        "Lighter skin or hair",
        "Weaker bones",
        "Problems with balance and coordination",
        "More frequent infections",
        "High cholesterol"
      ],
      lowSignsNote: "Low copper is uncommon. These signs have many other causes.",
      tooMuch: "The US adult upper limit is 10,000 mcg (10 mg) a day from all sources. Too much copper over time can damage the liver and cause stomach pain, nausea, vomiting and diarrhoea. This limit is not a target.",
      interactions: [
        { name: "Zinc supplements", text: "No common medicine interactions are listed, but high-dose zinc, including zinc-containing denture creams, can block copper absorption and lead to low copper." }
      ],
      testing: "Blood copper and ceruloplasmin (the protein that carries most copper). A clinician interprets them together.",
      foodTip: "High-dose zinc can lower copper: get tested before considering a copper supplement."
    },
    "phosphorus": {
      tagline: "The bone and energy electrolyte.",
      whatItIs: "Phosphorus is an essential mineral found in most foods. In the body it is mostly present as phosphate, part of bones, teeth, DNA and cell membranes.",
      keyFacts: [
        { label: "Daily reference", value: "700 mg" },
        { label: "Upper limit", value: "3,000–4,000 mg" },
        { label: "Top food sources", value: "Dairy, lentils, fish, chicken" },
        { label: "Most at risk", value: "Under-eating, heavy drinking" }
      ],
      does: [
        { title: "Bones and teeth", text: "A key part of the mineral that makes bones and teeth hard." },
        { title: "Energy", text: "Part of ATP, the molecule cells use to store and move energy." },
        { title: "Cells and DNA", text: "Part of DNA, RNA and cell membranes, and helps keep the body’s acid–base balance." }
      ],
      needs: {
        note: "Most people get enough phosphorus from food. These are general references, not doses.",
        rows: [{ sex: "all", ages: "19 and over", from: 19, to: null, amount: "700 mg a day" }]
      },
      foods: [
        { food: "Yogurt, plain, low fat", serving: "6-ounce container", amount: "245 mg", veg: true },
        { food: "Milk, 2%", serving: "1 cup", amount: "226 mg", veg: true },
        { food: "Salmon, Atlantic, farmed, cooked", serving: "3 ounces", amount: "214 mg", veg: false },
        { food: "Mozzarella, part skim", serving: "1.5 ounces", amount: "197 mg", veg: true },
        { food: "Chicken breast, roasted", serving: "3 ounces", amount: "182 mg", veg: false },
        { food: "Lentils, boiled", serving: "½ cup", amount: "178 mg", veg: true },
        { food: "Cashews, dry roasted", serving: "1 ounce", amount: "139 mg", veg: true },
        { food: "Potato, russet, baked", serving: "1 medium", amount: "123 mg", veg: true },
        { food: "Kidney beans, canned", serving: "½ cup", amount: "115 mg", veg: true },
        { food: "Rice, brown, cooked", serving: "½ cup", amount: "102 mg", veg: true }
      ],
      indianFoods: ["Dals and rajma", "Milk, dahi and paneer", "Nuts", "Eggs, fish and chicken", "Whole grains"],
      indianNote: "Phosphate additives in packaged and processed foods also add phosphorus.",
      atRisk: [
        "People with severe malnutrition or very low body weight, including eating disorders, especially when eating starts again (refeeding)",
        "People who drink alcohol heavily",
        "People who take aluminium-containing antacids for 3 months or more",
        "People with long-term illnesses such as COPD, cirrhosis or cancer",
        "People with chewing or swallowing problems"
      ],
      lowSigns: [
        "Loss of appetite",
        "Muscle weakness, especially in the thighs and shoulders",
        "Bone pain",
        "Numbness and tingling",
        "Confusion",
        "Anaemia and more infections"
      ],
      lowSignsNote: "Low blood phosphorus (hypophosphatemia) is rare and almost never caused by diet alone. It usually has a medical cause that needs a clinician.",
      tooMuch: "The US upper limit from all sources is 4,000 mg a day for adults 19–70 and 3,000 mg a day for adults 71+. High intakes rarely harm healthy people, but people with kidney disease often need to limit phosphorus. These limits are not targets.",
      interactions: [
        { name: "Antacids", text: "Aluminium hydroxide antacids bind phosphorus, and taking them for 3 months or more can cause low phosphorus. Calcium carbonate antacids also reduce absorption." },
        { name: "Sodium phosphate laxatives", text: "Some bowel-preparation laxatives contain phosphate and can raise blood phosphorus, which is risky with kidney disease." }
      ],
      testing: "A blood phosphate (phosphorus) test. A clinician looks for the cause, such as medicines, alcohol or a medical condition.",
      foodTip: "Low phosphorus is almost never about diet: it needs a clinician’s assessment, not a supplement."
    },
    "omega-3": {
      tagline: "The essential fats.",
      whatItIs: "Omega-3s are polyunsaturated fats. ALA, found in plant foods, is the only omega-3 your body cannot make at all; EPA and DHA, found mostly in fish, can be made from ALA but only in small amounts.",
      keyFacts: [
        { label: "Daily reference (ALA)", value: "1.1–1.6 g" },
        { label: "Upper limit", value: "None set (see note)" },
        { label: "Top food sources", value: "Oily fish, flaxseed, walnuts" },
        { label: "Most at risk", value: "Little fish, very low-fat diets" }
      ],
      does: [
        { title: "Every cell", text: "Part of the membranes that surround every cell in the body." },
        { title: "Eyes and brain", text: "DHA is especially concentrated in the eyes and brain." },
        { title: "Heart, blood vessels and immunity", text: "Used to make signalling molecules that affect the heart, blood vessels, lungs and immune system." }
      ],
      needs: {
        note: "These Adequate Intakes are for ALA only. No intake target is set for EPA and DHA, and needs are higher in pregnancy and breastfeeding.",
        rows: [{ sex: "male", ages: "19 and over", from: 19, to: null, amount: "1.6 g ALA a day" }, { sex: "female", ages: "19 and over", from: 19, to: null, amount: "1.1 g ALA a day" }]
      },
      foods: [
        { food: "Flaxseed oil", serving: "1 tablespoon", amount: "7.26 g ALA", veg: true },
        { food: "Chia seeds", serving: "1 ounce", amount: "5.06 g ALA", veg: true },
        { food: "English walnuts", serving: "1 ounce", amount: "2.57 g ALA", veg: true },
        { food: "Flaxseed, whole", serving: "1 tablespoon", amount: "2.35 g ALA", veg: true },
        { food: "Canola oil", serving: "1 tablespoon", amount: "1.28 g ALA", veg: true },
        { food: "Salmon, Atlantic, farmed, cooked", serving: "3 ounces", amount: "1.24 g DHA + 0.59 g EPA", veg: false },
        { food: "Herring, Atlantic, cooked", serving: "3 ounces", amount: "0.94 g DHA + 0.77 g EPA", veg: false },
        { food: "Sardines, canned in tomato sauce", serving: "3 ounces", amount: "0.74 g DHA + 0.45 g EPA", veg: false },
        { food: "Mackerel, Atlantic, cooked", serving: "3 ounces", amount: "0.59 g DHA + 0.43 g EPA", veg: false },
        { food: "Soybean oil", serving: "1 tablespoon", amount: "0.92 g ALA", veg: true }
      ],
      indianFoods: ["Alsi (flaxseed)", "Walnuts", "Chia seeds", "Oily fish such as sardines and mackerel (bangda)", "Soybean oil"],
      indianNote: "Vegetarian diets get ALA from seeds, nuts and oils but very little EPA or DHA.",
      atRisk: [
        "People who eat little or no oily fish",
        "People who eat only plant foods, who get ALA but almost no EPA or DHA",
        "People on very low-fat diets",
        "People with conditions that limit fat absorption"
      ],
      lowSigns: [
        "Rough, scaly skin",
        "Itchy, inflamed skin (dermatitis)",
        "In practice, true deficiency is almost unheard of in healthy people"
      ],
      lowSignsNote: "Classical omega-3 deficiency is virtually nonexistent in healthy people. Most concern is about low intake, not a deficiency disease.",
      tooMuch: "No US upper limit is set. High doses of EPA and DHA (2 g a day or more) might increase bleeding time, which matters with blood thinners such as warfarin; Europe’s food-safety authority considers up to about 5 g a day of EPA and DHA from supplements safe long-term.",
      interactions: [
        { name: "Warfarin and other blood thinners", text: "Omega-3 supplements might add to the effect of blood thinners. Ask your doctor before taking them together." }
      ],
      testing: "There is no routine test. Blood omega-3 levels can be measured, but there are no agreed cut-offs that show a problem.",
      foodTip: "Plant foods give ALA; oily fish gives EPA and DHA."
    },
    "choline": {
      tagline: "The cell-membrane nutrient.",
      whatItIs: "Choline is an essential nutrient. The body makes a little of it, but not enough, so it also has to come from food.",
      keyFacts: [
        { label: "Daily reference", value: "425–550 mg" },
        { label: "Upper limit", value: "3,500 mg" },
        { label: "Top food sources", value: "Eggs, meat, fish, soybeans" },
        { label: "Most at risk", value: "Pregnancy, low animal-food diets" }
      ],
      does: [
        { title: "Cell membranes", text: "Needed to make two fats that are vital parts of cell membranes." },
        { title: "Brain and nerves", text: "Used to make acetylcholine, a messenger for memory, mood and muscle control." },
        { title: "Liver", text: "Helps move fat out of the liver." }
      ],
      needs: {
        note: "These are Adequate Intakes. Needs are higher in pregnancy and breastfeeding, and most pregnant women eat less than this.",
        rows: [{ sex: "male", ages: "19 and over", from: 19, to: null, amount: "550 mg a day" }, { sex: "female", ages: "19 and over", from: 19, to: null, amount: "425 mg a day" }]
      },
      foods: [
        { food: "Egg, hard boiled", serving: "1 large", amount: "147 mg", veg: false },
        { food: "Beef top round, braised", serving: "3 ounces", amount: "117 mg", veg: false },
        { food: "Soybeans, roasted", serving: "½ cup", amount: "107 mg", veg: true },
        { food: "Chicken breast, roasted", serving: "3 ounces", amount: "72 mg", veg: false },
        { food: "Cod, Atlantic, cooked", serving: "3 ounces", amount: "71 mg", veg: false },
        { food: "Potato, red, baked, flesh and skin", serving: "1 large", amount: "57 mg", veg: true },
        { food: "Wheat germ, toasted", serving: "1 ounce", amount: "51 mg", veg: true },
        { food: "Kidney beans, canned", serving: "½ cup", amount: "45 mg", veg: true },
        { food: "Quinoa, cooked", serving: "1 cup", amount: "43 mg", veg: true },
        { food: "Milk, 1% fat", serving: "1 cup", amount: "43 mg", veg: true }
      ],
      indianFoods: ["Eggs", "Chicken and fish", "Soybeans", "Rajma", "Milk and dahi"],
      indianNote: "Vegetarian diets get choline from soybeans, beans, dairy and whole grains, though in smaller amounts than eggs.",
      atRisk: [
        "Pregnant women, most of whom eat less than the reference",
        "People with certain genetic variants that raise choline needs",
        "People fed only through a drip into a vein (parenteral nutrition)"
      ],
      lowSigns: [
        "Muscle damage",
        "Liver damage",
        "Fatty liver not caused by alcohol (NAFLD)"
      ],
      lowSignsNote: "Although most people eat less than the reference, true deficiency in healthy men and non-pregnant women is very rare, because the body makes some choline.",
      tooMuch: "The US adult upper limit is 3,500 mg a day from all sources. Too much can cause a fishy body odour, vomiting, heavy sweating, low blood pressure and liver toxicity. This limit is not a target.",
      interactions: [
        { name: "No known interactions", text: "NIH lists no clinically relevant interactions between choline and medicines. Still mention any supplement to your doctor or pharmacist." }
      ],
      testing: "There is no simple routine test for choline status. A clinician looks at diet and, where relevant, liver tests.",
      foodTip: "Eggs are one of the richest everyday sources of choline."
    },
    "fibre": {
      tagline: "The plant food your gut runs on.",
      whatItIs: "Dietary fibre is the part of plant foods that your body cannot digest. It passes through the gut, where it adds bulk and feeds helpful gut bacteria.",
      keyFacts: [
        { label: "WHO daily target", value: "At least 25 g" },
        { label: "Fruit and vegetables", value: "At least 400 g" },
        { label: "Top food sources", value: "Pulses, whole grains, veg" },
        { label: "Most at risk", value: "Processed, low-plant diets" }
      ],
      does: [
        { title: "Regular digestion", text: "Adds bulk and softness to stools, helping keep bowel movements regular." },
        { title: "Feeling full", text: "Fibre-rich foods are filling and slow down digestion." },
        { title: "Healthy diets", text: "WHO advises replacing refined carbohydrates with fibre-rich whole grains, fruit, vegetables and pulses." }
      ],
      needs: {
        note: "This is a WHO target for everyone over 10 years old. Fibre from whole foods counts; WHO’s target is for naturally occurring fibre.",
        rows: [{ sex: "all", ages: "Adults", from: 18, to: null, amount: "at least 25 g a day" }]
      },
      foods: [],
      foodsHeading: "Where fibre comes from",
      limitFoods: ["Pulses: dal, chana, rajma and beans", "Whole grains: atta, oats, brown rice and millets", "Vegetables", "Whole fruit (more fibre than juice)", "Nuts and seeds"],
      indianFoods: ["Dal and chana", "Rajma", "Atta roti and daliya", "Millets: ragi, bajra, jowar", "Seasonal fruit and vegetables"],
      indianNote: "Swapping refined grains (white rice, maida) for whole grains and adding a pulse to most meals are simple ways to eat more fibre.",
      atRisk: [
        "People whose diets are mostly processed or fast foods",
        "People who eat few fruits, vegetables, pulses or whole grains",
        "People who often miss meals or eat very little"
      ],
      lowSigns: [
        "Constipation: hard or difficult-to-pass stools",
        "Going three or more days without a bowel movement",
        "Straining on the toilet"
      ],
      lowSignsNote: "Fibre isn’t measured by a blood test, and constipation has many causes, including fluids, activity and medicines. See a clinician about lasting changes in bowel habit, blood in stools or weight loss.",
      tooMuch: "There is no upper limit for fibre from food. Increasing fibre quickly can cause wind and bloating, so increase it gradually and drink enough fluid.",
      interactions: [
        { name: "Fibre supplements and medicines", text: "Supplements such as psyllium can change how some medicines are absorbed. Take them at a different time and ask your pharmacist." }
      ],
      testing: "There is no blood test for fibre. A clinician looks at diet and bowel habits, and investigates any lasting change.",
      foodTip: "Whole foods are the best sources; increase fibre gradually and drink enough fluid."
    }
  };
}(window.SUPL));
