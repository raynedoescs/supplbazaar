# Medical content review inventory

Question rebuild, 22 October 2026: all 90 questions were rewritten so that 5 always means more concern (previously protective items were reversed, which made answers cancel out and pushed most results to 5–6/10). Items now come from the risk groups and medication interactions in the cited NIH ODS fact sheets (MedlinePlus for sodium), with age, medical history and medicines asked for the first time. Every answer has its own label, every final score has its own interpretation, and the result names the answers that raised the score most. All of this needs clinical review.

Interface update, 20 October 2026: each of the ten questions uses 1–5 answer choices; the final questionnaire score runs from 1–10 (Low 1–4, Moderate 5–7, High 8–10). Affiliate links appear from 5/10, above food guidance and after the clinical callout, with any upper-limit caution directly above the buttons. These remain editorial thresholds, not clinical ones. The nutrient reference values below are unchanged.

Prepared 19 October 2026. This is an exact inventory of the v1 data for owner and clinical review, not approval for public medical use. US NIH ODS values are used for eight nutrients; sodium uses WHO guidance. Indian ICMR-NIN reconciliation and independent review remain outstanding. Public sources inform factual context, not the questionnaire weights, algorithm, bands or diagnostic validity.

Shop copy, added 21 October 2026 (for review too): every shop page shows "Supplements are not a substitute for a varied diet. If you are pregnant, breastfeeding, have a medical condition or take medication, speak to a clinician first. Check labels and never exceed the stated amount." Product pages linked to a nutrient reuse that nutrient's upper-limit caution below. Product names and descriptions are owner-entered and must avoid treatment or cure claims.

Summary rules, added 21 October 2026 (for clinical review): signed-in users see "Your summary" built from `data/summary-rules.js`. It lists the latest saved check-in per nutrient from the last 180 days with a score of 5/10 or more, highest first, plus this copy: "It is not a diagnosis or a recommendation to take anything. Talk to a clinician about anything that concerns you, especially if you are pregnant, breastfeeding, have a medical condition or take medication." Iron is `testFirst`: it shows "Get tested before considering a supplement. A clinician can advise." and no shop link. Other areas link to that nutrient's shop section only when products exist. With 3 or more areas it adds: "If you're considering supplements, ask a clinician whether a general multivitamin makes sense for you before combining single nutrients." A reviewer should confirm the threshold, the test-first list (e.g. whether vitamin D or calcium belong on it) and the multivitamin wording.

RDA means Recommended Dietary Allowance; AI means Adequate Intake; an upper limit is not a recommended dose. All daily references concern healthy adults, excluding pregnancy/lactation unless explicitly stated. No personalized dose is calculated.

Questions also name food examples beyond each food-sources list (e.g. ragi, calcium-set tofu and kale for calcium; poultry, potatoes and bananas for B6; shellfish for zinc). These are qualitative examples, not serving or nutrient-content claims. Questions name example medicines (omeprazole, pantoprazole, famotidine, metformin, furosemide, hydrochlorothiazide, theophylline, cycloserine) only to help people recognise them; no advice to change medication is given.

## Vitamin B12

- **Role:** Vitamin B12 helps your nerves work and your body make red blood cells.
- **Daily reference (verbatim):** US RDA: 2.4 micrograms (mcg) per day for adults 19+.
- **Food sources (verbatim):** Fish; Eggs; Milk and yogurt; B12-fortified cereals; B12-fortified nutritional yeast.
- **Caution level:** standard.
- **Upper-limit / caution note (verbatim):** None displayed (`null` in data).
- **General guidance:** Check labels on fortified foods; unfortified plant foods are not reliable B12 sources. Persistent symptoms deserve a clinical assessment, even with a low score.
- **Sources checked:** [NIH ODS · Vitamin B12](https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions with Medications): older adults (atrophic gastritis, H. pylori infection), pernicious anaemia, gastrointestinal disorders or surgery, vegetarian/vegan diets; gastric acid inhibitors (PPIs, H2 blockers) and metformin may reduce B12. Symptom items: neurological changes, glossitis, tiredness. Age is scored automatically from About you.

**Automatic factors from "About you" (scored, not asked):** age (weight 2; 18–29 = 1, 30–44 = 2, 45–59 = 3, 60–74 = 4, 75+ = 5).

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| b12-plant | How much of your diet is plant-based, without meat, fish, eggs or dairy? | None · A little · About half · Most · All | diet | 3 | Everyone | Plant-based diet |
| b12-food | How often do you go a whole day without fish, meat, eggs, dairy or B12-fortified foods? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without B12 foods |
| b12-acid | How often do you take medicine for acid reflux or heartburn, such as omeprazole, pantoprazole or famotidine? | Never · Rarely · Some days · Most days · Every day | medical | 3 | Everyone | Acid-reducing medicine |
| b12-metformin | Do you take metformin, a common diabetes medicine? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Metformin |
| b12-gut | Have you been diagnosed with pernicious anaemia, atrophic gastritis, coeliac or Crohn’s disease, or had stomach or bowel surgery? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Stomach or bowel condition |
| b12-hpylori | Have you ever been told you have an H. pylori stomach infection or long-term gastritis? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Stomach infection or gastritis |
| b12-tingle | How often do you notice pins and needles or numbness in your hands or feet? | Never · Rarely · Sometimes · Often · Very often | symptom | 2 | Everyone | Pins and needles |
| b12-tongue | How often does your tongue feel sore or look unusually red and smooth? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Sore tongue |
| b12-memory | How often do you find it harder than usual to remember or concentrate? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Memory or focus |
| b12-tired | How often do you feel unusually tired or weak during the day? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |

## Vitamin D

- **Role:** Vitamin D helps your body absorb calcium and supports bones and muscles.
- **Daily reference (verbatim):** US RDA: ages 19–70, 15 mcg (600 IU) per day; ages 71+, 20 mcg (800 IU) per day.
- **Food sources (verbatim):** Salmon; Trout; Egg yolks; Vitamin D-fortified milk or plant drinks; UV-exposed mushrooms.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 100 mcg (4,000 IU) per day from all sources. Too much supplemental vitamin D can raise blood calcium and damage kidneys. This limit is not a target.
- **General guidance:** Low vitamin D may cause no noticeable symptoms. Sun exposure varies with season and skin coverage; this quiz does not recommend extra sun or changing sun protection. Check fortification labels.
- **Sources checked:** [NIH ODS · Vitamin D](https://ods.od.nih.gov/factsheets/VitaminD-Consumer/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions): older adults (automatic), limited sun exposure, dark skin, conditions that limit fat absorption, obesity or gastric bypass; orlistat, statins, steroids and thiazide diuretics are listed as interacting. Breastfed infants are out of scope (adults only).

**Automatic factors from "About you" (scored, not asked):** age (weight 2; 18–29 = 1, 30–44 = 2, 45–59 = 3, 60–74 = 4, 75+ = 5).

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| d-indoors | How often do you spend almost all daylight hours indoors? | Never · Rarely · Some days · Most days · Every day | lifestyle | 3 | Everyone | Little daylight |
| d-covered | When you are outdoors in daylight, how much of your skin is usually covered by clothing? | None · A little · About half · Most · All | lifestyle | 2 | Everyone | Skin usually covered |
| d-skin | Which best describes your natural skin tone? Darker skin makes less vitamin D from the same sunlight. | Very light · Light · Medium · Dark · Very dark | background | 1 | Everyone | Skin tone |
| d-food | How often do you go a whole day without oily fish, egg yolks, UV-exposed mushrooms or vitamin D-fortified foods? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without vitamin D foods |
| d-fat | Have you been diagnosed with a condition that affects fat absorption, such as coeliac disease, Crohn’s disease, cystic fibrosis or liver disease? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Fat absorption condition |
| d-weight | Have you had weight-loss surgery, or has a doctor told you your weight is in the obese range? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Weight-loss surgery or obesity |
| d-meds | Do you regularly take steroid tablets such as prednisolone, a weight-loss medicine such as orlistat, or a thiazide-type water tablet? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Medicines that affect vitamin D |
| d-bones | How often do you notice a deep ache in your bones? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Bone ache |
| d-muscles | How often do your muscles feel weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle weakness |
| d-aches | How often do your muscles ache without an obvious reason? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle aches |

## Vitamin B6

- **Role:** Vitamin B6 helps your body use food energy and supports nerve function.
- **Daily reference (verbatim):** US RDA: ages 19–50, 1.3 mg per day; ages 51+, 1.7 mg for men and 1.5 mg for women per day.
- **Food sources (verbatim):** Chickpeas; Fish; Poultry; Potatoes; Bananas.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** Long-term excess supplemental B6 can damage nerves. The US adult upper limit is 100 mg/day from all sources; EFSA set a much lower adult limit of 12 mg/day in 2023. Neither is a recommended dose. Discuss supplements with a clinician.
- **General guidance:** Low B6 on its own is uncommon. Skin and mouth changes have many possible causes and do not establish a nutrient problem.
- **Sources checked:** [NIH ODS · Vitamin B6](https://ods.od.nih.gov/factsheets/VitaminB6-Consumer/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions): impaired renal function (incl. dialysis), autoimmune disorders, alcohol dependence; antiepileptics, theophylline and cycloserine can affect B6. Symptom items: cheilosis, glossitis, dermatitis, depression/confusion.

**Automatic factors from "About you" (scored, not asked):** none.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| b6-kidney | Has a doctor told you that your kidneys don’t work as well as they should, or are you on dialysis? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Kidney condition |
| b6-autoimmune | Do you have rheumatoid arthritis or another autoimmune condition? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Autoimmune condition |
| b6-alcohol | How often do you drink alcohol heavily, for example 5 or more drinks in one day? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Heavy drinking |
| b6-meds | Do you regularly take medicine for epilepsy or seizures, theophylline for breathing, or cycloserine for tuberculosis? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Medicines that affect B6 |
| b6-food | How often do you go a whole day without B6 foods such as chickpeas, fish, poultry, potatoes or bananas? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without B6 foods |
| b6-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| b6-lips | How often do you notice cracks at the corners of your mouth? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Cracked mouth corners |
| b6-tongue | How often does your tongue feel swollen or sore? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Sore tongue |
| b6-rash | How often do you notice an itchy, scaly skin rash? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Scaly rash |
| b6-mood | How often do you feel unusually low, irritable or confused? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Low mood or confusion |

## Magnesium

- **Role:** Magnesium supports your muscles, nerves and energy-making processes.
- **Daily reference (verbatim):** US RDA: men 19–30, 400 mg/day; men 31+, 420 mg/day; women 19–30, 310 mg/day; women 31+, 320 mg/day.
- **Food sources (verbatim):** Pumpkin seeds; Almonds; Spinach; Black beans; Whole grains.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 350 mg/day from supplements and medicines only, excluding magnesium naturally in food. Excess can cause diarrhoea; very high amounts can affect the heart. Kidney problems increase the risk.
- **General guidance:** Low intake does not necessarily mean a low blood level. Blood magnesium alone does not reliably reflect total body stores.
- **Sources checked:** [NIH ODS · Magnesium](https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions; Deficiency): gastrointestinal diseases, type 2 diabetes, alcohol dependence, older adults (automatic); diuretics and long-term PPIs lower magnesium. Deficiency symptoms: appetite loss, nausea, fatigue, weakness, numbness and tingling, cramps.

**Automatic factors from "About you" (scored, not asked):** age (weight 1; 18–29 = 1, 30–44 = 2, 45–59 = 3, 60–74 = 4, 75+ = 5).

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| mg-gut | Have you been diagnosed with Crohn’s disease, coeliac disease or another condition that causes long-term diarrhoea, or had bowel surgery? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Bowel condition |
| mg-diabetes | Do you have type 2 diabetes? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Type 2 diabetes |
| mg-alcohol | How often do you drink alcohol heavily, for example 5 or more drinks in one day? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Heavy drinking |
| mg-acid | How often do you take medicine for acid reflux or heartburn, such as omeprazole or pantoprazole? | Never · Rarely · Some days · Most days · Every day | medical | 2 | Everyone | Acid-reducing medicine |
| mg-diuretic | How often do you take water tablets (diuretics), such as furosemide or hydrochlorothiazide? | Never · Rarely · Some days · Most days · Every day | medical | 2 | Everyone | Water tablets |
| mg-food | How often do you go a whole day without nuts, seeds, beans, leafy greens or whole grains? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without magnesium foods |
| mg-tingle | How often do you notice numbness or tingling in your hands or feet? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Numbness or tingling |
| mg-cramps | How often do you get muscle cramps or twitches? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle cramps |
| mg-appetite | How often do you lose your appetite or feel sick to your stomach? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Poor appetite or nausea |
| mg-tired | How often do you feel unusually tired or weak? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |

## Calcium

- **Role:** Calcium builds bones and teeth and helps muscles and nerves work.
- **Daily reference (verbatim):** US RDA: adults 19–50 and men 51–70, 1,000 mg/day; women 51–70 and all adults 71+, 1,200 mg/day.
- **Food sources (verbatim):** Milk and yogurt; Calcium-fortified soy drink; Calcium-set tofu; Sardines with bones; Kale.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US upper limit from all sources: 2,500 mg/day for adults 19–50; 2,000 mg/day for adults 51+. Excess supplemental calcium may increase kidney-stone risk. These limits are not targets.
- **General guidance:** Low calcium intake can affect bones without obvious symptoms. Blood calcium is tightly regulated and does not measure dietary adequacy or bone stores. A clinician may need other assessments.
- **Sources checked:** [NIH ODS · Calcium](https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk): postmenopausal women (automatic from About you) and people who avoid dairy. Low bone density, fracture history, long-term steroid tablets and limited vitamin D are supporting context (reviewer to confirm). Age is automatic.

**Automatic factors from "About you" (scored, not asked):** age (weight 1; 18–29 = 1, 30–44 = 2, 45–59 = 3, 60–74 = 4, 75+ = 5); menopause, women only (weight 2; yes = 5, no = 1).

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| ca-dairy | How often do you go a whole day without milk, yogurt, cheese or a calcium-fortified alternative? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without dairy or alternatives |
| ca-avoid | Do you avoid dairy, for example because of lactose intolerance, allergy or a vegan diet? | No · Probably not · Not sure · Probably · Yes | diet | 2 | Everyone | Avoiding dairy |
| ca-plantmilk | If you drink plant milks, how often do you choose ones without added calcium? | Never / N/A · Rarely · Sometimes · Often · Always | diet | 1 | Everyone | Unfortified plant milk |
| ca-other | How often do you go a whole day without other calcium foods, such as calcium-set tofu, ragi, kale or sardines with bones? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without other calcium foods |
| ca-bones | Has a doctor told you that you have low bone density (osteopenia or osteoporosis)? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Low bone density |
| ca-indoors | How often do you spend almost all daylight hours indoors? Vitamin D from sunlight helps you absorb calcium. | Never · Rarely · Some days · Most days · Every day | lifestyle | 1 | Everyone | Little daylight |
| ca-tingle | How often do you notice tingling in your fingers or numbness around your mouth? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tingling or numbness |
| ca-cramps | How often do your muscles cramp or tighten involuntarily? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle cramps |
| ca-fracture | Have you ever broken a bone from a minor fall or bump? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Bone broken in a minor fall |
| ca-steroid | Do you take steroid tablets such as prednisolone for more than a few weeks at a time? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Long-term steroid tablets |

## Iron

- **Role:** Iron helps red blood cells carry oxygen around your body.
- **Daily reference (verbatim):** US RDA: men 19–50, 8 mg/day; women 19–50, 18 mg/day; adults 51+, 8 mg/day. These are mixed-diet references; iron from plant foods is less readily absorbed.
- **Food sources (verbatim):** Lean meat; Lentils; White beans; Iron-fortified cereals; Spinach.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 45 mg/day from all sources. Excess iron can cause serious harm; keep iron supplements away from children. Do not start iron based on a quiz result.
- **General guidance:** Pairing plant iron sources with vitamin C-containing foods can help absorption. Tiredness has many causes; a clinician can decide whether blood tests are appropriate.
- **Sources checked:** [NIH ODS · Iron](https://ods.od.nih.gov/factsheets/Iron-Consumer/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions): heavy menstrual bleeding (women), frequent blood donors, gastrointestinal disorders or surgery, cancer, heart failure; PPIs may reduce absorption; plant iron is less bioavailable. Men and anyone not answering female see a regular-painkiller question instead of heavy periods (hidden gastrointestinal blood loss; reviewer to confirm). Pregnancy and infants are out of scope.

**Automatic factors from "About you" (scored, not asked):** none.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| fe-periods | Do you have heavy periods, for example changing protection every 1–2 hours or bleeding for more than 7 days? Choose No if this doesn’t apply. | No · Probably not · Not sure · Probably · Yes | medical | 3 | Women | Heavy periods |
| fe-nsaid | Do you regularly take aspirin or anti-inflammatory painkillers such as ibuprofen or diclofenac? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone else | Regular painkillers |
| fe-donate | How often do you donate blood? | Never · Under once a year · Once a year · 2–3 a year · 4+ a year | lifestyle | 2 | Everyone | Frequent blood donation |
| fe-gut | Have you been diagnosed with a stomach or bowel condition, such as coeliac disease, Crohn’s disease or ulcers, or had stomach or bowel surgery? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Stomach or bowel condition |
| fe-condition | Are you being treated for heart failure or cancer? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Heart failure or cancer |
| fe-acid | How often do you take medicine for acid reflux or heartburn, such as omeprazole or pantoprazole? | Never · Rarely · Some days · Most days · Every day | medical | 1 | Everyone | Acid-reducing medicine |
| fe-plant | How much of your diet is plant-based, without meat, fish or poultry? | None · A little · About half · Most · All | diet | 2 | Everyone | Plant-based diet |
| fe-food | How often do you go a whole day without iron foods, such as meat, fish, beans, lentils or iron-fortified cereals? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without iron foods |
| fe-tired | How often do you feel unusually tired or weak during the day? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |
| fe-breath | How often do you get short of breath or notice your heart racing during everyday activity? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Breathlessness |
| fe-pica | How often do you crave ice, clay or other things that aren’t food? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Craving ice or non-food |

## Zinc

- **Role:** Zinc supports your immune system, wound healing and sense of taste.
- **Daily reference (verbatim):** US RDA: adult men 19+, 11 mg/day; adult women 19+, 8 mg/day.
- **Food sources (verbatim):** Oysters; Meat; Beans; Pumpkin seeds; Zinc-fortified cereals.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 40 mg/day from all sources. Too much zinc over time can lower copper levels and harm nerve and immune function. This limit is not a target.
- **General guidance:** Zinc from some plant foods is less readily absorbed. Changes in taste or smell can have many causes and should not be treated as proof of low zinc.
- **Sources checked:** [NIH ODS · Zinc](https://ods.od.nih.gov/factsheets/Zinc-Consumer/).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions): gastrointestinal disorders or bariatric surgery, vegetarian/vegan diets, alcohol use disorder; some diuretics increase zinc loss. Pregnancy/lactation, infants and children with sickle cell disease are out of scope.

**Automatic factors from "About you" (scored, not asked):** none.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| zn-gut | Have you been diagnosed with a bowel condition such as Crohn’s or coeliac disease, or had weight-loss surgery? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Bowel condition or surgery |
| zn-plant | How much of your diet is plant-based, without meat, fish or poultry? | None · A little · About half · Most · All | diet | 3 | Everyone | Plant-based diet |
| zn-alcohol | How often do you drink alcohol heavily, for example 5 or more drinks in one day? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 2 | Everyone | Heavy drinking |
| zn-diuretic | How often do you take water tablets (diuretics), such as hydrochlorothiazide? | Never · Rarely · Some days · Most days · Every day | medical | 1 | Everyone | Water tablets |
| zn-food | How often do you go a whole day without zinc foods, such as meat, shellfish, beans, seeds, dairy or zinc-fortified cereals? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without zinc foods |
| zn-diarrhoea | How often have you had diarrhoea in recent weeks? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Diarrhoea |
| zn-taste | How often does your sense of taste or smell seem weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Weaker taste or smell |
| zn-healing | How often do small cuts seem slower than usual to heal? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Slow healing |
| zn-hair | How often do you notice more hair shedding than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Hair shedding |
| zn-appetite | How often is your appetite lower than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Low appetite |

## Potassium

- **Role:** Potassium helps your nerves, muscles and fluid balance work normally.
- **Daily reference (verbatim):** US adequate intake (AI): adult men 19+, 3,400 mg/day; adult women 19+, 2,600 mg/day. An AI is a population reference, not a supplement dose.
- **Food sources (verbatim):** Potatoes; Lentils; Kidney beans; Bananas; Yogurt.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** No US upper limit has been established for potassium in healthy adults. That does not mean unlimited amounts are safe. Potassium supplements are not suitable for everyone, particularly with kidney problems or some medicines; excess can dangerously affect the heart.
- **General guidance:** A low dietary intake is different from a low blood potassium level. Fluid losses can matter. Most people already get enough sodium from food; this result is not a reason to add salt or use an electrolyte mix. Ask a clinician before supplementing.
- **Quiz note:** Fluid loss and cramps have many causes. This quiz cannot identify an electrolyte imbalance.
- **Shopping context:** Optional browsing, not a recommendation to use a product. Drink mixes vary in sodium and potassium; a clinician can advise whether one is suitable.
- **Sources checked:** [NIH ODS · Potassium](https://ods.od.nih.gov/factsheets/Potassium-Consumer/); [WHO · Sodium reduction](https://www.who.int/news-room/fact-sheets/detail/salt-reduction).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): inflammatory bowel disease, loop/thiazide diuretics and laxatives, losses from vomiting or diarrhoea, low fruit/vegetable intake. Hypokalaemia symptoms: weakness, cramps, constipation, fatigue.

**Automatic factors from "About you" (scored, not asked):** none.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| k-ibd | Have you been diagnosed with Crohn’s disease or ulcerative colitis? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Inflammatory bowel disease |
| k-diuretic | How often do you take water tablets (diuretics), such as furosemide or hydrochlorothiazide? | Never · Rarely · Some days · Most days · Every day | medical | 3 | Everyone | Water tablets |
| k-laxative | How often do you take laxatives? | Never · Rarely · Sometimes · Often · Very often | medical | 2 | Everyone | Laxatives |
| k-loss | How often have you had vomiting or watery diarrhoea in recent weeks? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Vomiting or diarrhoea |
| k-produce | How often do you go a whole day without fruit or vegetables? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without fruit or veg |
| k-beans | How often do you go a whole day without beans, lentils, potatoes or yogurt? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without other potassium foods |
| k-sweat | How often do you sweat heavily for a long time? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Heavy sweating |
| k-weak | How often do your muscles feel weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle weakness |
| k-cramps | How often do you get muscle cramps? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle cramps |
| k-bowel | How often are your bowel movements harder to pass than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Constipation |

## Sodium

- **Role:** Sodium helps regulate fluid balance and supports nerves and muscles.
- **Daily reference (verbatim):** WHO adult reduction guideline: less than 2,000 mg sodium/day, equivalent to less than 5 g salt/day from all sources. This is a limit to stay below, not a minimum or a supplementation target.
- **Food sources (verbatim):** Bread; Cheese; Packaged soups; Pickles; Table salt already used in cooking.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** Most people already get enough sodium from food, often too much. Excess sodium raises blood pressure. Do not add salt or take salt tablets because of this score. Potassium-containing electrolyte supplements are not suitable for everyone.
- **General guidance:** Low blood sodium is a water-balance issue, not simply a sign of eating too little salt. Heavy sweating, fluid loss or excessive water intake can matter, but this quiz cannot distinguish them. Never use this result to guide salt supplementation.
- **Quiz note:** Most people already get enough sodium. These questions explore fluid loss and nonspecific symptoms, not a need for more salt.
- **Shopping context:** Optional browsing only. A drink mix is not a treatment for low blood sodium. Ask a clinician whether any electrolyte product is appropriate.
- **Sources checked:** [WHO · Sodium reduction](https://www.who.int/news-room/fact-sheets/detail/salt-reduction); [NHS · Salt in your diet](https://www.nhs.uk/live-well/eat-well/food-types/salt-in-your-diet/); [MedlinePlus · Low blood sodium](https://medlineplus.gov/ency/article/000394.htm).

### Questions to review

Rebuilt 22 October 2026; About-you update 22 October 2026. All answers use 1–5 and every question runs the same way: 1 is no concern and 5 is the most (no reversed items). Weights are editorial: 3 = risk group named by the source, 2 = supporting risk factor or more specific symptom, 1 = nonspecific symptom. Not clinically validated. Every person sees exactly ten of these questions.

**Risk factors used:** MedlinePlus (Low blood sodium) and WHO: diarrhoea, vomiting, sweating, diuretics, heart failure, kidney disease, cirrhosis; drinking large amounts of water during endurance activity. No item asks about salt intake, and nothing suggests adding salt.

**Automatic factors from "About you" (scored, not asked):** none.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| na-water | During long, sweaty activity, how often do you drink large amounts of plain water beyond your thirst? | Never / N/A · Rarely · Sometimes · Often · Always | lifestyle | 3 | Everyone | Drinking beyond thirst |
| na-sweat | How often do you sweat heavily for a long time? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 2 | Everyone | Heavy sweating |
| na-loss | How often have you had vomiting or watery diarrhoea in recent weeks? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Vomiting or diarrhoea |
| na-diuretic | How often do you take water tablets (diuretics), such as hydrochlorothiazide or furosemide? | Never · Rarely · Some days · Most days · Every day | medical | 3 | Everyone | Water tablets |
| na-condition | Have you been diagnosed with heart failure, kidney disease or liver cirrhosis? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Heart, kidney or liver condition |
| na-headache | How often do you get headaches? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Headaches |
| na-appetite | How often do you lose your appetite or feel sick to your stomach? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Poor appetite or nausea |
| na-cramps | How often do you get muscle cramps, spasms or weakness? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle cramps or weakness |
| na-confused | How often do you feel confused, restless or unusually irritable? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Confusion or irritability |
| na-tired | How often do you feel unusually tired? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |

<!-- new-nutrients-2026-10-23 -->
## Folate

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Vitamins.
- **Role:** Folate (vitamin B9) helps your body make DNA and healthy red blood cells.
- **Daily reference (verbatim):** US RDA: 400 mcg DFE (dietary folate equivalents) per day for adults 19+.
- **Food sources (verbatim):** Leafy greens such as spinach; Black-eyed peas (lobia) and other beans; Lentils (dal); Asparagus and broccoli; Folate-fortified cereals.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 1,000 mcg a day of folic acid from supplements and fortified foods (natural food folate is not limited). High folic acid can hide the anaemia of low vitamin B12 while nerve damage continues. This limit is not a target.
- **General guidance:** Low folate and low vitamin B12 cause the same kind of anaemia, so it is worth taking the B12 check too. Folate needs rise before and during pregnancy; anyone who could become pregnant should ask a clinician about folic acid.
- **Shopping:** Amazon search link from 5/10: Shop folate on Amazon.
- **Sources checked (23 October 2026):** [NIH ODS · Folate](https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions): alcohol use disorder, malabsorption (coeliac disease, inflammatory bowel disease), MTHFR variant (not asked), people of childbearing age (handled by the pregnancy copy, not scored); methotrexate, antiepileptics and sulfasalazine. Symptoms: weakness, fatigue, difficulty concentrating, irritability, palpitations, shortness of breath, sore tongue, mouth ulcers.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| fo-greens | How often do you go a whole day without leafy greens, beans, lentils, peas or folate-fortified foods? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without folate foods |
| fo-alcohol | How often do you drink alcohol heavily, for example 5 or more drinks in one day? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Heavy drinking |
| fo-absorb | Have you been diagnosed with coeliac disease, Crohn’s disease, ulcerative colitis or another condition that affects how you absorb food? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Absorption condition |
| fo-meds | Do you regularly take methotrexate, sulfasalazine or a medicine for epilepsy or seizures? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Medicines that affect folate |
| fo-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| fo-meals | How often does your routine leave you missing meals? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Missed meals |
| fo-tired | How often do you feel unusually tired or weak? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |
| fo-breath | How often do you get short of breath or notice your heart racing during everyday activity? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Breathlessness or palpitations |
| fo-mouth | How often do you get a sore tongue or mouth ulcers? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Sore tongue or mouth ulcers |
| fo-focus | How often do you find it hard to concentrate or feel unusually irritable? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Poor focus or irritability |

## Vitamin C

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Vitamins.
- **Role:** Vitamin C helps your body make collagen, heal wounds and absorb plant iron.
- **Daily reference (verbatim):** US RDA: adult men 19+, 90 mg/day; adult women 19+, 75 mg/day. People who smoke need 35 mg/day more.
- **Food sources (verbatim):** Citrus fruit such as oranges; Amla and guava; Red and green peppers (capsicum); Broccoli; Strawberries and kiwifruit.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 2,000 mg a day from all sources. Large doses can cause diarrhoea, nausea and stomach cramps. This limit is not a target.
- **General guidance:** Fresh fruit and vegetables are the easiest sources; cooking and storage reduce vitamin C. Eating vitamin C foods with plant-based meals also helps you absorb iron.
- **Shopping:** Amazon search link from 5/10: Shop vitamin C on Amazon.
- **Sources checked (23 October 2026):** [NIH ODS · Vitamin C](https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): smokers and people exposed to second-hand smoke, people with limited food variety, people with malabsorption and some chronic diseases (end-stage renal disease on dialysis, some cancers). Symptoms: fatigue, petechiae and easy bruising, poor wound healing. Gum symptoms were deliberately not used (not named on the NIH page).

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| vc-fruitveg | How often do you go a whole day without any fruit or vegetables? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without fruit or veg |
| vc-rich | How often do you go a whole day without vitamin C foods such as citrus fruit, amla, guava, peppers, tomatoes or broccoli? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without vitamin C foods |
| vc-smoke | How often do you smoke? | Never · Rarely · Some days · Most days · Every day | lifestyle | 3 | Everyone | Smoking |
| vc-secondhand | How often are you around other people’s tobacco smoke? | Never · Rarely · Some days · Most days · Every day | lifestyle | 1 | Everyone | Second-hand smoke |
| vc-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 2 | Everyone | Limited variety |
| vc-kidney | Are you on kidney dialysis, or being treated for cancer? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Dialysis or cancer treatment |
| vc-absorb | Have you been diagnosed with a condition that affects how you absorb food, such as Crohn’s disease? | No · Probably not · Not sure · Probably · Yes | medical | 1 | Everyone | Absorption condition |
| vc-bruise | How often do you bruise easily or notice tiny red or purple spots on your skin? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Easy bruising |
| vc-healing | How often do small cuts seem slower than usual to heal? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Slow healing |
| vc-tired | How often do you feel unusually tired or run down? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |

## Vitamin A

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Vitamins.
- **Role:** Vitamin A supports your eyesight, immune system and healthy growth of cells.
- **Daily reference (verbatim):** US RDA: adult men 19+, 900 mcg RAE/day; adult women 19+, 700 mcg RAE/day (RAE: retinol activity equivalents).
- **Food sources (verbatim):** Carrots; Sweet potato; Spinach and other dark leafy greens; Mango; Eggs and milk.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 3,000 mcg a day of preformed vitamin A (retinol, from animal foods and supplements); beta-carotene from plants does not count. Too much preformed vitamin A can damage the liver and cause birth defects, so anyone who is or could become pregnant should not take vitamin A supplements without medical advice. This limit is not a target.
- **General guidance:** Orange and dark-green vegetables and fruit provide beta-carotene, which the body turns into vitamin A as needed. Do not start vitamin A supplements because of a check-in score.
- **Shopping:** No Amazon link. Listed as test-first in `data/summary-rules.js`.
- **Sources checked (23 October 2026):** [NIH ODS · Vitamin A](https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): limited access to foods, cystic fibrosis and other fat-malabsorption conditions (coeliac, Crohn's, pancreatic disorders). Symptoms: night blindness (first sign), xerophthalmia/dry eyes, increased infections. **Flag:** va-skin (dry or rough skin) is a nonspecific item not listed on the NIH page; reviewer to keep or replace.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| va-orange | How often do you go a whole day without orange or dark-green vegetables and fruit, such as carrots, sweet potato, spinach, pumpkin or mango? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without orange or green foods |
| va-animal | How often do you go a whole day without eggs, milk, cheese or fish? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without animal sources |
| va-access | How often are fresh vegetables, fruit, eggs or dairy too expensive or hard to get for you? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 2 | Everyone | Hard to get these foods |
| va-absorb | Have you been diagnosed with coeliac disease, Crohn’s disease, cystic fibrosis or a pancreas condition? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Absorption condition |
| va-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| va-meals | How often does your routine leave you missing meals? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Missed meals |
| va-night | How often do you find it hard to see in dim light or at night? | Never · Rarely · Sometimes · Often · Very often | symptom | 2 | Everyone | Poor night vision |
| va-dryeyes | How often do your eyes feel very dry? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Dry eyes |
| va-infections | How often do you catch infections such as colds or chest infections? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Frequent infections |
| va-skin | How often is your skin unusually dry or rough? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Dry or rough skin |

## Iodine

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Minerals.
- **Role:** Iodine is needed to make thyroid hormones, which control your metabolism.
- **Daily reference (verbatim):** US RDA: 150 micrograms (mcg) per day for adults 19+.
- **Food sources (verbatim):** Iodised salt (instead of regular salt, not more); Milk and yogurt; Eggs; Fish such as cod; Seaweed.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 1,100 mcg a day from all sources. Too much iodine can cause the same thyroid problems as too little (goitre, an underactive or overactive thyroid). This limit is not a target.
- **General guidance:** If you use salt, choose iodised salt instead of regular salt; this is not a reason to use more salt. WHO advises adults to keep salt under 5 g a day. Rock salt and some sea salts are not iodised.
- **Shopping:** No Amazon link. Listed as test-first in `data/summary-rules.js`.
- **Sources checked (23 October 2026):** [NIH ODS · Iodine](https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/); [WHO · Salt reduction](https://www.who.int/news-room/fact-sheets/detail/salt-reduction).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): people not using iodised salt, vegans and people eating few dairy products, seafood or eggs, people in iodine-deficient (often mountainous) regions, people with marginal iodine who eat goitrogens (soy, cassava, cruciferous vegetables). Signs: goitre and hypothyroidism (cold intolerance, tiredness, dry skin are standard hypothyroid signs; reviewer to confirm). Pregnancy is out of scope for scoring. Guidance pairs iodised salt with the WHO under-5 g salt limit so the result never encourages more salt.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| io-salt | How much of the salt you use at home is not iodised (for example rock salt, sea salt or pink salt)? | None · A little · About half · Most · All | diet | 3 | Everyone | Salt without iodine |
| io-dairy | How often do you go a whole day without milk, yogurt, eggs or seafood? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without iodine foods |
| io-plant | How much of your diet is plant-based, without dairy, eggs or seafood? | None · A little · About half · Most · All | diet | 2 | Everyone | Plant-based diet |
| io-region | Do you live in a hilly or mountainous area, or one known for goitre? | No · Probably not · Not sure · Probably · Yes | background | 1 | Everyone | Low-iodine area |
| io-goitrogen | How often do you eat large amounts of raw cabbage-family vegetables, soy or cassava? | Never · Rarely · Sometimes · Often · Very often | diet | 1 | Everyone | Lots of soy or raw cabbage family |
| io-neck | Have you noticed a swelling at the front of your neck? | No · Probably not · Not sure · Probably · Yes | symptom | 2 | Everyone | Neck swelling |
| io-thyroid | Has a doctor told you that your thyroid is underactive? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Underactive thyroid |
| io-cold | How often do you feel cold when others around you don’t? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Feeling cold |
| io-tired | How often do you feel unusually tired or sluggish? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |
| io-skin | How often is your skin unusually dry? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Dry skin |

## Selenium

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Minerals.
- **Role:** Selenium helps your thyroid work and protects cells from damage.
- **Daily reference (verbatim):** US RDA: 55 micrograms (mcg) per day for adults 19+.
- **Food sources (verbatim):** Brazil nuts (very high: one or two is plenty); Fish such as tuna and sardines; Eggs; Chicken and meat; Pasta and grains.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 400 mcg a day from all sources. Too much causes hair and nail loss, garlic-smelling breath, a metallic taste, rashes and nerve problems. Just 1 ounce of Brazil nuts (6–8 nuts) can contain 544 mcg, more than the upper limit. This limit is not a target.
- **General guidance:** Selenium in plant foods depends on the soil they were grown in. Low selenium rarely causes illness on its own, and because too much is harmful, testing comes before any supplement.
- **Quiz note:** Low selenium rarely causes symptoms on its own, so most of these questions are about diet and medical risk factors.
- **Shopping:** No Amazon link. Listed as test-first in `data/summary-rules.js`.
- **Sources checked (23 October 2026):** [NIH ODS · Selenium](https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk): people in selenium-deficient regions (not asked: hard for users to know), kidney dialysis, HIV. Deficiency rarely causes illness alone; Keshan and Kashin-Beck disease are regional. **Flags:** se-absorb (absorption condition) and the symptom items (tiredness, infections, muscle weakness, joint stiffness) are supporting items not listed as risk factors on the NIH page; reviewer to confirm or replace.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| se-dialysis | Are you on kidney dialysis? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Kidney dialysis |
| se-hiv | Are you living with HIV? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | HIV |
| se-plant | How much of your diet is plant-based, without meat, fish, eggs or dairy? | None · A little · About half · Most · All | diet | 2 | Everyone | Plant-based diet |
| se-food | How often do you go a whole day without fish, seafood, eggs, meat or chicken? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without selenium foods |
| se-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| se-absorb | Have you been diagnosed with a condition that affects how you absorb food, such as Crohn’s or coeliac disease? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Absorption condition |
| se-tired | How often do you feel unusually tired? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |
| se-infections | How often do you catch infections such as colds or chest infections? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Frequent infections |
| se-muscles | How often do your muscles feel weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle weakness |
| se-joints | How often do your joints feel stiff or painful? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Joint stiffness or pain |

## Copper

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Metals.
- **Role:** Copper helps your body make energy, use iron and build connective tissue.
- **Daily reference (verbatim):** US RDA: 900 micrograms (mcg) per day for adults 19+.
- **Food sources (verbatim):** Cashews and sunflower seeds; Chickpeas and tofu; Potatoes; Mushrooms; Millet and whole-wheat foods.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 10,000 mcg (10 mg) a day from all sources. Too much copper over time can damage the liver and cause stomach pain, nausea, vomiting and diarrhoea. This limit is not a target.
- **General guidance:** High-dose zinc supplements, and heavy use of zinc-containing denture creams, can block copper absorption. Low copper is uncommon, so a clinician’s check comes before any supplement.
- **Shopping:** No Amazon link. Listed as test-first in `data/summary-rules.js`.
- **Sources checked (23 October 2026):** [NIH ODS · Copper](https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): coeliac disease, high zinc intakes including zinc-containing denture creams, Menkes disease (not asked). Signs: anaemia, hypopigmentation, neutropenia/infections, neurological (myelopathy: unsteadiness, numbness). Bariatric surgery was deliberately not used (not named on the NIH copper page). **Flag:** cu-anaemia (anaemia not improving with iron) is clinical reasoning, not NIH wording; reviewer to confirm.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| cu-zinc | How often do you take zinc supplements, including zinc lozenges? | Never · Rarely · Some days · Most days · Every day | medical | 3 | Everyone | Zinc supplements |
| cu-denture | Do you use denture adhesive cream every day, or more than the packet suggests? | No · Probably not · Not sure · Probably · Yes | lifestyle | 2 | Everyone | Denture cream |
| cu-celiac | Have you been diagnosed with coeliac disease? | No · Probably not · Not sure · Probably · Yes | medical | 3 | Everyone | Coeliac disease |
| cu-food | How often do you go a whole day without nuts, seeds, chickpeas, beans, whole grains or mushrooms? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without copper foods |
| cu-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| cu-anaemia | Has a doctor told you that you have anaemia that didn’t improve with iron? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Anaemia not helped by iron |
| cu-balance | How often do you feel unsteady on your feet or notice numbness in your feet? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Unsteadiness or numbness |
| cu-infections | How often do you catch infections such as colds or chest infections? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Frequent infections |
| cu-tired | How often do you feel unusually tired or weak? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |
| cu-colour | Have you noticed your skin or hair becoming lighter in colour? | No · Probably not · Not sure · Probably · Yes | symptom | 1 | Everyone | Lighter skin or hair |

## Phosphorus

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Electrolytes.
- **Role:** Phosphorus builds bones and teeth and helps your cells store and use energy.
- **Daily reference (verbatim):** US RDA: 700 mg per day for adults 19+.
- **Food sources (verbatim):** Milk, yogurt and cheese; Lentils and kidney beans; Fish and chicken; Nuts such as cashews; Brown rice and oats.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US upper limit from all sources: 4,000 mg a day for adults 19–70 and 3,000 mg a day for adults 71+. High intakes rarely harm healthy people, but people with kidney disease often need to limit phosphorus. These limits are not targets.
- **General guidance:** Low phosphorus is almost never caused by diet alone; it usually comes from medical conditions, heavy drinking, long-term antacid use or severe under-eating. It needs a clinician’s assessment, not a supplement.
- **Quiz note:** Low phosphorus is rarely about diet. These questions look at medicines, health conditions and periods of very low eating.
- **Shopping:** No Amazon link. Listed as test-first in `data/summary-rules.js`.
- **Sources checked (23 October 2026):** [NIH ODS · Phosphorus](https://ods.od.nih.gov/factsheets/Phosphorus-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Interactions; Deficiency): severe malnutrition and refeeding, anorexia nervosa, alcohol use disorder, long-term aluminium-containing antacids, chronic conditions (COPD, cirrhosis, hyperparathyroidism, cancer), chewing or swallowing problems. Symptoms: anorexia, proximal muscle weakness, bone pain, paraesthesia, confusion. Diet alone rarely causes deficiency, so food carries weight 1.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| ph-antacid | How often do you take antacids for heartburn or indigestion, such as aluminium hydroxide or calcium carbonate tablets? | Never · Rarely · Some days · Most days · Every day | medical | 3 | Everyone | Regular antacids |
| ph-alcohol | How often do you drink alcohol heavily, for example 5 or more drinks in one day? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Heavy drinking |
| ph-undereat | How often have you eaten much less than usual for a long time, for example during illness or very strict dieting? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 3 | Everyone | Long periods of under-eating |
| ph-lowweight | Has a doctor told you that your weight is too low, or have you had an eating disorder? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Low body weight |
| ph-chew | How often do you have trouble chewing or swallowing food? | Never · Rarely · Sometimes · Often · Very often | symptom | 2 | Everyone | Trouble chewing or swallowing |
| ph-condition | Has a doctor told you that you have COPD, liver cirrhosis or an overactive parathyroid gland, or are you being treated for cancer? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Long-term medical condition |
| ph-protein | How often do you go a whole day without dairy, meat, fish, eggs, lentils or beans? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without phosphorus foods |
| ph-weak | How often do your thigh or shoulder muscles feel weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle weakness |
| ph-bones | How often do you notice an ache in your bones? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Bone ache |
| ph-tingle | How often do you notice numbness or tingling, or feel unusually confused? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tingling or confusion |

## Omega-3

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Essentials.
- **Role:** Omega-3 fats are part of every cell and support your heart, brain and eyes.
- **Daily reference (verbatim):** US Adequate Intake for ALA (the plant omega-3): adult men 19+, 1.6 g/day; adult women 19+, 1.1 g/day. No intake target is set for EPA and DHA, the omega-3s in fish.
- **Food sources (verbatim):** Oily fish such as salmon and sardines; Flaxseed (alsi) and chia seeds; Walnuts; Canola and soybean oil.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** No US upper limit is set. High doses of EPA and DHA (2 g a day or more) might increase bleeding time, which matters with blood thinners such as warfarin; Europe’s food-safety authority considers up to about 5 g a day of EPA and DHA from supplements safe long-term. Ask a clinician before combining omega-3 supplements with blood thinners.
- **General guidance:** True omega-3 deficiency is very rare in healthy people. Plant foods provide ALA; oily fish provides EPA and DHA, which the body makes only in small amounts from ALA.
- **Quiz note:** True omega-3 deficiency is very rare. This check looks at how much omega-3 you are likely to eat.
- **Result callouts (replace the blood-test wording):** Moderate: There is no routine blood test for omega-3. A clinician or dietitian can look at your diet. High: Please talk to a doctor or dietitian before starting any supplement, especially if you take a blood thinner. Detail: Omega-3 levels can be measured, but there are no agreed cut-offs. A clinician looks at your diet, health and medicines together.
- **Shopping:** Amazon search link from 5/10: Shop omega-3 on Amazon.
- **Sources checked (23 October 2026):** [NIH ODS · Omega-3 fatty acids](https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Deficiency; Intakes): classical deficiency is virtually nonexistent in healthy people; signs are rough, scaly skin and dermatitis. Items therefore estimate intake (oily fish, plant ALA sources, plant-only diet, very low-fat diet) plus fat malabsorption. **Flags:** o3-plant, o3-lowfat and o3-absorb are reasoned from the fat-soluble nature of omega-3s rather than an NIH risk-group list; reviewer to confirm. The upper-limit note cites EFSA (about 5 g/day EPA+DHA) as reported on the NIH page.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| o3-fish | How often do you go a whole week without eating oily fish, such as salmon, sardines, mackerel or herring? | Never · Rarely · Sometimes · Often · Very often | diet | 3 | Everyone | Little oily fish |
| o3-ala | How often do you go a whole day without plant omega-3 sources such as flaxseed, chia seeds, walnuts, or canola or soybean oil? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without plant omega-3 |
| o3-plant | How much of your diet is plant-based, without fish or seafood? | None · A little · About half · Most · All | diet | 2 | Everyone | No fish or seafood |
| o3-lowfat | How often do you follow a very low-fat diet? | Never · Rarely · Sometimes · Often · Very often | diet | 2 | Everyone | Very low-fat diet |
| o3-absorb | Have you been diagnosed with a condition that affects fat absorption, such as Crohn’s or coeliac disease, cystic fibrosis, or a pancreas or liver condition? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Fat absorption condition |
| o3-shellfish | How often do you go a whole week without any fish or shellfish at all? | Never · Rarely · Sometimes · Often · Very often | diet | 1 | Everyone | No fish or shellfish |
| o3-nuts | How often do you go a whole day without nuts or seeds? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without nuts or seeds |
| o3-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| o3-meals | How often does your routine leave you missing meals? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Missed meals |
| o3-skin | How often is your skin rough, dry and scaly, or itchy and inflamed? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Rough, scaly skin |

## Choline

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Essentials.
- **Role:** Choline helps build cell membranes and make a key brain messenger.
- **Daily reference (verbatim):** US Adequate Intake: adult men 19+, 550 mg/day; adult women 19+, 425 mg/day.
- **Food sources (verbatim):** Eggs; Fish and chicken; Soybeans; Kidney beans (rajma); Milk and yogurt.
- **Caution level:** high.
- **Upper-limit / caution note (verbatim):** US adult upper limit: 3,500 mg a day from all sources. Too much can cause a fishy body odour, vomiting, heavy sweating, low blood pressure and liver toxicity. This limit is not a target.
- **General guidance:** Most people eat less choline than the reference, but true deficiency is rare in healthy men and non-pregnant women because the body also makes some. Eggs are one of the richest everyday sources.
- **Quiz note:** True choline deficiency is rare in healthy people. This check mostly looks at how much choline you are likely to eat.
- **Result callouts (replace the blood-test wording):** Moderate: There is no simple routine test for choline. A clinician or dietitian can look at your diet. High: Please talk to a doctor or dietitian before starting any supplement. Detail: A clinician looks at your diet and, where relevant, liver tests.
- **Shopping:** Amazon search link from 5/10: Shop choline on Amazon.
- **Sources checked (23 October 2026):** [NIH ODS · Choline](https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** NIH ODS (Groups at Risk; Deficiency): pregnant women (out of scope for scoring), people with certain genetic variants (not asked), people on parenteral nutrition (not asked: adults using this would be under clinical care). Deficiency causes muscle damage, liver damage and NAFLD; it is rare in healthy men and non-pregnant women. Items estimate intake of the richest sources (eggs, meat, fish) plus NAFLD.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| ch-eggs | How often do you go a whole day without eggs, meat, fish or chicken? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without eggs, meat or fish |
| ch-plant | How much of your diet is plant-based, without meat, fish, eggs or dairy? | None · A little · About half · Most · All | diet | 2 | Everyone | Plant-based diet |
| ch-soy | How often do you go a whole day without soybeans, milk, yogurt or paneer? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without soy or dairy |
| ch-beans | How often do you go a whole day without beans, potatoes or whole grains? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without beans or grains |
| ch-access | How often are eggs, meat, fish or dairy too expensive or hard to get for you? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Hard to get these foods |
| ch-liver | Has a doctor told you that you have fatty liver that is not caused by alcohol? | No · Probably not · Not sure · Probably · Yes | medical | 2 | Everyone | Fatty liver |
| ch-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| ch-meals | How often does your routine leave you missing meals? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Missed meals |
| ch-muscle | How often do your muscles ache or feel weaker than usual? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Muscle aches or weakness |
| ch-tired | How often do you feel unusually tired? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Tiredness |

## Fibre

- **Added:** 23 October 2026 (owner approved more nutrients per section). Category: Essentials.
- **Role:** Fibre keeps digestion regular and is found in plant foods.
- **Daily reference (verbatim):** WHO: at least 25 g of naturally occurring dietary fibre a day for everyone over 10, plus at least 400 g of fruit and vegetables.
- **Food sources (verbatim):** Pulses: dal, chana, rajma; Whole grains: atta, oats, millets; Vegetables; Whole fruit; Nuts and seeds.
- **Caution level:** standard.
- **Upper-limit / caution note (verbatim):** None displayed (`null` in data).
- **General guidance:** Increase fibre gradually and drink enough fluid as you do. Whole foods are the best sources; fibre supplements are not a substitute for them.
- **Quiz note:** Fibre isn’t measured by a blood test. This check looks at how much fibre you are likely to eat and how your digestion feels.
- **Result callouts (replace the blood-test wording):** Moderate: Fibre has no blood test. A clinician or dietitian can look at your diet and digestion. High: Please talk to a doctor or dietitian before starting a fibre supplement. Detail: Constipation has many causes, including fluids, activity and medicines. See a clinician about blood in your stools, weight loss or a lasting change in bowel habit.
- **Shopping context:** Optional browsing, not a recommendation. Fibre supplements are not a substitute for fibre-rich foods; take them with plenty of water and at a different time from medicines.
- **Shopping:** Amazon search link from 5/10: Browse fibre supplements on Amazon.
- **Sources checked (23 October 2026):** [WHO · Healthy diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet).

### Questions to review

Written 23 October 2026. Same rules as the other nutrients: answers 1–5, 1 is no concern and 5 the most, no reversed items; weights 3 = risk group named by the source, 2 = supporting factor or more specific symptom, 1 = nonspecific item. Not clinically validated. No sex-specific variants and no automatic age or menopause factor.

**Risk factors used:** WHO Healthy diet fact sheet: at least 25 g/day naturally occurring dietary fibre for everyone over 10 and at least 400 g fruit and vegetables; replace refined grains with whole grains, eat pulses, limit processed foods. Constipation items (hard stools, 3+ days without a bowel movement) are standard clinical descriptions of constipation, not WHO wording. **Flag:** fb-juice (juice instead of whole fruit) is a reasoned item; reviewer to confirm. There is no blood test, so fibre (like omega-3 and choline) replaces the standard blood-test callout with its own `moderateCallout`, `highCallout` and `testContext` (quoted below). The shared 1–10 interpretations still say "low levels"; for these three that means low intake, and a reviewer may want dedicated wording.

| ID | Question | Answers 1 → 5 | Kind | Weight | Shown to | Shown as (score driver) |
|---|---|---|---|---|---|---|
| fb-veg | How often do you go a whole day without vegetables or fruit? | Never · Rarely · Some days · Most days · Every day | diet | 3 | Everyone | Days without fruit or veg |
| fb-pulses | How often do you go a whole day without dal, beans, chana or other pulses? | Never · Rarely · Some days · Most days · Every day | diet | 2 | Everyone | Days without pulses |
| fb-refined | How much of the grain you eat is refined (white rice, maida, white bread) rather than whole grain? | None · A little · About half · Most · All | diet | 2 | Everyone | Mostly refined grains |
| fb-processed | How often do your meals come from packaged foods, fast food or ready meals? | Never · Rarely · Sometimes · Often · Very often | diet | 2 | Everyone | Processed or fast food |
| fb-nuts | How often do you go a whole day without nuts or seeds? | Never · Rarely · Some days · Most days · Every day | diet | 1 | Everyone | Days without nuts or seeds |
| fb-juice | When you have fruit, how often is it juice rather than whole fruit? | Never / N/A · Rarely · Sometimes · Often · Always | diet | 1 | Everyone | Juice instead of whole fruit |
| fb-variety | How varied are the foods you eat across a usual week? | Very varied · Varied · Somewhat · Limited · Very limited | diet | 1 | Everyone | Limited variety |
| fb-meals | How often does your routine leave you missing meals? | Never · Rarely · Sometimes · Often · Very often | lifestyle | 1 | Everyone | Missed meals |
| fb-hard | How often are your bowel movements hard or difficult to pass? | Never · Rarely · Sometimes · Often · Very often | symptom | 2 | Everyone | Hard stools |
| fb-rare | How often do you go 3 or more days without a bowel movement? | Never · Rarely · Sometimes · Often · Very often | symptom | 1 | Everyone | Infrequent bowel movements |
<!-- /new-nutrients-2026-10-23 -->

## Cross-cutting medical copy

- **disclaimer:** For awareness only. Not a diagnosis or medical advice.
- **limitation:** This questionnaire cannot measure nutrient levels. Its score is unvalidated, not a clinical probability. A low score cannot rule out low levels.
- **moderateCallout:** A blood test is the only way to confirm.
- **highCallout:** Please see a doctor or get a blood test before starting any supplement.
- **testContext:** A clinician can decide which tests are useful and interpret them with your symptoms and diet. Blood tests do not always reflect the body's nutrient stores.
- **reference:** General healthy-adult daily reference, not a supplement dose. Needs vary by age and life stage. Upper limits are not intake targets.
- **safety:** If symptoms persist or worry you, speak to a clinician regardless of your score. For severe or sudden symptoms, seek urgent medical care.
- **interpretation 1/10:** Your answers don’t match the usual risk factors for low levels. That can’t rule them out, but nothing here stands out.
- **interpretation 2/10:** Your answers match very few of the usual risk factors for low levels. A low score can’t rule them out.
- **interpretation 3/10:** Your answers match a few minor risk factors. Overall that suggests a lower likelihood of low levels, though it can’t rule them out.
- **interpretation 4/10:** Some of your answers match common risk factors, but most don’t. That suggests a lower likelihood of low levels; keep an eye on any symptoms that persist.
- **interpretation 5/10:** Your answers show a mix of risk factors. That suggests a possible higher likelihood of low levels; a clinical assessment can help.
- **interpretation 6/10:** Several of your answers match common risk factors. That suggests a possible higher likelihood of low levels; a clinical assessment can help.
- **interpretation 7/10:** Many of your answers match common risk factors. That suggests a higher likelihood of low levels that is worth discussing with a clinician.
- **interpretation 8/10:** Most of your answers match common risk factors. That suggests a higher likelihood of low levels; a clinical assessment is the next step.
- **interpretation 9/10:** Nearly all of your answers match common risk factors. That suggests a higher likelihood of low levels; please arrange a clinical assessment.
- **interpretation 10/10:** Your answers match the common risk factors very strongly. That suggests a higher likelihood of low levels; please see a clinician before considering any supplement.
- **driversIntro:** What raised your score most: (followed by up to three question topics, largest contribution first; only answers of 3 or higher count)
- **driversNone:** None of your answers raised the score much.

## Learn library and About you (added 22 October 2026)

**About you** (shown before the first check-in, kept in memory only): sex at birth (Female / Male / Prefer not to say), age group (18–29, 30–44, 45–59, 60–74, 75 and over; "Under 18" is turned away with advice to see a clinician), and for women pregnancy/breastfeeding and menopause. Pregnancy or breastfeeding shows: "This check isn’t designed for pregnancy or breastfeeding, when needs change. Please talk to your clinician about supplements. You can continue to learn, but the result won’t reflect pregnancy." The result page shows the daily reference for the person's own row, taken from the Learn tables. The age group, sex and (for women) menopause are saved with a check-in only after consent; pregnancy is never saved.

**Learn library** (`data/learn.js`, route `#/learn`): a plain-language guide per nutrient (what it is, what it does, who is at risk, signs of low levels, too much, medicines, testing, food sources). Numbers (daily references, upper limits, food amounts) are copied from the NIH ODS fact sheets (WHO for sodium); everything else is paraphrased. The validator checks that every number in the reference table appears in the nutrient's own reference text and that upper limits agree with the result page. **A clinician should still review:**

- The "Common in Indian kitchens" lists (ragi and til for calcium, dahi/paneer for B12, fortified oils for vitamin D, etc.). They are qualitative: no amounts are given.
- Statements beyond the NIH text: vitamin D "bone pain and muscle weakness" in osteomalacia; low-calcium tingling and cramps; zinc "changes in taste or smell"; iron "cravings for ice or non-food items" and "feeling unusually cold"; B6 and vitamin D testing descriptions; the vitamin D statin line; the lithium–calcium line; "Most of it forms bones and teeth".
- New questions: b12-hpylori, d-meds, mg-tingle, ca-fracture, ca-steroid, fe-nsaid (and the choice to show it instead of heavy periods to men and to anyone who prefers not to say).
- The automatic age and menopause factors and their weights.
- All reference values are US/WHO figures and have not been reconciled with ICMR-NIN guidance.

## Review decisions still needed

- Verify adult references and safety limits against NIH ODS and the applicable ICMR-NIN guidance for India. Values are not interchangeable across agencies or life stages.
- Review all questions (190 since 23 October 2026), especially overlapping symptom items and general food-access proxies. These can create false reassurance or unnecessary concern.
- Review whether a numerical score and score-triggered commercial links are appropriate before public release. The present score is an unvalidated product prototype.
- Confirm the wording about blood tests: measurement of blood levels differs from assessment of total body stores and dietary adequacy.
- Confirm electrolyte safety and commercial-search destinations; a high score never establishes a need for salt, potassium or a drink mix.
