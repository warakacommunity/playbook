# AfriAnnotate screenshots & recordings

Screenshots and annotation-process recordings of the AfriAnnotate annotation
tool (this repo, run locally) across every label type, captured for use in the
AfriPlaybook.

Generated against a local server on `http://localhost:8080`, seeded with the 34
demo projects from `manage.py seed_sample_projects` and the tester accounts from
`manage.py seed_testers` (owner: `owner@afri.test`).

## Structure

Folders are grouped by modality; each project gets its own subfolder.

```
00-auth/                login-email, login-password
00-overview/            projects-list (all 34 demo projects)
00-workflow/            project creation + CSV data upload (steps + process.webm/mp4)
01-text-nlp/            20 projects   (sentiment, NER, NLI, QA, taxonomy, …)
02-vision-documents/     8 projects   (classification, bbox, polygon, brush,
                                       keypoints, OCR, PDF, HTML)
03-audio/                3 projects   (transcription, event class., segmentation)
04-video/                2 projects   (event timeline, overall classification)
05-timeseries/           1 project    (event tagging)
06-project-settings/    general, labeling-interface, annotation, quality
07-organization/        members
```

Each project subfolder (e.g. `01-text-nlp/15-named-entity-recognition/`) holds
the full set:

```
1-data-manager.png      task grid + per-task annotation counts
2-labeling-editor.png   the labeling interface for the first task
3-label-selected.png    after selecting the first label/choice (hotkey 1)
4-process.webm          screen recording of the annotation being performed
4-process.mp4           same recording, H.264 1080p (for editing)
5-annotated.png         the finished annotation
```

The recording is a real annotation driven by the mouse — boxes are dragged,
polygons traced, brush masks painted, keypoints placed, text spans tagged,
audio/timeseries regions dragged, choices/ratings set — derived per project from
its label config. Videos are 1920×1080. WebM is Playwright's native output; the
MP4 (CRF 18) is for editors. Trim as needed before adding to the playbook.

Known limitation: the hierarchical-taxonomy clip opens the taxonomy tree but does
not pick a leaf (the others complete fully).

## Scripts

- `shoot.mjs` — captures the static screenshots (1/2/3 + settings + org).
- `workflow.mjs` — records the full create-project flow end to end: name it,
  pick a labeling template, upload `sample-tasks.csv` (5 rows), choose "List of
  tasks", save, then **label all 5 tasks** and return to the data manager showing
  them completed (`00-workflow/project-creation/`, steps 01–15 + process.webm/mp4).
- `record-all.mjs` — logs in once, saves auth state, then records a 1080p video
  of an annotation for every project (re-using the saved state so the login
  rate-limit is never re-hit).
- `convert-to-mp4.sh` — converts every `4-process.webm` to `4-process.mp4`
  (H.264, CRF 18, faststart).

## Re-generating

1. Start the local server (from the repo root, venv at `.venv-ls`):

   ```
   FRONTEND_HMR=false FRONTEND_HOSTNAME= LS_CSP_REPORT_ONLY=1 \
     .venv-ls/bin/python label_studio/manage.py runserver 0.0.0.0:8080 --noreload
   ```

   - `FRONTEND_HMR=false` serves the built frontend from Django (not the HMR
     dev server on :8010).
   - `LS_CSP_REPORT_ONLY=1` lets the demo media (external image/PDF URLs) load
     instead of being blocked by the enforced Content-Security-Policy.

2. Capture:

   ```
   node afriannotate-screenshots/shoot.mjs        # screenshots
   node afriannotate-screenshots/record-all.mjs   # videos (all 34)
   bash afriannotate-screenshots/convert-to-mp4.sh
   ```

Notes: login is a single clean attempt — the auth probe endpoints are
rate-limited per server process, so repeated logins trip "Too many requests";
restart the server to reset. Demo media uses public sample assets, so a few
external images/PDFs may vary or 404 over time.
