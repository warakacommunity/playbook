---
title: "Quick start"
description: "Get from zero to your first annotation in under five minutes."
sidebar_position: 1
mdx:
  format: md
slug: /
---

# Quick start

AfriAnnotate is a **cloud-deployed** annotation platform. Your team's
platform is hosted at a URL your **hoster** chose — typically
something like `label.example.org` or `annotate.your-org.com`. This
guide walks you from that URL to your first labeled task.

:::info Reference deployment
The team that maintains the AfriAnnotate open-source project runs a
reference deployment at
[**label.afriannotate.org**](https://label.afriannotate.org). If
you're using that instance, the screenshots and examples below
apply directly. If your team has its own deployment, swap the URL
+ platform name as appropriate.
:::

This page assumes you know the URL of your platform. Ask the
hoster (the person who deployed it) if not.

## 1. Create your account

1. Open your platform URL in a browser.
2. Type your email and click **Continue**. The platform routes you
   to either sign-in (if the address is known) or sign-up (if it's
   new).
3. Set a password (8+ characters). You'll get a verification email
   from `no-reply@<platform-domain>` — click the link to confirm
   the address.

   :::tip
   Verification emails are sent immediately at signup time. If
   yours doesn't arrive within a minute, check spam. Corporate mail
   filters sometimes block transactional mail — see
   [FAQ → Email + sign-in](/annotate/faq#email--sign-in) if you're stuck.
   :::

## 2. Land in your organisation

After verifying you'll see one of three landing states:

- **First user on the platform**: you're auto-promoted to **platform
  owner**. The platform auto-creates a default organisation around
  you. Rename it later in **Platform → Branding**.
- **Invited via an invite link**: you join the inviter's
  organisation automatically. Role defaults to **Annotator** unless
  the invite says otherwise.
- **Self-signed-up without an invite**: you're a real user but have
  no organisation membership yet. You'll see the **"You're not a
  member of any organisation yet"** page until a platform owner
  invites you, or until you open an invite link they send.

   :::tip
   Ask an existing platform owner to invite you from **Organization
   → Members → Invite people**. They can also pre-create your
   account with a role via **Platform → Users → + Create User**.
   :::

## 3. Create your first project

You'll need permission to create projects: **Owner**, **Admin**, or
**Manager** in your organisation. From the home page or sidebar:

1. Click **+ Create Project**.
2. **Name** the project (e.g. *Hausa sentiment v1*) and pick a
   workspace (or leave at *Unassigned org root*).
3. Choose a **Labeling Setup** — start from a template (Text
   Classification, Image Bounding Box, Audio Transcription, etc.)
   or write your own XML config.
4. **Upload data** — drag CSVs / JSONs / images / audio into the
   import card. The platform warns inline if uploaded data is
   missing any field the labeling config expects (e.g. config
   wants `$text` but the CSV has no `text` column).
5. Click **Save** — the project is live and you're on its
   dashboard.

## 4. Label your first task

1. From the project dashboard, click **Label All Tasks** (or
   **Label Next Task** to start one at a time).
2. Use the labeling interface to annotate. Hotkeys are shown in
   the right panel — press **?** anywhere to see them all.
3. Click **Submit** to save the annotation and move to the next
   task.

## 5. Invite your team

From the project, click **Members → Add**, pick people from your
org, and set their per-project role (Annotator, Reviewer, Manager).
If the people aren't in your org yet, invite them first from
**Organization → Members → Invite people** — they'll receive an
email with a link that signs them in and attaches them to your
org in one step.

## What's next

- **[Set up a labeling configuration](/annotate/labeling-config/overview)** —
  full XML guide, tag reference, templates by domain.
- **[Import data from cloud storage](/annotate/data-import/cloud-storage)** —
  S3 / GCS / Azure.
- **[Mobile app](/annotate/mobile/install)** — annotate from Android.
- **[Review workflow](/annotate/review-and-quality/overview)** — assign
  reviewers, agreement metrics, accept/reject pipeline.
- **[FAQ](/annotate/faq)** — common questions, especially around email
  deliverability and "I can't see any projects".
