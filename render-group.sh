#!/bin/bash
# One runner: render + verify + Gofile-upload its group.
# Usage: bash render-group.sh <group.json>   (group.json = JSON array of chunk objects)
set -u
GROUP_FILE="${1:?group json file required}"
GOFILE_SERVER="${GOFILE_SERVER:-store-na-phx-4}"
mkdir -p out
: > gofile-links.txt
mkdir -p logs
python3 - "$GROUP_FILE" <<'PYEOF' > logs/render-group-list.txt
import json, sys
group = json.load(open(sys.argv[1]))
for c in group:
    print(f"{c['seg']}|{c['chunk']}|{c['comp']}|{c['frames']}|{c['expected']}")
PYEOF
# List file stays in logs/ on the home disk, not /tmp.
while IFS='|' read -r SEG CHUNK COMP FRAMES EXPECTED; do
  [ -z "$SEG" ] && continue
  EPISODE="${EPISODE:-test}"
  OUT="out/${EPISODE}-${SEG}/chunks/${CHUNK}.mp4"
  mkdir -p "$(dirname "$OUT")"
  rm -f "$OUT"
  npx remotion render src/index.ts "$COMP" "$OUT" --frames="$FRAMES" --concurrency 1 --timeout 120000 --log error
  COUNT=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$OUT")
  if [ "$COUNT" != "$EXPECTED" ]; then
    echo "FAIL $SEG $CHUNK: ffprobe=$COUNT expected=$EXPECTED" >&2
    exit 1
  fi
  MD5=$(md5sum "$OUT" | awk '{print $1}')
  LINK=$(curl -s -F "file=@$OUT" "https://${GOFILE_SERVER}.gofile.io/contents/uploadfile" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('data',{}).get('downloadPage',''))" 2>/dev/null || true)
  echo "$SEG $CHUNK $LINK $MD5" >> gofile-links.txt
done < logs/render-group-list.txt
echo "render-group done: $(wc -l < gofile-links.txt) chunks"
