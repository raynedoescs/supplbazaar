// TEST ONLY: an in-browser stand-in for the Supabase client, used by tests/mock.html to exercise
// the account UI without a real project. Never register this file in index.html.
// Behaviour: emails starting "instant" sign in straight after sign-up; others "confirm" by email first.
// Password for seeded user test@example.com is "password1". Data persists in localStorage ("supl.mock.*").
(function (root) {
  "use strict";
  var S = root.SUPL = root.SUPL || {};
  var DB = "supl.mock.db", SESSION = "supl.mock.session";
  function load() {
    try { return JSON.parse(localStorage.getItem(DB)) || null; } catch (_) { return null; }
  }
  var db = load() || { users: { "test@example.com": { id: "u-test", password: "password1", confirmed: true, provider: "email" } }, profiles: {}, checkins: [] };
  var session = null;
  try { session = JSON.parse(localStorage.getItem(SESSION)); } catch (_) { session = null; }
  var listeners = [];
  function save() { localStorage.setItem(DB, JSON.stringify(db)); }
  function setSession(next) { session = next; if (next) localStorage.setItem(SESSION, JSON.stringify(next)); else localStorage.removeItem(SESSION); listeners.forEach(function (fn) { fn(session); }); }
  function later(fn) { return new Promise(function (resolve, reject) { setTimeout(function () { try { resolve(fn()); } catch (e) { reject(e); } }, 120); }); }
  function fail(code, message) { var e = new Error(message); e.code = code; return e; }
  function me() { if (!session) throw fail("signed_out", "Please sign in again."); return session.user; }
  S.backendMock = {
    status: "on",
    user: function () { return session && session.user; },
    onChange: function (fn) { listeners.push(fn); },
    getSession: function () { return Promise.resolve(session); },
    signUp: function (email, password) {
      return later(function () {
        if (db.users[email]) throw fail("user_exists", "An account with this email already exists. Try signing in.");
        db.users[email] = { id: "u-" + Date.now(), password: password, confirmed: true, provider: "email" };
        save();
        if (/^instant/.test(email)) { setSession({ user: { id: db.users[email].id, email: email, provider: "email" } }); return { signedIn: true }; }
        return { confirmEmail: true };
      });
    },
    signIn: function (email, password) {
      return later(function () {
        var u = db.users[email];
        if (!u || u.password !== password) throw fail("invalid_credentials", "That email and password don’t match. Try again or reset your password.");
        setSession({ user: { id: u.id, email: email, provider: u.provider } });
        return { signedIn: true };
      });
    },
    googleUrl: function (redirectTo) { return Promise.resolve(redirectTo + "&code=mock-google-code"); },
    exchangeCode: function (code) {
      return later(function () {
        if (code !== "mock-google-code") throw fail("link_expired", "That sign-in link has expired or was opened in a different browser. Please try again.");
        var email = "google.user@example.com";
        db.users[email] = db.users[email] || { id: "u-google", password: null, confirmed: true, provider: "google" };
        save();
        setSession({ user: { id: db.users[email].id, email: email, provider: "google" } });
        return { signedIn: true };
      });
    },
    resetPassword: function () { return later(function () { return { sent: true }; }); },
    updatePassword: function (password) { return later(function () { var u = me(); Object.keys(db.users).forEach(function (k) { if (db.users[k].id === u.id) db.users[k].password = password; }); save(); return { updated: true }; }); },
    signOut: function () { setSession(null); return Promise.resolve(); },
    getProfile: function () { return later(function () { return db.profiles[me().id] || null; }); },
    giveConsent: function (version) { return later(function () { var id = me().id; db.profiles[id] = { id: id, health_consent_at: new Date().toISOString(), consent_version: version }; save(); return db.profiles[id]; }); },
    withdrawConsent: function () { return later(function () { var id = me().id; db.checkins = db.checkins.filter(function (c) { return c.user_id !== id; }); if (db.profiles[id]) db.profiles[id].health_consent_at = null; save(); }); },
    saveCheckin: function (c) {
      return later(function () {
        var id = me().id;
        // Mirrors the database policy: saving needs recorded consent.
        if (!db.profiles[id] || !db.profiles[id].health_consent_at) throw fail("server_error", "Something went wrong. Please try again.");
        var row = { id: "c-" + Date.now() + "-" + Math.random().toString(16).slice(2, 6), user_id: id, nutrient_id: c.nutrientId, answers: c.answers, score: c.score, band: c.band, sex: (c.profile||{}).sex || null, age_group: (c.profile||{}).ageGroup || null, menopause: c.profile ? c.profile.menopause : null, created_at: c.createdAt || new Date().toISOString() };
        db.checkins.push(row); save(); return row;
      });
    },
    listCheckins: function () { return later(function () { var id = me().id; return db.checkins.filter(function (c) { return c.user_id === id; }).sort(function (a, b) { return b.created_at.localeCompare(a.created_at); }); }); },
    deleteCheckin: function (cid) { return later(function () { var id = me().id; db.checkins = db.checkins.filter(function (c) { return !(c.id === cid && c.user_id === id); }); save(); }); },
    deleteAccount: function () { return later(function () { var u = me(); Object.keys(db.users).forEach(function (k) { if (db.users[k].id === u.id) delete db.users[k]; }); db.checkins = db.checkins.filter(function (c) { return c.user_id !== u.id; }); delete db.profiles[u.id]; save(); setSession(null); }); },
    exportData: function () { var self = this; return Promise.all([self.getProfile(), self.listCheckins()]).then(function (r) { return { exportedAt: new Date().toISOString(), account: session.user, profile: r[0], checkins: r[1] }; }); }
  };
}(window));
