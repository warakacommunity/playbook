---
title: "Product tours"
sidebar_label: "Product tours"
sidebar_position: 6
description: "Guided interactive tutorials that walk new users through features the first time they encounter them."
mdx:
  format: md
---

# Product tours

Short interactive walkthroughs that highlight where to click + what
each control does. Surfaced **once per user per tour** — when the
user lands on a relevant page, the tour pops up; once dismissed or
completed, it doesn't show again.

This is platform infrastructure built on top of upstream — useful
for onboarding new annotators without writing custom training
materials.

## Where users see them

Tours surface contextually on first visit:

| Tour | Triggered when |
|---|---|
| **Create prompt** | First time the user opens **+ Create Prompt** on the prompts page |
| **Show autolabel button** | First time the user lands on a project with predictions available + an autolabel button visible |
| **Show ask AI** | First time the user opens a feature with the Ask-AI helper |
| **Prompts page** | First time the user lands on the prompts page |

Each tour is a sequence of **callouts** that point at specific UI
elements with an explanation, plus **Next / Previous** navigation.
The user can **Skip tour** to dismiss; dismissed tours don't
re-show.

## Where the tour content lives

Tour content is YAML, not code — operators can edit / add tours
without rebuilding the SPA. Files live at:

```
label_studio/users/product_tours/configs/
├── create_prompt.yml
├── prompts_page.yml
├── show_ask_ai.yml
└── show_autolabel_button.yml
```

Each file defines:

- `id` — unique tour identifier
- `steps` — array of `{selector, title, body, placement}` entries
  pointing at SPA elements
- `dependencies` — other tours that must be completed first (e.g.
  "show the prompts-page tour before the create-prompt tour")
- `trigger` — what event surfaces the tour (URL match, click,
  first-render)

## Tracking completion per user

Each user's tour state is persisted in the **UserProductTour**
model. When a user completes or dismisses a tour, the row is
updated; the SPA reads from this on every page load to decide
whether to show.

Operators can inspect user tour state via the Django admin at
`/admin/users/userproducttour/`.

## Resetting tours for a user

If a user wants to see a tour again (e.g. they dismissed it too
quickly), they can reset:

1. **Profile → Help → Reset product tours**
2. Confirm

This wipes their UserProductTour rows so all tours re-appear on
the next relevant page visit. Useful for documentation /
training-material screenshots that need the tour visible.

## Adding a new tour (operator)

1. Create a new `.yml` file under
   `label_studio/users/product_tours/configs/`
2. Define `id`, `steps`, optional `dependencies` + `trigger`
3. Restart the cloud Django (the tour list is loaded at boot)
4. The new tour starts surfacing for any user whose
   `UserProductTour` table doesn't yet have a row for it

Useful for onboarding new features — when you ship a feature
that needs explaining, drop a tour file rather than writing
docs.

## Disabling tours globally

For deployments where tours don't fit (e.g. internal tools where
users get formal training), disable platform-wide:

**Platform → Settings → Feature flags → `fflag_feat_product_tours`** → off.

Existing tour completion records stay; future tours don't surface.

## What's next

- **[Account →](/annotate/getting-started/account)** — the rest of the Profile page
- **[Sign up →](/annotate/getting-started/signup)** — the flow that lands users where
  the tours fire
