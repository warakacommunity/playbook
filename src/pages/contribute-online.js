import clsx from 'clsx';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { StructureEditorContent } from '@site/src/components/StructureEditor';

/* ── Inline icons (Lucide-style, stroke-based) ───────────── */
const IconKey = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconUpload = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconSend = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ── Feature overview cards ──────────────────────────────── */
const FEATURES = [
  {
    Icon: IconKey,
    title: 'Authenticate',
    body: 'Connect your GitHub account in seconds — via popup, device flow, or a personal access token. No local setup required.',
  },
  {
    Icon: IconEdit,
    title: 'Edit content',
    body: 'Open any existing Playbook page and make changes using a full rich-text editor with headings, lists, links, images, and video.',
  },
  {
    Icon: IconLayers,
    title: 'Manage structure',
    body: 'Add new sections, pages, and subsections directly in the tree view. Rename, reorder, or delete items without touching the filesystem.',
  },
  {
    Icon: IconUpload,
    title: 'Upload documents',
    body: 'Import PDF, Word (.docx), or Markdown files. The tool extracts text and images automatically and places them in the right location.',
  },
  {
    Icon: IconGlobe,
    title: 'Translate',
    body: 'Translate any page into Hausa, Amharic, Swahili, French, or Portuguese — auto-translated first, then refined in a side-by-side editor.',
  },
  {
    Icon: IconSend,
    title: 'Submit a PR',
    body: 'All changes are staged locally, then submitted as a single Pull Request on GitHub. No direct commits to main — everything goes through review.',
  },
];

export default function ContributeOnline() {
  const [editorOpen, setEditorOpen] = useState(false);
  return (
    <Layout
      title="Contribute Online"
      description="Step-by-step guide to contributing to the Masakhane Playbook directly in your browser — no local setup required."
    >
      <section className={clsx(styles.section, styles.cfcSection, styles.cfcPageSection)}>
        <div className="container">

          <Link to="/" className={styles.cfcBackLink}>← Back to home</Link>

          {/* ── Hero ─────────────────────────────────────────── */}
          <div className={styles.cfcHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Online contribution</span>
              <Heading as="h1" className={styles.sectionTitle}>
                Contribute directly in your browser
              </Heading>
              <p className={styles.cfcLead}>
                No Git, no terminal, no local setup. Authenticate with GitHub,
                use the built-in editor to add or improve content, and submit
                your changes as a Pull Request — all without leaving the page.
              </p>
            </div>
            <div className={styles.cfcActions}>
              <a
                href="#launch"
                className={clsx('button', styles.primaryButton)}
              >
                Start Contributing Online
              </a>
              <Link
                to="/contribute"
                className={clsx('button', styles.secondaryButton)}
              >
                Prefer cloning? See GitHub guide
              </Link>
            </div>
          </div>

          {/* ── Feature overview cards ────────────────────────── */}
          <div className={styles.cfcSubhead}>
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              What you can do
            </Heading>
            <p className={styles.cfcSubheadLead}>
              The online editor covers the full contribution lifecycle — from
              authentication through editing, uploading, translating, and
              submitting.
            </p>
          </div>

          <div className={styles.expectationGrid}>
            {FEATURES.map(({ Icon, title, body }) => (
              <article key={title} className={styles.expectationCard}>
                <div className={styles.expectationIcon}>
                  <Icon />
                </div>
                <h3 className={styles.expectationTitle}>{title}</h3>
                <p className={styles.expectationBody}>{body}</p>
              </article>
            ))}
          </div>

          {/* ── Step 1: Authenticate ──────────────────────────── */}
          <div className={styles.cfcSubhead} id="step-auth">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 1 — Authenticate with GitHub
            </Heading>
            <p className={styles.cfcSubheadLead}>
              All contributions are submitted as Pull Requests under your GitHub
              account. Connect once — your session is remembered until you sign
              out. Three methods are supported; use whichever works for you.
            </p>
          </div>

          <div className={styles.scopeGrid}>

            {/* Method A */}
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>
                Sign in with GitHub
                <span style={{ marginLeft: '0.4em', fontSize: '0.75em', fontWeight: 600, color: 'var(--ifm-color-primary)', verticalAlign: 'middle' }}>Recommended</span>
              </h3>
              <p className={styles.scopeIntro}>
                The fastest option. Opens a GitHub authorization popup in a
                new window.
              </p>
              <ul className={styles.scopeList}>
                <li>Click <strong>Sign in with GitHub</strong> inside the editor</li>
                <li>A GitHub popup opens — review the permissions</li>
                <li>Click <strong>Authorize</strong></li>
                <li>The popup closes and your avatar appears — you are connected</li>
              </ul>
            </article>

            {/* Method B */}
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>Device flow</h3>
              <p className={styles.scopeIntro}>
                Automatic fallback when your browser blocks popups. No extra
                setup needed.
              </p>
              <ul className={styles.scopeList}>
                <li>The editor detects the blocked popup and switches automatically</li>
                <li>A <strong>6-character verification code</strong> appears in the dialog</li>
                <li>Click the link to open <code>github.com/login/device</code></li>
                <li>Enter the code and click <strong>Authorize</strong></li>
                <li>The editor detects authorization and connects your account</li>
              </ul>
            </article>

            {/* Method C */}
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>Personal Access Token</h3>
              <p className={styles.scopeIntro}>
                Use a GitHub token you generate yourself. Useful in restricted
                network environments.
              </p>
              <ul className={styles.scopeList}>
                <li>Go to <a href="https://github.com/settings/tokens/new?scopes=public_repo&description=Masakhane+Playbook" target="_blank" rel="noopener noreferrer">github.com/settings/tokens</a></li>
                <li>Select scope <strong>public_repo</strong> (classic token)</li>
                <li>Generate and copy the token</li>
                <li>Paste it into the token field in the editor and click <strong>Connect</strong></li>
              </ul>
            </article>

          </div>

          {/* Sign-out note */}
          <article className={styles.requirementsCard} style={{ marginTop: '1.5rem' }}>
            <ul className={styles.requirementsList}>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>Your token is stored in <strong>localStorage</strong> on your device only — it is never sent to any server other than GitHub.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>To sign out, click the avatar in the editor header and choose <strong>Sign out</strong>.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>The minimum required scope is <code>public_repo</code>. No admin or private-repo access is ever requested.</span>
              </li>
            </ul>
          </article>

          {/* ── Step 2: Manage Structure ──────────────────────── */}
          <div className={styles.cfcSubhead} id="step-structure">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 2 — Manage structure
            </Heading>
            <p className={styles.cfcSubheadLead}>
              The left panel shows the full Playbook tree. You can add, rename,
              reorder, and delete sections, pages, and subsections without
              touching any files directly.
            </p>
          </div>

          {/* Add a section */}
          <div className={styles.cfcSubhead} style={{ marginTop: '1rem', textAlign: 'left' }}>
            <Heading as="h3" className={styles.cfcSubheadTitle} style={{ fontSize: '1.2rem' }}>
              Add a top-level section
            </Heading>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { num: '01', title: 'Open the editor', body: 'Click "Start Contributing Online" at the bottom of this page to launch the editor dialog.' },
              { num: '02', title: 'Click "+ Section"', body: 'At the top of the left panel, click the "+ Section" button. An inline form appears.' },
              { num: '03', title: 'Enter a name', body: 'Type the section title (e.g. "Data Quality"). Press Enter or click Confirm.' },
              { num: '04', title: 'Section created', body: 'The tree shows the new section with a default intro page. Two files are staged: docs/{slug}/_category_.json and docs/{slug}/intro.md.' },
            ].map((s) => (
              <div key={s.num} className={styles.processStep}>
                <div className={styles.processNum}>{s.num}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processBody}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Add a page / subsection */}
          <div className={styles.cfcSubhead} style={{ marginTop: '2rem', textAlign: 'left' }}>
            <Heading as="h3" className={styles.cfcSubheadTitle} style={{ fontSize: '1.2rem' }}>
              Add a page or subsection
            </Heading>
          </div>
          <div className={styles.requirementsGrid}>
            <article className={styles.requirementsCard}>
              <div className={styles.requirementsHeader}>
                <h4 className={styles.requirementsTitle}>Add a page inside a section</h4>
              </div>
              <ul className={styles.requirementsList}>
                <li><span className={styles.requirementsBullet}>1</span><span>Hover over any section name in the tree — a <strong>+ Page</strong> icon appears.</span></li>
                <li><span className={styles.requirementsBullet}>2</span><span>Click it and type the page title, then confirm.</span></li>
                <li><span className={styles.requirementsBullet}>3</span><span>The new page opens in the right panel ready to edit. Staged file: <code>docs/{'{section}/{slug}.md'}</code>.</span></li>
              </ul>
            </article>
            <article className={styles.requirementsCard}>
              <div className={styles.requirementsHeader}>
                <h4 className={styles.requirementsTitle}>Add a subsection under a page</h4>
              </div>
              <ul className={styles.requirementsList}>
                <li><span className={styles.requirementsBullet}>1</span><span>Hover over any existing page — a <strong>+ Subsection</strong> icon appears.</span></li>
                <li><span className={styles.requirementsBullet}>2</span><span>Click it and enter the subsection name.</span></li>
                <li><span className={styles.requirementsBullet}>3</span><span>The page becomes a parent folder. Staged files: <code>_category_.json</code> + <code>index.md</code> for the new subsection.</span></li>
              </ul>
            </article>
          </div>

          {/* Rename / reorder / delete */}
          <article className={styles.requirementsCard} style={{ marginTop: '1rem' }}>
            <div className={styles.requirementsHeader}>
              <h4 className={styles.requirementsTitle}>Rename, reorder, and delete</h4>
            </div>
            <ul className={styles.requirementsList}>
              <li><span className={styles.requirementsBullet}>✎</span><span><strong>Rename:</strong> hover any item → click the rename icon → type a new name → press Enter.</span></li>
              <li><span className={styles.requirementsBullet}>↕</span><span><strong>Reorder:</strong> use the up/down arrows that appear on hover to move items within their section.</span></li>
              <li><span className={styles.requirementsBullet}>✕</span><span><strong>Delete:</strong> click the trash icon → confirm. The deletion is staged and can be undone in the changes panel before submitting.</span></li>
            </ul>
          </article>

          {/* ── Step 3: Edit Existing Content ─────────────────── */}
          <div className={styles.cfcSubhead} id="step-edit">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 3 — Edit existing content
            </Heading>
            <p className={styles.cfcSubheadLead}>
              Click the edit icon next to any page or section in the tree to
              open it in the full rich-text editor.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { num: '01', title: 'Select a page', body: 'In the left panel tree, click the pencil icon next to any page. The page content loads in the right panel.' },
              { num: '02', title: 'Edit with the toolbar', body: 'Use the rich-text toolbar above the editor area to format your content (see toolbar reference below).' },
              { num: '03', title: 'Save', body: 'Click Save. The change is staged locally — it appears in the pending changes panel with a "~" indicator. Nothing is sent to GitHub yet.' },
            ].map((s) => (
              <div key={s.num} className={styles.processStep}>
                <div className={styles.processNum}>{s.num}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processBody}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* WYSIWYG toolbar reference */}
          <div className={styles.cfcSubhead} style={{ marginTop: '2rem', textAlign: 'left' }}>
            <Heading as="h3" className={styles.cfcSubheadTitle} style={{ fontSize: '1.2rem' }}>
              Toolbar reference
            </Heading>
          </div>
          <div className={styles.requirementsGrid}>
            <article className={styles.requirementsCard}>
              <div className={styles.requirementsHeader}>
                <h4 className={styles.requirementsTitle}>Text formatting</h4>
              </div>
              <ul className={styles.requirementsList}>
                <li><span className={styles.requirementsBullet}>B</span><span><strong>Bold</strong>, <em>Italic</em>, Underline, Strikethrough</span></li>
                <li><span className={styles.requirementsBullet}>H</span><span>Headings H1, H2, H3</span></li>
                <li><span className={styles.requirementsBullet}>¶</span><span>Bullet list, Numbered list, Blockquote</span></li>
                <li><span className={styles.requirementsBullet}>A</span><span>Text colour picker</span></li>
                <li><span className={styles.requirementsBullet}>✕</span><span>Remove all formatting from selection</span></li>
              </ul>
            </article>
            <article className={styles.requirementsCard}>
              <div className={styles.requirementsHeader}>
                <h4 className={styles.requirementsTitle}>Media &amp; links</h4>
              </div>
              <ul className={styles.requirementsList}>
                <li><span className={styles.requirementsBullet}>🔗</span><span>Insert link (prompts for URL) / Remove link</span></li>
                <li><span className={styles.requirementsBullet}>🖼</span><span>Insert image from local file (embedded inline)</span></li>
                <li><span className={styles.requirementsBullet}>▶</span><span>Insert video by URL — YouTube, Vimeo, or direct link</span></li>
                <li><span className={styles.requirementsBullet}>📎</span><span>Insert video from local file (max 10 MB, embedded inline)</span></li>
              </ul>
            </article>
          </div>

          {/* ── Step 4: Upload Documents ───────────────────────── */}
          <div className={styles.cfcSubhead} id="step-upload">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 4 — Upload documents
            </Heading>
            <p className={styles.cfcSubheadLead}>
              Import existing content from PDF, Word, or Markdown files. The
              editor extracts text and images automatically — no copy-pasting
              required.
            </p>
          </div>

          {/* Supported formats */}
          <div className={styles.scopeGrid}>
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>PDF</h3>
              <p className={styles.scopeIntro}>
                Text and embedded images are extracted. Each page of text
                becomes a paragraph; images are embedded inline as data URLs.
              </p>
              <ul className={styles.scopeList}>
                <li>Scanned PDFs (image-only) are not supported — the file must contain selectable text</li>
                <li>Large PDFs may take a few seconds to process in-browser</li>
              </ul>
            </article>
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>Word (.docx)</h3>
              <p className={styles.scopeIntro}>
                Converted to HTML via Mammoth, then to Markdown. Headings,
                lists, bold, and italic are preserved.
              </p>
              <ul className={styles.scopeList}>
                <li>Complex layouts (tables, text boxes) may be simplified</li>
                <li>Embedded images are extracted and embedded inline</li>
              </ul>
            </article>
            <article className={styles.scopeCard}>
              <h3 className={styles.scopeName}>Markdown / Text / HTML</h3>
              <p className={styles.scopeIntro}>
                Uploaded as-is with frontmatter added automatically. Accepted
                extensions: <code>.md</code>, <code>.mdx</code>, <code>.txt</code>,{' '}
                <code>.html</code>, <code>.htm</code>.
              </p>
              <ul className={styles.scopeList}>
                <li>Existing frontmatter in the file is preserved</li>
                <li>Plain text files are wrapped in a basic Markdown template</li>
              </ul>
            </article>
          </div>

          {/* Upload workflow */}
          <div className={styles.cfcSubhead} style={{ marginTop: '2rem', textAlign: 'left' }}>
            <Heading as="h3" className={styles.cfcSubheadTitle} style={{ fontSize: '1.2rem' }}>
              Upload workflow
            </Heading>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { num: '01', title: 'Click the upload button', body: 'In the left panel header, click the upload (↑) icon. A file picker opens.' },
              { num: '02', title: 'Select your file', body: 'Choose a PDF, DOCX, MD, MDX, TXT, HTML, or HTM file from your device.' },
              { num: '03', title: 'Extraction runs in-browser', body: 'Text and images are extracted locally — nothing is uploaded to any server at this stage.' },
              { num: '04', title: 'Choose placement', body: 'A dialog asks where to place the content: as a new top-level page, inside an existing section, or as a subsection under an existing page. Select the destination and confirm.' },
              { num: '05', title: 'Review and edit', body: 'The extracted content opens in the right panel editor. Review it, fix any formatting issues, and click Save to stage the change.' },
            ].map((s) => (
              <div key={s.num} className={styles.processStep}>
                <div className={styles.processNum}>{s.num}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processBody}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* ── Step 5: Translate ──────────────────────────────── */}
          <div className={styles.cfcSubhead} id="step-translate">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 5 — Translate a page
            </Heading>
            <p className={styles.cfcSubheadLead}>
              Every Playbook page can be translated into five African and
              international languages directly in the editor, with automatic
              translation as a starting point.
            </p>
          </div>

          {/* Language list */}
          <article className={styles.requirementsCard} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.requirementsHeader}>
              <h4 className={styles.requirementsTitle}>Supported translation languages</h4>
            </div>
            <ul className={styles.requirementsList}>
              {[
                ['ha', 'Hausa'],
                ['am', 'Amharic'],
                ['sw', 'Swahili'],
                ['fr', 'Français'],
                ['pt', 'Português'],
              ].map(([code, name]) => (
                <li key={code}>
                  <span className={styles.requirementsBullet}>
                    <code style={{ fontSize: '0.8em' }}>{code}</code>
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Translation workflow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { num: '01', title: 'Select a page', body: 'Click the translate icon next to any page in the left panel tree.' },
              { num: '02', title: 'Choose a target language', body: 'Use the language dropdown in the right panel to pick the language you want to translate into.' },
              { num: '03', title: 'Auto-translate', body: 'Click Auto-translate. The editor splits into two panes: the original English on the left and the machine-translated text on the right. African languages (Hausa, Amharic, Swahili) use the MyMemory API; European languages (French, Portuguese) use Helsinki-NLP. Block-level formatting is preserved.' },
              { num: '04', title: 'Alternatively — Google Translate', body: 'Click the Google Translate button to use Google\'s translation service as an alternative. Results appear in the same right-hand pane.' },
              { num: '05', title: 'Refine the translation', body: 'Edit the right-hand pane directly. The left pane (original) stays fixed for reference. Use the same rich-text toolbar for formatting.' },
              { num: '06', title: 'Save', body: 'Click Save. The translation is staged as a new file at i18n/{lang}/docusaurus-plugin-content-docs/current/{original-path}.' },
            ].map((s) => (
              <div key={s.num} className={styles.processStep}>
                <div className={styles.processNum}>{s.num}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <article className={styles.requirementsCard} style={{ marginTop: '1.5rem' }}>
            <ul className={styles.requirementsList}>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>Auto-translation is a <strong>starting point</strong>, not a finished product. Always review and refine before saving.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>Uploaded documents can also be translated — upload first, then open the translation tab for the new page.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>The translation file path mirrors the English source exactly, so the site can serve both versions under the correct locale URL.</span>
              </li>
            </ul>
          </article>

          {/* ── Step 6: Review & Submit ───────────────────────── */}
          <div className={styles.cfcSubhead} id="step-submit">
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Step 6 — Review changes and submit a Pull Request
            </Heading>
            <p className={styles.cfcSubheadLead}>
              Every edit, upload, and translation is staged locally before
              anything is sent to GitHub. Review your changes, undo anything
              you don't need, then submit — all as one Pull Request.
            </p>
          </div>

          {/* Pending changes panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {[
              {
                num: '01',
                title: 'Open the changes panel',
                body: 'The left panel shows a "Pending changes" count badge. Click it to expand the list. Each staged change shows its file path and operation type: + (create), ~ (edit), or − (delete).',
              },
              {
                num: '02',
                title: 'Review and undo if needed',
                body: 'Each change has an undo button (↩). Click it to remove that specific change from the queue. To discard everything and start over, click "Clear all changes" at the top of the panel.',
              },
              {
                num: '03',
                title: 'Click "Submit as Pull Request"',
                body: 'When you are happy with the changes, click Submit. You must be authenticated (Step 1). The editor bundles all staged changes into a single commit on a new branch.',
              },
              {
                num: '04',
                title: 'Pull Request is created',
                body: 'A PR is opened on the MasakhanePlaybook GitHub repository with a title and a body listing all changes. The editor shows a confirmation with a direct link to the PR.',
              },
              {
                num: '05',
                title: 'Wait for review',
                body: 'A maintainer will review the PR, leave feedback if needed, and merge it when it meets the editorial guidelines. You will receive a GitHub notification when the PR is reviewed or merged.',
              },
            ].map((s) => (
              <div key={s.num} className={styles.processStep}>
                <div className={styles.processNum}>{s.num}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <article className={styles.requirementsCard}>
            <ul className={styles.requirementsList}>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>PRs are always created on a new branch — never directly on <code>main</code>.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>Branch names are auto-generated: <code>edit/{'{slug}-{timestamp}'}</code> for edits, <code>structure/edit-{'{timestamp}'}</code> for structural changes.</span>
              </li>
              <li>
                <span className={styles.requirementsBullet}>✓</span>
                <span>Your staged changes are saved in <strong>localStorage</strong> — closing the browser and coming back will restore your unsaved work.</span>
              </li>
            </ul>
          </article>

          {/* ── Launch CTA ────────────────────────────────────── */}
          <div className={styles.cfcSubhead} id="launch" style={{ marginTop: '5rem' }}>
            <Heading as="h2" className={styles.cfcSubheadTitle}>
              Ready? Launch the editor
            </Heading>
            <p className={styles.cfcSubheadLead}>
              Everything runs in your browser. Authenticate once with GitHub
              and start contributing — no installation needed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.75rem', flexWrap: 'wrap' }}>
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
