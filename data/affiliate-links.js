// OWNER: Replace YOUR-TAG-21 with your Amazon India Associate tag, or paste your
// own tagged URLs. Add 1–3 { label, url } entries under a nutrient's exact id.
// Save this file and redeploy. There is deliberately no browser admin panel.
(function (S) {
  "use strict";
  S.affiliate = {
    disclosure: "As an Amazon Associate I earn from qualifying purchases.",
    links: {
      "vitamin-b12": [{ label: "Shop vitamin B12 on Amazon", url: "https://www.amazon.in/s?k=vitamin+b12&tag=YOUR-TAG-21" }],
      "vitamin-d": [{ label: "Shop vitamin D on Amazon", url: "https://www.amazon.in/s?k=vitamin+d&tag=YOUR-TAG-21" }],
      "vitamin-b6": [{ label: "Shop vitamin B6 on Amazon", url: "https://www.amazon.in/s?k=vitamin+b6&tag=YOUR-TAG-21" }],
      "magnesium": [{ label: "Shop magnesium on Amazon", url: "https://www.amazon.in/s?k=magnesium&tag=YOUR-TAG-21" }],
      "calcium": [{ label: "Shop calcium on Amazon", url: "https://www.amazon.in/s?k=calcium&tag=YOUR-TAG-21" }],
      "iron": [{ label: "Shop iron on Amazon", url: "https://www.amazon.in/s?k=iron+supplement&tag=YOUR-TAG-21" }],
      "zinc": [{ label: "Shop zinc on Amazon", url: "https://www.amazon.in/s?k=zinc+supplement&tag=YOUR-TAG-21" }],
      "potassium": [{ label: "Browse electrolyte drink mixes on Amazon", url: "https://www.amazon.in/s?k=electrolyte+drink+mix&tag=YOUR-TAG-21" }],
      "sodium": [{ label: "Browse electrolyte drink mixes on Amazon", url: "https://www.amazon.in/s?k=electrolyte+drink+mix&tag=YOUR-TAG-21" }],
      "folate": [{ label: "Shop folate on Amazon", url: "https://www.amazon.in/s?k=folate+supplement&tag=YOUR-TAG-21" }],
      "vitamin-c": [{ label: "Shop vitamin C on Amazon", url: "https://www.amazon.in/s?k=vitamin+c&tag=YOUR-TAG-21" }],
      "omega-3": [{ label: "Shop omega-3 on Amazon", url: "https://www.amazon.in/s?k=omega+3&tag=YOUR-TAG-21" }],
      "choline": [{ label: "Shop choline on Amazon", url: "https://www.amazon.in/s?k=choline+supplement&tag=YOUR-TAG-21" }],
      "fibre": [{ label: "Browse fibre supplements on Amazon", url: "https://www.amazon.in/s?k=psyllium+husk&tag=YOUR-TAG-21" }]
    }
  };
  Object.keys(S.affiliate.links).forEach(function (id) {
    S.affiliate.links[id].forEach(function (link) {
      if (link.url.includes("YOUR-TAG")) console.warn("Supl: replace the placeholder Amazon affiliate tag for " + id + ".");
    });
  });
}(window.SUPL));
