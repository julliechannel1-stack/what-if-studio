#!/bin/bash
# Per-segment assembly - FIXED method (skill section 7). Usage: bash assemble-seg-fixed.sh <seg>
# 1. Strip chunk audio to chunks-v/ (rm -rf first) 2. Concat video-only -c:v copy
# 3. Mix voice 0.8 + sfx sfxVol, amix normalize=0 4. Mono->stereo volume 0.7071 + pan
# 5. Two-pass loudnorm I=-14:TP=-1.5:LRA=11, -b:a 256k on pass 2 6. Mux to final.mp4
set -u
SLUG="moon-disappeared"
SEG="${1:?segment e.g. s01 required}"
SEGDIR="out/$SLUG-$SEG"
mkdir -p "out/$SLUG" "$SEGDIR" logs
rm -f "$SEGDIR/final.mp4" "$SEGDIR/video-only.mp4" "$SEGDIR/mixed.wav" "$SEGDIR/audio-norm.m4a"
rm -rf "$SEGDIR/chunks-v"
mkdir -p "$SEGDIR/chunks-v"
i=0
for chunk in $(ls "$SEGDIR"/chunks/*.mp4 | sort); do
  ffmpeg -nostdin -y -v error -i "$chunk" -an -c:v copy "$SEGDIR/chunks-v/$(printf '%04d' $i).mp4" || { echo "FAIL strip $chunk" >&2; exit 1; }
  i=$((i+1))
done
echo "$SEG: stripped $i chunks"
: > "$SEGDIR/chunks-v/list.txt"
for f in "$SEGDIR"/chunks-v/*.mp4; do echo "file '$PWD/$f'" >> "$SEGDIR/chunks-v/list.txt"; done
ffmpeg -nostdin -y -v error -f concat -safe 0 -i "$SEGDIR/chunks-v/list.txt" -c:v copy "$SEGDIR/video-only.mp4" || { echo "FAIL concat $SEG" >&2; exit 1; }
SFXVOL=$(python3 -c "import json; print(json.load(open('src/episodes/$SLUG-$SEG/timeline.json'))['audio']['sfxVol'])")
echo "$SEG: sfxVol=$SFXVOL"
ffmpeg -nostdin -y -v error -i "public/$SLUG-$SEG/voice.wav" -i "public/$SLUG-$SEG/sfx.wav" -filter_complex "[0:a]volume=0.8[a1];[1:a]volume=$SFXVOL[a2];[a1][a2]amix=inputs=2:normalize=0,volume=0.7071,pan=stereo|c0=c0|c1=c0[aout]" -map "[aout]" -c:a pcm_s16le -ar 48000 "$SEGDIR/mixed.wav" || { echo "FAIL mix $SEG" >&2; exit 1; }
ffmpeg -nostdin -y -v error -i "$SEGDIR/mixed.wav" -af "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" -f null - > "logs/loudnorm-$SEG-pass1.log" 2>&1 || { echo "FAIL loudnorm pass1 $SEG" >&2; exit 1; }
ffmpeg -nostdin -y -v error -i "$SEGDIR/mixed.wav" -af "loudnorm=I=-14:TP=-1.5:LRA=11" -b:a 256k "$SEGDIR/audio-norm.m4a" || { echo "FAIL loudnorm pass2 $SEG" >&2; exit 1; }
ffmpeg -nostdin -y -v error -i "$SEGDIR/video-only.mp4" -i "$SEGDIR/audio-norm.m4a" -c:v copy -c:a copy "$SEGDIR/final.mp4" || { echo "FAIL mux $SEG" >&2; exit 1; }
[ -s "$SEGDIR/final.mp4" ] || { echo "FAIL final empty $SEG" >&2; exit 1; }
FRAMES=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$SEGDIR/final.mp4")
EXPECTED=$(python3 -c "import json; print(json.load(open('src/episodes/$SLUG-$SEG/episode.json'))['frames'])")
echo "$SEG: final frames=$FRAMES expected=$EXPECTED size=$(stat -c%s "$SEGDIR/final.mp4")"
[ "$FRAMES" = "$EXPECTED" ] || { echo "FAIL frame mismatch $SEG $FRAMES != $EXPECTED" >&2; exit 1; }
echo "$SEG: OK"
