# What If Studio

Pip Explain Why - What If animated episodes. Remotion + SVG, 1920x1080, 30 fps.

## Quick start

```bash
cd ~/workspace/what-if-studio
npm install
npx tsc --noEmit
npm run render:test
```

Test chunk: `out/test/test-chunk.mp4` (150 frames, TestChunk composition).
Verify it with:
```bash
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 out/test/test-chunk.mp4
```
Must print 150.

## Layout (skill section 12)

- `src/index.ts` - registers the Remotion root
- `src/Root.tsx` - compositions (TestChunk, TestS01)
- `src/engine/rig.tsx` - Pip character rig, LOOKS, LEG_LEN 140
- `src/engine/sets/dusk.tsx` - dusk set, spans beyond the frame
- `src/engine/kit.tsx` - Chip, FactCard, WordLine (pop overshoot clamped to 1.0)
- `src/engine/ui.tsx` - TitleCard, layoutWords (letterSpacing-aware)
- `src/episodes/test-s01/` - example segment: episode.json, index.tsx, shots.tsx, timeline.json, words.json
- `src/episodes/index.ts` - episode composition registry (add <Slug>S01..S10 here)
- `public/fonts/` - vendored fonts only. No Google Fonts at render time.
- `chunks.json` - authoritative chunk list
- `.github/workflows/` - render-fleet.yml, render-test.yml, hello-test.yml
- `split-chunks.py`, `render-group.sh`, `download-fleet-chunks.sh`, `launch-local.sh`
- `assemble-<slug>.sh` - per-segment assembly, fixed video-only method
- `assemble-<slug>-full.sh` - full assembly, v3 sample-accurate method
- `whisper_words_tiny.py` - Whisper tiny.en transcription + word timings

## GitHub fleet (blocked until login)

No GitHub login on this machine yet (`gh auth status` = not logged in) and no
remote repo yet. Once an established account is logged in:
`gh repo create <owner>/what-if-studio --public --source=. --push`
then `gh workflow run render-fleet.yml`. Do NOT create a fresh account to
run the 20-runner fleet - see the skill, section 1.2.
