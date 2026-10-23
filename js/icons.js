// Supl line icons: 24 × 24 grid, drawn with currentColor strokes so they follow the text colour.
// Inline SVG keeps the site dependency-free, offline-capable and working from file://.
// Data entries (categories, nutrients, shop categories, products) can name any icon below.
(function (root) {
  "use strict";
  var S = root.SUPL = root.SUPL || {};
  var dot = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r=".9" fill="currentColor" stroke="none"/>'; };
  S.icons = {
    // Interface
    check: '<path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><rect x="9" y="2.5" width="6" height="3.5" rx="1"/><path d="M9 13.5l2 2 4-4.5"/>',
    bag: '<path d="M5 8h14l-1.1 12.1a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9L5 8z"/><path d="M9 10.5V6.5a3 3 0 0 1 6 0v4"/>',
    retake: '<path d="M20 12a8 8 0 1 1-2.35-5.65"/><path d="M20 4v5h-5"/>',
    home: '<path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="11" r="2"/>',
    book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H7a2 2 0 0 0-2 2V4.5z"/><path d="M5 20a2 2 0 0 0 2 2h12v-4"/>',
    sort: '<path d="M7 4v16"/><path d="M4 17l3 3 3-3"/><path d="M17 20V4"/><path d="M14 7l3-3 3 3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/>' + dot(12, 7.8),
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    chart: '<path d="M4 20h16"/><rect x="5.5" y="12" width="3" height="5"/><rect x="10.5" y="8" width="3" height="9"/><rect x="15.5" y="4.5" width="3" height="12.5"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6.5L5.2 18a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3L14 9.5V3"/><path d="M7.5 15h9"/>',
    tag: '<path d="M3 12.5V4a1 1 0 0 1 1-1h8.5L21 11.5 12.5 20 3 12.5z"/>' + dot(7.8, 7.8),
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    download: '<path d="M12 4v11"/><path d="M7 10.5l5 5 5-5"/><path d="M5 20h14"/>',
    logout: '<path d="M10 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M15 8l4 4-4 4"/><path d="M19 12H9"/>',
    trash: '<path d="M4 7h16"/><path d="M9.5 7V4h5v3"/><path d="M6.5 7l1 13h9l1-13"/>',
    leaf: '<path d="M5 19C5 11 10 5 20 4c-1 10-7 15-15 15z"/><path d="M5 19l8.5-8.5"/>',
    // Categories
    capsule: '<rect x="2.6" y="8.6" width="18.8" height="6.8" rx="3.4" transform="rotate(-45 12 12)"/><path d="M9.6 9.6l4.8 4.8"/>',
    crystal: '<path d="M8 3.5h8l4 5.5-8 11.5L4 9l4-5.5z"/><path d="M4 9h16"/><path d="M10 9l2 11.5L14 9l-2-5.5L10 9z"/>',
    ingot: '<path d="M2.5 19l3-7.5h13l3 7.5h-19z"/><path d="M6.5 11.5L8.5 6h7l2 5.5"/>',
    drop: '<path d="M12 3c3.6 4.6 6 8 6 11a6 6 0 0 1-12 0c0-3 2.4-6.4 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    // Nutrients added 23 October 2026
    sprout: '<path d="M12 21v-9"/><path d="M12 12C12 8 9.5 5.5 5 5.5c0 4.5 2.5 6.5 7 6.5z"/><path d="M12 14c0-3.5 2.2-6 6.5-6 0 4-2.4 6-6.5 6z"/><path d="M8 21h8"/>',
    citrus: '<circle cx="12" cy="12" r="8.5"/><path d="M12 5.5v13M6.4 8.8l11.2 6.4M6.4 15.2l11.2-6.4"/>',
    carrot: '<path d="M16.5 7.5c-1.6-1.6-4.2-1.3-5.7.3L4.2 19.2c-.4.5.1 1 .6.6l11.4-6.6c1.7-1.5 1.9-4.1.3-5.7z"/><path d="M16.5 7.5L20 4M16.5 7.5c.4-1.7 0-3-1-4M16.5 7.5c1.7-.4 3 0 4 1"/><path d="M8.5 14l1.5 1.5M11.5 10.5l1.2 1.2"/>',
    wave: '<path d="M3 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/><path d="M3 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/><path d="M3 19c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/>',
    nut: '<path d="M12 3.5c-5 2-8 10.5-7 15 3 1.5 11 1.5 14 0 1-4.5-2-13-7-15z"/><path d="M12 3.5v15.8"/>',
    coin: '<ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/><path d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5"/>',
    bone: '<path d="M16.8 10.2c.7-.7 1.7 0 2.6 0a2.5 2.5 0 1 0-.1-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .9.7 1.8 0 2.6l-6.6 6.5c-.7.7-1.7 0-2.6 0a2.5 2.5 0 1 0 .1 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.9-.7-1.8 0-2.6z"/>',
    softgel: '<rect x="3.5" y="8" width="17" height="8" rx="4" transform="rotate(-35 12 12)"/><path d="M8.6 11.2c.3-1 1.1-1.8 2.1-2.3"/>',
    egg: '<path d="M12 3c3.5 0 6.5 5.5 6.5 10a6.5 6.5 0 0 1-13 0C5.5 8.5 8.5 3 12 3z"/>',
    grain: '<path d="M12 21V8"/><path d="M12 12c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 12c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M12 16.5c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 16.5c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M12 8c-1.2-1-1.2-3 0-5 1.2 2 1.2 4 0 5z"/>',
    bottle: '<rect x="8" y="2.5" width="8" height="3" rx="1"/><path d="M7 8a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 17 8v12a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20V8z"/><path d="M7 11h10v6H7"/>',
    // Nutrients
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    fish: '<path d="M21 12c-2-3.5-5-5.5-8-5.5S7.6 8.6 6 12c1.6 3.4 4 5.5 7 5.5s6-2 8-5.5z"/><path d="M6 12L2.5 8.5v7L6 12z"/>' + dot(16.3, 10.8),
    bowl: '<path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z"/><circle cx="8.5" cy="9" r="1.6"/><circle cx="12" cy="7.5" r="1.6"/><circle cx="15.5" cy="9" r="1.6"/>',
    almond: '<path d="M12 3c4 3 5.5 7 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 10 8 6 12 3z"/><path d="M12 8v8.5"/>',
    milk: '<path d="M6 3h12l-1.5 17.1a1 1 0 0 1-1 .9h-7a1 1 0 0 1-1-.9L6 3z"/><path d="M6.6 9.5c2-1 3.5 1 5.4 0s3.4-1 5.4 0"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
    potato: '<path d="M7 5c3-2 8-1.5 11 1.5s3 8.5 0 11.5-9 3.5-12 .5S4 7 7 5z"/>' + dot(10, 9) + dot(14.5, 12.5) + dot(10.5, 15),
    salt: '<path d="M8 9.5h8l1 10.6a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9l1-10.6z"/><path d="M8 9.5C8 6.5 9.6 4 12 4s4 2.5 4 5.5"/>' + dot(10.8, 6.8) + dot(13.2, 6.8)
  };
  // Returns decorative markup; the adjacent text always carries the meaning.
  S.icon = function (name, className) {
    var body = S.icons[name];
    if (!body) return "";
    return '<svg class="icon' + (className ? " " + className : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  };
}(typeof window !== "undefined" ? window : globalThis));
