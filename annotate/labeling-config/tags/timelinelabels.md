---
title: "TimelineLabels"
sidebar_label: "TimelineLabels"
description: "Control tag — Use the TimelineLabels tag to classify video frames. This can be a single frame or a span of frames."
mdx:
  format: md
---

# `<TimelineLabels>`

**Category:** Control tag

Use the TimelineLabels tag to classify video frames. This can be a single frame or a span of frames.

First, select a label and then click once to annotate a single frame. Click and drag to annotate multiple frames.

![Screenshot of video with frame classification](../images/timelinelabels.png)

Use with the `<Video>` control tag.

!!! info Tip
    You can increase the height of the timeline using the `timelineHeight` parameter on the `<Video>` tag.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the video element |

## Examples

### Example
```html
<View>
  <Header>Label timeline spans:</Header>
  <Video name="video" value="$video" />
  <TimelineLabels name="timelineLabels" toName="video">
    <Label value="Nothing" background="#944BFF"/>
    <Label value="Movement" background="#98C84E"/>
  </TimelineLabels>
</View>
```

