# Turning on Supl accounts

Supl's accounts (email/password and Google sign-in, saved check-ins, summary) run on **Supabase**, a hosted database with built-in login. The website itself stays static. Until you finish these steps, the site works exactly as before, with no sign-in button.

You'll need about an hour. Dashboard menu names occasionally change; look for the closest match.

## 1. Create the Supabase project

1. Sign up at supabase.com and create a **New project**.
2. **Region: South Asia (Mumbai)**, so data stays in India.
3. Set a strong database password and store it in your password manager. Supl never needs it.

## 2. Create the tables and security rules

1. Open **SQL Editor → New query**.
2. Paste the whole of `backend/supabase-setup.sql` and click **Run**. It is safe to run again. If your project already ran an earlier version, run the latest file again: it adds the `sex`, `age_group` and `menopause` columns that About-you check-ins save.
3. In **Table Editor** you should see `profiles` and `checkins`, both marked as RLS-enabled.

This creates:
- the tables;
- rules that let each signed-in person read and delete **only their own** check-ins, and save only after giving consent;
- functions for "stop saving" and "delete my account".

## 3. Email sign-in settings

**Authentication → Sign In / Providers → Email:**
- Email provider: **on**
- Confirm email: **on**
- Minimum password length: **8** (or more)

**Authentication → URL Configuration:**
- **Site URL:** your website address, e.g. `https://supl.in`
- **Redirect URLs:** add `https://supl.in/**`. While testing locally, also add `http://localhost:4173/**`.

**Emails:** Supabase's built-in sender is for testing only and allows very few emails per hour. Before launch, set up **custom SMTP** under Authentication → Emails, using a provider such as Resend, Brevo or Amazon SES with your domain. While you're there, edit the email templates to say "Supl".

## 4. Google sign-in (optional; skip it at first if you like)

If you skip this, set `googleSignIn: false` in `data/backend.js` so the Google button is hidden.

1. Go to **console.cloud.google.com** and create a project.
2. **OAuth consent screen:**
   - User type: External.
   - App name: Supl.
   - Support email: yours.
   - Authorised domain: your domain.
   - Privacy policy URL: `https://supl.in/#/privacy`.
   - Scopes: the defaults (email, profile, openid) are enough.
3. **Credentials → Create credentials → OAuth client ID → Web application:**
   - Authorised JavaScript origins: `https://supl.in`
   - Authorised redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`. Supabase shows this exact URL on its Google provider page.
4. Copy the **Client ID** and **Client secret** into Supabase **Authentication → Sign In / Providers → Google**, and enable it. The client secret goes only into Supabase, never into the website files.
5. Back in Google, **publish** the consent screen. In "Testing" mode only listed test users can sign in.

## 5. Connect the website

1. In Supabase, open **Project Settings → API / API Keys** and copy:
   - the **Project URL**, e.g. `https://abcdefghijkl.supabase.co`;
   - the **anon** or **publishable** key.
2. Open `data/backend.js` and paste them into `supabaseUrl` and `supabaseAnonKey`.
3. Fill in `privacyOwner` (your name or business name) and `privacyContact` (an email for privacy requests). Both appear on the privacy page.
4. Run `node tests/validate-data.js`. It refuses a secret key by mistake and warns about missing privacy details.

> **Never** paste the `service_role` / secret key into any website file. It bypasses every security rule. If it is ever published, rotate it immediately in Supabase.

## 6. Publish and test

Sign-in needs **https** (or `http://localhost` while testing). It does not work when `index.html` is double-clicked. Publish `index.html`, `css/`, `js/`, `data/` and `images/`. Do **not** publish `tests/`, `backend/` or the `.md` documents.

Test each of these on the live site:
1. Create an account with email → open the confirmation email → sign in.
2. Finish a check-in → **Save to my check-ins** → tick the consent box → saved.
3. Open the account page → summary and history appear → **Download my data** works.
4. Delete one check-in; then **Stop saving and delete my check-ins**; then **Delete my account**.
5. **Forgot your password?** → email → link → choose a new password.
6. **Continue with Google** (from a finished check-in, to confirm the result comes back after sign-in).
7. Sign in on a second account and confirm it cannot see the first account's check-ins.

## Running costs and upkeep

- **Free plan:** fine for building and testing, but a free project **pauses after about a week without activity**, and backups are limited. Move to the Pro plan (about US$25/month) before real users depend on it.
- Keep `consentVersion` in `data/backend.js` up to date. Change it when the privacy policy or consent wording changes materially.
- This is not legal advice. Have the privacy policy checked against India's DPDP Act and its rules before launch.
