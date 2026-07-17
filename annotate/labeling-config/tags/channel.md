---
title: "Channel"
sidebar_label: "Channel"
description: "Object tag — Channel tag can be used to label time series data"
mdx:
  format: md
---

# `<Channel>`

**Category:** Object tag

Channel tag can be used to label time series data

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| column | string | **yes** | — | column name or index |
| legend | string | no | — | display name of the channel |
| units | string | no | — | display units name |
| displayFormat | string | no | — | format string for the values, uses d3-format:<br/>        `[,][.precision][f\\|%]`<br/>        `,` - group thousands with separator (from locale): `,` (12345.6 -> 12,345.6) `,.2f` (12345.6 -> 12,345.60)<br/>        `.precision` - precision for `f\\|%` type, significant digits for empty type:<br/>                     `.3f` (12.3456 -> 12.345, 1000 -> 1000.000)<br/>                     `.3` (12.3456 -> 12.3, 1.2345 -> 1.23, 12345 -> 1.23e+4)<br/>        `f` - treat as float, default precision is .6: `f` (12 -> 12.000000) `.2f` (12 -> 12.00) `.0f` (12.34 -> 12)<br/>        `%` - treat as percents and format accordingly: `%.0` (0.128 -> 13%) `%.1` (1.2345 -> 123.4%) |
| height | number | no | `200` | height of the plot |
| strokeColor | string | no | `#f48a42` | plot stroke color, expects hex value |
| strokeWidth | number | no | `1` | plot stroke width |
| markerColor | string | no | `#f48a42` | plot stroke color, expects hex value |
| markerSize | number | no | `0` | plot stroke width |
| markerSymbol | number | no | `circle` | plot stroke width |
| timeRange | string | no | — | data range of x-axis / time axis |
| dataRange | string | no | — | data range of y-axis / data axis |
| showAxis | string | no | — | show or bide both axis |
| fixedScale | true,false | no | — | if false current view scales to fit only displayed values; if given overwrites TimeSeries' fixedScale |

