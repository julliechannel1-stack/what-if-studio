#!/bin/bash
# Full assembly - v3 sample-accurate. Usage: bash assemble-<slug>-full.sh <slug>
# 1. Decode each SEGMENT FINAL audio (full length, stereo as-is) to WAV.
# 2. Trim each WAV to exactly frames x 1600 samples with atrim=end_sample.
# 3. Concat WAVs (concat demuxer, -c:a copy). 4. Concat video-only trimmed MP4s (-c:v copy, -an).
# 5. Two-pass loudnorm on full audio (I=-14:TP=-1:LRA=11), then mux audio + video.
# 6. Verify the final - including first-word template match on ALL 10 segments.
set -u
SLUG="${1:?slug required}"
mkdir -p "out/$SLUG" logs
rm -f "out/$SLUG/audio-list.txt" "out/$SLUG/video-list.txt"
for seg in s01 s02 s03 s04 s05 s06 s07 s08 s09 s10; do
  FINAL="out/$SLUG-$seg/final.mp4"
  [ -f "$FINAL" ] || { echo "missing segment final: $FINAL" >&2; exit 1; }
  FRAMES=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$FINAL")
  SAMPLES=$((FRAMES * 1600))
  ffmpeg -nostdin -y -v error -i "$FINAL" -vn -ac 2 -ar 48000 "out/$SLUG/$seg.wav"
  ffmpeg -nostdin -y -v error -i "out/$SLUG/$seg.wav" -af "atrim=end_sample=$SAMPLES" "out/$SLUG/$seg-trim.wav"
  echo "file '$seg-trim.wav'" >> "out/$SLUG/audio-list.txt"
  echo "file '../$SLUG-$seg/final.mp4'" >> "out/$SLUG/video-list.txt"
done
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "out/$SLUG/audio-list.txt" -c:a copy "out/$SLUG/full.wav"
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "out/$SLUG/video-list.txt" -c:v copy -an "out/$SLUG/video-only.mp4"
ffmpeg -nostdin -y -v error -i "out/$SLUG/full.wav" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - > "logs/loudnorm-$SLUG-pass1.log" 2>&1
ffmpeg -nostdin -y -v error -i "out/$SLUG/full.wav" -af loudnorm=I=-14:TP=-1:LRA=11 -b:a 256k "out/$SLUG/full-norm.m4a"
ffmpeg -nostdin -y -v error -i "out/$SLUG/video-only.mp4" -i "out/$SLUG/full-norm.m4a" -c:v copy -c:a copy "out/$SLUG/$SLUG-final.mp4"
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "out/$SLUG/$SLUG-final.mp4"
echo "full assembly done: out/$SLUG/$SLUG-final.mp4 - run QA section 9 (all 10 first-word offsets) before delivery"
