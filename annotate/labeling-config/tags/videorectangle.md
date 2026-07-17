---
title: "VideoRectangle"
sidebar_label: "VideoRectangle"
description: "Control tag — VideoRectangle tag brings Object Tracking capabilities to videos. It works in combination with the `<Video/>` and the `<Labels/>` tags."
mdx:
  format: md
---

# `<VideoRectangle>`

**Category:** Control tag

VideoRectangle tag brings Object Tracking capabilities to videos. It works in combination with the `<Video/>` and the `<Labels/>` tags.

Use with the following data types: video

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | Name of the element to control (video) |

## Examples

### Example

Video Object Tracking

```html
<View>
  <Header>Label the video:</Header>
  <Video name="video" value="$video" />
  <VideoRectangle name="box" toName="video" />

  <Labels name="videoLabels" toName="video">
    <Label value="Cell" background="#944BFF"/>
    <Label value="Bacteria" background="#98C84E"/>
  </Labels>
</View>
```

