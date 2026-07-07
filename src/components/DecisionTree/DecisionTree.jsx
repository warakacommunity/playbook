/**
 * Interactive step-through wizard for the "fork-or-fresh" decision
 * trees on the Before-You-Start pages. Instead of a static ASCII
 * diagram the reader has to trace by eye, the tree renders as a
 * sequence of questions with option buttons; each choice reveals
 * the next question or the leaf recommendation, with a breadcrumb
 * of the path taken so the reasoning stays visible.
 *
 * The ASCII fallback stays alongside the component in a
 * `.only-print` wrapper so the printed PDF (produced by the
 * Templates chapter's Download-as-PDF button, or the whole-book
 * PDF export) shows the full tree flat. The interactive
 * component itself is `.no-print`.
 *
 * Tree data shape:
 *   { question, options: [{ label, next?, result? }, ...] }
 *   - `next` is another tree node (recursive).
 *   - `result` is a leaf recommendation; it can be a string or
 *     any React child (so links and inline markup work).
 * A node has EITHER `options` (branch) OR `result` (leaf, only
 * meaningful when reached via a parent's option).
 */
import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './DecisionTree.module.css';

function walk(tree, path) {
  let node = tree;
  for (const step of path) {
    const opt = node.options?.find((o) => o.label === step);
    if (!opt) break;
    node = opt.result !== undefined ? { result: opt.result } : opt.next;
  }
  return node;
}

function DecisionTreeInner({ tree }) {
  const [path, setPath] = useState([]);
  const node = walk(tree, path);

  const choose = (label) => setPath([...path, label]);
  const back = () => setPath(path.slice(0, -1));
  const reset = () => setPath([]);

  const isLeaf = node && node.result !== undefined;

  // Rebuild the breadcrumb by walking the tree again — cleaner than
  // storing the question text at choice time, and keeps the source
  // of truth in the tree data.
  const breadcrumb = [];
  {
    let cur = tree;
    for (const step of path) {
      breadcrumb.push({ question: cur.question, chosen: step });
      const opt = cur.options?.find((o) => o.label === step);
      if (!opt || opt.result !== undefined) break;
      cur = opt.next;
    }
  }

  return (
    <div className={styles.tree} role="region" aria-label="Decision tree">
      {breadcrumb.length > 0 && (
        <ol className={styles.breadcrumb} aria-label="Path so far">
          {breadcrumb.map((step, i) => (
            <li key={i} className={styles.breadcrumbItem}>
              <span className={styles.stepQuestion}>{step.question}</span>
              <span className={styles.stepArrow} aria-hidden="true">→</span>
              <span className={styles.stepAnswer}>{step.chosen}</span>
            </li>
          ))}
        </ol>
      )}

      {isLeaf ? (
        <div className={styles.result} role="status">
          <div className={styles.resultLabel}>Recommendation</div>
          <div className={styles.resultText}>{node.result}</div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={back}
              className={styles.btnSecondary}
            >
              ← Change last answer
            </button>
            <button
              type="button"
              onClick={reset}
              className={styles.btnPrimary}
            >
              Start over
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.question}>
          <div className={styles.questionLabel}>
            {breadcrumb.length === 0 ? 'Start here' : 'Next question'}
          </div>
          <div className={styles.questionText}>{node.question}</div>
          <div className={styles.options}>
            {node.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(opt.label)}
                className={styles.optionButton}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {breadcrumb.length > 0 && (
            <div className={styles.actions}>
              <button
                type="button"
                onClick={back}
                className={styles.btnSecondary}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={reset}
                className={styles.btnSecondary}
              >
                Start over
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DecisionTree({ tree }) {
  return (
    <div className="no-print">
      <BrowserOnly fallback={<noscript>Interactive decision tree — see the fallback below.</noscript>}>
        {() => <DecisionTreeInner tree={tree} />}
      </BrowserOnly>
    </div>
  );
}
