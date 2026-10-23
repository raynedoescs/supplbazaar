(function (S) {
  "use strict";
  // These are browsing groups, not mutually exclusive scientific classifications.
  S.categories = [
    { id: "vitamins", name: "Vitamins", icon: "capsule", blurb: "Little things. Essential roles.", accent: "#ffe34b", tint: "#fffced", onAccent: "#111111", order: 1 },
    { id: "minerals", name: "Minerals", icon: "crystal", blurb: "Your everyday building blocks.", accent: "#b5e6a2", tint: "#f3faef", onAccent: "#111111", order: 2 },
    { id: "metals", name: "Metals", icon: "ingot", blurb: "Small amounts. Big responsibilities.", accent: "#fa7465", tint: "#fff4f1", onAccent: "#111111", order: 3 },
    { id: "electrolytes", name: "Electrolytes", icon: "drop", blurb: "Keep your balance in check.", accent: "#91bafa", tint: "#f1f6ff", onAccent: "#111111", order: 4 },
    { id: "essentials", name: "Essentials", icon: "softgel", blurb: "Healthy fats, choline and fibre.", accent: "#c9b8f5", tint: "#f7f4fe", onAccent: "#111111", order: 5 }
  ];
}(window.SUPL));
