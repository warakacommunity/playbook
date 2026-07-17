---
title: "TimeSeriesLabels"
sidebar_label: "TimeSeriesLabels"
description: "Control tag — The `TimeSeriesLabels` tag is used to create a labeled time range."
mdx:
  format: md
---

# `<TimeSeriesLabels>`

**Category:** Control tag

The `TimeSeriesLabels` tag is used to create a labeled time range.

Use with the following data types: time series.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toname | string | **yes** | — | Name of the timeseries to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | float | no | `0.9` | Opacity of the range |
| fillColor | string | no | `transparent` | Range fill color in hexadecimal or HTML color name |
| strokeColor | string | no | `#f48a42` | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of the stroke |

## Examples

### Example

Basic labeling configuration to apply labels to identified regions of a time series with one channel

```html
<View>
  <TimeSeriesLabels name="label" toName="ts">
      <Label value="Run"/>
      <Label value="Walk"/>
  </TimeSeriesLabels>

  <TimeSeries name="ts" value="$csv" valueType="url">
     <Channel column="first_column"/>
  </TimeSeries>
</View>
```

