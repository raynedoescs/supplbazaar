(function (root) {
  "use strict";
  // Minimal Supabase client (Auth + REST) using fetch only: no SDK, no build step.
  // Security is enforced server-side by Supabase Auth and the row-level-security policies
  // in backend/supabase-setup.sql; this file only stores the signed-in session.
  var SESSION_KEY = "supl.session";
  var VERIFIER_KEY = "supl.pkce";

  function createClient(options) {
    var base = String(options.url).replace(/\/+$/, "");
    var anonKey = options.anonKey;
    var http = options.fetch;
    var storage = options.storage;
    var cryptoApi = options.crypto;
    var listeners = [];
    var session = read(SESSION_KEY, true);

    function read(key, json) {
      try { var raw = storage.getItem(key); return raw ? (json ? JSON.parse(raw) : raw) : null; } catch (_) { return null; }
    }
    function write(key, value) {
      try { if (value === null) storage.removeItem(key); else storage.setItem(key, value); } catch (_) { /* storage blocked: session lasts for this page only */ }
    }
    function setSession(next) {
      session = next;
      write(SESSION_KEY, next ? JSON.stringify(next) : null);
      listeners.forEach(function (fn) { try { fn(session); } catch (_) { /* listener errors must not break auth */ } });
      return session;
    }
    function fromAuthResponse(data) {
      if (!data || !data.access_token) return null;
      var user = data.user || {};
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at ? data.expires_at * 1000 : Date.now() + (data.expires_in || 3600) * 1000,
        user: { id: user.id, email: user.email, provider: (user.app_metadata && user.app_metadata.provider) || "email" }
      };
    }

    // ---- errors ----
    function failure(code, message, status) { var e = new Error(message); e.code = code; e.status = status || 0; return e; }
    function friendly(status, data) {
      var code = (data && (data.error_code || data.code || data.error)) || "";
      var raw = (data && (data.error_description || data.msg || data.message || data.error)) || "";
      var text = String(code) + " " + String(raw);
      if (status === 429 || /rate.?limit/i.test(text)) return failure("rate_limited", "Too many attempts. Please wait a minute and try again.", status);
      if (/invalid_credentials|invalid login credentials|invalid_grant/i.test(text)) return failure("invalid_credentials", "That email and password don’t match. Try again or reset your password.", status);
      if (/email_not_confirmed|email not confirmed/i.test(text)) return failure("email_not_confirmed", "Please confirm your email first. Check your inbox for the link.", status);
      if (/user_already_exists|already registered/i.test(text)) return failure("user_exists", "An account with this email already exists. Try signing in.", status);
      if (/weak_password|password should/i.test(text)) return failure("weak_password", "Choose a stronger password: at least 8 characters.", status);
      if (/flow_state|code verifier|bad_code_verifier/i.test(text)) return failure("link_expired", "That sign-in link has expired or was opened in a different browser. Please try again.", status);
      if (status === 401 || /jwt|token/i.test(text)) return failure("signed_out", "Your session has ended. Please sign in again.", status);
      return failure(code || "server_error", "Something went wrong. Please try again.", status);
    }
    function request(method, path, body, token, headers) {
      var h = { apikey: anonKey, Authorization: "Bearer " + (token || anonKey) };
      if (body !== undefined) h["Content-Type"] = "application/json";
      Object.keys(headers || {}).forEach(function (k) { h[k] = headers[k]; });
      return http(base + path, { method: method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) }).then(function (res) {
        return res.text().then(function (text) {
          var data = null;
          try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
          if (!res.ok) throw friendly(res.status, data);
          return data;
        });
      }, function () { throw failure("network", "Couldn’t reach the server. Check your connection and try again."); });
    }

    // ---- PKCE (used for Google, email confirmation and password-reset links) ----
    function base64url(bytes) {
      var text = "";
      for (var i = 0; i < bytes.length; i++) text += String.fromCharCode(bytes[i]);
      return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    function startPkce() {
      var bytes = new Uint8Array(32);
      cryptoApi.getRandomValues(bytes);
      var verifier = base64url(bytes);
      // localStorage, not sessionStorage: email links often open in a new tab.
      write(VERIFIER_KEY, verifier);
      return cryptoApi.subtle.digest("SHA-256", new TextEncoder().encode(verifier)).then(function (digest) {
        return base64url(new Uint8Array(digest));
      });
    }
    function query(params) {
      return Object.keys(params).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); }).join("&");
    }

    // ---- session ----
    function getSession() {
      if (!session) return Promise.resolve(null);
      if (session.expiresAt - Date.now() > 60 * 1000) return Promise.resolve(session);
      return request("POST", "/auth/v1/token?grant_type=refresh_token", { refresh_token: session.refreshToken }).then(function (data) {
        return setSession(fromAuthResponse(data));
      }, function (error) {
        if (error.code === "network") throw error;
        setSession(null);
        return null;
      });
    }
    function withToken(run) {
      return getSession().then(function (s) {
        if (!s) throw failure("signed_out", "Please sign in again.");
        return run(s.accessToken, s.user);
      });
    }
    function rest(method, path, body, prefer) {
      return withToken(function (token) { return request(method, "/rest/v1/" + path, body, token, prefer ? { Prefer: prefer } : null); });
    }

    return {
      status: "on",
      user: function () { return session && session.user; },
      onChange: function (fn) { listeners.push(fn); },
      getSession: getSession,

      signUp: function (email, password, redirectTo) {
        return startPkce().then(function (challenge) {
          return request("POST", "/auth/v1/signup?" + query({ redirect_to: redirectTo }),
            { email: email, password: password, code_challenge: challenge, code_challenge_method: "s256" });
        }).then(function (data) {
          var next = fromAuthResponse(data);
          if (next) { write(VERIFIER_KEY, null); setSession(next); return { signedIn: true }; }
          return { confirmEmail: true };
        });
      },
      signIn: function (email, password) {
        return request("POST", "/auth/v1/token?grant_type=password", { email: email, password: password }).then(function (data) {
          setSession(fromAuthResponse(data));
          return { signedIn: true };
        });
      },
      googleUrl: function (redirectTo) {
        return startPkce().then(function (challenge) {
          return base + "/auth/v1/authorize?" + query({ provider: "google", redirect_to: redirectTo, code_challenge: challenge, code_challenge_method: "s256" });
        });
      },
      exchangeCode: function (code) {
        var verifier = read(VERIFIER_KEY, false);
        if (!verifier) return Promise.reject(failure("link_expired", "That sign-in link has expired or was opened in a different browser. Please try again."));
        return request("POST", "/auth/v1/token?grant_type=pkce", { auth_code: code, code_verifier: verifier }).then(function (data) {
          write(VERIFIER_KEY, null);
          setSession(fromAuthResponse(data));
          return { signedIn: !!session };
        });
      },
      resetPassword: function (email, redirectTo) {
        return startPkce().then(function (challenge) {
          return request("POST", "/auth/v1/recover?" + query({ redirect_to: redirectTo }),
            { email: email, code_challenge: challenge, code_challenge_method: "s256" });
        }).then(function () { return { sent: true }; });
      },
      updatePassword: function (password) {
        return withToken(function (token) { return request("PUT", "/auth/v1/user", { password: password }, token); }).then(function () { return { updated: true }; });
      },
      signOut: function () {
        var token = session && session.accessToken;
        setSession(null);
        if (!token) return Promise.resolve();
        return request("POST", "/auth/v1/logout", undefined, token).then(function () {}, function () {});
      },

      // ---- data (all scoped to the signed-in user by row-level security) ----
      getProfile: function () {
        return withToken(function (token, user) {
          return request("GET", "/rest/v1/profiles?" + query({ select: "id,health_consent_at,consent_version", id: "eq." + user.id }), undefined, token);
        }).then(function (rows) { return (rows && rows[0]) || null; });
      },
      giveConsent: function (version) {
        return withToken(function (token, user) {
          return request("POST", "/rest/v1/profiles", { id: user.id, health_consent_at: new Date().toISOString(), consent_version: version }, token,
            { Prefer: "resolution=merge-duplicates,return=representation" });
        }).then(function (rows) { return (rows && rows[0]) || null; });
      },
      withdrawConsent: function () { return rest("POST", "rpc/withdraw_health_consent", {}); },
      saveCheckin: function (checkin) {
        var profile = checkin.profile || {};
        return rest("POST", "checkins", { nutrient_id: checkin.nutrientId, answers: checkin.answers, score: checkin.score, band: checkin.band,
          sex: profile.sex || null, age_group: profile.ageGroup || null, menopause: profile.menopause === undefined ? null : profile.menopause }, "return=representation")
          .then(function (rows) { return (rows && rows[0]) || null; });
      },
      listCheckins: function () {
        return rest("GET", "checkins?" + query({ select: "id,nutrient_id,answers,score,band,sex,age_group,menopause,created_at", order: "created_at.desc", limit: "500" }));
      },
      deleteCheckin: function (id) { return rest("DELETE", "checkins?" + query({ id: "eq." + id })); },
      deleteAccount: function () {
        return rest("POST", "rpc/delete_my_account", {}).then(function () { setSession(null); });
      },
      exportData: function () {
        var self = this;
        return Promise.all([self.getProfile(), self.listCheckins()]).then(function (results) {
          return { exportedAt: new Date().toISOString(), account: session && { email: session.user.email, signInMethod: session.user.provider },
            profile: results[0], checkins: results[1] };
        });
      }
    };
  }

  var api = { createClient: createClient };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; return; }

  // Browser start-up: accounts are on only with a configured project, on http(s), in a secure context.
  var S = root.SUPL = root.SUPL || {};
  var cfg = S.backend || {};
  S.accountStatus = "off";
  S.account = null;
  if (S.backendMock) {
    // Test page only (tests/mock.html): an in-memory stand-in with the same interface.
    S.account = S.backendMock;
    S.accountStatus = "on";
  } else if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
    if (root.location.protocol === "file:" || !root.isSecureContext || !root.crypto || !root.crypto.subtle) {
      S.accountStatus = "unsupported";
    } else {
      var storage = null;
      try { storage = root.localStorage; storage.getItem("supl.test"); } catch (_) { storage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} }; }
      S.account = createClient({ url: cfg.supabaseUrl, anonKey: cfg.supabaseAnonKey, fetch: root.fetch.bind(root), storage: storage, crypto: root.crypto });
      S.accountStatus = "on";
    }
  }
}(typeof window !== "undefined" ? window : globalThis));
