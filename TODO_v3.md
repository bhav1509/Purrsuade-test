# v3.0 to-do: "Live it, tell it, belong"

**Proposed, not decided.** Set the dates after the v2 gate check (about Mon 8 Dec). The dates below are a first guess.
The reasons, research and sources are in ROADMAP.md (v3.0 section).
Every change goes to the test site first, then live.

## 0. Decide (week of 8 Dec)
- [ ] Check the v2 gate: 60% do a first talk or rep, 25% come back the next day and 10% after a week, and 50 people
      who aren't friends use it.
- [ ] Run `node scripts/insights.mjs`. If people still leave before the first spin, fix that before starting v3.
- [ ] Set the v3.0 date and note the decision in ROADMAP.md.

## 1. Release 2.1.0: live it (no new tech; by Sun 21 Dec)
- [ ] **Homework for Life:** each evening, one line about the moment of the day worth a story (typed or spoken, about
      10 s). It saves into the Story Bank as a draft.
- [ ] Evening reminder for it (installed app first).
- [ ] **10-year list:** asked once: "What would you regret not doing?" Saved on the device and synced when signed in.
- [ ] **Dare ladder:**
  - Social grades:
    1. Ask a stranger for a recommendation.
    2. Stay in a conversation until it ends naturally.
    3. Start a conversation at an event.
    4. Tell a Story Bank story to someone new.
    5. Organise a meetup.
  - Adventure grades: say yes to the next invite; a class I'd be bad at (improv, dance); a solo trip somewhere new;
    one item a month from the 10-year list.
  - Fear before and after (1–10).
  - A 60 s voice debrief afterwards, which becomes a Story Bank card.
  - A safety line: never unsafe, illegal or at someone else's expense.
- [ ] **Prediction vs reality:** before a dare or event: "How awkward will it be?" and "How much will they like me?"
      (1–10). After: how it actually went.
- [ ] Postcard on the room wall for each dare done; big coin reward; the cat celebrates.
- [ ] Usage events for the new steps (app and Lambda).
- [ ] Release 2.1.0 and check it on the iPhone.

## 2. Listening and threads (January)
- [ ] **Hook hunt:**
  - The partner talks for 20–40 s.
  - I name the details that caught my attention, then reply with a follow-up question about a detail or how they
    felt.
  - Feedback shows the hooks I caught and the ones I missed.
  - New measure: hooks caught per rep.
- [ ] **Thread drills:**
  - From any line, three ways on: ask about it, link it to me, give a view.
  - From nothing: the setting, the person, something I did recently.
- [ ] **Question ladder:** 3 levels from small talk to deeper (what you do → why that → what you'd do if…).
- [ ] Rep banks for each (about 30 lines each).
- [ ] Feedback prompt: points for questions and callbacks, not only for talking. Update `scripts/check-prompt.mjs`.
- [ ] Release (with the Lambda zip).

## 3. Story Bank, full version (January)
- [ ] **Story builder:** the 5-second change, the opposite start, the stakes, one line of dialogue.
- [ ] Turn Homework for Life drafts and dare debriefs into stories with the builder.
- [ ] Retell in 30, 60 and 90 s.
- [ ] Spaced retell schedule; "ready to tell" once a story has been retold twice.
- [ ] **Keep going:** the listener looks at their phone mid-story, and I finish anyway.
- [ ] Feedback: "relatable beats impressive": tell a big story through the common ground (the feeling, the mess-up).
- [ ] Bookshelf in the room that shows the stories ready to tell.
- [ ] Release.

## 4. Group table (February)
- [ ] **Live Roleplay engine:** speech to text → Claude Haiku (low latency) → voice. Check the cost per minute first.
- [ ] 2–3 AI characters with different voices, mid-conversation.
- [ ] Drills:
  - jump in within about 5 s
  - bring the quiet one in
  - carry a topic for a minute
  - leave a group warmly
- [ ] Debrief at the end.
- [ ] "Yes, and" improv warm-ups before a round.
- [ ] Privacy policy: the voice service, and the transcription service if one is used.
- [ ] Release.

## 5. Event mode (February)
- [ ] **Before:** pick the kind of event. Cheat card with 2 stories, 2 opinions and 3 openers that fit, the prediction
      questions, then one quick drill.
- [ ] **After:** debrief: the best moment, one thing I'd say differently, the prediction check, a dare for next time.
- [ ] On event days the cat waits by the door.

## 6. Progress (with section 5)
- [ ] **Liking-gap chart:** predicted vs actual over time.
- [ ] **Fear chart:** fear before vs after each dare.
- [ ] Hooks caught per listening rep; stories ready to tell.
- [ ] "Practice, not therapy" note in Settings and the About page, with a pointer to CBT for social anxiety.

## 7. Launch 3.0.0
- [ ] Full check on the test site (iPhone and laptop).
- [ ] Release 3.0.0.
- [ ] Launch post: my own numbers (dares done, fear before vs after, the liking-gap chart).
- [ ] **My own check:** say yes to one social plan a week for 8 weeks.

**If time runs short, cut in this order:**
1. The group table (needs the most new tech)
2. Event mode's cheat card
3. The question ladder

**With every release:**
- add the new steps to the usage events (app and Lambda)
- update the privacy policy when data goes somewhere new
- run `node scripts/insights.mjs` before planning the next step
