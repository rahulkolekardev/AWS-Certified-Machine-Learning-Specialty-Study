#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EBOOK_DIR="${ROOT_DIR}/ebook"
MANIFEST="${ROOT_DIR}/manifest-sha256.txt"
ZIP_FILE="${ROOT_DIR}/aws-ml-ebook.zip"

echo "==> Validating basic HTML structure..."

# Simple check that each HTML file has a <title> tag
missing_titles=0
while IFS= read -r -d '' file; do
  if ! grep -qi "<title>" "$file"; then
    echo "Missing <title> in: $file"
    missing_titles=$((missing_titles + 1))
  fi
done < <(find "$EBOOK_DIR" -name "*.html" -print0)

if [[ $missing_titles -ne 0 ]]; then
  echo "Found HTML files without <title>. Please fix before packaging."
  exit 1
fi

echo "==> Checking local link targets..."

python3 - << 'PY'
import os
from html.parser import HTMLParser

root = os.path.join(os.path.dirname(__file__), "ebook")

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.links.append(href)

errors = []
for dirpath, _, filenames in os.walk(root):
    for name in filenames:
        if not name.endswith(".html"):
            continue
        path = os.path.join(dirpath, name)
        rel_dir = os.path.relpath(dirpath, root)
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            parser = LinkParser()
            try:
                parser.feed(f.read())
            except Exception:
                continue
        for href in parser.links:
            if href.startswith(("http://", "https://", "mailto:", "#")):
                continue
            if href.startswith("#") or href == "":
                continue
            # Normalize relative paths
            joined = os.path.normpath(os.path.join(rel_dir, href))
            target = os.path.join(root, joined)
            if not os.path.exists(target.split("#")[0]):
                errors.append((os.path.relpath(path, root), href))

if errors:
    print("Broken local links detected:")
    for src, href in errors:
        print(f"  {src} -> {href}")
    raise SystemExit(1)
PY

echo "==> Building manifest..."

rm -f "$MANIFEST"
(
  cd "$ROOT_DIR"
  # Only include files under ebook/ in the manifest
  find ebook -type f -print0 | sort -z | xargs -0 sha256sum > "$MANIFEST"
)

echo "==> Creating ZIP archive..."
rm -f "$ZIP_FILE"
(
  cd "$ROOT_DIR"
  zip -rq "$ZIP_FILE" ebook manifest-sha256.txt
)

echo "==> Build complete."
echo "Ebook directory: $EBOOK_DIR"
echo "Manifest: $MANIFEST"
echo "ZIP archive: $ZIP_FILE"

