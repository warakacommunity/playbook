---
title: "Keyboard shortcuts"
sidebar_label: "Hotkeys"
sidebar_position: 2
description: "Keyboard shortcuts for the AfriAnnotate labeler — by tag, by phase, by platform."
mdx:
  format: md
---

# Keyboard shortcuts

AfriAnnotate's labeling interface is **keyboard-driven by
default** — every common action has a hotkey. The right-side panel
also shows the active set; press **?** anywhere in the labeler to
pop the full reference.

## Global

| Action | Mac | Windows / Linux |
|---|---|---|
| **Submit annotation** | `Cmd + Enter` | `Ctrl + Enter` |
| **Update annotation** (after edits) | `Cmd + Enter` | `Ctrl + Enter` |
| **Skip task** | `Cmd + Space` | `Ctrl + Space` |
| **Reject annotation** (reviewers) | `Cmd + Shift + R` | `Ctrl + Shift + R` |
| **Accept annotation** (reviewers) | `Cmd + Shift + A` | `Ctrl + Shift + A` |
| **Next task** | `→` | `→` |
| **Previous task** | `←` | `←` |
| **Undo** | `Cmd + Z` | `Ctrl + Z` |
| **Redo** | `Cmd + Shift + Z` | `Ctrl + Shift + Z` |
| **Toggle hotkey reference** | `?` | `?` |

Hold **Shift** when pressing submit/update to also lock the task as
**ground truth** for the project.

## Labeling labels (Choices, Labels)

When the labeler shows a list of labels (e.g. a `<Labels>` or
`<Choices>` tag), each label is bound to a number key:

| Action | Hotkey |
|---|---|
| Apply label #1 | `1` |
| Apply label #2 | `2` |
| Apply label #N | `N` (up to `9`) |
| Apply label #10+ | Click the label OR type its hotkey if set explicitly via `hotkey="..."` in the config |

You can override the auto-assigned hotkeys in the XML config:

```xml
<Choices name="sentiment" toName="txt">
  <Choice value="positive" hotkey="p"/>
  <Choice value="neutral" hotkey="n"/>
  <Choice value="negative" hotkey="g"/>
</Choices>
```

## Image labeling

| Action | Hotkey |
|---|---|
| Rectangle / bounding box tool | `R` |
| Polygon tool | `P` |
| Brush tool | `B` |
| KeyPoint tool | `K` |
| Ellipse tool | `O` |
| Pan / hand tool | `H` |
| Eraser tool | `E` |
| Magic wand (smart segment) | `W` |
| Delete selected region | `Backspace` or `Delete` |
| Deselect / cancel current draw | `Esc` |
| Duplicate selected region | `Cmd + D` / `Ctrl + D` |
| Select all regions | `Cmd + A` / `Ctrl + A` |
| Zoom in | `Cmd + +` / `Ctrl + +` |
| Zoom out | `Cmd + -` / `Ctrl + -` |
| Reset zoom | `Cmd + 0` / `Ctrl + 0` |
| Toggle region visibility (eye icon) | `V` while a region is selected |
| Overlap mode (draw over existing region) | Hold `Cmd` / `Ctrl` while drawing |

**Tip:** for tasks with many small regions, switch to the brush + eraser
combo — `B` to paint, `E` to erase, faster than drawing precise
rectangles.

## Text labeling (NER, spans)

| Action | Hotkey |
|---|---|
| Apply currently-selected label to highlighted text | `1`–`9` |
| Clear selection without labeling | `Esc` |
| Move cursor by word (instead of character) | `Option + ←/→` (Mac) / `Ctrl + ←/→` (Win) |
| Extend selection by word | `Option + Shift + ←/→` |
| Select to end of line | `Cmd + Shift + ↑/↓` (Mac) |
| Toggle word-vs-character selection mode | Set `granularity="word"` or `granularity="character"` in the `<Labels>` config |

## Audio labeling

| Action | Hotkey |
|---|---|
| Play / pause | `Space` |
| Seek backward 5 s | `←` |
| Seek forward 5 s | `→` |
| Increase playback speed | `=` |
| Decrease playback speed | `-` |
| Add region at current position | `R` |
| Delete selected region | `Backspace` |
| Snap region to current cursor | hold `Shift` while dragging boundary |

## Video labeling

| Action | Hotkey |
|---|---|
| Play / pause | `Space` |
| Step one frame forward | `.` |
| Step one frame backward | `,` |
| Step 10 frames forward | `Shift + .` |
| Step 10 frames backward | `Shift + ,` |
| Add keyframe at current position | `K` |
| Delete selected keyframe | `Backspace` |

## Relations between regions

After drawing two regions (bounding boxes, text spans, anything with
an ID):

1. Select the first region (click it).
2. Click the **link icon** in the Regions sidebar, OR press `Cmd + L` / `Ctrl + L`.
3. Click the second region.

A relation arrow appears. To delete it:

1. Click the relation arrow.
2. Press `Backspace` or `Delete`.

## Customising hotkeys

Per-tag hotkeys can be set in the XML config via the `hotkey`
attribute:

```xml
<Labels name="pii" toName="txt">
  <Label value="PERSON" hotkey="p"/>
  <Label value="EMAIL" hotkey="e"/>
  <Label value="PHONE" hotkey="n"/>
</Labels>
```

A few hotkeys are reserved by the platform (`Cmd + Enter` to submit,
`?` for help, etc.) and can't be overridden.

## Mobile devices

On phones and tablets without a hardware keyboard, all hotkeys are
unavailable. Use the on-screen toolbar buttons instead. If you
connect a Bluetooth keyboard, the hotkeys above all work.

The on-screen toolbar adapts to the tag type — the same `R` / `P` /
`B` tools are buttons in the toolbar.

## What's next

- **[Labeling guide →](/annotate/annotation/labeling)** — the full labeler walkthrough
- **[Labeling config →](/annotate/labeling-config/overview)** — XML reference
  for tags, including per-tag `hotkey="..."` attributes
- **[Comments →](/annotate/annotation/comments)** — comment workflow + linking comments
  to regions
