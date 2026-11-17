#!/usr/bin/env node
// The coach prompt lives in two places: app.js (copied into ChatGPT / Claude) and cloud/src/coach-prompt.mjs
// (instant feedback). This checks that both give exactly the same prompt for a range of talks; release.sh runs it.
//   node scripts/check-prompt.mjs
import { readFileSync } from 'node:fs';
import { coachPrompt as server } from '../cloud/src/coach-prompt.mjs';

const src = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const grab = re => { const m = src.match(re); if (!m) throw new Error(`Not found in app.js: ${re}`); return m[0]; };
const code = [grab(/const mmss=.*\n/), grab(/const PACE_BANDS=.*\n/), grab(/function paceOf\([\s\S]*?\n}\n/),
  grab(/function buildCoachPrompt\([\s\S]*?\n}\n/)].join('\n');
const app = new Function(`${code}\nreturn buildCoachPrompt;`)();

const talk = 'I wake up at seven and drink a glass of water, then I go for a run in the park. '.repeat(6);
const cases = [];
for (const spokeSec of [0, 12, 75]) for (const targetMin of [1, 2.5, 5])
  cases.push({ topic: 'Describe your morning routine.', transcript: talk, spokeSec, targetMin });

let bad = 0;
for (const c of cases) {
  const a = app(c), b = server(c);
  if (a !== b) {
    bad++;
    const i = [...a].findIndex((ch, k) => ch !== b[k]);
    console.error(`Different for ${JSON.stringify({ ...c, transcript: '…' })} at:\n  app:    ${JSON.stringify(a.slice(i - 30, i + 50))}\n  server: ${JSON.stringify(b.slice(i - 30, i + 50))}`);
  }
}
if (bad) { console.error(`${bad} of ${cases.length} prompts differ: update cloud/src/coach-prompt.mjs to match app.js.`); process.exit(1); }
console.log(`Coach prompts match (${cases.length} cases).`);
