#!/bin/bash
# Chromium wrapper with WebGL domain-policy switches.
# Meta Chrome needs the Hatch WebGL domain-policy switches or it exits
# 13/SIGTRAPs ("Hatch WebGL domain policy is required for browser startup").
# Policy file: /home/hatch/tmp-render/webgl-policy.txt
# Contents (2026-11-19, created by render probe): a single line
#   hatch-webgl-all-origins-v1
# which is the binary's own "allow all origins" magic value - verified with
# the binary's validator:
#   chrome --hatch-webgl-allowed-domains-file=<file> \
#          --hatch-webgl-allowed-domains-sha256=<sha256> \
#          --hatch-validate-webgl-allowed-domains --version   # exits 0
# The binary requires BOTH switches: --hatch-webgl-allowed-domains-file and
# --hatch-webgl-allowed-domains-sha256 (lowercase hex SHA-256 of the file).
# Plain domain lists were rejected (localhost is non-registrable, and a bare
# domain list fails the contract check), so all-origins is the workable
# policy for local renders. If the policy file is missing, Chrome cannot
# start at all - the wrapper then exits with an error instead of silently
# launching a browser that SIGTRAPs. Never use the raw Chromium binary
# directly for local renders; use this wrapper as REMOTION_BROWSER_EXECUTABLE.
POLICY_FILE="/home/hatch/tmp-render/webgl-policy.txt"
CHROME=""
# Meta Chrome first (installed system-wide; PATH/~/.cache search misses it).
if [ -x "/opt/meta-chromium/chrome" ]; then
  CHROME="/opt/meta-chromium/chrome"
fi
if [ -z "$CHROME" ]; then
  for c in chromium chromium-browser google-chrome google-chrome-stable; do
    if command -v "$c" >/dev/null 2>&1; then CHROME="$(command -v "$c")"; break; fi
  done
fi
if [ -z "$CHROME" ]; then
  CHROME="$(find "$HOME/.cache" -type f \( -name chrome -o -name headless_shell \) 2>/dev/null | head -n 1)"
fi
if [ -z "$CHROME" ]; then
  echo "chrome-with-policy.sh: no Chromium binary found; run 'npx remotion browser ensure' first" >&2
  exit 1
fi
ARGS=()
# Chrome 157 blocks Remotion's http://localhost:3000 navigation with
# net::ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS (Local Network Access
# checks). The render server is local and trusted; disable that check.
ARGS+=(--disable-features=local-network-access-check)
if [ -f "$POLICY_FILE" ]; then
  POLICY_SHA="$(sha256sum "$POLICY_FILE" | cut -d' ' -f1)"
  ARGS+=(--hatch-webgl-allowed-domains-file="$POLICY_FILE" --hatch-webgl-allowed-domains-sha256="$POLICY_SHA")
else
  echo "chrome-with-policy.sh: policy file $POLICY_FILE missing - Meta Chrome exits 13 without it" >&2
  exit 1
fi
exec "$CHROME" "${ARGS[@]}" "$@"
