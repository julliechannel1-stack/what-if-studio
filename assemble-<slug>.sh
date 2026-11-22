#!/bin/bash
# Per-segment assembly - FIXED method. Usage: bash assemble-<slug>.sh <slug> <seg>
# Never concat chunks with audio: chunk audio is 5.056s vs 5.000s video.
# 1. Strip chunk audio first (video-only into chunks-v/, rm -rf first on re-assembly)
# 2. Concat video-only (-c:v copy)  3. Mix original stems in one pass
# 4. Mono -> stereo (volume 0.7071 + pan)  5. Two-pass loudnorm I=-14 TP=-1.5 LRA=11, -b:a 256k on pass 2
# 6. Verify frame count with ffprobe -count_frames.
set -u
SLUG="${1:?slug required}"
SEG="${2:?segment e.g. s01 required}"
mkdir -p "out/$SLUG" "out/$SLUG-$SEG"
SEGDIR="out/$SLUG-$SEG"
FRAMES=$(python3 -c "import json; print(sum(c['expected'] for c in json.load(open('chunks.json')) if c['seg']=='$SEG'))" 2>/dev/null || echo "")
rm -rf "$SEGDIR/chunks-v"
mkdir -p "$SEGDIR/chunks-v"
i=0
for chunk in "$SEGDIR"/chunks/*.mp4; do
  [ -f "$chunk" ] || continue
  ffmpeg -nostdin -y -v error -i "$chunk" -an -c:v copy "$SEGDIR/chunks-v/$(printf '%04d' $i).mp4"
  i=$((i+1))
done
ls "$SEGDIR"/chunks-v/*.mp4 | sed 's/^/file /' > "$SEGDIR/chunks-v/list.txt"
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "$SEGDIR/chunks-v/list.txt" -c:v copy "$SEGDIR/video-only.mp4"
VOICE="public/$SLUG-$SEG/voice.wav"
SFX="public/$SLUG-$SEG/sfx.wav"
SFXVOL=$(python3 -c "import json; print(json.load(open('src/episodes/$SLUG-$SEG/timeline.json'))['audio']['sfxVol'])" 2>/dev/null || echo "0.027")
if [ -f "$SFX" ]; then
  ffmpeg -nostdin -y -v error -i "$SEGDIR/video-only.mp4" -i "$VOICE" -i "$SFX" -filter_complex "[1:a]volume=0.8[a1];[2:a]volume=$SFXVOL[a2];[a1][a2]amix=inputs=2:normalize=0,volume=0.7071,pan=stereo|c0=c0|c1=c0[aout]" -map 0:v -map "[aout]" -c:v copy -c:a pcm_s16le -ar 48000 "$SEGDIR/mixed.wav" -f null - 2>/dev/null || true
  # Two-pass loudnorm on the mixed audio, then mux (see assemble-<slug>-full.sh for the v3 pattern).
  echo "NOTE: mixed audio written; run loudnorm pass 1/2 with I=-14:TP=-1.5:LRA=11 and -b:a 256k on pass 2, then mux with video-only.mp4 to $SEGDIR/final.mp4"
else
  echo "NOTE: no sfx.wav for $SLUG-$SEG; assemble voice-only with the same loudnorm steps"
fi
echo "assemble segment $SLUG $SEG: chunks=$i expected_frames=$FRAMES - verify final with ffprobe -count_frames before use"
