# v2.0 to-do

Due **Monday 1 December 2026**. Listed in the order to do them. The reasons and details are in ROADMAP.md.
Every change goes to the test site first, then live.

## 1. Test environment (now)
- [x] Create an empty public repo `Purrsuade-test` on GitHub.
- [x] Run `scripts/deploy-test.sh`, then turn on Pages (main, root).
- [x] Run `scripts/deploy-test-backend.sh` and copy its outputs into the test half of `CLOUD_CONFIG` in cloud.js.
- [ ] On the test site (iPhone and laptop), check sign-in, instant feedback and sync.

## 2. Release 1.2.0 (by Sun 15 Nov)
- [ ] **Fix: the last few seconds of a talk are missing from the transcript, though they're in the recording.**
      First reproduce it with a talk that ends mid-sentence. Likely cause: Whisper drops the final words when a piece
      ends with no silence after it. Fix to try: add about 1 s of silence to the end of each piece, and keep
      recording for a moment after Stop.
- [ ] When the free tries are used up, the message gets a "Sign in" button.
- [ ] New usage steps: welcome seen / closed, mic asked / refused, left during planning. The Lambda only accepts
      event names it already knows, so add the new names there too.
- [ ] Rebuild and upload the Lambda zip.
- [ ] Release 1.2.0 and check it on the iPhone.
- [ ] Delete the one test event that reached the live usage table (4 Nov, 20:57).

## 3. Get people in (straight after 1.2.0)
- [ ] Second LinkedIn post with a new angle: the why, or a short clip of a talk.
- [ ] Send it to about 10 people who aren't close friends.
- [ ] Own domain:
  - buy it and point GitHub Pages at it
  - update the Cognito callbacks, Google sign-in, the privacy page and links
  - do it before the v2 launch: guest progress on github.io won't carry over

## 4. Quick reps (week of 16 Nov)
- [ ] Reps mode: a round of 3 prompts, 5 s to think, about 20 s to answer, one AI call per round.
- [ ] Feedback for each rep: what worked, a stronger reply, the technique.
- [ ] Rep bank: Bridge, Opinion, Comeback and Opener (about 30 lines each).
- [ ] A round of reps or a talk counts as the daily quest.
- [ ] First visit: one 20-second rep with instant feedback and no account, then offer the full talk.
- [ ] Welcome card shows an example of the feedback.
- [ ] Mic reassurance: "Only you hear this. The recording stays on your phone."
- [ ] Ask for interests at the first Opinion rep.

## 5. Better feedback (same week)
- [ ] Eighth score: **Engaging**.
- [ ] Scoring rubric in the prompt, for steadier scores.
- [ ] Story feedback: point out rushed or downplayed endings.
- [ ] Talk topics drawn from real moments.
- [ ] Release (with the Lambda zip).

## 6. Transcription test (one day)
- [ ] Run 10 of my recordings through Amazon Transcribe, Deepgram, AssemblyAI and OpenAI, and compare with Whisper on
      the device: accuracy, whether it keeps the "um"s, speed and cost.
- [ ] Decide, and note the decision in ROADMAP.md.

## 7. A person to talk to (week of 23 Nov)
- [ ] The pixel human, as the partner on the reps and follow-up screens.
- [ ] Voice: Polly clips for the topics and rep lines next to the browser's voice; pick one.
- [ ] A follow-up question after a talk, answered on the spot.
- [ ] A "Hear a strong answer" button.
- [ ] Listen-and-respond reps.
- [ ] Privacy policy: add Polly, plus the transcription service if one is chosen.
- [ ] Release.

## 8. Progress and your own material (week of 23–30 Nov)
- [ ] Transcript highlights (fillers, long pauses, trailing off) and time to first word.
- [ ] Try again: the same topic, before and after side by side.
- [ ] Story Bank: 3-beat cards; retell in 30 or 60 s.
- [ ] Progress chart.
- [ ] Share card.
- [ ] Better transcription for signed-in users, only if the test in step 6 passed.

## 9. Launch 2.0.0 (Mon 1 Dec)
- [ ] Full check on the test site (iPhone and laptop).
- [ ] Release 2.0.0.
- [ ] Launch post, then Toastmasters, communities and Product Hunt.
- [ ] A week later, check the gate: 60% do a first talk or rep, 25% come back the next day and 10% after a week, and
      50 people who aren't friends use it.

**If time runs short, cut in this order:**
1. Listen-and-respond
2. The share card
3. The Story Bank

**With every release:**
- add the new steps to the usage events (app and Lambda)
- update the privacy policy when data goes somewhere new
- run `node scripts/insights.mjs` before planning the next step
