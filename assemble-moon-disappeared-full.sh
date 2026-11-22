#!/bin/bash
# Full assembly v3 sample-accurate for moon-disappeared. Ready to run at 125/125.
# 1. Decode each segment final audio to WAV, trim to frames*1600 samples.
# 2. Concat WAVs, concat video-only trimmed MP4s.
# 3. True two-pass loudnorm I=-14 TP=-1 LRA=11 (pass1 measures, pass2 uses measured values), -b:a 256k on pass 2, then mux.
# Usage: bash assemble-moon-disappeared-full.sh
set -u
cd "$(dirname "$0")"
SLUG="moon-disappeared"
mkdir -p "out/$SLUG" logs
rm -f "out/$SLUG/audio-list.txt" "out/$SLUG/video-list.txt"
for seg in s01 s02 s03 s04 s05 s06 s07 s08 s09 s10; do
  FINAL="out/$SLUG-$seg/final.mp4"
  [ -f "$FINAL" ] || { echo "missing segment final: $FINAL" >&2; exit 1; }
  FRAMES=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$FINAL")
  SAMPLES=$((FRAMES * 1600))
  echo "$seg frames=$FRAMES samples=$SAMPLES"
  ffmpeg -nostdin -y -v error -i "$FINAL" -vn -ac 2 -ar 48000 "out/$SLUG/$seg.wav"
  ffmpeg -nostdin -y -v error -i "out/$SLUG/$seg.wav" -af "atrim=end_sample=$SAMPLES" "out/$SLUG/$seg-trim.wav"
  echo "file '$seg-trim.wav'" >> "out/$SLUG/audio-list.txt"
  echo "file '../$SLUG-$seg/final.mp4'" >> "out/$SLUG/video-list.txt"
done
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "out/$SLUG/audio-list.txt" -c:a copy "out/$SLUG/full.wav"
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "out/$SLUG/video-list.txt" -c:v copy -an "out/$SLUG/video-only.mp4"
# Pass 1: measure
ffmpeg -nostdin -y -i "out/$SLUG/full.wav" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2> "logs/loudnorm-$SLUG-pass1.log"
python3 - "logs/loudnorm-$SLUG-pass1.log" > "logs/loudnorm-$SLUG-params.txt" <<'PYEOF'
import json, re, sys
text = open(sys.argv[1]).read()
m = re.search(r'\{[^}]*"input_i"[^}]*\}', text, re.S)
if not m:
    print("ERROR: no loudnorm JSON in pass1 log", file=sys.stderr); sys.exit(1)
d = json.loads(m.group(0))
print(f"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}:linear=true")
PYEOF
cat "logs/loudnorm-$SLUG-params.txt"
PARAMS=$(cat "logs/loudnorm-$SLUG-params.txt")
# Pass 2: apply measured values, -b:a 256k
ffmpeg -nostdin -y -v error -i "out/$SLUG/full.wav" -af "loudnorm=I=-14:TP=-1:LRA=11:$PARAMS" -b:a 256k "out/$SLUG/full-norm.m4a"
rm -f "out/$SLUG/$SLUG-final.mp4"
ffmpeg -nostdin -y -v error -i "out/$SLUG/video-only.mp4" -i "out/$SLUG/full-norm.m4a" -c:v copy -c:a copy "out/$SLUG/$SLUG-final.mp4"
echo "frames:"
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "out/$SLUG/$SLUG-final.mp4"
ls -lh "out/$SLUG/$SLUG-final.mp4"
echo "full assembly done: out/$SLUG/$SLUG-final.mp4 - run QA before delivery"
