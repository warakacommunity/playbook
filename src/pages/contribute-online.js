import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import acc from './contribute-online.module.css';
import { StructureEditorContent } from '@site/src/components/StructureEditor';
import Screenshot from '@site/src/components/Screenshot';

/* ── Sub-step data ───────────────────────────────────────────────────────── */

const STEPS = [
  {
    label: 'Authenticate',
    title: 'Authenticate with GitHub',
    subSteps: [
      {
        title: 'Open the editor',
        body: 'Click "Start Contributing Online" at the bottom of this page. The editor modal opens with an authentication panel — no local setup or Git knowledge required.',
        shots: [{ file: 'd1-1-auth-panel-initial.png', caption: 'The authentication panel', width: '480px' }],
      },
      {
        title: 'Sign in with GitHub (recommended)',
        body: 'Click Sign in with GitHub. A GitHub authorization popup opens. Review the requested permissions (only public_repo), then click Authorize. The popup closes and your avatar appears.',
        shots: [
          { file: 'd1-2-github-btn-hover.png', caption: 'Sign in with GitHub button', width: '320px' },
          { file: 'd1-3-oauth-popup.png', caption: 'GitHub authorization popup', width: '320px' },
        ],
      },
      {
        title: 'Alternative: device flow or personal access token',
        body: 'If popups are blocked, the editor falls back to device flow: a 6-character code appears — visit github.com/login/device in any tab and enter it. Or paste a GitHub personal access token directly into the token field (scope: public_repo).',
        shots: [
          { file: 'd1-4-device-flow-code.png', caption: 'Device flow — enter this code on GitHub', width: '320px' },
          { file: 'd1-5-pat-input-focused.png', caption: 'Personal access token input', width: '320px' },
        ],
      },
      {
        title: 'You are connected',
        body: 'Your avatar and username appear in the editor header. Your token is stored in localStorage on your device only — never sent to any server other than GitHub. To sign out, click your avatar and choose Sign out.',
        shots: [{ file: 'd1-6-auth-connected.png', caption: 'Connected — avatar and username in the header', width: '380px' }],
      },
      {
        title: 'Fork required for public contributions',
        body: 'For security, only repository owners can commit directly to the main branch. If you\'re not an owner, when you click "Submit as Pull Request", the editor will automatically detect this and ask you to fork the repository. Forking creates your own copy where you have write access. The process takes 10–15 seconds and is one-time — after that, all your contributions go through your fork. The editor will guide you through each step with clear instructions and buttons.',
        shots: [{ file: 'd1-7-fork-required.png', caption: 'Fork instructions appear if you don\'t have write access', width: '420px' }],
      },
    ],
  },
  {
    label: 'Structure',
    title: 'Manage document structure',
    subSteps: [
      {
        title: 'The left panel tree',
        body: 'The left panel shows all existing sections and pages. All structural changes are staged locally in the pending changes panel — nothing is committed until you submit a PR.',
        shots: [{ file: 'd2-1-tree-panel-overview.png', caption: 'The left panel shows sections and pages', width: '280px' }],
      },
      {
        title: 'Add a new section',
        body: 'Click "+ Section" at the top of the left panel. An inline form appears — type the section name and press Enter. The new section with a default intro page is added to the tree.',
        shots: [
          { file: 'd2-2-add-section-btn.png', caption: 'Click "+ Section" in the panel header', width: '300px' },
          { file: 'd2-3-section-inline-form.png', caption: 'Type the name and press Enter', width: '300px' },
        ],
      },
      {
        title: 'Add a page or subsection',
        body: 'Hover any section row to reveal the "+ Page" button. Hover a page row to reveal "+ Sub". Click, type a name, and confirm. New pages open automatically in the right panel.',
        shots: [
          { file: 'd3-1-add-page-hover.png', caption: 'Hover a section row to reveal + Page', width: '300px' },
          { file: 'd4-1-subsection-btn.png', caption: 'Hover a page row to reveal + Sub', width: '300px' },
        ],
      },
      {
        title: 'Rename, reorder, and delete',
        body: 'Hover any item to reveal its action buttons: rename, move up/down, and delete. Deletions are staged — you can undo individual changes from the pending changes panel at any time.',
        shots: [
          { file: 'd5-1-row-actions.png', caption: 'Hover a row to reveal action buttons', width: '300px' },
          { file: 'd5-2-rename-input.png', caption: 'Rename becomes an inline editable field', width: '300px' },
        ],
      },
    ],
  },
  {
    label: 'Edit',
    title: 'Edit existing content',
    subSteps: [
      {
        title: 'Select a page to edit',
        body: 'Click the pencil icon next to any page in the left panel. The page content loads in the right panel with a full rich-text toolbar ready to use.',
        shots: [{ file: 'd6-1-page-selected.png', caption: 'A page open for editing in the right panel', width: '540px' }],
      },
      {
        title: 'Format text',
        body: 'Use the toolbar to apply headings (H1–H3), bold, italic, underline, or strikethrough. Select text first, then click a format button, or use keyboard shortcuts like Ctrl+B.',
        shots: [
          { file: 'd7-2-heading-dropdown.png', caption: 'Heading dropdown — H1, H2, H3', width: '300px' },
          { file: 'd7-3-bold-italic.png', caption: 'Bold applied to selected text', width: '300px' },
        ],
      },
      {
        title: 'Lists and blockquotes',
        body: 'Insert bullet lists, numbered lists, or blockquotes from the toolbar. Click anywhere in a paragraph, then click the list or blockquote button to convert it.',
        shots: [
          { file: 'd7-4-bullet-list.png', caption: 'Bullet list in the editor', width: '300px' },
          { file: 'd7-6-blockquote.png', caption: 'Blockquote block', width: '300px' },
        ],
      },
      {
        title: 'Links and images',
        body: 'Click the link button to insert or remove a hyperlink. Click the image button to embed an image from a local file — it is encoded inline so it travels with the document.',
        shots: [
          { file: 'd8-2-link-in-editor.png', caption: 'A link rendered in the editor', width: '300px' },
          { file: 'd8-4-image-in-editor.png', caption: 'Image embedded inline', width: '300px' },
        ],
      },
      {
        title: 'Save your changes',
        body: 'Click Save in the right panel header. The change is staged locally and appears in the pending changes panel at the bottom of the left panel. Nothing is sent to GitHub until you submit a PR.',
        shots: [
          { file: 'd9-1-save-button.png', caption: 'Save button in the right panel header', width: '380px' },
          { file: 'd9-2-save-toast.png', caption: 'Change staged in the pending changes panel', width: '280px' },
        ],
      },
    ],
  },
  {
    label: 'Upload',
    title: 'Upload documents',
    subSteps: [
      {
        title: 'Supported file types',
        body: 'The upload tool accepts PDF, Word (.docx), Markdown (.md / .mdx), plain text, and HTML files. Text and images are extracted entirely in the browser — nothing is uploaded to any server at this stage.',
        shots: [{ file: 'd10-1-upload-btn.png', caption: 'Upload button (↑) in the left panel header', width: '300px' }],
      },
      {
        title: 'Upload and choose placement',
        body: 'Click the upload button (↑), choose a file from your device, then select where to place the extracted content: as a new top-level page, inside an existing section, or as a subsection.',
        shots: [
          { file: 'd11-1-upload-placement.png', caption: 'Choose where to place the content', width: '320px' },
          { file: 'd11-2-target-page-selector.png', caption: 'Select the target section', width: '320px' },
        ],
      },
      {
        title: 'Review and save',
        body: 'The extracted content opens in the right panel. Review the text, fix any formatting issues, then click Save to stage the change. For PDFs and DOCX files, images are embedded inline automatically.',
        shots: [{ file: 'd12-3-md-result.png', caption: 'Extracted content ready to review and save', width: '480px' }],
      },
    ],
  },
  {
    label: 'Translate',
    title: 'Translate a page',
    subSteps: [
      {
        title: 'Open the translation panel',
        body: 'Hover any page in the left panel to reveal the translate icon. Click it to open the translation panel on the right. Supported languages: Hausa, Amharic, Swahili, French, and Portuguese.',
        shots: [
          { file: 'd13-1-translate-icon.png', caption: 'Translate icon on a page row', width: '280px' },
          { file: 'd13-2-translate-panel.png', caption: 'Translation panel open on the right', width: '480px' },
        ],
      },
      {
        title: 'Choose a target language',
        body: 'Use the language dropdown in the translation panel to select the target language. The code shown (ha, am, sw, fr, pt) maps to the Docusaurus locale that will receive the translated file.',
        shots: [
          { file: 'd14-1-lang-dropdown-closed.png', caption: 'Language selector', width: '320px' },
          { file: 'd14-2-lang-dropdown-open.png', caption: 'Dropdown open — choose a language', width: '320px' },
        ],
      },
      {
        title: 'Auto-translate',
        body: 'Click Auto-translate to generate a machine translation. African languages use MyMemory; European languages use Helsinki-NLP. The view splits: original English on the left, translation on the right.',
        shots: [
          { file: 'd15-1-auto-translate-btn.png', caption: 'Auto-translate button in the toolbar', width: '320px' },
          { file: 'd17-1-side-by-side.png', caption: 'Side-by-side view after auto-translation', width: '480px' },
        ],
      },
      {
        title: 'Refine and save',
        body: 'Edit the translation directly in the right pane — use the same rich-text toolbar. The original English stays on the left for reference. Click Save to stage the translation as a new i18n file.',
        shots: [
          { file: 'd17-2-editing-translation.png', caption: 'Editing the translation in the right pane', width: '460px' },
          { file: 'd17-3-save-translation.png', caption: 'Save button in the translation panel header', width: '360px' },
        ],
        tip: 'Auto-translation is a starting point — always review and refine before saving.',
      },
    ],
  },
  {
    label: 'Submit PR',
    title: 'Review changes and submit a PR',
    subSteps: [
      {
        title: 'Review pending changes',
        body: 'The bottom of the left panel shows a count of staged changes. Click it to expand the changes panel — all pending additions (+), edits (~), and deletions (−) are listed by file path.',
        shots: [
          { file: 'd18-1-pending-changes.png', caption: 'Pending changes counter at the bottom', width: '300px' },
          { file: 'd19-1-changes-review.png', caption: 'All staged changes listed by file', width: '320px' },
        ],
      },
      {
        title: 'Undo if needed',
        body: 'Each change has an undo button. Click it to remove that specific change from the staging area. "Clear all" discards everything. Staged changes persist in localStorage across browser sessions.',
        shots: [{ file: 'd19-3-undo-change.png', caption: 'Undo button on an individual change', width: '380px' }],
      },
      {
        title: 'Submit as a Pull Request',
        body: 'Click "Submit as Pull Request". All staged changes are bundled into a single commit on a new branch, and a PR is opened on GitHub automatically. A confirmation screen shows a direct link to the PR.',
        shots: [
          { file: 'd20-1-submit-btn.png', caption: 'Submit as Pull Request button', width: '320px' },
          { file: 'd21-1-pr-success.png', caption: 'Confirmation with a link to the opened PR', width: '420px' },
        ],
        tip: 'PRs always go to a new branch — never directly to main. A maintainer will review and merge.',
      },
    ],
  },
];

/* ── Page component ──────────────────────────────────────────────────────── */

export default function ContributeOnline() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [editorOpen, setEditorOpen] = useState(false);
  const panelRef = useRef(null);

  const step = STEPS[activeStep];
  const sub = step.subSteps[activeSub];
  const subCount = step.subSteps.length;

  const isGlobalFirst = activeStep === 0 && activeSub === 0;
  const isGlobalLast = activeStep === STEPS.length - 1 && activeSub === subCount - 1;

  function scrollPanel() {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function goPrev() {
    if (activeSub > 0) {
      setActiveSub(s => s - 1);
    } else if (activeStep > 0) {
      const prevStep = STEPS[activeStep - 1];
      setActiveStep(s => s - 1);
      setActiveSub(prevStep.subSteps.length - 1);
    }
    scrollPanel();
  }

  function goNext() {
    if (activeSub < subCount - 1) {
      setActiveSub(s => s + 1);
    } else if (activeStep < STEPS.length - 1) {
      setActiveStep(s => s + 1);
      setActiveSub(0);
    }
    scrollPanel();
  }

  function goToStep(i) {
    setActiveStep(i);
    setActiveSub(0);
    scrollPanel();
  }

  const nextLabel = activeSub < subCount - 1
    ? 'Next →'
    : activeStep < STEPS.length - 1
      ? `Next: ${STEPS[activeStep + 1].label} →`
      : null;

  return (
    <Layout
      title="Contribute Online"
      description="Step-by-step guide to contributing to the AfriPlaybook directly in your browser — no local setup required."
    >
      <section className={clsx(styles.section, styles.cfcSection, styles.cfcPageSection)}>
        <div className="container">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Link to="/" className={styles.cfcBackLink}>← Back to home</Link>
            <button
              type="button"
              className={clsx('button', styles.primaryButton)}
              onClick={() => setEditorOpen(true)}
              style={{ padding: '0.45rem 1rem', fontSize: '0.9rem' }}
            >
              Start Contributing Online
            </button>
          </div>

          {/* Hero */}
          <div className={styles.cfcHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Online contribution</span>
              <Heading as="h1" className={styles.sectionTitle}>
                Contribute directly in your browser
              </Heading>
              <p className={styles.cfcLead}>
                No Git, no terminal, no local setup. Authenticate with GitHub,
                edit or upload content, and submit your changes as a Pull Request
                — all without leaving the page.
              </p>
            </div>
          </div>

          {/* Step tabs */}
          <div ref={panelRef} className={acc.tabList} role="tablist" aria-label="Contribution steps">
            {STEPS.map(({ label }, i) => {
              const done = i < activeStep;
              return (
                <button
                  key={label}
                  role="tab"
                  type="button"
                  aria-selected={i === activeStep}
                  className={clsx(acc.tab, i === activeStep && acc.tabActive, done && acc.tabDone)}
                  onClick={() => goToStep(i)}
                >
                  <span className={clsx(acc.tabNum, done && acc.tabNumDone)}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span className={acc.tabLabel}>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-step panel */}
          <div role="tabpanel" className={acc.tabPanel}>

            {/* Header row: step context + progress dots */}
            <div className={acc.subHeader}>
              <span className={acc.stepMeta}>
                Step {activeStep + 1} of {STEPS.length} &mdash; {step.title}
              </span>
              <div className={acc.dots} aria-label={`Sub-step ${activeSub + 1} of ${subCount}`}>
                {step.subSteps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to sub-step ${i + 1}`}
                    className={clsx(acc.dot, i === activeSub && acc.dotActive, i < activeSub && acc.dotDone)}
                    onClick={() => { setActiveSub(i); scrollPanel(); }}
                  />
                ))}
              </div>
            </div>

            {/* Sub-step title */}
            <Heading as="h3" className={acc.subTitle}>{sub.title}</Heading>

            {/* Body text */}
            {sub.body && <p className={acc.subBody}>{sub.body}</p>}

            {/* Screenshots */}
            {sub.shots && (
              sub.shots.length === 1
                ? <Screenshot file={sub.shots[0].file} caption={sub.shots[0].caption} width={sub.shots[0].width} />
                : (
                  <div className={acc.shotRow}>
                    {sub.shots.map(s => (
                      <div key={s.file} className={acc.shotCell}>
                        <Screenshot file={s.file} caption={s.caption} width={s.width} />
                      </div>
                    ))}
                  </div>
                )
            )}

            {/* Tip */}
            {sub.tip && (
              <div className={acc.tip}>
                <span className={acc.tipIcon}>💡</span>
                <span>{sub.tip}</span>
              </div>
            )}

            {/* Navigation */}
            <div className={acc.tabNav}>
              {!isGlobalFirst
                ? <button type="button" className={acc.navBtn} onClick={goPrev}>← Previous</button>
                : <span />}

              <span className={acc.subCounter}>{activeSub + 1} / {subCount}</span>

              {!isGlobalLast && nextLabel
                ? <button type="button" className={clsx(acc.navBtn, acc.navBtnPrimary)} onClick={goNext}>{nextLabel}</button>
                : <span />}
            </div>
          </div>

          {/* CTA */}
          <div className={styles.cfcActions} style={{ marginTop: '2.5rem', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={clsx('button', styles.primaryButton)}
              onClick={() => setEditorOpen(true)}
            >
              Start Contributing Online
            </button>
            <Link to="/contribute" className={clsx('button', styles.secondaryButton)}>
              Prefer cloning? See GitHub guide
            </Link>
          </div>

          {editorOpen && typeof window !== 'undefined' &&
            ReactDOM.createPortal(
              <StructureEditorContent onClose={() => setEditorOpen(false)} />,
              document.body,
            )
          }

        </div>
      </section>
    </Layout>
  );
}
