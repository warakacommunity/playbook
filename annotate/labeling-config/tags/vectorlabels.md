---
title: "VectorLabels"
sidebar_label: "VectorLabels"
description: "Control tag — The `VectorLabels` tag is used to create labeled vectors. Use to apply labels to vectors in semantic segmentation tasks."
mdx:
  format: md
---

# `<VectorLabels>`

**Category:** Control tag

The `VectorLabels` tag is used to create labeled vectors. Use to apply labels to vectors in semantic segmentation tasks.

Use with the following data types: image.

## Key Features

### Point Management
- **Add Points**: Click on empty space, Shift+click on path segments
- **Edit Points**: Drag to reposition, Shift+click to convert regular ↔ bezier
- **Delete Points**: Alt+click on existing points
- **Multi-Selection**: Select multiple points for batch transformations
- **Break Closed Path**: Alt+click on any segment of a closed path to break it at that specific segment

### Bezier Curves
- **Create**: Drag while adding points or convert existing points
- **Edit**: Drag control points, disconnect/reconnect control handles
- **Control**: `curves` prop to enable/disable bezier functionality

## Keyboard Shortcuts & Hotkeys

### Point Creation & Editing
- **Click**: Add new point in drawing mode
- **Shift + Click** on a segment: Add point on path segment (insert between existing points)
- **Shift + Drag**: Create bezier point with control handles
- **Shift + Click** on a point: Convert point between regular ↔ bezier
- **Alt + Click** on a segment: Break closed path at segment (when path is closed)

### Point Selection
- **Click**: Select single point
- **Cmd/Ctrl + Click**: Add point to multi-selection
- **Cmd/Ctrl + Click on shape**: Select all points in the path
- **Cmd/Ctrl + Click on point**: Toggle point selection in multi-selection

### Path Management
- **Click on first/last point**: Close path bidirectionally (first→last or last→first)
- **Shift + Click**: Add point on path segment without closing

### Bezier Curve Control
- **Drag control points**: Adjust curve shape
- **Alt + Drag control point**: Disconnect control handles (make asymmetric)
- **Shift + Drag**: Create new bezier point with control handles

### Multi-Selection & Transformation
- **Select multiple points**: Use Cmd/Ctrl + Click to build selection
- **Transform selection**: Use transformer handles for rotation, scaling, and translation
- **Clear selection**: Click on any point

## Usage Examples

### Basic Vector Path
```jsx
<View>
  <Image name="image" value="$image" />
  <VectorLabels name="labels" toName="image">
    <Label value="Road" />
    <Label value="Boundary" />
  </VectorLabels>
</View>
```

### Polygon with Bezier Support
```jsx
<View>
  <Image name="image" value="$image" />
  <VectorLabels
    name="polygons"
    toName="image"
    closable={true}
    curves={true}
    minPoints="3"
    maxPoints="20"
  >
    <Label value="Building" />
    <Label value="Park" />
  </VectorLabels>
</View>
```

### Skeleton Mode for Branching Paths
```jsx
<View>
  <Image name="image" value="$image" />
  <VectorLabels
    name="skeleton"
    toName="image"
    skeleton={true}
    closable={false}
    curves={true}
  >
    <Label value="Tree" />
    <Label value="Branch" />
  </VectorLabels>
</View>
```

### Keypoint Annotation Tool
```jsx
<View>
  <Image name="image" value="$image" />
  <VectorLabels
    name="keypoints"
    toName="image"
    closable={false}
    curves={false}
    minPoints="1"
    maxPoints="1"
  >
    <Label value="Eye" />
    <Label value="Nose" />
    <Label value="Mouth" />
  </VectorLabels>
</View>
```

## Advanced Features

### Path Breaking
When a path is closed, you can break it at any segment:
- **Alt + Click** on any segment of a closed path
- The path breaks at that segment
- The breaking point becomes the first element
- The point before breaking becomes active

### Skeleton Mode
- **Purpose**: Create branching paths instead of linear sequences
- **Behavior**: New points connect to the active point, not the last added point
- **Use Case**: Tree structures, network diagrams, anatomical features

### Bezier Curve Management
- **Symmetric Control**: By default, control points move symmetrically
- **Asymmetric Control**: Hold Alt while dragging to disconnect handles
- **Control Point Visibility**: Control points are shown when editing bezier points

### Multi-Selection Workflow
1. **Build Selection**: Use Cmd/Ctrl + Click to add points
2. **Transform**: Use transformer handles for rotation, scaling, translation
3. **Batch Operations**: Apply transformations to all selected points
4. **Clear**: Click outside or use programmatic methods

## Props Reference

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of tag |
| toName | string | **yes** | — | Name of image to label |
| choice | single,multiple | no | `single` | Configure whether you can select one or multiple labels |
| maxUsages | number | no | — | Maximum number of times a label can be used per task |
| showInline | true,false | no | `true` | Show labels in the same visual line |
| opacity | number | no | `0.2` | Opacity of vector |
| fillColor | string | no | — | Vector fill color in hexadecimal |
| strokeColor | string | no | — | Stroke color in hexadecimal |
| strokeWidth | number | no | `1` | Width of stroke |
| pointSize | small,medium,large | no | `medium` | Size of vector handle points |
| pointStyle | rectangle,circle | no | `rectangle` | Style of points |
| snap | pixel,none | no | `none` | Snap vector to image pixels |
| closable | true,false | no | `false` | Allow closed shapes |
| curves | true,false | no | `false` | Allow Bezier curves |
| skeleton | true,false | no | `false` | Enables skeleton mode to allow branch paths |
| minPoints | number,none | no | `none` | Minimum allowed number of points |
| maxPoints | number,none | no | `none` | Maximum allowed number of points |
| pointsizeenabled | number | no | `5` | Size of a point in pixels when shape is selected |
| pointsizedisabled | number | no | `5` | Size of a point in pixels when shape is not selected |

