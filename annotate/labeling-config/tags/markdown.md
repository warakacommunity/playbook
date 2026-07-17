---
title: "Markdown"
sidebar_label: "Markdown"
description: "Visual tag — The `Markdown` element is used to display markdown-formatted text content."
mdx:
  format: md
---

# `<Markdown>`

**Category:** Visual tag

The `Markdown` element is used to display markdown-formatted text content.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| value | string | **yes** | — | Markdown text content, either static text or field name in task data (e.g., $markdown_field) |
| style | string | no | — | CSS style string |
| className | string | no | — | Class name of the CSS style to apply |
| idAttr | string | no | — | Unique ID attribute to use in CSS |
| visibleWhen | region-selected,choice-selected,no-region-selected,choice-unselected | no | — | Control visibility of the content |
| whenTagName | string | no | — | Use with `visibleWhen`. Narrow down visibility by tag name |
| whenLabelValue | string | no | — | Use with `visibleWhen="region-selected"`. Narrow down visibility by label value |
| whenChoiceValue | string | no | — | Use with `visibleWhen` and `whenTagName`. Narrow down visibility by choice value |

## Examples

### Example

Display static markdown instructions on the labeling interface:

```html
<View>
  <Markdown>
## Instructions

Please **carefully** read the following text and mark all entities.

- Look for **person names**
- Look for **organization names**  
- Look for **locations**

> Remember to be thorough in your analysis.
  </Markdown>
  <Text name="text" value="$text" />
</View>
```

Indents are important in markdown, so it's advised to keep markdown content unindented.

### Example

Display markdown content from task data:

```html
<View>
  <Markdown value="$markdown_description" />
  <Text name="text" value="$text" />
</View>
```

**Example task data:**

```json
{
  "markdown_description": "## Analysis Task\n\nPlease analyze the following text for sentiment:\n\n- **Positive** - Shows satisfaction or approval\n- **Negative** - Shows dissatisfaction or criticism\n- **Neutral** - Shows no particular sentiment",
  "text": "The product was amazing and I loved it!"
}
```

### Example

Display styled markdown content:

```html
<View>
  <Markdown 
    value="$content"
    style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;" />
</View>
```

