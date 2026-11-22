# What If Your Cat Turned Into a Girl? — full-video build plan

Prepared 2026-11-19 ~14:10 PST, while waiting on the user's reaction to the
20s sample. Do NOT start the full render until the user says go (or gives
changes to the sample) — this file exists so the build can start immediately
on their word, inside the 1.2-hour topic-to-link limit.

## Status at preparation time

- Reference video watched in full with sound twice (browser task
  b577cb75-5ddf-5c8a-b042-99d092fb9b32, 21:13–21:29 UTC): "What If Your
  Cat Turned Into a Girl?", The What If Door, 6:17, published Nov 15 2026,
  122,242 views / 2,162 likes / 251 comments. A–Z breakdown delivered in
  chat 2026-11-19 21:29 UTC (13:29 PST).
- 20s sample delivered in chat 2026-11-19 21:25 UTC (13:25 PST):
  `out/cat-girl-sample/cat-girl-sample-20s.mp4`, 1.3 MB, MD5
  4b27009732bee0f7e1dbce3a35c3dc99, 600 frames / 20.000s, 1920x1080 30fps,
  -14.26 LUFS, TP -1.28 dBTP, A/V ~9ms. No Gofile upload made for it.
- Sample script (60 words, `public/cat-girl-sample-s01/script.txt`):
  "It's three in the morning. Something knocks things off your nightstand.
  You turn on the lamp. There she is, on your dresser, in a gray hoodie
  with a white patch, just like Opal. Your cat just turned into a girl.
  She blinks slow and says hi. Cats almost never meow at each other. That
  sound was always just for you."
- Assets already built: Opal character (`src/engine/opal.tsx` — gray hoodie
  #8A8D94, white chest patch, cat ears, tail with white tip), NightBedroom
  set, composition `CatGirlSampleS01`, tsc 0 errors.
- User has NOT yet reacted to the sample or given a go-ahead for the full
  video. The Moon video's Gofile upload is still awaiting a fresh yes and
  is a separate, paused thread — do not mix it into this build.

## Format decision (ready to execute)

- Length: ~6:30, matching the reference (6:17), NOT the Moon 10-minute
  template. 7 segments, one per story beat, ~950–1,050 words total.
- Voice: same single male narrator, second person ("you"), calm and warm.
  Opal's lines delivered softer by the same voice, as in the reference.
- Style: same flat 2D code style as the sample. Beat the reference where
  it is weak (per the A–Z): exact word-level visual sync, real timed SFX
  (knock, lamp click — already proven in the sample), no sliding walks or
  floating anatomy, one proper fact graphic per fact, per-shot QA.
- Segment 1 IS the delivered 20s sample, reused as-is (composition
  `CatGirlSampleS01`). That saves a full segment of build/render time.

## Segment plan

| Seg | Title / beat | Approx words | Fact woven in (source as recorded in A–Z) | Sets / assets needed |
|-----|--------------|--------------|-------------------------------------------|----------------------|
| 1 | Three in the morning (hook) — REUSE sample | 60 (done) | Adult cats almost never meow at each other — meow is mostly for humans (Nicastro & Owren, Cornell, J. Comp. Psych. 2003) | Done: NightBedroom, Opal |
| 2 | Day 1: breakfast, doughnut, tuna, sunbeam, tiny box — "It's mine now" | ~150 | Cats can't taste sweet — sweet taste gene missing (2005) | Kitchen set, sunbeam, box |
| 3 | Rules, and her name — she hears you, she decides whether to answer | ~150 | Cats can tell their own name apart (2019 Japan study) | Living room set |
| 4 | Day 3: pigeons, a dog, the café — she pushes a full cup off the counter, you get banned, "she calls it a good day" | ~170 | (none — pure story beat; keep pace) | Street/park, café counter, cup + splash SFX |
| 5 | Day 4: the vet — she's been scared of that place for three years and you never knew (emotional turn) | ~170 | Slow blink works like a smile (2020, University of Sussex — the reference's only on-screen diagram; do a proper fact graphic here) | Vet room (mint walls, orange chairs per reference palette) |
| 6 | Day 5–6: landlord Mr. Doyle, no pets on the lease — but now there's no pet, there's a stranger; then the cat café, eleven cats in a line like she's the manager | ~170 | Cat buried next to a person in Cyprus, ~9,500 years ago | Hallway/door, cat café set, 11-cat line-up |
| 7 | Last night: the answer — everybody at the shelter reached for her, you were the only one who sat on the floor and waited. "Cats choose the ones who wait." Loop ending: 3:12 AM again, cat on the dresser, slow blink back, she pushes your watch off anyway. End question for comments: "If your pet turned human for one week, what would they say to you first?" | ~180 | (none — payoff + loop; reuse NightBedroom) | NightBedroom (reuse), watch prop |

Total ~1,050 words ≈ 6:30 at the sample's pace. Withheld mystery
("I picked you" — "Not yet") planted in segment 2/3, paid off in segment 7,
exactly as the reference structures it.

## Build / render plan (local fast pipeline, proven)

- Script + voice + build per the skill v2 pipeline; full-segment renders
  (not 125-chunk renders) via Remotion chrome-headless-shell.
- Proven speeds: Moon s01 full segment 1,910 frames in 2m29s; cat sample
  600 frames in ~53s. 6 new segments at ~2–2.5 min each, 3 lanes in
  parallel → ~5–8 min render total.
- Assemble + loudnorm to -14.00 LUFS, TP ≤ -1.0 dBTP, fast QA capped at
  15 min (frame count exact, decode clean, A/V offset per segment).
- Budget inside 1.2h: script/voice/build ~15–20 min, render ~8 min,
  assembly + QA ~20 min, upload ~5 min. Comfortably inside, provided the
  build starts on the user's go-ahead with no re-analysis.
- Deliverable: finished video link (Gofile, same as Moon plan — needs the
  user's fresh yes at upload time, as before).

## What still needs the user

1. Reaction to the 20s sample — is this the quality/style for the full video?
2. Any changes (character, voice, pacing, length)?
3. Go-ahead to build the full version (their autopilot instruction covers
   the build itself; the sample-first sequence they ordered is the reason
   this plan waits for their word).
