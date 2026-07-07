#!/usr/bin/env bash
#
# mark-draft-chapters.sh — enforce a "default-in-development" publishing
# policy for a Docusaurus docs tree. Every .md / .mdx file that does NOT
# have `ready: true` in its frontmatter gets `wip: true` injected, which
# a theme swizzle renders as an "in development" banner at the top of
# the page.
#
# Chapters remain visible in the sidebar so users see the full outline,
# but readers know at a glance which content is still being written.
#
# Semantics:
#   ready: true            → publishable. Script ensures `wip:` is absent.
#   ready missing/false    → in development. Script injects `wip: true`.
#                            Docusaurus builds the page; theme prepends
#                            a banner reading "This chapter is in
#                            development" so the sidebar stays complete.
#
# Idempotent — safe to re-run. Detects existing state and only mutates
# files that need mutating.
#
# Usage:
#   ./scripts/mark-draft-chapters.sh <docs-dir> [--dry-run]
#   ./scripts/mark-draft-chapters.sh <docs-dir> --unmark   # remove all wip: markers (local writing pass)
#
# Wire into the playbook's build pipeline (playbook's package.json):
#
#   {
#     "scripts": {
#       "prebuild": "bash /path/to/mark-draft-chapters.sh docs",
#       "build": "docusaurus build",
#       ...
#     }
#   }
#
# To publish a chapter: edit its frontmatter to add `ready: true` and
# commit. Next production build shows it. No other action needed.
#
set -euo pipefail

DOCS_DIR=""
DRY_RUN=0
UNMARK=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --unmark)  UNMARK=1;  shift ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^# \{0,1\}//' | head -40
      exit 0 ;;
    *) DOCS_DIR="$1"; shift ;;
  esac
done

if [[ -z "$DOCS_DIR" ]]; then
  echo "Usage: $0 <docs-dir> [--dry-run] [--unmark]" >&2
  exit 1
fi

if [[ ! -d "$DOCS_DIR" ]]; then
  echo "Not a directory: $DOCS_DIR" >&2
  exit 1
fi

hidden=0
published=0
untouched=0
unmarked=0

while IFS= read -r -d '' file; do
  has_frontmatter=0
  ready=0
  draft=0

  # Detect frontmatter
  if head -1 "$file" | grep -qE '^---[[:space:]]*$'; then
    has_frontmatter=1
    # Extract frontmatter block (between first two ---)
    fm="$(awk '/^---[[:space:]]*$/{c++; if(c==1){next} if(c==2){exit}} c==1' "$file")"
    if echo "$fm" | grep -qE '^ready:[[:space:]]*true[[:space:]]*$'; then ready=1; fi
    if echo "$fm" | grep -qE '^wip:[[:space:]]*true[[:space:]]*$'; then draft=1; fi
  fi

  # --unmark mode: strip any wip: true so the writer sees everything in prod
  # (typically only used before a local review, not for production)
  if [[ $UNMARK -eq 1 ]]; then
    if [[ $draft -eq 1 ]]; then
      unmarked=$((unmarked + 1))
      echo "  ← $file  (removing wip: true)"
      if [[ $DRY_RUN -eq 0 ]]; then
        tmp="$(mktemp)"
        awk '
          BEGIN{c=0}
          /^---[[:space:]]*$/ {c++; print; next}
          c==1 && /^wip:[[:space:]]*true[[:space:]]*$/ {next}
          {print}
        ' "$file" > "$tmp"
        mv "$tmp" "$file"
      fi
    else
      untouched=$((untouched + 1))
    fi
    continue
  fi

  # Normal mode: enforce default-hide policy
  if [[ $ready -eq 1 ]]; then
    # Ready to publish — ensure wip: true is NOT present
    if [[ $draft -eq 1 ]]; then
      published=$((published + 1))
      echo "  ✓ $file  (ready: true → removing stale wip: true)"
      if [[ $DRY_RUN -eq 0 ]]; then
        tmp="$(mktemp)"
        awk '
          BEGIN{c=0}
          /^---[[:space:]]*$/ {c++; print; next}
          c==1 && /^wip:[[:space:]]*true[[:space:]]*$/ {next}
          {print}
        ' "$file" > "$tmp"
        mv "$tmp" "$file"
      fi
    else
      published=$((published + 1))
    fi
    continue
  fi

  # Not ready — enforce wip: true
  if [[ $draft -eq 1 ]]; then
    untouched=$((untouched + 1))
    continue
  fi

  hidden=$((hidden + 1))
  echo "  → $file  (no ready: true → adding wip: true)"
  if [[ $DRY_RUN -eq 0 ]]; then
    tmp="$(mktemp)"
    if [[ $has_frontmatter -eq 1 ]]; then
      # Insert wip: true after opening --- (first line)
      awk 'BEGIN{c=0} /^---[[:space:]]*$/{print; c++; if(c==1) print "wip: true"; next} {print}' "$file" > "$tmp"
    else
      # Prepend new frontmatter block
      {
        echo "---"
        echo "wip: true"
        echo "---"
        echo
        cat "$file"
      } > "$tmp"
    fi
    mv "$tmp" "$file"
  fi
done < <(find "$DOCS_DIR" -type f \( -name '*.md' -o -name '*.mdx' \) -print0)

echo
if [[ $UNMARK -eq 1 ]]; then
  echo "Unmarked (wip: true removed): $unmarked"
  echo "Untouched:                     $untouched"
else
  echo "Newly hidden (wip: true added):  $hidden"
  echo "Ready to publish (ready: true):    $published"
  echo "Untouched (already draft):         $untouched"
fi

if [[ $DRY_RUN -eq 1 ]]; then
  echo
  echo "Dry run — no files modified."
fi
