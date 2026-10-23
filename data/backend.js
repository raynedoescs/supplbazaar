// OWNER: Accounts (sign-in and saved check-ins) switch on when both Supabase values are filled in.
// Follow backend/SETUP.md. Both values are designed to be public: they are safe in this file.
// NEVER paste the "service_role" / secret key here. That key bypasses all data protection.
(function (S) {
  "use strict";
  S.backend = {
    supabaseUrl: "",          // e.g. "https://abcdefghijkl.supabase.co"
    supabaseAnonKey: "",      // the "anon" / "publishable" key from Project Settings → API
    googleSignIn: true,       // set false to hide "Continue with Google" until Google is set up
    // Bump this date when the wording of the consent box or privacy policy changes materially.
    consentVersion: "2026-10-22",
    // Shown on the privacy page. Required before accounts go live.
    privacyOwner: "",         // your name or business name
    privacyContact: ""        // an email address for privacy and grievance requests
  };
}(window.SUPL));
