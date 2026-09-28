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

/**
 * Second accepted shape, easier to keep as JSON:
 *   { start: "q1", nodes: { q1: { question, help?, options: [{ label, next }] },
 *                           leaf: { result, summary?, url?, caveats? } } }
 * Converted here to the recursive shape; a leaf keeps its extra fields.
 */
function fromGraph(graph) {
  const seen = new Set();
  const build = (id) => {
    const n = graph.nodes[id];
    if (!n) throw new Error(`DecisionTree: unknown node "${id}"`);
    if (n.result !== undefined) return { result: n };
    if (seen.has(id)) throw new Error(`DecisionTree: cycle at "${id}"`);
    seen.add(id);
    const node = {
      question: n.question,
      help: n.help,
      options: n.options.map((o) => {
        const child = build(o.next);
        return child.result !== undefined ? { label: o.label, result: child.result } : { label: o.label, next: child };
      }),
    };
    seen.delete(id);
    return node;
  };
  return build(graph.start);
}

function ResultBody({ result }) {
  if (result === null || typeof result !== 'object' || React.isValidElement(result)) return result;
  return (
    <>
      <p className={styles.resultTitle}>{result.result}</p>
      {result.summary && <p>{result.summary}</p>}
      {result.caveats?.length > 0 && (
        <ul>
          {result.caveats.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      )}
      {result.url && <p><a href={result.url} target="_blank" rel="noopener noreferrer">Read the licence text</a></p>}
    </>
  );
}

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
              {' '}
              <span className={styles.stepArrowAnswer}>
                <span className={styles.stepArrow} aria-hidden="true">→</span>
                <span className={styles.stepAnswer}>{step.chosen}</span>
              </span>
            </li>
          ))}
        </ol>
      )}

      {isLeaf ? (
        <div className={styles.result} role="status">
          <div className={styles.resultCard}>
            <div className={styles.resultLabel}>Recommendation</div>
            <div className={styles.resultText}><ResultBody result={node.result} /></div>
          </div>
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
          {node.help && <p className={styles.questionHelp}>{node.help}</p>}
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
  if (tree && tree.nodes) tree = fromGraph(tree);
  return (
    <div className="no-print">
      <BrowserOnly fallback={<noscript>Interactive decision tree. See the fallback below.</noscript>}>
        {() => <DecisionTreeInner tree={tree} />}
      </BrowserOnly>
    </div>
  );
}
