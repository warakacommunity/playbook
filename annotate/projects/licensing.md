---
title: "Dataset licensing"
sidebar_label: "Licensing"
sidebar_position: 6
description: "Choose a dataset license via a guided decision-tree wizard — 9 outcomes mapping to Creative Commons + proprietary."
mdx:
  format: md
---

# Dataset licensing

Every project that's going to produce a dataset other people might
use needs a **license** — the legal terms under which they can use,
modify, and redistribute it.

Most dataset owners haven't read the Creative Commons family in
detail, so AfriAnnotate has a **guided decision-tree wizard**
that walks through 5–8 plain-English questions and recommends one
of nine license outcomes.

This is AfriAnnotate-specific — useful for academic / NGO datasets
where the license decision is often deferred or made wrongly because
the team didn't have time to research CC terms.

## Where it lives

**Project → Settings → Licensing**.

Visible to **Owner** and **Admin**. **Manager** sees a read-only
summary of the chosen license. **Reviewer** / **Annotator** don't
see the tab — but the license badge is visible to everyone in the
project header so annotators know what terms their work is being
collected under.

## The decision tree

The wizard asks (in order, with branching):

1. **Is this dataset going to be public?** If no → **Proprietary**.
2. **Can commercial use be allowed?** Filters CC vs CC-NC family.
3. **Must derivative works be allowed?** Filters CC-ND vs the rest.
4. **Must downstream users credit you?** Filters CC0 vs CC-BY.
5. **Must derivatives use the same license?** Filters CC-BY-SA vs
   plain CC-BY.

The branches map to these nine outcomes:

| Outcome | SPDX identifier | Plain English |
|---|---|---|
| **CC0 1.0** | `CC0-1.0` | Public domain. Anyone can do anything, no credit required. |
| **CC-BY 4.0** | `CC-BY-4.0` | Use freely, including commercially, with credit. |
| **CC-BY-SA 4.0** | `CC-BY-SA-4.0` | As CC-BY, but derivative works must use the same license. |
| **CC-BY-ND 4.0** | `CC-BY-ND-4.0` | Use freely with credit, but no modifications (or share modifications privately). |
| **CC-BY-NC 4.0** | `CC-BY-NC-4.0` | Non-commercial use only, with credit. |
| **CC-BY-NC-SA 4.0** | `CC-BY-NC-SA-4.0` | Non-commercial, same-license derivatives, credit. |
| **CC-BY-NC-ND 4.0** | `CC-BY-NC-ND-4.0` | Non-commercial, no derivatives, credit. The most restrictive Creative Commons option. |
| **Proprietary** | `Proprietary` | Not public; specific terms negotiated per consumer. |
| **Restricted** | `Restricted` | Public but limited by ethics / consent constraints (e.g. researcher-only access, no redistribution). |

## What the wizard persists

The chosen license is stored as a JSON blob on `Project.license`:

```json
{
  "identifier": "CC-BY-SA-4.0",
  "name": "Creative Commons Attribution-ShareAlike 4.0",
  "url": "https://creativecommons.org/licenses/by-sa/4.0/",
  "summary": "Use freely, including commercially, with credit. Derivative works must use the same license.",
  "restricts_commercial": false,
  "restricts_derivatives": false,
  "requires_attribution": true,
  "requires_share_alike": true,
  "chosen_at": "2026-03-15T14:32:11Z",
  "chosen_by": 42,
  "reasoning": [
    {"question": "Will this dataset be public?", "answer": "yes"},
    {"question": "Can commercial use be allowed?", "answer": "yes"},
    {"question": "Must derivatives be allowed?", "answer": "yes"},
    {"question": "Must downstream users credit you?", "answer": "yes"},
    {"question": "Must derivatives use the same license?", "answer": "yes"}
  ]
}
```

The **reasoning trail** is the killer feature — six months later
when someone asks "why did we pick CC-BY-SA?", the answer is
recorded in the project itself.

## Changing the license later

Owners can re-run the wizard at any time. Picking a different
outcome **does not** retroactively change the license under which
existing exports were distributed — recipients of the v1 export
have v1 license terms. The new license applies to subsequent
exports.

For datasets where you need the license to flow downstream
correctly, include the SPDX identifier in your export manifest
(`exports/manifest.json` carries `license.identifier` and the URL).

## Where the license shows up

Once chosen, the license:

- Appears in the **project header** as a badge next to the name
- Is included in the **data export manifest** (the JSON sidecar that
  ships alongside any export)
- Surfaces in the **organisation-wide dataset listing** for org
  admins doing inventory ("which of our 47 projects use CC-BY-SA?")
- Is included in the **annotation export JSON** so individual
  task-level exports carry their license context

## Why a tree at all

Most dataset owners haven't read the CC family in detail. They pick
"CC-BY-SA" because it sounds permissive, not realising it requires
derivatives to use the same license — which is a non-starter for
many downstream consumers.

The wizard:
- Translates the questions into plain English ("can people use this
  for-profit?" rather than "do you allow commercial use?")
- Prevents impossible combinations (e.g. you can't have ShareAlike
  and No Derivatives at the same time)
- Forces a deliberate choice for restrictive options (the wizard
  shows a warning when the tree lands on CC-BY-NC-ND because it's
  the most restrictive)

## Quick reference

If you already know what you want:

| You want… | Pick… |
|---|---|
| Public domain — no strings attached | CC0 |
| Maximum reuse, just want credit | CC-BY |
| Like CC-BY but force the work to stay open | CC-BY-SA |
| Credit required, no remixing | CC-BY-ND |
| Academic / research only, no for-profit | CC-BY-NC |
| Same but with share-alike | CC-BY-NC-SA |
| Most restrictive: no commercial, no remixing | CC-BY-NC-ND |
| Not public yet (e.g. still curating) | Proprietary |
| Public but ethics-restricted | Restricted |

## What's next

- **[Project setup →](/annotate/projects/setup)** — the full project create flow
- **[Data security →](/annotate/projects/security-settings)** — per-project access
  controls (different from licensing — security controls *who can
  see* the data, licensing controls *what they can do with it*)
- **[Consent library →](/annotate/organization/consent)** — annotator-side
  consent for data use (different again — consent is the annotator's
  agreement to participate, license is the downstream consumer's
  terms)
