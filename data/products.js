// OWNER: This is the only file you edit to add, change or remove shop products.
// 1. Copy one complete product { ... } below, paste it into S.products, and change every field.
//    Keep commas between products. Each id must be unique, lowercase and hyphenated.
// 2. Photo (optional): put the image in images/products/ and set image: "images/products/name.jpg".
//    Square images look best. Without a photo, a coloured placeholder tile is shown.
// 3. Delete the example products (sample: true) before launch.
// 4. Save, run `node tests/validate-data.js`, and redeploy.
// Product text must stay factual: no claims to treat, cure or prevent any condition.
(function (S) {
  "use strict";
  S.shop = {
    // Shop filters. These are separate from the check-in categories, so you can add
    // shop-only groups (protein, multivitamins...) without touching the quizzes.
    categories: [
      { id: "vitamins", name: "Vitamins", icon: "capsule", accent: "#ffe34b", tint: "#fffced", onAccent: "#111111", order: 1 },
      { id: "minerals", name: "Minerals", icon: "crystal", accent: "#b5e6a2", tint: "#f3faef", onAccent: "#111111", order: 2 },
      { id: "electrolytes", name: "Hydration", icon: "drop", accent: "#91bafa", tint: "#f1f6ff", onAccent: "#111111", order: 3 },
      { id: "everyday", name: "Everyday essentials", icon: "bottle", accent: "#fa7465", tint: "#fff4f1", onAccent: "#111111", order: 4 }
    ]
  };

  // Product fields:
  //   id, name, category (a shop category id above), price (₹, number), buyUrl (https link)
  //   Optional: mrp (₹, higher than price, shown struck through), size ("60 tablets"),
  //   badge ("New", "Bestseller"), image, description, highlights ["...", "..."],
  //   nutrients ["vitamin-d"] (links the product to a check-in and shows its caution),
  //   icon (placeholder icon name from js/icons.js; defaults to the linked nutrient or category icon),
//   bestSeller (true to show the product under "Our best sellers" on the home page; tick only products that really sell best.
//   Until any product is ticked, the first four products are shown there),
//   buyLabel (button text; Amazon links default to "Buy on Amazon"), added ("YYYY-MM-DD", for Newest sort).
  // Featured order is the order of this list.
  S.products = [
    {
      id: "example-vitamin-d3", sample: true, name: "Vitamin D3 tablets", category: "vitamins",
      size: "60 tablets", price: 399, mrp: 449, badge: "Example",
      description: "Example listing. Replace it with a real product, its label details and your link.",
      highlights: ["Check the label for the amount per tablet", "Store away from heat and children"],
      nutrients: ["vitamin-d"], added: "2026-10-21",
      buyUrl: "https://www.amazon.in/s?k=vitamin+d3&tag=YOUR-TAG-21"
    },
    {
      id: "example-vitamin-b12", sample: true, name: "Vitamin B12 tablets", category: "vitamins",
      size: "60 tablets", price: 349, badge: "Example",
      description: "Example listing. Replace it with a real product, its label details and your link.",
      nutrients: ["vitamin-b12"], added: "2026-10-21",
      buyUrl: "https://www.amazon.in/s?k=vitamin+b12&tag=YOUR-TAG-21"
    },
    {
      id: "example-magnesium", sample: true, name: "Magnesium tablets", category: "minerals",
      size: "60 tablets", price: 549, mrp: 599, badge: "Example",
      description: "Example listing. Replace it with a real product, its label details and your link.",
      nutrients: ["magnesium"], added: "2026-10-21",
      buyUrl: "https://www.amazon.in/s?k=magnesium&tag=YOUR-TAG-21"
    },
    {
      id: "example-calcium", sample: true, name: "Calcium tablets", category: "minerals",
      size: "60 tablets", price: 299, badge: "Example",
      description: "Example listing. Replace it with a real product, its label details and your link.",
      nutrients: ["calcium"], added: "2026-10-20",
      buyUrl: "https://www.amazon.in/s?k=calcium&tag=YOUR-TAG-21"
    },
    {
      id: "example-electrolyte-mix", sample: true, name: "Electrolyte drink mix", icon: "drop", category: "electrolytes",
      size: "20 sachets", price: 299, mrp: 349, badge: "Example",
      description: "Example listing. Drink mixes vary in sodium and potassium; replace with a real product and its label details.",
      nutrients: ["potassium", "sodium"], added: "2026-10-20",
      buyUrl: "https://www.amazon.in/s?k=electrolyte+drink+mix&tag=YOUR-TAG-21"
    },
    {
      id: "example-multivitamin", sample: true, name: "Daily multivitamin", category: "everyday",
      size: "30 tablets", price: 499, badge: "Example",
      description: "Example listing. Replace it with a real product, its label details and your link.",
      added: "2026-10-19",
      buyUrl: "https://www.amazon.in/s?k=multivitamin&tag=YOUR-TAG-21"
    }
  ];

  S.products.forEach(function (p) {
    if (p.sample) console.warn("Supl: example shop product " + p.id + " is still listed; replace or delete it before launch.");
  });
}(window.SUPL));
