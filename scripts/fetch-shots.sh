#!/usr/bin/env bash
# Fetches website screenshots via thum.io into public/projects/ (PNG).
# thum.io serves a "generating" GIF on the first hit, then the real PNG/JPEG
# once the capture is ready, so we poll on content-type.
set -u
cd "$(dirname "$0")/.." || exit 1
mkdir -p public/projects

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

declare -a NAMES=(california-alliance gree-energy bali-pet-crusaders fanaloka)
declare -a URLS=(
  "https://castudentparentalliance.org/"
  "https://gree-energy.com/"
  "https://www.balipetcrusaders.org/"
  "https://fanaloka.co/"
)

for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"
  url="${URLS[$i]}"
  tmp="public/projects/${name}.tmp.png"
  out="public/projects/${name}.webp"
  src="https://image.thum.io/get/width/1280/crop/880/${url}"
  echo ">> ${name} <- ${url}"
  ok=0
  for attempt in $(seq 1 15); do
    ct=$(curl -s -L -A "$UA" --max-time 70 -o "$tmp" -w "%{content_type}" "$src")
    sz=$(stat -f%z "$tmp" 2>/dev/null || echo 0)
    echo "   attempt ${attempt}: type=${ct} size=${sz}"
    case "$ct" in
      image/jpeg*|image/png*) ok=1; break;;
    esac
    sleep 8
  done
  if [ "$ok" -eq 1 ]; then
    # Optimise to WebP (~1200px wide, q80) — typically 90%+ smaller than the PNG.
    cwebp -quiet -q 80 -resize 1200 0 "$tmp" -o "$out" && rm -f "$tmp"
    echo "   OK ${name} -> ${out} ($(stat -f%z "$out" 2>/dev/null || echo 0) bytes)"
  else
    rm -f "$tmp"
    echo "   !! ${name} did not resolve to a real image"
  fi
done
echo "DONE"
ls -la public/projects/