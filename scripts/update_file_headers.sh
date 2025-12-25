#!/usr/bin/env bash

# Adds a normalized file path header to every page/component
# TypeScript file under the app/ and components/ directories.
# Existing first-line comments are replaced so paths stay accurate.

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

update_header() {
  local file="$1"
  local rel_path
  rel_path=$(realpath --relative-to="$ROOT_DIR" "$file")

  local first_line
  first_line=$(head -n 1 "$file")

  local start_line=1
  if [[ "$first_line" =~ ^// ]]; then
    start_line=2
  fi

  local tmp
  tmp=$(mktemp)

  {
    echo "// ${rel_path}"
    echo
    tail -n +"$start_line" "$file"
  } >"$tmp"

  if [[ -n $(tail -c 1 "$tmp" | tr -d '\n') ]]; then
    echo >>"$tmp"
  fi

  mv "$tmp" "$file"
}

export -f update_header
export ROOT_DIR

find "$ROOT_DIR/app" "$ROOT_DIR/components" -name "*.tsx" | sort | while read -r file; do
  update_header "$file"
done

echo "Headers updated for app/ and components/ TypeScript files."
