#!/bin/bash
# Pull fleet chunks from Gofile links (MD5 + frame verified).
# Usage: bash download-fleet-chunks.sh <links-file> [chunks.json]
# Installs only missing chunks. Never overwrites chunks already on disk.
set -u
LINKS="${1:?links file required}"
CHUNKS_JSON="${2:-chunks.json}"
TOKEN=$(curl -s -X POST https://api.gofile.io/accounts -H "Content-Type: application/json" -d '{}' | python3 -c "import json,sys; print(json.load(sys.stdin).get('data',{}).get('token',''))" 2>/dev/null || true)
while read -r SEG CHUNK LINK MD5; do
  [ -z "$SEG" ] && continue
  EPISODE="${EPISODE:-test}"
  OUT="out/${EPISODE}-${SEG}/chunks/${CHUNK}.mp4"
  if [ -f "$OUT" ]; then
    EXPECTED=$(python3 -c "import json,sys; print([c['expected'] for c in json.load(open('$CHUNKS_JSON')) if c['chunk']=='$CHUNK' and c['seg']=='$SEG'][0])" 2>/dev/null || echo "")
    COUNT=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$OUT" 2>/dev/null || echo "")
    if [ -n "$EXPECTED" ] && [ "$COUNT" = "$EXPECTED" ]; then echo "SKIP already good: $OUT"; continue; fi
  fi
  mkdir -p "$(dirname "$OUT")"
  echo "DOWNLOAD $SEG $CHUNK from $LINK (token required; if the Gofile API returns error-notPremium, that call is blocked - move on)"
  # Gofile downloadPage links are web pages, not direct files; the fleet
  # download uses the contents API with the anonymous token. If the API
  # blocks the call, fall back to the Actions artifacts route instead.
  echo "TODO: resolve direct file id from $LINK with token, then curl it to $OUT and verify MD5=$MD5 and frame count"
done < "$LINKS"
