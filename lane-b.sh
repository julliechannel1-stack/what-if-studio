#!/bin/bash
# RENDER LANE B: chunks.json indices 42..83 (c0042-c0083)
cd ~/workspace/what-if-studio || exit 1
LOG=~/workspace/what-if-studio/lane-b.log
START=$(date +%s)
echo "LANE B START $(date -Is) start_epoch=$START" | tee "$LOG"
BROWSER="node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell"

python3 -c "
import json
data=json.load(open('chunks.json'))
for i in range(42,84):
    c=data[i]
    print(f\"{c['seg']}|{c['chunk']}|{c['comp']}|{c['frames']}|{c['expected']}\")
" > /tmp/lane-b-list.txt

SKIPPED=0; RENDERED=0; FAILED=0
FAILED_LIST=""

while IFS='|' read -r seg chunk comp frames expected; do
  out="out/moon-disappeared-$seg/chunks/$chunk.mp4"
  count=""
  if [ -f "$out" ]; then
    count=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$out" 2>/dev/null)
  fi
  if [ "$count" = "$expected" ]; then
    echo "SKIP $chunk ($seg $comp frames=$frames) count=$count expected=$expected" | tee -a "$LOG"
    SKIPPED=$((SKIPPED+1))
    continue
  fi
  echo "RENDER $chunk ($seg $comp frames=$frames) existing_count=${count:-none} expected=$expected" | tee -a "$LOG"
  ok=0
  for attempt in 1 2 3; do
    mkdir -p "$(dirname "$out")" .tmp
    echo "  attempt $attempt $chunk $(date -Is)" | tee -a "$LOG"
    TMPDIR="$PWD/.tmp" npx remotion render src/index.ts "$comp" "$out" --frames="$frames" --concurrency 1 --timeout 120000 --log error --browser-executable "$BROWSER" >> "$LOG" 2>&1
    rc=$?
    if [ -f "$out" ]; then
      count=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$out" 2>/dev/null)
    else
      count=""
    fi
    echo "  attempt $attempt $chunk render_rc=$rc count=${count:-none} expected=$expected" | tee -a "$LOG"
    if [ "$count" = "$expected" ]; then ok=1; break; fi
    sleep 2
  done
  if [ "$ok" = "1" ]; then
    echo "OK $chunk count=$count" | tee -a "$LOG"
    RENDERED=$((RENDERED+1))
  else
    echo "FAIL $chunk count=${count:-none} expected=$expected after 3 attempts" | tee -a "$LOG"
    FAILED=$((FAILED+1))
    FAILED_LIST="$FAILED_LIST $chunk"
  fi
done < /tmp/lane-b-list.txt

END=$(date +%s)
ELAPSED=$((END-START))
echo "LANE B DONE $(date -Is) elapsed=${ELAPSED}s skipped=$SKIPPED rendered=$RENDERED failed=$FAILED failed_list=[$FAILED_LIST ] verified_total=$((SKIPPED+RENDERED))" | tee -a "$LOG"
