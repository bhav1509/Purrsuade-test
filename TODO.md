# To-do list

Fixes, release chores and launch history. **The v2.0 checklist, in order, is [TODO_v2.md](TODO_v2.md).** Plans and ideas for later live in ROADMAP.md (kept on my computer, not in git).

## Now
- [ ] **Upload the new Lambda zip** (`cloud/purrsuade-api.zip`; v1.1's feedback changes need it).
- [ ] **Test environment** (see cloud/README.md): create the empty public repo `Purrsuade-test` on GitHub, then
      `scripts/deploy-test.sh` and turn on Pages (main, root); `scripts/deploy-test-backend.sh` and copy its outputs
      into the test half of `CLOUD_CONFIG` in cloud.js.
- [ ] **Release `1.2.0`** (welcome card, 1-minute first talk, three tips after the first quest), check it on my
      iPhone, watch the first-spin drop-off for a few days.
- [ ] **Own domain** pointing at GitHub Pages: choose and buy it; then update Cognito callback URLs, Google sign-in,
      the privacy page and links. Guest progress saved on github.io won't carry over (a new address is a new site to
      the browser), so do it before the v2.0 launch.

## v1.0.0 launch (Sunday 1 November 2026)
v0.3.2 is live: sign-in, cloud backup and sync, instant AI feedback, the shop, the reworked room and cat. Details
and the device checklist are in [LAUNCH.md](LAUNCH.md).

Status on Sat 31 Oct: Wed–Fri went to the shop, room and UI rounds (v0.3.0 → v0.3.2, and v0.3.3 waiting to be
released), so the usage tracking and dashboard planned for Thu–Fri are not built yet. They now come straight after
launch (see "Launch week"), so the first testers' sessions before that won't be recorded.

**Wed 28 Oct: AWS settings, testers, shop decision**
- [x] **Publish the Google sign-in first** (blocks testers). Google Cloud → Branding: homepage `https://bhav1509.github.io/Purrsuade/`, privacy policy `https://bhav1509.github.io/Purrsuade/privacy.html`, authorized domains `bhav1509.github.io` and `amazoncognito.com` → Audience → Publish app. Until then only listed test users can use Google sign-in.
- [x] **Raise `GLOBAL_DAILY_LIMIT`** from 50 to ~200 (Lambda environment variables; at most ~$1 a day).
- [x] **Cognito refresh token → 365 days** (App client → App client information → Edit).
- [x] **CloudWatch log retention → 1 month** (`/aws/lambda/purrsuade-api`).
- [x] **Budget alert covers the purrsuade project** (not just drobe).
- [x] **Try email sign-up once.** Cognito's own sender allows ~50 emails a day; fine if most people use Google.
- [x] **Calendar reminder for late March 2027:** the AWS free plan ends 20 April 2027 and the account is suspended unless upgraded.
- [x] **Decide on the shop:** shipping it in v1.0.
- [x] **Test the shop on my own phone.** Done through the review rounds (v0.3.1–v0.3.3); the automated phone and
      laptop suite (58 checks) covers buying, placing, put away, wall decor, colours, room, coat, rename and old saves.
      Sync to a second device is still in the QA checklist below.
- [x] **Release v0.3.0** with `scripts/release.sh minor "Shop: furniture, colours, room styles and coats"`.

**Thu 29 Oct: build tracking and the feedback popups** → moved to launch week (not started)
Goal: see where signed-in beta testers drop off, and whether the idea is worth charging for.
- [x] **Usage events in the app** (v1.0.1, anonymous, by device rather than account). `track(name, details)` queues events on the device (capped ~500) and sends them in
      batches while signed in (every 30 s, on hide, on sign-in); events from before sign-in go up on first sign-in.
      Events: app open, tour start/done/skip, spin/reroll, speak start/done/cancel, typed instead, instant feedback
      (ok/failed/limit), copy to AI app, feedback skipped, quest complete/abandoned, care, shop buy, cat died/adopted,
      sign in/out, delete account, install, survey answer/dismiss. Never the transcript.
- [x] **"Share usage" switch** in Settings → Privacy (on by default).
- [ ] **Feedback popups** (the first one is live since v1.0.1; the 5th-quest one isn't built), answered once per account (stored in the synced progress):
  - After the first finished quest: how useful (1–5), what would you pay a month (Nothing / $2 / $5 / $10+), what
    would make it worth paying for (optional text).
  - After the 5th quest: "How would you feel if you could no longer use Purrsuade?" (very / somewhat / not
    disappointed; 40%+ "very" is a good sign), main benefit (optional text).
- [x] **`POST /events` in the Lambda.** Up to 100 events per call, validated; stored in the existing `purrsuade-usage`
      table as one item per user per day (`EV#<user id>#<date>`), kept 13 months. Delete account removes them too.
      Deploy by zip upload (no new AWS resources or permissions).
- [x] **Privacy policy:** what's recorded (actions, not what you say), why, how long, and the opt-out. Decide on an email contact.
- [x] Released (v1.0.1–v1.0.2); events reach DynamoDB. `node scripts/insights.mjs` reads them.

**Fri 30 Oct: dashboard and device testing** (dashboard → launch week)
- [ ] **Local dashboard** `node scripts/dashboard.mjs` → `http://localhost:8787`, rereads DynamoDB + Cognito users
      (`purrsuade` profile) on every refresh; nothing with emails is committed. Shows: headline numbers (users, active
      today / 7 days, quests, next-day and 7-day return, usefulness, would pay, % very disappointed), the funnel
      (opened → spun → spoke → finished speaking → feedback → quest done → came back → 3+ quests), a day 0–7 retention
      grid by start date, one row per user with where they stopped and a click-through timeline, survey answers and
      comments, and feature use (instant vs copy-paste, transcription mode, shop and cat care).
- [x] Account checks by hand on launch day (iPhone + laptop): sync between two devices, sign out / sign in as another
      account, delete account, privacy link: all as expected, except that a half-done quest doesn't sync (see the
      next release). Offline not checked yet.
- [ ] Fix what comes up (patch releases); read the testers' first data in the dashboard.
- [x] **Clean up the UI.** Done over v0.3.1–v0.3.3: starter room, shop (two tabs, colour picker, wall decor),
      selection rings, the cat walking round furniture and using the cat tree / condo / teepee / box, garden, icons,
      phone zoom and crisp lines, a shorter Speak screen, own-API-key option removed.
- [x] **Clean up the topics** (goes out with the next release): 76 prompts; levels 1–3 are one sentence, levels
      4–7 add a short matching challenge; duplicates and tech-only prompts replaced; all prompts now come up.

**Sat 31 Oct: feature freeze and launch content**
- [x] **Release v0.3.3**: API key option removed, desk-mic icon everywhere, shorter Speak screen, no glowing mic,
      smooth pinch zoom on phones. Checked live on phone size.
- [x] **Hand check on my iPhone.** Fine apart from three things, fixed in **v0.3.4** (live, checked):
      signing out now resets the device to a fresh room; one free instant feedback without an account (backend
      guest path, 2 per network a day, 100 for all guests); Cognito password rule relaxed to 8+ characters.
      (Email sign-in with my Gmail can't work: that account was made with Google, so it has no password.)
- [ ] Feature freeze: bug fixes only from here.
- [x] Demo video (60–90 s, captions), plus a 4:5 version that fits LinkedIn's feed.
- [x] 3–4 screenshots for the post (room, topic, feedback with scores, shop, progress; phone size 1170×2532).
- [x] Edit the LinkedIn post draft in LAUNCH.md into my own voice (updated 1 Nov to match what's live); schedule it if possible.
- [ ] Check the dashboard and tester comments; fix anything that blocks launch.
- [ ] Final pass of the LAUNCH.md checklist.

**Sun 1 Nov: launch day**
- [x] `scripts/release.sh 1.0.0 "Public launch"`, then check the live site on a phone (Settings → About shows 1.0.0).
- [x] Post on LinkedIn with the video.
- [ ] Watch CloudWatch logs and GitHub issues for the first day.

**Next release (v1.0.1)**
- [x] **Password reset works.** Checked on launch day: the earlier failure was an email address that had no account
      (Cognito says a code was sent either way, so nobody can probe which emails exist). Google accounts have no
      password to reset. Optional later: a "Signed up with Google? Use Continue with Google" hint on the sign-in card.
- [ ] **Privacy policy: emailing users.** If I'll email people for feedback, add "We may occasionally email you about
      Purrsuade; reply to opt out" before contacting anyone.
- [ ] **Sign-up and activity script** (local, read-only, nothing with emails committed): sign-ups by day from Cognito
      (Google vs email), and per account from the saved progress: sessions, days practised, last active. The launch
      metric is "signed up → practised → came back", not sign-ups alone.
- [ ] **Sync a quest in progress across devices.** A half-done session on the phone (topic, transcript, feedback so
      far) doesn't show on the laptop; only finished quests sync. The in-progress quest is kept in its own slot on
      the device (`QUEST_STORE`) and never uploaded. Fix: include it in the synced progress (not the recording), let
      the newer copy win, and decide what happens if both devices have a different quest open (keep the newer one,
      or ask).
- [ ] **Check offline by hand:** the app opens and practice works; instant feedback shows the offline message;
      changes sync once back online.
- [ ] Tick off the launch-day items in this list.

**Launch week (Mon 2 Nov →)**
- [x] **Usage tracking + first survey + `POST /events` + privacy policy update** (v1.0.1–v1.0.2).
- [x] **v1.1.0 (3 Nov):** planning starts right after the spin (with pause), Get feedback asks the AI straight away
      with a loading bar, feedback in the pixel font in six fixed sections with a measured pace card, tap furniture
      and the cat goes to use it. **Still to do: upload the new Lambda zip** so instant feedback uses the new prompt.
- [ ] **Local dashboard** (the Fri 30 Oct plan above). For now `node scripts/insights.mjs` (funnel, survey) covers it.
- [ ] Read tester comments; fix what comes up.
- [ ] **Sign-in emails from my own address (Amazon SES):** Cognito's default sender often lands in spam and allows
      ~50 emails a day. Verify an address in SES, request production access (can take a day), then switch the user
      pool's email to SES.
- [ ] Cloud transcription (AWS Transcribe): see "Better feedback" in the roadmap (test it on my recordings first).
- [ ] Optional: remove `examples/sample-backup-2026-10-05.json` (my own transcripts) from the git history.

## Fixes
- [x] **Save a quest in progress.** The current quest (topic, transcript, scores) only lives in memory, so a reload or closing the app on a phone loses it.
- [x] **Pause the room when it's hidden.** On phone, a full-screen panel covers the room but it keeps animating behind it and draining battery.
- [x] **Version control.** Put the project under git so changes can be rolled back.

## Quest 2.0: make the speaking practice itself better
- [x] **Built-in timers.** A prep countdown (60 / 45 / 30 s by level) and a speaking timer showing the 2–5 minute target, with the cat watching.
- [x] **Record and auto-transcribe.** Use the browser's speech recognition so the transcript fills itself in; allow playing the recording back. Check Safari/iPhone support first.
- [x] **Read scores from pasted feedback.** Pick out "Clarity: 7, Structure: 8…" from the pasted AI feedback and pre-fill the Scores step.
- [x] **One-tap AI apps.** Feedback step opens ChatGPT / Claude with the talk already typed in (Gemini / other: copied).
- [x] ~~**Bring your own API key.**~~ Built, then removed in v0.3.3: instant feedback is through sign-in only.
- [x] **Hosted coach.** AWS backend (`cloud/`) with sign-in, a daily limit and cloud backup.
  - [ ] Payments / higher limits for regular users.
- [ ] **Keep recordings across reloads.** Audio playback currently lasts only until the page reloads (store in IndexedDB).

## Foundations
- [x] **Data safety.** Backup reminder; sign-in with automatic backup and sync across devices.
- [ ] **Code health.** Split `app.js` into readable modules; add tests for XP, cat decay and scoring rules.

## Remember
The README's week-1 rule: use the app for a week before adding more, and note friction, boring topics, and whether the cat brings you back.
