"use strict";
// Exercises js/account.js against a fake fetch: request shapes, token handling, PKCE and errors.
// This checks the client's side of the contract only; it is not a test against a live Supabase project.
const assert = require("node:assert/strict");
const { createClient } = require("../js/account.js");

function memoryStorage() {
  const map = new Map();
  return { getItem: k => (map.has(k) ? map.get(k) : null), setItem: (k, v) => map.set(k, String(v)), removeItem: k => map.delete(k), map };
}
function fakeServer(handler) {
  const calls = [];
  const fetch = (url, init) => {
    const call = { url, method: init.method, headers: init.headers, body: init.body ? JSON.parse(init.body) : undefined };
    calls.push(call);
    const [status, body] = handler(call);
    return Promise.resolve({ ok: status >= 200 && status < 300, status, text: () => Promise.resolve(body === undefined ? "" : JSON.stringify(body)) });
  };
  return { fetch, calls };
}
const user = { id: "u-1", email: "a@example.com", app_metadata: { provider: "email" } };
const tokens = (extra = {}) => ({ access_token: "access-1", refresh_token: "refresh-1", expires_in: 3600, user, ...extra });
const make = (handler, storage = memoryStorage()) => {
  const server = fakeServer(handler);
  const client = createClient({ url: "https://proj.supabase.co/", anonKey: "anon-key", fetch: server.fetch, storage, crypto: globalThis.crypto });
  return { client, server, storage };
};

let passed = 0;
async function test(name, run) { await run(); passed++; console.log("PASS " + name); }

(async () => {
  await test("password sign-in stores the session and sends the anon key", async () => {
    const { client, server, storage } = make(() => [200, tokens()]);
    await client.signIn("a@example.com", "password1");
    const call = server.calls[0];
    assert.equal(call.url, "https://proj.supabase.co/auth/v1/token?grant_type=password");
    assert.equal(call.headers.apikey, "anon-key");
    assert.deepEqual(call.body, { email: "a@example.com", password: "password1" });
    assert.equal(client.user().email, "a@example.com");
    assert.ok(JSON.parse(storage.getItem("supl.session")).accessToken === "access-1");
  });

  await test("wrong password gives a friendly error and no session", async () => {
    const { client } = make(() => [400, { error: "invalid_grant", error_description: "Invalid login credentials" }]);
    await assert.rejects(client.signIn("a@example.com", "nope"), e => e.code === "invalid_credentials" && /don’t match/.test(e.message));
    assert.equal(client.user(), null);
  });

  await test("rate limiting and network failures are reported plainly", async () => {
    const limited = make(() => [429, { msg: "rate limit" }]).client;
    await assert.rejects(limited.signIn("a@example.com", "x"), e => e.code === "rate_limited");
    const offline = createClient({ url: "https://p.supabase.co", anonKey: "k", fetch: () => Promise.reject(new TypeError("fail")), storage: memoryStorage(), crypto: globalThis.crypto });
    await assert.rejects(offline.signIn("a@example.com", "x"), e => e.code === "network");
  });

  await test("sign-up sends a PKCE challenge and redirect, and reports email confirmation", async () => {
    const { client, server, storage } = make(() => [200, { id: "u-1", email: "a@example.com" }]);
    const res = await client.signUp("a@example.com", "password1", "https://supl.example/?auth=signup");
    assert.deepEqual(res, { confirmEmail: true });
    const call = server.calls[0];
    assert.equal(call.url, "https://proj.supabase.co/auth/v1/signup?redirect_to=" + encodeURIComponent("https://supl.example/?auth=signup"));
    assert.equal(call.body.code_challenge_method, "s256");
    const verifier = storage.getItem("supl.pkce");
    const expected = Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))).toString("base64url");
    assert.equal(call.body.code_challenge, expected);
    assert.equal(client.user(), null);
  });

  await test("Google URL carries provider, redirect and S256 challenge", async () => {
    const { client } = make(() => [500, {}]);
    const url = new URL(await client.googleUrl("https://supl.example/?auth=google"));
    assert.equal(url.origin + url.pathname, "https://proj.supabase.co/auth/v1/authorize");
    assert.equal(url.searchParams.get("provider"), "google");
    assert.equal(url.searchParams.get("redirect_to"), "https://supl.example/?auth=google");
    assert.equal(url.searchParams.get("code_challenge_method"), "s256");
    assert.ok(url.searchParams.get("code_challenge").length >= 43);
  });

  await test("code exchange sends the stored verifier once, then clears it", async () => {
    const { client, server, storage } = make(call => (call.url.includes("grant_type=pkce") ? [200, tokens()] : [500, {}]));
    await client.googleUrl("https://supl.example/?auth=google");
    const verifier = storage.getItem("supl.pkce");
    await client.exchangeCode("the-code");
    const call = server.calls[0];
    assert.equal(call.url, "https://proj.supabase.co/auth/v1/token?grant_type=pkce");
    assert.deepEqual(call.body, { auth_code: "the-code", code_verifier: verifier });
    assert.equal(storage.getItem("supl.pkce"), null);
    assert.equal(client.user().id, "u-1");
    await assert.rejects(client.exchangeCode("again"), e => e.code === "link_expired");
  });

  await test("expiring sessions refresh before data requests; failed refresh signs out", async () => {
    const storage = memoryStorage();
    storage.setItem("supl.session", JSON.stringify({ accessToken: "old", refreshToken: "r-old", expiresAt: Date.now() + 1000, user: { id: "u-1", email: "a@example.com", provider: "email" } }));
    const { client, server } = make(call => {
      if (call.url.includes("grant_type=refresh_token")) return [200, tokens({ access_token: "fresh" })];
      return [200, []];
    }, storage);
    await client.listCheckins();
    assert.deepEqual(server.calls[0].body, { refresh_token: "r-old" });
    assert.equal(server.calls[1].headers.Authorization, "Bearer fresh");

    const storage2 = memoryStorage();
    storage2.setItem("supl.session", JSON.stringify({ accessToken: "old", refreshToken: "bad", expiresAt: 0, user: { id: "u-1" } }));
    const second = make(() => [400, { error: "invalid_grant" }], storage2).client;
    await assert.rejects(second.listCheckins(), e => e.code === "signed_out");
    assert.equal(second.user(), null);
    assert.equal(storage2.getItem("supl.session"), null);
  });

  await test("saving, listing, deleting and consent use the REST endpoints with the user token", async () => {
    const { client, server } = make(call => {
      if (call.url.includes("/auth/v1/token")) return [200, tokens()];
      if (call.url.endsWith("/rest/v1/checkins")) return [201, [{ id: "c-1" }]];
      if (call.url.includes("/rest/v1/profiles?")) return [200, [{ id: "u-1", health_consent_at: null }]];
      if (call.url.endsWith("/rest/v1/profiles")) return [201, [{ id: "u-1", health_consent_at: "2026-10-21" }]];
      return [204, undefined];
    });
    await client.signIn("a@example.com", "password1");
    assert.equal((await client.getProfile()).health_consent_at, null);
    assert.ok(server.calls[1].url.includes("id=eq.u-1"));
    await client.giveConsent("2026-10-21");
    assert.equal(server.calls[2].headers.Prefer, "resolution=merge-duplicates,return=representation");
    assert.equal(server.calls[2].body.id, "u-1");
    assert.equal(server.calls[2].body.consent_version, "2026-10-21");
    const saved = await client.saveCheckin({ nutrientId: "zinc", answers: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5], score: 6, band: "moderate", profile: { sex: "female", ageGroup: "30-44", menopause: false } });
    assert.equal(saved.id, "c-1");
    assert.deepEqual(server.calls[3].body, { nutrient_id: "zinc", answers: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5], score: 6, band: "moderate", sex: "female", age_group: "30-44", menopause: false });
    assert.equal(server.calls[3].headers.Authorization, "Bearer access-1");
    await client.deleteCheckin("c-1");
    assert.equal(server.calls[4].method, "DELETE");
    assert.ok(server.calls[4].url.endsWith("/rest/v1/checkins?id=eq.c-1"));
    await client.withdrawConsent();
    assert.ok(server.calls[5].url.endsWith("/rest/v1/rpc/withdraw_health_consent"));
  });

  await test("delete account calls the RPC and clears the local session", async () => {
    const { client, server, storage } = make(call => (call.url.includes("/auth/v1/token") ? [200, tokens()] : [204, undefined]));
    await client.signIn("a@example.com", "password1");
    await client.deleteAccount();
    assert.ok(server.calls[1].url.endsWith("/rest/v1/rpc/delete_my_account"));
    assert.equal(client.user(), null);
    assert.equal(storage.getItem("supl.session"), null);
  });

  await test("signed-out data calls fail without contacting the server", async () => {
    const { client, server } = make(() => [200, []]);
    await assert.rejects(client.listCheckins(), e => e.code === "signed_out");
    assert.equal(server.calls.length, 0);
  });

  await test("sign-out clears the session even if the server call fails", async () => {
    const { client } = make(call => (call.url.includes("/auth/v1/token") ? [200, tokens()] : [500, {}]));
    await client.signIn("a@example.com", "password1");
    const seen = [];
    client.onChange(s => seen.push(s));
    await client.signOut();
    assert.equal(client.user(), null);
    assert.deepEqual(seen, [null]);
  });

  console.log(`\n${passed} account client tests passed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
