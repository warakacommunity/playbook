import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

// The book's chapters grouped into the four phases of the dataset lifecycle.
// hrefs point to each chapter's landing page (category index where one exists,
// otherwise the chapter's first doc).
const PHASES = [
  {
    label: "Start here",
    chapters: [
      {
        title: "Introduction",
        blurb: "Why African-language data matters, and how this guide helps.",
        href: "/",
      },
    ],
  },
  {
    label: "Build the dataset",
    chapters: [
      {
        title: "Data Collection",
        blurb: "Plan scope, sources, cost, ethics, and provenance.",
        href: "/data-collection/cost-resource-planning",
      },
      {
        title: "Annotation Design & Workforce",
        blurb: "Design tasks, write guidelines, and manage annotators.",
        href: "/annotation-design/annotation-task-design",
      },
      {
        title: "Modality-Specific Task Design",
        blurb: "Text, speech, vision, and multimodal data.",
        href: "/sections/speech",
      },
      {
        title: "LLM-Assisted & Synthetic Data",
        blurb: "Use models to help build data — with safeguards.",
        href: "/llm-assisted-task",
      },
    ],
  },
  {
    label: "Make it trustworthy & release",
    chapters: [
      {
        title: "Data Quality & Validation",
        blurb: "Agreement, review, and quality control.",
        href: "/data-quality",
      },
      {
        title: "Documentation & Governance",
        blurb: "Consent, licensing, ownership, and datasheets.",
        href: "/documentation/documentation",
      },
      {
        title: "Lifecycle & Release",
        blurb: "Maintain, version, and release responsibly.",
        href: "/dataset-lifecycle/release",
      },
    ],
  },
  {
    label: "Use & grow",
    chapters: [
      {
        title: "Evaluation",
        blurb: "Check data integrity and get a modelling starter kit.",
        href: "/model-building/data-integrity",
      },
      {
        title: "Community & Collaboration",
        blurb: "Work together and sustain the ecosystem.",
        href: "/community-collaboration/collaboration",
      },
      {
        title: "Worked example: Text Classification",
        blurb: "An end-to-end task, from raw data to labels.",
        href: "/text-classification/defining-text-classification-tasks",
      },
    ],
  },
];

export default function ChapterMap() {
  return (
    <nav className={styles.map} aria-label="Chapter map">
      {PHASES.map((phase, i) => (
        <div className={styles.phase} key={phase.label}>
          <div className={styles.phaseHead}>
            <span className={styles.phaseNum}>{i + 1}</span>
            <span className={styles.phaseLabel}>{phase.label}</span>
          </div>
          <div className={styles.cards}>
            {phase.chapters.map((c) => (
              <Link className={styles.card} to={c.href} key={c.title}>
                <span className={styles.cardTitle}>{c.title}</span>
                <span className={styles.cardBlurb}>{c.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
