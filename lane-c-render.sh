#!/bin/bash
# RENDER LANE C: chunks.json indices 84..124 (c0084-c0124)
cd ~/workspace/what-if-studio || exit 1
mkdir -p .tmp logs
LOG="logs/lane-c.log"
START=$(date +%s)
echo "LANE C start $(date -Is)" | tee -a "$LOG"
BROWSER="node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell"

verify() {
  local f="$1" exp="$2"
  [ -f "$f" ] || return 1
  local n
  n=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$f" 2>/dev/null)
  [ "$n" = "$exp" ]
}

python3 -c "
import json
d=json.load(open('chunks.json'))
for e in d[84:125]:
    print(e['seg'], e['chunk'], e['comp'], e['frames'], e['expected'])
" > /tmp/lane-c-list.txt
wc -l /tmp/lane-c-list.txt | tee -a "$LOG"

SKIPPED=0; RENDERED=0; FAILED=()
while read -r seg chunk comp frames expected; do
  out="out/moon-disappeared-$seg/chunks/$chunk.mp4"
  if verify "$out" "$expected"; then
    echo "SKIP verified $chunk ($expected frames)" | tee -a "$LOG"
    SKIPPED=$((SKIPPED+1)); continue
  fi
  ok=0
  for attempt in 1 2 3; do
    echo "RENDER $chunk attempt $attempt comp=$comp frames=$frames -> $out $(date +%H:%M:%S)" | tee -a "$LOG"
    mkdir -p "out/moon-disappeared-$seg/chunks" .tmp
    if TMPDIR="$PWD/.tmp" npx remotion render src/index.ts "$comp" "$out" --frames="$frames" --concurrency 1 --timeout 120000 --log error --browser-executable "$BROWSER" >> "$LOG" 2>&1; then
      if verify "$out" "$expected"; then
        n=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$out")
        echo "OK $chunk frames=$n expected=$expected" | tee -a "$LOG"
        ok=1; RENDERED=$((RENDERED+1)); break
      else
        n=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$out" 2>/dev/null || echo MISSING)
        echo "VERIFY FAIL $chunk attempt $attempt got=$n expected=$expected" | tee -a "$LOG"
      fi
    else
      echo "RENDER FAIL $chunk attempt $attempt exit=$?" | tee -a "$LOG"
    fi
    rm -f "$out"
  done
  if [ "$ok" = 0 ]; then
    echo "FAILED $chunk after 3 attempts" | tee -a "$LOG"
    FAILED+=("$chunk")
  fi
done < /tmp/lane-c-list.txt

END=$(date +%s)
echo "LANE C done $(date -Is) elapsed=$((END-START))s skipped=$SKIPPED rendered=$RENDERED failed=${#FAILED[@]} failed_list=${FAILED[*]}" | tee -a "$LOG"
