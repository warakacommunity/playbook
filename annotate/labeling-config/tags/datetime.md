---
title: "DateTime"
sidebar_label: "DateTime"
description: "Control tag — The DateTime tag adds date and time selection to the labeling interface. Use this tag to add a date, timestamp, month, or year to an annotation."
mdx:
  format: md
---

# `<DateTime>`

**Category:** Control tag

The DateTime tag adds date and time selection to the labeling interface. Use this tag to add a date, timestamp, month, or year to an annotation.

Use with the following data types: audio, image, HTML, paragraph, text, time series, video

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element that you want to label |
| only | string | **yes** | — | Comma-separated list of parts to display (date, time, month, year)        date and month/year can't be used together. The date option takes precedence |
| format | string | **yes** | — | Input/output strftime format for datetime (internally it's always ISO);        when both date and time are displayed, by default shows ISO with a "T" separator;        when only date is displayed, by default shows ISO date;        when only time is displayed, by default shows a 24 hour time with leading zero |
| min | string | no | — | Set a minimum datetime value for only=date in ISO format, or minimum year for only=year |
| max | string | no | — | Set a maximum datetime value for only=date in ISO format, or maximum year for only=year |
| required | true,false | no | `false` | Whether datetime is required or not |
| requiredMessage | string | no | — | Message to show if validation fails |
| perRegion | true,false | no | — | Use this option to label regions instead of the whole object |
| perItem | true,false | no | — | Use this option to label items inside the object instead of the whole object |

## Examples

### Example
```html
<View>
  <Text name="txt" value="$text" />
  <DateTime name="datetime" toName="txt" only="date" />
</View>
```

