---
sidebar_position: 4
---

# How to Write a Chapter

The [How to Contribute](./how-to-contribute) section covers the requirements to make contributions, namely editing on the site, forking, opening a pull request. In this Section, we cover the writing itself, how to structure a page, add sections and subsections, and use the colored callout boxes (admonitions) that make a page easy to read.

You can write in **two ways**, but there are more options (see the [How to Contribute](./how-to-contribute) section):

- **Markdown**: This is the native format of the playbook. What you type is what gets published, but using the markdown syntx. If you are new to markdown, it is not complicated, we provided basics below, but you can also get started [here](https://www.markdownguide.org/getting-started/). This is the best option if you are comfortable editing text files or using the online editor.
- **Microsoft Word**: This is a familiar editor for you to draft your chapter, then we have an internal  maintainer that converts it to Markdown. Best for long chapters or contributors who do not work with Markdown.

Both produce the same published page. The rules below are written so a Word draft and a Markdown draft turn into identical output.

:::tip[The golden rule]
**Do not type the chapter title or chapter number yourself.** The playbook adds the title and number (`# 1. Introduction`) automatically from the chapter's place in the sidebar. Your first heading is the page's *first section*, not its title. In Markdown that is `##`; in Word that is **Heading 1**.
:::

---

## Writing in Markdown

### Sections and subsections

Headings build the structure of the page and the table of contents on the right. Because the chapter title is added for you, you start one level down:

```markdown
## A section            ← top-level section (shows in the right-hand menu)

### A subsection        ← nested under the section above

#### A sub-subsection   ← use sparingly; deep nesting is hard to read
```

Rules that keep pages clean:

- **Never use a single `#`.** That is the chapter title, and the playbook owns it.
- **Don't skip levels** — a `##` is followed by `###`, not `####`.
- **Keep headings short.** They become menu entries; a full sentence breaks the layout.
- **One idea per section.** If a section runs past a screen or two, split it.

### Admonitions — the colored callout boxes

Admonitions are the boxed callouts (like the green "golden rule" box above) that pull a reader's eye to something important. Wrap text in `:::` fences:

```markdown
:::note
Neutral aside or extra context. Gray.
:::

:::tip
Best practice, or what worked on a real project. Green.
:::

:::info
Something the reader needs to know first — a prerequisite or definition. Blue.
:::

:::warning
A common mistake or gotcha. Yellow.
:::

:::danger
Something irreversible or unsafe — data loss, consent, security. Red.
:::
```

Give a box your own heading by putting it in square brackets:

```markdown
:::tip[Help build the AfriPlaybook]
You don't need to write a whole chapter to help.
:::
```

**Rules:**

- Leave a **blank line before and after** each `:::` fence and around the content inside.
- You can put normal Markdown inside — **bold**, links, lists, code.
- Use them sparingly: **at most one per section**, or the page reads like a warning label.

### When to use which box

| Box | Use it for |
|------|-----------|
| `tip` | Recommended practice, "what worked on a real project" |
| `note` | Side context, optional detail |
| `info` | Prerequisites, definitions, version notes |
| `warning` | Common mistakes, gotchas |
| `danger` | Data loss, irreversible steps, consent, security |

### Other things that make a page nicer

- **Code blocks** — always set the language (such as **python**, **java**) so it gets highlighted, and add a title if helpful:

  ````markdown
  ```python title="train.py"
  print("hello")
  ```
  ````

This is important specially for chapters that talks about technical aspects such as data cleaning, visualization and so on.
- **Images** — put them in the chapter's **`images/`** folder and always write alt text describing the figure:

  ```markdown
  ![AfricaNLP papers grew roughly fourteenfold between 2006 and 2024.](images/africanlp-growth.svg)
  ```

- **Links** — link to other pages with a relative path so the build can check them: `[Core principles](./core-principles)`.
- **Collapsible detail** — hide long, optional content:

  ```markdown
  <details>
    <summary>Full configuration example</summary>

    ...content...

  </details>
  ```

- **Tables** — keep them narrow. Most contributors read on a phone, and wide tables break the layout.

---

## Writing in Microsoft Word

You can draft in **Word** and let a maintainer convert it. To make the conversion clean, use Word's **built-in styles** (the Heading 1 / Heading 2 buttons), not manual bold text or bigger fonts — the converter only understands real styles.

### Headings map one level down

Because the playbook adds the chapter title automatically, **Word's Heading 1 becomes a section, not the title.** Use this mapping:

| In Word, use… | Becomes in the playbook | Markdown equivalent |
|------|------|------|
| *(don't add one)* | The chapter title + number | `# 1. Title` |
| **Heading 1** | A top-level section | `##` |
| **Heading 2** | A subsection | `###` |
| **Heading 3** | A sub-subsection | `####` |
| Normal / Body text | A paragraph | plain text |
| Bulleted / Numbered list | A list | `-` / `1.` |

So: don't type a chapter title at the top of your Word file. Start straight into your first **Heading 1** section.

### Admonitions in Word

Word has no built-in admonition, so use the convention below. The simplest, most reliable way is to **type the `:::` fences as plain text**, each on its own line, in a normal (Body) paragraph — *not* styled as a heading:
```

 :::tip[Help build the AfriPlaybook]

 You don't need to write a whole chapter to help.

 :::

```

When the document is converted, those lines survive as-is and the playbook renders them as a real colored box. Keep a blank paragraph before and after the fences, exactly as in Markdown.



### A few more Word tips

- **Images** — paste them inline where they belong, and write a one-line caption underneath each so it can become alt text.
- **Links** — use Word's real hyperlinks (Insert → Link), not bare pasted URLs, so they convert correctly.
- **Don't fake structure** — avoid manual numbering, hand-drawn boxes, or extra blank lines for spacing. Let styles do the work; the layout is applied for you on the site.

---

## Preview before you submit

Whichever format you write in, check how it looks before opening a pull request. The most accurate preview is the live site itself:

```bash
npm start        # opens a live preview at http://localhost:3000
```

The preview reloads as you edit, so admonitions, headings, and images appear exactly as they will once published. Read the page on a narrow window too — most readers are on a phone.

For the full style rules, see [CONTRIBUTING.md](https://github.com/warakacommunity/AfriPlaybook/blob/main/CONTRIBUTING.md).
